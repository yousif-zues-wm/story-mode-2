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
//This file contains the functions to create the screen, the sprites (Player, Objects and Static Objects), the menu and the texts.

//Create a new sprite for the game
function BuildSprite(name,x,y,status)
{	
	//ThisSprite=new Sprite(name,spritedepth,spriteframes,TextDefaultDescription);
	var ObjectNumber=SearchDiv(name);
	var SpriteName=ScreenName+"Div-"+name+"-"+ObjectNumber;
 
	if(!SearchObject(SpriteName,AddtoInventory) && !SearchObject(SpriteName,ObjectsUsed))
	{
		//Add the DIV and the image to the HTML
		var SpriteDiv=document.createElement('DIV');
		var SpriteImg=document.createElement('IMG');
				
		SpriteImg.id=SpriteName+"Img";
		SpriteImg.src=SpriteFolder+name+"/"+status+SpriteExt;
		
		SpriteDiv.id=SpriteName;
		SpriteDiv.style.position="absolute";
		SpriteDiv.style.left=x;
		SpriteDiv.style.top=y;
		SpriteDiv.style.width=SpriteImg.width;
		SpriteDiv.style.height=SpriteImg.height;
		SpriteDiv.style.zIndex=spritedepth;
		
		SpriteDiv.appendChild(SpriteImg);			
		document.body.appendChild(SpriteDiv);

		spritedepth+=1;
	    
    }else{
		SpriteName=null;
	}

	return SpriteName;
}

//Create the player
function CreatePlayer(x,y)
{
	var position=get_cookie("PlayerPosition");
	var posx=x;
	var posy=y;
	if(position!=null)
	{
		posx=position.split(",")[0];
		posy=position.split(",")[1];
	}
	Player=new Sprite("Player",posx,posy);
}

function BuildPlayer()
{
	if(Player!=undefined)
	{
		var DivName=BuildSprite(Player.name,Player.x,Player.y,Player.status);
		Player.divname=DivName;
		Player.style=document.getElementById(DivName).style;
		Player.image=document.images[DivName+"Img"];
		Player.zindex=parseInt(Player.style.zIndex);	
	}
}

//Create Objects
function CreateObject(name,x,y)
{
	if(name=="Player" || name=="Door")
	{
		alert("Error! name can't be < "+name+" >");
	}else{
		var Object=new Sprite(name,x,y);
		//Used for check the depth when the player walks
		objectsArray[objectArrayNumber]=Object;
		objectArrayNumber+=1;
		
		return Object;
	}
}	

function BuildObject(Obj)
{

	var DivName=BuildSprite(Obj.name,Obj.x,Obj.y,Obj.status);
	if(DivName!=null)
	{	
		Obj.divname=DivName;
		Obj.style=document.getElementById(DivName).style;
		Obj.image=document.images[DivName+"Img"];
		Obj.zindex=parseInt(Obj.style.zIndex);
			
		var Object=Obj;
		if(document.getElementById(DivName)!=undefined)
		{
			if(Object.onTop==undefined)
			{
				document.getElementById(DivName).addEventListener("click",function(){Object.action();},false);
				document.getElementById(DivName).addEventListener("mouseover",mouseOverObject,false);
				document.getElementById(DivName).addEventListener("mouseout",mouseOutObject,false);
				if(Object.followpath)Object.MovePath();
			}else{
				document.getElementById(DivName).addEventListener("click",clickOverOntopObject,false);
				document.getElementById(DivName).addEventListener("mousemove",moveOverOntopObject,false);
				Obj.image.style.border="none";
				Obj.image.useMap="#screenMap";
				Obj.style.zIndex=998;
				Obj.zindex=998;
			}
		}
	}
}

//Create Objects
function CreateOverScreen(name)
{
	OverScreen=name;
}	

