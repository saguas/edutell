Meteor.startup(function () {
	
	$.extend($.validator.messages, {//colocar mensagens comuns aqui. 
  		required: "<div class='alert alert-error'><small>campo obrigatório</small></div>",
  		number: "<div class='alert alert-error'><small>campo numérico</small></div>"
  		//email: "Bitte eine gültige E-Mail-Adresse eingeben",
	});
	
});

//------------ arrays com a estrutura de página. Cada entrada corresponde a um template ou a um array de templates (caso de arrPag)
var arrPag = [[{pag:"home"}],[{pag:"form_login"}],[{pag:"form_registo"}],[{pag:"home"},{pag:"off"}]];
var arrTop = ["notop","toplogin","topregisto"];
var arrBottom = ["","bottomlogin"];
var arrSidebarLeft = ["","sidebar-left"];
var arrSidebarRight = ["","sidebar-right"];
var arrMenu = [""];
var EDUTELL = "EDUTELL ";

//----- DEFAULTS -------- 
var IDXTOPDEFAULT = 0;
var IDXBOTTOMDEFAULT = 0;
var IDXPAGEDEFAULT = 0;
//sidebar left
var IDXLSIDEBARDEFAULT = 0;
//sidebar right
var IDXRSIDEBARDEFAULT = 0;
//menu
var IDXDEFAULTMENU = 0;
var IDXDEFAULTMENUTITLE = "Title";

//--- Objecto para tratamento dos eventos relacionados com o menu. Deve ser extendido por cada ficheiro que trata os menus
var menu_origEvents = {};

//----- SESSION DEFAULTS --------
//Session.set("pages",IDXPAGEDEFAULT);
Session.set("menu",IDXDEFAULTMENU);
Session.set("menu_title",IDXDEFAULTMENUTITLE);
Session.set("show_login",true);
Session.set("top",IDXTOPDEFAULT);
Session.set("bottom",IDXBOTTOMDEFAULT);
Session.set("sidebar-left",IDXLSIDEBARDEFAULT);
Session.set("sidebar-right",IDXRSIDEBARDEFAULT);


var extra = {name: "Luis Fernandes", dt:"30-12-1968"};
var options = {username: "saguas", email: "luisfmfernandes@gmail.com", password: "8950388" };
//var login = false;
// variáveis que controlam se já foi feito login
Session.set("login",false);
var login = false;


function clearTooltip(){
	console.log("clearTooltip");
	$.each($('.error,[rel="tooltip"]'),function(i,o){
		$(o).removeClass("error");
		//console.log("o ",o);
		$(o).tooltip("destroy");
	});
};

//eventos do layout
var layout_events = {
	
	'click': function(event){
		//console.log("origem ",event.target);
		clearTooltip();
	}
	
}

/*
var clearTooltip = function () {
  var update = function () {
    var ctx = new Meteor.deps.Context();  // invalidation context
    ctx.onInvalidate(update);             // rerun update() on invalidation
    ctx.run(function () {
      var menu_title = Session.get("menu_title");
      $.each($('.error'),function(i,o){
			$(o).removeClass("error");
			console.log("o ",o);
			$(o).tooltip("destroy");
	  });
      console.log("The current username is now", menu_title);
    });
  };
  update();
};
*/

clearTooltip();

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
	  	Session.set("inicio","active");
	  	Session.set("pages",IDXPAGEDEFAULT);
	  	//Session.set("pages",IDXLOGIN);
	  	Session.set("top",IDXTOPDEFAULT);
	  	//Session.set("top",IDXTOPLOGIN);
  		Session.set("bottom",IDXBOTTOMDEFAULT);
  		Session.set("sidebar-left",IDXLSIDEBARDEFAULT);
  		Session.set("sidebar-right",IDXRSIDEBARDEFAULT);
  		//Session.set("menu_title",IDXLOGINMENUTITLE);
  		//Session.set("menu_title",IDXLOGINMENUTITLE);
  		Session.set("menu_title",IDXHOMEMENUTITLE);
  		
  		if(!login)
  			Session.set("show_login",true);
  		
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

Router.pages.inicial = "";
  
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
  
   Handlebars.registerHelper('sidebar-left', function() {
     if (Template[arrSidebarLeft[Session.get("sidebar-left")]]) //verifica se há um template com o node dado por this.pag
      return Template[arrSidebarLeft[Session.get("sidebar-left")]]();//chama o template registado com o nome de this.page
  });
  
  Handlebars.registerHelper('sidebar-right', function() {
     if (Template[arrSidebarRight[Session.get("sidebar-right")]]) //verifica se há um template com o node dado por this.pag
      return Template[arrSidebarRight[Session.get("sidebar-right")]]();//chama o template registado com o nome de this.page
  });

//trata dos eventos do layout
Template.layout.events(layout_events);
  
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


 	