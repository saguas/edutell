
var IDXHOMEMENUTITLE = EDUTELL + "HOME";
  

Template.menu_orig.rendered = function(){
	$('#myCarousel').carousel();
};

Template.menu_orig.destroyed = function(){
	$('#myCarousel').carousel('pause');
};