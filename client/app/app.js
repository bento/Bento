 $(this).ready( function() {
	
	setTimeout(function() {
		$('.typekit-badge').empty().remove();
	},10);
	
	var app = new slideSite();
	
	app.init({
		menu: '/',
		content:'content?',
		contentDir:'content',
		search: 'search?',
		w:330,
		h:315,
		marginW: 40 ,
		marginH: 40 ,
		bg: true,
		winMarginBot: 50,
		imgCollectionH : 125,
		showMenu: true,
		home: 'fotos',
		menuMarginW:20,
		titleH:35,
		ImgTitle:false,
		textCollumW: 480,
		dTextCollumMargin: 94,
		hubH: 130,
		hMarginW: 20,
		hCurrentMargin: -10,
		hH:90,
		hideBars: 'dedicated',
		dImgSpacing:20 ,
		dTextSpacing:-1,
		viewChain: [ 
			{ 
				view: 'overview' , 
				context: 'self'
			}, 
			{   
	    		when: 'folder', 
	    		view: 'overview' ,
	    		context: 'self'
	    	}
		]
	},
	
	{
	
	albums:
	{
	viewChain: [
	
		{view:'overview',
		 show: 'folder'
		} ,
		
		
			{
				when: 'folder',
				view:'submenu',
				submenu: 'dedicated', 
				show: 'img'
			}
			
			
		,
		
			{
			    view: 'dedicated',
			    context: 'parent',
			    show: 'img'
	    	}
			
	]
	
	},
	
		fotos: 
	    {
	    	w:125,
	    	h:125,
	    	marginW: 40 ,
			marginH: 40 ,
			css:'fotoClass',
			hSpacing: 50,
			padding: 0,
			hideBars: 'all',
			viewChain: [
			
			
				{
					view: 'submenu' ,
	    			context: 'self' ,
	    			submenu: 'overview'
	    		} ,	
			
			
	    		{
	    			view: 'dedicated',
	    			context: 'parent',
	    			show: 'img'
	    		}
	    	]
		} , 
		search: 
	    {
	    	w:120,
	    	h:120,
	    	hSpacing: 0
	    
	    } ,
	    'Ramon/square': 
	    { 
	     	w:505,
	     	h:20,
	     	css:'fotoClass',
			viewChain: [
	   			{
	   				view: 'overview' ,
	    			context: 'self' ,
	    			show: 'img'
	    		}
	    	]	
	    }
	    ,
		Ramon: 
	    {
	    	w:215,
	    	h:215,
	    	marginW: 21 ,
			marginH: 21 ,
			hSpacing: 0,
			padding: 0,
			viewChain: [
	    		{    
	    			view: 'submenu' ,
	    			context: 'self' ,
	    			show: 'folder|img|txt',
	    			submenu: 'dedicated'
	    		}, 
	    		[
	    			{   
	    				when: 'folder', 
	    				view: 'overview' ,
	    				context: 'self'
	    			}
	    		,
	    			{   
	    				when: 'txt', 
	    				view: 'overview' ,
	    				context: 'parent' 	    			
	    			}
	    		,
	    			{
	    				when: 'img',
	    				view: 'dedicated',
	    				context: 'parent',
	    				show: 'img'
	    			}
	    		]		
	    	] 


	    } ,
	    ale:
	    {
	    	css:'nesting4gibbbens',
	    	viewChain: [
	    		{    
	    			view: 'submenu' ,
	    			context: 'self' ,
	    			show: 'folder' 
	    		},
	    		
	    		{   
	    				view: 'overview' ,
	    				context: 'self' 	    			
	    		}
				
	   			
	    		
	    			
	    	]

	    }
	});
			
});