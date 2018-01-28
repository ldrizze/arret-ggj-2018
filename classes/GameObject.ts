import {Vector3} from "./Vector3";
import {Timer} from "./Timer";
import {Event} from "./Event";

/**
 * @public
 * @class 
 * @package FreeUnityNetworking
 * @author  Matheus Crivellari <matheus.acrivellari@gmail.com>
 * @author  Luis Fedrizze <luisfedrizze@gmail.com>
 * @copyright 2017, [Fyzon4]{@link http://www.fyzon4.com.br}
 * 
 * @classdesc GameObject a representação
 * da entidade mais genérica a ser processada 
 * por um [Game]{@link Game}
 * em uma sessão de jogo.
 * A maioria de seus métodos é 
 * inspirada na classe MonoBehaviour
 * da game engine Unity3D.
 *
 * Por exemplo, digamos que queremos trackear e/ou
 * transportar pelo network, um objeto temporário que 
 * é criado no game. Podemos instanciar no server um GameObject
 * que irá receber as informações deste objeto (vindas do
 * host-client ou outro client se necessário). Toda vez que 
 * o client responsável pelo processamento deste objeto enviar ao 
 * server uma atualização, esta instancia será atualizada.
 *
 * Outro exemplo, o server pode sobrescrever o método update de
 * determinado GameObject e prover seu próprio processamento
 * server-side, e encaminhá-lo para o client, produzindo um
 * serviço autoritativo.
 *
 * GameObject também é a classe base para a definição de classes
 * mais complexas essenciais para produzir sessões de jogo no
 * server, como a classe [Game]{@link Game}, ou [Gameroom]{@link Gameroom}.
 */
export class GameObject{

	/**
	 * Representa as propriedades de transformação do GameObject atual.
	 * @type {Object}
	 */
	private transform : object = {

		/**
		 * Representa a posição atual absoluta do GameObject
		 * em 3 eixos (x, y, z) baseado no modelo do Unity3D.
		 * x (horizontal), y (vertical), z (profundidade).
		 * Por convenção, cada unidade equivale a 1m (metro).
		 * @type {Vector3}
		 * @memberof GameObject.transform
		 */
		position : new Vector3,

		/**
		 * Representa a rotação atual absoluta do GameObject
		 * em 3 eixos (x, y, z) baseado no modelo do Unity3D.
		 * x (horizontal), y (vertical), z (profundidade).
		 * Por convenção, cada unidade equivale a 1 grau 
		 * em notação de Euler.
		 * @type {Vector3}
		 * @memberof GameObject.transform
		 */
		rotation : new Vector3
	}

	/**
	 * Representa valores calculados de tempo do game.
	 * @type {Timer}
	 */
	private Time : Timer = new Timer;

	/**
	 * GameObject pai do GameObject atual.
	 * @member
	 * @public
	 * @type {GameObject}
	 */
	public parent : GameObject;

	/**
	 * Lista de GameObject filhos do GameObject atual.
	 * @member
	 * @public
	 * @type {Array}
	 */
	public children : GameObject[];

	/**
	 * Define se o GameObject atual está habilitado (true) ou desabilitado (false).
	 * Quando este valor é modificado os eventos onEnable e onDisable são disparados
	 * respectivametne quando enabled = true e enable = false.
	 * Esta propriedade não deve ser modificada em tempo de execução.
	 * Ela é utilizada pelo [Game]{@link Game} para controle itnerno.
	 * Ela deve ser modificada através do getter/setter público enabled.
	 * @member
	 * @protected
	 * @type {Boolean}
	 */
	protected _enabled : boolean = true;

	get enabled():boolean{
		return this._enabled;
	}

	set enabled(value:boolean){
		this._enabled = value;
	}

	/**
	 * Representa se o GameObject atual já foi iniciado (true) ou não (false).
	 * Esta propriedade não deve ser modificada em tempo de execução.
	 * Ela é utilizada pelo [Game]{@link Game} para controle itnerno.
	 * @member
	 * @protected
	 * @type {Boolean}
	 */
	protected _started : boolean = true;

	/**
	 * Representa se o GameObject atual já foi acordado (true) ou não (false).
	 * Esta propriedade não deve ser modificada em tempo de execução.
	 * Ela é utilizada pelo [Game]{@link Game} para controle itnerno.
	 * @member
	 * @protected
	 * @type {Boolean}
	 */
	protected _awaken : boolean = false;

	/**
	 * Adiciona outra instância de GameObject como
	 * filho da instância atual.
	 * @public
	 * @param {GameObject} gameObject GameObject a ser adicionado como filho.
	 * @return {GameObject} Referência do GameObject adicionado como filho. Retorna null se não for passado um GameObject no parâmetro {gameObject}.
	 */
	public addChild(child:GameObject) : GameObject{
		this.children.push(child);
		child.parent = this;
		return this;
	}

	/**
	 * Remove a instância gameObjectRef da lista de objetos filhos
	 * da instância atual.
	 * @public
	 * @param  {GameObject} gameObjectRef Referência de um GameObject presente na lista de filhos a ser removido.
	 * @return {GameObject}               Referência do GameObject removido da lista.
	 */
	public removeChild(child:GameObject) : GameObject{
		var idx = this.children.indexOf(child);
		if(idx != -1){
			child.parent = null;
			this.children.splice(idx,1);
			return this;
		}else{
			return null;
		}
	}


}