/// <reference path="../../../../../../Definitions/jquery/jquery-1.8.d.ts" />//este ficheiro está também a ser importado pelo Backbone
/// <reference path="../../../../../../Definitions/jquery.validation/jquery.validation-1.10.d.ts" />
/// <reference path="../../../../../../Definitions/backbone/backbone-0.9.d.ts" />
/// <reference path="../../../../../../Definitions/underscore/underscore-1.4.d.ts" />
/// <reference path="../../../../../../Definitions/bootstrap/bootstrap-2.1.d.ts" />
/// <reference path="../../../../../../Definitions/handlebars/handlebars-1.0.d.ts" />
/// <reference path="../../../../../../Definitions/toastr/toastr-1.0.d.ts" />
/// <reference path="../../../../../../Definitions/chosen/chosen-0.9.d.ts" />

///<reference path='../../start/interfaces/IPage.ts'/>
///<reference path='../../start/interfaces/ILayout.ts'/>
///<reference path='../../../../../../Definitions/mydefs/usertipo.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/position.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/constantes.d.ts'/>

interface Validator {
	messages:any;
}

interface JQuery {
	datepicker:any;
}

declare var Meteor: any;

declare var Session: any;
declare var Escolas: any;
declare var dP: any;
//declare var Handlebars: any;
declare var Template: any;
//declare var _: any;
