// ==UserScript==
// @name        WME Link to German States Geo Portals
// @description This script create buttons to open Geo portals of German states, using the WME paramenters where supported.
// @namespace   https://github.com/iridium1-waze/WME-L2DEGEO/blob/main/WME%20L2DEGEO.user.js
// @version     2021.01.17.01
// @include     https://*.waze.com/editor*
// @include     https://*.waze.com/*/editor*
// @grant       none
// @icon        https://raw.githubusercontent.com/iridium1-waze/WME-L2DEGEO/blob/main/de-map.png

// ==/UserScript==

// Mini howto:
// 1) install this script as GitHub script
// 2) Click on any of the links includes to open the state GEO portal, PL Data will be handed over where supported.

var L2DEGEO = "2021.01.17.01";
//by Iridium1 (contact either PM or iridium1.waze@gmail.com)
//01: Initial release

if ('undefined' == typeof __RTLM_PAGE_SCOPE_RUN__) {
  (function page_scope_runner()
   {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.textContent = "var __RTLM_PAGE_SCOPE_RUN__ = true;\n" + my_src;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.  Use setTimeout to force execution "outside" of
    // the user script scope completely.
    setTimeout(function() {
          document.body.appendChild(script);
          add_buttons();
        }, 3000);
  })();

  return;
}

/*
double[] WGS84toGoogleBing(double lon, double lat) {
  double x = lon * 20037508.34 / 180;
  double y = Math.Log(Math.Tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
  y = y * 20037508.34 / 180;
  return new double[] {x, y};
}

double[] GoogleBingtoWGS84Mercator (double x, double y) {
  double lon = (x / 20037508.34) * 180;
  double lat = (y / 20037508.34) * 180;

  lat = 180/Math.PI * (2 * Math.Atan(Math.Exp(lat * Math.PI / 180)) - Math.PI / 2);
  return new double[] {lon, lat};
}
*/

function getQueryString (link, name)
{
    var pos = link.indexOf(name + '=' ) + name.length + 1;
    var len = link.substr(pos).indexOf('&');
    if (-1 == len) len = link.substr(pos).length;
    return link.substr(pos,len);
}

function CorrectZoom (link)
{
    var found = link.indexOf('livemap');
    return (-1 == found)?13:2;
}

