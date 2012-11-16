/// <reference path="../../../../../../Definitions/backbone-0.9.d.ts" />
//cria um array de colecction, cada uma com o número de páginas a incluir por documento 

//var mPage = Backbone.Model;
/*
 var arrPages = [];
 var arrTop = [];
 var arrBottom = [];
 var arrSidebarLeft = [];
 var arrSidebarRight = [];
 */


//declare var Backbone: any;

interface Pages {
    page: string;
}

interface MultiPages{
    multiarr: Pages[];
}

interface JQuery{
    datepicker: any;
}

interface JQueryStatic {
    validator: any;
}

//estes atributos são para ser partilhados por todos logo devem ser atributos de classe
module MEdutell {

    export class mEdutell {
        //window.mEdutell = Backbone.Model.extend({}, {
            //cria um array de colecction, cada uma com o número de páginas a incluir por documento
            static arrPages: MultiPages[] = [];
            static arrTop: MultiPages[] = [];
            static arrBottom: MultiPages[] = [];
            static arrSidebarLeft: MultiPages[] = [];
            static arrSidebarRight: MultiPages[] = [];
            //----- DEFAULTS -------- 
            static IDXTOPDEFAULT: number = 0;
            static IDXBOTTOMDEFAULT: number = 0;
            static IDXPAGEACTUAL: number = 0;
            static IDXPAGEDEFAULT: number = 0;
            static IDXLSIDEBARDEFAULT: number = 0;
            static IDXRSIDEBARDEFAULT: number = 0;
            static IDXDEFAULTMENU: number = 0;
            static IDXMAINMENU: number = 0;
            static IDXDEFAULTMENUTITLE: string = "Title";
            static IDXHOMEMENUTITLE: string = "Title";
            static EDUTELL: string = "EDUTELL ";
            //----- LOGIN --------
            static IDXTOPLOGIN: number = 0;
            static IDXBOTTOMLOGIN: number = 0;
            static IDXSIDEBARLOGIN: number = 0;
            static IDXLOGIN: number = 0;
            static IDXLOGINMENUTITLE: string = "";
            //----- LOGIN REGISTO --------
            static IDXREGISTO: number = 2;
            static IDXTOPREGISTO: number = 2;
            static IDXBOTTOMREGISTO: number = 2;
            static IDXSIDEBARREGISTO: number = 2;
            static IDXREGISTOMENUTITLE: string = "";
            //---------- ADMIN ------------
            static IDXADMIN: number = 3;
            static IDXCONFIG: number = 4;
            static FORMCLASSSUCCESS: string = "";
            //---------- CONFIG -----------
            static IDXCONFIGDADOSPESSOAIS: number = 7;
            static IDXCONFIGINSCRICAO: number = 8;
            static IDXCONFIGCONFIRM: number = 9;
            static IDXCONFIGMENUTITLE: string = "";
            static IDXSIDEBARLEFT: number = 2;
            //index do menu principal
            //static IDXMAINMENU: number = 0;
            //Titulo do home menu
            //static IDXHOMEMENUTITLE: string = "";
            //TPC
            static IDXTPC: number = 2;
            //array com os menus. Ver ficheiro main_menu.js
            static arrMenu: string[] = [""];
            //router do lado do cliente
            static Router: Backbone.Router;//{};
            //objeto onde acrescentar os eventos tratados pelo layout. Deve-se usar ._extend();
            static layout_events: {} = {};
            static setpage(arr: MultiPages[], arrobj: MultiPages): void {
                //var mycoll = new Backbone.Collection(arrobj);
                /*_.each(arrobj,function(obj){
                 mycoll.add(new mPage(obj));
                 });*/
                arr.push(arrobj);
            }
        //});
    }



        //window.edutellObj = new mEdutell();

        //mEdutell.EDUTELL="Luis";

        //var mytesteobj = new mEdutell();

        mEdutell.setpage(mEdutell.arrPages, {multiarr:[{page: "home"}]});
        mEdutell.setpage(mEdutell.arrPages, {multiarr:[{page: "form_login"}]});
        mEdutell.setpage(mEdutell.arrPages, {multiarr:[{page: "form_registo"}]});
        mEdutell.setpage(mEdutell.arrPages, {multiarr:[{page: "administracao"}]});
        mEdutell.setpage(mEdutell.arrPages, {multiarr:[{page: "administracao_alunos"}]});
        mEdutell.setpage(mEdutell.arrPages, {multiarr:[{page: "administracao_profs"}]});
        mEdutell.setpage(mEdutell.arrPages, {multiarr:[{page: "configuracao"}]});
        mEdutell.setpage(mEdutell.arrPages, {multiarr:[{page: "config_dados_pessoais"}]});
        mEdutell.setpage(mEdutell.arrPages, {multiarr:[{page: "config_inscricao"}]});
        mEdutell.setpage(mEdutell.arrPages, {multiarr:[{page: "config_confirmacao"}]});
        mEdutell.setpage(mEdutell.arrPages, {multiarr:[{page: "home"}, {page: "off"}]});
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

        mEdutell.setpage(mEdutell.arrTop, {multiarr:[{page: "notop"}]});
        mEdutell.setpage(mEdutell.arrTop, {multiarr:[{page: "toplogin"}]});
        mEdutell.setpage(mEdutell.arrTop, {multiarr:[{page: "topregisto"}]});

        //console.log("edutellObj ",mEdutell.EDUTELL);//.get("arrPages"));
        //console.log("mytesteobj ",mytesteobj);

        //mEdutell.arrBottom.push(new Backbone.Collection([new mPage({page: ""})]));
        //mEdutell.arrBottom.push(new Backbone.Collection([new mPage({page: "bottomlogin"})]));
        mEdutell.setpage(mEdutell.arrBottom, {multiarr:[{page: ""}]});
        mEdutell.setpage(mEdutell.arrBottom, {multiarr:[{page: "bottomlogin"}]});

        //mEdutell.arrSidebarLeft.push(new Backbone.Collection([new mPage({page: ""})]));
        //mEdutell.arrSidebarLeft.push(new Backbone.Collection([new mPage({page: "sidebar-left"})]));
        mEdutell.setpage(mEdutell.arrSidebarLeft, {multiarr:[{page: ""}]});
        mEdutell.setpage(mEdutell.arrSidebarLeft, {multiarr:[{page: "admin_sidebar-left"}]});
        mEdutell.setpage(mEdutell.arrSidebarLeft, {multiarr:[{page: "config_sidebar-left"}]});

        //mEdutell.arrSidebarRight.push(new Backbone.Collection([new mPage({page: ""})]));
        //mEdutell.arrSidebarRight.push(new Backbone.Collection([new mPage({page: "sidebar-right"})]));
        mEdutell.setpage(mEdutell.arrSidebarRight, {multiarr:[{page: ""}]});
        mEdutell.setpage(mEdutell.arrSidebarRight, {multiarr:[{page: "sidebar-right"}]});
    
}