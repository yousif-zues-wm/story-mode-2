//This is an example Title Screen.
//Modify this file as you want following the tutorials

//The main function
function Main()
{
  //Title of the Room
  SetTitle("Hall");
  
  CreateScreen("hall2","145,397,247,193,509,194,607,394");
  CreatePlayer(400,150);
  
  HallDoor=CreateObject("SouthDoor",260,390);
  HallDoor.DoorTo("hall");
  
  GymDoor=CreateInvisibleObject("161,346,155,55,237,33,236,195");
  GymDoor.description="Door to gym. Weird, it's blocked from the other side.";
  //GymDoor.DoorTo("gym");
  
  KitchenDoor=CreateInvisibleObject("521,194,523,36,606,60,598,349");
  KitchenDoor.description="Door to the kitchen.";
  KitchenDoor.DoorTo("kitchen");
  
  Picture=CreateInvisibleObject("288,31,395,31,393,104,285,102");
  Picture.look=LookPicture;
}

function LookPicture()
{
	Player.Say("A vampire with a spell on the forehead and a taoist controlling with his wood sword.");
	if(!SearchParameter("VampirePicture"))
	{
		CreateParameter("VampirePicture");
	}
}
