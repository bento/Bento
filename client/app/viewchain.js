function viewChainClickHandler(viewChain,parent,obj) {	

	var typeExclusion = false;

	if(!viewChain) {
	 		viewChain = {};
	 	} else if(viewChain && (!viewChain.length) ) {
	 		viewChain = [viewChain];
	 	}
	 	
	 	if(viewChain.length) {
	 	
	 		 	viewChain.forEach(function(objnested) {
		    if(objnested.when) {
		    	if(typeExclusion) {
		    		typeExclusion+='|'+objnested.when;
		    	} else {
		    		typeExclusion=objnested.when;
		    	}
		    }
		});


		}
	 	
	 	console.log('if not: '+typeExclusion+' default (goto Dedicated)');
	 			
	 	if(viewChain.length) {
	 	
	 	    	viewChain.forEach(function(objnested) {
		 	    	
	 	    		if( (!objnested.when) || new RegExp(objnested.when).test(obj.info.type) ) {			 										
	        			if(objnested.context === 'parent') {
	        				if(objnested.view === 'overview') {
	        					window.location.hash = '#/'+parent+'/'+obj.uri;
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
	 	    		} else if(    (!new RegExp(typeExclusion).test(obj.info.type)) || typeExclusion === '') {
	 	    			window.location.hash = '#/p/'+obj.info.src.replace(new RegExp( '^'+gParams.contentDir+'/' ) , ''  );
	 	    		}
	 	    	});		 					 	    
	    } else {
	 		window.location.hash = '#/p/'+obj.info.src.replace(new RegExp( '^'+gParams.contentDir+'/' ) , ''  );
	 	}
		
}



