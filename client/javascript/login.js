Meteor.startup(function () {
	
	
	
});

//----- LOGIN --------
var IDXTOPLOGIN = 1;
var IDXBOTTOMLOGIN = 1;
var IDXSIDEBARLOGIN = 1;
var IDXLOGIN = 1;
var IDXLOGINMENUTITLE = EDUTELL + "LOGIN";

Session.set("login_error", false);
Session.set("pages",IDXLOGIN);

Handlebars.registerHelper('login_error', function() {
     return Session.get("login_error");
});

Handlebars.registerHelper('login', function() {
     return Session.get("login");
});

Template.login_error.mensagem = function () {
    return "<div class='alert alert-error alert-block' style='text-align: center ;'><h4>Erro!</h4> Password ou email inválido</div>";
};

Template.form_login.preserve(["#inputEmail","#inputPassword"]);

Template.form_login.rendered = function(){
	//console.log("rendered",this.find("#registar"));
	$(this.find("#registar")).tooltip();
	
	$(this.find("form")).validate({
		
		rules: {
			password: {
				required: true,
				minlength: 6
			},
			email: {
				email: true,
				required: true
			}
		},
		errorPlacement: function(error, element) {
		
			/*
			var frag = Meteor.render(function () {
			  return '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>';
			});
			*/
	
			$(element).tooltip({animation:false, /*template: frag,*/ trigger:"manual",title: $(error).text(),placement:"right"});
			$(element).tooltip('show');
			
		},
		 success: function(label) {
		 	//console.log("label ", $(label).attr("for"));
		    //$("#" + $(label).attr("for")).tooltip('hide');
		 },
		highlight: function(element, errorClass) {
			 //console.log("error class ",errorClass);
			 $(element).addClass(errorClass).removeClass("valid");
			//$(element).tooltip('show');
		},
		unhighlight: function(element, errorClass, validClass) {
			$(element).removeClass(errorClass).addClass(validClass);
			$(element).tooltip('hide');
		},
		
		messages: {
			nome: {//colocar mensagens específicas aqui
				//required: "campo obrigatório"
			},
			password: {
				//required: "campo obrigatório",
				minlength: "<div class='alert alert-error'><small>tamanho mínimo é de 6 caracteres</small></div>"
			},
			email:{
				email: "<div class='alert alert-error'><small>introduza um email válido</small></div>"
			}
		}
		
	});
	
	//$("#registar").tooltip();
};

Template.form_login.destroyed = function(){
	//console.log("destroyed ", $('#registar'));
	//$(this.find("#registar")).tooltip();
	//$("#registar").tooltip('destroy');
};

Template.form_login.events({
 	'submit' : function(event,obj_template){
 		event.preventDefault();
 		event.stopPropagation();
 		//console.log("template origem ",this);
 		var email = $.trim($('#inputEmail').val());
 		var password = $.trim($('#inputPassword').val());
 		
 		//if(isValidEmailAddress(email))
 		if($('form').valid()){
 			Meteor.loginWithPassword(email, password, flogin);
 		}else{
 			$('#inputEmail').val("");
 			$('#inputPassword').val("");
 		}
 		//return false;
	},
	'focus #inputEmail, focus #inputPassword': function(event,obj_template){
		//console.log("keypress");
		Session.set("login_error",false);
		event.stopPropagation();
	},
	'click #registar': function(event,obj_template){
		//console.log("registar");
		//Router.changePage("registo");
		$("#registar").tooltip('destroy');
		Router.changePage(Router.pages.registo);
		event.preventDefault();
	}
});

//----- FUNCTIONS HELP --------
var flogin = function(error,result){
	   	
	   	
	//console.log("user login? ",result);
	
	if(!error){//error é null se o utilizador foi criado
		console.log("user loaded!!!", Meteor.userLoaded());
		console.log("user login!!!", Meteor.user());
		
		//login = false;
		//console.log("login ",login);
		//Session.set("login",false);
		//Router.changePage("login");
		Session.set("login",true);
		Session.set("show_login",false);
		login = true;
		Router.changePage(Router.pages.inicial);
		//Session.set("login_error", false);
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
 		Session.set("menu_title",IDXLOGINMENUTITLE);
 		//Session.set("top",IDXTOPLOGIN);
 		Session.set("top",IDXTOPDEFAULT);
  		Session.set("bottom",IDXBOTTOMDEFAULT);
  		Session.set("sidebar-left",IDXLSIDEBARDEFAULT);
  		Session.set("sidebar-right",IDXRSIDEBARDEFAULT);
  		Session.set("show_login",false);
  		Session.set("inicio","");
});

Router.pages.login = "login";

/*function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};*/
