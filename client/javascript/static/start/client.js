Meteor.startup(function () {
	
	$.extend($.validator.messages, {//colocar mensagens comuns aqui. 
  		required: "<div class='alert alert-error'><small>campo obrigatório</small></div>",
  		number: "<div class='alert alert-error'><small>campo numérico</small></div>"
  		//email: "Bitte eine gültige E-Mail-Adresse eingeben",
	});
	
});

//----- SESSION DEFAULTS --------
//Session.set("pages",IDXPAGEDEFAULT);
Session.set("menu",mEdutell.IDXDEFAULTMENU);
Session.set("menu_title",mEdutell.IDXDEFAULTMENUTITLE);
Session.set("show_login",true);
Session.set("top",mEdutell.IDXTOPDEFAULT);
Session.set("bottom",mEdutell.IDXBOTTOMDEFAULT);
Session.set("sidebar-left",mEdutell.IDXLSIDEBARDEFAULT);
Session.set("sidebar-right",mEdutell.IDXRSIDEBARDEFAULT);


var extra = {name: "Luis Fernandes", dt:"30-12-1968"};
var options = {username: "saguas", email: "luisfmfernandes@gmail.com", password: "8950388" };
//var login = false;
// variáveis que controlam se já foi feito login
Session.set("login",false);
var login = false;



function clearTooltip(objevent){
	//console.log("clearTooltip");
	
	//if(objevent.type != "text" && objevent.type != "password"){
	$.each($('.error'),function(i,o){
	//$.each($('.tooltip'),function(i,o){
		$(o).removeClass("error");
		//console.log("o error ",o);
		$(o).tooltip("destroy");
	});
	//}
	
	if(objevent.type != null && objevent.type != undefined && objevent.type != "text" && objevent.type != "password" && objevent.type != "submit" && objevent.type != "button" ){
		
		$.each($('[rel="tooltip"]'),function(i,o){
		//$.each($('.tooltip'),function(i,o){
			//console.log("o tooltip",o);
			$(o).tooltip("destroy");
		});
	}
};

//eventos do layout
_.extend(mEdutell.layout_events, {
	
	'click': function(event){
		//console.log("origem ",event.currentTarget);
		
		clearTooltip(event.currentTarget);
	}
	
});

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

//clearTooltip();

  //var arrPag = [{pag:"home"}];
  //var arrPag = [[{pag:"color_list"}]];
  
  //Session.set("pages",arrPag);



//----- SESSION DEFAULTS --------
//Session.set("pages",IDXPAGEDEFAULT);

//Session.set("login",true);

//----- TPC --------
//idx = arrPag.push([{pag:"form_login"}]);
//var IDXLOGIN = idx - 1;
//var IDXTPC = 2;
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
	  	Session.set("pages",mEdutell.IDXPAGEDEFAULT);
	  	//Session.set("pages",IDXLOGIN);
	  	Session.set("top",mEdutell.IDXTOPDEFAULT);
	  	//Session.set("top",IDXTOPLOGIN);
  		Session.set("bottom",mEdutell.IDXBOTTOMDEFAULT);
  		Session.set("sidebar-left",mEdutell.IDXLSIDEBARDEFAULT);
  		Session.set("sidebar-right",mEdutell.IDXRSIDEBARDEFAULT);
  		//Session.set("menu_title",IDXLOGINMENUTITLE);
  		//Session.set("menu_title",IDXLOGINMENUTITLE);
  		Session.set("menu_title",mEdutell.IDXHOMEMENUTITLE);
  		
  		if(!login)
  			Session.set("show_login",true);
  		
	  },
	  tpc: function (turma_id,aluno_id) {
	    Session.set("page_id", "tpc");
	    //arrPag = [{pag:"home"},{pag:"off"}];
	    //var idx = arrPag.push([{pag:"home"},{pag:"off"}]);
 		//Session.set("pages",arrPag);
 		Session.set("pages",mEdutell.IDXTPC);
	    
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
	
mEdutell.Router = new MenuRouter;

mEdutell.Router.pages.inicial = "";
  
//var login = true;

//----- HANDLEBARS --------
  
  // if Router is defined, provide a currentPage helper
  Handlebars.registerHelper('currentPage', function() {
  	
  	  //console.log("currentPage ",JSON.stringify(arrPages[Session.get("pages")]));//arrPages[Session.get("pages")].toJSON());
  	  return mEdutell.arrPages[Session.get("pages")].toJSON();
      //return JSON.stringify(arrPages[Session.get("pages")]);
  });
  
  Handlebars.registerHelper('welcomes', function() {
  	//console.log("template ",this.page);
    if (Template[this.page]) //verifica se há um template com o node dado por this.pag
      	return Template[this.page]();//chama o template registado com o nome de this.page
  });
  
  Handlebars.registerHelper('menu', function() {
	    if (Template[mEdutell.arrMenu[Session.get("menu")]]) //verifica se há um template com o node dado por this.pag
	      return Template[mEdutell.arrMenu[Session.get("menu")]]();//chama o template registado com o nome de this.page
   });  
   
  Handlebars.registerHelper('top', function() {
  	//console.log("top ",arrTop[Session.get("top")].at(0).get("page"));
    if (Template[mEdutell.arrTop[Session.get("top")].at(0).get("page")]) //verifica se há um template com o node dado por this.pag
      return Template[mEdutell.arrTop[Session.get("top")].at(0).get("page")]();//chama o template registado com o nome de this.page
  });
  
  Handlebars.registerHelper('bottom', function() {
     if (Template[mEdutell.arrBottom[Session.get("bottom")].at(0).get("page")]) //verifica se há um template com o node dado por this.pag
      return Template[mEdutell.arrBottom[Session.get("bottom")].at(0).get("page")]();//chama o template registado com o nome de this.page
  });
  
   Handlebars.registerHelper('sidebar-left', function() {
     if (Template[mEdutell.arrSidebarLeft[Session.get("sidebar-left")].at(0).get("page")]) //verifica se há um template com o node dado por this.pag
      return Template[mEdutell.arrSidebarLeft[Session.get("sidebar-left")].at(0).get("page")]();//chama o template registado com o nome de this.page
  });
  
  Handlebars.registerHelper('sidebar-right', function() {
     if (Template[mEdutell.arrSidebarRight[Session.get("sidebar-right")].at(0).get("page")]) //verifica se há um template com o node dado por this.pag
      return Template[mEdutell.arrSidebarRight[Session.get("sidebar-right")].at(0).get("page")]();//chama o template registado com o nome de this.page
  });

//trata dos eventos do layout
Template.layout.events(mEdutell.layout_events);
  
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


 	