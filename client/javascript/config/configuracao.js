/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Meteor.startup(function(){
     $.validator.addMethod("cpRegex", function(value, element) {
        var pattern = /^[0-9]{4}\-\d{3}$/;
        return this.optional(element) || pattern.test(value);
    }, "O Código postal deve ser da forma 0000-000");
    
     $.validator.addMethod(
        "DateFormat",
        function(value, element) {
            //console.log("DateFormat ",value);
            return value.match(/^\d\d?\-\d\d?\-\d\d\d\d$/);
        },"Please enter a date in the format dd/mm/yyyy");
        
     $.validator.addMethod("telRegex", function(value, element) {
        //var pattern = /[0-9]{9}/i;
        //var pattern = /^9[1236][0-9]{7}$|^2[1-9][0-9]{7}$/;
        var pattern = /^9[1236][0-9]{1}\s?[0-9]{3}\s?[0-9]{3}$|^2[1-9]{2}\s?[0-9]{3}\s?[0-9]{3}$/;
        //return value.match(/9[1236][0-9]{7}|2[1-9][0-9]{7}/);
        
        return this.optional(element) || pattern.test(value);
     }, "Introduza apenas 9 digitos");

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
    
    
    var form = $(this.find(".form-horizontal"));
    formValidacao(form);
    
    $('a[data-toggle="pill"]').on('show', function (e) {
        //console.log("e.target ",e.target); // activated tab
        //console.log("e.relatedTarget ",e.relatedTarget); // previous tab
        
        return verificarForm($(".form-horizontal"));
        
    });
    
    var dtn = $(this.find('#dp3'));
    //var elem = this.find('#dtn');
    dtn.datepicker.setdatestring({
                days: ["Sundays", "Mondays", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
                daysMin: ["Do", "Se", "Te", "Qt", "Qt", "Se", "Sa", "Do"],
                months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    });
    
    
    dtn.datepicker()
        .on('show', function(ev){
          //if (ev.date.valueOf() < startDate.valueOf()){
            //console.log("show ",ev);
            //$('#dp3').datepicker('setValue',"28-10-2012");
          //}
           //if (/*$('form')*/form.valid()) {};
           /*
           if(formerror){          
                //$(".datepicker").attr("rel","popover");
                //console.log("formerror ",  $('.datepicker'));
                $(".datepicker").popover({placement:"top",title: 'Ajuda Calendário', content: "Click aqui uma vez para escolher o mês. Click uma segunda vez para escolher o ano!"}); 
                $(".datepicker").popover('show');
                //$(".datepicker").attr("rel","");
           }*/
           dtn.datepicker('setValue',new Date(today.getFullYear()-10, today.getMonth(),today.getDate()));//"28-10-2012");
                //$('.popdtn').popover('show');
        });
    dtn.datepicker()
        .on('hide', function(ev){
          //if (ev.date.valueOf() < startDate.valueOf()){
            //console.log("show ",ev);
            //$('#dp3').datepicker('setValue',"28-10-2012");
          //}
           //if (/*$('form')*/form.valid()) {};
           //console.log("formerror ",  $('.datepicker'));
           /*if(formerror){          
                //$(".datepicker").attr("rel","popover");
                //console.log("formerror ",  $('.datepicker'));
                //$(".datepicker").popover({placement:"top",title: 'Twitter Bootstrap Popover', content: "It's so simple to create a tooltop for my website!"}); 
                $(".datepicker").popover('destroy');
                formerror = false;
           }*/
                
                //$('.popdtn').popover('show');
        });
        
    dtn.datepicker()
        .on('changeDate', function(ev){
          //if (ev.date.valueOf() < startDate.valueOf()){
            //console.log("changeDate ",ev);
            //$('#dp3').datepicker('setValue',"28-10-2012");
          //}
           //console.log("$.validator ",$.validator);
           /*if (form.validate().element(elem)) {
               console.log("form ", dtn);//é preciso encontrar outra solução
           };*/
         
        });
        
    dtn.datepicker()
        .on('clickDate', function(ev){
          //if (ev.date.valueOf() < startDate.valueOf()){
            //console.log("clickDate ",ev);
            //$('#dp3').datepicker('setValue',"28-10-2012");
          //}
           //console.log("$.validator ",$.validator);
           /*if (form.validate().element(elem)) {
               console.log("form ", dtn);//é preciso encontrar outra solução
           };*/
          
        });
    
    if(!this.dtn){
        //dtn.datepicker({viewMode:2});//"28-10-2012");
        var today = new Date();
        dtn.datepicker('setValue',today);//"28-10-2012");
        this.dtn = true;
        //console.log("RENDERED ",this.dtn);
    }
    //dtn.datepicker();  
    
    
};

Template.config_dados_pessoais.destroyed = function() {
    var dtn = $('.datepicker');
    //console.log("destroyed ",dtn);
    this.dtn = false;
    
    dtn.hide();//verificar se é possível remover do dom.
};

Template.config_dados_pessoais.events({
    'click #btnform': function(event, tmpl) {
            
            console.log("submit ");
            event.preventDefault();
            event.stopPropagation();
            //console.log("template origem ",this);
            var nome = $.trim($('#Nome').val());
            var sobrenome = $.trim($('#Sobrenome').val());
           
            //console.log("form click button ",$(tmpl.find(".form-horizontal")));
            verificarForm($(tmpl.find(".form-horizontal")));
       },
    'keypress #tel': function(ev,tmpl){
         //console.log(ev);//.srcElement.value);
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
            },
            dtn:{
                DateFormat: true
            },
            tel:{
                //number: true,
                telRegex:true
            },
            tlm:{
                //number:true,
                telRegex:true
            }
        },
        errorClass: "help-inline",
	errorElement: "span",
        highlight: function(element, errorClass, validClass) {
            //console.log("error class ",errorClass);
            //$(element).addClass(errorClass).removeClass("valid");
            //console.log("highlight ",validClass);
            //console.log("$(element).parents('.control-group') ",$(element).parents('.control-group'));
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
                cpRegex:"<span class='label label-important'><small>O Código postal deve ser da forma 0000-000</small></span>"
            },
            tel:{
                telRegex:"<span class='label label-important'><small>Introduza 9 digitos</small></span>"
            },
            tlm:{
                telRegex:"<span class='label label-important'><small>Introduza 9 digitos</small></span>"
            }
        }

    });
};


var verificarForm = function(form){
  
    if (/*$('form')*/form.valid()) {
        var dtn = $('#dtn').val();
        if(dtn.split('-')[2] == new Date().getFullYear()){
            console.log("form invalid ");
            
            return false;
        }
        
        
        console.log("form valid ");
        return true;
    } else {
        mEdutell.FORMCLASSSUCCESS = "success";
        
        return false;
        //$('#Nome').val("");
        //$('#Sobrenome').val("");
    }
    
};





