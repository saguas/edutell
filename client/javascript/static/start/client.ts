/// <reference path="../common/variaveis/declare_vars.ts" />

/*/// <reference path="../../../../../jquery.d.ts" />*/
//var mEdutell = MEdutell.mEdutell;

module Client{

    console.log("mEdutell ",mEdutell.EDUTELL);

    Meteor.subscribe("escolas");
    Meteor.subscribe("dadosPessoais");

    Meteor.startup(function() {
        
        $.extend($.validator.messages, {//colocar mensagens comuns aqui. 
            //required: "<div class='alert alert-error'><small>campo obrigatório</small></div>",
            required: "<span class='label label-important'><small>campo obrigatório</small></span>",
            number: "<span class='label label-important'><small>campo numérico</small></span>"
            //email: "Bitte eine gültige E-Mail-Adresse eingeben",
        });
        

    });

    //a cada novo menu guarda-se um registo no history do browser

    var MenuRouter = Backbone.Router.extend({
        routes: {
            "": "main", //página inicial
            "tpc": "tpc",
            "tpc/:turma_id": "tpc",
            "tpc/:turma_id/:aluno_id": "tpc",
            //"login": "login",
            //"registo": "registo",
            "*path": "nopath"
        },
        main: function() {
            console.log("main ",mEdutell.IDXPAGEDEFAULT);
            //arrPag = [{pag:"color_list"}];
            Session.set("menu", mEdutell.IDXMAINMENU);
            Session.set("selected", ["home"]);
            mEdutell.IDXPAGEACTUAL = mEdutell.IDXPAGEDEFAULT;
            Session.set("pages", mEdutell.IDXPAGEDEFAULT);
            //Session.set("pages",IDXLOGIN);
            Session.set("top", mEdutell.IDXTOPDEFAULT);
            //Session.set("top",IDXTOPLOGIN);
            Session.set("bottom", mEdutell.IDXBOTTOMDEFAULT);
            Session.set("sidebar-left", mEdutell.IDXLSIDEBARDEFAULT);
            Session.set("sidebar-right", mEdutell.IDXRSIDEBARDEFAULT);
            //Session.set("menu_title",IDXLOGINMENUTITLE);
            //Session.set("menu_title",IDXLOGINMENUTITLE);
            Session.set("menu_title", mEdutell.IDXHOMEMENUTITLE);
            //console.log("main fim");
            //if (!login)
              //  Session.set("show_login", true);

        },
        tpc: function(turma_id, aluno_id) {
            Session.set("page_id", "tpc");
            //arrPag = [{pag:"home"},{pag:"off"}];
            //var idx = arrPag.push([{pag:"home"},{pag:"off"}]);
            //Session.set("pages",arrPag);
            Session.set("pages", mEdutell.IDXTPC);

        },
        nopath: function(path) {
            Session.set("selected", ["home"]);
            mEdutell.IDXPAGEACTUAL = mEdutell.IDXPAGEDEFAULT;
            Session.set("pages", mEdutell.IDXPAGEDEFAULT);
            //Session.set("pages",IDXLOGIN);
            Session.set("top", mEdutell.IDXTOPDEFAULT);
            //Session.set("top",IDXTOPLOGIN);
            Session.set("bottom", mEdutell.IDXBOTTOMDEFAULT);
            Session.set("sidebar-left", mEdutell.IDXLSIDEBARDEFAULT);
            Session.set("sidebar-right", mEdutell.IDXRSIDEBARDEFAULT);
            //Session.set("menu_title",IDXLOGINMENUTITLE);
            //Session.set("menu_title",IDXLOGINMENUTITLE);
            Session.set("menu_title", mEdutell.IDXHOMEMENUTITLE);
            console.log("nopath ", path);
        },
        changePage: function(menu_id) {
            //console.log("changePage ", opt);
            //if(opt == undefined || opt == null)
              //  this.navigate(menu_id, true);
            //else
            this.navigate(menu_id, true);
        },
        //objeto com o nome dos routes a chamar com a função Router.changePage(Router.pages.login / Router.pages.registo) Assim é possível experimentar várias páginas de login
        pages: {
            inicial: "",
            login: "",
            registo: "",
            tpc: "",
            faltas: "",
            testes: "",
            config: "", //página de configuração
            admin: "",//página do administrador
            adminalunos: "",
            logout: ""
        }
    });

