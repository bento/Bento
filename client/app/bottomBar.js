function bottomBar(params) {

	$('<div id="slideSiteMenu" class="slideSiteMenu"></div>' ).appendTo($('#root'));
	$('<div id="slideSiteMenuText"></div>' ).appendTo($('#slideSiteMenu'));
	
	
	$('<div id="toggleHub" class="icon thumb"></div>').appendTo($('#slideSiteMenu'))
	
	$('#slideSiteMenu').css({
		padding:12
	});			

	$('<div id="toggleHub" class="icon star"></div>').appendTo($('#slideSiteMenu'))
	
	$('<div id="toggleHub" class="icon viewed"></div>').appendTo($('#slideSiteMenu'))
	
	$('<div id="toggleHub" class="icon left"></div>').appendTo($('#slideSiteMenu'))
	
	$('<div id="toggleHub" class="icon download"></div>').appendTo($('#slideSiteMenu'))

	var h = params.winMarginBot,
	    bottomCss = {
	    	position :'fixed' ,  
	    	top : $(window).height()-h,
	    	left : -5,
	    	width : $(window).width()+5,
	    	height : h
	    }
	
	$('#slideSiteMenu').css(bottomCss);			
		
		
}				
