///<reference path='../../../../../Definitions/mydefs/declare_vars.ts'/>
///<reference path='../../../../../Definitions/mydefs/pagetemplate.d.ts'/>

//import Global = Eduapp.Global;
//import CC = Eduapp.Constantes;

module Eduapp{
	export class AdminSideBarLeftPage extends PageTemplate{

		 constructor(tmpl:string,pos:string,tipo:string, router:any)
	    {
	        super(tmpl,pos,tipo,router);

	        this.startHelpers();
	        this.startTemplate();

	    }

	    private startTemplate():void{

	    	var Router = this.getRouter();
	    	var self = this;

	    	Template["admin_sidebar-left"].rendered = function() {
		    	
			};

			Template["admin_sidebar-left"].events({
		        "click .alunos": function(event,tmpl){
		            event.preventDefault();
		           	//console.log("admin alunos clicked ");
		            Router.changePage(CC.Page.ADMIN_ALUNOS);
		        },
		        "click .profs": function(event,tmpl){
		            event.preventDefault();
		            
		            Router.changePage(CC.Page.ADMIN_PROFS);
		        },
		        "click .EEs": function(event){
		            event.preventDefault();
		            Router.changePage(CC.Page.ADMIN_EES);
		        },
		        "click .escolas": function(event){
		            event.preventDefault();
		            Router.changePage(CC.Page.ADMIN_ESCOLAS);
		        },
		        "click .adds": function(event){
		            event.preventDefault();
		            Router.changePage(CC.Page.ADMIN_ADD);
		        }        
		    });

		    Template["admin_sidebar-left"].dadosPessoais = function(){
		        return Session.get("dadosPessoais");
		    };
	    }

	    private startHelpers():void{
	    	
	    }
	}
}
