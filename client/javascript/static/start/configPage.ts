///<reference path='../common/variaveis/declare_vars.ts'/>
///<reference path='../../../../../Definitions/mydefs/pagetemplate.d.ts'/>

//import Global = Eduapp.Global;
//import CC = Eduapp.Constantes;

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
	    	Template.configuracao.rendered = function() {
		    	
			};
	    }

	    private startHelpers():void{
	    	
	    }

	    private startRouters():void{
	    	
	    		var Router = this.getRouter();
	    		var self = this;
	    		Router.route("config", "config", function() {

			        console.log("config ");
			        
			        Router.setConfigSession("configuracao",CC.Menu.CONFIG_TITLE,"config_sidebar-left",["config","config_dados_pessoais"]);

		    	});

		    
		    	Router.route("config_dados_pessoais", "config_dados_pessoais", function() {
			        
			        Router.setConfigSession("config_dados_pessoais",CC.Menu.CONFIG_TITLE,"config_sidebar-left",["config","configdadosP"]);
		        
		    	});
		    

		    	Router.route("config_inscricao", "config_inscricao", function() {
			       
			        Router.setConfigSession("config_inscricao",CC.Menu.CONFIG_TITLE,"config_sidebar-left",["config","configinsc"]);
			        
			    });


		    	Router.route("config_confirmacao", "config_confirmacao", function() {
			       
			        Session.set("menu_selected", ["config","configconfirm"]);
			        
			    });
	    }

	    /*
	    private setConfigSession(tmplName:string, menuName:string, sidebar: string ,selectArr:string[]):void{
	    			
	    			if(Meteor.user()){
	    					Session.set("menu_selected", selectArr);
			    			//Session.set("pageSideBar",sidebar);
			    			//Session.set("page",tmplName);
			    			Global.C.elem["sidebarLeftlayout"].setTemplateName(sidebar);
			    			Global.C.elem["toplayout"].setTemplateName("notop");
			    			//console.log("toplayout",Global.C.elem["toplayout"]);
			    			//Session.set("pageTop","notop");
			    			Session.set("menu","menu_original");
			    		 	Global.C.elem["mlayout"].setTemplateName(tmplName);
					     	Global.C.elem["mmenu"].setTitle(menuName);
		
					     	var dados = dP.findOne({id:Meteor.userId()});
					        if(dados)
					            Session.set("dadosPessoais",true);
					        else
					            Session.set("dadosPessoais",false);
					}else{
						Session.set("menu_selected", selectArr);
		    			//Session.set("pageSideBar",sidebar);
		    			//Session.set("page",tmplName);
		    			Global.C.elem["sidebarLeftlayout"].setTemplateName("");
		    			Global.C.elem["toplayout"].setTemplateName("notop");
		    			//console.log("toplayout",Global.C.elem["toplayout"]);
		    			//Session.set("pageTop","notop");
		    			Session.set("menu","menu_original");
		    		 	Global.C.elem["mlayout"].setTemplateName("home");
				     	Global.C.elem["mmenu"].setTitle(CC.Menu.HOME_TITLE);
				}
			        
	    }*/
	}
}