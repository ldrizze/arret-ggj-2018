
# Introdução
Esta documentação aborda os aspectos de configuração, desenvolvimento e deploy da aplicação Kaymada Server.

Siga os passos do tópico *Preparando o ambiente* sequencialmente caso nunca tenha configurado o projeto em seus computador.

Kaymada Server é um repositório desenvolvido pela Fyzon4 Studios, o uso da aplicação é restrita para os membros da equipe.

# 1 - Preparando o ambiente
Prepare seu ambiente para desenvolver e colaborar no crescimento da aplicação, siga os passos adiantes, e não se esqueça de ler o tópico **Sublime Text**.

## 1.1 - Instalando NodeJS
O servidor usa e roda sobre a tecnologia NodeJS. É necessário tê-lo instalado na máquina, para isso, faça download dele no seguinte link: https://nodejs.org/en/download/

Observação: Utilize a versão LTS (qual o server foi testado e rodado)

## 1.2 - Gulp e Typescript (Global modules)
Para desenvolvimento do servidor, automatização dos scripts e para compilar os scripts, é necessário instalar os pacotes Gulp e Typescript nos módulos globais do NodeJS, para isso faça no terminal:

`npm install -g gulp typescript`

## 1.3 - Instalando os módulos do servidor
É necessário instalar os pacotes e módulos do servidor, quais já estão pré-configurados no *package.json*. Para isso, basta acessar no seu terminal o diretório de onde está o servidor e rodar o comando:

`npm install`

Observação: isso irá instalar os pacotes gulp local, gulp-tsc (para automatizar e compilar o Typescript) e o módulo SockeIO.

## 1.4 - Sublime Text
A configuração do projeto está em kaymada.sublime-project, qual dispõe a configuração de indentação, visualização dos arquivos e scripts para compilar o projeto.

Para compilar o projeto via Sublime Text, basta escolher a opção em **Tools > Build System > [Compile] Kaymada Server** e pressionar **CTRL+B**, com isso, o projeto será compilado (seguindo as configurações do Typescript em *tsconfig.json*).

# 2 - Desenvolvimento
A aplicação dispõe de uma API Wrapper, com o objetivo de simplificar, agilizar e manter o desenvolvimento com baixa acoplagem, fazendo com que o desenvolvedor desenvolva de forma descomplicada e sem necessidade de "caçar códigos".

## 2.1 - Camadas
Toda solução é divida em **3 camadas principais**:

1. Network (Drivers, Actions e Payload)
2. User environment (Lobby, Shop, Gameroom, Buddy list, etc)
3. Game Logic (Player, Game, Timer, Ball, etc)

Também, **2 camadas secundárias**:

1. Events (Observer pattern and Event system)
2. Services (Information link layer)

### 2.1.1 - A camada Network
A Camada Network é responsável pelo tráfego de mensagens entre o servidor e o usuário.

*Drivers*: São o meio e porta de entrada para conexões, responsável por novas conexões, receber dados, enviar dados e fechar conexões.

*Actions*: São as ações pré-configuradas no servidor, elas são reconhecidas e disparadas pelo núcleo da aplicação

*Payload*: Conteúdo do pacote enviado, também compartilhado com as Actions para tomadas de decisões

### 2.1.2 - A camada User Environment
Todo tipo de ambiente de usuário deverá estar contido nesta camada. As regras de negócio como Shop, Lobby, Buddy list será gerenciada nela, pois estas áreas não dizem sobre o jogo em específico e podem conter regra de negócios diferentes de um gameplay, como por exemplo, persistência de dados, monetização, placar de uma rodada após o jogo ser finalizado, etc.

### 2.1.3 - A camada Game Logic
Camada que faz referência à lógica do jogo. É importante termos como foco essa camada apenas para uso da lógica do jogo.

