function position(params,animate) {
		
	var i = 0, 	
	maxH = Math.floor(($(window).height()-params.winMarginBot-(params.hSpacing*2)-params.winMarginTop-params.hubRealH)/(params.h+params.marginH*2)), 
	maxW = Math.floor(($(window).width()-params.winMarginWidth*2)/(params.w+params.marginW));
	
	if(maxH === 0) {maxH = 1;}
	if(maxW === 0) {maxW = 1;}
		
	var maxDisplay = maxH*maxW,
	topMarginOver = (($(window).height()-params.winMarginBot-(params.hSpacing*2)-params.winMarginTop)-maxH*(params.h+params.marginH))/2,	
	widthMarginOver = (($(window).width()-params.winMarginWidth*2)-maxW*(params.w+params.marginW))/2,
	pages = Math.ceil(params.displayArray.length/maxDisplay),
	lastPage = pages*maxDisplay - params.displayArray.length,
	currentPage = Math.ceil( params.index / maxDisplay );
		
	params.bgPos = -$(window).width()*(currentPage);
	params.scrollPos = 0;
	params.rootPos = 0;  
	if(params.counterID) {
		clearInterval(params.counterID);			
		params.counterID = null;
	
	}
	params.scrollCnt = -1;

	$('#root_screens').animate({left: params.rootPos },{duration:700});

	if( (($(window).width() != params.curWinWidth) || pages != params.pages ) && params.bg) {
	
			params.curWinWidth = $(window).width();
				
			$('#bg').css({left:-$(window).width()*(currentPage)});

			$('#bgholder').empty().remove();
			
			$('<div id="bgholder"></div>').appendTo($('#bg'))
				
			for(var j = 0 ; j < pages ; j++) {
				var c = 'ee';
				$('<div id="bg'+j+'" style="position:absolute;left:'+$(window).width()*j+';width:100%;height:100%;margin-left:-2px;border-left:5px solid #ccc;background-image: url(\'client/img/cubes.png\');"></div>').appendTo($('#bgholder'));
			}	
	}
	
	params.pages = pages;
	params.lastPage = lastPage;
	params.maxDisplay = maxDisplay;
	params.currentPage = currentPage;
	
	if(params.pages > 10 && params.pages < 41) {
		$('#slideSiteMenuText').removeClass('slideSiteMenuLarge');
		$('#slideSiteMenuText').addClass('slideSiteMenuSmall');
		$('#slideSiteMenuText').removeClass('slideSiteMenuExtraSmall');
	} else if(params.pages > 40) {
		$('#slideSiteMenuText').removeClass('slideSiteMenuLarge');
		$('#slideSiteMenuText').removeClass('slideSiteMenuSmall');
		$('#slideSiteMenuText').addClass('slideSiteMenuExtraSmall');
	} else {
		$('#slideSiteMenuText').removeClass('slideSiteMenuSmall');
		$('#slideSiteMenuText').addClass('slideSiteMenuLarge');
		$('#slideSiteMenuText').removeClass('slideSiteMenuExtraSmall');
	}
	
	if(Math.abs(params.index/params.maxDisplay-Math.floor(params.index/params.maxDisplay)) > 0) {
		
		/*

		console.log('params.index: ' +params.index)	
		console.log('maxDisplay: '+params.maxDisplay)	
		console.log('new Index: '+Math.floor(params.index/params.maxDisplay)*params.maxDisplay)	
		console.log('new hash: '+params.indexURI( parseInt(Math.floor(params.index/params.maxDisplay)*params.maxDisplay)));	

		*/
		
		var tempHash =  '#/'+params.current+'/'+params.indexURI(Math.floor(params.index/params.maxDisplay)*params.maxDisplay);		
		
		if(window.location.hash == tempHash) {

			console.log('BUG - the same hash!');
			positionNested();
		}
		
		window.location.hash = tempHash;
			
	}
	else {
		positionNested();
	}
	
	function positionNested() {
			
	$('#bg').animate({left:-$(window).width()*(currentPage)},{duration:700});
	
	var dots = '';
	for(var g = 0 ; g < pages ; g++) {
		dots+='<font style="font-size:11px"> </font>'
		if(g===currentPage) {
			dots+='<a class="slideSiteNavCurrent" href="#/'+params.current+'/'+params.indexURI(g*params.maxDisplay)+'">.</a>';
		} else {
			if(g===0) {
				console.log(params.indexURI(0));
				dots+='<a class="slideSiteNav" href="#/'+params.current+'/">.</a>';
			} else {
				dots+='<a class="slideSiteNav" href="#/'+params.current+'/'+params.indexURI(g*params.maxDisplay)+'">.</a>';
			}
		}
	}
	
	//$('#slideSiteMenuText').html(dots);	
	$('#slideSiteMenuText').css({'margin-left':($(window).width()-($('#slideSiteMenuText').width()))/2});
	
	if(params.displayArray.length < params.maxDisplay) {
		params.index = 0;
	}
	
	//console.log('=====TOT HIER=======');
	//console.log(params.displayArray);
		
	params.displayArray.forEach(function(obj) {
	
		console.log('JA!');
		
		var iIndex = i-params.index;
	
		var x = Math.floor( iIndex / maxH  )*(params.w+params.marginW)+params.winMarginWidth+widthMarginOver ,
	    	y = iIndex*(params.h+params.marginH) - Math.floor( iIndex / maxH  )*maxH*(params.h+params.marginH)+topMarginOver+params.winMarginTop+params.hSpacing+params.marginH/2-params.padding-params.hubRealH/2;

		var vis,
			hidden;
			
	    	if(x>$(window).width()-(params.w+1)) {
	    		hidden = {
	    			'left': x+params.w*2, 
	    			'top' : y
	    		} 
	    	} else {
	    		hidden = {
	    			'left': x-params.w*2 , 
	    			'top' : y
	    		}
	    	}
	    if( i < maxDisplay+params.index && i > params.index-1 ) {			
	    	vis = {
	    		'left': x , 
	    		'top' : y ,	
	    	}
			if(animate) {
				$(obj).animate(vis,{duration:700});
			} else {
				$(obj).css(vis)
			}   	
	    } else {
			if(animate) {
				$(obj).animate(hidden,{duration:700});
			} else {
				$(obj).css(hidden)
			}			    	
	    }
	    i++;
	});
	}
}







//==============================
