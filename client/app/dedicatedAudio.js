
function createAudioDedicated(obj,i,params) {

	
	var filename = obj.content[i].info.src.split('/');
	filename = filename[filename.length-1];
	

	var aobj = {
					uid : obj.content[i].info.uid,
					src : obj.content[i].info.src,
					name: filename
			   }


	//console.log(params.aplayer)
	params.aplayer.play(aobj)
	
}
	
 
	
	