function BuildOverScreen()
{
	//Add the DIV and the image to the HTML
	var OverScreenDiv=document.createElement('DIV');
	var OverScreenImg=document.createElement('IMG');
			
	OverScreenImg.id=OverScreen+"Img";
	OverScreenImg.src=OverScreenFolder+OverScreen+ImgExt;
	OverScreenImg.style.border="none";
	OverScreenImg.useMap="#screenMap";
	
	OverScreenDiv.id="Div"+OverScreen+"Overscreen";
	OverScreenDiv.style.position="absolute";
	OverScreenDiv.style.left=0;
	OverScreenDiv.style.top=0;
	OverScreenDiv.style.width=OverScreenImg.width;
	OverScreenDiv.style.height=OverScreenImg.height;
	OverScreenDiv.style.zIndex=998;
	OverScreenDiv.addEventListener("click",clickOverOntopObject,false);
	OverScreenDiv.addEventListener("mousemove",moveOverOntopObject,false);	
	
	OverScreenDiv.appendChild(OverScreenImg);			

	document.body.appendChild(OverScreenDiv);

}
function CreateInvisibleObject(polygon)
{	
	var Object=new InvisibleSprite(polygon);
	invisibleObjectsArray[invisibleObject]=Object;
	invisibleObject+=1;
	
	return Object;
}

function BuildInvisibleObject(invObj)
{	
	var Area=document.createElement('AREA');
	Area.id="Invisible"+invisibleObject;
	Area.shape="poly";
	Area.coords=invObj.polygon;
	
	ScreenMap.insertBefore(Area,ScreenArea);
	
	var tempPoly=invObj.polygon;
	invObj.id=Area.id;
	invObj.polygon=new Array();
	invObj.polygon=tempPoly.split(",");
	
	var Object=invObj;
	Area.addEventListener("click",function(){Object.action();},false);
	Area.addEventListener("mouseover",function(){OverCursor="2";ChangeCursor();},false);
	Area.addEventListener("mouseout",function(){OverCursor="";ChangeCursor();},false);
}

//Create Tables (auxiliar function not to be called by the game developer)
function CreateTable(tableId,rows,columns)
{
    var newTable=document.createElement('TABLE');
    newTable.id=tableId;

    newTable.border=0;
    
    for(var i=0;i<rows;i++){
        newRow=newTable.insertRow(-1);
        newRow.id=tableId+i;
        for(var j=0;j<columns;j++)
        {
            newColumn=newRow.insertCell(-1);
            newColumn.id=tableId+i+"-"+j;           
        }
    }
    return newTable;    
}
function CreateScreen(image,polygon)
{
	ScreenName=image;
	ScreenArea=polygon;
}
//Create a new screen for the game
function BuildScreen(image,polygon)
{
	ScreenDiv=document.createElement('DIV');
	ScreenImg=document.createElement('IMG');
	
	ScreenImg.id=image+"Img";
	ScreenImg.src=ScreenFolder+image+ImgExt;
	ScreenImg.style.border="none";
	

	ScreenImg.useMap="#screenMap";
	
	ScreenMap=document.createElement('MAP');
	ScreenMap.id="screenMap";
	ScreenMap.name="screenMap";
	if(polygon!=undefined)
	{
		ScreenArea=document.createElement('AREA');
		ScreenArea.id="AreaScreen";
		ScreenArea.shape="poly";
		ScreenArea.coords=polygon;	
		ScreenMap.appendChild(ScreenArea);
		
		ScreenArea.addEventListener("click",MovePlayer,false);//Add onmouse click event to move the main character
	}

	ScreenDiv.appendChild(ScreenMap);
			
	
	ScreenDiv.id="Div"+image;
	ScreenDiv.style.position="absolute";
	ScreenDiv.style.left=0;
	ScreenDiv.style.top=0;
	ScreenDiv.style.width=ScreenImg.width;
	ScreenDiv.style.height=ScreenImg.height;
	
	ScreenDiv.style.zIndex=0;
	ScreenDiv.appendChild(ScreenImg);
	document.body.appendChild(ScreenDiv);
}

