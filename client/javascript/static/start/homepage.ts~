///<reference path='../common/variaveis/declare_vars.ts'/>
///<reference path='../../../../../Definitions/mydefs/pagetemplate.d.ts'/>

module Eduapp{
	export class HomePage extends PageTemplate{

		 constructor(tmpl:string,pos:string,tipo:string, router:any)
	    {
	        super(tmpl,pos,tipo,router);

	        this.startHelpers();
	        this.startTemplate();

	    }

	    private startTemplate():void{
	    	Template.home.rendered = function() {
		    	$('#myCarousel').carousel();
			};
	    }

	    private startHelpers():void{
	    	
	    }
	}
}
