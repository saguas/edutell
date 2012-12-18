///<reference path='../../../../../Definitions/mydefs/declare_vars.ts'/>
///<reference path='../../../../../Definitions/mydefs/pagetemplate.d.ts'/>

//import Global = Eduapp.Global;
//import CC = Eduapp.Constantes;

module Eduapp{
	export class AdminAlunosPage extends PageTemplate{

		 private estados:any[] = [];
		 private skitcount:number = 0;
		 private numperpages:number = 2;
		 private limit:number = 2;
		 private controlSearch:number = 0;

		 constructor(tmpl:string,pos:string,tipo:string, router:any)
	    {
	        super(tmpl,pos,tipo,router);

	        var self = this;
	        Meteor.autorun(function() {
	        	 self.estados = Estados.find().fetch()[0].estado;
	        	 Session.set("estado",_.pluck(self.estados,"name"));
	        });

		    Session.set("adminescolas",null);	
		    Session.set("alunoEscolha",null);
		    Session.set("limit",this.limit);
		    Session.set("skip",this.skitcount);

	        this.startHelpers();
	        this.startTemplate();

	    }

	    private startTemplate():void{
	    	var self = this;

	    	Template.administracao_alunos.rendered = function() {
		    	//console.log("config_inscricao.rendered");
		    	var _this = this;

		    	if (! _this.chosen) {
		    			_this.chosen = true;
				        $(this.findAll(".chzn-select")).chosen({no_results_text: "Não foi encontrado valor para a sua pesquisa"});
				        //$("#turma").trigger("liszt:updated"); 
				        //$("#escola").trigger("liszt:updated");

				        $(this.find("#adminAlunosPesquisa")).chosen().change(function(){
				            //console.log("adminAlunosPesquisa ",$("#adminAlunosPesquisa").val()[0].split(";"));
				             //$('#adminAlunosPesquisa').val($("#adminAlunosPesquisa").val()[0]);
				             //$("#adminAlunosPesquisa").trigger("liszt:updated"); 
				             var adminescolas = [];

				             _.each($("#adminAlunosPesquisa").val(),function(sel){
				             	 adminescolas.push(sel.split(";"));

				             	});
				             
				            //console.log("Adminescolas ");
				            if(adminescolas.length == 0){
								//var estado = _.pluck(Estados.find().fetch()[0].estado,"name");
				     			Session.set("adminescolas",null);
				     			self.setControlSearch(1);
				            }
				            else{
				            	Session.set("adminescolas",adminescolas);
				            	self.setControlSearch(-1);
				            }
				            
				        });

				        $(this.find("#AdminEstadoPesquisa")).chosen().change(function(){
				            
				            var estado = $("#AdminEstadoPesquisa").val();
				            //console.log("AdminEstadoPesquisa ",estado);
				            if(estado == "" || estado == null){
								//var estado = _.pluck(Estados.find().fetch()[0].estado,"name");
								var estado = _.pluck(self.estados,"name");
				     			Session.set("estado",estado);	
				     			self.setControlSearch(1);	            	
				            }
				            else{
				            	Session.set("estado",estado);	
				            	self.setControlSearch(-1);
				            }
				            	
				            
				            //Session.set("escolas",$("#escola").val());
				        });
		    	}
			};

			Template.administracao_alunos.destroyed = function() {
				this.chosen = false;
			}


			Template.tableAlunos.rendered = function(){
				//console.log("dp ",dP.find());
		        var _this = this;
		        if (! this.frag) {
		        	Session.set("alunoEscolha",null);
		        	Session.set("adminescolas",null);
		        	Session.set("limit",self.limit);
		    		Session.set("skip",self.skitcount);
		    		var estado = _.pluck(self.estados,"name");
		    		Session.set("estado",estado);
					self.getPessoal(_this);	
					self.setControlSearch(0);
					//console.log("controlSearch ",self.controlSearch);	 
					$(this.find("#tbodyadminalunos")).append(this.frag);       
				}
		        
		    };

		    Template.tableAlunos.events({
        		'click #btnfindAluno': function(event, tmpl) {
        			
        			event.preventDefault();
		            event.stopPropagation();
		            var val = $("#findAluno").val();
		            
		            if(val){	
		            	console.log("limpar ",val);
		            	$("#findAluno").val("");
		            	self.setControlSearch(1);
		           	}
		           	Session.set("alunoEscolha",null);
		           	
        		}
					
			});

			Template.administracao_alunos.Escola = function(){
				//console.log("escolas ",Escolas.find());
		        return Escolas.find();
		    };

		     Template.administracao_alunos.Turma = function(t){
		     		_.each(t.turmas,function(_this){
		     				_.extend(_this,{name:t.name});	
		     			});
		     		
		     		//console.log("this.data ", this.data);
		     		//console.log("this turmas ", this.turmas);

		        	return this.turmas;
		     };

		     Template.administracao_alunos.Estado = function(){
		     		//console.log("estados ",Estados.find().fetch()[0].estado);
		     		//var estado = Estados.find().fetch()[0].estado;
		     		
		        	return self.estados;
		     };

		    Template.paginacao.rendered = function() {
		    		var total = Session.get("totaldp");
		    		var pages = total/self.numperpages;
		    		if (! this.frag && Math.floor(pages) > 0) {
		    			Session.set("posaluno",1);
		    			self.skitcount = 0;
		    			Session.set("skip",self.skitcount);
		    			self.getHtmlPagination(this, pages);
		    			$(this.find("#pagesul")).append(this.frag);  
		    		}

		    };


		    Template.paginacao.destroyed = function() {
		    	this.frag = null;
		    	//Session.set("posaluno",1);
		    }

		    Template.tableAlunos.page = function() {
		    		var total = dP.find().count();
		    		Session.set("totaldp",total);
		    		if(total > 2 && Template["paginacao"])
		    			return Template["paginacao"]();
		    		else
		    			return;
		    };

		    Template.tableAlunos.destroyed = function() {
		        this.frag = null;
		        //Session.set("limit",self.limit);
		    	//Session.set("skip",self.skitcount);
		    	self.controlSearch = 0;
		    	console.log("tableAlunos.destroyed");

		    };

		    Template.paginacao.events({
        		'click .posAluno': function(event, tmpl) {
        			
        			var pos = event.srcElement.text;
        			event.preventDefault();
		            event.stopPropagation();
		            //console.log("pos ",event.srcElement.text);
		            Session.set("posaluno",pos);
		            self.skitcount = (pos-1)*self.numperpages;
		            //console.log("skitcount ",self.skitcount);
		            Session.set("skip",self.skitcount);
		           	
        		},
        		'click .pageAluno': function(event, tmpl) {
        			
        			event.preventDefault();
		            event.stopPropagation();
		            //console.log("next ",event.srcElement.text);

		           	
        		},
        		'click .nextAluno': function(event, tmpl) {
        			
        			event.preventDefault();
		            event.stopPropagation();
		            //console.log("next ",event.srcElement.text);
		            //var pos = Session.get("posaluno");
		            self.skitcount = self.skitcount + self.numperpages;
		            //console.log("skitcount ",self.skitcount);
		            Session.set("skip",self.skitcount);
		            //var pos = parseInt(Session.get("posaluno"));
		            //var nextpos = pos + 1;
		           	Session.set("posaluno", parseInt(Session.get("posaluno")) + 1);
		           	
        		},
        		'click .prevAluno': function(event, tmpl) {
        			
        			event.preventDefault();
		            event.stopPropagation();
		            //console.log("prev ",event);
		           	self.skitcount = self.skitcount - self.numperpages;
		            //console.log("skitcount ",self.skitcount);
		            Session.set("skip",self.skitcount);
		            //var pos = parseInt(Session.get("posaluno"));
		            //var prevpos = pos - 1;
		           	Session.set("posaluno", parseInt(Session.get("posaluno")) - 1);
		           	
        		}
					
			});
	    }

