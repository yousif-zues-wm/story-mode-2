/*
 * 
 * JSGAM (JavaScript Graphic Adventure Engine)
 * Version: 3.0
 * License: BSD
 * 
 * Author:   Kreezii
 * E-mail:  kreeziidaemon@yahoo.es 
 * Webpage: http://jsgam.sourceforge.net	     
 * 
*/

//Preload images for animations
function SourceImages()
{
	var images=new Array();
	var nImages=0;
	var imgStates=new Array(LeftStatus,RightStatus,GoLeftStatus,GoRightStatus);
	
	//Add the Menu images, if player doesn't exist the menu doesn't preload
	var imgMenu=new Array('new','continue','new2','continue2','back','backinv','Look','Speak','Take','Use','Combine');
	for(var i=0;i<imgMenu.length;i++)
	{
		images[nImages]=MenuFolder+imgMenu[i]+ImgExt;
		nImages++;
	}  	
	
	//Add the Player images
	for(var i=0;i<imgStates.length;i++)
	{
		images[nImages]=SpriteFolder+"Player/"+imgStates[i]+SpriteExt;		
		nImages++;
	}
	
    //Add the Objects images
    if(objectsArray!=undefined)
    {    
    	for(var i=0;i<objectsArray.length;i++)
    	{	
			for(var j=0;j<imgStates.length;j++)
			{
				images[nImages]=SpriteFolder+objectsArray[i].name+"/"+imgStates[j]+SpriteExt;
				nImages++;
			}
		}
		
	}
	
	//Add the Screen image
    images[nImages]=ScreenFolder+ScreenName+ImgExt;
    nImages++;
    
    //OverScreen image
    if(OverScreen!=undefined)
	{
		images[nImages]=OverScreenFolder+OverScreen+ImgExt;
		nImages++;
	}
    
    var etcImages=new Array("round_cor1.gif","round_cor2.gif","round_cor3.gif","round_cor4.gif","combineIcon.png","lookIcon.png","lookIcon2.png","speakIcon.png","speakIcon2.png","takeIcon.png","takeIcon2.png","useIcon.png","useIcon2.png","walkIcon.png","walkIcon2.png");
    //Rounded corners for text boxes
    for(var i=0;i<etcImages.length;i++)
    {
		images[nImages]=EtcFolder+etcImages[i];
		nImages++;
	}	
	
	//Objects not created at the start
	for(var i=0;i<AdditionalPreloadImages.length;i++)
	{
		images[nImages]=AdditionalPreloadImages[i];
		nImages++;
	}
	
	return images;
}

function Preload()
{
	var imageSrc=new SourceImages();
	imagesToPreload=new Array(imageSrc.length);
	var nImages=0;

    //Now preload all images
    for(var i=0;i<imageSrc.length;i++)
    {
      imagesToPreload[nImages]=new Image();
      imagesToPreload[nImages].src=imageSrc[nImages];
      nImages++;
    }
    
    for(var i=0;i<AdditionalPreloadImages.length;i++)
    {
      imagesToPreload[nImages]=new Image();
      imagesToPreload[nImages].src=AdditionalPreloadImages[nImages];
      nImages++;	
	}
  	var PreloadTable=CreateTable("Preloadbar",1,2);
  	
  	PreloadTable.style.width=300;
  	PreloadTable.style.height=20;
  	PreloadTable.cellPadding=0;
  	PreloadTable.cellSpacing=0;
  	PreloadTable.border=4;
  	PreloadTable.style.borderColor='darkred';
  	PreloadTable.align="center";
  	document.body.appendChild(PreloadTable);
  	
  	document.getElementById("Preloadbar0-0").style.width=0+"%";
  	document.getElementById("Preloadbar0-0").style.background="red";
  	document.getElementById("Preloadbar0-0").border=0;
  	
  	document.getElementById("Preloadbar0-1").style.width=100+"%";
  	document.getElementById("Preloadbar0-1").border=0;

  	Loading();
}

function Preloaded()
{
	var notComplete=true;
    for (var i = 0; i < imagesToPreload.length; i ++)
        notComplete = (notComplete && imagesToPreload[i].complete);
    return notComplete; 	
}

function Percent()
{
    var notComplete = 0;
    for (var i = 0; i < imagesToPreload.length; i ++)
        notComplete += (imagesToPreload[i].complete) ? 1 : 0;
    return parseInt(100 * notComplete / imagesToPreload.length); 	
}

function Loading()
{			   
	if(Preloaded())
	{
		BuildScene();
		document.body.removeChild(document.getElementById("Preloadbar"));
		if(Player!=undefined)
		{
			Player.lockSprite=false;
		}	  
		ScreenLoaded=true	  
	}else{
		//PreloadTxt.ChangeText(TextPreloadImages+" ("+Percent()+"%)");
		document.getElementById("Preloadbar0-0").style.width=Percent()+"%";
		setTimeout("Loading()",10);
	}
}

function BuildScene()
{
	HideScrollbars();
	
	//Adding the Screen and Menu
	BuildScreen(ScreenName,ScreenArea);
	
	if(ScreenName=="title")
	{
		CreateStartMenu();
		UpdateInventoryTitle();
	}else{
		CreateMenu();
		
		//Adding the Player
		BuildPlayer();
	
		//Adding rest of objects
		invisibleObject=0;
		for(var i=0;i<invisibleObjectsArray.length;i++)
		{		
			BuildInvisibleObject(invisibleObjectsArray[i]);
			invisibleObject++;
		}
		
		objectArrayNumber=0;
		for(var i=0;i<objectsArray.length;i++)
		{
			BuildObject(objectsArray[i]);
			objectArrayNumber++;
		}
		
		if(OverScreen!=undefined)
		{
			BuildOverScreen();
		}
	
		UpdateInventory();
		CreateCursor();
		
	}
}
