	var files = require('./files.js');

	exports.file = {test : function(src,type) {
		
		var srcArray = src.split('.'),
			regExp = new RegExp(type,'i'),
			output;
		
			if(  regExp.test(String(srcArray[srcArray.length-1]))   ) {
			
				var name;
						
				if(srcArray.length===2) {
					name = srcArray.slice(0,srcArray.length-1).join('')
				} else {
					name = srcArray.slice(0,srcArray.length-2).join('')
				}
			
				output = {
					name:  name,
					src: src ,
					type: srcArray[srcArray.length-1],
				};	
			}	
			return output;	
		}
	}
	

	exports.build = function(output,closing,startDir,init) {
		var readycounter = 0,
			js = '\n<script type="text/javascript">',
			css = '',
			body = '',
			head = '';
			
		getfolders(startDir,'folder')
		function getfolders(folder,type) {
			readycounter++;
			var scriptloader = {
				param : {src:folder,data:true,dirlist:true},
				info : {},
				ready: function() {
						if(type === 'folder') {
							scriptloader.info.data.forEach(function(src) {
	
								if(src.split('.js').length > 1) {
									getfolders(folder+src,'js');
								} else if(src.split('.css').length > 1) {
									getfolders(folder+src,'css');
								} else if(src.split('.body').length > 1 || src.split('.html').length > 1 || src.split('.txt').length > 1) {
									getfolders(folder+src,'body');
								} else if(src.split('.head').length > 1) {
									getfolders(folder+src,'head');
								} else if(src.indexOf('.') < 0 ){
									getfolders(folder+src+'/','folder');
								}
							
							});	
							
						} else if(type === 'js') {
							js+= '\n'+scriptloader.info.data+'\n';							
						} else if(type === 'css') {
							css+= '\n<style>'+scriptloader.info.data+'</style>';
						} else if(type === 'body') {
							body += '\n'+scriptloader.info.data;
						} else if(type === 'head') {
							head += '\n'+scriptloader.info.data;
						}
						
					readycounter--;
					if(readycounter===0) {
					
						output += head + js+'\n</script>' + css + '</head></body>' + body;	
						output+= closing;
					   // output = output.replace(/\n/g,'');
					    init(output);
					} 
				}
			}
			files.file(scriptloader);		
		}
	}