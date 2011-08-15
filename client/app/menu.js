function showMenu(params) {
	
		$('<div id="slideSiteTopBarMenu" class="slideSiteTopBarMenu"></div>' ).appendTo($('#slideSiteMenu'));
		
		$('#slideSiteTopBarMenu').css({
			position:'absolute',
			left:$(window).width()-300
		});			
		
		var cnt = 0;
		var totalw = 0;
		
		//params.winMarginBot
		params.menuArray.forEach(function(obj) {
					
			$('<div id="slideSiteTopBarMenu'+cnt+'"  class="slideSiteTopBarItem"> <a href="/#/'+obj.info.name+'/">'+obj.info.name+'</a> </div>' ).appendTo($('#slideSiteTopBarMenu'));
							
			$('#slideSiteTopBarMenu'+cnt).css({
				position:'absolute',
				left:totalw,
				height: params.winMarginBot
			});		
			totalw+=$('#slideSiteTopBarMenu'+cnt).width()+params.menuMarginW;
			cnt++;

		});
		
		params.totalwMenu = totalw;
			
		$('#slideSiteTopBarMenu').css({
			left:$(window).width()-totalw	
		});	
				
}