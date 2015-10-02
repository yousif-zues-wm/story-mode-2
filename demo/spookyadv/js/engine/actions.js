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

//This file contains the actions that the player can do. It contains functions needed by the action functions too.

//Moves a sprite (usually the Player)
function Move(x,y)
{
//Check if the coordinate to go is in the sprite limits
	if(this.lockSprite==false)
	{
		this.lockSprite=true;

		//Get the distance between the sprite and the coordinate to go
		this.toX=x-this.getx();
		this.toY=y-this.gety();

		this.setImage(GoLeftStatus);
		this.ismovingH=true;
		this.ismovingV=true;
		
		if(this.toX<0)
		{
			this.dirx=-1;
			this.toX=this.toX*this.dirx; //It must be always positive so if it's negative we convert it
			
		}else{
			this.setImage(GoRightStatus);
			this.dirx=1;
		}
		
		if(this.toY<0)
		{
			this.diry=-1;
			this.toY=this.toY*this.diry;
		}else{
			this.diry=1;
		}
        
		if(Player==this)
        {
          document.getElementById('spanaction').firstChild.data=TextMenuMoving;
        }

		this.gotoxy();
	}

}

function Stop()
{
	this.toX=0;
	this.toY=0;
	this.ismovingH=false;
	this.ismovingV=false;
	this.lockSprite=false;
}

function MovePath()
{
	if(this.stepinpath<this.pathtofollow.length)
	{
		this.lockSprite=false;
		this.Move(this.pathtofollow[this.stepinpath],this.pathtofollow[this.stepinpath+1]);
		this.stepinpath+=2;
		
	}else if(this.pathloop)
	{
		this.stepinpath=0;
		this.lockSprite=false;
		this.Move(this.pathtofollow[this.stepinpath],this.pathtofollow[this.stepinpath+1]);
		this.stepinpath+=2;
	}else{
		this.followpath=false;
	}
	
}

//Look function
function Look()
{
	Player.Say(this.description);
}

//Take function
function Take()
{
	var i=SearchEmpty(invnum);
	invnum[i]=new Inventory(i);
	invnum[i].image.src=SpriteFolder+this.name+"/"+LeftStatus+SpriteExt;
	document.getElementById("MainMenu1-2").appendChild(invnum[i].image);
	invnum[i].name=this.name;
	invnum[i].fromDiv=this.divname;
	invnum[i].image.id=this.name;
	DestroyObject(this);
	Player.lockSprite=false;
	invnum[i].image.addEventListener("click",function(){SetObject(invnum[i].name,i);},false);
	invnum[i].image.addEventListener("mouseover",function(){document.getElementById(invnum[i].name).style.width=acticonsize + "px";document.getElementById(invnum[i].name).style.height =acticonsize + "px";},false);
	invnum[i].image.addEventListener("mouseout",function(){document.getElementById(invnum[i].name).style.width=iconsize + "px";document.getElementById(invnum[i].name).style.height =iconsize + "px";},false);
	
}

//Called when the player speaks with another character
function Speak()
{
	if(this.conversationPart<this.conversationText.length)
	{
		
		var whospeak;
        var tmpthis=this;
        var textcolour=undefined;
        
        //If it's a even number the player speaks else the 'object' speaks
        if(this.conversationPart%2==0)
        {
            whospeak=Player;    
            textcolour=undefined;       
        }else{
            whospeak=this;
            textcolour=textColour;
        }
        
        saytxt=CreateText(parseInt(whospeak.style.left),parseInt(whospeak.style.top),whospeak.divname);
        saytxt.ChangeText(this.conversationText[this.conversationPart],textcolour);
        this.conversationPart++;
        whospeak.setImage(whospeak.status+"speak");
        
        setTimeout(function(){document.body.removeChild(document.getElementById(saytxt.div));whospeak.setImage(whospeak.status.substring(0,whospeak.status.length-5));tmpthis.speak();},delay);
	}else{
		Player.lockSprite=false;
        this.conversationPart=0;
	}
}

//When the player use an object from the inventory
function Use()
{
    if(actualinv!=null && invnum[actualinv].name==this.usableObject || this.usableObject=="NotDefined"){
        Player.lockSprite=false;
        this.objectAction();
    }else{
        Player.Say(TextCantUse);
    }

}

function CombineObjects(object1,object2)
{
	var objectsToCombine=object1+"+"+object2;
	var objectsToCombine2=object2+"+"+object1;
	var objectsfound=false;
	for(i=0;i<GameParameters.length && !objectsfound;i++)
	{
		var splitGameParameter=GameParameters[i].split("=");
		for(var j=0;j<splitGameParameter.length && !objectsfound;j++)
		{
			if(splitGameParameter[j]==objectsToCombine || splitGameParameter[j]==objectsToCombine2){objectsfound=true;}
		}
	}
	if(objectsfound)
	{
		RemoveInventoryObject();
		actualinv=oldinv;
		RemoveInventoryObject();
		AddInventory(splitGameParameter[j]);
	}else{
		Player.lockSprite=true;
		Player.Say(TextCantCombine);
	}
	ActiontoDo=null;
	document.getElementById('spanaction').firstChild.data=TextMenuActions;
	ChangeCursor();
}

