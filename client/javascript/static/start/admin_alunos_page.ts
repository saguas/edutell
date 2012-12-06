///<reference path='../../../../../Definitions/mydefs/declare_vars.ts'/>
///<reference path='../../../../../Definitions/mydefs/pagetemplate.d.ts'/>

//import Global = Eduapp.Global;
//import CC = Eduapp.Constantes;

module Eduapp{
	export class AdminAlunosPage extends PageTemplate{

		 constructor(tmpl:string,pos:string,tipo:string, router:any)
	    {
	        super(tmpl,pos,tipo,router);

	        this.startHelpers();
	        this.startTemplate();

	    }

	    private startTemplate():void{
	    	
	    }

	    private startHelpers():void{
	    	
	    }
	}
}
