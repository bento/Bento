
function createAudioDedicated(obj,i,params) {

	
	var filename = obj.content[i].info.src.split('/');
	filename = filename[filename.length-1];
	
	var aobj = {
				uid : obj.content[i].info.uid,
				src : obj.content[i].info.src,
				name: filename
			   }
			   
	params.aplayer.play(aobj)
	
	if(!params.dedicatedDone[i]) {
		params.dedicatedDone[i] = true;
		
		var w = Number($(window).width()-params.winMarginWidth*2-params.dImgSpacing*2),
			h = Number($(window).height()-params.winMarginTop-params.winMarginBot-params.dImgSpacing*2);		
		
		$('#'+obj.content[i].uid).append('<div id="burr">AUDIOBURRR</div>')	
		
		$('#burr').css({
						width : w,
						height: h,
	    				position:'absolute',
	    				left:Number($(window).width()-w)/2,
	    				top:Number($(window).height()-gParams.winMarginTop-gParams.winMarginBot-h)/2+gParams.winMarginTop												
	    			})
		
		
	}
	
}
	
 
	
	
