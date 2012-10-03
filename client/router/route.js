

////////// Tracking vários menus URL //////////
 //a cada novo menu guarda-se um registo no history do browser

	var MenuRouter = Backbone.Router.extend({
	  routes: {
	  	"": "main",//página inicial
	    "tpc": "tpc",
	    "tpc/:turma_id": "tpc",
	    "tpc/:turma_id/:aluno_id": "tpc",
	    "*path": "nopath" 
	  },
	  main:function(){
	  	console.log("main");
	  	arrPag = [{pag:"home"}];
	  	Session.set("pages",arrPag);
	  },
	  tpc: function (turma_id,aluno_id) {
	    Session.set("page_id", "tpc");
	    arrPag = [{pag:"home"},{pag:"off"}];
 		Session.set("pages",arrPag);
	    
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
 