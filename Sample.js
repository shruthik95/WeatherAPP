/**
 * 
 */

var lat, lon;
var tempUnit = 'C';
var currentTempInCelsius;

$( document ).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat =  position.coords.latitude;
      var lon =  position.coords.longitude;
      getWeather(lat, lon);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  $("#tempunit").click(function () {
    var currentTempUnit = $("#tempunit").text();
    var newTempUnit = currentTempUnit == "C" ? "F" : "C";
    $("#tempunit").text(newTempUnit);
    if (newTempUnit == "F") {
      var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      $("#temp").text(fahTemp + " " + String.fromCharCode(176));
    } else {
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
    }
  });
  
  $("#tempunit1").click(function () {
	    var currentTempUnit = $("#tempunit1").text();
	    var newTempUnit = currentTempUnit == "C" ? "F" : "C";
	    $("#tempunit1").text(newTempUnit);
	    if (newTempUnit == "F") {
	      var fahTemp = Math.round(parseInt($("#max_temp").text()) * 9 / 5 + 32);
	      $("#max_temp").text(fahTemp + " " + String.fromCharCode(176));
	    } else {
	      $("#max_temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
	    }
	  });
  
  $("#tempunit2").click(function () {
	    var currentTempUnit = $("#tempunit2").text();
	    var newTempUnit = currentTempUnit == "C" ? "F" : "C";
	    $("#tempunit2").text(newTempUnit);
	    if (newTempUnit == "F") {
	      var fahTemp = Math.round(parseInt($("#min_temp").text()) * 9 / 5 + 32);
	      $("#min_temp").text(fahTemp + " " + String.fromCharCode(176));
	    } else {
	      $("#min_temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
	    }
	  });
})


function getWeather(lat,lon)
{
	
 $.ajax({
	url: "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon
	+"&appid=7d768f2db1dc9554926e225b6ff8e222",
	type: "GET",
	dataType:"jsonp",
	success: function(data){
		console.log(data);
		$("#city").text(data.city.name);
		$("#country").text(data.city.country);
	    currentTempInCelsius = Math.round(data.list[0].main.temp) / 10;
	    $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
	    $("#tempunit").text(tempUnit);
	      
	    MaxTempInCelsius = Math.round(data.list[0].main.temp_max) / 10;
	    $("#max_temp").text(MaxTempInCelsius + " " + String.fromCharCode(176));
	    $("#tempunit1").text(tempUnit);
	    
	    MinTempInCelsius = Math.round(data.list[0].main.temp_min) / 10;
	    $("#min_temp").text(MinTempInCelsius + " " + String.fromCharCode(176));
	    $("#tempunit2").text(tempUnit);
	    
	    $("#desc").text(data.list[0].weather[0].description);  
	   // $("#icon1").html("<img src='http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
	
	}
 });
 
}