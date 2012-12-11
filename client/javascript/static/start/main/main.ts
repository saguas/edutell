///<reference path='../../../../../../Definitions/mydefs/declare_vars.ts'/>
///<reference path='../../../../../../Definitions/mydefs/layout.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/sidebarLeftLayout.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/middlelayout.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/homepage.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/config_dados_pessoais.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/config_insc_page.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/config_sideBarleft_Page.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/admin_SideBarleft_Page.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/configPage.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/adminPage.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/admin_alunos_page.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/admin_profs_page.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/menulayout.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/toplayout.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/mainmenu.d.ts'/>

//import Global = Eduapp.Global;
//import CC = Eduapp.Constantes;

module Eduapp { 

	Meteor.subscribe("escolas");
    Meteor.subscribe("dadosPessoais");
    Session.set("dadosPessoais",false);
	
	export var router:any;
	router = startRouter();
	
	var sidebarLeftlayout = new Eduapp.SideBarLayout("",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO);
	var mlayout = new Eduapp.MiddleLayout("home",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO);
	var menulayout = new Eduapp.MenuLayout("menu_original",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO);
	var toplayout = new Eduapp.TopLayout("notop",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO);
	var startLayout = new Eduapp.Layout("layout",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO);
	var homepage = new Eduapp.HomePage("home",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO,router);
	var mmenu = new Eduapp.MainMenu("menu_original",Eduapp.Position.TOP,Eduapp.UserTipo.ALUNO,router);
	var configpage;
	var config_DP_page;
	var config_INSC_page;
	var config_SB_page;
	var admin_SB_page ;
	var adminpage;
	var adminAlunosPage;
	var adminProfsPage;
	var handle;
	//var C = false;

	Session.set("userwaslogin",false);

	//se o utilizador fizer refresh no browser então tem de voltar a fazer login
	if(Meteor.userId()){
		//userwaslogin = true;
		Session.set("userwaslogin",true);
		Meteor.logout(function(){
				router.setAdminSession("","","",["home"]);
				//userwaslogin=false;
				Session.set("userwaslogin",false);
			});
		//console.log("teste userlogin and handle is ");	

		//if(Session.get("handle"))
		//	Session.get("handle").stop();	
	}

	
	//o utilizar pode mudar. Um faz login e depois logout. O outro faz login e altera o userid. Daí ser necessário estar dentro de reatividade
	handle = Meteor.autorun(function(){
		
			var myid = Meteor.userId();

			//console.log("userwaslogin ",Session.get("userwaslogin"), " myid ", myid);
			if(myid && !Session.get("userwaslogin")){

				//userwaslogin = false;
				//console.log("userwaslogin ",userwaslogin);
			//var user = Meteor.user();
				var user = Meteor.users.findOne({_id: myid}, {reactive: false});
			//if(user){
				
				//console.log("profile admin user ",user, " profile ", user.profile);
		      	if(user && user.profile && user.profile.tipo === "Admin"){
		      		//console.log("profile admin ");
		      		deleteObject(user);
		      		adminpage = new Eduapp.AdminPage("administracao",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO,router);
		      		adminAlunosPage = new Eduapp.AdminAlunosPage("administracao_alunos",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO,router);
		      		adminProfsPage = new Eduapp.AdminProfsPage("administracao_profs",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO,router);
					admin_SB_page = new Eduapp.AdminSideBarLeftPage("admin_sidebar-left",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO,router);
					Global.C.elem["admin_SB_page"] = admin_SB_page;
					Global.C.elem["adminpage"] = adminpage;
					Global.C.elem["adminAlunosPage"] = adminAlunosPage;
					Global.C.elem["adminProfsPage"] = adminProfsPage;
				}else if(user && user.profile && user.profile.tipo === "Aluno"){
					deleteObject(user);
					configpage = new Eduapp.ConfigPage("configuracao",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO,router);
					config_DP_page = new Eduapp.ConfigDadosPessoaisPage("config_dados_pessoais",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO,router);
					config_INSC_page = new Eduapp.ConfigInscricaoPage("config_inscricao",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO,router);
					config_SB_page = new Eduapp.ConfigSideBarLeftPage("config_sidebar-left",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO,router);
					Global.C.elem["configpage"] = configpage;	
					Global.C.elem["config_DP_page"] = config_DP_page;
					Global.C.elem["config_INSC_page"] = config_INSC_page;
					Global.C.elem["config_SB_page"] = config_SB_page;
				}
			}
	});
		

