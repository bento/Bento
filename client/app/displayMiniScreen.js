var totalImages = 0;

function displayMiniScreen(obj,params,slumber) {

		var CSSclass = params.css;
		if(CSSclass == ' ') {
			CSSclass = '';
		} else {
			CSSclass = ' '+CSSclass;
		}	
			
		$('<div id="'+obj.uid+'" class="miniScreen'+CSSclass+'"></div>' ).appendTo($('#root_category'));
		$('<div id="'+obj.uid+'nest" class="miniScreenNested'+CSSclass+'" style="height:'+params.h+'px;width:'+params.w+'px;"></div>' ).appendTo($('#'+obj.uid));
		$('<div id="'+obj.uid+'icons" class="miniScreenIcons'+CSSclass+'"></div>' ).appendTo($('#'+obj.uid));

		$('#'+obj.uid+'icons').css({
			'position':'absolute' ,  
			'width' : params.iconsW ,
			'left' : params.w-params.iconsW+19,
			'top' : params.h-params.iconsH+18,
			'height' : params.iconsH,	
			 opacity: 0
		});

		$('#'+obj.uid).css({
			'position':'absolute' ,  
			'width' : params.w ,
			'height' : params.h 
		});
		
		if(obj.info.type == 'img') {
			generateImage();
			if(params.ImgTitle) {						
				generateTitle(true);
			}
		} else if(obj.info.type === 'folder') {
			var found,
				found2;	
			for(var i = 0 ; i < obj.info.children.length ; i ++) {
				if(obj.info.children[i].info.thumb && !found) {
					found = obj.info.children[i].info.thumb;
				} else if(obj.info.children[i].info.type == 'txt' && !found2) {			
					found2 = obj.info.children[i].info.text;	
				}
			}
			if(!found && found2) {
				generateTitle();				
				generateText(found2);	
			} else if(found && found2) {
				generateImage(found,found2); 
				generateTitle();
				generateText(found2,true);					
			} else if(!found && !found2) {
				generateTitle();
			} else if(found && !found2) {
				generateImage(found); 
				generateTitle();		
			}	
			generateInfo();
	} else if(obj.info.type === 'txt') {
		generateTitle();
		generateText();	
	} else if(obj.info.type === 'file') {
		generateTitle();	
		generateFile();
		generateInfo();
	} else if(obj.info.type === 'vid' || obj.info.type === 'mov') {
		generateTitle();	
		generateInfo();
	} else if(obj.info.type === 'audio') {
		generateTitle();	
		generateInfo();
	}

 		
	params.displayArray.push( $('#'+obj.uid) );

	//==============CLICK HANDLING==============

	$('#'+obj.uid).click(function() {
		
		
		hashForce = false;
			
		if(params.current == '' ) {
			window.location.hash = '#/'+obj.info.src.split(params.contentDir+'/').join('')+'/';
		} else {					
			window.location.hash = '#/p/'+obj.info.src.split(params.contentDir+'/').join('');
		}
	}); 
		
	//============PRIVATE FUNCTIONS=============
	
	function generateText(text,full) {	
		var tt; 
		if(!text) {
			$('<div id="'+obj.uid+'txt"  class="miniScreenText'+CSSclass+'">'+obj.info.text+'</div>' ).appendTo($('#'+obj.uid+'nest'));	
			
			$('#'+obj.uid+'txt').css({
				height: params.h-params.titleH-15,
				overflow:'hidden'
			});
			
						
		} else if(text && full) {
	        tt = text.slice(0,params.collectionTextLength);
			$('<div id="'+obj.uid+'txt"  class="miniScreenText'+CSSclass+'">'+tt+'</div>' ).appendTo($('#'+obj.uid+'nest'));	
			
			$('#'+obj.uid+'txt').css({
				height: params.h-params.titleH-25-Number(params.infoH),
				overflow:'hidden'
			});
			
			
		} else {
	        tt = text;
			$('<div id="'+obj.uid+'txt"  class="miniScreenText">'
			+tt+'</div>' ).appendTo($('#'+obj.uid+'nest'));	
		
			$('#'+obj.uid+'txt').css({
				height: params.h-params.titleH-25-Number(params.infoH),
				overflow:'hidden'
			});			
			
		}
	}

	function generateImage(src,text,slumber) {
						
		if(!src) {
			if(params.ImgTitle) {						
				$('<div id="'+obj.uid+'img" class="miniScreenImg'+CSSclass+'" ><img src="'+obj.info.thumb+'&'+params.w+'&'
				+params.h-params.titleH-params.infoH+'&true" onload="fadeImgMiniScreen(\''+obj.uid+'img\');"></img></div>' ).appendTo($('#'+obj.uid+'nest'));
			} else {
				$('<div id="'+obj.uid+'img" class="miniScreenImg '+CSSclass+'"><img src="'+obj.info.thumb+'&'+params.w+'&'+params.h+'&true" onload="fadeImgMiniScreen(\''+obj.uid+'img\');"></img></div>' ).appendTo($('#'+obj.uid+'nest'));
			}
		}
		else if(text && src) {
			$('<div id="'+obj.uid+'img" class="miniScreenImg'+CSSclass+'"><img src="'+src+'&'+params.w+'&'
			+params.h+'&true" onload="fadeImgMiniScreen(\''+obj.uid+'img\');"></img></div>' ).appendTo($('#'+obj.uid+'nest'));
			$('#'+obj.uid+'img').css({
				height: params.imgCollectionH,
				overflow:'hidden'
			});
		} else {
			$('<div id="'+obj.uid+'img" class="miniScreenImg'+CSSclass+'"><img src="'+src+'&'+params.w+'&'
			+params.h+'&true"  onload="fadeImgMiniScreen(\''+obj.uid+'img\');"></img></div>' ).appendTo($('#'+obj.uid+'nest'));
			$('#'+obj.uid+'img').css({
				height: (params.h-Number(params.titleH+10)-Number(params.infoH)),
				overflow:'hidden'
			});		
		}
		$('#'+obj.uid+'img').css({opacity:0});   
		
	}
	
	function generateTitle(img) {
		$('<div id="'+obj.uid+'title" class="miniScreenTitle'+CSSclass+'"><h1>' + obj.info.name  + '</h1></div>' ).appendTo($('#'+obj.uid+'nest'));
		$('#'+obj.uid+'title').css({
				'height' : params.titleH ,
				'width' : params.w-15,
				'overflow' : 'hidden'
			});
		if(img) {
			$('#'+obj.uid+'title').css({
				'height' : params.titleH ,
				'margin-top' : -100
			});
		}
	}
	
	function generateFile() {
		$('<div id="'+obj.uid+'txt"  class="miniScreenText'+CSSclass+'">'+'Download </br>'+obj.info.filename+'</div>' ).appendTo($('#'+obj.uid+'nest'));			
	}
	
	function generateInfo() {
		$('<div id="'+obj.uid+'info" class="miniScreenInfo'+CSSclass+'"></div>' ).appendTo($('#'+obj.uid+'nest'));
		$('#'+obj.uid+'info').css({				
			'position':'absolute' ,  
			'width' : params.w ,
			'top' : params.h-params.infoH								
		});	
	}
	
	function testInfo() {
		$('<div id="'+obj.uid+'miniScreenTestInfo" style="margin-top:20px">'+
		'i: '+obj.uid+
		'   uri: '+obj.uri
		+'</div>' ).appendTo($('#'+obj.uid+'nest'));	
	}
			
}





function fadeImgMiniScreen(id) {	
	
	//$('#'+id+'pre').empty().remove();
		//alert(img)
	//$('#'+id).css({  position: 'absolute' , top:0, left: 0  });
	$('#'+id).animate({opacity:1},{duration:200});
}	



