

//BUGS
//search URI is nog niet kosher! check - srch all dan fotos DONE!

//voor de server als er een nieuwe file met %20 in de naam komt vervang %20 met spatie 
//Images nog niet altijd goed!!! pak de real h+w !
//Maak een cleanup voor resized images

//bug nog geen goede re-arrange bij resizen DONE!

//params op 0 is undefined moet nog gefixed worden DONE!

//Fix level loading op de server! 


$(this).ready( function() {

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
		imgCollectionH : 150,
		showMenu: true,
		home: 'fotos',
		menuMarginW:20,
		titleH:35,
		ImgTitle:false,
		textCollumW: 720,
		dTextCollumMargin: 94,
		viewChain:[ 'overview' , 'dedicated-child' ],
		hubH: 125
	},
	{
		fotos: 
	    {
	    	w:75,
	    	h:75,
	    	marginW: 0 ,
			marginH: 0 ,
			css:'fotoClass',
			hSpacing: 50,
			padding: 0
	    } , 
		search: 
	    {
	    	w:170,
	    	h:170
	    } ,
	    'ale/nesting':
	    {
	    	css:'nesting4gibbbens'
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
					{	// viewchain[0] is an Object, describing the behavior for the click on the 'root' folder
						view : "overview" OR "dedicated", 	// not present (default): "overview"
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