function displayCategory(category,params,index,search,convert) {
	
	var custom = params.viewChain,
		customPos = 0,
		showExpression = false,
		nextCustom;
	
	$('<div id="root_category" style:"position:absolute"></div>').appendTo('#root_screens');		
	$('#root_category').css({opacity:0});
	$('#root_category').animate({opacity:1},{duration:200});

	if(!search) {	
		params.currentArray = category.content;
	}else {
		params.currentArray = [];
	}
	
	for (var customObj in params.custom) {
			
	 	if(customObj === category.name) {
	 		if(params.custom[customObj].viewChain) {
	 			console.log('displayCategory custom : '+category.name+' --> ',params.custom[customObj].viewChain);
	 			custom = params.custom[customObj].viewChain;
	 		}
	 	}
	}
		
	customPos = category.name.split('/').length-1;
	
	if(custom.length && customPos > custom.length-1) {
		customPos = custom.length-1;
	}
	
	if(custom.length && customPos < 0) {
		customPos = 0;
	}
	
	if(custom[customPos] && (!custom[customPos].length) ) {	
		custom[customPos] = [ custom[customPos] ];
	}
	
	if(custom[customPos] && custom[customPos].length) {
	
		custom[customPos].forEach(function(cObj) {
			
			if(cObj.view === 'overview') {
								
				if(cObj.show) {
					
					if(showExpression) {
						showExpression += '|'+cObj.show;
					
					} else {
						showExpression = cObj.show;
					}
				
				}
							
				
			} 
			
		});
		
	}
	
	if(custom[customPos+1]) {
		nextCustom = custom[customPos+1];
	}
	
	console.log('expression:: '+showExpression);
					
	category.content.forEach(function(obj) {  
		if(search) {
		    obj.info.children.forEach(function(obj2) {
		    
		    	if((!showExpression) || new RegExp(showExpression).test(obj2.info.type) ) {
		    		params.currentArray.push(obj2);
		    		displayMiniScreen( obj2, params, nextCustom );
		    	}	
		    		
		    });
		} else {
			if((!showExpression) || new RegExp(showExpression).test(obj.info.type) ) {

		    	displayMiniScreen( obj, params, nextCustom );
		    }
		    
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