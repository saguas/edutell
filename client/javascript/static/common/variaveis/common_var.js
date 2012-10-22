//cria um array de colecction, cada uma com o número de páginas a incluir por documento 

//var mPage = Backbone.Model;
/*
 var arrPages = [];
 var arrTop = [];
 var arrBottom = [];
 var arrSidebarLeft = [];
 var arrSidebarRight = [];
 */
//estes atributos são para ser partilhados por todos logo devem ser atributos de classe
window.mEdutell = Backbone.Model.extend({}, {
    //cria um array de colecction, cada uma com o número de páginas a incluir por documento
    arrPages: [],
    arrTop: [],
    arrBottom: [],
    arrSidebarLeft: [],
    arrSidebarRight: [],
    //----- DEFAULTS -------- 
    IDXTOPDEFAULT: 0,
    IDXBOTTOMDEFAULT: 0,
    IDXPAGEDEFAULT: 0,
    IDXLSIDEBARDEFAULT: 0,
    IDXRSIDEBARDEFAULT: 0,
    IDXDEFAULTMENU: 0,
    IDXMAINMENU: 0,
    IDXDEFAULTMENUTITLE: "Title",
    IDXHOMEMENUTITLE: "Title",
    EDUTELL: "EDUTELL ",
    //----- LOGIN --------
    IDXTOPLOGIN: 0,
    IDXBOTTOMLOGIN: 0,
    IDXSIDEBARLOGIN: 0,
    IDXLOGIN: 0,
    IDXLOGINMENUTITLE: "",
    //----- LOGIN REGISTO --------
    IDXREGISTO: 2,
    IDXTOPREGISTO: 2,
    IDXBOTTOMREGISTO: 2,
    IDXSIDEBARREGISTO: 2,
    IDXREGISTOMENUTITLE: "",
    //---------- ADMIN ------------
    IDXADMIN: 3,
    IDXCONFIG: 4,
    //index do menu principal
    IDXMAINMENU: 0,
    //Titulo do home menu
    IDXHOMEMENUTITLE: "",
    //TPC
    IDXTPC: 2,
    //array com os menus. Ver ficheiro main_menu.js
    arrMenu: [""],
    //router do lado do cliente
    Router: null,
    //objeto onde acrescentar os eventos tratados pelo layout. Deve-se usar ._extend();
    layout_events: {},
    setpage: function(arr, arrobj) {
        //var mycoll = new Backbone.Collection(arrobj);
        /*_.each(arrobj,function(obj){
         mycoll.add(new mPage(obj));
         });*/
        arr.push(new Backbone.Collection(arrobj));
    }
});




//window.edutellObj = new mEdutell();

//mEdutell.EDUTELL="Luis";

//var mytesteobj = new mEdutell();

mEdutell.setpage(mEdutell.arrPages, [{page: "home"}]);
mEdutell.setpage(mEdutell.arrPages, [{page: "form_login"}]);
mEdutell.setpage(mEdutell.arrPages, [{page: "form_registo"}]);
mEdutell.setpage(mEdutell.arrPages, [{page: "administracao"}]);
mEdutell.setpage(mEdutell.arrPages, [{page: "administracao_alunos"}]);
mEdutell.setpage(mEdutell.arrPages, [{page: "administracao_profs"}]);
mEdutell.setpage(mEdutell.arrPages, [{page: "configuracao"}]);
mEdutell.setpage(mEdutell.arrPages, [{page: "config_dados_pessoais"}]);
mEdutell.setpage(mEdutell.arrPages, [{page: "config_inscricao"}]);
mEdutell.setpage(mEdutell.arrPages, [{page: "config_confirmacao"}]);
mEdutell.setpage(mEdutell.arrPages, [{page: "home"}, {page: "off"}]);
//mEdutell.arrPages.push(new Backbone.Collection([new mPage({page: "home"})]));
//mEdutell.arrPages.push(new Backbone.Collection([new mPage({page:"form_login"})]));
//mEdutell.arrPages.push(new Backbone.Collection([new mPage({page:"form_registo"})]));
//mEdutell.arrPages.push(new Backbone.Collection([new mPage({page:"home"}),new mPage({page:"off"})]));



//------------ arrays com a estrutura de página. Cada entrada corresponde a um template ou a um array de templates (caso de arrPag)
//var arrPag = [[{pag:"home"}],[{pag:"form_login"}],[{pag:"form_registo"}],[{pag:"home"},{pag:"off"}]];
//var arrTop = ["notop","toplogin","topregisto"];

//mEdutell.arrTop.push(new Backbone.Collection([new mPage({page: "notop"})]));
//mEdutell.arrTop.push(new Backbone.Collection([new mPage({page: "toplogin"})]));
//mEdutell.arrTop.push(new Backbone.Collection([new mPage({page: "topregisto"})]));

mEdutell.setpage(mEdutell.arrTop, [{page: "notop"}]);
mEdutell.setpage(mEdutell.arrTop, [{page: "toplogin"}]);
mEdutell.setpage(mEdutell.arrTop, [{page: "topregisto"}]);

//console.log("edutellObj ",mEdutell.EDUTELL);//.get("arrPages"));
//console.log("mytesteobj ",mytesteobj);

//mEdutell.arrBottom.push(new Backbone.Collection([new mPage({page: ""})]));
//mEdutell.arrBottom.push(new Backbone.Collection([new mPage({page: "bottomlogin"})]));
mEdutell.setpage(mEdutell.arrBottom, [{page: ""}]);
mEdutell.setpage(mEdutell.arrBottom, [{page: "bottomlogin"}]);

//mEdutell.arrSidebarLeft.push(new Backbone.Collection([new mPage({page: ""})]));
//mEdutell.arrSidebarLeft.push(new Backbone.Collection([new mPage({page: "sidebar-left"})]));
mEdutell.setpage(mEdutell.arrSidebarLeft, [{page: ""}]);
mEdutell.setpage(mEdutell.arrSidebarLeft, [{page: "admin_sidebar-left"}]);
mEdutell.setpage(mEdutell.arrSidebarLeft, [{page: "config_sidebar-left"}]);

//mEdutell.arrSidebarRight.push(new Backbone.Collection([new mPage({page: ""})]));
//mEdutell.arrSidebarRight.push(new Backbone.Collection([new mPage({page: "sidebar-right"})]));
mEdutell.setpage(mEdutell.arrSidebarRight, [{page: ""}]);
mEdutell.setpage(mEdutell.arrSidebarRight, [{page: "sidebar-right"}]);

