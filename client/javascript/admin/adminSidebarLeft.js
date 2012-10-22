/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//----- ADMIN SIDEBAR - LEFT --------
mEdutell.IDXTOPREGISTO = 2;
mEdutell.IDXBOTTOMREGISTO = 2;


Template["admin_sidebar-left"].events({
    "click .alunos": function(event,tmpl){
        event.preventDefault();
       
        mEdutell.Router.changePage(mEdutell.Router.pages.adminalunos);
    },
    "click .profs": function(event,tmpl){
        event.preventDefault();
        
        mEdutell.Router.changePage(mEdutell.Router.pages.adminprofs);
    },
    "click .EEs": function(event){
        event.preventDefault();
        mEdutell.Router.changePage(mEdutell.Router.pages.adminEE);
    },
    "click .escolas": function(event){
        event.preventDefault();
        mEdutell.Router.changePage(mEdutell.Router.pages.adminescolas);
    },
    "click .adds": function(event){
        event.preventDefault();
        mEdutell.Router.changePage(mEdutell.Router.pages.adminadd);
    }        
});
