/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


//----- ADMIN --------
mEdutell.IDXCONFIG = 4;
mEdutell.IDXTOPREGISTO = 2;
mEdutell.IDXBOTTOMREGISTO = 2;
mEdutell.IDXSIDEBARREGISTO = 2;
mEdutell.IDXCONFIGMENUTITLE = mEdutell.EDUTELL + "CONFIGURAÇÃO";


Template.menu_orig.events({
    'click .config': function(event) {
        //console.log("admin clicked ");
        mEdutell.IDXSIDEBARLEFT = 2;
        event.preventDefault();
        Session.set("selected", ["config"]);
        mEdutell.Router.changePage(mEdutell.Router.pages.config);
       
       }
});


mEdutell.Router.route("config", "config", function() {
    Session.set("pages", mEdutell.IDXCONFIG);
    Session.set("selected", ["config","adminalunos"]);
    configSessionCommon();
    
});


var configSessionCommon = function(){
    
    Session.set("top", mEdutell.IDXTOPDEFAULT);
    Session.set("bottom", mEdutell.IDXBOTTOMDEFAULT);
    Session.set("sidebar-left", mEdutell.IDXSIDEBARLEFT);
    Session.set("sidebar-right", mEdutell.IDXRSIDEBARDEFAULT);
    Session.set("menu_title", mEdutell.IDXCONFIGMENUTITLE);
};

// shared between dropdown and single mode
  Template._loginButtons.events({
    'click': function(event) {//#login-buttons-logout
      
      if(event.target.id == "login-buttons-logout"){
            //console.log("logout ",event.target);//remover o path admin do router
            mEdutell.Router.changePage(mEdutell.Router.pages.home);
      //return true;
           //mEdutell.Router.navigate("admin", {replace: true});
      }
     }
    
  });

mEdutell.Router.pages.config = "config";
