Meteor.startup(function () {
	
});

//----- LOGIN REGISTO --------
mEdutell.IDXREGISTO = 2;
mEdutell.IDXTOPREGISTO = 2;
mEdutell.IDXBOTTOMREGISTO = 2;
mEdutell.IDXSIDEBARREGISTO = 2;
mEdutell.IDXREGISTOMENUTITLE = mEdutell.EDUTELL + "NOVO REGISTO";


//var tipo = "aluno";
//tipo: tipo de inscrição: aluno; EE ou prof
var registoObj = {};

registoObj.profile = {tipo: "aluno"};

Session.set("aluno",true);

//Template.form_registo.preserve(["#registoNome","#resgistoSobrenome","#registoEscola","#registoTurma","#registoTurmas","#registoEmail",".tipo"]);

Template.form_registo.rendered = function(){
	//console.log("rendered",this.find("form"));
	

	$(this.find("#login")).tooltip();
	
	
	$(this.find("form")).validate({
		
		rules: {
			nome: {
				required: true
			},
			snome: {
				required: true
			},
			password: {
				required: true,
				minlength: 6
			},
			password_again: {
				required: true,
				equalTo: '#registoPassword'
			},
			turma: {
				required: true
			},
			numero: {
				number: true,
				required: true
			},
			email: {
				email: true,
				required: true
			},
			escola:{
				number: true,
				required: true
			}
		},
		errorPlacement: function(error, element) {
		
			$(element).tooltip({animation:false, trigger:"manual",title: $(error).text(),placement:"right",selector:"#registoNome"});
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
				//minlength: "tamanho mínimo é de 6 caracteres"
			},
			password_again: {
				equalTo: "<div class='alert alert-error'><small>introduza o valor igual ao do campo anterior</small></div>"
			},
			email:{
				email: "<div class='alert alert-error'><small>introduza um email válido</small></div>"
			}
		}
		
	});
	
	$("#" + registoObj.profile.tipo).button('toggle');
	$('form #aluno').toggleClass("btn-warning btn-inverse");
	$('form #EE').toggleClass("btn-warning btn-inverse");
	$('form #prof').toggleClass("btn-warning btn-inverse");
	$('form #' + registoObj.profile.tipo).toggleClass("btn-warning btn-inverse");
};

Template.form_registo.destroyed = function(){
	//console.log("destroyed ", $('#registar'));
	//$(this.find("#registar")).tooltip();
	
	 //$("#login").tooltip('destroy');
	// clearTooltip();
	/*$.each($('.error'),function(i,o){
		$(o).removeClass("error");
		//console.log("o ",o);
		$(o).tooltip("destroy");
	});*/
	//$('#registoEscola').popover("destroy");
};


Handlebars.registerHelper('aluno', function() {
     return Session.get("aluno");
});


Template.form_registo.events({
 	'submit' : function(event,obj_template){
 		event.preventDefault();
 		event.stopPropagation();
 		//event.stopImmediatePropagation();
 		//console.log("form registo");
 		//console.log("template origem ",$('form').valid());
 		if($('form').valid()){
 			
	 		registoObj.profile.nome = $.trim($('#registoNome').val());
	 		registoObj.profile.sobrenome = $.trim($("#registoSobrenome").val());
	 		//console.log("sobrenome ",$("#registoSobrenome").val());
	 		
	 		
	 		if(registoObj.profile.tipo == "prof"){
				
				registoObj.profile.cescola = $.trim($("#registoEscola").val());
				//---------- extrai as turmas, no caso do prof, do textarea
				//a função grep retira os casos em que existe uma linha em branco e retorna um array com as turmas.
				/*
				var tmp = $.grep($("#registoTurmas").val().split("\n"), function(val,idx){
					return $.trim(val) == "" ? false : true;
					
				});
				
				//tira de cada turma possíveis espaços no fim ou no início
				registoObj.turmas = $.map(tmp,function(val,idx){
					//console.log("map ",val);
					return $.trim(val);
				});*/
				
				//console.log("turmas ", registoObj.turmas);
				//------------------------------------------------------------
			}
			
			registoObj.email = $.trim($("#registoEmail").val());
			registoObj.password = $.trim($("#registoPassword").val());
			//_.extend(tmpObj, {"email": registoObj.email,"password":registoObj.password});
			
			Accounts.createUser(registoObj,function(error){
					
					if(!error){
						Session.set("login",true);
						login = true;
						mEdutell.Router.changePage(mEdutell.Router.pages.login);			
					}else{
						//console.log("erro! Código da escola inválido ou já utilizado");
						$('#registoEscola').popover({trigger:"manual",title: "ERRO!",content:"Código da escola e email não coincidem ou já utilizados"});
						$('#registoEscola').popover("show");
					}	
			});
			
 		}else{
 			$("#registoPassword").val("");
 			$("#registoPasswordVer").val("");
 		}
 		
 		//return false;
	},
	'click .tipo': function(event,obj_template){
		//console.log("id target %s id old %s",event.target.id,registoObj.tipo);
		
		if(event.target.id != registoObj.profile.tipo){
			$('form #' + event.target.id).toggleClass('btn-warning btn-inverse');
			$('form #' + registoObj.profile.tipo).toggleClass("btn-warning btn-inverse");
			registoObj.profile.tipo = event.target.id;
		
			switch(registoObj.profile.tipo){
				case "aluno":
					Session.set("aluno",true);
					break;
				case "EE":
					Session.set("aluno",true);
					break;
				case "prof":
					Session.set("aluno",false);
					break;
			}
		}
		
		//clearTooltip();
		//console.log("tipo ",tipo);
	},
	'click #login': function(event,obj_template){
		//console.log("registar");
		//Router.changePage("registo");
		//clearTooltip();
		$("#login").tooltip('destroy');
		mEdutell.Router.changePage(mEdutell.Router.pages.login);
		event.preventDefault();
	},
	"click #registoEscola": function(event){
		$('#registoEscola').popover("destroy");
	} 
});

mEdutell.Router.route("registo","registo",function(){
	  	Session.set("pages",mEdutell.IDXREGISTO);
	  	//Session.set("top",IDXTOPREGISTO);
	  	Session.set("top",mEdutell.IDXTOPDEFAULT);
  		Session.set("bottom",mEdutell.IDXBOTTOMDEFAULT);
  		Session.set("sidebar-left",mEdutell.IDXLSIDEBARDEFAULT);
  		Session.set("sidebar-right",mEdutell.IDXRSIDEBARDEFAULT);
  		Session.set("menu_title",mEdutell.IDXREGISTOMENUTITLE);
  		if(!login)
  			Session.set("show_login",true);
});

mEdutell.Router.pages.registo="registo";


/*function clearTooltip(){
	
	if(!(Session.equals("menu_title",IDXREGISTOMENUTITLE) || Session.equals("menu_title",IDXLOGINMENUTITLE))){
		console.log("clearTooltip");
		$.each($('.error'),function(i,o){
			$(o).removeClass("error");
			//console.log("o ",o);
			$(o).tooltip("destroy");
		});
	};
	/*$.each($('#registo')[0].elements,function(i,o){
      	    
      	    if(o && $(o).attr('type') != "button" && $(o).attr('type') != "submit"){
      	    	console.log("o ",o);
      	    	$(o).tooltip("destroy");
      	    } 	
    });*/
//};

//alternativa ao de cima
/*
Router.on("route:registo", function(page) {
  console.log("Router registo");
});
*/

