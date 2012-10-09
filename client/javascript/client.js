Meteor.startup(function () {
	
});

var extra = {name: "Luis Fernandes", dt:"30-12-1968"};
var options = {username: "saguas", email: "luisfmfernandes@gmail.com", password: "8950388" };
  
  //var arrPag = [{pag:"home"}];
  //var arrPag = [[{pag:"color_list"}]];
  
  //Session.set("pages",arrPag);

  
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
 		Meteor.loginWithPassword("saguas", "saguas8950388", flogin);
 		//Session.set("login",false);
 		//arrPag = [{pag:"home"},{pag:"off"}];
 		//Session.set("pages",arrPag);
 		//Router.changePage("tpc");
		}
}

//----- FUNCTIONS HELP --------
var flogin = function(error,result){
	   	
	   	
	//console.log("user login? ",result);
	
	if(!error){//error é null se o utilizador foi criado
		console.log("user login!!!", Meteor.user());
		//login = false;
		//console.log("login ",login);
		//Session.set("login",false);
		Router.changePage("login");
		/*Meteor.logout(function(error){
			console.log("error logout? ",error);
		});*/
		/*Meteor.changePassword("8950388", "saguas8950388", function(error){
			console.log("change password ",error);
		});*/
	}
	
	else
		console.log("utilizador não fez login com sucesso!",error);
	    	
}

 	