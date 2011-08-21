
function Aplayer(parentid, options){

	this.parentid 	= parentid;
	this.options 	= options;
	this.tracklist 	= [];
	this.playlists  = [];
	this.activelist;
	this.volumes	= ['a'];
	this.listindex  = 0;
	this.controls 	= 'smur';
	this.nowplaying;
	
	
	var aplayer = this;

	var playToggle = this.playToggle;
	
    $('#'+parentid).append( '<div id="aplayercontainer" class="aplayerContainer">'+
								'<audio id="aplayer"></audio>'+
    							'<div id="acontrols" class="acontrols">'+										
    								'<div id="aprevious" class="audioControls previousIcon"></div>'+
    								'<div id="aplayresume" class="audioControls playIcon"></div>'+
    								'<div id="anext" class="audioControls nextIcon"></div>'+
    								'<div id="avolume" class="audioControls volumeFullIcon"></div>'+
    								'<div id="abarholder" class="audioBarHolder">'+
    									'<div id="avolumebar" class="volumeBar"></div>'+
    									'<div id="avolumefill" class="volumeBarFill"></div>'+
    									'<div id="avolumeslider" class="volumeSlider volumeSliderNotActive"></div>'+
    									'<div id="avolumebarlistener" class="volumeBarListener"></div>'+
    								'</div>'+
    							'</div>'+
							'</div>'
							);
							
	this._audio = document.getElementById('aplayer')
	this._audio.volume = 0.75;
	
	var vbw = Number($('#avolumebar').css('width').split('px')[0])
	
	$('#avolumeslidefeeler').css({left:5})
	
   	$('#aplayresume').click(function(){
   		aplayer.playToggle()
   	})   	
   	$('#aprevious').click(function(){
   		aplayer.playPrevious()
   	})   	
   	$('#anext').click(function(){
   		aplayer.playNext()
   	})
   	$('#avolume').click(function(){
   		aplayer.muteToggle()
   	})   	
		
	makeVolSlideListeners('a')		
			
	
	
	// do CSS

	$('#avolumeslider').css({left:(vbw-10)*0.75})
	$('#avolumefill').css({width:(vbw-10)*0.75+4})

}


Aplayer.prototype.play = function(obj) {

			   
	var audio = this._audio,
		tracklist = this.tracklist,
		src = obj.info.src,
		aplayer = this;
		
	
    this.nowplaying = obj;
	
	// start loading mp3
	$('#aplayer').empty()
    $('#aplayer').append('<source src="'+src+'" type="audio/mp3" />')
    
    // show loading icon
    replaceCClass('#aplayresume', 'pauseIcon|playIcon', 'trackLoaderIcon');
   	if(aplayer.activelist){
   		replaceCClass('#'+aplayer.activelist+'playresume', 'pauseIcon|playIcon', 'trackLoaderIcon');
   	}    
    
    // handle loading for play/pause button & autoplay
    audio.addEventListener('canplaythrough',canPlay,false);
    function canPlay(){
    	audio.play();
    	replaceCClass('#aplayresume', 'trackLoaderIcon', 'pauseIcon');
    	if(aplayer.activelist){
    		replaceCClass('#'+aplayer.activelist+'playresume', 'trackLoaderIcon', 'pauseIcon');
    	}
    }

    // add to tracklist if necesarry
    var inplaylist = false;
    for(n in tracklist){
    	if(tracklist[n].info.src === src){
    		inplaylist = true;
    		this.listindex = Number(n);
    		console.log('foundit! new listindex:', this.listindex)
    	}
    }
    
    if(!inplaylist){
    	tracklist.push(obj);
    	this.listindex = tracklist.length-1;
    	//$('#aplaylist').append('<div id="list'+aobj.uid+'" class="listitem">'+aobj.name+'</div>')
    }
     
};


Aplayer.prototype.playToggle = function() {
	var audio = this._audio;
	if (audio.paused){
		replaceCClass('#aplayresume', 'playIcon', 'pauseIcon');
    	if(this.activelist){
    		replaceCClass('#'+this.activelist+'playresume', 'playIcon', 'pauseIcon');
    	}		
    	audio.play();
    }else{
    	replaceCClass('#aplayresume', 'pauseIcon', 'playIcon');
    	if(this.activelist){
    		replaceCClass('#'+this.activelist+'playresume', 'pauseIcon', 'playIcon');
    	}    	
    	audio.pause();
    }    
};

