///<reference path='../common/variaveis/declare_vars.ts'/>
///<reference path='../../../../../Definitions/mydefs/pagetemplate.d.ts'/>
///<reference path="../../../../../Definitions/mydefs/validacao_form.d.ts" />

//import Global = Eduapp.Global;
//import CC = Eduapp.Constantes;

module Eduapp{
	export class ConfigDadosPessoaisPage extends PageTemplate{

		private validacao_form:any;

		constructor(tmpl:string,pos:string,tipo:string, router:any)
	    {
	        super(tmpl,pos,tipo,router);

	        this.startHelpers();
	        this.startTemplate();
	        this.validacao_form = new Eduapp.CFormValidacao();

	    }

	    private startTemplate():void{
	    	var self = this;
	    	Template.config_dados_pessoais.rendered = function() {
		    	//console.log("config_dados_pessoais");
		        var form = $(this.find(".form-horizontal"));
		        self.validacao_form.formValidacao(form);
		        var dtn = $(this.find('#dp3'));
		        this.dtn = false;
		        var _this = this;
		        var dados;

		        if (! _this.handle) {
		          _this.handle = Meteor.autorun(function() {
		              dados = dP.findOne({id:Meteor.userId()});
		              console.log("dados ", dados, " this.dtn ",_this.dtn);
		              if(dados){
		                  $('#Nome').val(dados.nome);
		                  
		                  $('#Sobrenome').val(dados.sobrenome);
		                  
		                  $('#Morada').val(dados.morada);
		                  
		                  $('#CPostal').val(dados.cpostal);
		                  
		                  $('#tel').val(dados.telefone);
		                 
		                  $('#telemovel').val(dados.tlm);
		                  
		                  Session.set("dadosPessoais",true);
		                  Session.set("dadosPessoaisEdit",false);
		                  
		                  //$('#dtn').val(dados.dtn);
		                  dtn.datepicker('setValue',dados.dtn);
		                  _this.dtn = true;
		          }else{
		               //var elem = this.find('#dtn');
		              dtn.datepicker.setdatestring({
		                          days: ["Sundays", "Mondays", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
		                          daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
		                          daysMin: ["Do", "Se", "Te", "Qt", "Qt", "Se", "Sa", "Do"],
		                          months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
		                          monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
		              });
		              //$('#btnform').addClass("btn-primary");
		              Session.set("dadosPessoais",false);
		              Session.set("dadosPessoaisEdit",true);
		              dtn.datepicker()
		                  .on('show', function(ev){
		                     if(!_this.dtn){
		                        var today = new Date();
		                        dtn.datepicker('setValue',new Date(today.getFullYear()-10, today.getMonth(),today.getDate()));//"28-10-2012");
		                    }else{
		                        dtn.datepicker('setValue',dados.dtn);//"28-10-2012");
		                    } 
		                          //$('.popdtn').popover('show');
		                  });
		              dtn.datepicker()
		                  .on('hide', function(ev){
		                    
		                  });
		                  
		              dtn.datepicker()
		                  .on('changeDate', function(ev){
		                   
		                   
		                  });
		                  
		              dtn.datepicker()
		                  .on('clickDate', function(ev){
		                    
		                  });
		          }
		      });
		    }
		      if(!this.handleEdit){
		            console.log("handleEdit ", this.handleEdit);
		            this.handleEdit = self.disableFormElemnt();
		        }
		        $('a[data-toggle="pill"]').on('show', function (e) {
		            //console.log("e.target ",e.target); // activated tab
		            //console.log("e.relatedTarget ",e.relatedTarget); // previous tab
		            
		            return self.validacao_form.verificarForm($(".form-horizontal"));
		            
		        });

		        if(!this.dtn){
		            //dtn.datepicker({viewMode:2});//"28-10-2012");
		            var today = new Date();
		            dtn.datepicker('setValue',today);//"28-10-2012");
		            this.dtn = true;
		            //console.log("RENDERED ",this.dtn);
		        }
			};

			Template.config_dados_pessoais.destroyed = function() {
		        this.handle && this.handle.stop();
		        this.handleEdit && this.handleEdit.stop();
		        var dtn = $('.datepicker');
		        //console.log("destroyed ",dtn);
		        this.dtn = false;
		        
		        dtn.hide();//verificar se é possível remover do dom.
		    };

		    Template.config_dados_pessoais.edit = function() {
		          return Session.get("dadosPessoais");
		    }

		    Template.config_dados_pessoais.events({
		        'click #btnform': function(event, tmpl) {
		                
		                console.log("submit ");
		                event.preventDefault();
		                event.stopPropagation();
		                //console.log("template origem ",this);

		                //console.log("form click button ",$(tmpl.find(".form-horizontal")));
		                if(self.validacao_form.verificarForm($(tmpl.find(".form-horizontal")))){
		                    
		                    var obj = {
		                        id: Meteor.userId(),
		                        nome: $.trim($('#Nome').val()),
		                        sobrenome: $.trim($('#Sobrenome').val()),
		                        morada: $.trim($('#Morada').val()),
		                        cpostal: $.trim($('#CPostal').val()),
		                        telefone: $.trim($('#tel').val()),
		                        tlm: $.trim($('#telemovel').val()),
		                        dtn: $('#dtn').val()
		                    };

		                    if(!Session.get("dadosPessoais")){
		                        dP.insert(obj,function(error,result){
		                          if(error){
		                            toastr.error("Erro ao guardar os dados verifique as ligações. ","Erro");
		                            Session.set("dadosPessoaisEdit",true);
		                          }
		                      });  
		                    }else{
		                        console.log("userID ",Meteor.userId());
		                        dP.update({id:Meteor.userId()},obj);
		                    }

		                    Session.set("dadosPessoaisEdit",false);
		                    /*
		                    Meteor.call("addDadosPessoais",obj,function(error, result){
		                          console.log("error ", error, " result ", result);
		                          //Session.set("dadosPessoaisEdit",true);
		                    });
		                    */
		                };
		           },
		        'click #btnedit': function(event, tmpl){
		              event.preventDefault();
		              event.stopPropagation();
		              Session.set("dadosPessoaisEdit",true);
		          },
		        'keypress #tel': function(ev,tmpl){
		             //console.log(ev);//.srcElement.value);
		        }
		    });
	    }

	    private startHelpers():void{
	    	
	    }

	    private disableFormElemnt():any{

	        return Meteor.autorun(function() {
		          if(!Session.get("dadosPessoaisEdit")){
		            $('#Nome').attr("disabled","");
		            $('#Sobrenome').attr("disabled","");
		            $('#Morada').attr("disabled","");
		            $('#CPostal').attr("disabled","");
		            $('#tel').attr("disabled","");
		            $('#telemovel').attr("disabled","");
		            $('#calicon').hide();
		            $('#btnedit').addClass("btn-primary");
		            $('#btnedit').removeAttr("disabled");
		            $('#btnform').removeClass("btn-primary");
		            $('#btnform').attr("disabled","");
		        }else{
		            $('#Nome').removeAttr("disabled");
		            $('#Sobrenome').removeAttr("disabled");
		            $('#Morada').removeAttr("disabled");
		            $('#CPostal').removeAttr("disabled");
		            $('#tel').removeAttr("disabled");
		            $('#telemovel').removeAttr("disabled");
		            $('#calicon').show();
		            $('#btnedit').removeClass("btn-primary");
		            $('#btnform').addClass("btn-primary");
		            $('#btnform').removeAttr("disabled");
		            $('#btnedit').attr("disabled","");
		        }
	      });
	    }
	}
}

