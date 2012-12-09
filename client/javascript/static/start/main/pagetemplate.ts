///<reference path='../../../../../../Definitions/mydefs/declare_vars.ts'/>
///<reference path='../../../../../../Definitions/mydefs/IPage.ts'/>

import Global = Eduapp.Global;
import CC = Eduapp.Constantes;

module Eduapp{
	export class PageTemplate implements IPage{

		public templateName: string;
		private title:string;
		private position: string;
		private userTipo: string;
		private listenersUserTipo:any;
		private listenersTmplName:any;
		private Router:any;

		constructor(tmpl:string,pos:string,tipo:string,router:any)
	    {

	    	this.templateName = tmpl;
	    	this.userTipo = this.checkUserTipo(tipo) ? pos : "Alunos";
	    	this.position = this.checkPosition(pos) ? pos : "nothing";
	        this.listenersUserTipo = {};
	        this.listenersTmplName = {};
	        this.Router = router;
	    };

	    public getTemplateName():string{

	    	var context = Meteor.deps.Context.current;

			if (context && !this.listenersTmplName[context.id]) {
			  
			    this.listenersTmplName[context.id] = context;

			    var self = this;
			    context.onInvalidate(function () {
			      delete self.listenersTmplName[context.id];
			    });
			}

			return this.templateName;
	    };

		public setTemplateName(name:string):void{
					
					if (this.templateName === name)
			    		return; // don't want to trigger invalidation if there's no change.

				  
				   this.templateName = name;

				  // Notify any contexts that care about temperature changes
				  for (var contextId in this.listenersTmplName)
				    // This will trigger the onInvalidate function above, but not
				    // immediately -- only when Meteor.flush() is called, or at the end
				    // of the event loop. So we know that this.listeners will be
				    // emptied, but it won't change while we're trying to loop over it.
				    this.listenersTmplName[contextId].invalidate();
		};

		public getUserTipo():string{

					var context = Meteor.deps.Context.current;

					if (context && !this.listenersUserTipo[context.id]) {
					  
					    this.listenersUserTipo[context.id] = context;

					    var self = this;
					    context.onInvalidate(function () {
					      delete self.listenersUserTipo[context.id];
					    });
					}

					return this.templateName;
		};

		public setUserTipo(tipo:string):void{
				
				if (this.userTipo === tipo || !this.checkUserTipo(tipo))
			    		return; // don't want to trigger invalidation if there's no change.

				  // Notify any contexts that care about temperature changes
				  for (var contextId in this.listenersUserTipo)
				    // This will trigger the onInvalidate function above, but not
				    // immediately -- only when Meteor.flush() is called, or at the end
				    // of the event loop. So we know that this.listeners will be
				    // emptied, but it won't change while we're trying to loop over it.
				    this.listenersUserTipo[contextId].invalidate();
		};

		private checkUserTipo(tipo:string):bool{

				return _.contains([UserTipo.ADMIN,UserTipo.ALUNO], tipo);
		};

		private checkPosition(pos:string):bool{

				return _.contains([Eduapp.Position.TOP,Eduapp.Position.BOTTOM,Eduapp.Position.MIDDLE,Eduapp.Position.LEFT, Eduapp.Position.RIGHT,Eduapp.Position.NOTHING], pos);
		}
		private startTemplate():void{
			return;
		}

		private startHelpers():void{
			return;
		}

		public setRouter(router:any):void{
			this.Router = router;
		};
		public getRouter():any{
			return this.Router;
		};

		public getTitle():string{
			return this.title;
		}

		public setTitle(title:string):void{
			this.title = title;
		}
	}
}
