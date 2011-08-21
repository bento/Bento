
function replaceCClass(divid, oldclass, newclass){
	$(divid).removeClass(function() {
		var cssclasses = $(this).attr('class').split(' ');
		for(n in cssclasses){
			if(cssclasses[n].match(oldclass)){
				return cssclasses[n]
			}
		}
		return null;
	});
	$(divid).addClass(newclass);
}


/*
String.prototype.width = function(font) {
  var f = font || '12px arial',
      o = $('<div>' + this + '</div>')
            .css({'position': 'absolute', 'float': 'left', 'visibility': 'hidden', 'font': f})
            .appendTo($('body')),
      w = o.width();

  o.remove();

  return w;
}
*/







/* END OF FOILERT! */