//Variables
var Window1;
var Window2;
var Tree;
var Flower;
var Stone1;
var Stone2;
var Wood;
var Barrel;
var Road;
var Road2;

//The main function
function Main()
{
  //Title of the Room
  SetTitle("Outside the house");
  
  //Creating Scene and menu
  CreateScreen("outside","0,397,0,341,161,337,218,276,218,250,274,250,310,167,797,168,800,399");
  SetScreenLimits(0,800,185);

  //Adding the player
  CreatePlayer(620,190);
  
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
  
  Barrel=CreateInvisibleObject("367,182,352,174,351,164,358,155,371,154,377,164,378,174");
  Barrel.description="It's empty, I could fill it with something.";
  
  Wood=CreateInvisibleObject("450,20,440,13,455,0,458,12");
  Wood.description="I can't see what's that from here, anyway it's too high I can't take it.";
  
  Road=CreateInvisibleObject("4,349,66,337,140,354,127,399,4,397");
  Road.description="Nothing here.";
  Road.DoorTo("forest");

}

function TakeStone(){
	Player.Say("Eeecks... bugs... I won't take that.");
}