### 2.1.4 - Events
Os eventos é a forma de compartilhamento de informação mais simples e deverá ser usado quando houver a necessidade de compartilhar informações não **pertinentes a camada**, isso é, quando não pertence a lógica da camada, ex: Game Logic precisa persistir algo em um User Environment, usa-se o evento, sendo disparado da Game Logic para a User Environment como um caso especial.

### 2.1.5 - Services
Servições é uma coleção de objetos instanciados pelo core e que são compartilhados para a toda aplicação, ex: A lista de Users, de Gamerooms e de Players.

## 2.2 - Fluxo
Toda aplicação é "envelopada" pelo **Core** (ou núcleo do sistema). Core é responsável por montar todo repositório, instâncias e links da aplicação. Quando a aplicação está montada e linkada, o sistema inicia-se no seguinte fluxo:

*[Core] > [Driver de entrada > Payload > Action]* **>** *([User Enviroment] | [Game Logic])* **>** *[Payload > Driver de saída]*

**Observação**: `[]` -> Camada, `()` -> Bifurcações/Segmento


## 2.3 Programando
Este tópico destina-se a como aprender a desenvolver novos features para o servidor.

### 2.3.1 Driver
Os drivers devem estar contidos no diretório **drivers** da aplicação. Cada driver precisa ser um arquivo **.ts** e dentro desse arquivo, deverá ter uma classe com o mesmo nome do arquivo. Essa classe deverá estender a classe abstrata **Driver** e implementar seus métodos abstratos **initialize**, **listen**, **send** e **close**. Podemos resumir esses métodos da seguinte forma:

 - **initialize**: Executado quando a aplicação estiver preparada para inicializar os drivers;
 - **listen**: Por padrão, ele recebe uma porta (**tipo number**) como argumento, espera-se que o driver inicie as escutas;
 - **send**: Recebe como argumento um Payload e o objeto passado no método **onConnectFn** (ver seção abaixo), espera-se que o drive envie a mensagem escrita em **Payload.data**;
 - **close**: Recebe como argumento o objeto passado no método **onConnectFn**, espera-se que o drive encerre a conexão.

A classe **Driver** por padrão, possui 4 métodos built-in, são eles **onConnectFn**, **onReceiveFn** e **onCloseFn**. Esses métodos servem para informar o Core quando alguém se conecta, alguém envia mensagem e encerra a conexão respectivamente.

Todo driver deverá controlar a identificação de suas conexões a partir de seus métodos, e classificar cada conexão, qual será usado de referência para o Core. O Core irá devolver como retorno da função **onConnectFn** um objeto **User**, qual referencia o usuário no ambiente.

As funções acima tem o objetivo de:
- **onConnectFn**: Informar ao Core que um usuário novo está se conectando
- **onReceiveFn**: Informar ao Core que uma nova mensagem está chegando
- **onCloseFn**: Informar ao Core que uma conexão foi encerrada por parte do usuário

*Veja um exemplo de implementação de um driver no arquivo **drivers/SocketIO.ts***

### 2.3.2 Action
Uma **Action** representa uma ação executada no client e que foi recebida no servidor. Ela é transferida no payload da mensagem enviada pelo usuário, até o drive, assim então, passada para o Core e disparada. O Core tem a obrigação de identificar as Actions e disparar a **Action** certa de acordo com a mensagem do usuário, ou então, retornar um **ErrorPayload** (caso a **Action** não exista).

**Actions** devem estar contidas no diretório **actions**, em arquivos separados por classes, isso significa que cada **Action** será uma classe contida num único arquivo, e o arquivo conterá apenas essa **Action**.

A classe implementa apenas um método, o **receive**. Esse é o método executado toda vez que uma ação chega do usuário. Também, recebe como argumento um objeto de **Payload**, qual encapsula a instância User definida pelo **Core** e há algum **Player** ou **Gameroom** relacionado.

O contexto de actions se dispõe dos serviços através de um decorator. Serviços que são as coleções de objetos ligados ao servidor (Games rodando, Gamerooms, Players e Usuários) caso seja necessário obter algo além do **Payload**.
