<template>
	<div class="dropdown-menu" v-bind:class="wrapperMod" v-on:click.stop="toggleDropdown">
		<div class="dropdown-menu__trigger" v-bind:class="mods"></div>
		<div class="dropdown-menu__content" v-on:click.stop="stop" v-bind:class="{'dropdown-menu__content_active': dropdown}">
			<ul class="dropdown-menu__list" v-on:click="closeDropdown">
				<li class="dropdown-menu__item"><a href="#/" class="dropdown-menu__link">home</a></li>
				<li class="dropdown-menu__item"><a href="#/products" class="dropdown-menu__link">products</a></li>
			</ul>
		</div>
	</div>
</template>

<script>
import './dropdown-menu.sass';
const ESCAPE_KEY = 27;

export default {
	data () {
		return {
			dropdown: false
		}
	},
	mounted () {
		document.addEventListener('keyup', (event) => {
			if (event.keyCode === ESCAPE_KEY) {
				this.closeDropdown();
			}
		});

		document.addEventListener('click', () => this.closeDropdown());
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
		}
	}
}
</script>