	//Session.set("handle", handle);
	Global.C.elem["mlayout"] = mlayout;	
	Global.C.elem["mmenu"] = mmenu;	
	Global.C.elem["homepage"] = homepage;	
	
	Global.C.elem["toplayout"] = toplayout;
	Global.C.elem["menulayout"] = menulayout;
	Global.C.elem["startLayout"] = startLayout;
	Global.C.elem["sidebarLeftlayout"] = sidebarLeftlayout;
	
	
	

	// shared between dropdown and single mode
 
  Template._loginButtons.events({
    'click': function(event) {//#login-buttons-logout
      //console.log("butt");
      if(event.target.id == "login-buttons-logout"){
            
            event.preventDefault();
            var user = Meteor.user();
            deleteObject(user);
            router.changePage("");
            console.log("logout...");
      }
     }
    
  });

  	function deleteObject(user){
  		//if(user.profile && user.profile.tipo === "Admin"){
        	delete Global.C.elem["admin_SB_page"];
			delete Global.C.elem["adminpage"];
			delete Global.C.elem["adminAlunosPage"];
			delete Global.C.elem["adminProfsPage"];
        //}else if(user.profile && user.profile.tipo === "Aluno"){
        	delete Global.C.elem["configpage"];
        	delete Global.C.elem["config_INSC_page"];
        	delete Global.C.elem["config_DP_page"];
        	delete Global.C.elem["config_SB_page"];
    	//}
  	}
  
  
	function startRouter(){

		//a cada novo menu guarda-se um registo no history do browser
	
	    var MenuRouter = Backbone.Router.extend({
		        routes: {
		            "": "main", //página inicial
		            "tpc": "tpc",
		            "tpc/:turma_id": "tpc",
		            "tpc/:turma_id/:aluno_id": "tpc",
		            //"login": "login",
		            //"registo": "registo",
		            "*path": "nopath"
		        },
		        main: function() {

			        
			           	toplayout.setTemplateName("notop");
			           	mlayout.setTemplateName("home");
			           
			            mmenu.setTitle(CC.Menu.HOME_TITLE);
			            Session.set("menu_selected",["home"]);
			            Global.C.elem["sidebarLeftlayout"].setTemplateName("");

		        },
		        tpc: function(turma_id, aluno_id) {
		            toplayout.setTemplateName(mmenu.getTemplateName());
		           	mlayout.setTemplateName("configuracao");

		        },
		        nopath: function(path) {
		            
		            console.log("nopath ", path);
		            //this.setAdminSession("","","",["home"]);
		            this.changePage("");
		        },
		        changePage: function(menu_id) {
		           	//console.log("menu_id clicked ", menu_id);
		            this.navigate(menu_id, true);
		        },
		        setConfigSession: function(tmplName, menuName, sidebar, selectArr){
		        	this.setAdminSession(tmplName, menuName, sidebar, selectArr);
		        	if(Meteor.user()){
		        			var dados = dP.findOne({id:Meteor.userId()});
					        if(dados)
					            Session.set("dadosPessoais",true);
					        else
					            Session.set("dadosPessoais",false);
		        	}
		        }, 
		        setAdminSession: function(tmplName, menuName, sidebar, selectArr){
	    			//console.log("userid ",Meteor.userId());
	    			if(/*Meteor.user()*/Meteor.userId()){
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
			        
	    		}	
	    });

		return new MenuRouter();
	}

	Meteor.startup(function() {
        
        $.extend($.validator.messages, {//colocar mensagens comuns aqui. 
            //required: "<div class='alert alert-error'><small>campo obrigatório</small></div>",
            required: "<span class='label label-important'><small>campo obrigatório</small></span>",
            number: "<span class='label label-important'><small>campo numérico</small></span>"
            //email: "Bitte eine gültige E-Mail-Adresse eingeben",
        });
        

    });

}
