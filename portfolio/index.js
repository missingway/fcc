$(document).ready(function(){

	$('a[href="#about"]').on('click',function(){
		$('body,html').animate({scrollTop:0},400);
		return false;
	});
	$('a[href="#portfolio"]').on('click',function(){
		$('body,html').animate({scrollTop:341},400);
		return false;
	});
	$('a[href="#contact"]').on('click',function(){
		$('body,html').animate({scrollTop:1892},400);
		return false;
	});
	
});