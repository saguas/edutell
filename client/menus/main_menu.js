
mEdutell.IDXMAINMENU = mEdutell.arrMenu.push("menu_original") - 1;


Session.set("menu", mEdutell.IDXMAINMENU);

/*
Handlebars.registerHelper('logout', function() {

    //se já fez login mostra o menu logout
    return Session.get("login");
});

Handlebars.registerHelper('show_login', function() {
    //mostra o menu login em algumas páginas antes de fazer login
    return Session.get("show_login");
});
*/

Template.menu_original.Title = function() {
    return Session.get("menu_title");
};

Template.menu_original.events({
    /*
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout(function(error) {
            if (!error) {
                //login = false;
                //Session.set("show_login", true);
                //Session.set('login', false);
                //Session.set("inicio","");
                mEdutell.Router.changePage(mEdutell.Router.pages.inicial);
            } else {
                console.log("error ao fazer logout: ", error);
            }
        });
    },
    'click .login': function(event) {
        event.preventDefault();
        //clearTooltip();
        mEdutell.Router.changePage(mEdutell.Router.pages.login);
    },
    'click .onlogin': function(event) {
        event.preventDefault();
        //clearTooltip();
    },
    */
    "click .brand": function(event) {
        event.preventDefault();
        return false;
    }
});

//Template.menu_orig.events(mEdutell.menu_origEvents);

Handlebars.registerHelper('activar', function(options) {
    //mostra o menu login em algumas páginas antes de fazer login
   
    //console.log("activar ",options.hash.selected);
    
    //console.log("sel ",options.hash.selected);
    if(_.contains(Session.get("selected"), options.hash.selected))
        return true;
    
    //return Session.equals("selected",options.hash.selected);
});

/*
$(window).bind('popstate', function(event) {
    //console.log("popstate ",JSON.stringify(event.state));
    clearTooltip({type: " "});
});
*/
/*
 window.onpopstate = function(){
 //console.log("popstate");
 clearTooltip();
 };
 */