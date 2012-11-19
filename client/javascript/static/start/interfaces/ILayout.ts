////<reference path='../../../../../Definitions/mydefs/position.d.ts'/>

interface ILayout{
	templateName: string;
	position: string;
	userTipo: string;
	listenersUserTipo:any;
	listenersTmplName:any;
	getTemplateName():string;
	setTemplateName(name:string):void;
	getUserTipo():string;
	setUserTipo(tipo:string):void;
	startHelpers():void;
	//startTemplate():void;
}