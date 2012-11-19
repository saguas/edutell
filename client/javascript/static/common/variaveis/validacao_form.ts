/// <reference path="declare_vars.ts" />

interface MessageShowed{
	elementName: string;
	showed: bool;
}

module Eduapp{

	export class CFormValidacao {

			private msgshowed: MessageShowed[];
			private FORMCLASSSUCCESS:string = "success";

			constructor() {

					Meteor.startup(function(){
				         $.validator.addMethod("cpRegex", function(value, element) {
				            var pattern = /^[0-9]{4}\-\d{3}$/;
				            return this.optional(element) || pattern.test(value);
				        }, "O Código postal deve ser da forma 0000-000");
				        
				         $.validator.addMethod(        "DateFormat",
				            function(value, element) {
				                //console.log("DateFormat ",value);
				                return value.match(/^\d\d?\-\d\d?\-\d\d\d\d$/);
				            },"Please enter a date in the format dd/mm/yyyy");
				            
				         $.validator.addMethod("telRegex", function(value, element) {
				            //var pattern = /[0-9]{9}/i;
				            //var pattern = /^9[1236][0-9]{7}$|^2[1-9][0-9]{7}$/;
				            var pattern = /^9[1236][0-9]{1}\s?[0-9]{3}\s?[0-9]{3}$|^2[1-9]{2}\s?[0-9]{3}\s?[0-9]{3}$/;
				            //return value.match(/9[1236][0-9]{7}|2[1-9][0-9]{7}/);
				            
				            return this.optional(element) || pattern.test(value);
				         }, "Introduza apenas 9 digitos");

				    });

					this.msgshowed = [];

			}
		 	//mudar elem para HTMLElement quando existir jquery.validator
		    formValidacao(elem: any): void{
		        
			        elem.validate({

			            rules: {
			                nome: {
			                    required: true
			                },
			                sobrenome: {
			                    required: true
			                },
			                CPostal:{
			                    cpRegex: true
			                },
			                dtn:{
			                    DateFormat: true
			                },
			                tel:{
			                    //number: true,
			                    telRegex:true
			                },
			                tlm:{
			                    //number:true,
			                    telRegex:true
			                }
			            },
			            //errorContainer:"",
			            errorClass: "help-inline",
			    	    errorElement: "span",
			        
			            highlight: function(element: HTMLElement, errorClass, validClass):void {
			                //console.log("element ", element, " closest ", $(element).closest('.control-group'));
			                //$(element).addClass(errorClass).removeClass("valid");
			                //console.log("highlight ",validClass);
			                //console.log("$(element).parents('.control-group') ",$(element).parents('.control-group'));
			                $(element).closest('.control-group').removeClass('success');
			                $(element).closest('.control-group').addClass('error');
			                
			                //$(element).tooltip('show');
			            },
			            unhighlight: function(element: HTMLElement, errorClass, validClass):void {
			                //$(element).removeClass(errorClass).addClass(validClass);
			                //$(element).tooltip('hide');
			                //console.log("unhighlight ",element);
			                $(element).closest('.control-group').removeClass('error');
			                $(element).closest('.control-group').addClass(this.FORMCLASSSUCCESS);
			            },
			            
			            errorPlacement: function(error, element) {
			                $(element).closest('.control-group').addClass('error');
			                //console.log("element ", element, " error ", error);
			                //toastr.error(error,element.attr("name"));
			            },
			            invalidHandler: (form, validator:any) => {
			                //console.log("validator ", validator, " form ", form);
			                var count = 0;
			                for(var i=0;i<validator.errorList.length;i++){
			                    var element = validator.errorList[i].element;

			                    if(this.verifyMsgShowhed(element.name) == -1){
			                    	$(element).closest('.control-group').addClass('error');
			                    	toastr.error(validator.errorList[i].message,element.name);
			                    	this.msgshowed.push({
			                    		"elementName": element.name,
			                    		"showed": true
			                    	});
			                    	count++;
			                	}else{
			                		
			                	}
			                	
			                }
			                if(count == 0){
			                	$('.toast').remove();
			                	toastr.error("corrija os " + validator.errorList.length + " erros já apontados!!");
			            	}
			            },
			            messages: {
			                nome: {//colocar mensagens espec√≠ficas aqui
			                    //required: "campo obrigat√≥rio"
			                },
			                password: {
			                    //required: "campo obrigat√≥rio",
			                    minlength: "<span class='label label-important'><small>tamanho mínimo é de 6 caracteres</small></pan>"
			                },
			                email: {
			                    email: "<span class='label label-important'><small>introduza um email válido</small></span>"
			                },
			                CPostal:{
			                    cpRegex:"<span class='label label-important'><small>O Código postal deve ser da forma 0000-000</small></span>"
			                },
			                tel:{
			                    telRegex:"<span class='label label-important'><small>Introduza 9 digitos</small></span>"
			                },
			                tlm:{
			                    telRegex:"<span class='label label-important'><small>Introduza 9 digitos</small></span>"
			                }
			            }

			        });
		    };

		    private verifyMsgShowhed(nome: string): number{
		    			var ret = -1;

			    		for(var j=0;j<this.msgshowed.length;j++){
			    				if(this.msgshowed[j].showed && this.msgshowed[j].elementName === nome){
			    					ret = j;
			    					console.log("elemento ", nome, " encontrado index ",j);
			    					break;
			    				}
			    		}

			    		return ret;
		    };
		    //mudar para HTMLElement quando existir jquery.validator
		    verificarForm(form: any/*HTMLElement*/): bool{
		      
		        if (/*$('form')*/form.valid()) {
		            var dtn = $('#dtn').val();
		            if(dtn.split('-')[2] == new Date().getFullYear()){
		                console.log("form invalid ");
		                
		                return false;
		            }
		            
		            console.log("form valid ");
		            return true;
		        } else {
		            this.FORMCLASSSUCCESS = "success";
		            
		            return false;
		            //$('#Nome').val("");
		            //$('#Sobrenome').val("");
		        }
		        
		    };

   	}
}
