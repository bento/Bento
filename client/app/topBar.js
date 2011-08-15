function topBar(params) {

	$('<div id="slideSiteTopBar" class="slideSiteTopBar"></div>' ).appendTo($('#root'));

	//input type="text"
	var h = params.winMarginTop,
	    topCss = {
	    	position :'fixed' ,  
	    	top : 0,
	    	left : -5,
	    	width : $(window).width()+5,
	    	height : h,
	    	opacity: 0
	    }
	
	
	
	$('#slideSiteTopBar').css(topCss);			

	$('#slideSiteTopBar').animate({opacity:1},{duration:200});			

	
	var topBar = {
	    css : topCss,
	    obj : $('#slideSiteTopBar'),
	}
	
	
	$('<div id="slideSiteTopBarLogo" class="slideSiteTopBarLogo"><a class="" href="#/'+params.home+'/"><img src="'+params.logo+'"></img></a></div>' ).appendTo($('#slideSiteTopBar'));
	
	
	
	$('<input id="slideSiteMenuSearch" class="slideSiteMenuSearch miniScreenText" value="">' ).appendTo($('#slideSiteTopBar'));
	$('#slideSiteMenuSearch').css({'margin-left':($(window).width()-$('#slideSiteMenuSearch').width()-30)});
	
	$('<div id="slideSiteMenuSearchGrphx" class="slideSiteMenuSearchGrphx"><div class="icon searchIcon"></div></div>' ).appendTo($('#slideSiteTopBar'));
	$('#slideSiteMenuSearchGrphx').css({'margin-left':($(window).width()-52)});

		var resizeTimerBB;

	
	$('#slideSiteMenuSearch').keyup(function(e) {
	
		if(!(e.keyCode == 39 || e.keyCode == 37)) {
			if (resizeTimerBB) clearTimeout(resizeTimerBB);
			resizeTimerBB = setTimeout(resizerBB, 250);	
		}
		function resizerBB() {	
			window.location.hash = '#/search/'+$('#slideSiteMenuSearch').val()+'/';
		}
	});

	
			
}				
