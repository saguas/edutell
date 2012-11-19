///<reference path='../common/variaveis/declare_vars.ts'/>
///<reference path='../../../../../Definitions/mydefs/layouttemplate.d.ts'/>

module Eduapp{
	export class MiddleLayout extends LayoutTemplate{

		 constructor(tmpl:string,pos:string,tipo:string)
	    {
	        super(tmpl,pos,tipo);

	        this.startHelpers();
	        //this.startTemplate();

	    }

	    private startHelpers():void{

	    	var self = this;
	        //console.log("MiddleLayout ", self );
	        Handlebars.registerHelper('middle', function() {
		    	var tmpl = self.getTemplateName();
		    	//var s = Session.get("page");
		        console.log("template ",tmpl);
		        if (Template[tmpl]){ //verifica se há um template com o node dado por this.pag            
		            return Template[tmpl]();//chama o template registado com o nome de this.page
		        }
		    });
	    }
	}
}
