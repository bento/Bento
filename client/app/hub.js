	//maak een gParams.hubRealHeight  wordt gesubstract van alle plekken waar nodig	 (dedicated - overview)
	//maak een gParams.uiRealTop  	
	//maak een gParams.uiRealLeft 
	//maak een gParams.uiRealRight 


var subArray = [];
	
function closeSubMenu() {

	submenu = ''
	hub = false;
	gParams.hubRealH = 0
	$('#slideSiteHub').animate({  top: $(window).height()-gParams.hubRealH-gParams.winMarginBot },{duration:300});
	position(gParams,true);
	
	
	
	$('#leftArrow').css({
		'top' : ($(window).height()-20-gParams.hubRealH)/2
	});

		
	$('#rightArrow').css({
		'top' : ($(window).height()-20-gParams.hubRealH)/2
	});

}

function openSubMenu(menuStr,array,custom,customInt) {


	if(!customInt) {
		customInt = 0;
	}

	if(menuStr == submenu) {
		closeSubMenu();
	} else {

	if(gParams.hubRealH > 0) {
	    gParams.hubRealH = 0
	    $('#slideSiteHub').animate({  top: $(window).height()-gParams.hubRealH-gParams.winMarginBot },{duration:200});
	    setTimeout(function() {  
	    	 createSubMenu();
	    	 gParams.hubRealH = gParams.hubH;
	    	 $('#slideSiteHub').animate({top:  $(window).height()-gParams.hubRealH-gParams.winMarginBot },{duration:300});  
	    	 position(gParams,true);
			    	  	 
			$('#leftArrow').css({
				'top' : ($(window).height()-20-gParams.hubRealH)/2
			});
		
				
			$('#rightArrow').css({
				'top' : ($(window).height()-20-gParams.hubRealH)/2
			});
	    	 
	    	 
	    }  , 220);
	} else {
		createSubMenu();
	    gParams.hubRealH = gParams.hubH;
	    $('#slideSiteHub').animate({top:  $(window).height()-gParams.hubRealH-gParams.winMarginBot },{duration:300});
	    position(gParams,true);
	    
	    	$('#leftArrow').css({
				'top' : ($(window).height()-20-gParams.hubRealH)/2
			});
		
				
			$('#rightArrow').css({
				'top' : ($(window).height()-20-gParams.hubRealH)/2
			});
	    	 

	    
	}
	
	
	
	
	
	}

	function createSubMenu() {
		
	   submenu = menuStr;
	
	   CSSclass = gParams.CSS;
	
	   $('#slideSiteHubContent').empty().remove();	
	   
	   hub = 'submenu';
	   
       $('<div id="slideSiteHubContent"></div>' ).appendTo($('#slideSiteHub'));
	   
	   var cnt = 0;
	   
	   var i = 0, 	
	   
	   maxH = Math.floor((gParams.hubH)/(gParams.hH+gParams.hMarginH*2)), 
	   maxW = Math.floor(($(window).width())/(gParams.hW+gParams.hMarginW));
	
	   if(maxH === 0) {maxH = 1;}
	   if(maxW === 0) {maxW = 1;}

	   subArray = [];

	   array.forEach(function(obj) {
	   			
	 		 if( (!custom[customInt].show) || custom[customInt].show === 'all' || new RegExp(custom[customInt].show).test(obj.info.type) ) {
	 		 	 	 		 	
	 		 	var x = Math.floor(cnt/maxH)*(gParams.hW+gParams.hMarginW)+gParams.hMarginW,
	 		 		y = cnt*(gParams.hH+gParams.hMarginH) - Math.floor( cnt / maxH  )*maxH*(gParams.hH+gParams.hMarginH)+(gParams.hubH-(gParams.hH+gParams.hMarginH)*maxH)/2;
								
				if(obj.info.type != 'img') {			
	 		 	   $('<div id="'+obj.uid+cnt+'subMenu" class="hubMenuItem'+CSSclass+'"><div id="'+obj.uid+cnt+'nestedSubMenu" class="hubMenuText'+CSSclass+'">'+obj.info.name+'</div></div>' ).appendTo($('#slideSiteHubContent'));
	 		    }
	 		    
	 		    else {   	 
	 			   	$('<div id="'+obj.uid+cnt+'subMenu" class="hubMenuItem'+CSSclass+'">'+'</div>' ).appendTo($('#slideSiteHubContent'));
	 				$('<div id="'+obj.uid+cnt+'img" class="hubMenuImg'+CSSclass+'"><img src="thumb?'+obj.info.src+'&'+gParams.hW+'&'
					+(gParams.hH)+'&true" ></img></div>' ).appendTo($('#'+obj.uid+cnt+'subMenu'));
				}
				
				
				subArray.push({
					name: obj.info.name  ,
					src: obj.info.src ,
					div: $('#'+obj.uid+cnt+'subMenu'),
					y: y
				})
					 		    
	 		    $('#'+obj.uid+cnt+'subMenu').css({
	 		    
	 		    	'height': gParams.hH,
	 		    	'width': gParams.hW,
					'top' : y,
					'left' : x,
					'position' : 'absolute' 
				});

				 $('#'+obj.uid+cnt+'nestedSubMenu').css({
	 		    
	 		    	'height': gParams.hH,
	 		    	'width': gParams.hW,
					
				});

			
		
	 		    $('#'+obj.uid+cnt+'subMenu').click(function() {		 		 
	 		 		viewChainClickHandler(custom[1],menuStr,obj)					
	 		    });
	 		    
	 		    if(cnt === array.length-1) {
					   
	 			    $('#slideSiteHubContent').css({
						'left' : ($(window).width() -(x+gParams.hW+gParams.hMarginW))/2,
						'position' : 'absolute' 
					});
					
				}
			
				cnt++;					

	 		}
	 		
	 	});
	 	
	 
	 if(gParams.dedicatedObj) {
	 	setTimeout(highlighSubMenu,450, gParams.dedicatedObj.content[gParams.dedicatedCurrent].info.src  );
	 } else {
	 	
	 	
	 
	 }	
		   
	}
}

function highlighSubMenu(src) {

		subArray.forEach(function(obj) {
						
				if( gParams.contentDir+'/'+src === obj.src || src === obj.src ) {
				
					obj.div.removeClass('hubMenuCurrent');
					obj.div.removeClass('hubMenuItem');
					obj.div.addClass('hubMenuCurrent');
					
					obj.div.animate({ 'top' :  obj.y + gParams.hCurrentMargin },{duration:200})
							
				} else {
					
					obj.div.removeClass('hubMenuItem');
					obj.div.removeClass('hubMenuCurrent');
					obj.div.addClass('hubMenuItem');
					
					obj.div.animate({ 'top' :  obj.y },{duration:200})

				}	
		});		

}























