///<reference path='../../../../../Definitions/mydefs/declare_vars.ts'/>
///<reference path='../../../../../Definitions/mydefs/layouttemplate.d.ts'/>
module Eduapp{
	export class Layout extends LayoutTemplate{

		 constructor(tmpl:string,pos:string,tipo:string)
	    {
	        super(tmpl,pos,tipo);

	        this.startHelpers();

	        //elimina qualquer click de fazer o que está definido por defeito. Usado para evitar que os menus de login coloquem #
		    Template.layout.events({
		        'click': function(event) {
		                
		                event.preventDefault();
		          }
		    });

	    }

	    private startHelpers():void{

	    	var self = this;
	        Handlebars.registerHelper('layout', function() {
		    	var tmpl = self.getTemplateName();
		    	//var tmpl = Session.get("layout");
		        console.log("template ",tmpl);
		        if (Template[tmpl]){ //verifica se há um template com o node dado por this.pag            
		            return Template[tmpl]();//chama o template registado com o nome de this.page
		        }
		    });
	    }
	}
}
