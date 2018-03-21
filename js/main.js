/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [37.7576793,-122.4576403],
  zoom: 12
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


/* =====================
Introduce the functions
===================== */

var dataset = "https://raw.githubusercontent.com/meiqingli/CPLN692-Midterm/master/data/road.geojson";
var featureGroup;

var myStyle = function(feature) {
  if (feature.properties.cls_hcm00 == "1")
  {return {color: '#8DD3C7'};}
  else if (feature.properties.cls_hcm00 == "2")
  {return {color: '#FFFFB3'};}
  else if (feature.properties.cls_hcm00 == "3")
  {return {color: '#BEBADA'};}
  else if (feature.properties.cls_hcm00 == "4")
  {return {color: '#FB8072'};}
  else if (feature.properties.cls_hcm00 == "Fwy")
  {return {color: '#80B1D3'};}
};

var showResults = function() {
  $('#intro').hide();
  $('#results').show();
};

var Filter = function(feature) {
  return true;};

var Filter1 = function(feature) {
  if (feature.properties.cls_hcm00 == "1"){return true;}
  else {return false;}
};

var Filter2 = function(feature) {
  if (feature.properties.cls_hcm00 == "2"){return true;}
  else {return false;}
};

var Filter3 = function(feature) {
  if (feature.properties.cls_hcm00 == "3"){return true;}
  else {return false;}
};

var Filter4 = function(feature) {
  if (feature.properties.cls_hcm00 == "4"){return true;}
  else {return false;}
};

var freewayFilter = function(feature) {
  if (feature.properties.cls_hcm00 == "Fwy"){return true;}
  else {return false;}
};

var myFilter = Filter;
var countPage = 0;

$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
      style: myStyle,
      onEachFeature: function(feature,layer){
        layer.bindPopup(feature.properties.cmp_name);
      },
      filter: myFilter,
    }).addTo(map);
  });
});

$('#next').click(function(event){
countPage ++;
$('#previous').show();
$('#back').show();
map.removeLayer(featureGroup);
 if (countPage == 1){
  myFilter = Filter1;
  streettype = "Urban Street I";
 }
 if (countPage == 2){
  myFilter = Filter2;
  streettype = "Urban Street II";
 }
 if (countPage == 3){
  myFilter = Filter3;
  streettype = "Urban Street III";
 }
 if (countPage == 4){
  myFilter = Filter4;
  streettype = "Urban Street IV";
 }
 if (countPage == 5){
  myFilter = freewayFilter;
  streettype = "Freeway";
  $('#next').hide();
 }
 $(".street-type").text(streettype);
 showResults();
 $(document).ready(function() {
   $.ajax(dataset).done(function(data) {
     var parsedData = JSON.parse(data);
     featureGroup = L.geoJson(parsedData, {
       style: myStyle,
       onEachFeature: function(feature,layer){
         layer.bindPopup(feature.properties.cmp_name);
       },
       filter: myFilter,
     }).addTo(map);
   });
 });
});

$('#previous').click(function(){
  countPage --;
  $('#next').show();
  map.removeLayer(featureGroup);
   if (countPage == 1){
    myFilter = Filter1;
    streettype = "Urban Street I";
    $('#previous').hide();
   }
   if (countPage == 2){
    myFilter = Filter2;
    streettype = "Urban Street II";
   }
   if (countPage == 3){
    myFilter = Filter3;
    streettype = "Urban Street III";
   }
   if (countPage == 4){
    myFilter = Filter4;
    streettype = "Urban Street IV";
   }
   if (countPage == 5){
    myFilter = freewayFilter;
    streettype = "Freeway";
   }
   $(".street-type").text(streettype);
   showResults();
   $(document).ready(function() {
     $.ajax(dataset).done(function(data) {
       var parsedData = JSON.parse(data);
       featureGroup = L.geoJson(parsedData, {
         style: myStyle,
         onEachFeature: function(feature,layer){
           layer.bindPopup(feature.properties.cmp_name);
         },
         filter: myFilter,
       }).addTo(map);
     });
   });
});

$('#back').click(function(event){
  map.removeLayer(featureGroup);
  $('#intro').show();
  $('#results').hide();
  $(document).ready(function() {
    $.ajax(dataset).done(function(data) {
      var parsedData = JSON.parse(data);
      featureGroup = L.geoJson(parsedData, {
        style: myStyle,
        onEachFeature: function(feature,layer){
          layer.bindPopup(feature.properties.cmp_name);
        },
        filter: Filter,
      }).addTo(map);
    });
  });
});
