var gParams;

function slideSite() {

	var params,
		resizeTimer,
		resizeTimerKEY,
		anim = false,
		hashForce,
		paramsBase,
		currentParams;
			
	//==================INIT=====================

	this.init = function (paramsInit,customParams) {
	
		if(!paramsInit.w) { paramsInit.w = 300; }
		if(!paramsInit.h) { paramsInit.h = 150; }
		if(!paramsInit.marginW) { paramsInit.marginW = 20; }
		if(!paramsInit.marginH) { paramsInit.marginH = 20; }
		if(!paramsInit.winMarginWidth) { paramsInit.winMarginWidth = 50; }
		if(!paramsInit.winMarginBot) { paramsInit.winMarginBot = 50; }
		if(!paramsInit.winMarginTop) { paramsInit.winMarginTop = 50; }		
		if(!paramsInit.maxItemsH) { paramsInit.maxItemsH = -1; }		
		if(!paramsInit.maxItemsW) { paramsInit.maxItemsW = -1; }		
		if(!paramsInit.memmory) { paramsInit.memmory = []; }		
		if(!paramsInit.srchMemmory) { paramsInit.srchMemmory = []; }		
		if(!paramsInit.bg) { paramsInit.bg = false; }
		if(!paramsInit.iconsW) { paramsInit.iconsW = 110; }
		if(!paramsInit.iconsH) { paramsInit.iconsH = 40; }
		if(!paramsInit.imgCollectionH) { paramsInit.imgCollectionH = 150 }
		if(!paramsInit.infoH) { paramsInit.infoH = 30 }
		if(!paramsInit.collectionTextLength) { paramsInit.collectionTextLength = 250 }		
		if(!paramsInit.titleHeight) { paramsInit.titleHeight = 40 }
		if(!paramsInit.logo) { paramsInit.logo = 'client/img/logo.png' }
		if(!paramsInit.dImgSpacing) { paramsInit.dImgSpacing = 50 }
		if(!paramsInit.dTextSpacing) { paramsInit.dTextSpacing = 20 }
		if(!paramsInit.textCollumW) { paramsInit.textCollumW = 300 }
		if(!paramsInit.dTextCollumMargin) { paramsInit.dTextCollumMargin = 20 }
		if(!paramsInit.hSpacing) { paramsInit.hSpacing = 0 }
		if(!paramsInit.padding) { paramsInit.padding = 10 }
		if(!paramsInit.hubH) { paramsInit.hubH = 125 }
		
		//paramsInit.displayArray = [];
		paramsInit.indexURI = indexToURI;
		paramsInit.URIindex = URItoIndex;
		paramsInit.searchMethod = searchIt;
		paramsInit.scrollBounce = scrollBounce;
		paramsInit.dedicated = false;
		paramsInit.searchMethod = searchIt;
		paramsInit.scrollCnt = -1;
		paramsInit.scrollPos = 0;
		paramsInit.rootPos = 0;
		paramsInit.custom = customParams;
		paramsInit.css = ' ';
		paramsInit.CSS = '';
		//paramsInit.aplayer = {};
				
		paramsBase = paramsInit;
		//params = paramsBase;
		
		setCustomParams('',true)
		params.displayArray = [];
		gParams = params;
		
		$('<div id="root_screens" style="position:absolute"></div>').appendTo('#root');		
		
		initHub();		
		bottomBar(params);
		topBar(params);
		initScroll(scrollIt);
		iniHubBtns();
		
		//paramsBase.aplayer = {yes:'marcus'}
		
		
		//console.log('yes',params)

		
		$(window).bind('hashchange', function () {
  			  			
  			var hash = window.location.hash || params.home;
  			
  			if(window.location.hash == '' ) {
  				window.location.hash = '/'+params.home+'/';
  			}
  			
  			var arr= hash.split('/')
  			, arrCurrent = arr.slice(1, arr.length-1).join('/');
  			 
  			goHashChange();
  			
  			function goHashChange() {
  			    
  				if(arr[1] != undefined) {
  					
  					if(arr[1] === 'p') {
  						
						  var path = arr.slice(2);
						  	
						  if(params.current == path.slice(0,path.length-1).join('/') && params.dedicated == true) {
						  	
						  	if(hashForce) {
						  		hashForce = false;
						  	} else {
						  		dedicatedHashInterperter(path.join('/'));
						  	}
						  	  	
						  } else {
						  	setCustomParams(path.slice(0,path.length-1).join('/'));	
						  	params.dedicated = true;						  														  							  		
  					      	gotoDedicated(path.slice(0,path.length-1).join('/'),path.join('/').replace(/%20/g,' '));	  					      
  					      }
  						
  					} else { 
  					
	  					if(params.current == arrCurrent && params.dedicated == false) {
	  						params.index = params.URIindex((arr[arr.length-1]));
	  						position(params,true);	  							
	  					} else {
	  					
	  						if(arr[arr.length-1]) {
	  							if(arr[1]==='search') {
	  								setCustomParams('search');
	  								params.dedicated = false;
									searchIt( String(arr.slice(2, arr.length-1).join('/')) , arr[arr.length-1], true );
	  							} else {
	  								setCustomParams(arrCurrent);
	  								params.dedicated = false;
	  								gotoCategory( arrCurrent , Number( arr[arr.length-1]), true );
	  							}
	  						} else {
	  							if(String(arr[1])==='search') {
	  								setCustomParams('search');
	  								params.dedicated = false;
									searchIt( String(arr.slice(2, arr.length-1).join('/')) , arr[arr.length-1], true );
	  							} else {
	  								setCustomParams(arrCurrent);	
	  								params.dedicated = false;
									gotoCategory(arrCurrent);
	  							}
	  					  	}	
	  					}	
  					}
  				
  				}
  			} 
  		
 		});
  
    	$(window).trigger( "hashchange" );
		
		if(paramsBase.menu && paramsBase.showMenu) {
			gotoCategory(paramsBase.menu,0,false,initMenu) 
		} 
		
		function initMenu(array){
		    if(!paramsBase.menuMarginW) { paramsBase.menuMarginW = 20; }
		    paramsBase.menuArray = array;
		    showMenu(paramsBase);
		}
		
		

						   
	}
	//=====MASTER PARAMATIZER========
	
	function setCustomParams(str,init) {
		
		var custom = {};

		if(init) {
			
			  for ( val in paramsBase ) {
					
			    	custom[val] = paramsBase[val]
			    	
			    	}
			    	
			
			   params = custom;		
		
		
		} else if(paramsBase.custom && currentParams != str) {
			
			if(paramsBase.custom[str]) {
			
			    for ( val in params ) {	
			
			    	if(paramsBase.custom[str][val] || paramsBase.custom[str][val] === 0) {
			    		custom[val] = paramsBase.custom[str][val]
			
			    	} else if(paramsBase[val] || paramsBase[val] === 0) {
			    		
			    		custom[val] = paramsBase[val];
			    	
			    	} else {
			    		custom[val] = params[val]
			    	}				
			    }
			    currentParams = str;
			    params = custom
			    console.log('custom params ',params);
			}			
			
			else  {
			
			    for ( val in params ) {
			
			    	if(paramsBase[val] || paramsBase[val] === 0) {
			    		custom[val] = paramsBase[val]
			    	} else {					
			    		custom[val] = params[val]
			    	}
			    }	
			
			    currentParams = str;
			    params = custom;		
			}
		}
	}
	
	//==================GO TO DEDICATION========
	
	function gotoDedicated(category,path,search) {
		
		category = category.replace(/^\//,'');
				
		var found;
	    
	    ajaxloader();
	    removeMiniScreens();
	    
	    params.oldCurrent = params.current;
	    params.current = category;		
	    //fix later - full text and non full text
	    
	    params.memmory.forEach(function(obj) {
	        	
	    	if(obj.name === category && obj.content ) {
	    		obj.content;
	    		found = true;
	    		$('#ajaxloader').empty().remove();
	    		ready(obj);
	    	}
	    
	    });
	    
	    if(!found) {
	    
	    	console.log('loading: '+params.content+category);
	    
	    	$.ajax({
	    	url: params.content+category,
	    	context: document.body,
	    	success: function(data){  
	    	    
	    	    params.memmory.push(  { name:  category , content:   JSON.parse(data).data } );
	    	    
				$('#ajaxloader').empty().remove();
								
	    	    if(params.current === category || memmoryReady) {
	    	    	ready(params.memmory[params.memmory.length-1]);
	    	    }
        	}
        	
        	});       
	    }
	     
	    function ready(obj) {
	    	if(obj.content.length) {
				
				var found = false;
				
				if(category && !path ) {
				
					dedicatedView(obj,0,params);	

				} else {	
						
					for(var i = 0 ; i < obj.content.length ; i++) {
											
						if(params.contentDir+'/'+path == obj.content[i].info.src) {
							found = true;							
							dedicatedView(obj, i, params);	
							break;
						}
		
					}
					
				}
				
				if(!found) {
					dedicatedView(obj,0,params);
				}
								
	    	} else {
	    		console.log(obj.content);
	    		alert(obj.content.message);
	    	}
	    }

	}
	
	//==================PUBLIC=================
		
	this.gotoCategory = gotoCategory;
	
	function gotoCategory(category,index,convert,memmoryReady) {
		
		category = category.replace(/^\//,'');
		
		var found;
		
		if(!memmoryReady) {

			ajaxloader();
			removeMiniScreens();
			params.current = category;
		}
		
	    params.memmory.forEach(function(obj) {
	    	    	
	    	if(obj.name === category && obj.content ) {

	    		found = true;
	    		
	    		if(!memmoryReady) {

	    		$('#ajaxloader').empty().remove();
				
				}
				ready(obj);
	    	}
	    });
	    
	    if(!found) {
	    	$.ajax({
	    	url: params.content+category,
	    	context: document.body,
	    	success: function(data){  
	    	    
	    	    params.memmory.push(  {  name:  category , content:   JSON.parse(data).data       } );
	    	    
	    	    		if(!memmoryReady) {

				    	    $('#ajaxloader').empty().remove();
						}		
	    	    if(params.current === category || memmoryReady) {
	    	    	ready(params.memmory[params.memmory.length-1]);
	    	    }
        	}
        	
        	});       
    
	    }
	     
	    function ready(obj) {
	    	if(obj.content.length) {
	    	
	    		if(!memmoryReady) {
	    			displayCategory(obj,params,index,false,convert);   
	    		} else{
	    			
	    			memmoryReady(obj.content);
	    		
	    		}	
	    	} else {
	    		console.log(obj.content);
	    		alert(obj.content.message);
	    	}
	    }
	}
	
	//======SEARCH=======
	
	this.searchIt = searchIt;
	
	function searchIt(search,index,convert) {
		
		if(params.current != 'search/'+search) {
		
			ajaxloader();
			
			$('#slideSiteMenuSearch').val( search.replace(/%20/g,' ') );						

			removeMiniScreens();
		
			var found;
			
			params.current = 'search/'+search;
			
	    	params.srchMemmory.forEach(function(obj) {
	    		    	
	    		if(obj.name === search && obj.content ) {

	    			found = true;
	    			
	    			$('#ajaxloader').empty().remove();

					ready(obj);
	    		}
	    	});
	    	
	    	if(!found) {
	    		$.ajax({
	    		url: params.search+search,
	    		context: document.body,
	    		success: function(data){  
	    		    	params.srchMemmory.push(  {  name:  search , content:   JSON.parse(data).data       } );
	    		    	
	    		    	$('#ajaxloader').empty().remove();

	    		    	
	    		    	if(params.current === 'search/'+search) {
	    		    		ready(params.srchMemmory[params.srchMemmory.length-1]);
	    		    	}	
        			}
        		});       
	    	}
	    }
	    
	    function ready(obj) {
	    	displayCategory(obj,params,index,true,convert);   
	    }
	        
	}
		
	//===============EVENT LISTENERS===============
		
	$(window).resize(function() {   
	 	
	 	$('#slideSiteMenu').css({
			'top' : $(window).height()-$('#slideSiteMenu').height(),
			'width' : $(window).width()+4
		});

 		$('#slideSiteHub').css({
			'top' :  $(window).height()-params.hubRealH-params.winMarginBot ,
			'width' : $(window).width()+4
		});

	 	$('#slideSiteTopBar').css({
			'width' : $(window).width()+4
		});

		$('#slideSiteMenuText').css({'margin-left':($(window).width()-$('#slideSiteMenuText').width())/2});
		$('#slideSiteMenuSearch').css({'margin-left':($(window).width()-$('#slideSiteMenuSearch').width()-30)});
		$('#slideSiteMenuSearchGrphx').css({'margin-left':($(window).width()-52)});

	 	if (resizeTimer) clearTimeout(resizeTimer);
		resizeTimer = setTimeout(resizer, 200);	
		
		function resizer() {
			if(!params.dedicated) {	
				position(params,true);
			}				
		}
		
		if(params.menu) {
			$('#slideSiteTopBarMenu').css({
				left:$(window).width()-paramsBase.totalwMenu
			});		
		}
		
	});
	
	$(window).keyup(function(e) {
		
		if(anim==false && (e.keyCode == 39 || e.keyCode == 37 || e.keyCode == 40 || e.keyCode == 38 || (e.keyCode ==27 && params.dedicated ))) { 
		
		 anim = true; 
		
			if(e.keyCode == 39) {		
				goRight();
			} 
			else if(e.keyCode == 37) {	
				goLeft();
			}
			else if(e.keyCode == 40) {	
				goPageFirst();		
			} 
			else if(e.keyCode == 38) {
				goPageLast();
			} else if(e.keyCode == 27 && params.dedicated) {
				closeDedicated(params);
			}	
			setTimeout(function() {  anim = false },600);			
		}
	
	});
	
	//==================PRIVATE=================

	//==================USER CONTROLS===================
						
	function scrollIt(delta) {
    		
    		if(!params.dedicated) {
          	    		
				if(params.scrollCnt < 5 && anim == false && !(params.index==0&&delta<0) && !(params.index== params.displayArray.length - params.maxDisplay + params.lastPage &&delta>0) ) {
					
					if(!params.counterID) {			
							params.counterID = window.setInterval(function() { 	
							params.scrollCnt += 1	
								
							if(params.scrollCnt > 5 && anim == false && Math.abs(params.scrollPos) > 0) {
		    					scrollBounce();		
		    				}
		    				
						} , 100);
					}   
					 	
		    		params.scrollPos-=delta/5;
		    		params.rootPos-=delta/5;
		    	
		    		$('#root_screens').css({left: params.rootPos });
		    		
		    		if(params.bg) {
		    		    params.bgPos-=delta/5;
		    			$('#bg').css({left: params.bgPos });
					}
		    		
		    		if(params.scrollPos>50 || params.scrollPos < -50) {
		    			anim = true;
		
		    			if(params.scrollPos>0 ) {
		    				goLeft();
		    			} else {
		    				goRight();
		    			}
		    		
		    			params.scrollPos = 0;
		    			params.rootPos = 0;
						
		    			setTimeout(whileAnimating,751);			
		    		}    	
		    	} 
	    	
	    	} else {
	    	
	    	
	    	/*	params.dedicatedObj = obj;
				params.dedicatedCurrent = index;
			*/
	    		
	    		if( params.scrollCnt < 5 && anim == false && (!(params.dedicatedCurrent==0&&delta<0)||(params.dedicatedPages[params.dedicatedCurrent]>1&&params.dedicatedCurrentPage>0)) && (!(params.dedicatedCurrent==params.dedicatedObj.content.length-1&&delta>0)||(params.dedicatedPages[params.dedicatedCurrent]>1&&params.dedicatedCurrentPage<params.dedicatedPages[params.dedicatedCurrent]-1)) ) {
					
					if(!params.counterID) {			
							params.counterID = window.setInterval(function() { 	
							params.scrollCnt += 1	
								
							if(params.scrollCnt > 5 && anim == false && Math.abs(params.scrollPos) > 0) {
	    						scrollBounce();		
	    					}
	    					
						} , 100);
					}   
					 	
	    			params.scrollPos-=delta/5;
	    			params.rootPos-=delta/5;
	    		
	    			$('#root_screens').css({left: params.rootPos });
	    			
	    			if(params.scrollPos>50 || params.scrollPos < -50) {
	    				anim = true;
			
	    				if(params.scrollPos>0 ) {
	    					goLeft();
	    				} else {
	    					goRight();
	    				}
	    			
	    				params.scrollPos = 0;
	    				params.rootPos = 0;
						
	    				setTimeout(whileAnimating,751);			
	    			}    	
	    		} 
			

	    	}
    	
    	
	}
	
	function scrollBounce() {
	
		anim = true;
    	params.scrollPos = 0;
    	params.rootPos = 0;

    	if(params.bg) {
		    params.bgPos= -Number($(window).width())*Number(params.currentPage);
    	    $('#bg').animate({left: params.bgPos },{duration:300});
		}
		
		$('#root_screens').animate({left: params.rootPos },{duration:300}); 
		setTimeout(whileAnimating,301);
	}
	
	function whileAnimating() { 
    	
    	anim = false; 
    	params.scrollPos = 0;
 		params.rootPos = 0;
		clearInterval(params.counterID);			
		params.counterID = null;
		params.scrollCnt = -1;
		
    }
    
    //GO left right treshhold op links is nog niet kosher!

	function goLeft() {
	
		if(!params.dedicated) {
		
			if(params.displayArray.length > params.maxDisplay && params.index != 0) {
				if( (params.index-params.maxDisplay) < 0) {
					params.index = params.displayArray.length - params.maxDisplay + params.lastPage;
				} else {
					params.index -= params.maxDisplay;
				}
				
				window.location.hash = '#/'+params.current+'/'+params.indexURI();
				
				//position(params,true);	
			}
		
		} else {
		
			if(params.dedicatedCurrent > 0 || (params.dedicatedPages[params.dedicatedCurrent]>1&&params.dedicatedCurrentPage>0) ) {
				//detect op uri
				
				//alert(window.location.hash+'\n'+params.dedicatedCurrent+'\n'+params.dedicatedObj.content[params.dedicatedCurrent].info.src)
				//window.location.hash = '#/p/'+params.current+'/'+params.indexURI();
				if( ( params.dedicatedPages[params.dedicatedCurrent] > 1 &&  params.dedicatedCurrentPage == 0 ) ||  params.dedicatedPages[params.dedicatedCurrent] == 1) {
					var check = new RegExp('^'+params.contentDir);
					var hash = '#/p'+params.dedicatedObj.content[params.dedicatedCurrent-1].info.src.replace(check,'');	
					hashForce = true;
					window.location.hash = hash;
				}
						
				loadDedicated(params.dedicatedCurrent-1,params);
			}
		}

		 		
	}
 	
	function goRight() {
	
		if(!params.dedicated) {

			
			if(params.displayArray.length > params.maxDisplay && params.index != params.displayArray.length - params.maxDisplay + params.lastPage ) {
				if( (params.index+params.maxDisplay) < params.displayArray.length) {
					params.index += params.maxDisplay;
				} else {
					params.index = 0;
				}
				
				window.location.hash = '#/'+params.current+'/'+params.indexURI();
	
				//position(params,true);
			} 	
			
		} else {
		
			if(params.dedicatedCurrent < params.dedicatedObj.content.length-1 || ( params.dedicatedPages[params.dedicatedCurrent] > 1 && params.dedicatedCurrentPage < params.dedicatedPages[params.dedicatedCurrent]-1) ) {
				
				if( ( params.dedicatedPages[params.dedicatedCurrent] > 1 &&  params.dedicatedCurrentPage == params.dedicatedPages[params.dedicatedCurrent]-1 ) ||  params.dedicatedPages[params.dedicatedCurrent] == 1) {
					var check = new RegExp('^'+params.contentDir);
					var hash = '#/p'+params.dedicatedObj.content[params.dedicatedCurrent+1].info.src.replace(check,'');	
					hashForce = true;
					window.location.hash = hash;
				}

				loadDedicated(params.dedicatedCurrent+1,params);
			}
		}

	}
	
	function goPageFirst() {
		//STILL NEEDS WORK!
		if(!params.dedicated) {

		    params.index = 0;
		    window.location.hash = '#/'+params.current+'/'+params.indexURI();
		    //position(params,true);	
		    		
		} else {
		
		
		    var check = new RegExp('^'+params.contentDir);
		    var hash = '#/p'+params.dedicatedObj.content[0].info.src.replace(check,'');	
		    window.location.hash = hash;

		    loadDedicated(0,params);
		    
		}
	}


	function goPageLast() {	
		//STILL NEEDS WORK!	
		if(!params.dedicated) {
	
			params.index = params.displayArray.length - params.maxDisplay + params.lastPage;
			window.location.hash = '#/'+params.current+'/'+params.indexURI();
			//position(params,true);	

		} else {
			
			var check = new RegExp('^'+params.contentDir);
			var hash = '#/p'+params.dedicatedObj.content[params.dedicatedObj.content.length-1].info.src.replace(check,'');	
			window.location.hash = hash;

			loadDedicated(params.dedicatedObj.content.length-1,params);

		}

	}
	//=====
	
	
	
	
	
	//=============================================
	
	function dedicatedHashInterperter(path) {
	
		var check = new RegExp('^'+params.contentDir);
		//var hash = '#/p'+params.dedicatedObj.content[params.dedicatedCurrent].info.src.replace(check,'');	
		var index = -1;
		
		for(var i = 0 ; i < params.dedicatedObj.content.length ; i++ ) {	
		    if(  params.dedicatedObj.content[i].info.src.replace(check,'') == '/'+path   ) {
		    	index = i;
		    	break
		    }
		}
		
		if(index > -1) {
		    loadDedicated(index,params,true);
		}
		
	}
	
	function removeMiniScreens() {		
		if( $('#root_category')) {
			 $('#root_category').empty().remove();
			 
			 if(!params.displayArray) {
			 	
			 	params.displayArray = [];
			 
			 }
			 
			 params.displayArray.forEach(function(obj) {
			 	$(obj).empty().remove();			 
			 });
			 params.displayArray = [];	 
		}
	}
	
	function ajaxloader() {
		$('#ajaxloader').empty().remove();
		$('<img id="ajaxloader" src="client/img/ajax-loader.gif" style="position:absolute;margin-left:'
		+($(window).width()-50)/2+';margin-top:'+($(window).height()-100)/2+'"></img>').appendTo('#root');			
	}
	
	function URItoIndex(uri,array) {
		if(!array) {
			array = params.currentArray;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               