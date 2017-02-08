import * as UTILS from './utils.js'
import $ from 'jquery';


function controllerRouter(){
  var currentRoute = window.location.hash.slice(1)
 console.log(currentRoute)
	if(currentRoute === 'concerts'){
		$.getJSON('http://apis.is/concerts').then(function(serverRes){
        console.log(serverRes)

		})
		return
	}

	if(currentRoute === 'carpools'){
		$.getJSON('http://apis.is/rides/samferda-drivers/').then(function(serverRes){
        console.log(serverRes)

		})
		return
	}

  if(currentRoute === 'flights'){
    $.getJSON('http://apis.is/flight?language=en&type=arrivals').then(function(serverRes){
			console.log(serverRes)
     })

     $.getJSON('http://apis.is/flight?language=en&type=departures').then(function(serverRes){
			console.log(serverRes)
    })
    return
  }

}
