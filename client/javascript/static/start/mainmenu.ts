///<reference path='../../../../../Definitions/mydefs/declare_vars.ts'/>
///<reference path='../../../../../Definitions/mydefs/pagetemplate.d.ts'/>

//import CC = Eduapp.Constantes;
//import Global = Eduapp.Global;

module Eduapp{

	export class MainMenu extends PageTemplate{

		private title:string;
		private selected: string[];
		//private myid: any;
		//private profileTipo: string = "";

		constructor(tmpl:string,pos:string,tipo:string,router:any)
	    {
	        super(tmpl,pos,tipo,router);

	        //this.myid = Meteor.userId();
	        //this.profileTipo = Meteor.user().profile.tipo;
	        this.setTitle(CC.Menu.HOME_TITLE);
	        this.selected = [CC.Menu.HOME];
	        Session.set("menu_selected",this.selected);	        
	        this.startTemplate();
	        this.startHelpers();

	    }

	    private startTemplate():void{

	    	var self = this;

	    	Template.menu_original.rendered = function() {
		    	console.log("mainmenu");
			};

			Template.menu_original.Title = function() {
    
			    var menuTitle = Session.get("menu_title");
			    //console.log("Title",menuTitle);
			    
			    if(!_.isUndefined(menuTitle))
			        return menuTitle;
			    
			    return "";
			};

			Template.menu_orig.userTipo = function(tipo) {
    			   
    			   var myid =  Meteor.userId();
			       var user = Meteor.users.findOne({_id: myid}, {reactive: false});
			       //var user = Meteor.users.findOne({_id: myid});

			        if(myid && user && user.profile.tipo == tipo){
			            console.log("login true userTipo ");
			           return true;
			        }
			        
			        return false;
			};

			Template.menu_original.events({
			    
			    "click .brand": function(event) {
			        event.preventDefault();
			        return false;
			    }
			});

			
			Template.menu_orig.events({
		        'click .config': function(event) {
		            
		            event.preventDefault();
		            self.selected = [CC.Menu.CONFIG];
		            self.setTitle(CC.Menu.CONFIG_TITLE);	
	        		Session.set("menu_selected",self.selected);
		            //Session.set("menu", mEdutell.IDXMAINMENU);		            	            
		            //console.log("menuconfig ",Global.C.elem["mlayout"]);
		            //console.log("evento click config");
		            self.getRouter().changePage(CC.Page.CONFIG);
		           
		           },
		        'click .admin': function(event) {
			        //console.log("admin clicked ");
			        self.selected = [CC.Menu.ADMIN];
			        self.setTitle(CC.Menu.ADMIN_TITLE);
	        		Session.set("menu_selected",self.selected);
			        event.preventDefault();
			        //Global.C.elem["sidebarLeftlayout"].setTemplateName("admin_sidebar-left");
			        self.getRouter().changePage(CC.Page.ADMIN);
		       
		       },

		       'click .home': function(event) {
			        event.preventDefault();
			        self.selected = [CC.Menu.HOME];
			        self.setTitle(CC.Menu.HOME_TITLE);
	        		Session.set("menu_selected",self.selected);
			        self.getRouter().changePage("");
			       
			    }
		    });
	    }

	    private startHelpers():void{
	    	var self = this;

	    	
	    	Handlebars.registerHelper('activar', function(options) {
			    //mostra o menu login em algumas páginas antes de fazer login
			   
			    //console.log("activar ",options.hash.selected);
			    var sel = Session.get("menu_selected");
			    //console.log("sel ",sel, " hash ",options.hash.selected);
			    if(!_.isUndefined(sel) && _.contains(sel, options.hash.selected))
			        return true;
			    
			    return false
			    //return Session.equals("selected",options.hash.selected);
			});
			
	    }

	    public getTitle():string{
	    	return this.title;
	    }

	    public setTitle(title:string){
	    	//console.log("meu titulo");
	    	this.title = title;
	    	Session.set("menu_title", title);
	    }
	}
}
