var hub = false;
var submenu = '';

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
			
			
			var custom ;	
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
								
					if(params.custom[customObj].viewChain) {
						
						console.log('menu custom : '+obj.info.name+' --> ',params.custom[customObj].viewChain);
						custom = params.custom[customObj].viewChain;

					}
					
				
				
				}
				
			
			}

			if(custom) {
				
				if(custom[0].view === 'submenu') {
					
					if(custom[0].submenu) {
					
					
						params.gotoCategory('level/0/'+obj.info.name,0,false,initSubMenu,[  cnt , obj , custom[0].submenu ]); 

					
					} else {
						
						
						params.gotoCategory('level/0/'+obj.info.name,0,false,initSubMenu,[  cnt , obj ]); 

					
					}
					
					
				} else if(custom[0].view === 'overview') {
	
					$('#slideSiteTopBarMenu'+cnt).click(function() {
					
						if(hub === 'submenu') {
							
							closeSubMenu()
						
						}
						
						window.location.hash = '#/'+obj.info.name+'/';
					});
					
				} else if(custom[0].view === 'dedicated') {
	
										
	
					$('#slideSiteTopBarMenu'+cnt).click(function() {
					
							if(hub === 'submenu') {
							
							closeSubMenu()
						
						}

						window.location.hash = '#/p/'+obj.info.name+'/';
					});
					
				}

				
				function initSubMenu(array,passon) {
				
					//alert('AAAA');
						
					$('#slideSiteTopBarMenu'+passon[0]).click(function() {
				   	 	openSubMenu(passon[1].info.name,array,custom);
				   	 	//window.location.hash = '#/'+passon[1].info.name+'/';
				   	 	if(passon[2]) {
				   	 		
				   	 		setTimeout(function() {
				   	 	
							if(passon[2] == 'dedicated') {
								window.location.hash = '#/p/'+passon[1].info.name+'/';
							} else if(passon[2] == 'overview') {
								window.location.hash = '#/'+passon[1].info.name+'/';
							}
							
							},420);
						}
				   	 	
				   	 	
					});
					
					
					
					
				}
				
				
			} else {

				$('#slideSiteTopBarMenu'+cnt).click(function() {	
				
					if(hub === 'submenu') {
							
							closeSubMenu()
						
						}
				
				
					window.location.hash = '#/'+obj.info.name+'/';
				});
			
			}
				
			cnt++;
		});
		
		params.totalwMenu = totalw;
			
		$('#slideSiteTopBarMenu').css({
			left:$(window).width()-totalw	
		});	
		
		
					
}

