<template>
	<div class="breadcrumbs-menu">
		<ul class="breadcrumbs-menu__list">
			<li class="breadcrumbs-menu__item" v-for="(category, index) in categories">
				<a class="breadcrumbs-menu__link">
					{{category}}
					<span class="breadcrumbs-menu__sub-menu" v-if="index === 0 || index === 1">
						<sub-item :key="index" v-for="subItem in (index === 0 ? superLevel : subLevel)" :sub-data="{index: index, item: subItem}"></sub-item>
					</span>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
import './breadcrumbs-menu.sass';
import SubItem from './breadcrumbs-menu__sub-item/breadcrumbs-menu__sub-item.vue';
import db from '../../database-controller/database-controller.js';

export default {
	firebase () {
		return {
			superLevel: db.ref('parentCat'),
			subLevel: db.ref('subCat')
				.orderByChild('parentCat')
				.equalTo(this.categoryName)
		};
	},
	props: ['categories'],
	computed: {
		categoryName () {
			return this.categories[0]
		}
	},
	components: {
		'sub-item': SubItem
	}
}
</script>
