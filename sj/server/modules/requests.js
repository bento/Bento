var requests = [],
	uid = 0, 
	output = require('./output.js');
	
	//=================PUBLIC FUNCTIONS=================

	exports.error = function(req) { output.error('no valid requests for '+req.url+' within request '+req.uid); };
	
	exports.add = function(req, props) {
		if(props === undefined) { props = {};}
		if(props.method === undefined) { props.method = 'GET';}
		requests.push( [ req , props ] );
	}
	
	exports.remove = function(req,props) {
		requests = removerequest(req,props);
	}
	
	exports.request = function(req,res) {
		uid++;		
		var strip =	req.url.split('%20');
		req.url = strip.join(' ');	
		
		//output.text('new request: '+req.url)
		
		var req_info = {
			req:req,
			uid:uid,
			url:req.url,
			valid:0,
			length:requests.length,
			method:req.method,
			regstr:'',
			res:res
		};
		
		execreq(0);
		
		function execreq(i) {    
			
			var nestreq_info = { 
			    info:req_info,
			    uid:i,
			    uparams:[],
			    valid:true,
			    ready:function(){execreq(i+1)},
			}
				
			if(i < req_info.length) {
				if(requests[i][1].param !== undefined ) { nestreq_info.param = requests[i][1].param }
				else { nestreq_info.param = {}; }
				
				if(requests[i][1].method !== req_info.method ) { nestreq_info.valid = false; }
				
				if(requests[i][1].uri !== undefined) { 
					nestreq_info.regex=new RegExp(req_info.regstr+'^'+requests[i][1].uri );			
	 				req_info.regstr += '(?!^'+requests[i][1].uri+')';
					nestreq_info.valid = nestreq_info.regex.test(String(req.url));
					if(requests[i][1].replace === undefined ) { 
						nestreq_info.uparams = String(req.url).replace(nestreq_info.regex,'').split(requests[i][1].path);
					} else {
						nestreq_info.uparams = String(req.url).replace(requests[i][1].replace,'').split(requests[i][1].path);
					}
					nestreq_info.path = requests[i][1].path;
				}
				
				if(requests[i][1].url !== undefined ) {	
					req_info.regstr += '(?!^'+requests[i][1].url+')';
					if(String(req.url) === requests[i][1].url || String(req.url).slice(1) === requests[i][1].url ) {
						nestreq_info.valid = true;
					} else {
						nestreq_info.valid = false;
					}
				}
						
				if(nestreq_info.valid === true) {
					req_info.valid++;
					requests[i][0](nestreq_info);
				} else {
					nestreq_info.ready();
				}		
			}
			
			if(req_info.valid===0 && i===req_info.length-1) {
				exports.error(req_info);
 			}
		}	
	}
	
	//=================PRIVATE FUNCTIONS=================
	
	function removerequest(method,props,arr) {
		var piv = -1;
		output.method('removerequest','start '+arr.length);
		for(var i = 0 ; i < arr.length ; i ++) {
				if( arr[i][0] === method && ( arr[i][1] === props || props === undefined ) ) {					
					if(i < arr.length) {
						arr[i] = arr[i+1];
						piv = i;
					} else {
						arr.pop();
					}	
				}
				if(i > piv && piv != -1) {
					if(i < arr.length-1) {
						arr[i] = arr[i+1]
					} else {
						arr.pop();
					}
					
				}
		}
		output.method('removerequest','end '+arr.length);
		return arr;
	}