function add_buttons()
{

var bawbtn = $('<button style="width: 90px;height: 24px;font-size:90%;color: DarkSlateGrey;background-image: url(https://raw.githubusercontent.com/iridium1-waze/WME-L2DEGEO/blob/main/baden-wuertemberg.png;background-repeat: no-repeat;border-radius: 7px">Baden-Würtemberg</button>');
bawbtn.click(function(){

    var mapsUrl = 'https://www.geoportal-bw.de' ;
    window.open(mapsUrl,'_blank');
});

var baybtn = $('<button style="width: 90px;height: 24px;font-size:90%;color: CornflowerBlue;background-image: url(https://raw.githubusercontent.com/iridium1-waze/WME-L2DEGEO/blob/main/bayern.png);background-repeat: no-repeat;border-radius: 7px">&nbsp;&nbsp;Bayern</button>');
baybtn.click(function(){
    var href = $('.WazeControlPermalink a').attr('href');

    var lon = parseFloat(getQueryString(href, 'lon'));
    var lat = parseFloat(getQueryString(href, 'lat'));
    var zoom = parseInt(getQueryString(href, 'zoom')) + CorrectZoom(href);

    zoom = zoom-6;

   // Using Proj4js to transform coordinates. See http://proj4js.org/
   var script = document.createElement("script"); // dynamic load the library from https://cdnjs.com/libraries/proj4js
   script.type = 'text/javascript';
   script.src = 'https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.4.4/proj4.js';
   document.getElementsByTagName('head')[0].appendChild(script); // Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
   script.onload = popAtlas; //wait till the script is downloaded & executed
   function popAtlas() {
   //just a wrapper for onload
     if (proj4) {
       firstProj= "+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
       var utm = proj4(firstProj,[lon,lat]);
    var mapsUrl = 'https://geoportal.bayern.de/bayernatlas/index.html?zoom=' + zoom + '&lang=de&topic=ba&bgLayer=atkis&catalogNodes=11,222&E=' + utm[0] +'&N=' + utm[1] ;
    window.open(mapsUrl,'_blank');
     }
   }
});

var berbtn = $('<button style="width: 90px;height: 24px;font-size:90%;color: DarkSlateGrey;background-image: url(https://raw.githubusercontent.com/iridium1-waze/WME-L2DEGEO/blob/main/berlin.png);background-repeat: no-repeat;border-radius: 7px">Berlin</button>');
berbtn.click(function(){

    var mapsUrl = 'https://fbinter.stadt-berlin.de/fb/index.jsp!' ;
    window.open(mapsUrl,'_blank');
});

var brabtn = $('<button style="width: 90px;height: 24px;font-size:90%;color: DarkSlateGrey;background-image: url(https://raw.githubusercontent.com/iridium1-waze/WME-L2DEGEO/blob/main/brandenburg.png);background-repeat: no-repeat;border-radius: 7px">Brandenburg</button>');
brabtn.click(function(){

    var mapsUrl = 'https://geoportal.brandenburg.de/geodaten/suche-nach-geodaten' ;
    window.open(mapsUrl,'_blank');
});

var brebtn = $('<button style="width: 90px;height: 24px;font-size:90%;color: DarkSlateGrey;background-image: urlurl(https://raw.githubusercontent.com/iridium1-waze/WME-L2DEGEO/blob/main/bremen.png);background-repeat: no-repeat;border-radius: 7px">Bremen</button>');
brebtn.click(function(){

    var mapsUrl = 'https://geobasis.bremen.de/ASWeb/ASC_URM/portallogin.jsp' ;oom;
    window.open(mapsUrl,'_blank');
});

var hambtn = $('<button style="width: 90px;height: 24px;font-size:90%;color: DarkSlateGrey;background-image: urlurl(https://raw.githubusercontent.com/iridium1-waze/WME-L2DEGEO/blob/main/hamburg.png);background-repeat: no-repeat;border-radius: 7px">Hamburg</button>');
hambtn.click(function(){

    var mapsUrl = 'https://geoportal-hamburg.de/geo-online' ;
    window.open(mapsUrl,'_blank');
});

var hesbtn = $$('<button style="width: 90px;height: 24px;font-size:90%;color: DarkSlateGrey;background-image: urlurl(https://raw.githubusercontent.com/iridium1-waze/WME-L2DEGEO/blob/main/hessen.png);background-repeat: no-repeat;border-radius: 7px">Hessen</button>');
hesbtn.click(function(){

    var mapsUrl = 'http://www.geoportal.hessen.de/portal/karten.html' ;
    window.open(mapsUrl,'_blank');
});

var mevbtn = $('<button style="width: 90px;height: 24px;font-size:90%;color: DarkSlateGrey;background-image: urlurl(https://raw.githubusercontent.com/iridium1-waze/WME-L2DEGEO/blob/main/mecklenburg-vorpommern.png);background-repeat: no-repeat;border-radius: 7px">Mecklenburg-Vorpommern</button>');
mev_btn.click(function(){

    var mapsUrl = 'https://www.geoportal-mv.de/portal/Geodatenviewer/GAIA-MVlight' ;
    window.open(mapsUrl,'_blank');
});

var niebtn = $('<button style="width: 90px;height: 24px;font-size:90%;color: DarkSlateGrey;background-image: urlurl(https://raw.githubusercontent.com/iridium1-waze/WME-L2DEGEO/blob/main/niedersachsen.png);background-repeat: no-repeat;border-radius: 7px">Niedersachsen</button>');
niebtn.click(function(){

    var mapsUrl = 'https://www.geobasis.niedersachsen.de' ;
    window.open(mapsUrl,'_blank');
});

var nrwbtn = $('<button style="width: 90px;height: 24px;font-size:90%;color: DarkSlateGrey;background-image: urlurl(https://raw.githubusercontent.com/iridium1-waze/WME-L2DEGEO/blob/main/nordrhein-westfalen.png);background-repeat: no-repeat;border-radius: 7px">Nordrhein-Westfalen</button>');
nrwbtn.click(function(){

    var mapsUrl = 'https://www.geoportal.nrw' ;
    window.open(mapsUrl,'_blank');
});

var rhebtn = $('<button style="width: 90px;height: 24px;font-size:90%;color: DarkSlateGrey;background-image: urlurl(https://raw.githubusercontent.com/iridium1-waze/WME-L2DEGEO/blob/main/rheinland-pfalz.png);background-repeat: no-repeat;border-radius: 7px">Rheinland-Pfalz</button>');
rhebtn.click(function(){

    var mapsUrl = 'https://www.geoportal.rlp.de' ;
    window.open(mapsUrl,'_blank');
});

var saabtn = $('<button style="width: 90px;height: 24px;font-size:90%;color: DarkSlateGrey;background-image: urlurl(https://raw.githubusercontent.com/iridium1-waze/WME-L2DEGEO/blob/main/saarland.png);background-repeat: no-repeat;border-radius: 7px">Saarland</button>');
saa_btn.click(function(){

    var mapsUrl = 'https://geoportal.saarland.de' ;
    window.open(mapsUrl,'_blank');
});

var sacbtn = $('<button style="width: 90px;height: 24px;font-size:90%;color: DarkSlateGrey;background-image: urlurl(https://raw.githubusercontent.com/iridium1-waze/WME-L2DEGEO/blob/main/sachsen.png);background-repeat: no-repeat;border-radius: 7px">Sachsen</button>');
sacbtn.click(function(){

    var mapsUrl = 'https://geoportal.sachsen.de/cps/karte.html?showmap=true'
    window.open(mapsUrl,'_blank');
});

var sanbtn = $('<button style="width: 90px;height: 24px;font-size:90%;color: DarkSlateGrey;background-image: urlurl(https://raw.githubusercontent.com/iridium1-waze/WME-L2DEGEO/blob/main/sachsen-anhalt.png);background-repeat: no-repeat;border-radius: 7px">Sachsen-Anhalt</button>');
sanbtn.click(function(){

    var mapsUrl = 'https://www.lvermgeo.sachsen-anhalt.de/de/startseite_viewer.html' ;
    window.open(mapsUrl,'_blank');
});

var sho_btn = $('<button style="width: 90px;height: 24px;font-size:90%;color: DarkSlateGrey;background-image: urlurl(https://raw.githubusercontent.com/iridium1-waze/WME-L2DEGEO/blob/main/schleswig-holstein.png);background-repeat: no-repeat;border-radius: 7px">Schleswig-Holstein</button>');
sho_btn.click(function(){

    var mapsUrl = 'https://danord.gdi-sh.de/viewer/resources/apps/Anonym/index.html?lang=de' ;
    window.open(mapsUrl,'_blank');
});

var thu_btn = $('<button style="width: 90px;height: 24px;font-size:90%;color: DarkSlateGrey;background-image: urlurl(https://raw.githubusercontent.com/iridium1-waze/WME-L2DEGEO/blob/main/thueringen.png);background-repeat: no-repeat;border-radius: 7px">Thüringen</button>');
thu_btn.click(function(){

    var mapsUrl = 'https://www.geoportal-th.de/de-de' ;
    window.open(mapsUrl,'_blank');
});

var deu_btn = $('<button style="width: 90px;height: 24px;font-size:90%;color: DarkSlateGrey;background-image: urlurl(https://raw.githubusercontent.com/iridium1-waze/WME-L2DEGEO/blob/main/deutschland.png);background-repeat: no-repeat;border-radius: 7px">DE Webatlas</button>');
deu_btn.click(function(){
   var href = $('.WazeControlPermalink a').attr('href');

    var lon = parseFloat(getQueryString(href, 'lon'));
    var lat = parseFloat(getQueryString(href, 'lat'));
    var zoom = parseInt(getQueryString(href, 'zoom')) + CorrectZoom(href);
   zoom = zoom -6.5;

   // Using Proj4js to transform coordinates. See http://proj4js.org/
   var script = document.createElement("script"); // dynamic load the library from https://cdnjs.com/libraries/proj4js
   script.type = 'text/javascript';
   script.src = 'https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.4.4/proj4.js';
   document.getElementsByTagName('head')[0].appendChild(script); // Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
   script.onload = popAtlas; //wait till the script is downloaded & executed
   function popAtlas() {
   //just a wrapper for onload
     if (proj4) {
       firstProj= "+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
       var utm = proj4(firstProj,[lon,lat]);
       var mapsUrl = 'https://sg.geodatenzentrum.de/web_bkg_webmap/applications/webatlasde/webatlasde.html?zoom=' + zoom + '&lon=' + utm[0] + '&lat=' + utm[1] + '&layers=B0T';
       window.open(mapsUrl,'_blank');
     }
   }

});



var txtbtn1 = $('<button style="width: 285px;height: 24px; border: 1px solid silver; font-size:80%; font-weight: bold; color: DarkSlateGrey; background-color: ghostwhite; border-radius: 7px;">ALLGEMEINE KARTEN</button>');
var txtbtn2 = $('<button style="width: 285px;height: 24px; border: 1px solid silver; font-size:80%; font-weight: bold; color: DarkCyan; background-color: ghostwhite;; border-radius: 7px">BLITZER</button>');
var txtbtn3 = $('<button style="width: 285px;height: 24px; border: 1px solid silver; font-size:80%; font-weight: bold; color: DarkGreen; background-color: ghostwhite; border-radius: 7px">GESCHWINDIGKEITEN / BILDER</button>');
var txtbtn4 = $('<button style="width: 285px;height: 24px; border: 1px solid silver; font-size:80%; font-weight: bold; color: CornflowerBlue; background-color: ghostwhite; border-radius: 7px">GEOPORTALE</button>');
var txtbtn5 = $('<button style="width: 285px;height: 24px; border: 1px solid silver; font-size:80%; font-weight: bold; color: LightSeaGreen; background-color: ghostwhite; border-radius: 7px;">WAZE INTERN</button>');
var spacer = '<p style="margin-bottom:10px">'

// add new box to left of the map
var addon = document.createElement("section");
addon.id = "l2degeo-addon";

addon.innerHTML =
    '<a href="https://greasyfork.org/scripts/3080-wme-permalink-to-serveral-maps/code/WME%20Permalink%20to%20serveral%20Maps.user.js" target="_blank">Permalink to several maps / V' + l2degeo_version + '</a><p>';

//alert("Create Tab");
var userTabs = document.getElementById('user-info');
var navTabs = document.getElementsByClassName('nav-tabs', userTabs)[0];
var tabContent = document.getElementsByClassName('tab-content', userTabs)[0];

newtab = document.createElement('li');
newtab.innerHTML = '<a href="#sidepanel-l2degeo" data-toggle="tab">l2degeo</a>';
navTabs.appendChild(newtab);

addon.id = "sidepanel-l2degeo";
addon.className = "tab-pane";
tabContent.appendChild(addon);


//$("#sidepanel-L2DEGEO").append(btn0);


$("#sidepanel-l2degeo").append(txtbtn1);          // ■■■■■ "GEOPORTALE DER BUNDESLÄNDER" ■■■■■
$("#sidepanel-l2degeo").append(spacer);
$("#sidepanel-l2degeo").append(baw_btn);            //Baden-Würtemberg
$("#sidepanel-l2degeo").append('&nbsp;&nbsp;');
$("#sidepanel-l2degeo").append(baw_btn);            //Bayern
$("#sidepanel-l2degeo").append('&nbsp;&nbsp;');
$("#sidepanel-l2degeo").append(ber_btn);            //Berlin
$("#sidepanel-l2degeo").append('<br><br>');
$("#sidepanel-l2degeo").append(bra_btn);            //Brandenburg
$("#sidepanel-l2degeo").append('&nbsp;&nbsp;');
$("#sidepanel-l2degeo").append(bre_btn);            //Bremen
$("#sidepanel-l2degeo").append('&nbsp;&nbsp;');
$("#sidepanel-l2degeo").append(ham_btn);            //Hamburg
$("#sidepanel-l2degeo").append('<br><br>');
$("#sidepanel-l2degeo").append(hes_btn);			//Hessen
$("#sidepanel-l2degeo").append('<br><br>');
$("#sidepanel-l2degeo").append(mev_btn);            //Mecklenburg-Vorpommern
$("#sidepanel-l2degeo").append('&nbsp;&nbsp;');
$("#sidepanel-l2degeo").append(nie_btn);			//Niedersachsen
$("#sidepanel-l2degeo").append('<br><br>');
$("#sidepanel-l2degeo").append(nrw_btn);			//Nordrhein-Westfalen
$("#sidepanel-l2degeo").append('<br><br>');
$("#sidepanel-l2degeo").append(rhe_btn);            //Rheinland-Pfalz
$("#sidepanel-l2degeo").append('<br><br>');
$("#sidepanel-l2degeo").append(saa_btn);            //Saarland
$("#sidepanel-l2degeo").append('<br><br>');
$("#sidepanel-l2degeo").append(sac_btn);            //Sachsen
$("#sidepanel-l2degeo").append('<br><br>');
$("#sidepanel-l2degeo").append(san_btn);            //Sachsen-Anhalt
$("#sidepanel-l2degeo").append('<br><br>');
$("#sidepanel-l2degeo").append(sho_btn);            //Schleswig-Holstein
$("#sidepanel-l2degeo").append('<br><br>');
$("#sidepanel-l2degeo").append(thu_btn);            //Thüringen


$("#sidepanel-l2degeo").append('<br><br>');       //  ■■■■■ "GEOPORTAL DE" ■■■■■
$("#sidepanel-l2degeo").append(txtbtn2);
$("#sidepanel-l2degeo").append(spacer);
$("#sidepanel-l2degeo").append(deu_btn);            //Webatlas


//$("#sidepanel-l2degeo").append(btn3b);
//$("#sidepanel-l2degeo").append(btn11);
}
