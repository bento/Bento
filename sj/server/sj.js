
var requests = require('./modules/requests.js'),
	responses = require('./modules/responses.js'),
	models = require('./modules/models.js'),
	files = require('./modules/files.js'),
	sockets = require('./modules/sockets.js'),
	output = require('./modules/output.js'),
 	http = require('http'),
 	https = require('https'),
 	im = require('./modules/images.js'),
 	utils = require('./modules/utils.js'),
 	server;
 	
	exports.req = requests;
	exports.output = output;
	exports.fs = files;	
	exports.im = im;
	exports.utils = utils;
	exports.init = function(props) {
	
		if(props === undefined) {
			props = {};
		}
		
		if(props.protocol === undefined) {
			props.protocol = 'http';
		}
	
		if(props.port === undefined) {
			if(props.protocol === 'https') {
				props.port = 443; 
			} else {
				props.port = 80;
			}	
		}
	
		if(props.test === true) {
			output.init();
		} 
	
		if(props.protocol === 'https')  {
			output.text('starting sj-https server...');
			server = https.createServer( function(req,res) {  exports.req.request(req,res) }  );
			server.listen(props.port);
		} else {
			output.text('starting sj-http server...');
			server = http.createServer( function(req,res) {  exports.req.request(req,res); } );	
			server.listen(props.port);
		}
		
	}
	
