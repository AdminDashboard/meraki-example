<template>
	<div class="admin">
		<header-nav nav-style="black"></header-nav>
		<div class="admin__content-wrapper">
			<div class="admin__tabs">
				<ul class="admin__list">
					<li class="admin__item">
						<a href="#" class="admin__link"
						v-bind:class="{admin__link_active: this.mode === 'settings'}"
						v-on:click.stop.prevent="showMode('settings')">Settings</a>
					</li>
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
					<li class="admin__item">
						<a href="#" class="admin__link"
						v-bind:class="{admin__link_active: this.mode === 'requests'}"
						v-on:click.stop.prevent="showMode('requests')">
							Requests {{requestsLengthString}}
						</a>
					</li>
				</ul>
			</div>
			<settings v-if="this.mode === 'settings'"></settings>
			<super-categories v-if="this.mode === 'super'"></super-categories>
			<sub-categories v-if="this.mode === 'sub'"></sub-categories>
			<products v-if="this.mode === 'products'"></products>
			<requests v-if="this.mode === 'requests'"></requests>
		</div>
	</div>
</template>

<script>
import './admin.sass';
import Nav from '../nav/nav.vue';
import SuperCategories from './super-categories/super-categories.vue';
import SubCategories from './sub-categories/sub-categories.vue';
import Products from './products/products.vue';
import Settings from './settings/settings.vue';
import Requests from './requests/requests.vue';
import db from '../database-controller/database-controller.js';

export default {
	firebase ()  {
		return {
			requests: {
				source: db.ref('requests'),
				readyCallback: function () {
					this.loaded = true;
				}
			}
		}
	},
	data () {
		return {
			loaded: false,
			mode: 'settings'
		}
	},
	computed: {
		newRequestsLength () {
			if (this.loaded) {
				return this.requests.filter(item => !item.seen).length;
			}
		},
		requestsLengthString () {
			return this.newRequestsLength ? `(${this.newRequestsLength})` : '';
		}
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
		products: Products,
		settings: Settings,
		requests: Requests
	}
}
</script>
