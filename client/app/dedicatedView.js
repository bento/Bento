function dedicatedView(obj,index,params) {

	// resize positioning 
	var CSSclass = params.css;
	if(CSSclass == ' ') {
		CSSclass = '';
	} else {
		CSSclass = ' '+CSSclass;
	}	
	params.CSS = CSSclass;
	
	console.log('DEDICATION index: '+index + ' array length:'+obj.content.length)
		
	//first init ALL backgrounds --> delay the loading!	
	// use resizing for images based on window . width - margin *2 
	// make new option in img uri crop - in name and in service!

	$('<div id="root_category" style:"position:absolute"></div>').appendTo('#root_screens');	
	
	$('<div id="dHolder"></div>').appendTo($('#root_category'))

	$('<div id="dCloseBtn" class="icon close"></div>').appendTo($('#root_category'))
	
	$('#dCloseBtn').css({
		left: $(window).width()-50,
		position:'fixed',
		top: params.winMarginTop+20
	});
	
	$('#dHolder').css({
		opacity:0,
		left: -index*$(window).width(),
		position:'absolute'
	});
	
	params.dedicatedDone = [];
	params.dedicatedObj = obj;
	params.dedicatedCurrent = index;
	params.dXpos = [0];
	params.dedicatedPages = [];
	params.dedicatedCurrentPage = 0;
	
	for(var i = 0 ; i < obj.content.length ; i ++ ) {		
	    
	   	$('<div id="'+obj.content[i].uid+'" ></div>' ).appendTo($('#dHolder'));
		
	    params.dXpos[i+1] = params.dXpos[i]+$(window).width();
		params.dedicatedPages[i] = 1; 

		$('#'+obj.content[i].uid).css({
	       width:$(window).width(),
	       height:$(window).height(),
	       top:0,
	       left:params.dXpos[i],
	       position:'absolute'
	    });
	    
		//type checks
	    if(obj.content[i].info.type == 'img') {
	    	createImageBG(i);
	    	if(i === index) { createImageDedicated(obj,i,params); }
	    } else if(obj.content[i].info.type == 'txt') {
	    	createTextBG(i);
	    	if(i === index) { createTextDedicated(obj,i,params); }
	    } else if(obj.content[i].info.type == 'folder') {
			createCollectionBG(i);
			if(i === index) { createCollectionDedicated(obj,i,params); }
		} else if(obj.content[i].info.type == 'vid' || obj.content[i].info.type == 'mov') {
			createVideoBG(i);
			if(i === index) { createVideoDedicated(obj,i,params,obj.content[i].info.type); }
		} else if(obj.content[i].info.type == 'audio') {
			createAudioBG(i);
			if(i === index) { createAudioDedicated(obj,i,params); }
		}
		   	      	       
	}
	
	//==============================================================    
	//Events
	
	$('#dCloseBtn').click(function() {
		closeDedicated(params);
	});
	
	//==============================================================    
	//done
	
	$('#dHolder').animate({opacity:1 },{duration:200});
	   
	//==============================================================    
	//bg functions
	function createImageBG(i) {
	    $('#'+obj.content[i].uid).addClass("dedicatedImgBg"+params.CSS);     
	}
	
	function createTextBG(i) {
	    $('#'+obj.content[i].uid).addClass("dedicatedTextBg"+params.CSS);    
	}

	function createCollectionBG(i) {
	    $('#'+obj.content[i].uid).addClass("dedicatedCollectionBg"+params.CSS);    
	}
	
	function createVideoBG(i) {
	    $('#'+obj.content[i].uid).addClass("dedicatedVideoBg"+params.CSS);    
	} 
	function createAudioBG(i) {
	    $('#'+obj.content[i].uid).addClass("dedicatedAudioBg"+params.CSS);    
	}
	
}

//content functions

