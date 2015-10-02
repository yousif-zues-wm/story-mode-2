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

//This is the engine :-).

//Move main sprite to mouse x,y coordinates
function MovePlayer(event)
{
  if(Player!=undefined)
  {
	Player.Move(getMouseX(event),getMouseY(event));	
  }
}

function ChangeText(text,colour)
{
    document.getElementById(this.name).firstChild.data=text;
    if(colour!=undefined)
    {
		document.getElementById(this.name).style.color=colour;
	}
	var TableTxt=document.getElementById(this.div.substr(0,this.div.length-6)+"TxtTable");
	var TxtDiv=document.getElementById(this.div);
	var width=TableTxt.offsetWidth;
	
	
	if(TableTxt.offsetWidth>=parseInt(ScreenDiv.style.width)/2)
	{
		width/=2;
		TableTxt.style.width=width;
	}
	var height=TableTxt.offsetHeight;
	
	TxtDiv.style.width=width;
	TxtDiv.style.height=height;
	
	var positionX=this.x-parseInt(TxtDiv.style.width)/2;	
	var positionY=this.y-parseInt(TxtDiv.style.height);
	if(positionX>=0 && this.x+parseInt(TxtDiv.style.width)<parseInt(ScreenDiv.style.width))
	{
		TxtDiv.style.left=positionX;
	}else if(positionX<0){
		TxtDiv.style.left=0;
		
	}else{
		TxtDiv.style.left=parseInt(ScreenDiv.style.width)-parseInt(TxtDiv.style.width);
	}
	
    if(positionY>=0)
    {
    	TxtDiv.style.top=positionY;
	}else{
		TxtDiv.style.top=0;
	}

}

//To another screen, passing game data
function GotoScreen(screen,posx,posy)
{
		set_cookie("Screen",screen,cookie_year,cookie_month,cookie_day);
		
		if(posx!=undefined && posy!=undefined)
		{
			set_cookie("PlayerPosition",posx+","+posy);
		}else{
			delete_cookie("PlayerPosition");
		}
		
		if(screen!="title")
			set_cookie("LastScreen",screen,cookie_year,cookie_month,cookie_day);
		
		var invobjects="";
		if(invnum.length > 0)
		{
			for(var i=0;i<invnum.length;i++)
			{
				if(invnum[i]!=undefined){
					invobjects+=invnum[i].fromDiv;
					invobjects+=",";
				}
				
			}
		}
		set_cookie("Inventory",invobjects,cookie_year,cookie_month,cookie_day);
        
		var useobjects="";
		for(var i=0;i<ObjectsUsed.length;i++)
		{
			useobjects+=ObjectsUsed[i];
			useobjects+=",";
		}
		
		set_cookie("UsedObjects",useobjects,cookie_year,cookie_month,cookie_day);
		
		var gameparams="";
		for(var i=0;i<GameParameters.length;i++)
		{
			gameparams+=GameParameters[i];
			gameparams+=",";
		}
		
		set_cookie("GameParams",gameparams,cookie_year,cookie_month,cookie_day);
		
		window.location.reload();

}

function NewGame()
{
	set_cookie("Screen",FirstScreen,cookie_year,cookie_month,cookie_day);
	
	var cookies=new Array("LastScreen","Inventory","UsedObjects","GameParams");
	for(var i=0;i<cookies.length;i++)
	{
		delete_cookie(cookies[i]);
	}
	
	window.location.reload();
}

//Set the text to say when speak with an object
function SetConversation(textArray)
{
  this.conversationText=textArray;
  this.conversationPart=0;
  this.speak=Speak;
}

function ObjectToUse()
{
	return invnum[actualinv].name;
}

//With this functions we indicate which objects we can take
function Takable()
{
	this.take=Take;    
}

function SetDefaultScreen(theScreen)
{
	defaultScreen=theScreen;
}

function SetPosition(x,y)
{
	var thisObject=this;
	this.x=x;
	this.y=y;
	
	if(!ScreenLoaded){
		setTimeout(function(){thisObject.Position(x,y);},10);
	}else{
		this.style.left=x;
		this.style.top=y;
	}
}

function HideSprite()
{
	var thisObject=this;
	
	if(!ScreenLoaded){
		setTimeout(function(){thisObject.Hide();},10);
	}else{
		this.style.visibility="hidden";
	}
	
}

function ShowSprite()
{
	var thisObject=this;
	
	if(!ScreenLoaded){
		setTimeout(function(){thisObject.Show();},10);
	}else{
		this.style.visibility="visible";
	}
}

function DestroyObject(object)
{
	if(document.getElementById(object.divname)!=undefined)
		document.body.removeChild(document.getElementById(object.divname)); //Remove the sprite layer    
}

function DestroyInvisibleObject(object)
{
    if(document.getElementById(object.id)!=undefined)
    {
	    ScreenMap.removeChild(document.getElementById(object.id)); //Remove the sprite layer  
	    if(OverCursor=="2")OverCursor="";
	}
}

function DestroyText(text)
{
	if(document.getElementById(text.div)!=undefined)
		document.body.removeChild(document.getElementById(text.div))
}

function IsDoorTo(theScreen,x,y)
{
	this.door=function(){GotoScreen(theScreen,x,y);};
}

function ObjectUsed(TheObject)
{
	return SearchObject(TheObject.divname,ObjectsUsed);
}

