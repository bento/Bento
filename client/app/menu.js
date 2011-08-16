function showMenu(params) {
	
		$('<div id="slideSiteTopBarMenu" class="slideSiteTopBarMenu"></div>' ).appendTo($('#slideSiteMenu'));
		
		$('#slideSiteTopBarMenu').css({
			position:'absolute',
			left:$(window).width()-300,
			cursor: 'hand'
		});			
		
		var cnt = 0;
		var totalw = 0;
		
		//params.winMarginBot
		params.menuArray.forEach(function(obj) {
			
			
			var custom = false;	
			//<a href="/#/'+obj.info.name+'/">'	
										
			$('<div id="slideSiteTopBarMenu'+cnt+'"  class="menuItem"> <div id="slideSiteTopBarMenuNest'+cnt+'">  '+obj.info.name+' </div> </div>' ).appendTo($('#slideSiteTopBarMenu'));
							
			$('#slideSiteTopBarMenu'+cnt).css({
				position:'absolute',
				left:totalw,
				height: params.winMarginBot,
				cursor: 'hand'
			});		

			totalw+=$('#slideSiteTopBarMenu'+cnt).width()+params.menuMarginW;

			$('#slideSiteTopBarMenu'+cnt).css({
				width: $('#slideSiteTopBarMenu'+cnt).width()
			});	

			$('#slideSiteTopBarMenuNest'+cnt).css({
				position:'absolute',
				top: 0.5*(params.winMarginBot-$('#slideSiteTopBarMenuNest'+cnt).height()-5),
				cursor: 'hand'

			});	
			
			//console.log('menu item: '+obj.info.name+' --> ',obj);
			
			for (var customObj in params.custom) {
							
							
				if(customObj === obj.info.name) {
								
								
					console.log('menu custom : '+obj.info.name+' --> ',customObj);
					
					
					
					custom = true;
				
				
				}
				
			
			}

			$('#slideSiteTopBarMenu'+cnt).click(function() {	
				window.location.hash = '#/'+obj.info.name+'/';
			});
				
			cnt++;
		});
		
		params.totalwMenu = totalw;
			
		$('#slideSiteTopBarMenu').css({
			left:$(window).width()-totalw	
		});	
		
		
					
}

