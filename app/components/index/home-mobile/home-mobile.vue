<template>
	<div class='mobileHome'>
		<header-nav></header-nav>
		<h1>Mobile</h1>
	</div>
</template>

<script>
import tableImage from '../table.png';
import aboutLogo from '../logo-2.png';
import db from '../../database-controller/database-controller.js';

import Nav from '../../nav/nav.vue';
import ComingSoon from '../coming-soon/coming-soon.vue';

export default {
	firebase ()  {
		return {
			categories: db.ref('parentCat'),
			subCats: db.ref('subCat')
		}
	},
	data () {
		return {
			tableImage: tableImage,
			aboutLogo: aboutLogo,
			navItems: [
				'seating',
				'beds',
				'decor',
				'lighting',
				'kitchen',
				'bathroom',
				'about',
				'tables'
			]
		}
	},
	mounted () {

	},
	computed: {
		tableCat () {
			return this.getCategory('tables');
		},
		seatingCat () {
			return this.getCategory('seating');
		},
		bedsCat () {
			return this.getCategory('beds');
		},
		decorCat () {
			return this.getCategory('decor');
		},
		lightingCat () {
			return this.getCategory('lighting');
		},
		kitchenCat () {
			return this.getCategory('kitchen');
		},
		bathroomCat () {
			return this.getCategory('bathroom');
		}
	},
	methods: {

	},
	components: {
		'header-nav': Nav,
		'coming-soon': ComingSoon
	}
}
</script>

<style scoped lang='sass'></style>
