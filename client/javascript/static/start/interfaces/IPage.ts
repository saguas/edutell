////<reference path='../../../../../Definitions/mydefs/position.d.ts'/>

interface IPage{
	templateName: string;
	position: string;
	userTipo: string;
	listenersUserTipo:any;
	listenersTmplName:any;
	Router:any;
	getTemplateName():string;
	setTemplateName(name:string):void;
	getUserTipo():string;
	setUserTipo(tipo:string):void;
	setRouter(router:any):void;
	getRouter():any;
	startTemplate():void;
	startHelpers():void;
	setTitle(title:string):void;
	getTitle():string;
}