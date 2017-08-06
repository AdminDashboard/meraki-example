<template>
	<div class="breadcrumbs-menu">
		<ul class="breadcrumbs-menu__list">
			<li class="breadcrumbs-menu__item" v-for="(category, index) in categories">
				<a class="breadcrumbs-menu__link"
					v-bind:href="'#/products/' + (index === 0
						? category
						: category + '/items')">{{category}}</a>
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
