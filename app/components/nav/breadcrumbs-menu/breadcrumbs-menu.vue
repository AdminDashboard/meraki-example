<template>
	<div class="breadcrumbs-menu">
		<ul class="breadcrumbs-menu__list">
			<li class="breadcrumbs-menu__item" v-for="(category, index) in categories">
				<a class="breadcrumbs-menu__link" v-on:click="clearStyles">
					{{category}}
					<span class="breadcrumbs-menu__sub-menu" v-if="index === 0 || index === 1">
						<sub-item :key="index" v-if="subItem.showItsChilds === true || index !== 0" v-for="subItem in (index === 0 ? superLevel : subLevel)" :sub-data="{index: index, item: subItem}"></sub-item>
						<div class="breadcrumbs-menu__overlay" v-on:click.prevent.stop="hideSubmenu"></div>
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
import isMobile from '../../utils/mobile-detect';

export default {
	firebase () {
		return {
			superLevel: db.ref('parentCat'),
			subLevel: db.ref('subCat')
				.orderByChild('parentCat')
				.equalTo(this.categoryName)
		};
	},
	data () {
		return {
			submenu: false,
			isMobile: isMobile()
		}
	},
	methods: {
		hideSubmenu () {
			if (this.isMobile) {
				$('.breadcrumbs-menu__sub-menu').css({display: 'none'});
				$('.products-grid').removeClass('disabled');
			}
		},
		clearStyles () {
			if (this.isMobile) {
				$('.products-grid').addClass('disabled');
				$('.breadcrumbs-menu__sub-menu').attr('style', '');
			}
		}
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

<style scoped></style>