//===========IMAGE===============================
function createImageDedicated(obj,i,params) {

	if(!params.dedicatedDone[i]) {

		var w = Number($(window).width()-params.winMarginWidth*2-params.dImgSpacing*2),
			h = Number($(window).height()-params.winMarginTop-params.winMarginBot-params.dImgSpacing*2-params.hubRealH)
		
			$('<div id="'+obj.content[i].uid+'loader"><img src="client/img/ajax-loader-dark.gif"></img></div>').appendTo($('#'+obj.content[i].uid));

			$('#'+obj.content[i].uid+'loader').css({
			position:'absolute',
			left:Number($(window).width()-20)/2,
			top:Number($(window).height()-params.winMarginTop-gParams.winMarginBot-40-params.hubRealH)/2+params.winMarginTop
		});

			$('<img id="'+obj.content[i].uid+'imgPre" class="dedicatedImg '+params.CSS+'" src="thumb?'+obj.content[i].info.src+'&'+
		75+'&'+75+'" onload="thumbDoneImg(\''+obj.content[i].uid+'imgPre\',\''+obj.content[i].uid+'loader\');"></img>' ).appendTo($('#'+obj.content[i].uid));		
		
		$('<img id="'+obj.content[i].uid+'img" class="dedicatedImg '+params.CSS+'" src="thumb?'+
		obj.content[i].info.src+'&'+w+'&'+h
		+'" onload="posImg(this,\''+obj.content[i].uid+'imgPre\',\''+obj.content[i].uid+'loader\');"></img>' ).appendTo($('#'+obj.content[i].uid));	
		
			$('#'+obj.content[i].uid+'imgPre').css({
				height:h,
				position:'absolute',
				opacity:0
			});
		
		$('#'+obj.content[i].uid+'img').css({opacity:0});    
	
		params.dedicatedDone[i] = true; 
		
	}   
	
}

