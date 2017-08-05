<template>
	<div class="admin">
		<header-nav nav-style="black"></header-nav>
		<div class="admin__content-wrapper">
			<div class="admin__tabs">
				<ul class="admin__list">
					<li class="admin__item">
						<a href="#" class="admin__link"
						v-bind:class="{admin__link_active: this.mode === 'super'}"
						v-on:click.stop.prevent="showMode('super')">Super categories</a>
					</li>
					<li class="admin__item">
						<a href="#" class="admin__link"
						v-bind:class="{admin__link_active: this.mode === 'sub'}"
						v-on:click.stop.prevent="showMode('sub')">Sub categories</a>
					</li>
					<li class="admin__item">
						<a href="#" class="admin__link"
						v-bind:class="{admin__link_active: this.mode === 'products'}"
						v-on:click.stop.prevent="showMode('products')">Products</a>
					</li>
				</ul>
			</div>
			<super-categories v-if="this.mode === 'super'"></super-categories>
			<sub-categories v-if="this.mode === 'sub'"></sub-categories>
			<products v-if="this.mode === 'products'"></products>
		</div>
	</div>
</template>

<script>
import './admin.sass';
import Nav from '../nav/nav.vue';
import SuperCategories from './super-categories/super-categories.vue';
import SubCategories from './sub-categories/sub-categories.vue';
import Products from './products/products.vue';

export default {
	data () {
		return {
			mode: 'super'
		};
	},
	methods: {
		showMode (mode) {
			this.mode = mode;
		}
	},
	components: {
		'header-nav': Nav,
		'super-categories': SuperCategories,
		'sub-categories': SubCategories,
		products: Products
	}
}
</script>
