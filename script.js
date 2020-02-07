/* scripts.js */

// ********
// Revolver
// ********

var revolver = {
	name: 'Colt Python',
	bullets: [1, 1, 1, 1, 1, 1],
	chamber: 0,
	fire: function() {
		// fire
		if (this.bullets[this.chamber]){
			this.bullets[this.chamber] = 0;
			console.log('bang');
		} else {
			console.log('click');
		}

		// advance chamber
		if (this.chamber === 5) {
			this.chamber = 0;
		} else {
			this.chamber++;
		}
	},
	reload: function() {
		// only refill empty chambers
		for (i = 0; i < 6; i++) {
			if (this.bullets[i] !== 1){
				this.bullets[i] = 1;
				console.log('clink');
			}
		}

		// reset chamber
		this.chamber = 0;
	},
	spin: function() {
		// randomize current chamber
		min = Math.ceil(0);
  		max = Math.floor(5);
  		this.chamber = Math.floor(Math.random() * (max - min + 1)) + min;
	},
	roulette: function() {
		// empty each chamber
		for (i = 0; i < 6; i++) {
			if (this.bullets[i] === 1){
				this.bullets[i] = 0;
				console.log('shick');
			}
		}

		// place bullet in first chamber
		this.bullets[0] = 1;
		console.log('clink');
		this.chamber = 0;
	},
}

// ********
// Gameplay
// ********

const TEXT = document.querySelector('.text');
const REVOLVER = document.querySelector('.revolver');
const COVER = document.querySelector('.cover');
const CONTROLS = document.querySelector('.controls');

// Press Play
document.getElementById('play').addEventListener('click', function(){
	revolver.roulette();

	// Hide intro
	TEXT.classList.add('hidden');
	CONTROLS.classList.add('hidden');

	// Remove all but first bullet
	for (i = 1; i < 6; i++) {
		(function(i) {
			setTimeout(function() {
				document.getElementsByClassName('bullet')[i].classList.remove('loaded');
			}, 200 * i);
		})(i);
	};

	// Fade-in cover
	setTimeout(function(){
		COVER.classList.add('active');
	}, 1500);

	// Spin revolver: spin svg + chamber value in degrees
	setTimeout(function(){
		revolver.spin();
		REVOLVER.style.transform = 'rotate(' + -(1080 + (60 * revolver.chamber)) + 'deg)';
	}, 2250);

	// Show controls with fire button
	setTimeout(function(){
		document.getElementById('play').classList.add('hidden');
		document.getElementById('fire').classList.remove('hidden');
		CONTROLS.classList.remove('hidden');
	}, 4250);

});
	
// Press Fire
document.getElementById('fire').addEventListener('click', function(){

	// Hide controls
	CONTROLS.classList.add('hidden');

	// Rotate chamber one position CCW
	REVOLVER.style.transitionDuration = '0.1s';
	REVOLVER.style.transform = 'rotate(' + -((1080 + (60 * revolver.chamber)) + 60) + 'deg)';

	// If chamber has bullet display loss
	setTimeout(function(){
		if (revolver.chamber === 0) {
			setTimeout(function(){
				REVOLVER.classList.add('fired');
				document.getElementsByClassName('bullet')[0].classList.add('fired');
				document.getElementById('title').classList.add('hidden');
				document.getElementById('lose').classList.remove('hidden');
				TEXT.classList.remove('hidden');
			}, 750);
		}
	
		// Else display win
		else {
			setTimeout(function(){
				document.getElementById('title').classList.add('hidden');
				document.getElementById('win').classList.remove('hidden');
				TEXT.classList.remove('hidden');
			}, 750);
		}

		revolver.fire();
	}, 250);

	// Remove cover and show text and controls
	setTimeout(function(){
		document.getElementById('fire').classList.add('hidden');
		document.getElementById('reset').classList.remove('hidden');
		CONTROLS.classList.remove('hidden');
		COVER.classList.remove('active');
	}, 1000);
});

// Press Reset
document.getElementById('reset').addEventListener('click', function(){
	
	// Hide controls and title
	TEXT.classList.add('hidden');
	CONTROLS.classList.add('hidden');

	// Reset revolver
	REVOLVER.classList.remove('fired');
	document.getElementsByClassName('bullet')[0].classList.remove('fired');

	// Reset rotation
	REVOLVER.style.transitionDuration = '';
	REVOLVER.style.transform = 'rotate(0deg)';

	// Reload bullets
	setTimeout(function(){
		for (i = 1; i < 6; i++) {
			(function(i) {
				setTimeout(function() {
					document.getElementsByClassName('bullet')[i].classList.add('loaded');
				}, 200 * i);
			})(i);
		};

		revolver.reload();
	}, 1000);

	// Show play
	setTimeout(function(){
		document.getElementById('win').classList.add('hidden');
		document.getElementById('lose').classList.add('hidden');
		document.getElementById('title').classList.remove('hidden');
		TEXT.classList.remove('hidden');

		document.getElementById('reset').classList.add('hidden');
		document.getElementById('play').classList.remove('hidden');
		CONTROLS.classList.remove('hidden');
	}, 2000);

});