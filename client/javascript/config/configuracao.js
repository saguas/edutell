/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Meteor.startup(function(){
     $.validator.addMethod("cpRegex", function(value, element) {
        var pattern = /[0-9]{4}\-[0-9]{3}/i;
        return this.optional(element) || pattern.test(value);
    }, "O Código postal deve ser da forma 0000-000");
});

//----- ADMIN --------
mEdutell.IDXCONFIG = 6;
mEdutell.IDXCONFIGDADOSPESSOAIS = 7;
mEdutell.IDXCONFIGINSCRICAO = 8;
mEdutell.IDXCONFIGCONFIRM = 9;
//mEdutell.IDXTOPREGISTO = 2;
//mEdutell.IDXBOTTOMREGISTO = 2;
//mEdutell.IDXSIDEBARREGISTO = 2;
mEdutell.IDXCONFIGMENUTITLE = mEdutell.EDUTELL + "CONFIGURAÇÃO";


Template.config_dados_pessoais.rendered = function() {
    
    formValidacao($(this.find("form")));
    
    $('a[data-toggle="pill"]').on('show', function (e) {
        //console.log("e.target ",e.target); // activated tab
        //console.log("e.relatedTarget ",e.relatedTarget); // previous tab
        
        return verificarForm($("form"));
        
    });
    
    
};

Template.config_dados_pessoais.events({
    'click #btnform': function(event, tmpl) {
            
            console.log("submit ");
            event.preventDefault();
            event.stopPropagation();
            //console.log("template origem ",this);
            var nome = $.trim($('#Nome').val());
            var sobrenome = $.trim($('#Sobrenome').val());

            verificarForm($(tmpl.find("form")));
       }
});

Template.menu_orig.events({
    'click .config': function(event) {
        //console.log("admin clicked ");
        Session.set("selected", ["config"]);
        Session.set("menu", mEdutell.IDXMAINMENU);
        event.preventDefault();
        mEdutell.Router.changePage(mEdutell.Router.pages.config);
       
       }
});

mEdutell.Router.route("config", "config", function() {
    mEdutell.IDXPAGEACTUAL = mEdutell.IDXCONFIG;
    Session.set("pages", mEdutell.IDXCONFIG);
    Session.set("selected", ["config","config_dados_pessoais"]);
    configSessionCommon();
    
});

mEdutell.Router.route("config_dados_pessoais", "config_dados_pessoais", function() {
    mEdutell.IDXPAGEACTUAL = mEdutell.IDXCONFIGDADOSPESSOAIS;
    Session.set("pages", mEdutell.IDXCONFIGDADOSPESSOAIS);
    Session.set("selected", ["config","configdadosP"]);
    configSessionCommon();
    
});

mEdutell.Router.route("config_inscricao", "config_inscricao", function() {
    mEdutell.IDXPAGEACTUAL = mEdutell.IDXCONFIGINSCRICAO;
    Session.set("pages", mEdutell.IDXCONFIGINSCRICAO);
    Session.set("selected", ["config","configinsc"]);
    configSessionCommon();
    
});


mEdutell.Router.route("config_confirmacao", "config_confirmacao", function() {
    mEdutell.IDXPAGEACTUAL = mEdutell.IDXCONFIGCONFIRM;
    Session.set("pages", mEdutell.IDXCONFIGCONFIRM);
    Session.set("selected", ["config","configconfirm"]);
    configSessionCommon();
    
});


var configSessionCommon = function(){
    
    mEdutell.IDXSIDEBARLEFT = 2;
    
    Session.set("menu", mEdutell.IDXMAINMENU);
    Session.set("top", mEdutell.IDXTOPDEFAULT);
    Session.set("bottom", mEdutell.IDXBOTTOMDEFAULT);
    Session.set("sidebar-left", mEdutell.IDXSIDEBARLEFT);
    Session.set("sidebar-right", mEdutell.IDXRSIDEBARDEFAULT);
    Session.set("menu_title", mEdutell.IDXCONFIGMENUTITLE);
};


mEdutell.Router.pages.config = "config";
mEdutell.Router.pages.configdadosP = "config_dados_pessoais";
mEdutell.Router.pages.configinsc = "config_inscricao";
mEdutell.Router.pages.configconfirm = "config_confirmacao";


var formValidacao = function(elem){
    
    elem.validate({

        rules: {
            nome: {
                required: true
            },
            sobrenome: {
                required: true
            },
            CPostal:{
                cpRegex: true
            }
        },
        errorClass: "help-inline",
	errorElement: "span",
        highlight: function(element, errorClass, validClass) {
            //console.log("error class ",errorClass);
            //$(element).addClass(errorClass).removeClass("valid");
            //console.log("highlight ",validClass);
            $(element).parents('.control-group').removeClass('success');
            $(element).parents('.control-group').addClass('error');
            //$(element).tooltip('show');
        },
        unhighlight: function(element, errorClass, validClass) {
            //$(element).removeClass(errorClass).addClass(validClass);
            //$(element).tooltip('hide');
            //console.log("unhighlight");
            $(element).parents('.control-group').removeClass('error');
            $(element).parents('.control-group').addClass(mEdutell.FORMCLASSSUCCESS);
        },
        messages: {
            nome: {//colocar mensagens espec√≠ficas aqui
                //required: "campo obrigat√≥rio"
            },
            password: {
                //required: "campo obrigat√≥rio",
                minlength: "<span class='label label-important'><small>tamanho mínimo é de 6 caracteres</small></pan>"
            },
            email: {
                email: "<span class='label label-important'><small>introduza um email válido</small></span>"
            },
            CPostal:{
                cpRegex:"O Código postal deve ser da forma 0000-000"
            }
        }

    });
};


var verificarForm = function(form){
  
    if (/*$('form')*/form.valid()) {
        console.log("form valid ");
        return true;
    } else {
        mEdutell.FORMCLASSSUCCESS = "success";
        return false;
        //$('#Nome').val("");
        //$('#Sobrenome').val("");
    }
    
};
