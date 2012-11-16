/// <reference path="../static/common/variaveis/declare_vars.ts" />
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


//----- ADMIN SIDEBAR - LEFT --------
//mEdutell.IDXTOPREGISTO = 2;
//mEdutell.IDXBOTTOMREGISTO = 2;

module config_sidebar_left{

    Template["config_sidebar-left"].events({
        "click .dados": function(event,tmpl){
            event.preventDefault();
           
            mEdutell.Router.changePage(mEdutell.Router.pages.configdadosP);
        },
        "click .insc": function(event,tmpl){
            event.preventDefault();
            
            mEdutell.Router.changePage(mEdutell.Router.pages.configinsc);
        },
        "click .EEs": function(event){
            event.preventDefault();
            mEdutell.Router.changePage(mEdutell.Router.pages.adminEE);
        },
        "click .escolas": function(event){
            event.preventDefault();
            mEdutell.Router.changePage(mEdutell.Router.pages.adminescolas);
        },
        "click .confirm": function(event){
            event.preventDefault();
            mEdutell.Router.changePage(mEdutell.Router.pages.configconfirm);
        }        
    });

}
