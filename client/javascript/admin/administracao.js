/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//----- ADMIN --------
mEdutell.IDXADMIN = 3;
mEdutell.IDXADMINALUNOS = 4;
mEdutell.IDXADMINPROFS = 5;
//mEdutell.IDXTOPREGISTO = 2;
//mEdutell.IDXBOTTOMREGISTO = 2;
//mEdutell.IDXSIDEBARREGISTO = 2;
mEdutell.IDXADMINMENUTITLE = mEdutell.EDUTELL + "ADMINISTRAÇÃO";


Template.menu_orig.events({
    'click .admin': function(event) {
        //console.log("admin clicked ");
        event.preventDefault();
        mEdutell.Router.changePage(mEdutell.Router.pages.admin);
       
       }
});


mEdutell.Router.route("admin", "admin", function() {
    Session.set("selected", ["admin"]);
    this.changePage(mEdutell.Router.pages.adminalunos);
    
});

mEdutell.Router.route("administracao_alunos", "administracao_alunos", function() {
    mEdutell.IDXPAGEACTUAL = mEdutell.IDXADMINALUNOS;
    Session.set("pages", mEdutell.IDXADMINALUNOS);
    Session.set("selected", ["admin","adminalunos"]);
    adminSessionCommon();
        
});

mEdutell.Router.route("administracao_profs", "administracao_profs", function() {
    mEdutell.IDXPAGEACTUAL = mEdutell.IDXADMINPROFS;
    Session.set("pages", mEdutell.IDXADMINPROFS);
    Session.set("selected", ["admin","adminprofs"]);
    adminSessionCommon();
        
});

mEdutell.Router.route("administracao_EE", "administracao_EE", function() {
    mEdutell.IDXPAGEACTUAL = mEdutell.IDXADMINPROFS;
    Session.set("pages", mEdutell.IDXADMINPROFS);
    Session.set("selected", ["admin","adminEEs"]);
    adminSessionCommon();
        
});

mEdutell.Router.route("administracao_escolas", "administracao_escolas", function() {
    mEdutell.IDXPAGEACTUAL = mEdutell.IDXADMINPROFS;
    Session.set("pages", mEdutell.IDXADMINPROFS);
    Session.set("selected", ["admin","adminescolas"]);
    adminSessionCommon();
       
});

mEdutell.Router.route("administracao_add", "administracao_add", function() {
    mEdutell.IDXPAGEACTUAL = mEdutell.IDXADMINPROFS;
    Session.set("pages", mEdutell.IDXADMINPROFS);
    Session.set("selected", ["admin","adminadds"]);
    adminSessionCommon();
       
});

var adminSessionCommon = function(){
    
    mEdutell.IDXSIDEBARLEFT = 1;
    Session.set("menu", mEdutell.IDXMAINMENU);
    Session.set("top", mEdutell.IDXTOPDEFAULT);
    Session.set("bottom", mEdutell.IDXBOTTOMDEFAULT);
    Session.set("sidebar-left", mEdutell.IDXSIDEBARLEFT);
    Session.set("sidebar-right", mEdutell.IDXRSIDEBARDEFAULT);
    Session.set("menu_title", mEdutell.IDXADMINMENUTITLE);
};

// shared between dropdown and single mode
  Template._loginButtons.events({
    'click': function(event) {//#login-buttons-logout
      
      if(event.target.id == "login-buttons-logout"){
            //console.log("logout ",event.target);//remover o path admin do router
      //return true;
            event.preventDefault();
            mEdutell.Router.changePage(mEdutell.Router.pages.inicial);
      }
     }
    
  });
 

mEdutell.Router.pages.admin = "admin";
mEdutell.Router.pages.adminalunos = "administracao_alunos";
mEdutell.Router.pages.adminprofs = "administracao_profs";
mEdutell.Router.pages.adminEE = "administracao_EE";
mEdutell.Router.pages.adminescolas = "administracao_escolas";
mEdutell.Router.pages.adminadd = "administracao_add";