	    private startHelpers():void{
	    	
	    };

	    private getHtmlPagination(that:any, pages:number):void{
	    		var self = this;
	    		that.frag = Meteor.render(
						  	function() {
						  			var html = "";
						  			html = html + self.getHtmlPage(pages);
						  			return html;
							});
	    };

	    private getHtmlPage(pages:number):string{
	    	//console.log("pages ", pages);
	    	var html = "";
	    	var active = "";
	    	var prevdisable = "";
	    	var nextdisable = "";
	    	var pos = 1;
	    	pos = parseInt(Session.get("posaluno"));
	    	//console.log("posaluno ",pos);
	    	prevdisable = pos == 1 ? "disabled" : "";
	    	nextdisable = pos == pages ? "disabled" : "";
	    	html = html + '<li class="' + prevdisable + '"><a class="prevAluno" href="#">Prev</a></li>';
	    	for (var n = 1;n<=pages;n++){
	    		active = pos == n ? "active" : "";
		    	html = html + '<li class="' + "posAluno " + active + '"><a href="#">'+n+'</a></li>';
		    	//console.log("html ",html, " pos ",pos);
    		}
    		html = html + '<li class="'+ nextdisable +'"><a href="#" class="nextAluno">Next</a></li>';
	    	return html;
	    };

