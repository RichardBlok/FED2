var app = app || {};

(function(){
	app.controller = { 
		init: function(){
			app.debug.init();
			app.gps.init();
			app.tour.init();
			app.map.init();
		}
	}

	app.gps = {
		init: function(){
			console.log("gps ingeladen");
		}
	}

	app.tour = {
		init: function(){
			console.log("tour gevonden");
		}		
	}

	app.map = {
		init: function(){
			console.log("map ingeladen");
		}
	}

	app.debug = {
		init: function(){
			console.log("debug");
		}
	}

	app.controller.init();
})();