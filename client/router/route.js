var idx;
var arrPag = [[{pag:"color_list"}],[{pag:"form_login"}],[{pag:"home"},{pag:"off"}]];
var arrTop = ["","toplogin"];
var arrBottom = ["","bottomlogin"];
var arrSidebar = ["","sidebar"];

//----- DEFAULTS -------- 
var IDXTOPDEFAULT = 0;
var IDXBOTTOMDEFAULT = 0;
var IDXPAGEDEFAULT = 0;
var IDXSIDEBARDEFAULT = 0;

//----- LOGIN --------
var IDXTOPLOGIN = 1;
var IDXBOTTOMLOGIN = 1;
var IDXSIDEBARLOGIN = 1;
var IDXLOGIN = 1;

//----- SESSION DEFAULTS --------
Session.set("pages",IDXPAGEDEFAULT);
Session.set("top",IDXTOPDEFAULT);
Session.set("bottom",IDXBOTTOMDEFAULT);
Session.set("sidebar",IDXSIDEBARDEFAULT);
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
	    "login": "login",
	    "*path": "nopath" 
	  },
	  main:function(){
	  	//console.log("main ",login);
	  	//arrPag = [{pag:"color_list"}];
	  	Session.set("pages",IDXPAGEDEFAULT);
	  	Session.set("top",IDXTOPDEFAULT);
  		Session.set("bottom",IDXBOTTOMDEFAULT);
  		Session.set("sidebar",IDXSIDEBARDEFAULT);
	  },
	  login: function(){
	  	
	  	Session.set("page_id", "login");
	    //arrPag = [{pag:"home"},{pag:"off"}];
	    //var idx = arrPag.push([{pag:"login"}]);
 		//Session.set("pages",arrPag);
 		Session.set("pages",IDXLOGIN);
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
	  }
});
	
Router = new MenuRouter;
 
 Meteor.startup(function () {
  	Backbone.history.start({pushState: true});
  	console.log("backbone start");
 });
 