//Create the menu for the game
function CreateMenu()
{
	//Define the actions
	var actionsImgs=GameActions;
	
	//Creating div menu and the table
	MenuDiv=document.createElement('DIV');
	var MenuTable=CreateTable("MainMenu",2,3);
	
	MenuTable.style.textAlign = 'center';
	
	MenuDiv.id="DivMenu";
	MenuDiv.style.width=ScreenDiv.style.width;
	MenuDiv.style.height=menuheight;
	MenuDiv.style.left=0;
	MenuDiv.style.top=ScreenDiv.style.height;
	MenuDiv.style.position="absolute";
	MenuDiv.style.zIndex=999;
	MenuDiv.style.background=MenuBackground;
	MenuDiv.appendChild(MenuTable);
	
	document.body.appendChild(MenuDiv);

	//Adding the actions, characters and objects in inventory
	var ActionSpan=document.createElement('SPAN');
	ActionSpan.id="spanaction";
	ActionSpan.style.background = MenuTxtBackground;
	ActionSpan.style.fontWeight = 'bold';
	ActionSpan.appendChild(document.createTextNode(TextMenuActions));

	var ObjectSpan=document.createElement('SPAN');
	ObjectSpan.id="spanobject";
	ObjectSpan.style.background = MenuTxtBackground;
	ObjectSpan.style.fontWeight = 'bold';
	ObjectSpan.appendChild(document.createTextNode(TextMenuInventory));
	
	var MainMenuWidth=parseInt(ScreenDiv.style.width)/2;
	document.getElementById("MainMenu0-0").style.width=acticonsize+1;
	document.getElementById("MainMenu1-1").style.width=acticonsize+1;
	document.getElementById("MainMenu0-1").style.width=MainMenuWidth-acticonsize+1;
    document.getElementById("MainMenu0-2").style.width=MainMenuWidth;
	document.getElementById("MainMenu1-1").style.width=MainMenuWidth-acticonsize+1;
    document.getElementById("MainMenu1-2").style.width=MainMenuWidth;
	
	addTitleButton(document.getElementById("MainMenu1-0"));
	
	document.getElementById("MainMenu1").style.height=acticonsize+5;
	
	document.getElementById("MainMenu1-2").style.background=MenuInvBackground;

	
	document.getElementById("MainMenu0-1").appendChild(ActionSpan);
	document.getElementById("MainMenu0-2").appendChild(ObjectSpan);
	addActions(actionsImgs,document.getElementById("MainMenu1-1"));
	
}
//Create the menu for start the game
function CreateStartMenu()
{
	//Creating div menu and the table
	var StartMenuDiv=document.createElement('DIV');
	var NewImg=document.createElement('IMG');
	var ContinueImg=document.createElement('IMG');
	
	NewImg.src=MenuFolder+"new"+ImgExt;
	NewImg.id="NewGameImg";
	ContinueImg.src=MenuFolder+"continue"+ImgExt;
	ContinueImg.id="ContinueGameImg";
	
	StartMenuDiv.id="DivStartMenu";
	StartMenuDiv.style.width=ScreenDiv.style.width;
	StartMenuDiv.style.height=menuheight;
	StartMenuDiv.style.left=0;
	StartMenuDiv.style.top=ScreenDiv.style.height;
	StartMenuDiv.style.position="absolute";
	StartMenuDiv.style.textAlign="center";
	
	StartMenuDiv.style.zIndex=999;
	StartMenuDiv.style.background=MenuBackground;
	
	NewImg.addEventListener("click",function(){NewGame();},false);
	NewImg.addEventListener("mouseover",function(){this.src=MenuFolder+"new2"+ImgExt;},false);
	NewImg.addEventListener("mouseout",function(){this.src=MenuFolder+"new"+ImgExt;},false);
	
	ContinueImg.addEventListener("click",function(){GotoScreen(LastScreen)},false);
	ContinueImg.addEventListener("mouseover",function(){this.src=MenuFolder+"continue2"+ImgExt;},false);
	ContinueImg.addEventListener("mouseout",function(){this.src=MenuFolder+"continue"+ImgExt;},false);
		
	StartMenuDiv.appendChild(NewImg);
	
	if(get_cookie("LastScreen")!=null)
		StartMenuDiv.appendChild(ContinueImg);
	
	document.body.appendChild(StartMenuDiv);
}

