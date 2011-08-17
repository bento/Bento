

//BUGS
//search URI is nog niet kosher! check - srch all dan fotos DONE!

//voor de server als er een nieuwe file met %20 in de naam komt vervang %20 met spatie 
//Images nog niet altijd goed!!! pak de real h+w !
//Maak een cleanup voor resized images

//bug nog geen goede re-arrange bij resizen DONE!

//params op 0 is undefined moet nog gefixed worden DONE!

//Fix level loading op de server! 


//VIEWCHAIN



//- overview stap 2 (when's)
//- nested stappen pak op default overview stap 2 of later
// overview filter op files (show)
// - > how to detect? make comparison? nested - > x / y / -< check of viewChain[1]; of viewChain[0] == submenu && viewChain[2] voor y

//- dedicated stap 2 (when's)
//- nested stappen pak op default dedicated stap 2 of later

//fix dat bij hub.js je niet per see een array moet maken maar dta een object met when ook werkt!

//close btn knallen - fix met search


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
		hubH: 125,
		viewChain: [ 
			{ 
				view: 'overview' , 
				context: 'self'  
			}  
		]
	},
	
	{
		fotos: 
	    {
	    	w:125,
	    	h:125,
	    	marginW: 0 ,
			marginH: 0 ,
			css:'fotoClass',
			hSpacing: 50,
			padding: 0,
			viewChain: [
	    	{
	    		view: 'overview',
	    		context: 'self',
	    		show: 'img'
	    	}
	    	
	    	]

		} , 
		search: 
	    {
	    	w:170,
	    	h:170,
	    } ,
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
	    		[{   
	    				when: 'folder', 
	    				view: 'overview' ,
	    				context: 'self' 	    			
	    		}]

	   
	    		
	    			
	    	]

	    }
	});
			
});



/*

	viewChain:
	
	'overview'
	'dedicated'
	'submenu'
	'overview-child'
	'dedicate-child'
	'submenu-child'
	
	'-repeat'
	
	
	viewChain: [ 'submenu' , overview-child , 'dedicated' , 'dedicated-child' ]
	
	viewChain: [ dedicated , overview-child , dedicated, dedicated-child ]
		
	viewChain: [ dedicated , overview-child , dedicated, dedicated-child, '-repeat' ]

	viewChain: [ [ '(folder) overview' , 'dedicated -folder' ] ,  (folder) overview-child , '-repeat' ]
	
	
	viewChain: [
				{view: 'overview',
				 match: 'folder' }
				, [
					{ match: '!folder' , 
					  view: 'dedicated',
					 },
					 
					 { 
					   match: 'folder'
					   view: 'dedicated'
					   flag: 'child'
					 }
				  ] 
			   ]
	
	
	
	overview -text|img
	
	(folder) overview
	
	(img|text|file|video|audio) dedicated -folder => dedicated -folder
	
	(folder) overview-child 
	
	
	// FINAL:
	
	
	viewchain: 	[
	
	
	extra submenu:
	
	
					{	// viewchain[0] is an Object, describing the behavior for the click on the 'root' folder
						view : "overview" OR "dedicated" OR "submenu", 	// not present (default): "overview"
						context : "parent" OR "self",		// not present (default): "self"
						show : Filestring				// a string excluding or including certain file types // not present (default): "all"
					},
					
					[	// viewchain[1] can be an Array, containing behavior Objects representing different UI behavior based on the type of child that is clicked
						{
							if : Filestring, // e.g. "jpg|png|gif"
							view : dedicated
							context : self
						},
						{
							if : Filestring, // e.g. "folder"
							view : overview
						}
					]
					
				]
		

*/

/* fotos : [

			w:1330,
		h:315,
		marginW: 140 ,
		marginH: 140 ,
		
		css penis
		

		]
		
		
		
		*/