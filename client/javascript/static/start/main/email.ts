///<reference path='../../../../../../Definitions/mydefs/declare_vars.ts'/>


module Eduapp{

	export class Email {

		private de:string;
		private para: string;
		private corpo:string;
		private assunto:string;
		private html:bool = false;
		private opt:any;

		//private myid: any;
		//private profileTipo: string = "";

		constructor(de?:string,para?:string,corpo?:string,assunto?:string,public html?:bool)
	    {
	       	this.de = de;
	       	this.para = para;
	       	this.corpo = corpo;
	       	this.assunto = assunto;
	       	if(html)
	       		this.html = html;
	    }

	    //cc; bcc; replyTo devem ser enviados por opt;
	    public sendMail(opt?:any):void{
	    		this.opt = opt;
	    		Meteor.call("sendMail",opt,this.de,this.para,
				 	this.corpo,this.assunto,this.html,function(error, result){
			        
			        if(alert-error){
			           	console.log("email error ");
			        }else{
			            console.log("email enviado !!! ");
			            //self.refresh = true;
			        }
			    });
	    }
	}
}
