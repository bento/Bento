
function Aplayer(parentid, options){

	this.parentid 	= parentid;
	this.options 	= options;
	this.tracklist 	= [];
	this.listindex  = 0;
	this.controls 	= 'smur';
	this.nowplaying = 'none';
	
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
    									'<div id="avolumeslider" class="volumeSlider"></div>'+
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
   	$('#avolumebarlistener').mousedown(function(e) {
   	
   		setCClass('#avolumeslider', 'volumeSliderActive');	
   		$(window).mouseup(function(){
   			$(window).unbind('mouseup')
   			$(window).unbind('mousemove')
   			setCClass('#avolumeslider', 'volumeSlider');	
   		})
   		
		volumeSlide(e)		
	
		$(window).mousemove(function(e){
			volumeSlide(e)
		});		
	});
			
	function volumeSlide(e){

		if(aplayer._audio.muted){
			aplayer._audio.muted = false;
		}
		
		var x = e.pageX - ($('#avolumebar').offset().left+5);
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
		
		
		aplayer._audio.volume = perc
		$('#avolumeslider').css({left:x})
		$('#avolumefill').css({width:x})
		var volumeclass = 'volumeFullIcon';
		if(perc < 0.8){
			volumeclass = 'volumeHalfIcon';
			if(perc < 0.4){
				volumeclass = 'volumeIcon';
				if(perc === 0){
					volumeclass = 'volumeMuteIcon';
				}
			}
			
		}
		setCClass('#avolume', volumeclass);	
	}		
		
			

	// do CSS

	$('#avolumeslider').css({left:(vbw-10)*0.75})
	$('#avolumefill').css({width:(vbw-10)*0.75})

}


Aplayer.prototype.play = function(aobj) {

	var audio = this._audio;
	var tracklist = this.tracklist;
	
    console.log('PLAY:',aobj)
	
	// start loading mp3
	$('#aplayer').empty()
    $('#aplayer').append('<source src="'+aobj.src+'" type="audio/mp3" />')
    
    // show loading icon
    setCClass('#aplayresume', 'trackLoaderIcon');
    
    // handle loading for play/pause button & autoplay
    audio.addEventListener('canplaythrough',canPlay,false);
    function canPlay(){
    	audio.play();
    	setCClass('#aplayresume', 'pauseIcon');
    }

    // add to tracklist if necesarry
    var inplaylist = false;
    for(n in tracklist){
    	if(tracklist[n].src === aobj.src){
    		inplaylist = true;
    		this.listindex = Number(n);
    		console.log('foundit! new listindex:', this.listindex)
    	}
    }
    
    if(!inplaylist){
    	tracklist.push(aobj);
    	this.listindex = tracklist.length-1;
    	//$('#aplaylist').append('<div id="list'+aobj.uid+'" class="listitem">'+aobj.name+'</div>')
    }
    
    
    

    
};


Aplayer.prototype.playToggle = function() {
	var audio = this._audio;
	if (audio.paused){
		setCClass('#aplayresume', 'pauseIcon');
    	audio.play();
    }else{
    	setCClass('#aplayresume', 'playIcon');
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
			var volumeclass = 'volumeFullIcon';
			if(this._audio.volume < 0.8){
				volumeclass = 'volumeHalfIcon';
				if(this._audio.volume < 0.4){
					volumeclass = 'volumeIcon';
				}
			}		
			this._audio.muted = false;
			setCClass('#avolume', volumeclass);
		}else{
			this._audio.muted = true;
			setCClass('#avolume', 'volumeMuteIcon');
		}
	}
}




Aplayer.prototype.addList = function(list, play) {

	
	
};

function setCClass(divid, newclass){
	$(divid).removeClass(function() {
		var cssclasses = $(this).attr('class').split(' ');
		if(cssclasses.length > 1){
			return cssclasses[cssclasses.length-1];
		}else{
			return null;
		}
	});
	$(divid).addClass(newclass);
}





/* ============== END OF FILE ============== */