//Create a text in the screen
function CreateText(x,y,name)
{
    var TxtDiv=document.createElement('DIV');
    var TxtSpan=document.createElement('SPAN');
    var TxtNode=document.createTextNode("Default Text");
    
    var TextTable=CreateTable(name+"TxtTable",3,3);
    TextTable.cellSpacing=0;
    TextTable.cellPadding=0;

    
	if(name==undefined)
	{
		name="Text"+textcount;
		textcount++;
	}
    
    TxtDiv.id=name+"TxtDiv";
    TxtSpan.id=name+"TxtSpan";
    TxtDiv.style.textAlign="center";
    TxtDiv.style.position="absolute";
    TxtSpan.style.color="black";
    TxtSpan.style.fontWeight = 'bold';
    TxtSpan.appendChild(TxtNode);
    
    TxtDiv.appendChild(TextTable);
    TxtDiv.style.zIndex=999;
    document.body.appendChild(TxtDiv);
    

    var RoundCornerImage1=document.createElement('IMG');
    var RoundCornerImage2=document.createElement('IMG');
    var RoundCornerImage3=document.createElement('IMG');
    var RoundCornerImage4=document.createElement('IMG');
    RoundCornerImage1.src="imgs/Etc/round_cor1.gif";
    RoundCornerImage2.src="imgs/Etc/round_cor2.gif";
    RoundCornerImage3.src="imgs/Etc/round_cor3.gif";
    RoundCornerImage4.src="imgs/Etc/round_cor4.gif";
    
    document.getElementById(name+"TxtTable"+"0-0").style.width=14;
    document.getElementById(name+"TxtTable"+"0-0").style.height=14;
    document.getElementById(name+"TxtTable"+"0-0").appendChild(RoundCornerImage1);
    
    document.getElementById(name+"TxtTable"+"0-2").style.width=14;
    document.getElementById(name+"TxtTable"+"0-2").style.height=14;
    document.getElementById(name+"TxtTable"+"0-2").appendChild(RoundCornerImage2);
    
    document.getElementById(name+"TxtTable"+"0-1").style.background=textBackgroundColour;
    document.getElementById(name+"TxtTable"+"1-0").style.background=textBackgroundColour;
    document.getElementById(name+"TxtTable"+"1-1").style.background=textBackgroundColour;    
    document.getElementById(name+"TxtTable"+"1-2").style.background=textBackgroundColour;
    document.getElementById(name+"TxtTable"+"2-1").style.background=textBackgroundColour;
    
    document.getElementById(name+"TxtTable"+"2-0").style.width=14;
    document.getElementById(name+"TxtTable"+"2-0").style.height=14;
    document.getElementById(name+"TxtTable"+"2-0").appendChild(RoundCornerImage3);
    document.getElementById(name+"TxtTable"+"2-2").style.width=14;
    document.getElementById(name+"TxtTable"+"2-2").style.height=14;
    document.getElementById(name+"TxtTable"+"2-2").appendChild(RoundCornerImage4);
	
    document.getElementById(name+"TxtTable"+"1-1").style.background=textBackgroundColour;
    document.getElementById(name+"TxtTable"+"1-1").appendChild(TxtSpan);
    
    var createdtxt=new GameText(TxtSpan.id,TxtDiv.id,x,y);
    
    return createdtxt;

}

function CreateCursor()
{
	CursorDiv=document.createElement('DIV');
	CursorImg=document.createElement('IMG');
	
	CursorDiv.id="CursorDiv";
	CursorImg.id="CursorImg";
	CursorImg.src=EtcFolder+"walkIcon.png";
	CursorDiv.style.position="absolute";
	CursorDiv.style.width=30;
	CursorDiv.style.height=30;
	CursorDiv.style.left=0;
	CursorDiv.style.top=0;
	CursorDiv.style.zIndex=999;
		
	CursorDiv.appendChild(CursorImg);
	document.body.appendChild(CursorDiv);
	document.onmousemove = FollowMouse;
}
