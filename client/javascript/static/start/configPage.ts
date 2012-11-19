///<reference path='../common/variaveis/declare_vars.ts'/>
///<reference path='../../../../../Definitions/mydefs/pagetemplate.d.ts'/>

import Global = Eduapp.Global;
import CC = Eduapp.Constantes;

module Eduapp{
	export class ConfigPage extends PageTemplate{

		 constructor(tmpl:string,pos:string,tipo:string, router:any)
	    {
	        super(tmpl,pos,tipo,router);

	        this.startRouters();
	        this.startHelpers();
	        this.startTemplate();

	    }

	    private startTemplate():void{
	    	Template[this.getTemplateName()].rendered = function() {
		    	
			};
	    }

	    private startHelpers():void{
	    	
	    }

	    private startRouters():void{
	    	
	    		var Router = this.getRouter();
	    		var self = this;
	    		Router.route("config", "config", function() {

			        console.log("config ");
			        
			        self.setConfigSession("configuracao",CC.Menu.CONFIG_TITLE,"config_sidebar-left",["config","config_dados_pessoais"]);

		    	});

		    
		    	Router.route("config_dados_pessoais", "config_dados_pessoais", function() {
			        //console.log("config_dados_pessoais ");
			        //mEdutell.IDXPAGEACTUAL = mEdutell.IDXCONFIGDADOSPESSOAIS;
			        //Session.set("pages", mEdutell.IDXCONFIGDADOSPESSOAIS);
			        //Session.set("menu_selected", ["config","configdadosP"]);
			        self.setConfigSession("config_dados_pessoais",CC.Menu.CONFIG_TITLE,"config_sidebar-left",["config","configdadosP"]);
			        //configSessionCommon();
		        
		    	});
		    

		    	Router.route("config_inscricao", "config_inscricao", function() {
			        //mEdutell.IDXPAGEACTUAL = mEdutell.IDXCONFIGINSCRICAO;
			        //Session.set("pages", mEdutell.IDXCONFIGINSCRICAO);
			        //Session.set("menu_selected", ["config","configinsc"]);
			        self.setConfigSession("config_inscricao",CC.Menu.CONFIG_TITLE,"config_sidebar-left",["config","configinsc"]);
			        //console.log("a iniciar chosen");
			        //configSessionCommon();
			        
			    });


		    	Router.route("config_confirmacao", "config_confirmacao", function() {
			        //mEdutell.IDXPAGEACTUAL = mEdutell.IDXCONFIGCONFIRM;
			        //Session.set("pages", mEdutell.IDXCONFIGCONFIRM);
			        Session.set("menu_selected", ["config","configconfirm"]);
			        //configSessionCommon();
			        
			    });
	    }

	    private setConfigSession(tmplName:string, menuName:string, sidebar: string ,selectArr:string[],):void{
	    			Session.set("menu_selected", selectArr);
	    			Global.C.elem["sidebarLeftlayout"].setTemplateName(sidebar);
	    			//Global.C.elem["toplayout"].setTemplateName("notop");
	    			//console.log("toplayout",Global.C.elem["toplayout"]);
	    		 	Global.C.elem["mlayout"].setTemplateName(tmplName);
			     	Global.C.elem["mmenu"].setTitle(menuName);

			     	
			     	var dados = dP.findOne({id:Meteor.userId()});
			        if(dados)
			            Session.set("dadosPessoais",true);
			        else
			            Session.set("dadosPessoais",false);
			        
	    }
	}
}
