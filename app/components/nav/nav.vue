<template>
	<div class="nav" v-bind:class="wrapperMod">
		<div class="nav__left-side">
			<box-menu v-if="!navCats" v-bind:box-style="this.navStyle"></box-menu>
			<breadcrumbs-menu v-if="navCats" v-bind:categories="navCats"></breadcrumbs-menu>
		</div>
		<div class="nav__right-side">
			<div class="nav-logo">
				<a href="/"><img v-bind:src="logo"></a>
			</div>
			<dropdown-menu v-bind:d-style="this.navStyle"></dropdown-menu>
		</div>
	</div>
</template>

<script>
import './nav.sass';
import logoWhite from '../index/logo.png';
import logoBlack from '../index/logo-2.png';

import boxMenu from './box-menu/box-menu.vue';
import dropdown from './dropdown-menu/dropdown-menu.vue';
import breadMenu from './breadcrumbs-menu/breadcrumbs-menu.vue';

import db from '../database-controller/database-controller.js';

export default {
	data () {
		return {
			logoWhite: logoWhite,
			logoBlack: logoBlack,
			dropdown: false,
			items: [],
			loaded: false
		}
	},
	firebase ()  {
		return {
			settings: {
				source: db.ref('general'),
				readyCallback: function () {
					this.loaded = true;
				}
			}
		}
	},
	watch: {
		loaded () {
			this.logo = this.logoUrl;
		}
	},
	props: ['navStyle', 'navCats'],
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
		wrapperMod () {
			return 'nav_' + this.navStyle;
		},
		logo () {
			if (this.logoUrl) {
				return this.logoUrl;
			}

			return this.navStyle === 'black'
				? logoBlack
				: logoWhite;
		},
		logoItem () {
			return this.settings.length && this.settings[1];
		},
		logoUrl () {
			return this.logoItem && this.logoItem.url;
		}
	},
	components: {
		'dropdown-menu': dropdown,
		'box-menu': boxMenu,
		'breadcrumbs-menu': breadMenu
	}
}
</script>