	    private getPessoal(that:any):void{
	    	var _this = that;
	    	var self = this;

	    	//if (! _this.frag) {
		        	
		        	//$('#findAluno').typeahead({source:self.getAluno});
		        	self.getAluno();
		        	//var estado = _.pluck(Estados.find().fetch()[0].estado,"name");
		        	var estado = _.pluck(self.estados,"name");

		        	_this.frag = Meteor.render(
						  function() {
						    //var style = Session.equals("selectedId", post._id) ? "selected" : "";
						    // A real app would need to quote/sanitize post.name
						    var html = "";
						    var curr = dP.find({}, {skip: Session.get("skip"),limit: Session.get("limit"),reactive: false});
						    //console.log("curr ",curr);

						    curr.forEach(function(dp){
						    	
						    	//console.log("dp ", dp);
							    var user = Meteor.users.findOne({_id: dp.id}, {reactive: false});

							    if(user && user.profile.tipo === "Aluno" && _.contains(Session.get("estado"),user.profile.Estado)){
								    _.each(dp.escolas, function(escola){

								    	_.each(dp.turmas,function(turma){

								    		//var curr = dP.find({"escolas":escola,"turmas":turma});
								    		//curr.forEach(function(t){
								    		if(Session.equals("adminescolas",null) && Session.equals("alunoEscolha",null)){
									    		
									    		html = html + self.getHtml(escola,turma,dp,user);
									    	}else if(Session.equals("adminescolas",null) && Session.equals("alunoEscolha",dp.nome + ' ' + dp.sobrenome)){
										    	html = html + self.getHtml(escola,turma,dp,user);
										    }	
									    	else {
									    		_.each(Session.get("adminescolas"), function(arr){
									    			if(arr[0]==escola && arr[1]==turma && Session.equals("alunoEscolha",null)){
											    		
											    		html = html + self.getHtml(escola,turma,dp,user);
										    		}else if(arr[0]==escola && arr[1]==turma && Session.equals("alunoEscolha",dp.nome + ' ' + dp.sobrenome)){
										    			html = html + self.getHtml(escola,turma,dp,user);
										    		}	
									    		});
									    	}
								    		//});
								    	});
								    		
								    });
							    }
							}); 

						    return html;
					});

		        	//console.log("estado dentro de template ",Session.get("estado"));
		     		//Session.set("estado",self.estados);
		     		/*
		     		_this.frag = Meteor.renderList(
						  dP.find(),
						  function(dp) {
						    //var style = Session.equals("selectedId", post._id) ? "selected" : "";
						    // A real app would need to quote/sanitize post.name

						    var html = "";
						    var user = Meteor.users.findOne({_id: dp.id}, {reactive: false});

						    if(user && user.profile.tipo === "Aluno" && _.contains(Session.get("estado"),user.profile.Estado)){
							    _.each(dp.escolas, function(escola){

							    	_.each(dp.turmas,function(turma){

							    		//var curr = dP.find({"escolas":escola,"turmas":turma});
							    		//curr.forEach(function(t){
							    		if(Session.equals("adminescolas",null) && Session.equals("alunoEscolha",null)){
								    		
								    		html = html + self.getHtml(escola,turma,dp,user);
								    	}else if(Session.equals("adminescolas",null) && Session.equals("alunoEscolha",dp.nome + ' ' + dp.sobrenome)){
									    	html = html + self.getHtml(escola,turma,dp,user);
									    }	
								    	else {
								    		_.each(Session.get("adminescolas"), function(arr){
								    			if(arr[0]==escola && arr[1]==turma && Session.equals("alunoEscolha",null)){
										    		
										    		html = html + self.getHtml(escola,turma,dp,user);
									    		}else if(arr[0]==escola && arr[1]==turma && Session.equals("alunoEscolha",dp.nome + ' ' + dp.sobrenome)){
									    			html = html + self.getHtml(escola,turma,dp,user);
									    		}	
								    		});
								    	}
							    		//});
							    	});
							    		
							    });
						    }
							 

						    return html;
					});*/
		     	
						//$(that.find("#tbodyadminalunos")).append(_this.frag);
					//}
	    };

