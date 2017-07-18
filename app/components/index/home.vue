<template>
	<div class='videoComponent'>
		<header-nav></header-nav>
		<div class='control'>
			<ul>
				<li class='control__item'
					v-on:click='jumpTo(item)'
					v-for='item in navItems'>{{item}}</li>
			</ul>
		</div>
		<div class="content">
			<div class="content__item about">
				<div class="about__image"><img v-bind:src='aboutLogo'></div>
				<p class="about__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt quasi cum aut iure, quidem cumque velit repudiandae, laboriosam laudantium culpa maiores quam ad beatae atque voluptate autem. Quas facere itaque temporibus. Assumenda quasi nemo porro debitis, maiores dolorem error non totam vel, saepe eveniet provident nulla eos illum. Optio, iure laudantium. Delectus itaque fuga fugiat. Provident doloribus natus, ipsum commodi repellendus quo quaerat incidunt ducimus, consectetur ut inventore magnam, odio.</p>
				<a href="#" class="read-more-button">read more</a>
				<div class="back-button" v-on:click='jumpBack'>back</div>
			</div>
			<div class="content__item tables">
				<p class="tables__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit magni debitis officia, architecto nemo laboriosam dicta! Mollitia repellat recusandae, exercitationem porro, itaque accusantium, repellendus similique quaerat nobis nihil rerum vel voluptate necessitatibus sunt inventore possimus.</p>
				<div class="product-button">view products</div>
				<div class="table-image"><img v-bind:src='tableImage'></div>
				<div class="back-button" v-on:click='jumpBack'>back</div>
			</div>
			<div class="content__item seating">
				<p class="seating__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit magni debitis officia, architecto nemo laboriosam dicta! Mollitia repellat recusandae, exercitationem porro, itaque accusantium, repellendus similique quaerat nobis nihil rerum vel voluptate necessitatibus sunt inventore possimus.</p>
				<div class="product-button">view products</div>
				<div class="table-image"><img v-bind:src='tableImage'></div>
				<div class="back-button" v-on:click='jumpBack'>back</div>
			</div>
			<div class="content__item beds">
				<p class="tables__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit magni debitis officia, architecto nemo laboriosam dicta! Mollitia repellat recusandae, exercitationem porro, itaque accusantium, repellendus similique quaerat nobis nihil rerum vel voluptate necessitatibus sunt inventore possimus.</p>
				<div class="product-button">view products</div>
				<div class="table-image"><img v-bind:src='tableImage'></div>
				<div class="back-button" v-on:click='jumpBack'>back</div>
			</div>
			<div class="content__item decor">
				<p class="decor__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit magni debitis officia, architecto nemo laboriosam dicta! Mollitia repellat recusandae, exercitationem porro, itaque accusantium, repellendus similique quaerat nobis nihil rerum vel voluptate necessitatibus sunt inventore possimus.</p>
				<div class="product-button">view products</div>
				<div class="table-image"><img v-bind:src='tableImage'></div>
				<div class="back-button" v-on:click='jumpBack'>back</div>
			</div>
			<div class="content__item lighting">
				<p class="lighting__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit magni debitis officia, architecto nemo laboriosam dicta! Mollitia repellat recusandae, exercitationem porro, itaque accusantium, repellendus similique quaerat nobis nihil rerum vel voluptate necessitatibus sunt inventore possimus.</p>
				<div class="product-button">view products</div>
				<div class="table-image"><img v-bind:src='tableImage'></div>
				<div class="back-button" v-on:click='jumpBack'>back</div>
			</div>
			<div class="content__item kitchen">
				<p class="kitchen__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit magni debitis officia, architecto nemo laboriosam dicta! Mollitia repellat recusandae, exercitationem porro, itaque accusantium, repellendus similique quaerat nobis nihil rerum vel voluptate necessitatibus sunt inventore possimus.</p>
				<div class="product-button">view products</div>
				<div class="table-image"><img v-bind:src='tableImage'></div>
				<div class="back-button" v-on:click='jumpBack'>back</div>
			</div>
			<div class="content__item bathroom">
				<p class="bathroom__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit magni debitis officia, architecto nemo laboriosam dicta! Mollitia repellat recusandae, exercitationem porro, itaque accusantium, repellendus similique quaerat nobis nihil rerum vel voluptate necessitatibus sunt inventore possimus.</p>
				<div class="product-button">view products</div>
				<div class="table-image"><img v-bind:src='tableImage'></div>
				<div class="back-button" v-on:click='jumpBack'>back</div>
			</div>
		</div>
		<video ref='video' v-bind:src='videoFile'></video>
	</div>
</template>

<script>
import './index.sass';
import videoFile from './BG.mp4';
import TIMING from './timing.js';
import tableImage from './table.png';
import aboutLogo from './logo-2.png';

import Nav from '../nav/nav.vue';

export default {
	data () {
		return {
			videoFile: videoFile,
			tableImage: tableImage,
			aboutLogo: aboutLogo,
			playItemMode: null,
			lastItem: null,
			currentItem: null,
			playItem: null,
			navItems: [
				'seating',
				'beds',
				'decor',
				'lighting',
				'kitchen',
				'bathroom',
				'about',
				'tables'
			]
		}
	},
	mounted () {
		const video = this.$refs.video;

		video.addEventListener('play', () => {
			const playItem = this.playItem;
			let time = 0;

			if (this.playItemMode === 'duration') {
				time = TIMING[playItem]['duration'] / 1000 + TIMING[playItem]['startTime'];
			} else {
				time = TIMING[playItem]['fadeDuration'] / 1000 + TIMING[playItem]['fadeTime'];
			}

			let interval = setInterval(() => {
				if (video.currentTime >= time) {
					video.pause();
					clearInterval(interval);
				}
			}, 50);
		});
	},
	methods: {
		goToNeutral () {
			this.playItem = this.lastItem;
			this.playItemMode = 'fadeDuration';
			this.lastItem = null;
			this.$refs.video.play();
		},
		jumpBack () {
			$('.content__item').hide();
			$('.control').removeClass('disabled');
			this.goToNeutral();
		},
		jumpTo (to) {
			const video = this.$refs.video;

			$('.control').addClass('disabled');
			setTimeout(() => $('.' + to).show(), 1000);

			if (this.lastItem) {
				this.currentItem = to;
				this.playItem = this.lastItem;
				this.playItemMode = 'fadeDuration';
				video.currentTime = TIMING[this.playItem].fadeTime;
				setTimeout(() => {
					video.play();
					setTimeout(() => {
						video.currentTime = TIMING[to].startTime;
						this.currentItem = to;
						this.playItem = to;
						this.playItemMode = 'duration';
						video.play();
						this.lastItem = to;
						video.currentTime = TIMING[this.playItem].fadeTime;
					}, 1000);
				}, 600);
			} else {
				video.currentTime = TIMING[to].startTime;
				this.currentItem = to;
				this.playItem = to;
				this.playItemMode = 'duration';
				video.play();
				this.lastItem = to;
			}
		}
	},
	components: {
		'header-nav': Nav
	}
}
</script>

<style scoped lang='sass'></style>
