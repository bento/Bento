function displayCategory(category,params,index,search,convert) {
	
	$('<div id="root_category" style:"position:absolute"></div>').appendTo('#root_screens');		
	
	$('#root_category').css({opacity:0});
	
	$('#root_category').animate({opacity:1},{duration:200});

	if(!search) {	
		params.currentArray = category.content;
	}else {
		
		params.currentArray = [];
	
	}
		
	category.content.forEach(function(obj) {  

		if(search) {
		    	
		    obj.info.children.forEach(function(obj2) {
		    	
		    	params.currentArray.push(obj2);
		    	
		    	displayMiniScreen( obj2, params );
		    
		    });
	
		} else {
		    displayMiniScreen( obj, params );
		}				
	});
	
	
	if(convert) {
	
		console.log('try to convert this index: '+index)
				console.log('URI : '+ params.URIindex(index))

		params.index = params.URIindex(index);
	} else {
		
		if(index) {
		params.index = Number(index);
 	 	} else {
		params.index = 0;
	 	}
	
	}
		
	position(params);

}