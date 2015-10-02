//Variables
AddPreload("Yingfing","front");

//The main function
function Main()
{
	//Title of the Room
	SetTitle("Main Room");
	
	//Creating Scene and menu
	CreateScreen("kitchen","404,189,694,189,728,257,437,259,438,272,735,272,795,397,3,399,105,197,289,196,290,208,401,207");
	
	//Adding the player
	CreatePlayer(20,260);
	
	Byobu=CreateObject("Byobu",587,135);
	Byobu2=CreateObject("Byobu",437,135);
	
	Hall2Door=CreateInvisibleObject("24,344,27,47,107,28,106,187,76,246,24,344");
	Hall2Door.description="Door to the gym";
	Hall2Door.DoorTo("hall2",500,175);
		
	if(SearchParameter("YingFingRanaway"))
	{
		Yingfing=CreateObject("Yingfing",332,176);
		Yingfing.status="front";
		Yingfing.SetOpacity(30);
	}
	
	OutsideDoor=CreateObject("SouthDoor",280,388);
	OutsideDoor.description="Goes to the vampire's room. It's closed.";	
	
}
	
