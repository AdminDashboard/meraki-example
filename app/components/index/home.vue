<template>
	<div class='videoComponent'>
		<header-nav nav-style="white"></header-nav>
		<div class="control-wrapper">
			<welcome></welcome>
			<div class='control'>
				<ul>
					<li class='control__item'
						v-on:click='jumpTo(item)'
						v-for='item in navItems'>
						<div :class="'control__' + item">{{item}}</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="content">
			<div class="content__item about">
				<div class="about__image"><img v-bind:src='aboutLogo'></div>
				<p class="about__text" v-html="breakify(aboutText)"></p>
				<a href="#" class="read-more-button">read more</a>
				<div class="back-button" v-on:click='jumpBack'>back</div>
			</div>

			<div class="content__item tables">
				<div class="back-button" v-on:click='jumpBack'>back</div>
				<!-- if tableCat -->
				<div class="home-item home-item_tables" v-if='tableCat'>
					<div class="home-item_upper">
						<div class="home-item__text" v-html="breakify(tableCat.content.description)"></div>
					</div>
					<div class="home-item_middle">
						<a v-if='tableCat.hasProducts && tableCat.content.showItsChilds' v-bind:href="`/#/products/${tableCat.content.id}`" class="product-button">view products</a>
						<coming-soon v-else></coming-soon>
					</div>
					<div class="home-item_bottom">
						<div class="home-item__image"><img v-bind:src='tableCat.content.mainImage'></div>
					</div>
				</div>
				<!-- else -->
				<div v-else>
					<coming-soon></coming-soon>
					<div class="table-image"><img v-bind:src='tableImage'></div>
				</div>
			</div>

			<div class="content__item seating">
				<div class="back-button" v-on:click='jumpBack'>back</div>
				<!-- if seatingCat -->
				<div class="home-item home-item_seating" v-if='seatingCat'>
					<div class="home-item_upper">
						<div class="home-item__text" v-html="breakify(seatingCat.content.description)"></div>
					</div>
					<div class="home-item_middle">
						<a v-if='seatingCat.hasProducts && seatingCat.content.showItsChilds' v-bind:href="`/#/products/${seatingCat.content.id}`" class="product-button">view products</a>
						<coming-soon v-else></coming-soon>
					</div>
					<div class="home-item_bottom">
						<div class="home-item__image"><img v-bind:src='seatingCat.content.mainImage'></div>
					</div>
				</div>
				<!-- else -->
				<div v-else>
					<coming-soon></coming-soon>
					<div class="table-image"><img v-bind:src='tableImage'></div>
				</div>
			</div>

			<div class="content__item beds">
				<div class="back-button" v-on:click='jumpBack'>back</div>
				<!-- if bedsCat -->
				<div class="home-item home-item_beds" v-if='bedsCat'>
					<div class="home-item_upper">
						<div class="home-item__text" v-html="breakify(bedsCat.content.description)"></div>
					</div>
					<div class="home-item_middle">
						<a v-if='bedsCat.hasProducts && bedsCat.content.showItsChilds' v-bind:href="`/#/products/${bedsCat.content.id}`" class="product-button">view products</a>
						<coming-soon v-else></coming-soon>
					</div>
					<div class="home-item_bottom">
						<div class="home-item__image"><img v-bind:src='bedsCat.content.mainImage'></div>
					</div>
				</div>
				<!-- else -->
				<div v-else>
					<coming-soon></coming-soon>
					<div class="table-image"><img v-bind:src='tableImage'></div>
				</div>
			</div>

			<div class="content__item decor">
				<div class="back-button" v-on:click='jumpBack'>back</div>
				<!-- if decorCat -->
				<div class="home-item home-item_decor" v-if='decorCat'>
					<div class="home-item_upper">
						<div class="home-item__text" v-html="breakify(decorCat.content.description)"></div>
					</div>
					<div class="home-item_middle">
						<a v-if='decorCat.hasProducts && decorCat.content.showItsChilds' v-bind:href="`/#/products/${decorCat.content.id}`" class="product-button">view products</a>
						<coming-soon v-else></coming-soon>
					</div>
					<div class="home-item_bottom">
						<div class="home-item__image"><img v-bind:src='decorCat.content.mainImage'></div>
					</div>
				</div>
				<!-- else -->
				<div v-else>
					<coming-soon></coming-soon>
					<div class="table-image"><img v-bind:src='tableImage'></div>
				</div>
			</div>

			<div class="content__item lighting">
				<div class="back-button" v-on:click='jumpBack'>back</div>
				<!-- if lightingCat -->
				<div class="home-item home-item_lighting" v-if='lightingCat'>
					<div class="home-item_upper">
						<div class="home-item__text" v-html="breakify(lightingCat.content.description)"></div>
					</div>
					<div class="home-item_middle">
						<a v-if='lightingCat.hasProducts && lightingCat.content.showItsChilds' v-bind:href="`/#/products/${lightingCat.content.id}`" class="product-button">view products</a>
						<coming-soon v-else></coming-soon>
					</div>
					<div class="home-item_bottom">
						<div class="home-item__image"><img v-bind:src='lightingCat.content.mainImage'></div>
					</div>
				</div>
				<!-- else -->
				<div v-else>
					<coming-soon></coming-soon>
					<div class="table-image"><img v-bind:src='tableImage'></div>
				</div>
			</div>

			<div class="content__item kitchen">
				<!-- if kitchenCat -->
				<div class="home-item home-item_kitchen" v-if='kitchenCat'>
					<div class="home-item_upper">
						<div class="home-item__text" v-html="breakify(kitchenCat.content.description)"></div>
					</div>
					<div class="home-item_middle">
						<a v-if='kitchenCat.hasProducts && kitchenCat.content.showItsChilds' v-bind:href="`/#/products/${lightingCat.content.id}`" class="product-button">view products</a>
						<coming-soon v-else></coming-soon>
					</div>
					<div class="home-item_bottom">
						<div class="home-item__image"><img v-bind:src='kitchenCat.content.mainImage'></div>
					</div>
				</div>
				<!-- else -->
				<div v-else>
					<coming-soon></coming-soon>
					<div class="table-image"><img v-bind:src='tableImage'></div>
				</div>
				<div class="back-button" v-on:click='jumpBack'>back</div>
			</div>

			<div class="content__item bathroom">
				<!-- if bathroomCat -->
				<div class="home-item home-item_bathroom" v-if='bathroomCat'>
					<div class="home-item_upper">
						<div class="home-item__text" v-html="breakify(bathroomCat.content.description)"></div>
					</div>
					<div class="home-item_middle">
						<a v-if='bathroomCat.hasProducts && bathroomCat.content.showItsChilds' v-bind:href="`/#/products/${bathroomCat.content.id}`" class="product-button">view products</a>
						<coming-soon v-else></coming-soon>
					</div>
					<div class="home-item_bottom">
						<div class="home-item__image"><img v-bind:src='bathroomCat.content.mainImage'></div>
					</div>
				</div>
				<!-- else -->
				<div v-else>
					<coming-soon></coming-soon>
					<div class="table-image"><img v-bind:src='tableImage'></div>
				</div>
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
import db from '../database-controller/database-controller.js';

