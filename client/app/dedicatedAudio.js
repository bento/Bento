
function createAudioDedicated(obj,i,params) {		   
	
/*
	var uid = obj.content[i].info.uid,
		src = obj.content[i].info.src,
		filename= obj.content[i].info.src.split('/');
		
	filename = filename[filename.length-1];
	
	var aobj = {
				uid : uid,
				src : src,
				name: filename
			   }
			   
*/
	
	params.aplayer.play(obj.content[i])
	
	var red = obj.content[i].info.src.split('/').slice(1,this.length-1).join('/'),
		parent = red.split('/').slice(0,this.length-1).join('/');
	
	if(params.current == parent && params.dedicated == true) {
		params.dedicatedHashInterperter(red);
	} else {
		params.setCustomParams(parent);	
		params.dedicated = true;						  														  							  		
		params.gotoDedicated(parent, red);	  					      
	}	
}
	




//============================          END OF FOILE!!