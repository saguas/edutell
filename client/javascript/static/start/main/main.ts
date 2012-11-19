///<reference path='../../common/variaveis/declare_vars.ts'/>
///<reference path='../../../../../../Definitions/mydefs/layout.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/middlelayout.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/homepage.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/config_dados_pessoais.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/config_insc_page.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/config_sideBarleft_Page.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/configpage.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/menulayout.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/toplayout.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/sidebarLeftlayout.d.ts'/>
///<reference path='../../../../../../Definitions/mydefs/mainmenu.d.ts'/>

//import Global = Eduapp.Global;
//import CC = Eduapp.Constantes;

module Eduapp {

	Meteor.subscribe("escolas");
    Meteor.subscribe("dadosPessoais");
    Session.set("dadosPessoais",false);

	export var router = startRouter();
	export var mlayout = new Eduapp.MiddleLayout("home",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO);
	export var mmenu = new Eduapp.MainMenu("menu_original",Eduapp.Position.TOP,Eduapp.UserTipo.ALUNO,router);
	export var homepage = new Eduapp.HomePage("home",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO,router);
	export var configpage = new Eduapp.ConfigPage("configuracao",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO,router);
	export var config_DP_page = new Eduapp.ConfigDadosPessoaisPage("config_dados_pessoais",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO,router);
	export var config_INSC_page = new Eduapp.ConfigInscricaoPage("config_inscricao",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO,router);
	export var config_SB_page = new Eduapp.ConfigSideBarLeftPage("config_sidebar-left",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO,router);
	export var menulayout = new Eduapp.MenuLayout("menu_original",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO);
	export var toplayout = new Eduapp.TopLayout("notop",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO);
	export var sidebarLeftlayout = new Eduapp.SideBarLayout("",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO);
	export var startLayout = new Eduapp.Layout("layout",Eduapp.Position.MIDDLE,Eduapp.UserTipo.ALUNO);
	
	
	Global.C.elem["mlayout"] = mlayout;	
	Global.C.elem["mmenu"] = mmenu;	
	Global.C.elem["homepage"] = homepage;	
	Global.C.elem["configpage"] = configpage;	
	Global.C.elem["toplayout"] = toplayout;
	Global.C.elem["menulayout"] = menulayout;
	Global.C.elem["startLayout"] = startLayout;
	Global.C.elem["sidebarLeftlayout"] = sidebarLeftlayout;
	Global.C.elem["config_DP_page"] = config_DP_page;
	Global.C.elem["config_INSC_page"] = config_INSC_page;
	Global.C.elem["config_SB_page"] = config_SB_page;	
	//mlayout.setTemplateName("configuracao");
	//mlayout.setTemplateName("home");
	
	//console.log("Main mlayout ", mlayout);
	

	// shared between dropdown and single mode
 
  Template._loginButtons.events({
    'click': function(event) {//#login-buttons-logout
      
      if(event.target.id == "login-buttons-logout"){
            
            event.preventDefault();
            router.changePage("");
      }
     }
    
  });
	
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
		           toplayout.setTemplateName(mmenu.getTemplateName());
		           mlayout.setTemplateName(homepage.getTemplateName());
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
		        },
		        changePage: function(menu_id) {
		            //console.log("changePage ", opt);
		            //if(opt == undefined || opt == null)
		              //  this.navigate(menu_id, true);
		            //else
		            this.navigate(menu_id, true);
		        },
		        //objeto com o nome dos routes a chamar com a função Router.changePage(Router.pages.login / Router.pages.registo) Assim é possível experimentar várias páginas de login
		        pages: {
		            inicial: "",
		            login: "",
		            registo: "",
		            tpc: "",
		            faltas: "",
		            testes: "",
		            config: "", //página de configuração
		            admin: "",//página do administrador
		            adminalunos: "",
		            logout: ""
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