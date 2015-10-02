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


//Get Mouse X
function getMouseX(event)
{
	return parseInt(event.pageX-ScreenDiv.offsetLeft);	
}
//Get Mouse Y
function getMouseY(event)
{
	return parseInt(event.pageY-ScreenDiv.offsetTop);
}
//Get Sprite X
function getX()
{
	return	parseInt(this.style.left)+parseInt(this.style.width)/2;
}
//Get Sprite Y
function getY()
{
	return	parseInt(this.style.top)+parseInt(this.style.height);
}

function getLeft()
{
	return parseInt(this.style.left);
}

function getRight()
{
	return parseInt(this.style.left)+parseInt(this.style.width);
}

function getTop()
{
	return parseInt(this.style.top);
}

function getBottom()
{
	return this.gety();
}

//Needed by Move function
function gotoXY()
{
	//Move X coordinates
	if(this.toX>0)
	{
		var nextX=this.getx()+this.step*this.dirx;
		//Move the sprite with a step and in dirx direction
		if(inArea(ScreenArea.coords.split(","),{x:nextX,y:this.gety()}) || !this.walklimits)
		{
			this.style.left=parseInt(this.style.left)+this.step*this.dirx;
			this.toX=this.toX-this.step;
		}else{
			this.toX=0;
		}
	}else{
		this.ismovingH=false;
	}
	
	//Move Y coordinates
	if(this.toY>0)
	{
		var nextY=this.gety()+this.step*this.diry;
		if(inArea(ScreenArea.coords.split(","),{x:this.getx(),y:nextY}) || !this.walklimits)
		{
			this.style.top=parseInt(this.style.top)+this.step*this.diry;
			this.toY=this.toY-this.step;
			this.checkdepth();
		}else{
			this.toY=0;			
		}
	}else{
		this.ismovingV=false;	
	}
	
	this.x=parseInt(this.style.left);
	this.y=parseInt(this.style.top);
	
	if(this.ismovingH || this.ismovingV)
	{
        var tmpVar=this;
		setTimeout(function(){tmpVar.gotoxy();},30); 
		
		if(this.checkcollision())
		{
			//this.lockSprite=false;
			this.collisionAction();
		}
	}else{
		if(this.actid!=this.id)
		{
			this.actionWith.getx()>this.getx()?this.dirx=1:this.dirx=-1;
		}
		this.dirx==-1?this.setImage(LeftStatus):this.setImage(RightStatus);
		
		this.AfterMove();
	}
}

function AfterMove()
{
	if(this.followpath)
	{
		this.MovePath();
	}else if(this.followObject){
		this.FollowObject();
		this.lockSprite=false;
	}else if(this==Player){
		if(actionWith!=null)	
		{			
			MakeAnAction();
		}else{	
			if(ActiontoDo!=null)
			{
				Player.Say(TextNoAction);
				ActiontoDo=null;
			}else{
				this.lockSprite=false;
			}		
		}
		document.getElementById('spanaction').firstChild.data=TextMenuActions;
		ChangeCursor();
	}else{
		this.lockSprite=false;
	}
}

function MakeAnAction()
{
	if(checkDistance() || ActiontoDo==ActionLook || NoDistance)
	{
	
		switch(ActiontoDo)
		{
		  case ActionLook:
			actionWith.look();
			break;
			
		  case ActionTake:
			actionWith.take();
			break;
			  
		  case ActionUse:
			actionWith.use();
			break;
				
		  case ActionSpeak:
			actionWith.speak();
			break;
				
		  default:
			actionWith.door!=undefined?actionWith.door():Player.lockSprite=false;
		}
	}else{
		Player.Say(TextFarFromObject);
	}
	
	ActiontoDo=null;
	actionWith=null;

}
//Function used for inventory & made actions
function SearchEmpty(arraytosearch)
{
	var i=0;
	while(arraytosearch[i]!=undefined)
	{
		i++;
	}
	return i;
}
//Check depth of the sprites and modify it
function CheckDepth()
{	
	if(this!=Player && !Player.lockSprite)
	{
		if(this.gety()>Player.gety() && this.zindex<Player.zindex || this.gety()<Player.gety() && this.zindex>Player.zindex)
		{
			var oldindex=this.zindex;
			this.zindex=Player.zindex;
			Player.zindex=oldindex;
			
			this.style.zIndex=this.zindex;
			Player.style.zIndex=oldindex;
		}
	}
	
	for(var i=0;i<objectsArray.length;i++)
	{
		if(objectsArray[i]!=undefined && objectsArray[i]!=this && document.getElementById(objectsArray[i].divname)!=undefined)
		{
			if(this.gety()>objectsArray[i].gety() && this.zindex<objectsArray[i].zindex || this.gety()<objectsArray[i].gety() && this.zindex>objectsArray[i].zindex)
			{
				var oldindex=this.zindex;
				this.zindex=objectsArray[i].zindex;
				objectsArray[i].zindex=oldindex;
				
				this.style.zIndex=this.zindex;	
				objectsArray[i].style.zIndex=oldindex;
			}	
		}
	}
	
}

