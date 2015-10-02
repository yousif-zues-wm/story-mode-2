//Variables
var Trees;
var Road;
	
//The main function
function Main()
{
  //Title of the Room
  SetTitle("Unknown place");
  
  //Creating Scene and menu
  CreateScreen("underground","0,173,327,174,335,188,350,187,355,177,438,174,447,188,460,188,466,176,625,170,627,190,637,193,638,240,641,247,707,249,703,173,794,179,797,396,3,396");
  CreateOverScreen("darkness");

  //Adding the player
  CreatePlayer(377,90);
  
  DoorGym=CreateInvisibleObject("350,25,349,8,449,7,447,23,446,23,448,23");
  
  Stairs=CreateInvisibleObject("338,1,454,4,455,179,340,179");
  Stairs.DoorTo("gym");
  
  if(!SearchParameter("YingFingRanaway"))
  {
	  Yingfing=CreateObject("Yingfing",750,215)
	  var YingfingPath=new Array(753,209,736,298,760,376,509,387,426,360,281,384,156,356,41,379,22,320,51,183,50,357,160,339,290,372,439,343,516,374,720,357,714,285,738,217);
	
	  Yingfing.SetPath(YingfingPath,true);
	  Yingfing.CollisionWith(Player,YingfingCollidePlayer);
	  YingfingSpeaks();
  }
  
}

function YingfingCollidePlayer()
{
	CreateParameter("YingFingRanaway");
	clearTimeout(YingfingTimer);
	Yingfing.walklimits=false;
	Yingfing.CollisionWith(DoorGym,YingfingCollideDoorGym);
	Yingfing.StopPath();
	Yingfing.Stop();
	Yingfing.Move(377,0);
	Player.Say("What the... Ying Fiiing... come here...");
}

function YingfingCollideDoorGym()
{
	Yingfing.ClearCollision();
	DestroyObject(Yingfing);
}

function YingfingSpeaks()
{
	if(ScreenLoaded)
	{
		Yingfing.Say("Cuii cuii cuii");
	}
	YingfingTimer=setTimeout("YingfingSpeaks()",200);
}