	    private setControlSearch(n:number):void{
	    		
	    		this.controlSearch = this.controlSearch + n;

	    		//if(this.controlSearch < 0)
	    		//	this.controlSearch = 0;

	    		//console.log("this.controlSearch: ", this.controlSearch);

	    		if(this.controlSearch >= 0){
	    			Session.equals("limit",0) ? Session.set("limit",this.limit) : null;
        			Session.equals("skip",0) ? Session.set("skip",this.skitcount) : null;

        		}else{
        			Session.equals("limit",0) ? null : Session.set("limit",0);
        			Session.equals("skip",0) ? null : Session.set("skip",0);
        		}

	    };

	    private getAluno(){
	    	var self = this;
	    	Meteor.autorun(function() {

	    		var val = dP.find().fetch();
		    	var res = _.map(val,function(v){
		    				return v.nome + " " +v.sobrenome;
		    		});

		    	$('#findAluno').typeahead({source:res,updater:$.proxy(self.getAlunoEscolha,self)});
	    	});
	    };

	    private getAlunoEscolha(escolha:any):any{
	    	console.log("A escolha é: ", escolha);
	    	Session.set("alunoEscolha",escolha);
	    	//console.log("this ",this);
	    	this.setControlSearch(-1);
	    	return escolha;
	    };

	    private getAlunos(query:any, callback:any):any{
	    	var res = [];
	    	var q = query.split(" ");
	    	var tmp = {$or:[]};
	    	tmp.$or.push({"nome":q[0]});
	    	tmp.$or.push({"sobrenome":q[1]});
	    	var val = dP.find(tmp).fetch();
	    	console.log("query ",q, " val ",val);

	    	if(val && val.length > 0){
	    		return _.map(val,function(v){
	    			return v.nome;
	    		});
	    		
	    	}else
	    		return [""];
	    };

	    private getHtml(escola:string,turma:string,dp:any,user:any):string{
	    		var html = "";
	    		
	    		html = html + '<tr>';
	    		html = html + '<td>' + dp.nome + ' ' + dp.sobrenome + '</td>';
	    		html = html + '<td>' + escola + '</td>';
	    		html = html + '<td>' + turma + '</td>';
	    		html = html + '<td>' + user.profile.Estado + '</td>';
	    		html = html + '</tr>';

	    		return html;
	    };

	    private getCursor():any{
	    		console.log("chamado cursor");
	    		if(Session.equals("adminescolas",null)){
	    			return dP.find();
	    		}else {

	    			var tmp = {$or:[]};

	    			_.each(Session.get("adminescolas"),function(arr){
	    				tmp.$or.push({"escolas":arr[0],"turmas":arr[1]});
	    			})
	    			console.log("tmp ",tmp);
	    			return dP.find(tmp);
	    		}
	    }
	}
}