function CheckCollision()
{
	var collision=false;
	if(this.collisionObject!=null)
	{
		if(this.collisionObject.style!=undefined)
		{
			if(this.getx()>this.collisionObject.getleft() && this.getx()<this.collisionObject.getright() && this.gety()>=this.collisionObject.gettop() && this.gety()<=this.collisionObject.getbottom())
			{
				collision=true;
			}
		}else{
			if(inArea(this.collisionObject.polygon,{x:this.getx(),y:this.gety()}))
			{
				collision=true;
			}
		}
	}
	return collision;
}

//Add actions to the menu
function addActions(imageArray,addtoObject)
{
	for(var i=0;i<imageArray.length;i++)
	{
		var ImagetoAdd=document.createElement('IMG');
		ImagetoAdd.src=MenuFolder+imageArray[i]+ImgExt;
		ImagetoAdd.id=imageArray[i];//The id is the action name for example "Use"
		ImagetoAdd.style.width=iconsize +"px"
		ImagetoAdd.style.height=iconsize +"px"
		addtoObject.appendChild(ImagetoAdd);
		//When you click on a image the action span takes the text from the image id, for example "Use"
		ImagetoAdd.addEventListener("click",function(){SetAction(this.id);},false);
		ImagetoAdd.addEventListener("mouseover",function(){document.getElementById(this.id).style.width=acticonsize + "px";document.getElementById(this.id).style.height =acticonsize + "px";},false);
		ImagetoAdd.addEventListener("mouseout",function(){document.getElementById(this.id).style.width=iconsize + "px";document.getElementById(this.id).style.height =iconsize + "px";},false);
	}
}

function addTitleButton(addtoObject)
{
		var ImagetoAdd=document.createElement('IMG');
		ImagetoAdd.src=MenuFolder+"home"+ImgExt;
		ImagetoAdd.id="Title Button";//The id is the action name for example "Use"
		ImagetoAdd.style.width=iconsize +"px"
		ImagetoAdd.style.height=iconsize +"px"
		addtoObject.appendChild(ImagetoAdd);
		//When you click on a image the action span takes the text from the image id, for example "Use"
		ImagetoAdd.addEventListener("click",function(){GotoScreen("title");},false);
		ImagetoAdd.addEventListener("mouseover",function(){document.getElementById(this.id).style.width=acticonsize + "px";document.getElementById(this.id).style.height =acticonsize + "px";},false);
		ImagetoAdd.addEventListener("mouseout",function(){document.getElementById(this.id).style.width=iconsize + "px";document.getElementById(this.id).style.height =iconsize + "px";},false);
}

//Getting game data, like objects in inventory, etc...
function GetVariables()
{
	if(get_cookie("LastScreen")!=null)
		LastScreen=get_cookie("LastScreen");
	
	var invobjects=get_cookie("Inventory");
	
	if(invobjects!=null)
	{
		var items=invobjects.split(",");
		for(var i=0;i<items.length-1;i++)
		{
			AddtoInventory[i]=items[i];
		}
	}
	
	var useobjects=get_cookie("UsedObjects");
	
	if(useobjects!=null)
	{
		var useitems=useobjects.split(",");
		for(var i=0;i<useitems.length-1;i++)
		{
			ObjectsUsed[i]=useitems[i];
		}
	}
	
	var gameparams=get_cookie("GameParams");
	
	if(gameparams!=null)
	{
		var params=gameparams.split(",");
		for(var i=0;i<params.length-1;i++)
		{
			GameParameters[i]=params[i];
		}
	}	
}

