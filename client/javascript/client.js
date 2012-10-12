Meteor.startup(function () {
	
	$.extend($.validator.messages, {//colocar mensagens comuns aqui. 
  		required: "<div class='alert alert-error'><small>campo obrigatório</small></div>",
  		number: "<div class='alert alert-error'><small>campo numérico</small></div>"
  		//email: "Bitte eine gültige E-Mail-Adresse eingeben",
	});
	
});

//------------ arrays com a estrutura de página. Cada entrada corresponde a um template ou a um array de templates (caso de arrPag)
var arrPag = [[{pag:"color_list"}],[{pag:"form_login"}],[{pag:"form_registo"}],[{pag:"home"},{pag:"off"}]];
var arrTop = ["","toplogin","topregisto"];
var arrBottom = ["","bottomlogin"];
var arrSidebar = ["","sidebar"];
var arrMenu = [""];
var EDUTELL = "EDUTELL ";

//----- DEFAULTS -------- 
var IDXTOPDEFAULT = 0;
var IDXBOTTOMDEFAULT = 0;
var IDXPAGEDEFAULT = 0;
var IDXSIDEBARDEFAULT = 0;
var IDXDEFAULTMENU = 0;
var IDXDEFAULTMENUTITLE = "Title";

//----- SESSION DEFAULTS --------
//Session.set("pages",IDXPAGEDEFAULT);
Session.set("menu",IDXDEFAULTMENU);
Session.set("menu_title",IDXDEFAULTMENUTITLE);
Session.set("show_login",true);
Session.set("top",IDXTOPDEFAULT);
Session.set("bottom",IDXBOTTOMDEFAULT);
Session.set("sidebar",IDXSIDEBARDEFAULT);


var extra = {name: "Luis Fernandes", dt:"30-12-1968"};
var options = {username: "saguas", email: "luisfmfernandes@gmail.com", password: "8950388" };
//var login = false;

// variáveis que controlam se já foi feito login
Session.set("login",false);
var login = false;

  //var arrPag = [{pag:"home"}];
  //var arrPag = [[{pag:"color_list"}]];
  
  //Session.set("pages",arrPag);



//----- SESSION DEFAULTS --------
//Session.set("pages",IDXPAGEDEFAULT);

//Session.set("login",true);

//----- TPC --------
//idx = arrPag.push([{pag:"form_login"}]);
//var IDXLOGIN = idx - 1;
var IDXTPC = 2;
//idx = arrPag.push([{pag:"home"},{pag:"off"}]);

//var IDXTPC = idx - 1;
////////// Tracking vários menus URL //////////
 //a cada novo menu guarda-se um registo no history do browser

var MenuRouter = Backbone.Router.extend({
	  routes: {
	  	"": "main",//página inicial
	    "tpc": "tpc",
	    "tpc/:turma_id": "tpc",
	    "tpc/:turma_id/:aluno_id": "tpc",
	    //"login": "login",
	    //"registo": "registo",
	    "*path": "nopath" 
	  },
	  main:function(){
	  	//console.log("main ",login);
	  	//arrPag = [{pag:"color_list"}];
	  	//Session.set("pages",IDXPAGEDEFAULT);
	  	Session.set("pages",IDXLOGIN);
	  	//Session.set("top",IDXTOPDEFAULT);
	  	Session.set("top",IDXTOPLOGIN);
  		Session.set("bottom",IDXBOTTOMDEFAULT);
  		Session.set("sidebar",IDXSIDEBARDEFAULT);
  		
	  },
	  tpc: function (turma_id,aluno_id) {
	    Session.set("page_id", "tpc");
	    //arrPag = [{pag:"home"},{pag:"off"}];
	    //var idx = arrPag.push([{pag:"home"},{pag:"off"}]);
 		//Session.set("pages",arrPag);
 		Session.set("pages",IDXTPC);
	    
	  },
	  nopath: function(path){
	  	console.log("nopath ",path);
	  },
	  changePage: function (menu_id) {
	  	//console.log("changePage ", menu_id);
	    this.navigate(menu_id, true);
	  },
	  //objeto com o nome dos routes a chamar com a função Router.changePage(Router.pages.login / Router.pages.registo) Assim é possível experimentar várias páginas de login
	  pages:{
	  	inicial: "",
	  	login: "",
	  	registo: "",
	  	tpc: "",
	  	faltas: "",
	  	testes: "",
	  	config: "", //página de configuração
	  	logout: ""
	  }
});
	
Router = new MenuRouter;

  
//var login = true;

//----- HANDLEBARS --------
  
  // if Router is defined, provide a currentPage helper
  Handlebars.registerHelper('currentPage', function() {
  	
      return arrPag[Session.get("pages")];
  });
  
  Handlebars.registerHelper('welcomes', function() {
  	console.log("template ",this.pag);
    if (Template[this.pag]) //verifica se há um template com o node dado por this.pag
      return Template[this.pag]();//chama o template registado com o nome de this.page
  });
  
  Handlebars.registerHelper('menu', function() {
	    if (Template[arrMenu[Session.get("menu")]]) //verifica se há um template com o node dado por this.pag
	      return Template[arrMenu[Session.get("menu")]]();//chama o template registado com o nome de this.page
   });  
   
  Handlebars.registerHelper('top', function() {
    if (Template[arrTop[Session.get("top")]]) //verifica se há um template com o node dado por this.pag
      return Template[arrTop[Session.get("top")]]();//chama o template registado com o nome de this.page
  });
  
  Handlebars.registerHelper('bottom', function() {
     if (Template[arrBottom[Session.get("bottom")]]) //verifica se há um template com o node dado por this.pag
      return Template[arrBottom[Session.get("bottom")]]();//chama o template registado com o nome de this.page
  });
  
   Handlebars.registerHelper('sidebar', function() {
     if (Template[arrSidebar[Session.get("sidebar")]]) //verifica se há um template com o node dado por this.pag
      return Template[arrSidebar[Session.get("sidebar")]]();//chama o template registado com o nome de this.page
  });
  

  
//----- TEMPLATES --------
  
 
  
  Template.color_list.colors = function () {
    return Colors.find({},{sort:{likes:-1, name:1}});
  };

 Template.color_info.maybe_selected = function(){
 	return Session.equals('session_color', this._id) ? "selected" : "";
 };
 
//----- TEMPLATES EVENTS HANDLERS--------
 
 
 Template.color_info.events = {
 	'click' : function(){
 		Session.set('session_color', this._id);
 		//Meteor.loginWithPassword("saguas", "saguas8950388", flogin);
 		//Session.set("login",false);
 		//arrPag = [{pag:"home"},{pag:"off"}];
 		//Session.set("pages",arrPag);
 		//Router.changePage("tpc");
	}
}


 	