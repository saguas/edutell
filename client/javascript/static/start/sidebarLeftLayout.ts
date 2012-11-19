///<reference path='../common/variaveis/declare_vars.ts'/>
///<reference path='../../../../../Definitions/mydefs/layouttemplate.d.ts'/>
module Eduapp{
	export class SideBarLayout extends LayoutTemplate{

		 constructor(tmpl:string,pos:string,tipo:string)
	    {
	        super(tmpl,pos,tipo);

	        this.startHelpers();

	    }

	    private startHelpers():void{

	    	var self = this;
	        Handlebars.registerHelper('sidebarleft', function() {
		    	var tmpl = self.getTemplateName();
		    	//var tmpl = Session.get("pageSideBar");
		        console.log("template ",tmpl);
		        if (Template[tmpl]){ //verifica se há um template com o node dado por this.pag            
		            return Template[tmpl]();//chama o template registado com o nome de this.page
		        }
		    });
	    }
	}
}