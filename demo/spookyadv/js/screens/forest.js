//Variables
var Trees;
var Road;
var Wood;
var Stone1;
var Stone2;
var Rabbit;
var Lettuce;
var RabbitPath=new Array(457,322,321,282,233,310,156,290,77,333,35,363,93,385,220,371,288,377,457,380,630,377,659,305,606,227,463,234);
//The main function
function Main()
{
	//Title of the Room
	SetTitle("Forest");
	
	//Creating Scene and menu
	CreateScreen("forest","2,354,31,345,32,291,84,294,102,306,122,295,175,249,205,246,249,243,427,242,430,219,451,216,464,208,501,207,508,223,542,224,588,222,619,208,669,210,715,213,747,209,771,215,762,239,797,252,799,398,2,396");
	
	CreateOverScreen("trees");
	//Adding the player
	CreatePlayer(620,190);

	//Objects
	Road=CreateInvisibleObject("747,312,722,285,726,247,761,240,796,248,796,311");
	Road.description="It's just ground.";
	Road.DoorTo("outsideleft",20,300);
	
	Wood=CreateInvisibleObject("243,241,245,200,427,201,426,243");
	Wood.description="I wonder what It does here, It seems be useful to sit on.";
	
	Stone1=CreateInvisibleObject("287,335,257,327,263,308,278,296,293,309,280,318,288,327");
	Stone1.description="Stones...";
	
	Stone2=CreateInvisibleObject("735,227,727,213,743,206,748,225");
	Stone2.description="Stones...";
	
	Rabbit=CreateObject("Rabbit",365,296);
	Rabbit.SetPath(RabbitPath,true);
	
	Landscape=CreateInvisibleObject("289,5,281,35,322,49,356,144,379,118,408,158,429,103,456,144,484,92,509,132,532,108,554,150,573,107,590,117,606,90,625,105,638,89,626,79,643,53,663,47,688,51,722,44,702,1,648,0,626,37,607,3,358,0,340,37,320,0");
	Landscape.description="Wonderful view, I pass long time here looking at it.";

	Lettuce=CreateObject("Lettuce",20,275);
	Lettuce.description="It's just a vegetable.";
	Lettuce.Takable();
}
