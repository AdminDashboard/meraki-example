<template>
	<div class="admin">
		<header-nav nav-style="black"></header-nav>
		<div class="admin__content-wrapper">
			<h1>Admin page. Super categories</h1>
			<super-categories></super-categories>
		</div>
	</div>
</template>

<script>
import './admin.sass';
import Nav from '../nav/nav.vue';
import SuperCategories from './super-categories/super-categories.vue';

export default {
	data () {
		return {};
	},
	components: {
		'header-nav': Nav,
		'super-categories': SuperCategories
	}
}
</script>
