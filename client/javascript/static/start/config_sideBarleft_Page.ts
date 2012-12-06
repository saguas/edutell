///<reference path='../../../../../Definitions/mydefs/declare_vars.ts'/>
///<reference path='../../../../../Definitions/mydefs/pagetemplate.d.ts'/>

//import Global = Eduapp.Global;
//import CC = Eduapp.Constantes;

module Eduapp{
	export class ConfigSideBarLeftPage extends PageTemplate{

		 constructor(tmpl:string,pos:string,tipo:string, router:any)
	    {
	        super(tmpl,pos,tipo,router);

	        this.startHelpers();
	        this.startTemplate();

	    }

	    private startTemplate():void{

	    	var Router = this.getRouter();
	    	var self = this;

	    	Template["config_sidebar-left"].rendered = function() {
		    	
			};

			Template["config_sidebar-left"].events({
		        "click .dados": function(event,tmpl){
		            event.preventDefault();
		           	//console.log("dados pessoais clicked ");
		            Router.changePage(CC.Page.CONFIG_DADOS_PESSOAIS);
		        },
		        "click .insc": function(event,tmpl){
		            event.preventDefault();
		            
		            Router.changePage(CC.Page.CONFIG_INSCRICAO);
		        },
		        "click .EEs": function(event){
		            event.preventDefault();
		            Router.changePage("");
		        },
		        "click .escolas": function(event){
		            event.preventDefault();
		            Router.changePage("");
		        },
		        "click .confirm": function(event){
		            event.preventDefault();
		            Router.changePage(CC.Page.CONFIG_CONFIRMACAO);
		        }        
		    });

		    Template["config_sidebar-left"].dadosPessoais = function(){
		        return Session.get("dadosPessoais");
		    };
	    }

	    private startHelpers():void{
	    	
	    }
	}
}

