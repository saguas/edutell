///<reference path='../position.ts'/>

interface IPage{
	templateName: string;
	position: string;
	userTipo: string;
	listenersUserTipo:any;
	listenersTmplName:any;
	getTemplateName():string;
	setTemplateName(name:string):void;
	getUserTipo():string;
	setUserTipo(tipo:string):void;
}