Aplayer.prototype.playPrevious = function() {
	var tracklist = this.tracklist;
	var listindex = this.listindex;
	if(listindex > 0){
		this.play(tracklist[listindex-1])
	}
}

Aplayer.prototype.playNext = function() {
	var tracklist = this.tracklist;
	var listindex = this.listindex;
	if(listindex < tracklist.length-1){
		console.log('play:[',listindex+1, '] from:', tracklist)
		this.play(tracklist[listindex+1])
	}
}

Aplayer.prototype.muteToggle = function() {
	if(this._audio.volume > 0){
		if(this._audio.muted){
			this._audio.muted = false;
		}else{
			this._audio.muted = true;
		}
		this.updateVolumes({mute:true})
	}
}


Aplayer.prototype.addList = function(list, play) {
	for(i=0; i < this.tracklist.length ; i++){
		for(j in list){
			if(this.tracklist[i]){				
				if(this.tracklist[i].info.src === list[j].info.src){
					this.tracklist = this.tracklist.slice(0,i).concat(this.tracklist.slice(i+1));
					i-=1;
				}
			}
		}
	}
	this.tracklist = this.tracklist.concat(list);
	if(play){
		this.play(list[0]);
	}
};

Aplayer.prototype.updateVolumes = function(options){

	var volumes = this.volumes,
		audio = this._audio

	if(options.slide){
		for(n in volumes){
	    	$('#'+volumes[n]+'volumeslider').css({left:options.volumex})
	    	$('#'+volumes[n]+'volumefill').css({width:options.volumex+4})
	    	
	    	var volumeclass = 'volumeFullIcon';
	    	if(audio.volume < 0.75){
	    		volumeclass = 'volumeHalfIcon';
	    		if(audio.volume < 0.4){
	    			volumeclass = 'volumeIcon';
	    			if(this._audio.volume === 0){
	    				volumeclass = 'volumeMuteIcon';
	    			}
	    		}
	    	}
	    	replaceCClass('#'+volumes[n]+'volume', 'volumeMuteIcon|volumeIcon|volumeHalfIcon|volumeFullIcon', volumeclass);			
	    }
	}else if(options.mute){
		if(this._audio.muted){
			for(n in volumes){
				replaceCClass('#'+volumes[n]+'volume', 'volumeIcon|volumeHalfIcon|volumeFullIcon', 'volumeMuteIcon');
			}
		}else{
			for(n in volumes){
				var volumeclass = 'volumeFullIcon';
				if(this._audio.volume < 0.75){
					volumeclass = 'volumeHalfIcon';
					if(this._audio.volume < 0.4){
						volumeclass = 'volumeIcon';
					}
				}		
				replaceCClass('#'+volumes[n]+'volume', 'volumeMuteIcon', volumeclass);
			}
		}		
	}
	
	
	

}

Aplayer.prototype.updatePlaylists = function(options){

	var playlists = this.playlists,
		audio = this._audio


}

function makeVolSlideListeners(uid){
	var vbw = Number($('#'+uid+'volumebar').css('width').split('px')[0])
   	$('#'+uid+'volumebarlistener').mousedown(function(e) {
   		replaceCClass('#'+uid+'volumeslider', 'volumeSliderNotActive', 'volumeSliderActive');	
   		$(window).mouseup(function(){
   			$(window).unbind('mouseup')
   			$(window).unbind('mousemove')
   			replaceCClass('#'+uid+'volumeslider', 'volumeSliderActive', 'volumeSliderNotActive');	
   		})
		volumeSlide(e)		
		$(window).mousemove(function(e){
			volumeSlide(e)
		});		
	});
	function volumeSlide(e){
		if(gParams.aplayer._audio.muted){
			gParams.aplayer._audio.muted = false;
		}		
		var x = e.pageX - ($('#'+uid+'volumebar').offset().left+5);
		var mx = vbw
		var perc = x/(vbw-10)
		if(x<0){
			x=0;
			perc = 0;
		}
		if(x>(vbw-10)){
			x=(vbw-10);
			perc=1;
		}		
		gParams.aplayer._audio.volume = perc		
		gParams.aplayer.updateVolumes({volumex:x,slide:true})
	}	
}



/* ============== END OF FILE ============== */


