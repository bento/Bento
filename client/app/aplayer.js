
function Aplayer(parentid, options){

	this.parentid 	= parentid;
	this.options 	= options;
	this.tracklist 	= [];
	this.listindex  = 0;
	this.controls 	= 'smur';
	this.nowplaying = 'none';
	
	var aplayer = this;

	var playToggle = this.playToggle;
	
    $('#'+parentid).append( '<div id="aplayerholder" class="aholder">'+
	    						'<div id="aplayerdiv" class="aplayer" style="display:none">'+
									'<audio id="aplayer" controls></audio>'+
									'<div id="acontrols" class="acontrols">'+
										'<div id="aplayresume" class="controlitem"></div>'+
										'<div id="aprevious" class="controlitem aprevious"></div>'+
										'<div id="anext" class="controlitem anext"></div>'+
										'<div id="avolume" class="controlitem avolume"></div>'+
									'</div>'+
									'<div id="aplaylist" class="aplaylist">Playlist</div>'+
								'</div>'+
							'</div>'
							);
							
	this._audio = document.getElementById('aplayer')
	
	// fix positioning
	$('#aplayerdiv').css({'display':'block'})
	
	var apw = Number($('#aplayerholder').css('width').split('px')[0])
	console.log(apw,$('#aplayerholder').css('width'))
	$('#aplayerholder').css({'left':Number($(window).width())/2 - apw/2})
	
	// set listeners on controls
   	$('#aplayresume').click(function(){
   		aplayer.playToggle()
   	})   	
   	$('#aprevious').click(function(){
   		aplayer.playPrevious()
   	})   	
   	$('#anext').click(function(){
   		aplayer.playNext()
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
    setLastClass('#aplayresume', 'aloading');
    
    // handle loading for play/pause button & autoplay
    audio.addEventListener('canplaythrough',canPlay,false);
    function canPlay(){
    	audio.play();
    	setLastClass('#aplayresume', 'aplaying');
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
    	$('#aplaylist').append('<div id="list'+aobj.uid+'" class="listitem">'+aobj.name+'</div>')
    }
    
    
    

    
};


Aplayer.prototype.playToggle = function() {
	var audio = this._audio;
	if (audio.paused){
		setLastClass('#aplayresume', 'aplaying');
    	audio.play();
    }else{
    	setLastClass('#aplayresume', 'apausing');
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

Aplayer.prototype.addList = function(list, play) {

	
	
};



function setLastClass(divid, newclass){
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


