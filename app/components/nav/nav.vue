<template>
	<div class="nav">
		<div class="nav__left-side">
			<div class="box-menu" v-bind:class="mod">
				<ul class="box-menu__list">
					<li class="box-menu__item">
						<a href="#/" class="box-menu__link">home</a>
					</li>
					<li class="box-menu__item">
						<a href="#/product" class="box-menu__link">product</a>
					</li>
					<li class="box-menu__item">
						<a href="#/products" class="box-menu__link">products</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="nav__right-side">
			<div class="nav-logo">
				<img v-bind:src="logo">
			</div>
			<dropdown-menu v-bind:d-style="this.navStyle"></dropdown-menu>
		</div>
	</div>
</template>

<script>
import './nav.sass';
import logoWhite from '../index/logo.png';
import logoBlack from '../index/logo-2.png';

import dropdown from './dropdown-menu/dropdown-menu.vue';

export default {
	data () {
		return {
			logoWhite: logoWhite,
			logoBlack: logoBlack,
			dropdown: false,
			items: []
		}
	},
	props: ['navStyle'],
	methods: {
		toggleDropdown() {
			this.dropdown = this.dropdown ? false : true;
		}
	},
	computed: {
		mod () {
			const styleClass = 'box-menu_';
			const defaultMod = 'box-menu_white';

			return this.navStyle
				? styleClass + this.navStyle
				: defaultMod;
		},
		logo () {
			return this.navStyle === 'black'
				? logoBlack
				: logoWhite;
		}
	},
	components: {
		'dropdown-menu': dropdown
	}
}
</script>
