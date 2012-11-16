/// <reference path="../common/variaveis/declare_vars.ts" />
/*/// <reference path="../../../../../Definitions/chosen-0.9.d.ts" />*/

module MConfigInscricao{

	export class CConfigInscricao {

        private escolas: string[];
        private turmas: string[];

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
                this.escolas = escolas;
                this.turmas = turmas;
	            ret = true;
	        }

	        return ret;
	    };

        insert():void{

              var obj = {
                id: Meteor.userId,
                escolas:this.escolas,
                turmas: this.turmas
              };

              console.log("obj ", obj, " userId ",Meteor.userId());

              //dP.insert(obj);
              dP.update({id:Meteor.userId()},{$set:obj});
              Meteor.users.update(Meteor.userId(),{$set:{"profile.tipo":$('#classes').val()}});
           
        };

        getEscolas(): string[]{
            return this.escolas;
        };

	}

    Session.set("escolas",[""]);

	var cConfigInsc = new CConfigInscricao();

	Template.config_inscricao.rendered = function() {
        console.log("config_inscricao.rendered");
        $(this.findAll(".chzn-select")).chosen();

        $(this.find("#escola")).chosen().change(function(){
            //console.log("escola ",$("#escola").val());
            Session.set("escolas",$("#escola").val());
        });
    };

    Template.dpFormInsc2.rendered = function(){
        var _this = this;
        console.log("dpFormInsc2.rendered");
        if (! _this.handle) {
          _this.handle = Meteor.autorun(function() {
                var dados = dP.findOne({id:Meteor.userId()});
                console.log("dados in dpFormInsc2.rendered ",dados);
                if(dados){
                    $('#escola').val(dados.escolas);
                    $("#escola").trigger("liszt:updated");
                    //$('#turma').val(dados.turmas);
                    Session.set("dadosPessoais",true);
                    Session.set("dadosPessoaisEdit",false);
                    //Session.set("escolas",$("#escola").val());
                    Session.set("escolas",$("#escola").val());
                    //Session.set("escolas",dados.turmas);
                    //Template.dpFormInsc2.Turmas();

                   $('#turma').val(dados.turmas);   
                   $("#turma").trigger("liszt:updated"); 
                   
                    
                    //Session.set("escolas",dados.turmas);
                }else{
                    Session.set("dadosPessoais",false);
                    Session.set("dadosPessoaisEdit",true);
                }
            });
      }
    };

    Template.dpFormInsc2.destroyed = function() {
        this.handle && this.handle.stop();
    };


    Template["config_sidebar-left"].dadosPessoais = function(){
        return Session.get("dadosPessoais");
    };

    Template.dpFormInsc2.Escola = function(){
        return Escolas.find();
    };

    Template.dpFormInsc2.EscolaSelected = function(escola){
        var ret = false;
        var dados = dP.findOne({id:Meteor.userId()});

        if(dados){
            ret = _.contains(dados.escolas,escola.name);
        }

        //console.log("EscolaSelected ",escola, " dados ", dados, " ret ", ret);
        return ret;
    };

    Template.dpFormInsc2.Turmas = function(){
        //console.log("Turmas ",Escolas.find({name: Session.get("escolas")[0]}).fetch());

        var myt = [];

        _.each(Session.get("escolas"),function(escola){
            var obj = Escolas.find({name: escola}).fetch();
            //console.log("obj ",obj);

            if(obj.length > 0){
                //obj[0].turmas[0].selected="selected";
                //console.log("obj ",obj[0]);
                myt.push(obj[0]);
            }
        });

        //console.log("myt ",myt);

        return myt.length > 0? myt: null;
        //return Escolas.find({name: Session.get("escolas")[0]}).fetch();
    };

    //Template.dpFormInsc2.Turma = function(){
    Handlebars.registerHelper('Turma',function(t){
        console.log("turmas ", t.turmas);

        var dados = dP.findOne({id:Meteor.userId()});

        if(dados){
            _.each(t.turmas,function(tt){
                    console.log("tt ",tt);
                    if(_.contains(dados.escolas,t.name)){
                            //t[idx].selected = "selected";
                            if(_.contains(dados.turmas,tt.turma)){
                                tt.selected = "selected";
                            }
                            
                            console.log("tt ", tt);
                    }
                });
        }

        return this.turmas;//[{turma:""}];//this.turmas;////this.turmas;
    });

    Template.config_inscricao.events({
        'click #btnformInsc': function(event, tmpl) {
                
                //console.log("Open Modal ");
                event.preventDefault();
                event.stopPropagation();

                if(cConfigInsc.verifyInscricao(tmpl)){
                    //console.log("form click button ",$(tmpl.find(".form-horizontal")));
                    if($(tmpl.find('#classes')).val() == "Prof"){
                        $(tmpl.find('#myModal')).modal();
                    }
                    else{
                        cConfigInsc.insert();
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
            Meteor.call("verifyAcesso",pass,cConfigInsc.getEscolas(),function(error, result){
                console.log("error ", error, " result ", result);
                if(error || !result){
                    toastr.error("Password Errada!!. Verifique os espaços antes e depois","Acesso");    
                }else{
                    $(tmpl.find('#myModal')).modal('hide');    
                    cConfigInsc.insert();
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