<template>
	<div class='mobileHome'>
		<h1>Mobile</h1>
		<div class="owl-carousel owl-theme">
			<div> Your Content1 </div>
			<div> Your Content </div>
			<div> Your Content2 </div>
			<div> Your Content </div>
			<div> Your Content </div>
			<div> Your Content </div>
			<div> Your Content </div>
		</div>
	</div>
</template>

<script>
import tableImage from '../table.png';
import aboutLogo from '../logo-2.png';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'imports-loader?jQuery=jquery!owl.carousel';
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
		$('.owl-carousel').owlCarousel();
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

<style scoped lang='sass'>
	.owl-carousel
		touch-action: manipulation
</style>
