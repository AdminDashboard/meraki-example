<template>
	<div class="dropdown-menu" v-on:click="toggleDropdown">
		<div class="dropdown-menu__trigger" v-bind:class="{'dropdown-menu__trigger_active': dropdown}"></div>
		<div class="dropdown-menu__content" v-bind:class="{'dropdown-menu__content_active': dropdown}">
			<ul class="dropdown-menu__list">
				<li class="dropdown-menu__item"><a href="#/" class="dropdown-menu__link">home</a></li>
				<li class="dropdown-menu__item"><a href="#/product" class="dropdown-menu__link">product</a></li>
				<li class="dropdown-menu__item"><a href="#/products" class="dropdown-menu__link">products</a></li>
			</ul>
		</div>
	</div>
</template>

<script>
import './dropdown-menu.sass';

export default {
	data () {
		return {
			dropdown: false
		}
	},
	methods: {
		toggleDropdown() {
			this.dropdown = this.dropdown ? false : true;
		}
	}
}
</script>
