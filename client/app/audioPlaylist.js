
function createAudioPlaylist(parentid,audiolist,options) {

	var uid = parentid+'PL',
		cover = 'temp/audio.png',
		showcover,
		imgpad = 5,
		lstpad = 5,
		lsticpad = 10,
		lsticwidth = 24,
		botpad = 20,
		w  = 480,
		h  = 500,
		mcw = 250,
		covw = 0,
		covh = 0,
		listh = audiolist.length*20;
		
	if(options){	
		if(options.w){
			w = options.w
		}
		if(options.h){
			h = options.h
		}
		if(options.cover){
			cover = options.cover
		}
		if(options.mcw){
			mcw = options.mcw
		}
		if(options.p !== undefined){
			p = options.p
		}		
		if(options.showcover !== undefined){
			showcover = options.showcover
		}
	}	
	
	
	
	
	console.log(audiolist)
	// make basic divs	
	$('#'+parentid).append( '<div id="'+uid+'aplholder" class="aplHolder'+gParams.CSS+'">'+
								'<div id="'+uid+'aplcontrolsholder" class="aplControlsHolder'+gParams.CSS+'">'+	
									'<div id="'+uid+'aplcontrols" class="aplControls'+gParams.CSS+'">'+
	    								'<div id="'+uid+'previous" class="audioControls previousIcon'+gParams.CSS+'"></div>'+
	    								'<div id="'+uid+'playresume" class="audioControls playIcon'+gParams.CSS+'"></div>'+
	    								'<div id="'+uid+'next" class="audioControls nextIcon'+gParams.CSS+'"></div>'+
	    								'<div id="'+uid+'volume" class="audioControls volumeFullIcon'+gParams.CSS+'"></div>'+
	    								'<div id="'+uid+'barholder" class="audioBarHolder'+gParams.CSS+'">'+
	    									'<div id="'+uid+'volumebar" class="volumeBar'+gParams.CSS+'"></div>'+
	    									'<div id="'+uid+'volumefill" class="volumeBarFill'+gParams.CSS+'"></div>'+
	    									'<div id="'+uid+'volumeslider" class="volumeSlider volumeSliderNotActive'+gParams.CSS+'"></div>'+
	    									'<div id="'+uid+'volumebarlistener" class="volumeBarListener'+gParams.CSS+'"></div>'+
	    								'</div>'+							
									'</div>'+
								'</div>'+	
								'<div id="'+uid+'aplplaylist" class="aplPlaylist'+gParams.CSS+'"></div>'+
								'<div id="'+uid+'aplmetaicons" class="aplMetaIcons'+gParams.CSS+'"></div>'+
							'</div>'
    						);
	
	
	// make playlist
	var cnt = 1;
	for(n in audiolist){
		$('#'+uid+'aplplaylist').append('<div id="'+uid+'item'+n+'" class="aplListItem'+gParams.CSS+'">'+
											'<div id="'+uid+'item'+n+'playing" class="aplListItemNotPlaying'+gParams.CSS+'">&nbsp;</div>'+
											'<div id="'+uid+'item'+n+'number" class="aplListItemNumber'+gParams.CSS+'">'+cnt+'.</div>'+
											'<div id="'+uid+'item'+n+'name" class="aplListItemName'+gParams.CSS+'">'+audiolist[n].info.name+'</div>'+
											'<div id="'+uid+'item'+n+'favorite" class="aplListItemFavorite'+gParams.CSS+'">&nbsp;</div>'+
											'<div id="'+uid+'item'+n+'download" class="aplListItemDownload'+gParams.CSS+'">&nbsp;</div>'+
											'<div id="'+uid+'item'+n+'playlistener" style="position:absolute;height:21;width:'+(w-lstpad*2-lsticpad-2*lsticwidth)+';top:0px"></div>'+
										'</div>'
										);
		
		// position playlist item divs
		$('#'+uid+'item'+n+'favorite').css({right:lsticpad})
		$('#'+uid+'item'+n+'download').css({right:lsticpad+lsticwidth})
		
		// add playlist item listeners
		$('#'+uid+'item'+n+'playlistener').click(function(){
			gParams.aplayer.activelist = uid;
			gParams.aplayer.play(audiolist[n])
			replaceCClass('#'+uid+'item'+n+'playing', 'aplListItemNotPlaying', 'aplListItemPlaying');
		})
		$('#'+uid+'item'+n+'favorite').click(function(){
			console.log('favorite '+audiolist[n].info.name)
		})
		$('#'+uid+'item'+n+'download').click(function(){
			console.log('download '+audiolist[n].info.name)
		})
		cnt++;
	}
	
	listh = Number($('#'+uid+'aplplaylist').css('height').split('px')[0]) + 2*lstpad
	

	// add control listeners
	
	makeVolSlideListeners(uid)

   	$('#'+uid+'volume').click(function(){
   		gParams.aplayer.muteToggle()
   	})
   	$('#'+uid+'previous').click(function(){
   		if(gParams.aplayer.activelist === uid){
   			gParams.aplayer.playPrevious()
   		}
   	})	
   	$('#'+uid+'next').click(function(){
  		if(gParams.aplayer.activelist === uid){
   			gParams.aplayer.playNext()
   		}
   	})	
	
	$('#'+uid+'playresume').click(function(){
		if(gParams.aplayer.activelist === uid){
			gParams.aplayer.playToggle();
		}else{
			console.log('go active')
			gParams.aplayer.activelist = uid;
			gParams.aplayer.addList(audiolist,true);
		}
	})

	// make cover
	if(showcover === undefined || showcover && w > 300){
		console.log('show cover')

		if(w-250 < 125){
    		covw = w-250;
    	}else{
    		covw = w/3;
    	}
    	
    	if(h-botpad-listh > 40){
    		covh = h-botpad-listh;
    		console.log('extra height>',covh)
    	}else{
    		covh = 40;
    		console.log('super tight!>',covh)
    	}
    	
    	
    	
    	if(covw < covh){
    		covh = covw;
    	}else{
    		covw = covh;
    	}
    	
    	console.log(covw,covh)
    	
    	$('#'+uid+'aplholder').prepend('<div id="'+uid+'aplcover" class="aplCover"><img src="thumb?'+cover+'&'+(covw-imgpad*2)+'&'+(covh-imgpad*2)+'&true" class="aplImg"></div>')
		$('#'+uid+'aplcover').css({left:0,top:0})

	}else{
		console.log('don\'t show cover')
	}
	
	
	// position everything
	$('#'+uid+'aplcontrols').css({width:250, left:covw+((w-covw)/2-125), top: covh/2 - 40/2})
	$('#'+uid+'aplplaylist').css({top:covh, width: w - 2*lstpad})
	$('#'+uid+'aplholder').css({width:w, height:covh+listh+20})
	
	
	var vbw = Number($('#'+uid+'volumebar').css('width').split('px')[0])
	$('#'+uid+'volumeslider').css({left:(vbw-10)*0.75})
	$('#'+uid+'volumefill').css({width:(vbw-10)*0.75+4})
	// add to global playlist list

	gParams.aplayer.playlists.push(uid)	
	gParams.aplayer.volumes.push(uid)
	
}


	
 /*
	$('#'+uid+'adedwindow').css({
    				width : w,
    				height: h,
    				position:'absolute',
    				left:Number($(window).width()-w)/2,
    				top:Number($(window).height()-gParams.winMarginTop-gParams.winMarginBot-h)/2+gParams.winMarginTop												
    			})
*/
		
	
/*
	
'<div id="'+uid+'bla"></div>'+


thumb?'+obj.content[i].info.src+'&'+75+'&'+75+'"


*/



//============================          END OF FOILE!!