import Nav from '../nav/nav.vue';
import ComingSoon from './coming-soon/coming-soon.vue';
import Welcome from './welcome/welcome.vue';

export default {
	firebase ()  {
		return {
			settings: db.ref('general'),
			categories: db.ref('parentCat'),
			subCats: db.ref('subCat')
		}
	},
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
	computed: {
		tableCat () {
			return this.getCategory('tables');
		},
		seatingCat () {
			return this.getCategory('seating');
		},
		bedsCat () {
			return this.getCategory('beds');
		},
		decorCat () {
			return this.getCategory('decor');
		},
		lightingCat () {
			return this.getCategory('lighting');
		},
		kitchenCat () {
			return this.getCategory('kitchen');
		},
		bathroomCat () {
			return this.getCategory('bathroom');
		},
		aboutItem () {
			return this.settings.length && this.settings[0];
		},
		aboutText () {
			return this.aboutItem && this.aboutItem.text;
		}
	},
	methods: {
		breakify (text) {
			return text.replace(/(?:\r\n|\r|\n)/g, '<br/>');
		},
		goToNeutral () {
			this.playItem = this.lastItem;
			this.playItemMode = 'fadeDuration';
			this.lastItem = null;
			this.$refs.video.play();
		},
		getCategory (category) {
			let result = null;
			const rawCat = this.categories.filter(item => item.id === category);

			if (rawCat.length > 0) {
				result = {
					content: rawCat[0],
					hasProducts: this.subCats
						.filter(item => item.parentCat === category)
						.length > 0
				};
			}

			return result;
		},
		jumpBack () {
			$('.content__item').hide();
			$('.control-wrapper').removeClass('disabled');
			this.goToNeutral();
		},
		jumpTo (to) {
			const video = this.$refs.video;

			$('.control-wrapper').addClass('disabled');
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
		'header-nav': Nav,
		'coming-soon': ComingSoon,
		'welcome': Welcome
	}
}
</script>

<style scoped lang='sass'></style>