function SearchParameter(parameter)
{
	var found=false;
	
	for(var i=0;i<GameParameters.length && !found;i++)
	{
		if(GameParameters[i]==parameter){found=true;}
	}
	
	return found;	
}

function SearchInventory(object)
{
	var found=false;
	
	for(var i=0;i<AddtoInventory.length && !found;i++)
	{
		if(CleanName(AddtoInventory[i])==object){found=true;}
	}
	return found;
}

//Sets the title of the screen
function SetTitle(titletxt)
{
	document.title=titletxt;
}

//Parameters to pass between screens
function CreateParameter(parameter)
{
	GameParameters[SearchEmpty(GameParameters)]=parameter;
}

function AddInventory(object)
{
	var i=SearchEmpty(invnum);
	invnum[i]=new Inventory(i);
	invnum[i].image.src=SpriteFolder+object+"/"+LeftStatus+SpriteExt;
	document.getElementById("MainMenu1-2").appendChild(invnum[i].image);
	invnum[i].name=object;
	invnum[i].fromDiv=ScreenName+"-"+object+"-0";
	invnum[i].image.id=object;
	Player.lockSprite=false;
	invnum[i].image.addEventListener("click",function(){SetObject(invnum[i].name,i);},false);
	invnum[i].image.addEventListener("mouseover",function(){document.getElementById(invnum[i].name).style.width=acticonsize + "px";document.getElementById(invnum[i].name).style.height =acticonsize + "px";},false);
	invnum[i].image.addEventListener("mouseout",function(){document.getElementById(invnum[i].name).style.width=iconsize + "px";document.getElementById(invnum[i].name).style.height =iconsize + "px";},false);
}

//Delete the inventory object, remove the image
function RemoveInventoryObject()
{
	if(actualinv!=null)
	{
		document.getElementById("MainMenu1-2").removeChild(document.getElementById(invnum[actualinv].name));
		ObjectsUsed[SearchEmpty(ObjectsUsed)]=invnum[actualinv].fromDiv;
		invnum[actualinv]=undefined;
		actualinv=null;
        document.getElementById('spanobject').firstChild.data=TextMenuInventory;
		Player.lockSprite=false;
	}
}

function setImage(status)
{
	var thisObject=this;
	var ImageToSet=SpriteFolder+this.name+'/'+status+SpriteExt;
	
	if(!ScreenLoaded){
		setTimeout(function(){thisObject.setImage(status);},10);
	}else{	
		this.image.src=ImageToSet;
		this.status=status;	
	}
}

function AddPreload(imageSource,customStatus)
{
	var Status=LeftStatus;
	if(customStatus!=undefined) Status=customStatus;
	
	AdditionalPreloadImages[CountAddPreImgs]=SpriteFolder+imageSource+'/'+Status+SpriteExt;
	CountAddPreImgs++;
}

function SetTextTime(time)
{
	delay=time;
}

function Resize(percent)
{
	var thisObject=this;
	if(!ScreenLoaded){
		setTimeout(function(){thisObject.Resize(percent);},10);
	}else{
		this.style.width=parseInt(this.style.width)*percent/100;
		this.style.height=parseInt(this.style.height)*percent/100;
		this.image.width=parseInt(this.style.width);
		this.image.height=parseInt(this.style.height);
		if(percent<=50)
		{
			this.step=Math.round(Player.step/2);
		}
	}
}

function SetPath(path,loop)
{
	this.followpath=true;
	this.pathtofollow=path;
	if(loop)
	{
		this.pathloop=loop;
	}
}

function StopPath()
{
	this.followpath=false;
}

function FollowObject(ObjectToFollow)
{
	var thisObject=this;
	
	if(!this.followObject)
	{
		this.followObject=true;
		if(ObjectToFollow!=undefined) this.ObjectToFollow=ObjectToFollow;
	}
	if(ScreenLoaded && ObjectToFollow!=undefined){		
		var positionX=ObjectToFollow.getx();
		
		if(this.getx()>ObjectToFollow.getx())
		{
			positionX+=parseInt(this.style.width);
		}else{
			positionX-=parseInt(this.style.width);
		}
		var positionY=ObjectToFollow.gety();

		if(ObjectToFollow.ismovingH || ObjectToFollow.ismovingV)
		{
			this.Move(positionX,positionY);
		}else{
			setTimeout(function(){thisObject.FollowObject(thisObject.ObjectToFollow);},100)
		}
	}else{
		setTimeout(function(){thisObject.FollowObject(thisObject.ObjectToFollow);},10)
	}
}

function ClearFollowObject()
{
	this.followObject=false;
	this.ObjectToFollow=undefined;
}

function CollisionWith(Object,Function)
{
	if(Object!=undefined)
	{
		this.collisionObject=Object;
		this.collisionAction=Function;
	}
}

function ClearCollision()
{
	this.collisionObject=undefined;
	this.collisionAction=undefined;	
}

function SetOpacity(value)
{
	thisObject=this;
	
	if(this.style!=undefined)
	{
		this.style.opacity=value/100;
	}else{
		setTimeout(function(){thisObject.SetOpacity(value);},10);
	}
}

function ExecuteAfterLoad(funcToExec)
{
	if(ScreenLoaded)
	{
		funcToExec();
	}else{
		setTimeout(function(){ExecuteAfterLoad(funcToExec);},10);
	}
}
