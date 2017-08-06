<template>
	<div class="box-menu" v-bind:class="wrapperMod">
		<ul class="box-menu__list">
			<li class="box-menu__item">
				<a href="#/" class="box-menu__link">home</a>
			</li>
			<li class="box-menu__item">
				<a href="#/products" class="box-menu__link">products</a>
			</li>
			<li class="box-menu__item">
				<a href="#/admin" class="box-menu__link">admin</a>
			</li>
		</ul>
	</div>
</template>

<script>
import './box-menu.sass';

export default {
	data () {
		return {};
	},
	props: ['boxStyle'],
	computed: {
		wrapperMod () {
			return 'box-menu_' + (this.boxStyle || 'white');
		}
	}
}
</script>