//Set the text of the action to do
function SetAction(actiontoset)
{
	if(!Player.lockSprite && Player!=undefined)
	{
		if(document.getElementById('spanaction').firstChild.data==actiontoset)
		{
			document.getElementById('spanaction').firstChild.data=TextMenuActions;
			ActiontoDo=null;
		}else{
			document.getElementById('spanaction').firstChild.data=actiontoset;
			ActiontoDo=actiontoset;
		}
	}
	ChangeCursor();
}

//Set the object in the inventory selected
function SetObject(objecttoset,objectnum)
{
	if(!Player.lockSprite)
	{
		if(document.getElementById('spanobject').firstChild.data==objecttoset)
		{
			document.getElementById('spanobject').firstChild.data=TextMenuInventory;
			actualinv=null;
		}else{
			if(document.getElementById('spanaction').firstChild.data==ActionCombine && actualinv!=null)
			{
				oldinv=actualinv;
				actualinv=objectnum;
				CombineObjects(document.getElementById('spanobject').firstChild.data,objecttoset);
			}else{
				document.getElementById('spanobject').firstChild.data=objecttoset;
				actualinv=objectnum;		
			}
		}
	}
}

//When you click on anywhere this actions is called
function Action()
{
    if(Player!=undefined)
    {
      if(!Player.lockSprite)
      {
          if(Player.getx()!=this.getx() || Player.gety()!=this.gety())
          {
              var objecty=this.gety();
              var objectx=this.getx();
              var width=parseInt(this.style.width);
              var height=parseInt(this.style.height);
              var PlayerWidth=parseInt(Player.style.width);
              var PlayerHeight=parseInt(Player.style.height);
              var distFromObj=width/2+PlayerWidth/2;
              			  
              //If goto left, player stops at right side else stops at left side.			  
			  if(width<=PlayerWidth && height <= PlayerHeight || width <= PlayerWidth && height >= PlayerHeight)
			  {		
				objectx-Player.getx()<0?objectx+=distFromObj:objectx-=distFromObj;
			  }
			  
              actionWith=this;
              Player.Move(objectx,objecty);
	
          }
      }
    }
	
}

function ActionInvisible()
{
	if(Player!=undefined)
	{
		if(!Player.lockSprite)
		{
			var objectx=GetAreaMiddle(this.polygon);
			var objecty=GetBottomLimit(this.polygon);

			if(GetBottomLimit(this.polygon)-GetTopLimit(this.polygon)>parseInt(Player.style.height))
			{
				objecty-=parseInt(Player.style.height)/2;
			}else{
				if(Player.getx()<GetTopLimit(this.polygon))
				{
					objecty=GetTopLimit(this.polygon);
				}
			}
	
			if(Player.getx()!=objectx || Player.gety()!=objecty)
			{
				actionWith=this;
				Player.Move(objectx,objecty);
			}
		}
	}
	
}

//Needed by Conversation, Look and any other function that the sprite speak
function Say(txt,time)
{
	if(this.SayTxt==undefined)
	{
		if(time==undefined) var time=delay;
		this.SayTxt=new CreateText(parseInt(this.style.left),parseInt(this.style.top),this.divname);
		this.SayTxt.ChangeText(txt);
		this.setImage(this.status+"speak");
		var tmpthis=this;
		tmpthis.lockSprite=true;
		setTimeout(function(){DestroyText(tmpthis.SayTxt);tmpthis.SayTxt=undefined;tmpthis.lockSprite=false;tmpthis.setImage(tmpthis.status.substring(0,tmpthis.status.length-5));},time);
	}
}


//Generic function when you can do an action
function Cantdo()
{
	this.text;
	switch(ActiontoDo)
	{			
				case ActionTake:
					this.text=TextCantTake;
				break;
				
				case ActionUse:
					this.text=TextCantUse;
				break;
			
				case ActionSpeak:
					this.text=TextCantSpeak;
				break;		
				
	}
	Player.Say(this.text);
}

//Used for inventory between screens
function Taken(divname,name)
{
		var num=SearchEmpty(invnum);
		invnum[num]=new Inventory(num);
		invnum[num].name=name;
		invnum[num].fromDiv=divname;
		
		invnum[num].image.id=name;
		invnum[num].image.src=SpriteFolder+name+"/"+LeftStatus+SpriteExt;
		document.getElementById("MainMenu1-2").appendChild(invnum[num].image);
		invnum[num].image.addEventListener("click",function(){SetObject(invnum[num].name,num);},false);
		invnum[num].image.addEventListener("mouseover",function(){document.getElementById(invnum[num].name).style.width=acticonsize + "px";document.getElementById(invnum[num].name).style.height =acticonsize + "px";},false);
		invnum[num].image.addEventListener("mouseout",function(){document.getElementById(invnum[num].name).style.width=iconsize + "px";document.getElementById(invnum[num].name).style.height =iconsize + "px";},false);	
}

function UsableWith(invObject,useFunction)
{
    this.usableObject=invObject;
    this.objectAction=useFunction;
    this.use=Use;
}

function SetUseAction(useFunction)
{
	this.usableObject="NotDefined";
    this.objectAction=useFunction;
    this.use=Use;
}
