
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
    									'<div id="avolumeslider" class="volumeSlider"></div>'+
    								'</div>'+
    							'</div>'+
							'</div>'
							);
							
	this._audio = document.getElementById('aplayer')
	
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
	var volumeclass = 'volumeFullIcon';
	if(this._audio.volume < 0.8){
		volumeclass = 'volumeHalfIcon';
		if(this._audio.volume < 0.4){
			volumeclass = 'volumeIcon';
		}
	}
	if(this._audio.muted){
		this._audio.muted = false;
		setCClass('#avolume', volumeclass);
	}else{
		this._audio.muted = true;
		setCClass('#avolume', 'volumeMuteIcon');
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


