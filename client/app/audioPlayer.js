/*

function createAudioPlayer(parentid) {

	if(params.aplayerloaded === 2) {
    	scriptLoaded();
    } else {					
    	if(params.aplayerloaded === 1){			
    		var intervalID = setInterval(waitfordone, 100);			
    		function waitfordone(){
    			if(params.aplayerloaded !== 1){
    				clearInterval(intervalID);
    				scriptLoaded(parentid);
    			}
    		}			
    	}else{ // vplayerloaded === 0
    		params.aplayerloaded = 1;				
    		$.ajax({
        		url: 'sjaudio/sjaudio.js',
        		context: document.body,
        		success: function(data){  						
    				$('body').append('<script type="text\/javascript">'+data+'<\/script>')
    				params.vplayerloaded = 2;
    				scriptLoaded(parentid);		
    			},
    			error: function(err){
    				console.log(err)
    			}
    		});
    	}
    } 
	
	function scriptLoaded() {
		params.aplayer = new Aplayer()
	}		
}

*/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                