    /*
    class MenuRouter extends Backbone.Router{
        routes: {} = {
            "": "main", //página inicial
            "tpc": "tpc",
            "tpc/:turma_id": "tpc",
            "tpc/:turma_id/:aluno_id": "tpc",
            //"login": "login",
            //"registo": "registo",
            "*path": "nopath"
        };
        main() {
            console.log("main ",mEdutell.IDXPAGEDEFAULT);
            //arrPag = [{pag:"color_list"}];
            Session.set("menu", mEdutell.IDXMAINMENU);
            Session.set("selected", ["home"]);
            mEdutell.IDXPAGEACTUAL = mEdutell.IDXPAGEDEFAULT;
            Session.set("pages", mEdutell.IDXPAGEDEFAULT);
            //Session.set("pages",IDXLOGIN);
            Session.set("top", mEdutell.IDXTOPDEFAULT);
            //Session.set("top",IDXTOPLOGIN);
            Session.set("bottom", mEdutell.IDXBOTTOMDEFAULT);
            Session.set("sidebar-left", mEdutell.IDXLSIDEBARDEFAULT);
            Session.set("sidebar-right", mEdutell.IDXRSIDEBARDEFAULT);
            //Session.set("menu_title",IDXLOGINMENUTITLE);
            //Session.set("menu_title",IDXLOGINMENUTITLE);
            Session.set("menu_title", mEdutell.IDXHOMEMENUTITLE);

            //if (!login)
              //  Session.set("show_login", true);

        };
        tpc(turma_id, aluno_id) {
            Session.set("page_id", "tpc");
            //arrPag = [{pag:"home"},{pag:"off"}];
            //var idx = arrPag.push([{pag:"home"},{pag:"off"}]);
            //Session.set("pages",arrPag);
            Session.set("pages", mEdutell.IDXTPC);

        };
        nopath(path) {
            Session.set("selected", ["home"]);
            mEdutell.IDXPAGEACTUAL = mEdutell.IDXPAGEDEFAULT;
            Session.set("pages", mEdutell.IDXPAGEDEFAULT);
            //Session.set("pages",IDXLOGIN);
            Session.set("top", mEdutell.IDXTOPDEFAULT);
            //Session.set("top",IDXTOPLOGIN);
            Session.set("bottom", mEdutell.IDXBOTTOMDEFAULT);
            Session.set("sidebar-left", mEdutell.IDXLSIDEBARDEFAULT);
            Session.set("sidebar-right", mEdutell.IDXRSIDEBARDEFAULT);
            //Session.set("menu_title",IDXLOGINMENUTITLE);
            //Session.set("menu_title",IDXLOGINMENUTITLE);
            Session.set("menu_title", mEdutell.IDXHOMEMENUTITLE);
            console.log("nopath ", path);
        };
        changePage(menu_id) {
            console.log("changePage ");
            //if(opt == undefined || opt == null)
              //  this.navigate(menu_id, true);
            //else
            this.navigate(menu_id, {trigger: true});
        };
        //objeto com o nome dos routes a chamar com a função Router.changePage(Router.pages.login / Router.pages.registo) Assim é possível experimentar várias páginas de login
        pages: {} = {
            inicial: "",
            login: "",
            registo: "",
            tpc: "",
            faltas: "",
            testes: "",
            config: "", //página de configuração
            admin: "",//página do administrador
            adminalunos: "",
            logout: ""
        }
    }*/


    mEdutell.Router = new MenuRouter();
    //console.log("client mEdutell.Router ", mEdutell.Router);

