function bottomBar(params) {

	$('<div id="slideSiteMenu" class="slideSiteMenu"></div>' ).appendTo($('#root'));
	$('<div id="slideSiteMenuText"></div>' ).appendTo($('#slideSiteMenu'));


	$('<div id="toggleHub" class="icon thumb"></div>').appendTo($('#slideSiteMenu'))

	$('#slideSiteMenu').css({
		padding:12
	});			

	$('<div id="toggleHub2" class="icon star"></div>').appendTo($('#slideSiteMenu'))

	$('<div id="toggleHub3" class="icon viewed"></div>').appendTo($('#slideSiteMenu'))

	$('<div id="toggleHub4" class="icon left"></div>').appendTo($('#slideSiteMenu'))

	$('<div id="toggleHub5" class="icon close"></div>').appendTo($('#slideSiteMenu'))

	var h = params.winMarginBot,
	    bottomCss = {
	    	position :'fixed' ,  
	    	top : $(window).height()-h+params.winMarginBot,
	    	left : -5,
	    	width : $(window).width()+5,
	    	height : h
	    }

	$('#slideSiteMenu').css(bottomCss);			


}			