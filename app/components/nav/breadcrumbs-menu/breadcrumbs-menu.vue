<template>
	<div class="breadcrumbs-menu">
		<ul class="breadcrumbs-menu__list">
			<li class="breadcrumbs-menu__item" v-for="category in categories">
				<a class="breadcrumbs-menu__link">{{category}}</a>
			</li>
		</ul>
	</div>
</template>

<script>
import './breadcrumbs-menu.sass';

export default {
	data () {
		return {};
	},
	props: ['categories']
}
</script>
