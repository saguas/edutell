///<reference path='layout.ts'/>
///<reference path='middlelayout.ts'/>

module Main {

	var mlayout = new Eduapp.MiddleLayout("home",Eduapp.Position.MIDDLE,UserTipo.ALUNO);
	var layout = new Eduapp.Layout("layout",Eduapp.Position.MIDDLE,UserTipo.ALUNO);

	console.log("Main mlayout ", mlayout);
	//Template.layout();

	//mlayout.setTemplateName("home");
	var self = mlayout;
	
	Handlebars.registerHelper('middle', function() {
    	var tmpl = self.getTemplateName();
        console.log("template ",tmpl);
        if (Template[tmpl]){ //verifica se há um template com o node dado por this.pag            
            return Template[tmpl]();//chama o template registado com o nome de this.page
        }
    });
}