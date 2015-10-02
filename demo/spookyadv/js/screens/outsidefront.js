//The main function
function Main()
{
	//Title of the Room
	SetTitle("Outside the house");
	
	//Creating Scene and menu
	CreateScreen("outsidefront","228,217,186,217,175,232,145,239,143,269,124,280,95,288,95,301,78,302,67,295,62,282,46,282,22,290,0,293,1,405,806,407,806,249,788,254,782,274,746,290,709,288,675,282,654,274,664,255,673,255,688,254,712,254,726,248,745,245,757,245,773,242,778,241,759,235,744,234,732,241,727,234,722,226,706,225,684,227,681,229,685,243,669,247,665,243,659,231,636,221,617,215,595,210,564,209,553,211,549,246,542,254,526,254,518,245,524,232,521,218,507,213,260,214,253,227,260,243,261,248,253,255,234,253,229,249");
	CreateOverScreen("trees2");
	
	//Adding the player
	CreatePlayer(370,250);
	Player.Resize(45);
	
	RoadLeft=CreateInvisibleObject("213,258,193,238,197,218,229,218,231,247");
	RoadLeft.description="Nothing here.";
	RoadLeft.DoorTo("outsideleft");
	
	RoadRight=CreateInvisibleObject("552,242,553,214,579,218,580,244,565,252");
	RoadRight.description="Nothing here.";
	RoadRight.DoorTo("outsideright");
	
	MainDoor=CreateInvisibleObject("359,212,360,151,420,152,420,210");
	MainDoor.description="It's closed";
	
	if(SearchParameter("MainDoorOpen"))
	{
		MainDoor.DoorTo("mainroom");
	}
	
	Water=CreateInvisibleObject("706,284,668,270,680,257,717,256,748,254,771,248,768,271,736,283");
	Water.description="Water, leafs and fishes.";
	Water.UsableWith("Barrel",FillBarrel);
	
	Undies=CreateObject("Undies",710,215);
	Undies.description="The my grandad's undies.";
	Undies.Resize(40);
	
	if(SearchParameter("TalkedwithGrandad"))
	{
		Undies.description="Aha! I can scare the vampires with it.";
		Undies.Takable();
	}
	
	Shirt=CreateObject("Shirt",690,205);
	Shirt.description="The shirt is wet.";
	Shirt.Resize(80);
	
	Stick=CreateObject("Stick",700,205);
	Stick.description="It's used for dry the clothes.";
	Stick.Resize(70);
	
	Boots=CreateObject("Boots",680,240);
	Boots.description="Nice boots but I prefer my shoes.";
	Boots.Resize(80);
}

function FillBarrel()
{
	Player.Say("Too many fishes I don't want to take them, poor fishes.");
}