    mEdutell.Router.pages.inicial = "";

    //var login = true;

    //----- HANDLEBARS --------

    Handlebars.registerHelper('userTipo', function(tipo) {
       //console.log("user profile ",Meteor.user().profile.tipo, " tipo ",tipo);
        if(Meteor.userLoaded() && Meteor.user().profile.tipo == tipo){
            console.log("login true ");
           return true;
        }
        
        return false;
    });

    // if Router is defined, provide a currentPage helper
    Handlebars.registerHelper('currentPage', function() {
        var pages = Session.get("pages");
        console.log("mEdutell pages ", pages);
        
        //console.log("currentPage ",JSON.stringify(arrPages[Session.get("pages")]));//arrPages[Session.get("pages")].toJSON());
        if (!_.isUndefined(pages) && pages >= 0){
            return mEdutell.arrPages[pages].multiarr;//.toJSON();
        }
        return null;
        //return JSON.stringify(arrPages[Session.get("pages")]);
    });

    Handlebars.registerHelper('welcomes', function() {
        //console.log("template ",this.page);
        if (Template[this.page]){ //verifica se há um template com o node dado por this.pag            
            return Template[this.page]();//chama o template registado com o nome de this.page
        }
        //return new Handlebars.SafeString(Template._loginButtonsRight());
    });

    Handlebars.registerHelper('menu', function() {
        var menu = Session.get("menu");
        if (!_.isUndefined(menu) && Template[mEdutell.arrMenu[menu]]) //verifica se há um template com o node dado por this.pag
            return Template[mEdutell.arrMenu[menu]]();//chama o template registado com o nome de this.page
    });

    Handlebars.registerHelper('top', function() {
        //console.log("top ",arrTop[Session.get("top")].at(0).get("page"));
        var top = Session.get("top");
        //if (!_.isUndefined(top) && top >= 0 && Template[mEdutell.arrTop[top].at(0).get("page")]) //verifica se há um template com o node dado por this.pag
          if (!_.isUndefined(top) && top >= 0 && Template[mEdutell.arrTop[top].multiarr[0].page]) //verifica se há um template com o node dado por this.pag
            return Template[mEdutell.arrTop[top].multiarr[0].page]();//chama o template registado com o nome de this.page
    });

    Handlebars.registerHelper('bottom', function() {
        var bottom = Session.get("bottom");
        
        if (!_.isUndefined(bottom) && Template[mEdutell.arrBottom[bottom].multiarr[0].page]) //verifica se há um template com o node dado por this.pag
            return Template[mEdutell.arrBottom[bottom].multiarr[0].page]();//chama o template registado com o nome de this.page
    });

    Handlebars.registerHelper('sidebarleft', function() {
        var sidebar = Session.get("sidebar-left");
        console.log("mEdutell sidebar-left ", sidebar);
        if (!_.isUndefined(sidebar) && sidebar >=0 && Template[mEdutell.arrSidebarLeft[sidebar].multiarr[0].page]) //verifica se há um template com o node dado por this.pag
            return Template[mEdutell.arrSidebarLeft[sidebar].multiarr[0].page]();//chama o template registado com o nome de this.page
        //console.log("sidebarleft ",mEdutell.arrSidebarLeft[Session.get("sidebar-left")].map(function(coll){return coll.get("page")}));
        
    });

    Handlebars.registerHelper('sidebarright', function() {
        var sidebar = Session.get("sidebar-right");
        if (!_.isUndefined(sidebar) && sidebar >=0 && Template[mEdutell.arrSidebarRight[sidebar].multiarr[0].page]) //verifica se há um template com o node dado por this.pag
            return Template[mEdutell.arrSidebarRight[sidebar].multiarr[0].page]();//chama o template registado com o nome de this.page
    });


    //elimina qualquer click de fazer o que está definido por defeito. Usado para evitar que os menus de login coloquem #
    Template.layout.events({
        'click': function(event) {
                
                event.preventDefault();
          }
    });
}
 	