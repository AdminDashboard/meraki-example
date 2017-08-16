<template>
	<div class="breadcrumbs-menu">
		<ul class="breadcrumbs-menu__list">
			<li class="breadcrumbs-menu__item" v-for="(category, index) in categories">
				<a class="breadcrumbs-menu__link">
					{{category}}
					<span>
						<a
							v-for="subItem in (index === 0 ? superLevel : subLevel)"
							v-bind:href="'#/products/' + (index === 0
								? subItem.id
								: subItem.id + '/items')">
							{{subItem.title}}
						</a>
					</span>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
import './breadcrumbs-menu.sass';
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
	}
}
</script>
