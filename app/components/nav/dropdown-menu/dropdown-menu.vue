<template>
	<div class="dropdown-menu" v-bind:class="wrapperMod" v-on:click.stop="toggleDropdown">
		<div class="dropdown-menu__trigger" v-bind:class="mods"></div>
		<div class="dropdown-menu__content" v-on:click.stop="stop" v-bind:class="{'dropdown-menu__content_active': dropdown}">
			<ul class="dropdown-menu__list" v-on:click="closeDropdown">
				<li class="dropdown-menu__item add-items">
					<div class="wishlist">
						<a @click="moveTo('/wishlist')">
							<i class="fa fa-heart-o" aria-hidden="true"></i>{{wishlistItems && wishlistItems.length || ''}}
						</a>
					</div>
					<div class="cart"><i class="fa fa-shopping-cart" aria-hidden="true"></i>1</div>
					<div class="search"><i class="fa fa-search" aria-hidden="true"></i></div>
				</li>
				<li class="dropdown-menu__item"><a href="#/" class="dropdown-menu__link">home</a></li>
				<li class="dropdown-menu__item"><a href="#/products" class="dropdown-menu__link">products</a></li>
			</ul>
			<feed></feed>
			<div class="dropdown-menu__socials">
				<socials></socials>
			</div>
		</div>
	</div>
</template>

<script>
import './dropdown-menu.sass';
import Socials from '../../social-items/social-items.vue';
import Instagram from '../../instagram-feed/instagram-feed.vue';

const ESCAPE_KEY = 27;

export default {
	data () {
		return {
			dropdown: false,
			wishlistItems: this.$ls.get('wishlist')
		}
	},
	mounted () {
		document.addEventListener('keyup', this.handleKeyUp, true);
		document.addEventListener('click', this.handleClickOut, true);
	},
	beforeDestroy () {
		document.removeEventListener('keyup', this.handleKeyUp, true);
		document.removeEventListener('click', this.handleClickOut, true);
	},
	props: ['dStyle'],
	computed: {
		mods () {
			let modClass = this.dStyle === 'black'
				? {'dropdown-menu__trigger_black': true}
				: {'dropdown-menu__trigger_white': true};

			return Object.assign({
				'dropdown-menu__trigger_active': this.dropdown
			}, modClass);
		},
		wrapperMod () {
			return 'dropdown-menu_' + this.dStyle;
		}
	},
	methods: {
		toggleDropdown () {
			this.dropdown = this.dropdown ? false : true;

			if (this.dropdown) {
				$('#app').addClass('app_shrink');
			} else {
				$('#app').removeClass('app_shrink');
			}
		},
		stop () {
			return false;
		},
		closeDropdown () {
			$('#app').removeClass('app_shrink');
			this.dropdown = false;
		},
		handleKeyUp (event) {
			if (event.keyCode === ESCAPE_KEY) {
				this.closeDropdown();
			}
		},
		handleClickOut () {
			this.closeDropdown();
		},
		moveTo (url) {
			this.$router.push({path: url});
		}
	},
	components: {
		socials: Socials,
		feed: Instagram
	}
}
</script>

<style scoped lang="sass">
.add-items
	color: #fff
	display: flex
	border-bottom: 1px solid #fff
	padding-top: 10px
	padding-bottom: 10px
	> div
		width: 33.3%
		text-align: center
		font-size: 1.7em
		font-family: 'Ailerons'
		transition: all .2s ease-in-out
		&:hover
			transform: scale(1.2)
		a
			text-decoration: none
			color: #fff

.dropdown-menu
	&__socials
		position: absolute
		bottom: 0
		box-sizing: border-box
		padding: 10px
		width: 100%
</style>
