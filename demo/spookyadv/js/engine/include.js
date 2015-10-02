/*
 * 
 * JSGAM (JavaScript Graphic Adventure Engine)
 * Version: 3.0
 * License: BSD
 * 
 * Author:   Kreezii
 * E-mail:  kreeziidaemon@yahoo.es 
 * Webpage: http://jsgam.sourceforge.net	     
 * 
*/
//This file inserts the script files into the HTML (main.html)
var loadedScripts;

function AddJS()
{
	//Varibles
	var scriptsrc=new Array();
	var scripts=new Array();
	var engineFolder="js/engine/";
	var sourceFolder="js/screens/";

	scriptsrc[0]=engineFolder+'global.js';
	scriptsrc[1]=engineFolder+'create.js';
	scriptsrc[2]=engineFolder+'utils.js';
	scriptsrc[3]=engineFolder+'engine.js';
	scriptsrc[4]=engineFolder+'preload.js';
	scriptsrc[5]=engineFolder+'actions.js';
	scriptsrc[6]=engineFolder+'language.js';
	scriptsrc[7]=engineFolder+'cookies.js';
	scriptsrc[8]=sourceFolder; 
	
	//Get the screen from the cookies
	var results = document.cookie.match ( '(^|;) ?' + "Screen" + '=([^;]*)(;|$)' );
	
	if ( results )
	{
		scriptsrc[8]+=unescape ( results[2] )+'.js'; 
	}else{
		scriptsrc[8]+='title.js';//By default it's the title screen
	}
	
	//Insert the files in the HEAD of the HTML
	for(var i=0;i<scriptsrc.length;i++)
	{
		scripts[i]=document.createElement("script");
		scripts[i].language="Javascript";
		scripts[i].type="text/javascript";
		scripts[i].src=scriptsrc[i];
		scripts[i].onload=function(){loadedScripts--;};
		
		var head = document.getElementsByTagName('head').item(0);
		head.appendChild(scripts[i]);
	}

	loadedScripts=scripts.length;
	PreloadJS();
}

function PreloadJS(){

	if(loadedScripts<=0)
	{
		Onloadfunctions();
	}else{
		setTimeout("PreloadJS()",10);
	}
}

window.onload=AddJS;