//Search an object in the inventory or used
function SearchObject(object,inarray)
{
	var found=false;
	
	for(var i=0;i<inarray.length && !found;i++)
	{
		if(inarray[i]==object){found=true;}
	}
	return found;
}

function SearchDiv(name)
{
	var divnumber=0;
	var endLoop=false;
	
	for(var i=0;i<objectsArray.length && !endLoop;i++)
	{
		if(objectsArray[i].name==name)
		{
			if(objectArrayNumber!=i)
			{
				divnumber++;
			}else{
				endLoop=true;
			}
		}
	}
	return divnumber;
}

function CleanName(strname)
{
	var from=0;
	var to=strname.length;
	
	for(var i=0;i<strname.length-1;i++)
	{
		if(strname.charAt(i)=="-")
		{
			if(from==0)
			{
				from=i+1;
			}else{
				to=i;
			}
		}
	}
	return strname.substring(from,to);
}

function UpdateInventory()
{
	for(var i=0;i<AddtoInventory.length;i++)
	{
		Taken(AddtoInventory[i],CleanName(AddtoInventory[i]));
			
	}
	AddtoInventory=undefined;
}

function UpdateInventoryTitle()
{
	for(var i=0;i<AddtoInventory.length;i++)
	{
		var divname=AddtoInventory[i];
		var name=CleanName(AddtoInventory[i]);
		var num=SearchEmpty(invnum);
		invnum[num]=new Inventory(num);
		invnum[num].name=name;
		invnum[num].fromDiv=divname;
	}		
}

//Area functions used for invisible objects, screen limits.
function GetLeftLimit(polyArray)
{
	var value=parseInt(polyArray[0]);
	
	for(var i=0;i<polyArray.length;i++)
	{
		if(value>parseInt(polyArray[i]) && i%2==0) {value=parseInt(polyArray[i]);}
	}
	
	return value;
}

function GetRightLimit(polyArray)
{
	var value=parseInt(polyArray[0]);
	
	for(var i=0;i<polyArray.length;i++)
	{
		if(value<parseInt(polyArray[i]) && i%2==0) {value=parseInt(polyArray[i]);}
	}
	return value;
}

function GetTopLimit(polyArray)
{
	var value=parseInt(polyArray[1]);
	
	for(var i=1;i<polyArray.length;i++)
	{
		if(value>parseInt(polyArray[i]) && i%2!=0) {value=parseInt(polyArray[i]);}
	}
	return value;
}

function GetBottomLimit(polyArray)
{
	var value=parseInt(polyArray[1]);
	
	for(var i=1;i<polyArray.length;i++)
	{
		if(value<parseInt(polyArray[i]) && i%2!=0) {value=parseInt(polyArray[i]);}
	}
	return value;
}

function GetAreaMiddle(polyArray)
{
	var width=GetRightLimit(polyArray)-GetLeftLimit(polyArray);
	return GetLeftLimit(polyArray)+width/2;
	
}

function ChangeCursor()
{
	var action=ActiontoDo;
	var icon;
	
	switch(ActiontoDo)
	{
		case ActionLook:
			icon="lookIcon";
		break;
		
		case ActionTake:
			icon="takeIcon";
		break;
		  
		case ActionUse:
			icon="useIcon";              
		break;
			
		case ActionSpeak:
			icon="speakIcon";
		break;
		
		case ActionCombine:
			icon="combineIcon";
			OverCursor="";
		break;	
				
		default:
			icon="walkIcon";
	}
	
	CursorImg.src=EtcFolder+icon+OverCursor+".png";
}


function FollowMouse(event)
{
	var mouseX=getMouseX(event)+15;
	var mouseY=getMouseY(event)+15;
	var limitX=parseInt(ScreenDiv.style.width)-parseInt(CursorDiv.style.width);
	var limitY=parseInt(ScreenDiv.style.height)+parseInt(MenuDiv.style.height)-parseInt(CursorDiv.style.height);
	
	if(mouseX>limitX)
	{
		CursorDiv.style.left=limitX;
	}else{
		CursorDiv.style.left=mouseX;	
	}
	if(mouseY>limitY)
	{
		CursorDiv.style.top=limitY;
	}else{
		CursorDiv.style.top=mouseY;
	}
}

