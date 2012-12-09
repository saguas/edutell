///<reference path='../../../../../Definitions/mydefs/declare_vars.ts'/>
///<reference path='../../../../../Definitions/mydefs/pagetemplate.d.ts'/>

module Eduapp{
	export class ConfigInscricaoPage extends PageTemplate{

		 private cConfigInsc:any;
		 //private myid:any;
		 //private refresh: bool;

		 constructor(tmpl:string,pos:string,tipo:string, router:any)
	    {
	        super(tmpl,pos,tipo,router);

	        //this.refresh = true;
	        this.startHelpers();
	        this.startTemplate();
	       	//this.myid = Meteor.userId();
	        //Session.set("escolas",[""]);
	        Session.set("escolas",null);
	        console.log("objecto ConfigInscricaoPage criado");
	        //Session.set("refresh", true);
	        this.cConfigInsc = new CConfigInscricao();

	    }

	    private startTemplate():void{
	    	var self = this;

	    	Template.config_inscricao.rendered = function() {
		    	//console.log("config_inscricao.rendered");
		        $(this.findAll(".chzn-select")).chosen();
		        //$("#turma").trigger("liszt:updated"); 
		        //$("#escola").trigger("liszt:updated");

		        $(this.find("#escola")).chosen().change(function(){
		            //console.log("escola ",$("#escola").val());
		            Session.set("escolas",$("#escola").val());
		        });
			};

			Template.dpFormInsc2.rendered = function(){
		        var _this = this;
		        //var myid = Meteor.userId();
		        console.log("dpFormInsc2.rendered");
		        if (! _this.handle) {
		          _this.handle = Meteor.autorun(function() {
		          		var myid = Meteor.userId();
		                var dados = dP.findOne({id:myid});
		                console.log("dados in dpFormInsc2.rendered ",dados);
		                if(dados){
		                    $('#escola').val(dados.escolas);
		                    $("#escola").trigger("liszt:updated");
		                    //$('#turma').val(dados.turmas);
		                    //Session.set("escolas",dados.turmas);
		                    //Template.dpFormInsc2.Turmas();

		                    $('#turma').val(dados.turmas);   
		                    //console.log("turmas em dados ",);
		                    $("#turma").trigger("liszt:updated"); 

		                    Session.set("dadosPessoais",true);
		                    Session.set("dadosPessoaisEdit",false);
		                    //Session.set("escolas",$("#escola").val());
		                    Session.set("escolas",$("#escola").val());
 
		                    //Session.set("escolas",dados.turmas);
		                }else{
		                    Session.set("dadosPessoais",false);
		                    Session.set("dadosPessoaisEdit",true);
		                }
		                //self.refresh = false;
		                //Session.set("refresh", false);
		            });
		      }
		    };

		    Template.dpFormInsc2.destroyed = function() {
		        this.handle && this.handle.stop();
		    };

		    Template.dpFormInsc2.Escola = function(){
		        return Escolas.find();
		    };

		    Template.dpFormInsc2.EscolaSelected = function(escola){
		        var ret = false;
		        var myid = Meteor.userId();
		        //var dados = dP.findOne({id:Meteor.userId()});
		        var dados = dP.findOne({id:myid});

		        if(dados){
		            ret = _.contains(dados.escolas,escola.name);
		        }

		        //console.log("EscolaSelected ",escola, " dados ", dados, " ret ", ret);
		        return ret;
		    };

		    Template.dpFormInsc2.Turmas = function(){
		        //console.log("Turmas ",Escolas.find({name: Session.get("escolas")[0]}).fetch());

		        var myt = [];
		        var myid = Meteor.userId();
		        //var dados = dP.findOne({id:Meteor.userId()}, {reactive: false});
		        var dados = dP.findOne({id:myid}, {reactive: false});

		        _.each(Session.get("escolas"),function(escola){		        	
		            var obj = Escolas.find({name: escola},{reactive: false}).fetch();
		           
		            //console.log("context ",Meteor.deps.Context.current);
		            
		            if(obj.length > 0){
		            
		                myt.push(obj[0]);
		            }
		        });

		        //console.log("myt ",myt);
		        if(dados){
		        	_.each(myt,function(obj){
		        		//console.log("obj ",obj.turmas);
			            _.each(obj.turmas,function(tt){
			                    //console.log("tt ",tt);
			                    if(_.contains(dados.escolas,obj.name)){
			                            //t[idx].selected = "selected";
			                            if(_.contains(dados.turmas,tt.turma)){
			                                tt.selected = "selected";
			                            }
			                            
			                            //console.log("tt ", tt);
			                    }
			                });
		        	});
		        }

		        console.log("turmas template myt ",myt, " sessiom.get(escolas) ",Session.get("escolas"));
		        return myt.length > 0? myt: null;
		        //return Escolas.find({name: Session.get("escolas")[0]}).fetch();
		    };

		    Template.dpFormInsc2.Turma = function(t){

		        console.log("this turmas ", this.turmas);
		        return this.turmas;
		    };

		    Template.config_inscricao.events({
		        'click #btnformInsc': function(event, tmpl) {
		                
		                //console.log("Open Modal ");
		                event.preventDefault();
		                event.stopPropagation();

		                if(self.cConfigInsc.verifyInscricao(tmpl)){
		                    //console.log("form click button ",$(tmpl.find(".form-horizontal")));
		                    if($(tmpl.find('#classes')).val() == "Prof"){
		                        $(tmpl.find('#myModal')).modal();
		                    }
		                    else{
		                        self.cConfigInsc.insert();		                      
		                        //self.refresh = true;
		                    }
		                }
		                /*
		                Escolas.insert({name:"Jorge Peixinho", turmas:[{turma:"11A", "alunos#":"22"}]},function(error,id){
		                        console.log("erro: ", error, " id: ", id);
		                });
		                */

		           },
		       'click #btnpassacesso': function(event, tmpl) {
		            event.preventDefault();
		            event.stopPropagation();
		            var pass = $("#passacesso").val();
		            //console.log("password ", $("#passacesso").val());
		            Meteor.call("verifyAcesso",pass,self.cConfigInsc.getEscolas(),function(error, result){
		                console.log("error ", error, " result ", result);
		                if(error || !result){
		                    toastr.error("Password Errada!!. Verifique os espaços antes e depois","Acesso");    
		                }else{
		                    $(tmpl.find('#myModal')).modal('hide');    
		                    self.cConfigInsc.insert();
		                    //self.refresh = true;
		                }
		            });
		                
		            //cConfigInsc.insert();

		                      
		        },

		        'keypress #passacesso': function(event, tmpl){
		            if(event.keyCode == 13){
		                console.log("event ", event.keyCode);
		                event.preventDefault();
		                event.stopPropagation();
		                $('#btnpassacesso').trigger("click");
		            }

		            
		        }        
		    });
	    }

