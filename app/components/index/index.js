import 'normalize.css';
import './index.sass';
import videoFile from './BG.mp4';
import aboutLogo from './logo-2.png';
import tableImage from './table.png';
import $ from 'jquery';
import debounce from 'lodash/debounce';
import TIMING from './timing';

var currentItem;
var lastItem;
var playItem;
var playItemMode;

function component() {
	var video = document.createElement('video');

	video.src = videoFile;
	var control = document.querySelector('.control');
	video.currentTime = 0;

	video.addEventListener('play', function(e) {
		var wait = true;
		var time = 0;
		var waitIterations = 0;

		if (playItemMode === 'duration') {
			time = TIMING[playItem]['duration'] / 1000 + TIMING[playItem]['startTime'];
		} else {
			time = TIMING[playItem]['fadeDuration'] / 1000 + TIMING[playItem]['fadeTime'];
		}

		var interval = setInterval(() => {
			console.log(video.currentTime, time);
			if (video.currentTime >= time) {
				video.pause();
				clearInterval(interval);
			}
		}, 50);
	});

	video.addEventListener('canplaythrough', function() {
		control.addEventListener('click', function(e) {
			if (video.paused) {
				jumpToItem.call(this, e, video);
			}
		});
	});

	$('.back-button').click(function () {
		$('.content__item').hide();
		$('.control').removeClass('disabled');
		goToNeutral();
	});

	// append images
	$('.about__image').append(`<img src='${aboutLogo}' alt='logo' />`);
	$('.table-image').append(`<img src='${tableImage}' alt='logo' />`);

	function goToNeutral() {
		playItem = lastItem;
		playItemMode = 'fadeDuration';
		lastItem = null;
		video.currentTime = TIMING[playItem].fadeTime;
		setTimeout(() => {
			video.play();
		}, 600);
	}

	return video;
}

function jumpToItem(e, video) {
	var menuItem = e.target.getAttribute('data-item');
	$('.control').addClass('disabled');
	setTimeout(() => $('.' + menuItem).show(), 1000);

	if (lastItem) {
		console.log('last item');
		currentItem = menuItem;
		playItem = lastItem;
		playItemMode = 'fadeDuration';
		video.currentTime = TIMING[playItem].fadeTime;
		setTimeout(() => {
			video.play();
			setTimeout(() => {
				video.currentTime = TIMING[menuItem].startTime;
				currentItem = menuItem;
				playItem = menuItem;
				playItemMode = 'duration';
				video.play();
				lastItem = menuItem;
			}, 1000);
		}, 600);
	} else {
		video.currentTime = TIMING[menuItem].startTime;
		currentItem = menuItem;
		playItem = menuItem;
		playItemMode = 'duration';
		video.play();
		lastItem = menuItem;
	}


}

document.body.appendChild(component());
