//The main function
var Box;

function Main()
{
	//Title of the Room
	SetTitle("Gym");
	
	//Creating Scene and menu
	CreateScreen("gym","400,398,793,397,691,192,620,192,618,218,605,232,583,233,567,217,567,190,495,191,489,211,411,212,406,195,384,195,378,212,255,212,253,192,157,194,154,208,132,215,116,217,100,211,7,397,400,398");
	
	//Adding the player
	CreatePlayer(80,190);
	Player.status=RightStatus; //We made look to right to our player, by default our player looks to left
	
	//-Door
	Window=CreateInvisibleObject("47,185,31,172,19,139,26,81,52,40,69,64,72,94,67,141");
	Window.description="Go outside";
	Window.DoorTo("outsideleft",400,150);
	
	//-Barrel
	Barrel=CreateInvisibleObject("123,215,110,207,101,186,107,165,124,155,138,160,146,167,155,184,144,204");
	Barrel.look=LookBarrel;
	if(!SearchParameter("WateronGrandad"))
	{
		Barrel.UsableWith("Barrel",UseBarrel);
	}
	
	//-Pic
	Pic=CreateInvisibleObject("127,101,126,54,149,53,147,101,147,100,143,101");
	Pic.description="It says: 'Be water my friend.'";  
	
	//-Pic2
	Pic2=CreateInvisibleObject("528,107,530,59,550,61,549,105");
	Pic2.description="It says: 'What you do not wish for yourself, do not do to others.'";  
	
	//-Pic3
	Pic3=CreateInvisibleObject("642,107,641,57,664,60,664,106");
	Pic3.description="It says: 'Knowledge is recognizing what you know and what you don't.'";  
	
	//-Sword
	Sword1=CreateInvisibleObject("261,165,375,166,379,204,256,206");
	Sword1.description="Training swords";  
	
	//-Sword2
	Sword2=CreateInvisibleObject("393,162,502,163,502,169,484,169,487,203,415,206,412,190,414,168,397,171");
	Sword2.description="Big swords";
	Sword2.take=takeBigSword;
	
	//-Sword3
	Sword3=CreateInvisibleObject("565,116,566,91,627,89,623,120");
	Sword3.description="Swords, nothing special.";  
	
	//-Sword4
	Sword4=CreateInvisibleObject("565,73,563,52,624,48,625,74");
	Sword4.description="More swords... too many swords...";  
	
	//-Table
	Table=CreateInvisibleObject("573,215,573,135,618,137,616,218");
	Table.description="Oh! today I look like beautiful, apart of that nothing here.";
	Table.take=takeTable;
	Table.use=Table.take; 
	
	//-Window 2
	Window2=CreateInvisibleObject("337,111,304,107,270,84,264,62,290,33,330,24,367,26,402,43,418,69,406,91,380,103");     
	Window2.description="Goes to the outside.";
	Window2.use=openWindow2;
	
	//-Stairs
	Stairs=CreateInvisibleObject("194,319,281,317,289,390,177,389");	
	Stairs.description="The box don't let me pass.";
	
	BoxDestroyed=CreateObject("BoxDestroyed",60,260);
	
	//-Box
	if(!SearchParameter("BoxDestroyed"))
	{
		BoxDestroyed.Hide();
		Box=CreateObject("Box",185,280);
		Box.description="A wooden box, It seems there is something under it.";
		Box.use=useBox; 
	}else{
		BoxDestroyed.Show();
		Stairs.description="I'm afraid, It's dark";
		Stairs.DoorTo("underground");
	}
	
	//-Mainroom Door
	Mainroomdoor=CreateInvisibleObject("772,346,692,186,694,26,776,52,772,346");
	Mainroomdoor.description="Something is blocking the door.";
	
	if(SearchParameter("YingFingRanaway"))
	{
		Mainroomdoor.DoorTo("hall2");
		Mainroomdoor.description="Door to the main room.";
	}
	
	//-Vampire
	Vampire=CreateObject("Enemy",640,200);
	
	if(!SearchParameter("VampireControlled"))
	{
		var VampirePath=new Array(722,382,654,213);
		Vampire.description="A Chinese vampire, he's blocking the door. I must defeat him.";
		Vampire.SetUseAction(controlVampire);	
		Vampire.SetPath(VampirePath,true);
		Vampire.CollisionWith(Player,VampireCollidePlayer);
		
	}else{
		Vampire.FollowObject(Player);
		if(Box!=undefined) Vampire.CollisionWith(Box,VampireCollideBox);
	}
	
	
	//-Bedroom Door
	BedroomDoor=CreateObject("SouthDoor",280,388);
	BedroomDoor.description="Door to my bedroom.";
	if(!SearchParameter("BedroomDoorOpen"))
	{
		BedroomDoor.use=openBedroomDoor;
	}else{
		BedroomDoor.DoorTo("bedroom",350,140);
	}
	

}

function controlVampire()
{
	if(ObjectToUse()=="Spell")
	{
		Player.Say("I cannot put the spell to the vampire like that, I need something more to do it.");	
	}else if(ObjectToUse()=="TaoistSword"){		
		Player.Say("Done, now the vampire will follow me");
		Vampire.StopPath();
		Vampire.CollisionWith(Box,VampireCollideBox);
		Vampire.FollowObject(Player);
		RemoveInventoryObject();
		AddInventory("Sword");
		CreateParameter("VampireControlled");	
	}
}

function LookBarrel()
{
	Player.Say("It's full of water.");
	if(!SearchParameter("BarrelLooked"))
	{
		CreateParameter("BarrelLooked");
	}
}

function UseBarrel()
{
	RemoveInventoryObject();
	AddInventory("BarrelWater");
}

function VampireCollidePlayer()
{
	Player.Position(Player.x-100,Player.y);
	Player.Say("Outch");
}

function openBedroomDoor()
{
	CreateParameter("BedroomDoorOpen");
	Player.Say("Now, it's open.");
	BedroomDoor.DoorTo("bedroom",350,140);
}

function takeBigSword()
{
	Player.Say("I can't take them, they are too heavy.");
}

function takeTable()
{
	Player.Say("The drawer is closed with key.");
}

function openWindow2()
{
	Player.Say("It's closed.");
}

function useBox()
{
	Player.Say("I can't move it.");	
}

function VampireCollideBox()
{
	DestroyObject(Box);
	BoxDestroyed.Show();
	Vampire.CollisionWith(null);
	CreateParameter("BoxDestroyed");
	Stairs.DoorTo("underground");
}
