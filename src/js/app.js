import * as UTILS from './utils.js';
import $ from 'jquery';
// console.log(window.location.hash)
if(window.location.hash === ''){
	window.location.hash = "home"
}


var navContainerEl = document.querySelector('.navbar__user');
var pageInfoEl = document.querySelector('.page-information')


function controllerRouter(){
	var currentRoute = window.location.hash.slice(1);
	var previousActiveTabEl = document.querySelector('.navbar__user .active')
	previousActiveTabEl.classList.remove('active')
	var currentActiveTabEl = document.querySelector(`[data-route="${currentRoute}"]`)
	currentActiveTabEl.classList.add('active')

	if(currentRoute === 'home'){
		pageInfoEl.innerHTML = `
											<div>
												<table class="table">
													<h3 class="table_header">The Basic Facts</h3>
													<tr>
														<td>Native Name</td>
														<td>ísland</td>
													</tr>
													<tr>
														<td>Demonym</td>
														<td>Icelander</td>
													</tr>
													<tr>
														<td>Area(m2)</td>
														<td>103000</td>
													</tr>
													<tr>
														<td>Calling Code</td>
														<td>352</td>
													</tr>
												</table>
											</div>
											`
	}

	if(currentRoute === 'concerts'){
		console.log("heyy")
		$.getJSON('http://apis.is/concerts').then(function(serverRes){
				var resultObj = serverRes.results;
				var bigHtml = '';
				UTILS.forEach(resultObj, function(eachObj, i){
					var eventImage = eachObj.imageSource;
					var eventName = eachObj.name;
					var eventVenue = eachObj.eventHallName;
					var eventTime = eachObj.dateOfShow;
					var concertsHTML = `
						<div class="column col-xs-4">
							<div class="thumbnail concert__thumbnail">
								<img src="${eventImage}">
								<div class="caption">
									<h3>${eventName}</h3>
									<p class="venue-name"><mark>Venue</mark> : <strong>${eventVenue}</strong> </p>
									<p class="event-time">${eventTime}</p>
								</div>
							</div>
						</div>
						`
					bigHtml += concertsHTML
				})
				pageInfoEl.innerHTML = '<div class="event-pages"><h3 class="table_header">Concerts</h3><div class="row concert-elements">' + bigHtml + '</div></div>';
		})
		return
	}

	if(currentRoute === 'carpools'){
		$.getJSON('http://apis.is/rides/samferda-drivers/').then(function(serverRes){
			var resultObj = serverRes.results
			var bigHTML = ''
			UTILS.forEach(resultObj, function(eachObj, i){
			var timeOfDep = UTILS.isDefined(eachObj.time);
			var depFrom = eachObj.from;
			var goingTo = eachObj.to;
			var carpoolHTML = `
					<tr>
						<td>${timeOfDep}</td>
						<td>${depFrom}</td>
						<td>${goingTo}</td>
					</tr>
					`
			bigHTML += carpoolHTML
		})
		var wholeHTML = `<table class="table">
															<h3 class="table_header">Carpools</h3>
															<tr>
																<th><strong>Time Of Departure</strong></th>
																<th><strong>from</strong></th>
																<th><strong>To</strong></th>
															</tr>` + bigHTML
		pageInfoEl.innerHTML = wholeHTML + '</table>'
		})
		return
	}

	if(currentRoute === 'flights'){
		var totalFlightHTML = ''

		var arrivalFetch = $.getJSON('http://apis.is/flight?language=en&type=arrivals')
		var departureFetch = $.getJSON('http://apis.is/flight?language=en&type=departures')
		$.when(arrivalFetch, departureFetch).then(function(arrivalData, departureData){
			var resultObj1 = arrivalData[0].results;
			console.log(arrivalData)
			var arrivalBigHTML = `
															<table class="flight_table">
																<h4 class="column-header">Arrivals</h4>
																<h4 class="column-header">Departures</h4>
																<tr class="table-label">
																	<th><strong>Date</strong></th>
																	<th><strong>Arrival Time</strong></th>
																	<th><strong>Origin</strong></th>
																	<th><strong>Airline</strong></th>
																</tr>
																`
			UTILS.forEach(resultObj1, function(arrivalObj, i){
				var arrivalDate = arrivalObj.date;
				var arrivalTime = arrivalObj.plannedArrival ;
				var comingFrom = arrivalObj.from ;
				var arrivalAirline = arrivalObj.airline;
				var arrivalCodeSnip = `
					<tr class="table-data">
						<td>${arrivalDate}</td>
						<td>${arrivalTime}</td>
						<td>${comingFrom}</td>
						<td>${arrivalAirline}</td>
					</tr>
				`
				arrivalBigHTML += arrivalCodeSnip;
				})
				arrivalBigHTML += "</table>"
				totalFlightHTML = arrivalBigHTML;

			var resultObj2 = departureData[0].results;
			var departureBigHTML =`
															<table class="flight_table">
																<tr class="table-label">
																	<th><strong>Date</strong></th>
																	<th><strong>Departure Time</strong></th>
																	<th><strong>Destination</strong></th>
																	<th><strong>Airline</strong></th>
																</tr>`
			UTILS.forEach(resultObj2, function(departureObj, i){
				var departureDate = departureObj.date;
				var departureTime = departureObj.plannedArrival;
				var whereTo = departureObj.to;
				var departureAirline = departureObj.airline;
				var departureCodeSnip = `
								<tr class="table-data">
									<td>${departureDate}</td>
									<td>${departureTime}</td>
									<td>${whereTo}</td>
									<td>${departureAirline}</td>
								</tr>
							`
				departureBigHTML += departureCodeSnip;
				})
				departureBigHTML += "</table>"
				totalFlightHTML += departureBigHTML;
				pageInfoEl.innerHTML = '<div class="flight-information u_column-contaner"><h3 class="table_header">Flights</h3>' + totalFlightHTML+ '</div>'
			})
	}

	pageInfoEl.innerHTML = `
										<div>
											<table class="table">
												<h3 class="table_header">The Basic Facts</h3>
												<tr>
													<td>Native Name</td>
													<td>ísland</td>
												</tr>
												<tr>
													<td>Demonym</td>
													<td>Icelander</td>
												</tr>
												<tr>
													<td>Area(m2)</td>
													<td>103000</td>
												</tr>
												<tr>
													<td>Calling Code</td>
													<td>352</td>
												</tr>
											</table>
										</div>
										`
}


navContainerEl.addEventListener('click', function(evt){
	var clickedTabEl = evt.target;
	var route = clickedTabEl.dataset.route
	window.location.hash = route;
	controllerRouter()
})

controllerRouter()
window.addEventListener('hashchange', controllerRouter())
