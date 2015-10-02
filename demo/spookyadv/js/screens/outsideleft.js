//Variables

//The main function
function Main()
{
	//Title of the Room
	SetTitle("Outside the house");
	
	//Creating Scene and menu
	CreateScreen("outsideleft","216,287,245,249,281,249,290,237,290,222,312,184,329,166,796,167,796,398,3,398,3,229,57,230,51,258,26,275,41,283,53,285,43,311,75,299,62,326,95,315,117,333,145,317,166,328,169,301,206,293");
	
	//Adding the player
	CreatePlayer(690,290);
	
	//-Windows
	Window1=CreateInvisibleObject("680,113,711,103,731,74,712,52,681,41,648,53,632,75,652,102");
	Window1.description="Window to my bedroom";
	Window1.DoorTo("bedroom",95,170);
	
	Window2=CreateInvisibleObject("423,112,453,105,473,73,458,51,422,39,390,49,375,74,393,103,396,104");
	Window2.description="Window to the gym";
	Window2.DoorTo("gym");
	
	Flower=CreateInvisibleObject("617,385,616,375,616,366,621,367,628,365,632,369,629,376,637,381,631,384,625,380");
	Flower.description="Nice flower, smells well.";
	
	Stone1=CreateInvisibleObject("787,271,780,266,789,257,774,252,776,239,786,233,795,233,799,245,801,266");
	Stone1.description="Just a stone.";
	
	Stone2=CreateInvisibleObject("264,317,259,296,248,286,240,286,230,299,232,305,243,308,237,315,240,322");
	Stone2.description="It seems there is something under this stone.";
	Stone2.take=TakeStone;
	Stone2.use=TakeStone;
	
	Tree=CreateInvisibleObject("211,287,175,265,168,197,174,181,201,185,244,181,264,164,289,167,304,154,326,150,337,142,365,110,353,94,355,69,364,49,369,19,362,4,1,3,5,158,35,176,58,186,65,205,57,262,36,276,68,271,66,283,48,304,86,285,89,294,65,320,95,299,106,318,100,298,124,287,123,305,117,330,138,304,162,325,146,296,159,292,163,298,167,280,187,293,181,282,192,287");
	Tree.description="Very old tree, It protects our family since long time ago.";
	
	Barrel=CreateObject("Barrel",360,155);
	Barrel.description="It's empty, I could fill it with something.";
	if(SearchParameter("BarrelLooked"))
	{
		Barrel.Takable();
	}
	
	Wood=CreateInvisibleObject("450,20,440,13,455,0,458,12");
	Wood.description="I can't see what's that from here, anyway it's too high I can't take it.";
	
	RoadLeft=CreateInvisibleObject("4,349,66,337,140,354,127,399,4,397");
	RoadLeft.description="Nothing here.";
	RoadLeft.DoorTo("forest");
	
	RoadRight=CreateInvisibleObject("768,391,767,322,799,323,799,393");
	RoadRight.description="Nothing here.";
	RoadRight.DoorTo("outsidefront",200,240);

}

function TakeStone()
{
	Player.Say("Eeecks... bugs... I won't take that.");
}
