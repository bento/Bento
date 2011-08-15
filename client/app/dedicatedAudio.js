
function createAudioDedicated(obj,i,params) {

	
	if(!params.dedicatedDone[i]) {
		params.dedicatedDone[i] = true;
		$('<div id="'+obj.content[i].uid+'loader"><img src="client/img/loaderblack.gif"></img></div>').appendTo($('#'+obj.content[i].uid));			
		$('#'+obj.content[i].uid+'loader').css({
		    position:'absolute',
		    left:Number($(window).width()-20)/2,
		    top:Number($(window).height()-params.winMarginTop-gParams.winMarginBot-40)/2+params.winMarginTop
		});
		
		scriptLoaded();
					
		
		 
	}
	
	function scriptLoaded() {
	
		console.log(obj.content[i].info.src)
		
		
	
		$('#'+obj.content[i].uid+'loader').empty().remove();
		

	
		var w = Number($(window).width()-params.winMarginWidth*2-params.dImgSpacing*2),
			h = Number($(window).height()-params.winMarginTop-params.winMarginBot-params.dImgSpacing*2);
		
		
		
		
		
		if(testAudio()){

			$('#'+obj.content[i].uid).append('<div id="'+obj.content[i].uid+'audiv"></div>')

			makeAudio(obj.content[i].uid+'audiv',obj.content[i].uid, obj.content[i].info.src)
			
			$('#'+obj.content[i].uid+'audiv').css({ width : w,
													height: h,
													position:'absolute',
													left:Number($(window).width()-w)/2,
													top:Number($(window).height()-gParams.winMarginTop-gParams.winMarginBot-h)/2+gParams.winMarginTop
												  });
			var aw = 400,
				ah = 50;
												  
			$('#'+obj.content[i].uid+'aplayer').css({
													width: aw,
													height: ah,
													top : Number($(window).height()-gParams.winMarginTop-gParams.winMarginBot-h)/2+gParams.winMarginTop + (h/2)-(ah/2), 
													left: Number($(window).width()-w)/2+(w/2)-(aw/2)})									  
												  
		}else{
			console.log('type not supported:', obj.content[i].info.src)
			$('#'+obj.content[i].uid+'loader').empty().remove();
			$('#'+obj.content[i].uid).append('<div id="'+obj.content[i].uid+'error" class="dedicatedMediaError" style="position:absolute"><img src="jplayer/oops.png" width="100" height ="100"><br>time for flash!</div>');
			var ew = $('#'+obj.content[i].uid+'error').css('width').split('px')[0],
				eh = $('#'+obj.content[i].uid+'error').css('height').split('px')[0];				
			$('#'+obj.content[i].uid+'error').css({top : Number($(window).height()-gParams.winMarginTop-gParams.winMarginBot-h)/2+gParams.winMarginTop + (h/2)-(eh/2), left: Number($(window).width()-w)/2+(w/2)-(ew/2)})
		}									  
	}		
}
	
 
	
	
function testAudio(){
	return true;
}

function makeAudio(parentID, uid, src){

	if(typeof(src) === 'string'){
		$('#'+parentID).append(	'<div id="'+uid+'aloader"><img src="client/img/loaderblack.gif"></img></div>'+
								'<div id="'+uid+'aplayer" class="aplayer" style="display:none">'+
									'<audio controls="controls" onloadedmetadata="audioLoaded('+uid+')">'+
										'<source src="'+src+'" type="audio/mp3"/>'+
									'</audio>'+
								'</div>');
	}

}

function audioLoaded(uid){
	$('#'+uid+'aloader').empty().remove();
	$('#'+uid+'aplayer').css({display:'block'})
}            