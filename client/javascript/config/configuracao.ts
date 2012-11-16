/// <reference path="../static/common/variaveis/declare_vars.ts" />
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

module Config {
   
    //----- ADMIN --------
    mEdutell.IDXCONFIG = 6;
    mEdutell.IDXCONFIGDADOSPESSOAIS = 7;
    mEdutell.IDXCONFIGINSCRICAO = 8;
    mEdutell.IDXCONFIGCONFIRM = 9;
    mEdutell.IDXCONFIGMENUTITLE = mEdutell.EDUTELL + "CONFIGURAÇÃO";

   
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

        console.log("config");
        mEdutell.IDXPAGEACTUAL = mEdutell.IDXCONFIG;
        Session.set("pages", mEdutell.IDXCONFIG);
        Session.set("selected", ["config","config_dados_pessoais"]);
        configSessionCommon();
        
    });

    
    mEdutell.Router.route("config_dados_pessoais", "config_dados_pessoais", function() {
        console.log("config_dados_pessoais ");
        mEdutell.IDXPAGEACTUAL = mEdutell.IDXCONFIGDADOSPESSOAIS;
        Session.set("pages", mEdutell.IDXCONFIGDADOSPESSOAIS);
        Session.set("selected", ["config","configdadosP"]);
        configSessionCommon();
        
    });
    

    mEdutell.Router.route("config_inscricao", "config_inscricao", function() {
        mEdutell.IDXPAGEACTUAL = mEdutell.IDXCONFIGINSCRICAO;
        Session.set("pages", mEdutell.IDXCONFIGINSCRICAO);
        Session.set("selected", ["config","configinsc"]);
        //console.log("a iniciar chosen");
        configSessionCommon();
        
    });


    mEdutell.Router.route("config_confirmacao", "config_confirmacao", function() {
        mEdutell.IDXPAGEACTUAL = mEdutell.IDXCONFIGCONFIRM;
        Session.set("pages", mEdutell.IDXCONFIGCONFIRM);
        Session.set("selected", ["config","configconfirm"]);
        configSessionCommon();
        
    });

    console.log("mEdutell.Router.route ",mEdutell.Router);

    //var configSessionCommon = function(){
    function configSessionCommon():void{
        
        mEdutell.IDXSIDEBARLEFT = 2;
        
        Session.set("menu", mEdutell.IDXMAINMENU);
        Session.set("top", mEdutell.IDXTOPDEFAULT);
        Session.set("bottom", mEdutell.IDXBOTTOMDEFAULT);
        Session.set("sidebar-left", mEdutell.IDXSIDEBARLEFT);
        Session.set("sidebar-right", mEdutell.IDXRSIDEBARDEFAULT);
        Session.set("menu_title", mEdutell.IDXCONFIGMENUTITLE);
        
        var dados = dP.findOne({id:Meteor.userId()});
        if(dados)
            Session.set("dadosPessoais",true);
        else
            Session.set("dadosPessoais",false);
        
    };

    mEdutell.Router.pages.config = "config";
    mEdutell.Router.pages.configdadosP = "config_dados_pessoais";
    mEdutell.Router.pages.configinsc = "config_inscricao";
    mEdutell.Router.pages.configconfirm = "config_confirmacao";
   
}



