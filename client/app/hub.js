	//maak een gParams.hubRealHeight  wordt gesubstract van alle plekken waar nodig	 (dedicated - overview)
	//maak een gParams.uiRealTop  	
	//maak een gParams.uiRealLeft 
	//maak een gParams.uiRealRight 


function closeSubMenu() {

	submenu = ''
	hub = false;


	gParams.hubRealH = 0
	$('#slideSiteHub').animate({  top: $(window).height()-gParams.hubRealH-gParams.winMarginBot },{duration:200});
	position(gParams,true);

}

function openSubMenu(menuStr,array,custom) {

	if(menuStr == submenu) {
	
		gParams.hubRealH = 0
	    $('#slideSiteHub').animate({  top: $(window).height()-gParams.hubRealH-gParams.winMarginBot },{duration:200});
		submenu = ''
		hub = false;
	
	} else {

	//gParams.submenu = menuStr; 
	if(gParams.hubRealH > 0) {
	    gParams.hubRealH = 0
	    $('#slideSiteHub').animate({  top: $(window).height()-gParams.hubRealH-gParams.winMarginBot },{duration:200});
	    setTimeout(function() {  
	    	 createSubMenu();
	    	 gParams.hubRealH = gParams.hubH;
	    	 $('#slideSiteHub').animate({top:  $(window).height()-gParams.hubRealH-gParams.winMarginBot },{duration:300});  
	    	 position(gParams,true);

	    }  , 220);
	} else {
		createSubMenu();
	    gParams.hubRealH = gParams.hubH;
	    $('#slideSiteHub').animate({top:  $(window).height()-gParams.hubRealH-gParams.winMarginBot },{duration:300});
	    position(gParams,true);
	}
	
	}

	function createSubMenu() {
		
	   submenu = menuStr;
	
	   $('#slideSiteHubContent').empty().remove();	
	   
	   hub = 'submenu';
	   
       $('<div id="slideSiteHubContent"></div>' ).appendTo($('#slideSiteHub'));
	   
	   /*
	   [
	    			{   
	    				when: 'folder', 
	    				view: 'overview' ,
	    				context: 'self' 	    			
	    			}
	    		,
	    			{
	    				when: 'img',
	    				view: 'dedicated',
	    				context: 'parent',
	    				show: 'img'
	    			}
	    		]		
	   */ 		
	   var cnt = 0;
	   
	   array.forEach(function(obj) {
	   
	   cnt++;					
	   
	   if(custom[0].show) { 
	   
			if( new RegExp(custom[0].show).test(obj.info.type) ) {
			
					$('<div id="'+obj.uid+cnt+'subMenu" class="menuItem">'+obj.info.name+'</div>' ).appendTo($('#slideSiteHubContent'));
					
		 			$('#'+obj.uid+cnt+'subMenu').click(function() {
		 				
		 				if(!custom[1]) {
		 			
		 					custom[1] = {};
		 		
		 				} 			 
		 				 			 
		 				 			 
		 				if(custom[1].when || custom[1].length ) {
		 					if(custom[1].length) {
		 						custom[1].forEach(function(objnested) {
		 							if( new RegExp(objnested.when).test(obj.info.type) ) {			 																
										if(objnested.context == 'parent') {
											if(objnested.view === 'overview') {
												window.location.hash = '#/'+menuStr+'/'+obj.uri;
											} else {
												window.location.hash = '#/p/'+obj.info.src.replace(new RegExp( '^'+gParams.contentDir+'/' ) , ''  );
											}
										} else {
											if(objnested.view === 'overview') {
												window.location.hash = '#/'+obj.info.src.replace(new RegExp( '^'+gParams.contentDir+'/' ) , ''  )+'/';
											} else {
												window.location.hash = '#/p/'+obj.info.src.replace(new RegExp( '^'+gParams.contentDir+'/' ) , ''  )+'/';
											}
										}
		 							}
		 						});		 					
		 					} else {
		 						if( new RegExp(objnested.when).test(obj.info.type) ) {			 																
										if(objnested.context == 'parent') {
											if(objnested.view === 'overview') {
												window.location.hash = '#/'+menuStr+'/'+obj.uri;
											} else {
												window.location.hash = '#/p/'+obj.info.src.replace(new RegExp( '^'+gParams.contentDir+'/' ) , ''  );
											}
										} else {
											if(objnested.view === 'overview') {
												window.location.hash = '#/'+obj.info.src.replace(new RegExp( '^'+gParams.contentDir+'/' ) , ''  )+'/';
											} else {
												window.location.hash = '#/p/'+obj.info.src.replace(new RegExp( '^'+gParams.contentDir+'/' ) , ''  )+'/';
											}
										}
		 						} 
		 					}	
		 					
			 			} else {
							window.location.hash = '#/p/'+obj.info.src.replace(new RegExp( '^'+gParams.contentDir+'/' ) , ''  );
						}	
					});
			}
			
		} else {	
			
			$('<div id="'+obj.uid+cnt+'subMenu" class="menuItem">'+obj.info.name+'</div>' ).appendTo($('#slideSiteHubContent'));
		 
		 	$('#'+obj.uid+cnt+'subMenu').click(function() {
		 	
		 		if(!custom[1]) {
		 			
		 			custom[1] = {};
		 		
		 		}
		 	
		 			
	 				if(custom[1].when || custom[1].length ) {
		 					if(custom[1].length) {
		 						custom[1].forEach(function(objnested) {
		 							if( new RegExp(objnested.when).test(obj.info.type) ) {			 																
										if(objnested.context == 'parent') {
											if(objnested.view === 'overview') {
												window.location.hash = '#/'+menuStr+'/'+obj.uri;
											} else {
												window.location.hash = '#/p/'+obj.info.src.replace(new RegExp( '^'+gParams.contentDir+'/' ) , ''  );
											}
										} else {
											if(objnested.view === 'overview') {
												window.location.hash = '#/'+obj.info.src.replace(new RegExp( '^'+gParams.contentDir+'/' ) , ''  )+'/';
											} else {
												window.location.hash = '#/p/'+obj.info.src.replace(new RegExp( '^'+gParams.contentDir+'/' ) , ''  )+'/';
											}
										}
		 							}
		 						});		 					
		 					} else {
		 						if( new RegExp(objnested.when).test(obj.info.type) ) {			 																
										if(objnested.context == 'parent') {
											if(objnested.view === 'overview') {
												window.location.hash = '#/'+menuStr+'/'+obj.uri;
											} else {
												window.location.hash = '#/p/'+obj.info.src.replace(new RegExp( '^'+gParams.contentDir+'/' ) , ''  );
											}
										} else {
											if(objnested.view === 'overview') {
												window.location.hash = '#/'+obj.info.src.replace(new RegExp( '^'+gParams.contentDir+'/' ) , ''  )+'/';
											} else {
												window.location.hash = '#/p/'+obj.info.src.replace(new RegExp( '^'+gParams.contentDir+'/' ) , ''  )+'/';
											}
										}
		 						} 
		 					}	
		 					
			 			}		 		
		 		
		 		 else {
					window.location.hash = '#/p/'+obj.info.src.replace(new RegExp( '^'+gParams.contentDir+'/' ) , ''  );
				}	
		 	});
 	 	
 	 	} 

	 });
		   
	}
}

