//===========TEXT===============================
function createTextDedicated(obj,i,params) {
	
	if(!params.dedicatedDone[i]) {
	
		params.dedicatedDone[i] = true;  		
	
		$('<div id="'+obj.content[i].uid+'textholder"></div>' ).appendTo($('#'+obj.content[i].uid));		
	
		if(!obj.content[i].info.fullText) {
		
			$('<div id="'+obj.content[i].uid+'loader"><img src="client/img/ajax-loader.gif"></img></div>').appendTo($('#'+obj.content[i].uid));
			
			$('#'+obj.content[i].uid+'loader').css({
				position:'absolute',
				left:Number($(window).width()-20)/2,
				top:Number($(window).height()-params.winMarginTop-gParams.winMarginBot-40-params.hubRealH)/2+params.winMarginTop
			});

			$.ajax({
	    		url: 'text?'+obj.content[i].info.src,
	    		context: document.body,
	    		success: function(data){  
					
					$('#'+obj.content[i].uid+'loader').empty().remove();
					obj.content[i].info.fullText = String(data);
					ready();
				
				}
			});	
		
		}
		else {
			ready();
		}

	}  
	
	function ready() {
		
		var textH =  Number($(window).height()-params.winMarginTop-params.winMarginBot-params.dTextSpacing*2-params.titleH-100-params.hubRealH),
			collums = 1,
			maxCollums = 1,
			textChunk = 0,
			makeW = 0,
			titleDif = 0,
			collumsReal = 1,
			textFull,
			pages = 1,
			pSelector = '',
			textChunkArray = [];

			generateTitle(obj,i,params,true);

		$('<div id="'+obj.content[i].uid+'text" class="miniScreenText'+params.CSS+'">'+obj.content[i].info.fullText+'</div>' ).appendTo($('#'+obj.content[i].uid+'textholder'));			
		$('#'+obj.content[i].uid+'text').css({
			width:params.textCollumW,
			top: params.winMarginTop+params.dTextSpacing+params.titleH,
			position: 'absolute',
			visibility: 'hidden'
		});    
		
		if( $('#'+obj.content[i].uid+'text').height() > textH ) {
			 
			collumsReal =  $('#'+obj.content[i].uid+'text').height() / Number(textH+params.titleH*0.5);
			collums = Math.ceil(collumsReal);
			
			maxCollums	= Math.floor( (  $(window).width()-params.winMarginWidth*2   ) / (params.textCollumW+params.dTextCollumMargin)  );
			 
			if(maxCollums > collums) { 
				maxCollums = collums;
			} else if(collums > maxCollums) {
				pages = Math.ceil( collums/maxCollums );
			}
			
			textChunk =  Math.ceil(obj.content[i].info.fullText.length / (collumsReal) );
			textChunk1 = Math.ceil (obj.content[i].info.fullText.length  / ( Number($('#'+obj.content[i].uid+'text').height()) / Number(textH-params.titleH*0.8) ) ); 
			titleDif = textChunk - textChunk1;
			makeW = (Number($(window).width())-Number( (maxCollums)*(params.textCollumW+params.dTextCollumMargin) )+params.dTextCollumMargin )/2;
 			textChunk1 = getCutOffPoint(textChunk1); 
 			textChunkArray[0] = textChunk1;
 			
 			$('#'+obj.content[i].uid+'text').html(obj.content[i].info.fullText.slice(0,textChunk1));
 
			for(var p=0; p < pages ; p++) {
 				 				
 				if(p > 0) {
 					
 					pSelector = 'p'+p;
 					
 					$('<div id="'+obj.content[i].uid+pSelector+'" ></div>' ).appendTo($('#'+obj.content[i].uid));
											
					$('#'+obj.content[i].uid+pSelector).css({
				        left:(p)*$(window).width(),
				        width:$(window).width(),
	      				height:$(window).height(),
						top:0,
	      				position:'absolute'
					});
					
					$('<div id="'+obj.content[i].uid+pSelector+'textholder"></div>' ).appendTo($('#'+obj.content[i].uid+pSelector));
					
					$('<div id="'+obj.content[i].uid+'textpagenr'+pSelector+'" class="dTextNumber'+params.CSS+'">'+(p+1)+' </br>-</br> '+pages+'</div>' ).appendTo($('#'+obj.content[i].uid+pSelector+'textholder'));			
					
					
					$('#'+obj.content[i].uid+'textpagenr'+pSelector).css({
						top:params.winMarginTop+params.dTextSpacing*2,
	      				position:'absolute',
	      				left: -100
					});
						
 				} else {
 				
 					$('<div id="'+obj.content[i].uid+'textpagenr'+'" class="dTextNumber'+params.CSS+'">'+(p+1)+' </br>-</br> '+pages+'</div>' ).appendTo($('#'+obj.content[i].uid+'textholder'));			
 					
 					$('#'+obj.content[i].uid+'textpagenr').css({
						top:params.winMarginTop+params.dTextSpacing*2,
	      				position:'absolute',
	      				left: -100
					});
 					
 				} 
				 
				for(var j=p*maxCollums; j < (p+1)*maxCollums ; j++) {
				 	
				 	if(j!=0) {
				 					 		
				 		textChunkArray[j] = getCutOffPoint((Number(textChunkArray[j-1])+Number(textChunk))); 	
			 			
				 		if(j===collums-1) {
				 			textFull = obj.content[i].info.fullText.slice(textChunkArray[j-1],obj.content[i].info.fullText.length);		
				 		} else {				 							 			
				 			textFull = obj.content[i].info.fullText.slice(textChunkArray[j-1],textChunkArray[j]);			
				 		}
				 		
				 		console.log('=========== TEXT CHUNK========'+j)
				 		console.log(textFull)
				 		textFull = textFull.replace(/^ {0,}<\/br>/,'');
				 		textFull = textFull.replace(/^ {0,}<\/br> {0,}<\/br>/,'');

				 		$('<div id="'+obj.content[i].uid+'text'+j+'" class="miniScreenText'+params.CSS+'">'+textFull+'</div>' ).appendTo($('#'+obj.content[i].uid+pSelector+'textholder'));	
				 	
				 		$('#'+obj.content[i].uid+'text'+j).css({
				 		    width:params.textCollumW,
				 		    top: params.winMarginTop+params.dTextSpacing,
				 		    position: 'absolute',
				 		    left: (params.textCollumW+params.dTextCollumMargin)*(j-p*maxCollums),
				 		}); 
				 		
					}
					   
				}		
				
				if(p>0) {
					
					$('#'+obj.content[i].uid+pSelector+'textholder').css({
						position: 'absolute',
						top: (Number($(window).height())-Number(  textH )  -params.winMarginBot-params.winMarginTop-params.dTextSpacing*2-params.titleH-params.hubRealH )/2 ,		
						left:makeW
					});
					
				}
				
			}
			
			params.dedicatedPages[i] = pages;
			params.dedicatedCurrentPage[i] = 0;
			
			if(pages > 1) {
				setXpos(params,i,(pages)*$(window).width() );
			}
						
			$('#'+obj.content[i].uid+'text').css({			
				height: textH,
				visibility: 'visible'

			});	
			
			$('#'+obj.content[i].uid+'textholder').css({
				position: 'absolute',
				top: (Number($(window).height())-Number(  textH )-params.winMarginBot-params.winMarginTop-params.dTextSpacing*2-params.titleH-params.hubRealH )/2 ,		
				left:makeW
			});
			
		} else {
		
			makeW = (Number($(window).width())-Number( params.textCollumW+20-40 ) )/2;
		
			$('#'+obj.content[i].uid+'textholder').css({
				position: 'absolute',
				top: (Number($(window).height())-Number(  $('#'+obj.content[i].uid+'text').height() )  -params.winMarginBot-params.winMarginTop-params.dTextSpacing*2-params.titleH - 40-params.hubRealH )/2 ,		
				left:makeW
			});
		
			$('#'+obj.content[i].uid+'text').css({			
				height: textH,
				visibility: 'visible'

			});	
		} 
	}
	
	function getCutOffPoint(index) {
	    
	    var cutOff = -1, 
	    	cutOffFallback2 = index;
	        cutOffFallback = -1;
	        	        
	    for(var h = index-50 ; h < index+50 ; h++) {
	        if(obj.content[i].info.fullText.charAt(h) === '.' || obj.content[i].info.fullText.charAt(h) === '?' || obj.content[i].info.fullText.charAt(h) === '!') {
	        	cutOff =  h+1;
	        	break;
	     	}
	        if(obj.content[i].info.fullText.charAt(h) === ',') {	
	        	cutOffFallback = h;
	        }
			if(obj.content[i].info.fullText.charAt(h) === ' ') {	
	        	cutOffFallback2 = h;
	        }


	    }
	    
	    if(cutOff == -1) {
	    
	    	if(cutOffFallback == -1) {
	    		return cutOffFallback2;
	    	} else {
	        	return cutOffFallback;
	    	}
	    	
	    } else {
	        return cutOff;
	    }
	
	}  

}

