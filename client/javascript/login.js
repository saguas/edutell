Meteor.startup(function () {
	
	
	
});

//----- LOGIN --------
var IDXTOPLOGIN = 1;
var IDXBOTTOMLOGIN = 1;
var IDXSIDEBARLOGIN = 1;
var IDXLOGIN = 1;


Session.set("login_error", false);
Session.set("pages",IDXLOGIN);

Handlebars.registerHelper('login_error', function() {
     return Session.get("login_error");
});

Template.login_error.mensagem = function () {
    return "<div class='alert alert-error alert-block' style='text-align: center ;'><h4>Erro!</h4> Password ou email inválido</div>";
};

Template.form_login.preserve(["#inputEmail","#inputPassword"]);

Template.form_login.rendered = function(){
	//console.log("rendered",this.find("#registar"));
	$(this.find("#registar")).tooltip();
	//$("#registar").tooltip();
};

Template.form_login.destroyed = function(){
	//console.log("destroyed ", $('#registar'));
	//$(this.find("#registar")).tooltip();
	$("#registar").tooltip('destroy');
};

Template.form_login.events({
 	'submit' : function(event,obj_template){
 		event.preventDefault();
 		//console.log("template origem ",this);
 		var email = $.trim($('#inputEmail').val());
 		var password = $.trim($('#inputPassword').val());
 		
 		if(isValidEmailAddress(email))
 			Meteor.loginWithPassword(email, password, flogin);
 		else{
 			$('#inputEmail').val("");
 			$('#inputPassword').val("");
 			Session.set("login_error",true);
 		}
	},
	'focus #inputEmail, focus #inputPassword': function(event,obj_template){
		//console.log("keypress");
		Session.set("login_error",false);
		event.stopPropagation();
	},
	'click #registar': function(event,obj_template){
		//console.log("registar");
		//Router.changePage("registo");
		Router.changePage(Router.pages.registo);
		event.preventDefault();
	}
});

//----- FUNCTIONS HELP --------
var flogin = function(error,result){
	   	
	   	
	//console.log("user login? ",result);
	
	if(!error){//error é null se o utilizador foi criado
		console.log("user login!!!", Meteor.user());
		//login = false;
		//console.log("login ",login);
		//Session.set("login",false);
		//Router.changePage("login");
		Router.changePage(Router.pages.login);
		Session.set("login_error", false);
		/*Meteor.logout(function(error){
			console.log("error logout? ",error);
		});*/
		/*Meteor.changePassword("8950388", "saguas8950388", function(error){
			console.log("change password ",error);
		});*/
	}
	
	else{
		console.log("utilizador não fez login com sucesso!",error);
		$('#inputEmail').val("");
 		$('#inputPassword').val("");
 		$('#inputPassword').blur();
 		$('#inputEmail').blur();
		Session.set("login_error", true);
	}
	    	
}

Router.route("login","login",function(){
	  	
	  	Session.set("page_id", "login");
	    //arrPag = [{pag:"home"},{pag:"off"}];
	    //var idx = arrPag.push([{pag:"login"}]);
 		//Session.set("pages",arrPag);
 		Session.set("pages",IDXLOGIN);
 		Session.set("top",IDXTOPLOGIN);
  		Session.set("bottom",IDXBOTTOMDEFAULT);
  		Session.set("sidebar",IDXSIDEBARDEFAULT);
});

Router.pages.login = "login";

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};
