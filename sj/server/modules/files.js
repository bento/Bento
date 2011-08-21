var	fs = require('fs'),
	output = require('./output.js'),
	im = require('./images.js'),
	mime = require('mime'),
	utils = require('./utils.js'),
	freezer = false;
	
	exports.erase = function(req) {
		if(req.param.src) {
			fs.unlink(req.param.src, function (err) { 
				req.ready();
			});
		}
	}
		
	exports.file = function(req) {
											
			if(req.param.src) {
				fs.readFile(req.param.src, function (err,data) { 
					if(data  === undefined && req.param.dirlist) {	
						fs.readdir(req.param.src, function (err,data) { showfiles(err,data,req.param.src); }); 
					} else {						
						write_file(err,data); 	
					}
				 });
			} else if(req.param.dir) {
				if(req.uparams[req.uparams.length-1].indexOf('?') > -1 ) {
					var strarr = req.uparams[req.uparams.length-1].split('?'); 
					req.uparams[req.uparams.length-1] = strarr[0];
				}
				fs.readFile(req.param.dir+'/'+req.uparams.join('/'), function (err,data) { 	
					if(data === undefined && req.param.dirlist !== false) {	
						fs.readdir(req.param.dir+'/'+req.uparams.join('/'), function (err,data) { showfiles(err,data,req.param.dir+'/'+req.uparams.join('/')); }); 
					} else {	
						write_file(err,data); 
					}
				 })
			} else {
				if(req.uparams[req.uparams.length-1].indexOf('?') > -1 ) {
					var strarr = req.uparams[req.uparams.length-1].split('?'); 
					req.uparams[req.uparams.length-1] = strarr[0];
				}
				fs.readFile(req.uparams.join('/'), function (err,data) { 
					if(data  === undefined && req.param.dirlist) {	
						fs.readdir(req.uparams.join('/'), function (err,data) { showfiles(err,data,req.uparams.join('/')); }); 
					} else {
						write_file(err,data); 
					}	
				});
			}
				
			function write_file(err,data) {		

					if(req.param.data && data) {
						if(req.param.img && im.test(req.uparams[req.uparams.length-1])) {
							im.modify(req,data,true);
						} else {
							if(req.uparams){
								req.info.mime = mime.lookup(req.uparams.join('/'));
							}else{
								req.info.mime = mime.lookup(req.param.src);
							}
							req.info.data = data;
							req.ready();	
						}
					} else if(data) {
						if(req.param.img && im.test(req.uparams[req.uparams.length-1])) {
							im.modify(req,data);
						} else {
							
							if(utils.file.test( req.uparams.join('/'), 'mpg|mp4|m4v|mpeg|ogv|webm|mov' ) ){
							
								var range = req.info.req.headers.range, 
								    total = data.length, 
								    parts = range.split('bytes=').join('').split("-"),
								    partialstart = parts[0],
								    partialend = parts[1],
								    start = parseInt(partialstart, 10),
								    end = partialend ? parseInt(partialend, 10) : total-1,
								    chunksize = (end-start)+1;
								    
								req.info.res.writeHead(206, { 'Transfer-Encoding':'chunked', 
								    						  'Content-Range': 'bytes ' + start + '-'+ end + '/' + total, 
								    						  'Accept-Ranges': 'bytes', 
								    						  'Content-Length': chunksize, 
								    						  'Content-Type': mime.lookup(req.uparams.join('/')), 
								    						  'Connection':'keep-alive'});
								    						   
								req.info.res.end(data, 'binary');

								//console.log()
								
								console.log('range:|',range,'| total:|',total,'| parts:|',parts,'| partialstart:|',partialstart,'| partialend:|',partialend,'| start:|',start,'| end:|',end,'| chunksize:|',chunksize)	
								
								
							}else{
								req.info.res.writeHead(200, {"Content-Type": mime.lookup(req.uparams.join('/'))})
								req.info.res.end(data);
								req.ready();								
							}
	
						}
					} 
					if(err) {
						if(req.param.data) {
							req.info.data = {name: "JSONRequestError", message: "cannot find file or folder"};
						} else {
							req.info.res.end(JSON.stringify({name: "JSONRequestError", message: "cannot find file or folder"}));
						}
						
						req.ready();	
					}
					
					function streamData(sdata){
						
					}
					
			}
			
			
			
	    	function showfiles(err,files,dir) {
	    		if(files != undefined) {	
	    			if(req.param.data) {
	    			
	    				if(req.param.stats) {
	    					var rdyCnt = 0
	    					, filesStats = {};
	    					
	    					files.forEach(function(file) {
	    						fs.stat(dir+'/'+file,function(err,stats) {
	    							filesStats[String(file)] = stats;
	    							rdyCnt++;
	    							if(rdyCnt === files.length) {
	    								req.info.data=files;
	    								req.info.stats=filesStats;
	    								req.ready();
	    							}
	    								    							
	    						});	
	    					});
	    					
	    				} else {
							req.info.data=files;
							req.ready();	
						}
						
					} else {
    					req.info.res.end(JSON.stringify({data:files}));
    					
    					req.ready();	

   					}	
				} else {	
						if(req.param.data) {
							req.info.data = {name: "JSONRequestError", message: "cannot find file or folder"};
						} else {
							req.info.res.end(JSON.stringify({name: "JSONRequestError", message: "cannot find file or folder"}));
						}	
						
						req.ready();	
			
				} 
				
	    	}					
	}