//===============COLLECTION=====================================
function createCollectionDedicated(obj,i,params) {
	
	if(!params.dedicatedDone[i]) {
	
		//identify collection type
			// 1 text + 1 image
			// only images	
			// 1 text + multiple images
			// multiple texts and images
			// multiple collections (nested collections)
			// audio with text and picture (album)
			// mix of everything (files etc);
			// issues: navigation? (scroll etc.)
		
			// if dedicated holder .height > window.height -> take control of srcolling
		
		generateTitle(obj,i,params);

		$('<div id="'+obj.content[i].uid+'text" class="miniScreenText'+params.CSS+'">collection</div>' ).appendTo($('#'+obj.content[i].uid));		
	
		$('#'+obj.content[i].uid+'text').css({
			width:params.textCollumW,
			top: params.winMarginTop+20+params.titleH,
			position: 'absolute'
		});    
		params.dedicatedDone[i] = true;  
	
	}  
		
}

//===============TITLE=====================================
function generateTitle(obj,i,params,text) {
	
	var margin = params.dTextSpacing;
	
	if(text) {
		$('<div id="'+obj.content[i].uid+'title" class="miniScreenTitle'+params.CSS+'"><h1>' + obj.content[i].info.name  + '</h1></div>' ).appendTo($('#'+obj.content[i].uid+'textholder' ));
	} else {
		$('<div id="'+obj.content[i].uid+'title" class="miniScreenTitle'+params.CSS+'"><h1>' + obj.content[i].info.name  + '</h1></div>' ).appendTo($('#'+obj.content[i].uid ));	
	}
	
	$('#'+obj.content[i].uid+'title').css({
		height : params.titleH ,
		overflow : 'hidden',
		width: params.textCollumW,
		top : params.winMarginTop+margin,
		position: 'absolute'
	});
	
	
}


//==============================================================    

