var im = require('imagemagick'),
	fs = require('fs'),
	output = require('./output.js');

	exports.modify = function(req,src,data) {

		im.identify({data:src}, function(err, img){
	      if (err) {
	      	if(data) {		
				req.info.data = {name: "JSONRequestError", message: "cannot process image"};	
			} else {		
				req.info.res.end(JSON.stringify({name: "JSONRequestError", message: "cannot process image"}));
			}
	      	req.ready();
	      } else if(img) {
				var destImgParams,
					tW,
					tH,
					dest,
					format,
					sW = Number(req.param.img.w),
					sH = Number(req.param.img.h),
					crop = '';
				
				if(req.param.img.crop) {
											
					crop = 'CROPPED';						
												
					if(img.width < img.height ) {
					
						//console.log('yes');		
					
								tH = img.height*(req.param.img.w/img.width);
								tW = Number(req.param.img.w);
							
								if(tH < req.param.img.h) {
									tW = img.width*(img.height/req.param.img.h);
									tH = req.param.img.h;	
								}
									
							} else if(img.width == img.height) {
							
								tH = req.param.img.h;
								tW = req.param.img.w;
								
								if(req.param.img.h < req.param.img.w) {
							
								tH = img.height*(req.param.img.w/img.width);
								tW = req.param.img.w;

								} else {
								
								
								
								tW = img.width*(req.param.img.h/img.height);
								tH = req.param.img.h;
								
								
								}
								
							
							} else {
							
								tW = img.width*(req.param.img.h/img.height);
								tH = req.param.img.h;
								
								if(tW < req.param.img.w) {
										tH = img.height*(img.width/req.param.img.w);
										tW = req.param.img.w;
								}
							}
				
				} else {
					
					if( req.param.img.w > 0 && req.param.img.h > 0 ) {
						
						if(img.width > img.height ) {
							
							tH = img.height*(req.param.img.w/img.width);
							tW = Number(req.param.img.w);
						
							if(tH > req.param.img.h) {
								tW = img.width*(req.param.img.h/img.height);
								tH = req.param.img.h;	
							}
								
						} else if(img.width === img.height) {
						
							tH = req.param.img.h;
							tW = req.param.img.w;
						
						} else {
						
							tW = img.width*(req.param.img.h/img.height);
							tH = req.param.img.h;
							
							if(tW > req.param.img.w) {
									tH = img.height*(req.param.img.w/img.width);
									tW = req.param.img.w;
							}
						}
						
					} else if( req.param.img.w > 0  ) {
					
						tH = img.height*(req.param.img.w/img.width);
						tW = req.param.img.w;
					
					} else {
						
						tW = img.width*(req.param.img.h/img.height);
						tH = req.param.img.h;
						
					}	
				
				}
				
				if(req.param.img.format) {
					format = req.param.img.format;
				} else {
					format = img.format;
				}
				
				destImgParams = {srcData:src,height:tH,width:tW,format:format};
			
				//console.log(parseInt(sW)+' '+parseInt(sH))
				
				if(req.param.img.dest) {
					dest = req.param.img.dest+'/'+req.uparams[req.uparams.length-1]+'_IM34_RESIZED'+crop+tW+tH+sW+sH+'.'+format;
				} else {
					dest = req.uparams.join('/')+'_IM34_RESIZED'+crop+tW+tH+sW+sH+'.'+format;
				}
	    		im.identify( dest , function(err, img_nest){					
	    			if(err) {	
	    				
	    				//console.log(parseInt(sW)+' '+parseInt(sH))
	
	    				//console.log('yes '+destImgParams.width+'  '+destImgParams.height);		

	    			
		     			im.resize(destImgParams, function(err, stdout, stderr) {					
					
							
							//console.log(parseInt(sW)+' '+parseInt(sH))

					
							fs.writeFile( dest , stdout, 'binary', function(err) {
								if(data) {
									
									if(req.param.img.crop) {
										
									console.log('cropping '+dest+'  size: W:'+parseInt(sW)+' H:'+parseInt(sH)+'  TEMPsize: W:'+parseInt(tW)+' H:'+parseInt(tH))
									
										if(tH > 4*tW || tH > 2500) {
										
										tH = sH;
										
										}
										 										
									  im.crop({
      										srcPath: dest,
     										dstPath: dest,
     										width: tW,
     										height: tH,

      										customArgs: [
      										'-gravity', 'Center',
											'-crop', ''+sW + 'x' + sH + '+0+0',
          										'+repage'
      										
      										]

    								}, function(err, stdout, stderr){

													fs.readFile( dest ,  function(err,resizedimg) {
														req.info.data = resizedimg;
														req.info.imgdest = dest;
														req.ready();
													});	

    									
    									});

									} else {
								
									fs.readFile( dest ,  function(err,resizedimg) {
										req.info.data = resizedimg;
										req.info.imgdest = dest;
										req.ready();
									});	
									
									}
									
								} else {
									fs.readFile( dest ,  function(err,resizedimg) {
										req.info.res.end(resizedimg);
										req.info.imgdest = dest;
										req.ready();
									});
								}
							});	
						});	
					}		
					else {
				    	//output.text('found img, no resize!');
				    	if(data) {
				    	
				    		fs.readFile( dest ,  function(err,resizedimg) {
				    			req.info.data = resizedimg;
				    			req.info.imgdest = dest;
				    			req.ready();
				    		});
				   
				    	} else {
				    		fs.readFile( dest ,  function(err,resizedimg) {
				    			req.info.res.end(resizedimg);
				    			req.info.imgdest = dest;
				    			req.ready();
				    		});
				    	}
				    }
				});	
	      	}
	    });	
	}
	
	exports.test = function(src) {
	
		var srcArray = src.split('.'),
			output;
			
			if(/jpe?g|png|gif|tiff/i.test(String(srcArray[srcArray.length-1]))   ) {
			
				var name,
					resized;
						
				if(srcArray.length===2) {
					name = srcArray.slice(0,srcArray.length-1).join('')
				} else {
					name = srcArray.slice(0,srcArray.length-2).join('')
				}
				
				if(  /_IM34_RESIZED/.test(String(src)) ) {
					output = {
						name:  name,
						src: src ,
						type: srcArray[srcArray.length-1],
						resized: true
					};				
				} else {
					output = {
						name:  name,
						src: src ,
						type: srcArray[srcArray.length-1],
					};				
				}
					
			}
			
		return output;
	}
	
	
	
	