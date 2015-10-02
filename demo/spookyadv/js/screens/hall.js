//This is an example Title Screen.
//Modify this file as you want following the tutorials

//The main function
function Main()
{
  //Title of the Room
  SetTitle("Hall");
  
  CreateScreen("hall","145,397,247,193,509,194,607,394");
  CreatePlayer(400,150);
  
  OutsideDoor=CreateObject("SouthDoor",260,390);
  OutsideDoor.description="Door to the outside, It's closed.";
  
  BedRoomDoor=CreateInvisibleObject("161,346,155,55,237,33,236,195");
  BedRoomDoor.description="Door to my bedroom.";
  BedRoomDoor.DoorTo("bedroom");
  
  Hall2Door=CreateInvisibleObject("260,183,258,20,498,20,498,184");
  Hall2Door.description="Door to other hall.";
  Hall2Door.DoorTo("hall2");
  
  MainRoomDoor=CreateInvisibleObject("521,194,523,36,606,60,598,349");
  MainRoomDoor.description="Door to the vampires room. It's closed.";
  //MainRoomDoor.DoorTo("bedroom");

}
