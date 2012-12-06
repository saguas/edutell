///<reference path='../common/variaveis/declare_vars.ts'/>
///<reference path='../../../../../Definitions/mydefs/pagetemplate.d.ts'/>

//import Global = Eduapp.Global;
//import CC = Eduapp.Constantes;

module Eduapp{
	export class AdminPage extends PageTemplate{

		 constructor(tmpl:string,pos:string,tipo:string, router:any)
	    {
	        super(tmpl,pos,tipo,router);

	        this.startRouters();
	        this.startHelpers();
	        this.startTemplate();

	    }

	    private startTemplate():void{
	    	Template.administracao.rendered = function() {
		    	
			};
	    }

	    private startHelpers():void{
	    	
	    }

	    private startRouters():void{
	    	
	    		var Router = this.getRouter();
	    		var self = this;
	    		//console.log("a registar router admin ");
	    		Router.route("admin", "admin", function() {

			        //console.log("admin ");
			        
			        Router.setAdminSession("administracao",CC.Menu.ADMIN_TITLE,"admin_sidebar-left",["admin",""]);

		    	});

		    
		    	Router.route("administracao_alunos", "administracao_alunos", function() {
			        
			        Router.setAdminSession("administracao_alunos",CC.Menu.ADMIN_TITLE,"admin_sidebar-left",["admin","adminalunos"]);
		        
		    	});
		    

		    	Router.route("administracao_profs", "administracao_profs", function() {
			       
			        Router.setAdminSession("administracao_profs",CC.Menu.ADMIN_TITLE,"admin_sidebar-left",["admin","adminprofs"]);
			        
			    });


		    	Router.route("config_confirmacao", "config_confirmacao", function() {
			       
			        Session.set("menu_selected", ["config","configconfirm"]);
			        
			    });
	    }
	    
	    /*
	    private setAdminSession(tmplName:string, menuName:string, sidebar: string ,selectArr:string[]):void{
	    			
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