function loadDedicated(i,params,force) {

	params.scrollPos = 0;
	params.rootPos = 0;  
	if(params.counterID) {
		clearInterval(params.counterID);			
		params.counterID = null;
	}
	params.scrollCnt = -1;

	$('#root_screens').animate({left: params.rootPos },{duration:700});
	
	//params.dedicatedPages = [];
	//params.dedicatedCurrentPage = 0;
	
	if(params.dedicatedCurrent<i && params.dedicatedPages[i-1] > 1 && params.dedicatedCurrentPage < params.dedicatedPages[i-1]-1 && force != true ) {
		
		params.dedicatedCurrentPage++;
		i--;	
		$('#dHolder').animate({ left: -params.dXpos[i]-$(window).width()*params.dedicatedCurrentPage },{duration:700});
				
	} else if(params.dedicatedCurrent>i && params.dedicatedPages[i+1] > 1 && params.dedicatedCurrentPage > 0  && force != true ){
				
		params.dedicatedCurrentPage--;
		i++;	
		$('#dHolder').animate({ left: -params.dXpos[i]-$(window).width()*params.dedicatedCurrentPage },{duration:700});

	}  else {
	
		if(params.dedicatedCurrent>i && params.dedicatedPages[i] > 1 && force != true ) {
			params.dedicatedCurrentPage = params.dedicatedPages[i]-1 ;			
			$('#dHolder').animate({ left: -params.dXpos[i]-$(window).width()*params.dedicatedCurrentPage },{duration:700});
		} else {
	 		params.dedicatedCurrentPage = 0;
			$('#dHolder').animate({ left: -params.dXpos[i] },{duration:700});
		}
	
	}
	
	
	setTimeout(function() {	
	if(params.dedicatedObj.content[i].info.type == 'img' ) {
		createImageDedicated(params.dedicatedObj,i,params); 
	} else if(params.dedicatedObj.content[i].info.type == 'txt' ) {
		createTextDedicated(params.dedicatedObj,i,params); 
	} else if(params.dedicatedObj.content[i].info.type == 'folder') {
		createCollectionDedicated(params.dedicatedObj,i,params); 
	} else if(params.dedicatedObj.content[i].info.type == 'vid' || params.dedicatedObj.content[i].info.type == 'mov') {
		createVideoDedicated(params.dedicatedObj,i,params,params.dedicatedObj.content[i].info.type); 
	} else if(params.dedicatedObj.content[i].info.type == 'audio') {
		createAudioDedicated(params.dedicatedObj,i,params,params); 
	}
	},700);

	params.dedicatedCurrent = i;

}

//image loaded < depricated straks met resize	
function thumbDoneImg(img,loader) {


	var w = $('#'+img).width()
	, h = $('#'+img).height();
	
		$('#'+img).css({
				position:'absolute',
				left:Number($(window).width()-w)/2,
				top:Number($(window).height()-gParams.winMarginTop-gParams.winMarginBot-h-gParams.hubRealH)/2+gParams.winMarginTop,
				opacity: 1	
			});
			

}
		
function posImg(img,pre,loader) {
													
	
	$('#'+loader).empty().remove();															

										
	var w = $(img).width()
	, h = $(img).height();
	//alert(gParams.hubRealH);						
	$(img).css({
		position:'absolute',
		left:Number($(window).width()-w)/2,
		top:Number($(window).height()-gParams.winMarginTop-gParams.winMarginBot-h-gParams.hubRealH)/2+gParams.winMarginTop
	});
	

														
	$(img).animate({opacity:1},{duration:500});
	
	setTimeout(function(){ $('#'+pre).empty().remove() },500);
	
	
	
	//$('#'+pre).animate({opacity:0},{duration:400});

	
}	

//==============================================================    

function setXpos(params,i,w) {
		
	var delta;
		delta = w-(params.dXpos[i+1]-params.dXpos[i]);		
		//params.dXpos[i] = delta;
		
	for(var j = i+1; j < params.dedicatedObj.content.length ; j++) {

		params.dXpos[j]+=delta;

		$('#'+params.dedicatedObj.content[j].uid).css({
			left:params.dXpos[j]
		});    	
			
	}

} 


//=============CLOSE===========
function closeDedicated(params) {
    hashForce = false;						
    if(params.oldCurrent === params.current && ( params.dedicatedCurrent < params.index+params.maxDisplay  ) && ( params.dedicatedCurrent >= params.index  ) ) {	
    
    	//viewChain moet hier in!
       	window.location.hash = '#/'+params.current+'/'+params.indexURI(null,params.dedicatedObj.content);
			
    } else if( /^search\//.test(params.oldCurrent)) {

    	//BUG! fix alles met geen value voor params.index daar gaat het mis indexURI etc.  	
    	window.location.hash = '#/'+params.oldCurrent+'/'+params.indexURI();
      	
    } else  {
    	window.location.hash = '#/'+params.current+'/'+params.indexURI(parseInt(params.dedicatedCurrent),params.dedicatedObj.content);
    }	

}




















