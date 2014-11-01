$(document).ready(function(){

	// Setup variables for our forecast.io request
	var apiKey     = '86841b8e762d29ab232698708675cd6d';
	var apiURL     = 'https://api.forecast.io/forecast/' + apiKey; 
	var defaultLat = '40.64141';
	var defaultLng = '-73.99121';

	/*
		1. Request the user's location via their browser
	*/

	// Request the user's latitude/longitude
	if ( Modernizr.geolocation ) {
		navigator.geolocation.getCurrentPosition(success, error);
	}
	else {
		// Prompt user
	}

	// Recieved a latitude/longitude from the browser
	function success(position) {
		console.log(position);
		getWeatherWithPos(position.coords.latitude,position.coords.longitude);
	}

	// Unable to find a latitude/longitude
	function error(error) {
		console.log(error);
		getWeatherWithPos(defaultLat,defaultLng);
	}

	/*
		2. Request weather data for a location
	*/

	// Request weather from forecast.io with a latitude/longitude
	function getWeatherWithPos(lat,lng) {
		// Construct the url to request
		apiURL += "/" + lat + "," + lng;
		console.log(apiURL);

		// Make a request to forecast.io
		$.ajax({
			url: apiURL,
			type: "GET",
			crossDomain: true,
            dataType: 'jsonp',
			success: function (response) {
				// The request succeeded
				console.log(response);
				parseWeather(response);
				$('#loader').remove();
			},
			error: function (xhr, status) {
				// The request failed
		    	console.log(status);
		    	$('#loader').remove();
		    	showError();
			}
		});
	}


	/*
		3. Insert weather data into app and stylize
	*/

	// Parse and use the weather values from the forecast.io JSON
	function parseWeather(data) {
		
		$('#temp').text("" + Math.round(data.currently.apparentTemperature)+ "F");
		


		$('#temp_1').text("" + Math.round(data.daily.data[0].temperatureMax)+ "F");

		$('#temp_2').text("" + Math.round(data.daily.data[1].temperatureMax)+ "F");

		$('#temp_3').text(Math.round(data.daily.data[2].temperatureMax) + "F");
		
		$('#hum').text((data.currently.humidity)*100 + "%" );

	}

	// Show an error if we can't access the weather
	function showError(){
		$('#temp').text('=(');
		$('body').css('background-color','rgb(240,14,10');	
	}


});