// Object Oriented Programming - Kan hergebruikt worden, toevoegen ect.
// Namespace - Eerste bestand maakt nieuw object (null, undefined), bestanden daarna voegen toe aan object
var app = app || {};

// Self Invoking Anonymous Function
(function(){
	// Method 'init' roept twee methodes uit andere objecten op
	app.controller = {
		init: function(){
			// Eerst wordt content geladen, daarna pas uitgevoerd (if success)
			app.xhr.loadContent('http://dennistel.nl/movies', function() {
				// Start sections init methode
				app.sections.init();
				// Start router init methode
				app.router.init();
				// Start gesture init methode
				app.gesture.init();
			});
		}
	};
	// Routie object met één methode (init) waar zes functies in staan
	app.router = {
		init: function() {	
			// Router-object, kijkt naar hash (#) in URL
			routie({
				// Toggle methode voor alle pagina's
				'': function() {
					// Object met toggle methode voor variabele
					app.sections.toggle('home-page');
				},
				'homepage': function() {
					app.sections.toggle('home-page');
				},
				'about': function() {
					app.sections.toggle('about-page'); 
				},
				'movies': function() {
					app.sections.toggle('movie-page');
				},
				// Kijkt of er een 'genre' achter 'movies' staat
				'movies/?:genre': function(genre){
					app.sections.movies(genre);
				},
				// Kijkt voor 'ID' achter 'movies' en toggled pagina
				'movie/:id': function(id){
					app.sections.toggle('detail-page');
					app.sections.detail(id);
				}
			});
		}
	};
	// Content pagina
	app.content = {
		homepage: {
			// Name/value per data-bind
			title: 'Welcome',
			description: "Welcome to this Movie Application. This is the final assignment of Frontend."
		},
		about: {
			title: 'About this app',
			// Apart inladen van paragraphs
			description: "<p>Cities fall but they are rebuilt. heroes die but they are remembered. the man likes to play chess; let's get him some rocks. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. bruce... i'm god. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can't now, being dead and all. rehabilitated? well, now let me see. you know, i don't have any idea what that means. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. rehabilitated? well, now let me see. you know, i don't have any idea what that means. cities fall but they are rebuilt. heroes die but they are remembered. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can't now, being dead and all.</p>"
			+ "<p>I did the same thing to gandhi, he didn't eat for three weeks. bruce... i'm god. cities fall but they are rebuilt. heroes die but they are remembered. i once heard a wise man say there are no perfect men. only perfect intentions. cities fall but they are rebuilt. heroes die but they are remembered. boxing is about respect. getting it for yourself, and taking it away from the other guy. well, what is it today? more spelunking? let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. bruce... i'm god. well, what is it today? more spelunking? it only took me six days. same time it took the lord to make the world. i did the same thing to gandhi, he didn't eat for three weeks.</p>"
			+ "<p>Let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. boxing is about respect. getting it for yourself, and taking it away from the other guy. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. you measure yourself by the people who measure themselves by you. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. you measure yourself by the people who measure themselves by you. you measure yourself by the people who measure themselves by you. that tall drink of water with the silver spoon up his ass. i once heard a wise man say there are no perfect men. only perfect intentions. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. boxing is about respect. getting it for yourself, and taking it away from the other guy.</p>"
			+ "<p>That tall drink of water with the silver spoon up his ass. well, what is it today? more spelunking? i now issue a new commandment: thou shalt do the dance. let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. i did the same thing to gandhi, he didn't eat for three weeks. the man likes to play chess; let's get him some rocks. i now issue a new commandment: thou shalt do the dance. i now issue a new commandment: thou shalt do the dance. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. i don't think they tried to market it to the billionaire, spelunking, base-jumping crowd. that tall drink of water with the silver spoon up his ass. it only took me six days. same time it took the lord to make the world.</p>"
		},
		// Directive Transparency 
		guideline: {
			// Bind de data aan DOM
			description: {
				// Bind 'description' aan 'html' element
				html: function(params) {
					return params.value + this.description;
				}
			},
			cover: {
				// Bind 'cover' aan 'scr' attribute
				src: function(params) {
	  				return this.cover;
				},
				alt: function(params) {
	    			return this.title;
	    		}
			},
			reviews: {
				// Bind 'reviews' aan 'text' element
				text: function(){						
					if(isNaN(this.reviews)){
						// Not a Number (NaN)
						return 'Niet beschikbaar';
					} else {
						return this.reviews;
					}
				}
			},
			link: {
				// Bind 'link' aan 'href' attribute
				href: function(params){
					// Pakt movie ID van de film waar je op geklikt heb uit het JSON bestand 
					return '#movie/' + this.id;
				}
			}
		}
	};
	// XHR object
	app.xhr = {
		// Vraagt XML aan
		trigger: function (type, url, success, data) {
			// Hide 'loading' wanneer 
			app.sections.toggle('loading');

			var req = new XMLHttpRequest;
			req.open(type, url, true);

			req.setRequestHeader('Content-type','application/json');
			// Als type POST, verstuur data anders niets
			// Omdat wij niets posten op 'dennistel' zal dit altijd 'null' zijn
			type === 'POST' ? req.send(data) : req.send(null);

			// Als 'waarde' 4 (done) is EN daarna status 200 (success) maakt success, zo niet gaat opvragen fout 
			req.onreadystatechange = function() {
				if (req.readyState === 4) {
					if (req.status === 200 || req.status === 201) {
						success(req.responseText);
					}
				}
			}
		},
		// Laad dennistel API in
		loadContent: function(source, callback){
			// Kijkt naar omliggend scope, app xhr
			var self = this;
			// Als er internet is wordt data in localstorage gezet
			if(window.navigator.onLine){
				// functie 'response' is data van JSON data
				app.xhr.trigger('GET', source, function(response){
					// Slaat response op onder naam 'movieData'
					localStorage.setItem('movieData', response);
					// Start andere app init elementen
					callback();
				})
			} else {
				// Geen internet wordt data uit localstorage gehaald
				// Als 'movieData' bestaat, haal het op
				if(localStorage.getItem('movieData')) {
					self.movies = JSON.parse(localStorage.getItem('movieData'));
					callback();
				} else {
					// Doe niets
				}
			}
		},
		// 'setItem' slaat 'movieData' lokaal op
		setItem: function(data) {
			localStorage.setItem('movieData', data);
		},
		// 'getItem' haalt 'movieData' op
		getItem: function(name) {
			return localStorage.getItem(name);
		}
	};
	// Sections met Transparency ID
	app.sections = {
		init: function(){
			// Start Home
			this.homepage();
			// Start About
			this.about();
			// Start Movies
			this.movies();
		},
		// Toggle methode met parameter 'id'
		toggle: function(id){
			// Loopt alle sections langs en stopt ze in variabele 'element'								
			var elements = document.getElementsByTagName('section');
			// For loop die 'active' weghaald, parameter controleerd en vervolgens weer de class toevoegd
			for(var i in elements){
				if(elements[i].classList)
				// Verwijderd de class 'active' als die bestaat				
				elements[i].classList.remove('active');
			}
			// Class met 'active' wordt toegevoegd aan element met ID
			if(document.getElementById(id))
				document.getElementById(id).classList.add('active');
		},
		// Pakt element met ID 'home-page' en zet daar content van 'home' in
		homepage: function(){
			Transparency.render(document.getElementById('home-page'), app.content.homepage);
		},
		// Pakt element met ID 'about-page' en zet daar content van 'about' in
		about: function(){
			Transparency.render(document.getElementById('about-page'), app.content.about, app.content.guideline);
		},
		// filter === genre
		movies: function(filter){
			// Haalt localStorage op van dennistel data
			var obj = JSON.parse(localStorage.getItem('movieData'));

			// Underscore map't elke 'value' in een lijst. combineerd het en rekent een gemiddelde uit 
			_.map(obj, function(movie){
				// Pakt alle 'reviews' getallen en telt alle review.score bij elkaar op in totalScore 
				movie.reviews = _.reduce(movie.reviews, function(totalScore, review){
					return totalScore + review.score; }, 0) / _.size(movie.reviews);
			});

			// Filter 'obj' met de 'genre' achter de hash (#) en toont alleen de film met de desbetreffende genre.
			if(filter) {
				if(filter == 'all') {
   		 			app.sections.toggle('movie-page');   		 			
				} else {
					// Geeft hoofdletter aan filter en laad elke film met die genre
					obj = _.filter( obj, function(movie){
						filter = filter.charAt(0).toUpperCase() + filter.slice(1);
							// Kijkt welke movie's genre er overeenkomt met meegegeven filter
							return (_.contains(movie.genres, filter) == true);
					});
				}
			};

			// Toont element met ID 'movies' met de content van 'obj'
			Transparency.render(document.getElementById('movies'), obj, app.content.guideline);
		},
		detail: function(movieId){
			// Haalt alle localStorage op van dennistel data
			var obj = JSON.parse(localStorage.getItem('movieData'));

			// MovieId wordt vervormd naar cijfer (int) en voegt -1 toe zodat het overeenkomt met plaats in array
			var movieId = parseInt(movieId) - 1;
			// Pakt alleen object met de film met ID in hash (#)
			obj = obj[movieId];

			// Underscore map't elke 'value' in een lijst. combineerd het en rekent een gemiddelde uit 
			_.map(obj,  function(movie){
				// Pakt alle 'reviews' getallen en telt alle review.score bij elkaar op in totalScore
				movie.reviews = _.reduce(movie.reviews, function(totalScore, review){
					return totalScore + review.score; }, 0) / _.size(movie.reviews);
			});
			// Toont element met ID 'movies' met de content van 'obj'
			Transparency.render(document.getElementById('detail'), obj, app.content.guideline);
		}
	};
	// HammerJS gesture
	app.gesture = {
		init: function() {
			// Variabele 'navSwipe' is element met ID 'swiper'
			var navSwipe = document.getElementById('swiper');

			// Maakt nieuwe Hammer aan op 'navSwipe'
			var swipeNavigate = new Hammer(navSwipe);

			// Stelt Hammer in op bepaalde richting
			swipeNavigate.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

			// Luistert naar swipe richting
			swipeNavigate.on("pandown, swipedown", function(ev) {
				// Tijdens functies 'ev' stopt site met scroll en kijkt naar gesture
				ev.preventDefault();
				document.getElementById("nav-trigger").checked = true;
			});
			swipeNavigate.on("panup, swipeup", function(ev) {
				// Tijdens functies 'ev' stopt site met scroll en kijkt naar gesture
				ev.preventDefault();
				document.getElementById("nav-trigger").checked = false;
			});
			// Maakt een klik-event aan
			window.addEventListener('mouseup', function(event) { 
				// Sluit menu als muis buiten menu klikt
				var triggerMenu = document.getElementById('nav-trigger'); 
				// Als lokatie op 'mouseup' niet gelijk is aan 'triggerMenu'
				if (event.target != triggerMenu ){ 
					triggerMenu.checked = false; 
				} 
			});
		}
	}
	// Start 'init' uit controller
	app.controller.init();
//Immediately Invoked Function Expression, IIFE = SIAF Self Invoking Anonymous Function
})();