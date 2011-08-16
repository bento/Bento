	//maak een params.hubRealHeight  wordt gesubstract van alle plekken waar nadoig (dedicated - overview)
	//maak een params.uiRealTop  	
	//maak een params.uiRealLeft 
	//maak een params.uiRealRight 

function openSubMenu(menuStr,array,params) {

	//params.submenu = menuStr; 
	
	if(params.hubRealH > 0) {
	    params.hubRealH = 0
	    $('#slideSiteHub').animate({  top: $(window).height()-params.hubRealH-params.winMarginBot },{duration:400});
	    setTimeout(function() {  
	    	 createSubMenu();
	    	 params.hubRealH = params.hubH;
	    	 $('#slideSiteHub').animate({top:  $(window).height()-params.hubRealH-params.winMarginBot },{duration:400});  
	    }  , 420)
	    position(params,true);
	} else {
	    params.hubRealH = params.hubH;
	    $('#slideSiteHub').animate({top:  $(window).height()-params.hubRealH-params.winMarginBot },{duration:400});
	    position(params,true);
	}

	function createSubMenu() {
	   $('#slideSiteHubContent').empty().remove();	
	   
       $('<div id="slideSiteHubContent"></div>' ).appendTo($('#slideSiteHub'));
	   
	   array.forEach(function(obj) {
	   
	   			alert('bbb');
	   
	   
	   });
	   
	   
	   
	   
	}


}