function HideScrollbars()
{
	document.documentElement.style.overflow = 'hidden';	
}

function inArea(polygon,pt)
{
	var points=new Array();
	var n=0;
	var j=1;

	for(var i=0;i<polygon.length;i+=2)
	{
		points[n]={x: parseInt(polygon[i]), y: parseInt(polygon[j])}
		j+=2;
		n++;
	}
	
	return isPointInPoly(points, pt);
}
function checkDistance()
{	
	var objectLeft;
	var objectRight;
	var objectTop;
	var objectBottom;	

	var leftDistance;
	var rightDistance;
	var topDistance;
	var bottomDistance;
	var topbotDistance;
	var bottomtopDistance;
	
	var near=false;
	
	if(actionWith.polygon==undefined)
	{
		objectLeft=actionWith.getleft();
		objectRight=actionWith.getright();
		objectTop=actionWith.gettop();
		objectBottom=actionWith.getbottom();
	}else{
		objectLeft=GetLeftLimit(actionWith.polygon);
        objectRight=GetRightLimit(actionWith.polygon);
        objectTop=GetTopLimit(actionWith.polygon);
		objectBottom=GetBottomLimit(actionWith.polygon);	
	}
		
	leftDistance=Player.getright()-objectLeft;
	if(leftDistance<0)leftDistance*=-1;
	
	rightDistance=Player.getleft()-objectRight;
	if(rightDistance<0)rightDistance*=-1;
		
	topDistance=Player.gettop()-objectTop;
	if(topDistance<0)topDistance*=-1;
	
	bottomDistance=Player.getbottom()-objectBottom;
	if(bottomDistance<0)bottomDistance*=-1;
	
	topbotDistance=Player.getbottom()-objectTop;
	if(topbotDistance<0)topbotDistance*=-1;
	
	bottomtopDistance=Player.gettop()-objectBottom;
	if(bottomtopDistance<0)bottomtopDistance*=-1;
	
	if((leftDistance<parseInt(Player.style.width)/2 || Player.getx()>objectLeft && Player.getx()<objectRight
	|| rightDistance<parseInt(Player.style.width)/2) && ((topDistance<parseInt(Player.style.height)/2 ||
	topbotDistance<parseInt(Player.style.height)/2 || bottomtopDistance<parseInt(Player.style.height)/2 ||
	bottomDistance<parseInt(Player.style.height)/2) || Player.gettop()>objectTop && Player.gettop()<objectBottom
	|| Player.getbottom()>objectTop && Player.getbottom()<objectBottom))
	{
		near=true;
	}

	return near;
}

function checkOnMouseOver(event)
{
	var MousePosX=getMouseX(event);
	var MousePosY=getMouseY(event);
	
	var overObject=-1;

	for(var i=0;i<objectsArray.length;i++)
	{
		if(objectsArray[i]!=undefined && document.getElementById(objectsArray[i].divname)!=undefined)
		{
			if(MousePosX>=objectsArray[i].getleft() && MousePosX<=objectsArray[i].getright() && MousePosY>=objectsArray[i].gettop() && MousePosY<=objectsArray[i].getbottom())
			{
				overObject=i;
			}	
		}
	}
	
	return overObject;
}

function moveOverOntopObject(event)
{
	var object=checkOnMouseOver(event);
	
	if(object!=-1)
	{
		mouseOverObject();
	}else{
		mouseOutObject();
	}
}

function clickOverOntopObject(event)
{
	var object=checkOnMouseOver(event);
	
	if(object==-1)
	{
		MovePlayer(event);
	}else{
		objectsArray[object].action();
	}
}

function mouseOverObject()
{
	OverCursor="2";
	ChangeCursor();
}

function mouseOutObject()
{
	OverCursor="";
	ChangeCursor();
}

function checkImageExist(imgToCheck)
{
	var tempImg=new Image;
	var result=true;
	tempImg.src=imgToCheck;
	tempImg.onerror=function(){result=false;};
	
	alert(result);
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/math/is-point-in-poly [v1.0]
function isPointInPoly(poly, pt)
{
	for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
		((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
		&& (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
		&& (c = !c);
	return c;
}

function Onloadfunctions()
{
	GetVariables();
	Main();
	Preload();
}
