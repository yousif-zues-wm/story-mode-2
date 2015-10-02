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
 * The next source code was taken from: http://www.elated.com/articles/javascript-and-cookies/
*/

var current_date = new Date;
var cookie_year = current_date.getFullYear ( ) + 1;
var cookie_month = current_date.getMonth ( );
var cookie_day = current_date.getDate ( );
	
function set_cookie ( name, value, exp_y, exp_m, exp_d, path, domain, secure )
{
  var cookie_string = name + "=" + escape ( value );

  if ( exp_y )
  {
    var expires = new Date ( exp_y, exp_m, exp_d );
    cookie_string += "; expires=" + expires.toGMTString();
  }

  if ( path )
        cookie_string += "; path=" + escape ( path );

  if ( domain )
        cookie_string += "; domain=" + escape ( domain );
  
  if ( secure )
        cookie_string += "; secure";
  
  document.cookie = cookie_string;
}

function get_cookie ( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}

function delete_cookie ( cookie_name )
{
  var cookie_date = new Date ( );  // current date & time
  cookie_date.setTime ( cookie_date.getTime() - 1 );
  document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}
