$(document).ready(function(){

	var apiKey     = '86841b8e762d29ab232698708675cd6d';
	var apiURL     = 'https://api.forecast.io/forecast/' + apiKey; 
	var defaultLat = '40.64141';
	var defaultLng = '-73.99121';

	
	if ( Modernizr.geolocation ) {
		navigator.geolocation.getCurrentPosition(success, error);
	}
	else {
	
	}

	
	function success(position) {
		console.log(position);
		getWeatherWithPos(position.coords.latitude,position.coords.longitude);
	}

	function error(error) {
		console.log(error);
		getWeatherWithPos(defaultLat,defaultLng);
	}

	
	function getWeatherWithPos(lat,lng) {
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




	function parseWeather(data) {
		
		$('#temp').text("" + Math.round(data.currently.apparentTemperature)+ "F");
		
		$('#temp_1').text("" + Math.round(data.daily.data[0].temperatureMax)+ "F");

		$('#temp_2').text("" + Math.round(data.daily.data[1].temperatureMax)+ "F");

		$('#temp_3').text(Math.round(data.daily.data[2].temperatureMax) + "F");
		
		$('#hum').text((data.currently.humidity)*100 + "%" );

	}



});