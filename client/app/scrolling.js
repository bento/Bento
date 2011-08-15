function initScroll(method) {

	function displaywheel(e){
    	var evt=window.event || e //equalize event object
    	var delta=evt.detail? evt.detail*(-120) : evt.wheelDelta //check for detail first so Opera uses that instead of wheelDelta
    	method(delta);
	}
 
	var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
 
	if(document.attachEvent)  { 	 //if IE (and Opera depending on user setting)
    	 document.attachEvent("on"+mousewheelevt, displaywheel)
    }
	else if(document.addEventListener) { 
		 //WC3 browsers
    	document.addEventListener(mousewheelevt, displaywheel, false)
	}

}	