	    private startHelpers():void{
<<<<<<< HEAD
	    	//Template.dpFormInsc2.Turma = function(){

		    /*Handlebars.registerHelper('Turma',function(t){
		        //console.log("turmas ", t);

		        var dados = dP.findOne({id:Meteor.userId()});

		        if(dados && t){
		            _.each(t.turmas,function(tt){
		                    //console.log("tt ",tt);
		                    if(_.contains(dados.escolas,t.name)){
		                            //t[idx].selected = "selected";
		                            if(_.contains(dados.turmas,tt.turma)){
		                                tt.selected = "selected";
		                            }
		                            
		                            //console.log("tt ", tt);
		                    }
		                });
		        }

		        return this.turmas;//[{turma:""}];//this.turmas;////this.turmas;
		    });*/
=======
	    	
>>>>>>> TSClassViewChange
	    }
	}

	export class CConfigInscricao {

        private escolas: string[];
        private turmas: string[];
        private profileTipo: string;

		constructor() {
		};

	    verifyInscricao(tmpl: any):bool{
	        
	        var ret = false;
	        var escolas = $(tmpl.find('#escola')).val() || [];
	        var turmas = $(tmpl.find('#turma')).val() || [];

	        //console.log("turmas ", turmas);

	        if(turmas.length == 0 && escolas.length == 0){
	            toastr.error("É necessária selecionar uma escola e uma turma ","Inscrição");
	        }else if(turmas.length == 0){
	            toastr.error("É necessária selecionar uma turma ","Inscrição");
	        }else if(escolas.length == 0){
	            toastr.error("É necessária selecionar uma escola ","Inscrição");
	        }else{
                this.escolas = _.without(escolas,"");
                this.turmas = _.without(turmas,"");
                this.profileTipo = $('#classes').val();
	            ret = true;
	        }

	        return ret;
	    };

        insert():void{

        	  var myid = Meteor.userId();
              var obj = {
                //id: Meteor.userId,
                id: myid,
                escolas:this.escolas,
                turmas: this.turmas
              };

              console.log("obj ", obj, " userId ", myid);

              //dP.insert(obj);
              //dP.update({id:Meteor.userId()},{$set:obj});
              dP.update({id:myid},{$set:obj});
              //Meteor.users.update(Meteor.userId(),{$set:{"profile.tipo":$('#classes').val()}});
              Meteor.users.update(myid,{$set:{"profile.tipo":this.profileTipo}});

              //Session.set("refresh", true);
           	  
        };

        getEscolas(): string[]{
            return this.escolas;
        };

	}
}
