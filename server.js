var app = require('./sj/server/sj.js'),
	output,
	config = {};
		
	//=================================================

	app.utils.build('<html><head>','</body></html>','client/',init);
		
	function init(html) {
	
			var configRequest = {
				param : {src:'config.json',data:true},
				info : {},
				ready: function() {
					
					config = JSON.parse( String(configRequest.info.data) );
					
					app.req.add(getContent,{replace:'/content?',uri:'/content\\?',path:'/'});		
					app.req.add(searchContent,{replace:'/search?',uri:'/search\\?',path:' '});		
					app.req.add(sizeImage,{replace:'/thumb?',uri:'/thumb\\?.',path:'&'});	
					
					app.req.add(getText,{replace:'/text?',uri:'/text\\?.',path:'&'});		

						
					app.req.add(app.fs.file,{param:{dirlist:true},replace:'/',uri:'/.',path:'/'});			
					app.req.add(index,{url:''});	

					if( config.test === 'true' ) {
						config.test = true;
					}
										
					output = html;
					app.init({test:config.test});
				}
			}
					
			app.fs.file(configRequest);
	}
	
	//==================REQUESTS======================
	function sizeImage(req) {
		
		if(req.uparams.length > 2) {
		
			var w = req.uparams[1];
			var h = req.uparams[2];
			
			
			var crop = false;
			
			if(req.uparams[3]) {
				crop = req.uparams[3];
			}
			
			var imageRequest = {
				param: {
					data: true,
					img: {
						w: w,
						h: h,
						crop: crop,
						format: 'JPG'
					},
				},
				info: {},
				uparams: req.uparams[0].split('/')  , 
				ready: function() {
					if(!imageRequest.info.data.message) {
						req.info.res.end(imageRequest.info.data);
					} else {
						req.info.res.end(JSON.stringify(imageRequest.info.data));
					}
				}				
				
			}
			
			app.fs.file(imageRequest);	

		} else {
		
			req.info.res.end('no w / h ');
		
		}	
		
			
	}
	
	//=================================================
			
	function index(req) {
	
		var configRequest = {
				param : {src:'config.json',data:true},
				info : {},
				ready: function() {
				
					config = JSON.parse( String(configRequest.info.data) );
					
					if( config.test === 'true' ) {
						config.test = true;
					}
															
					if(config.test) {
						app.utils.build('<html><head>', '</body></html>', 'client/', init_nest );
						function init_nest(html) {
							output = html;
							req.info.res.end(output);
						}
					} else {
						req.info.res.end(output);	
					}
				}
			}

		app.fs.file(configRequest);	
	}	
	
	//=================================================
	
	function getText(req) {
		
			var textRequest = {
				param: {data: true},
				info: {},
				uparams: req.uparams[0].split('/')  , 
				ready: function() {
				
					if(!textRequest.info.data.message) {
						
						
						console.log('fix text');
						
						req.info.res.end(String(  textRequest.info.data     ).replace(/(\r\n\r\n|\n\n|\r\r)/gm,'<\/br>                                                                                                  <\/br>'));
						//req.info.res.end(String(  textRequest.info.data     ).replace(/\\</br></br>/gm,'</br></br>'));
						
						
					} else {
						req.info.res.end(JSON.stringify(textRequest.info.data));
					}
				}				
				
			}
			
			app.fs.file(textRequest);		
	}
	
	//=================================================
	
	function searchContent(request) {
		
		//.replace(/\[|\]/g,'')
		var searchString = 's:ALL';
		if(request.uparams.join('') == '' || request.uparams.join('') == ' ') {
		
		} else if(request.uparams.length == 1) {
			searchString = stripCharacters(request.uparams[0]);
		} else {
			searchString = makecombos(request.uparams).join('|');
					
		}
		//searchString = '(\.js).+(kill)|(kill).+(\.js)';
		getContent(request,String(searchString));
		
		function makecombos(arrayIn) {
			
			var combos = [],
				array = [];
			
			for(var i = 0 ; i < arrayIn.length ; i++) {
				
				var tstr = stripCharacters(arrayIn[i]);
				
				if(tstr != '' && tstr != ' ') {
					array.push(tstr);				
				}
			}
			
			if(array.length == 1) {
			
				return [array[0]];
				
			} else if(array.length == 0) {
			
				return(['']);
			
			} else {
			
				if(array.length > 4) {
					array = array.slice(0,4);
				}
				
				var l = array.length;				
				nestArray(0,[],[],l);	
				return combos;
			
			}
			
				
			function nestArray(level,values,comboarray,length) {
				if(level == length ) {
					if(values.length == length) {
						
						//console.log(values.length + ' compared to '+length);
					
						var tempstr = '';				
						for(var j = 0 ; j < values.length; j++) {	
							if(j == values.length-1) {
								tempstr += '('+array[ values[j] ]+')';
							} else {
								tempstr += '('+array[ values[j] ]+').{0,}';
							}
						}	
						combos.push(tempstr);

					}
				} else {
					for(var i = 0 ; i < length ; i++) {
						comboarray[i] = [];
						var go = true;
						for(var t = 0 ; t < values.length ; t++) {
							if(values[t] == i) {							
								go = false;
								break;	
							}
						}		
						if(go==true) {
							var values2 = values.slice(0);
							values2.push(i);
							var level2 = level+1;
							nestArray(level2, values2  ,comboarray[i],length);
						}
					}
				}
			}	
		}
		
		function stripCharacters(str) {
			return str.replace(/\[|\||\?|\\|\.|\^|\*|\!]/g,'');
		}
		
	}
	
	//=================================================
	
	function getContent(request,search) {
	
		var maxlevel = -1;
	
		if(request.uparams[0] === 'level') {
			
			maxlevel = parseInt(request.uparams[1]);
			request.uparams = request.uparams.slice(2);
		
		}
	
		var collections = [],
		uid = -1,
		uris = [],
		level,
		paramsFR = {
			src:'content/'+request.uparams.join('/'),
			data:true,
			dirlist:true,
			stats:true
					},
		searchRegExp,
		fixStats = function(stats,nestedSrc) {
		
			var dateobj = new Date(stats.atime);
			var dateobj2 = new Date(stats.mtime);
			
			var dateString = [ String(dateobj2.getFullYear()) , String(Number(dateobj2.getMonth()+1)) , String(dateobj2.getDate()) ];
			
			var uri = String(dateobj.getTime());
				uri = uri.slice(1,uri.length-3);
				
			var cnt = 0;
			for(var i = 0 ; i < uris.length ; i ++ ) {
				if(uris[i][0] == uri) {
					if( uris[i][1] >= cnt ) {
						cnt = uris[i][1]+1;
					}
				}
			}
			
			uris.push([ uri, cnt  ]);
			
			var stringSrc = '';
			if(search) {
				stringSrc = String(nestedSrc.split('/').slice(1).join(''))+':';
			}	
				
			return {
				uid: stringSrc+uri+String(cnt),
				date: dateString
			}		
		}
				
		if(search) {
			var date = new Date();	
			//console.log('search for: '+search+' START AT '+date.getTime());
			
			searchRegExp = new RegExp(search,'i');
			
			paramsFR = {
				src:'content',
				data:true,
				dirlist:true,
				stats:true			
				};
		}
		
		var fileRequest = {
				param : paramsFR,
				info : request.info,
				ready: function() {				
					getNestedItems(fileRequest.info.data,collections,fileRequest.param.src+'/',0,request,fileRequest.info.stats);
					//console.log(fileRequest.param);
				}
		}
			
		request.ready = function() {	   		    	
		
			var date2 = new Date();	
			//console.log('GET CONTENT READY AT '+date2.getTime());
			request.info.res.end(JSON.stringify({data:collections}));
		}	
	
		app.fs.file(fileRequest);
		
		function sortOnURI(a,b) {
			
/*
			console.log('===SORT===');
			console.log(b);
			console.log(a);
			console.log('==========');
*/

			return b.uri.int-a.uri.int;
			
		}
				
		function getNestedItems(array,arrayput,nestedSrc,level,gNreq,stats) {
			
			var readyCounter = 0;			
			
			if(array.length) {
			
			array.forEach(function(src) {
				
				var imgTest = app.im.test(src),
					textTest = app.utils.file.test(src,'txt'),
					vidTest = app.utils.file.test(src,'mpg|mp4|m4v|mpeg|ogv|webm'),
					movTest = app.utils.file.test(src,'mov'),
					audioTest = app.utils.file.test(src,'mp3'),
					statsReal = fixStats(stats[src],nestedSrc);
				
				if(imgTest && !imgTest.resized ) {
					uid++;
										
					if(!search) {     
								
						arrayput.push({ 
						    uid: uid ,   
						    uri: statsReal.uid,
						    info: { 
						    	name: imgTest.name,      
						    	src: nestedSrc+src,
						    	date: statsReal.date,
						    	thumb: 'thumb?'+nestedSrc+src,
						    	type: 'img'
						    }  
						});	
					
					
					} else {
										
						if(search === 's:ALL' || searchRegExp.test(String(imgTest.src)) ) {
						
							arrayput.push({ 
						        uid: uid , 
						       	uri: statsReal.uid,
						        info: { 
						        	name: imgTest.name,      
						        	src: nestedSrc+src,
						        	date: statsReal.date,
						        	thumb: 'thumb?'+nestedSrc+src,
						        	type: 'img'
						   	    }  
							});
						}
						
					}
						
				} else 	if(vidTest) {
					uid++;
										
					if(!search) {     
								
						arrayput.push({ 
						    uid: uid ,   
						    uri: statsReal.uid,
						    info: { 
						    	name: vidTest.name,      
						    	src: nestedSrc+src,
						    	date: statsReal.date,
						    	type: 'vid'
						    }  
						});	
					
					
					} else {
										
						if(search === 's:ALL' || searchRegExp.test(String(vidTest.src)) ) {
						
							arrayput.push({ 
						        uid: uid , 
						       	uri: statsReal.uid,
						        info: { 
						        	name: vidTest.name,      
						        	src: nestedSrc+src,
						        	date: statsReal.date,
						        	type: 'vid'
						   	    }  
							});
						}
						
					}
						
				} else 	if(audioTest) {
					uid++;
										
					if(!search) {     
								
						arrayput.push({ 
						    uid: uid ,   
						    uri: statsReal.uid,
						    info: { 
						    	name: audioTest.name,      
						    	src: nestedSrc+src,
						    	date: statsReal.date,
						    	type: 'audio'
						    }  
						});	
					
					
					} else {
										
						if(search === 's:ALL' || searchRegExp.test(String(audioTest.src)) ) {
						
							arrayput.push({ 
						        uid: uid , 
						       	uri: statsReal.uid,
						        info: { 
						        	name: audioTest.name,      
						        	src: nestedSrc+src,
						        	date: statsReal.date,
						        	type: 'audio'
						   	    }  
							});
						}
						
					}
						
				} else if(textTest) {
					
					readyCounter++;
					
					var textRequest = {
						param : {src:nestedSrc+src,data:true},
						info : {},
						ready: function() {
							uid++;
							
							if(!search) {
																
								arrayput.push({ 
					   				 uid: uid ,   
					   				 uri: statsReal.uid,
					   			 	 info: { 
					    				name: textTest.name,      
					    				src:  nestedSrc+src,
					    				date: statsReal.date,
					    				type: 'txt',
					    				text: String(textRequest.info.data).slice(0,Number(config.textLength))
								    }  
								});	
								
								if(String(textRequest.info.data).length < Number(config.textLength)) {
									
									arrayput[arrayput.length-1].info.fullText = String(textRequest.info.data);
									
								}

								
								
							} else {
							
								if(search === 's:ALL' || searchRegExp.test( String(String(textTest.name)+' '+String(textRequest.info.data)) ) ) {
								
									arrayput.push({ 
					   					 uid: uid ,
					   					 uri: statsReal.uid,
					   			 		 info: { 
					    					name: textTest.name,      
					    					src:  nestedSrc+src,
					    					date: statsReal.date,
					    					type: 'txt',
					    					text: String(textRequest.info.data).slice(0,Number(config.textLength))
								    	}  
									});	
									
									
									if(String(textRequest.info.data).length < Number(config.textLength)) {
									
										arrayput[arrayput.length-1].info.fullText = String(textRequest.info.data);
									
									}

									
						
								}
								
							}		
						
							readyCounter--;
							if(readyCounter === 0) {
								gNreq.ready();
							}			
						}
					}
					
					app.fs.file(textRequest);

				} else if(src.split('.').length > 1 && !imgTest) {		
					uid++;
					
					if(!search) {
					
						arrayput.push({ 
			   				 uid: uid ,   
			   				 uri: statsReal.uid,
			   			 	 info: { 
			    				name: src.split('.')[0], 
			    				filename: src,     
			    				src:  nestedSrc+src,
			    				date: statsReal.date,
			    				type: 'file',
			    		    }  
			    		});	
			    	
			    	} else {
			    	
			    		if(search === 's:ALL' ||  searchRegExp.test(src) ) {
			    		
			    			arrayput.push({ 
			   					 uid: uid ,
			   					 uri: statsReal.uid,
			   				 	 info: { 
			    					name: src.split('.')[0], 
			    					filename: src,     
			    					src:  nestedSrc+src,
			    					date: statsReal.date,
			    					type: 'file',
			    			    }  
			    			});	
			    		}
			    	}
			    	
				} else if(!imgTest) {
				
					
					if(maxlevel == -1 || level < maxlevel) {

						
				
					readyCounter++;
					var folderRequest = {
						param : {src:nestedSrc+src,data:true,dirlist:true,stats:true},
						info : {children : []},
						ready: function() {
							
							if( (folderRequest.info.data && folderRequest.info.data.length)  ) {
							
								
									getNestedItems(
										folderRequest.info.data,
										folderRequest.info.children,
										nestedSrc+src+'/',
										level++,
										{ready: function() {   
											readyCounter--;		
											uid++;
																					
											if(!search) {
 											
												arrayput.push({ 
										   			uid: uid ,   
										   			uri: statsReal.uid,
										   			 info: { 
										    				name: src,      
										    				src:  nestedSrc+src,
										    				date: statsReal.date,
										    				type: 'folder',
										    				children: folderRequest.info.children
													    }  
													});	
												
											} else {
												
												if( search === 's:ALL' || folderRequest.info.children.length > 0 ||  searchRegExp.test(String(src)) ) {
												
													arrayput.push({ 
										   			uid: uid ,   
										   			uri: statsReal.uid,
						
										   			 info: { 
										    				name: src,      
										    				src:  nestedSrc+src,
										    				date: statsReal.date,
										    				type: 'folder',
										    				children: folderRequest.info.children
													    }  
													});	
													
						
												}
											
											}	
												if(readyCounter === 0) {
													gNreq.ready();
												}   
											}
										},folderRequest.info.stats);
									
									
										
									
								} else { 		
									readyCounter--;	
									if(readyCounter === 0) {
										gNreq.ready();
									}   	    
								 }						
							}
						}				
					app.fs.file(folderRequest);	
					
					} else {
						
						
						
						arrayput.push({ 
										   			uid: uid ,   
										   			uri: statsReal.uid,
										   			 info: { 
										    				name: src,      
										    				src:  nestedSrc+src,
										    				date: statsReal.date,
										    				type: 'folder',
										    				children: []
													    }  
													});	
						
					
					
					}			
				}	
			});
			
			if(	readyCounter===0) {	gNreq.ready(); }
			
		} else {
			request.info.res.end(JSON.stringify({data:array}));
		}
		
		} 
				
	}
	
	//=================================================
	
	
	