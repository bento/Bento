var sys = require('sys'),
	enabled = false;
	
	exports.init = function() {
		enabled = true;
	}
	
	exports.text = function(param) {
		if(enabled === true) { 
			console.log('================================================');
			console.log(param);
			console.log('================================================');
		}
	}
	
	exports.error = function(param) {
		if(enabled === true) { 
			console.log('ERROR: '+param);
		}
	} 
	
	exports.method = function(name,param) {
		if(enabled === true) { 
			console.log('FUNCTION: '+name);
			console.log(param);
			console.log('');
		}
	} 
