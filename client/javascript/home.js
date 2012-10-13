
var IDXHOMEMENUTITLE = EDUTELL + "HOME";

Session.set("inicio","");  
  
 Handlebars.registerHelper('inicio', function() {
  	//mostra o menu login em algumas páginas antes de fazer login
      return Session.get("inicio");
 });
  


Template.home.rendered = function(){
	$('#myCarousel').carousel();
};

Template.home.destroyed = function(){
	$('#myCarousel').carousel("pause");
};