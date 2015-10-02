//Variables
var TaoistConversation=new Array("Grandad! wake up.","...","Ying Fing is miss and the vampires are free.","...","I must find Ying Fing, later I will wake up him.");
AddPreload("Grandad","knocked");

//The main function
function Main()
{
	//Title of the Room
	SetTitle("Outside the house");
	
	//Creating Scene and menu
	CreateScreen("outsideright","543,250,587,260,622,398,2,396,1,167,490,171,508,247");
	
	//Adding the player
	CreatePlayer(20,260);
	
	Window1=CreateInvisibleObject("116,39,154,53,164,79,143,106,120,110,81,98,70,71,89,46");
	Window1.description="I cannot open it, I see three vampires blocking the door to the gym.";
	
	Window2=CreateInvisibleObject("375,39,408,50,424,75,405,102,379,109,348,101,329,75,345,50");
	Window2.description="Closed ... It seems grandad closed everything to protect me.";
	
	//Persons
	Grandad=CreateObject("Grandad",350,260);
	Grandad.description="Oh my God! my grandad was knocked by the vampires.";
	Grandad.status="knocked";
	Grandad.SetConversation(TaoistConversation);
	Grandad.SetUseAction(GrandadUse);
	
	//Objects
	Sword=CreateObject("Sword",450,270);
	Sword.description="It's my grandad's sword";
	Sword.Takable();
	
	//Doors
	Road=CreateInvisibleObject("2,322,32,321,35,396,0,398,2,393,3,398");
	Road.description="It goes to the front of the house.";
	Road.DoorTo("outsidefront",550,240);
	
}

function GrandadUse()
{
	if(ObjectToUse()=="BarrelWater")
	{
		if(!SearchParameter("WateronGrandad"))
		{
			RemoveInventoryObject();
			AddInventory("Barrel");
			CreateParameter("WateronGrandad");
			Grandad.Say("Tea!... hmmm... tea!");
		}
	}else if(ObjectToUse()=="BarrelTea")
	{
		if(!SearchParameter("TalkedwithGrandad"))
		{
			RemoveInventoryObject();
			AddInventory("Barrel");
			CreateParameter("TalkedwithGrandad");
			Grandad.status="weak";
			Grandad.Say("Spells, ");
		}
	}else{
		Player.Say("It doesn't work with him.");
	}
}
