Meteor.startup(function () {
	
	$.extend($.validator.messages, {//colocar mensagens comuns aqui. 
  		required: "<div class='alert alert-error'><small>campo obrigatório</small></div>",
  		number: "<div class='alert alert-error'><small>campo numérico</small></div>"
  		//email: "Bitte eine gültige E-Mail-Adresse eingeben",
	});
	
});

//----- LOGIN REGISTO --------
var IDXREGISTO = 2;
var IDXTOPREGISTO = 2;
var IDXBOTTOMREGISTO = 2;
var IDXSIDEBARREGISTO = 2;

//var tipo = "aluno";
//tipo: tipo de inscrição: aluno; EE ou prof
var registoObj = {tipo: "aluno"};
Session.set("aluno",true);

Template.form_registo.preserve(["#registoNome","#resgistoSobrenome","#registoPassword","#registoEscola","#registoTurma","#registoTurmas","#registoEmail","#registoPassword","#registoPasswordVer",".tipo"]);

Template.form_registo.rendered = function(){
	//console.log("rendered",this.find("form"));
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
		messages: {
			nome: {//colocar mensagens específicas aqui
				//required: "campo obrigatório"
			},
			password: {
				//required: "campo obrigatório",
				minlength: "<div class='alert alert-error'><small>tamanho mínimo é de 6 caracteres</small></div>"
			},
			password_again: {
				equalTo: "<div class='alert alert-error'><small>introduza o valor igual ao do campo anterior</small></div>"
			},
			email:{
				email: "<div class='alert alert-error'><small>introduza um email válido</small></div>"
			}
		}
		
	});
	
	$("#" + registoObj.tipo).button('toggle');
	$('form #aluno').toggleClass("btn-warning btn-inverse");
	$('form #EE').toggleClass("btn-warning btn-inverse");
	$('form #prof').toggleClass("btn-warning btn-inverse");
	$('form #' + registoObj.tipo).toggleClass("btn-warning btn-inverse");
};

Handlebars.registerHelper('aluno', function() {
     return Session.get("aluno");
});


Template.form_registo.events({
 	'submit' : function(event,obj_template){
 		event.preventDefault();
 		//console.log("template origem ",$('form').valid());
 		if($('form').valid()){
	 		registoObj.nome = $.trim($('#registoNome').val());
	 		registoObj.sobrenome = $.trim($("#resgistoSobrenome").val());
	 		if(registoObj.tipo != "prof"){
	 			registoObj.turma = $.trim($("#registoTurma").val());
				registoObj.numero = $.trim($("#registoNumero").val());
			}else{
				
				
				//---------- extrai as turmas, no caso do prof, do textarea
				//a função grep retira os casos em que existe uma linha em branco e retorna um array com as turmas.
				var tmp = $.grep($("#registoTurmas").val().split("\n"), function(val,idx){
					return $.trim(val) == "" ? false : true;
					
				});
				
				//tira de cada turma possíveis espaços no fim ou no início
				registoObj.turmas = $.map(tmp,function(val,idx){
					//console.log("map ",val);
					return $.trim(val);
				});
				//console.log("turmas ", registoObj.turmas);
				//------------------------------------------------------------
			}
			registoObj.escola = $.trim($("#registoEscola").val());
			registoObj.email = $.trim($("#registoEmail").val());
			registoObj.password = $.trim($("#registoPassword").val());
 		}
	},
	'click .tipo': function(event,obj_template){
		//console.log("id target %s id old %s",event.target.id,registoObj.tipo);
		
		if(event.target.id != registoObj.tipo){
			$('form #' + event.target.id).toggleClass('btn-warning btn-inverse');
			$('form #' + registoObj.tipo).toggleClass("btn-warning btn-inverse");
			registoObj.tipo = event.target.id;
		
			switch(registoObj.tipo){
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
		
		//console.log("tipo ",tipo);
	} 
});

Router.route("registo","registo",function(){
	  	Session.set("pages",IDXREGISTO);
	  	Session.set("top",IDXTOPREGISTO);
  		Session.set("bottom",IDXBOTTOMDEFAULT);
  		Session.set("sidebar",IDXSIDEBARDEFAULT);
});

Router.pages.registo="registo";

//alternativa ao de cima
/*
Router.on("route:registo", function(page) {
  console.log("Router registo");
});
*/

