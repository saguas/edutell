
var IDXHOMEMENUTITLE = EDUTELL + "HOME";

Session.set("inicio","");  



_.extend(menu_origEvents,{
	'click .home' : function(event){
		event.preventDefault();
		//$(event.currentTarget).addClass("active");
		//$('.home').addClass("active");
		//clearTooltip();
		Session.set("inicio","active");
		Router.changePage(Router.pages.inicial);
		//console.log("home click ", event.currentTarget);
}});
  
 Handlebars.registerHelper('inicio', function() {
  	//mostra o menu login em algumas páginas antes de fazer login
      return Session.get("inicio");
 });
  


Template.home.rendered = function(){
	$('#myCarousel').carousel();
};

Template.home.destroyed = function(){
	//$('#myCarousel').carousel("pause");
};