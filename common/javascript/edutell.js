Colors = new Meteor.Collection("colors");

if (Meteor.isClient) {
  
  var extra = {name: "Luis Fernandes", dt:"30-12-1968"};
  var options = {username: "saguas", email: "luisfmfernandes@gmail.com", password: "8950388" };
  
  var arrPag = [{pag:"home"}];
  
  Session.set("pages",arrPag);
  //var login = false;
  Session.set("login",false);
  
  var login = false;
  
  Handlebars.registerHelper('login', function() {//regista funções a serem chamadas mas que não se encontram dentro de nenhum template. Pode tb ser utilizado para registar funções dentro de templates (só que para estas há outras formas... ver em baixo). 
    
   	if (!Session.get("login")){
	    /*Meteor.createUser(options, extra, function(error){//esta função cria utilizadores
	    	
	    	if(!error)//error é null se o utilizador foi creado
	    		console.log("user criado!!!");
	    	else
	    		console.log("utilizador não foi criado com sucesso!",error);
	    	
	    });*/
	   
	   console.log("registerHelper login");
	   console.log("Meteor.loginWithPassword ", Meteor.loginWithPassword("saguas", "saguas8950388", flogin));
	   
	   //Session.set("login",login);
    }
    
    console.log("registerHelper login out");
    //return login;
    return Session.get("login");
   // return login;
  });
  
  // if Router is defined, provide a currentPage helper
  Handlebars.registerHelper('currentPage', function() {
      return Session.get("pages");
  });
  
  Handlebars.registerHelper('welcome', function() {
    if (Template[this.pag]) //verifica se há um template com o node dado por this.pag
      return Template[this.pag]();//chama o template registado com o nome de this.page
  });
  
  Template.color_list.colors = function () {
    return Colors.find({},{sort:{likes:-1, name:1}});
  };

 Template.color_info.maybe_selected = function(){
 	return Session.equals('session_color', this._id) ? "selected" : "";
 };
 
 Template.color_info.events = {
 	'click' : function(){
 		Session.set('session_color', this._id);
 		//Session.set("login",true);
 		//arrPag = [{pag:"home"},{pag:"off"}];
 		//Session.set("pages",arrPag);
 		//Router.changePage("tpc");
 	}
 };
 
 flogin = function(error,result){
	   	
	   	
	   		console.log("user login? ",result);
	   		
	   		if(!error){//error é null se o utilizador foi creado
	    		console.log("user login!!!", Meteor.user());
	    		login = true;
	    		console.log("login ",login);
	    		Session.set("login",true);
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
	   	
 
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
     Colors.allow({
     	insert:function(userId, doc){
     		console.log("insert userid ",userId);
     		return false;
     }});
     Meteor.accounts.validateNewUser(function(proposedUser){//esta função é chamada de de Meteor.accounts.onCreateUser
    	
    	console.log("o utilizador proposto é: ",proposedUser);
    	
    	return true;
    	
    });
    
    Meteor.accounts.onCreateUser(function(options, extra, user){ //esta função é chamada antes de Meteor.accounts.validateNewUser 
    	console.log("onCreateUser user:",user);
    	
    	return _.extend(user,extra);//é necessário copiar o extra para user. Se não for feito os campos de extra não entram em user (no caso desta função existir).
    	
    	//return user;	
    });
   
    
  });
  
  
  
}