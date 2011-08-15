
function createVideoDedicated(obj,i,params,type) {

	if(!params.dedicatedDone[i]) {
		params.dedicatedDone[i] = true;
		$('<div id="'+obj.content[i].uid+'loader"><img src="client/img/loaderblack.gif"></img></div>').appendTo($('#'+obj.content[i].uid));			
		$('#'+obj.content[i].uid+'loader').css({
		    position:'absolute',
		    left:Number($(window).width()-20)/2,
		    top:Number($(window).height()-params.winMarginTop-gParams.winMarginBot-40)/2+params.winMarginTop
		});		
		if(params.vplayerloaded === 2) {
			scriptLoaded();
		} else {					
			if(params.vplayerloaded === 1){			
				var intervalID = setInterval(waitfordone, 100);			
				function waitfordone(){
					if(params.vplayerloaded !== 1){
						clearInterval(intervalID);
						scriptLoaded();
					}
				}			
			}else{ // vplayerloaded === 0
				params.vplayerloaded = 1;				
				$.ajax({
		    		url: 'videojs/video.js',
		    		context: document.body,
		    		success: function(data){  						
						$('body').append('<script type="text\/javascript">'+data+'<\/script>')						
						params.vplayerloaded = 2;						
						scriptLoaded();					
					},
					error: function(err){
						console.log(err)
					}
				});				
			}
		} 
	}
	
	function scriptLoaded() {
	
		// ----------------------  <MAKE TEST DATA
		console.log(obj.content[i].info.src)
		
		switch(obj.content[i].info.src){
			case 'content/ale/0wat.m4v':
				obj.content[i].info.codec = 'video/mp4; codecs="avc1.42E01E"'
			break;
			case 'content/ale/movietaimb.mp4':
				obj.content[i].info.codec = 'video/mp4; codecs="avc1.42E01E"'
			break;
			case 'content/ale/oceansclip.mp4':
				obj.content[i].info.codec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
			break;						
			case 'content/ale/movie.m4v':
				obj.content[i].info.codec = 'video/mp4; codecs="mp4v.20.8"'
			break;			
			case 'content/ale/crapmovs/27924 herwonnen vaart 1946.m4v':
				obj.content[i].info.codec = 'wuuurrd'
			break;			
		}
	
	
		// ----------------------  />
	
		/* CODECS
		
			MPEG-4 Visual: 	'video/mp4; codecs="mp4v.20.8"'
			H.264 Baseline:	'video/mp4; codecs="avc1.42E01E"'
			Ogg Theora:		'video/ogg; codecs="theora"'
			WebM:			'video/webm; codecs="vp8"'

		*/

	
		var w = Number($(window).width()-params.winMarginWidth*2-params.dImgSpacing*2),
			h = Number($(window).height()-params.winMarginTop-params.winMarginBot-params.dImgSpacing*2);
		
		console.log(obj.content[i].info.codec, testCodec(obj.content[i].info.codec));
		
		if(testCodec(obj.content[i].info.codec) === 'probably'){

			$('#'+obj.content[i].uid).append('<div id="'+obj.content[i].uid+'vidiv" class="dVideo'+ params.CSS +'" style="display:none">'+
											   '<div id="'+obj.content[i].uid+'box" class="video-js-box tube-css">'+
											    //<!-- Using the Video for Everybody Embed Code http://camendesign.com/code/video_for_everybody --> 
											    '<video id="'+obj.content[i].uid+'video" class="video-js" width="640" height="264" controls="controls" preload="auto"'+
											    ' onloadedmetadata="vidLoaded('+obj.content[i].uid+', this.videoWidth, this.videoHeight,'+w+','+h+');" onerror="console.log(\'viderr:\',event)">'+ 
											      '<source src="'+obj.content[i].info.src+'" type=\''+obj.content[i].info.codec+'\' />'+
											      //<!-- Flash Fallback. Use any flash video player here. Make sure to keep the vjs-flash-fallback class. --> 
											      '<object id="flash_fallback_1" class="vjs-flash-fallback" width="640" height="264" type="application/x-shockwave-flash" data="http://releases.flowplayer.org/swf/flowplayer-3.2.1.swf">'+ 
											        '<param name="movie" value="http://releases.flowplayer.org/swf/flowplayer-3.2.1.swf" />'+ 
											        '<param name="allowfullscreen" value="true" />'+ 
											        '<param name="flashvars" value=\'config={"playlist":["http://video-js.zencoder.com/oceans-clip.png", {"url": "'+obj.content[i].info.src+'","autoPlay":false,"autoBuffering":true}]}\' />'+ 
											        //<!-- Image Fallback. Typically the same as the poster image. --> 
											      '</object>'+ 
											    '</video>'+ 
											  '</div>'+								
											'</div>');

			$('#'+obj.content[i].uid+'vidiv').css({ width : w,
													height: h,
													position:'absolute',
													left:Number($(window).width()-w)/2,
													top:Number($(window).height()-gParams.winMarginTop-gParams.winMarginBot-h)/2+gParams.winMarginTop												
												  });
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
	
	
	
function vidLoaded(id,wv,hv,wb,hb){
	var wn = (hb/hv)*wv
	if(wn <= wb){
		$('#'+id+'video').css({width:wn, height:hb})
		$('#'+id+'box').css({left: (wb/2)-(wn/2)})
	}else{
		var hn = (wb/wv)*hv
		$('#'+id+'video').css({width:wb, height:hn})
		$('#'+id+'box').css({top: (hb/2)-(hn/2)})
	}
	$('#'+id+'loader').empty().remove();
	$('#'+id+'vidiv').css({display:'block'})
	//var myPlayer = VideoJS.setup(id+'video');
}

		
function testCodec(type){
	var testvidel = document.createElement('video'),
		canplay = testvidel.canPlayType(type);
	return canplay;
}		
	   
	
	
