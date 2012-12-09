///<reference path='../../../../../Definitions/mydefs/declare_vars.ts'/>
///<reference path='../../../../../Definitions/mydefs/layouttemplate.d.ts'/>

module Eduapp{
	export class MenuLayout extends LayoutTemplate{

		 constructor(tmpl:string,pos:string,tipo:string)
	    {
	        super(tmpl,pos,tipo);

	        this.startHelpers();
	        //this.startTemplate();

	    }

	    private startHelpers():void{

	    	var self = this;
	        //console.log("MiddleLayout ", self );
	        Handlebars.registerHelper('menu', function() {
		    	var tmpl = self.getTemplateName();
		    	//var tmpl = Session.get("menu");
		    	//var s = Session.get("page");
		        console.log("template ",tmpl);
		        if (Template[tmpl]){ //verifica se há um template com o node dado por this.pag            
		            return Template[tmpl]();//chama o template registado com o nome de this.page
		        }
		    });
	    }
	}
}
