<template>
	<div class="nav">
		<div class="nav__left-side">
			<div class="box-menu box-menu_white">
				<ul class="box-menu__list">
					<li class="box-menu__item">
						<a href="#/" class="box-menu__link">home</a>
					</li>
					<li class="box-menu__item">
						<a href="#/product" class="box-menu__link">products</a>
					</li>
					<li class="box-menu__item">
						<a href="#/products" class="box-menu__link">product</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="nav__right-side">
			<div class="nav-logo">
				<img v-bind:src="logo">
			</div>
			<dropdown-menu></dropdown-menu>
		</div>
	</div>
</template>

<script>
import './nav.sass';
import logo from '../index/logo.png';

import dropdown from './dropdown-menu/dropdown-menu.vue';

export default {
	data () {
		return {
			logo: logo,
			dropdown: false,
			items: []
		}
	},
	methods: {
		toggleDropdown() {
			this.dropdown = this.dropdown ? false : true;
		}
	},
	components: {
		'dropdown-menu': dropdown
	}
}
</script>
