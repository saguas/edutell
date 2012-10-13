

var idxmenu = arrMenu.push("menu_original");
var IDXMAINMENU = idxmenu - 1;

Session.set("menu",IDXMAINMENU);


  Handlebars.registerHelper('logout', function() {
  	
  	//se já fez login mostra o menu logout
      return Session.get("login");
  });
  
  Handlebars.registerHelper('show_login', function() {
  	//mostra o menu login em algumas páginas antes de fazer login
      return Session.get("show_login");
  });

 Template.menu_original.Title = function(){
  	return Session.get("menu_title");
  };
  
  Template.menu_original.events = {
  	'click .logout' : function(event){
  		event.preventDefault();
		Meteor.logout(function(error){
			if(!error){
				login = false;
				Session.set("show_login",true);
				Session.set('login', false);
				//Session.set("inicio","");
				Router.changePage(Router.pages.inicial);
			}else{
				console.log("error ao fazer logout: ",error);
			}
		});
	},
	'click .login' : function(event){
		event.preventDefault();
		Router.changePage(Router.pages.login);
	}
  };
  
Template.menu_orig.events = {
	'click .home' : function(event){
		event.preventDefault();
		//$(event.currentTarget).addClass("active");
		//$('.home').addClass("active");
		Session.set("inicio","active");
		Router.changePage(Router.pages.inicial);
		//console.log("home click ", event.currentTarget);
	}
};