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

//This file contains the global variables and the definition of the Sprites, Inventory and Texts

//Global variables
var AddtoInventory=new Array();
var ObjectsUsed=new Array();
var GameParameters=new Array();
var GameActions=new Array("Look","Take","Combine","Speak","Use");

//Scene variables
var ScreenDiv;
var ScreenImg;
var ScreenName;
var ScreenMap;
var ScreenArea;
var ScreenLoaded=false;
var MenuDiv;
var OverScreen;

var defaultScreen=null;

var FirstScreen="title";
var LastScreen="title";

//Cursor variables
var CursorDiv;
var CursorImg;
var OverCursor="";

//Sprite and Player variables
var Player;
var actionWith=null;
var spritedepth=1;

//Object variables
var objectsArray=new Array();
var objectArrayNumber=0;
var invisibleObjectsArray=new Array();
var invisibleObject=0;

//Inventory variables
var invnum=new Array();
var actualinv=null;
var oldinv=null;
//var maxinv=6;
var menuheight=100;
var iconsize=40;
var acticonsize=44;

//Text variables
var txtwidth=200;
var txtheight=100;
var textcount=0;
var textColour="darkred";
var textBackgroundColour="white"

//Other
var ActiontoDo=null;
var NoDistance=false;
var delay=2000;
var StartButton=null;

//Preload global variables
var AdditionalPreloadImages=new Array();
var CountAddPreImgs=0;
var imagesToPreload;
var PreloadTxt;

//Regular Expressions
var SoundFolder="snds/";
var SpriteFolder="imgs/Sprites/";
var ScreenFolder="imgs/Screens/";
var OverScreenFolder="imgs/OverScreens/";
var MenuFolder="imgs/Menu/";
var EtcFolder="imgs/Etc/";
var MenuBackground = 'url(imgs/Menu/back.png)';
var MenuTxtBackground= 'url(imgs/Menu/backtxt.png)';
var MenuInvBackground= 'url(imgs/Menu/backinv.png)';
var GoLeftStatus='leftwalk';
var GoRightStatus='rightwalk';
var LeftStatus='left';
var RightStatus='right';
var ImgExt=".png";
var SpriteExt=".gif";
var SoundExt=".ogg";

function Sprite(name,Spritex,Spritey)
{
//Variables
 
	this.name=name;
	this.x=Spritex;
	this.y=Spritey;
	this.description=TextDefaultDescription;
	this.status=LeftStatus;
	this.door=undefined;
	    
    this.conversationText=new Array();
    this.conversationPart=0;

//Moving variables
	this.dirx=1;//Tell if move to left or right
	this.diry=1;//Tell if move to up or down
	this.ismovingH=false;
	this.ismovingV=false;
	this.toX=0;//Number of times to move x
	this.toY=0;//Number of times to move y
	this.step=5;//Step
	this.lockSprite=false;//It determinate if the sprite can move or not	
	
	this.action;
	
//Functions
	this.checkdepth=CheckDepth;
	//Move functions
	this.getx=getX;
	this.gety=getY;
	this.gettop=getTop;
	this.getbottom=getBottom;
	this.getleft=getLeft;
	this.getright=getRight;
	this.Move=Move;
	this.Stop=Stop;
	this.AfterMove=AfterMove;
	this.gotoxy=gotoXY;
	this.setImage=setImage;
	this.walklimits=true;
	
	//Path functions
	this.SetPath=SetPath;
	this.MovePath=MovePath;
	this.StopPath=StopPath;
	this.followpath=false;
	this.pathtofollow=new Array();
	this.stepinpath=0;
	this.pathloop=false;
	
	//Follow functions
	this.followObject=false;
	this.ObjectToFollow=undefined;
	this.FollowObject=FollowObject;
	this.ClearFollowObject=ClearFollowObject;
	
	//Collision variables
	this.collisionObject=null;
	this.collisionAction=null;
	this.checkcollision=CheckCollision;
	this.CollisionWith=CollisionWith;
	this.ClearCollision=ClearCollision;
	
	//Action functions
	this.look=Look;
	this.take=Cantdo;
	this.use=Cantdo;
	this.speak=Cantdo;
	this.action=Action;
    this.SetConversation=SetConversation;
    this.UsableWith=UsableWith;
    this.SetUseAction=SetUseAction;
    this.Takable=Takable;
    this.DoorTo=IsDoorTo;
    
    this.Say=Say;
    this.SayTxt;
    this.Position=SetPosition;
    this.Hide=HideSprite;
    this.Show=ShowSprite;
    this.Resize=Resize;
    this.SetOpacity=SetOpacity;
}

function InvisibleSprite(polygon)
{
	this.id;
	this.polygon=polygon;
	this.description=TextDefaultDescription;
	
	this.action=ActionInvisible;
	this.look=Look;
	this.take=Cantdo;
	this.use=Cantdo;
	this.speak=Cantdo;
	this.UsableWith=UsableWith;
    this.DoorTo=IsDoorTo;
	this.Say=Say;
	this.use=Cantdo;
}

function Inventory(id)
{
//Variables
	this.image=document.createElement('IMG');
	this.id=id;
	this.fromDiv;
	this.name;
	this.image.style.width=iconsize +"px"
	this.image.style.height=iconsize +"px"
}

function GameText(name,div,x,y,txt)
{
//Variables
  this.name=name;
  this.div=div;
  this.x=x;
  this.y=y;
  
//Functions
  this.ChangeText=ChangeText;
}
