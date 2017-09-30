<template>
	<a :href="link" v-if="this.loaded === true && this.parentCatHasPermission === true">{{this.title}}</a>
</template>

<script>
import db from '../../../database-controller/database-controller.js';

export default {
	data () {
		return {
			index: this.subData.index,
			title: this.subData.item.title,
			itemId: this.subData.item.id,
			parentCat: this.subData.item.parentCat,
			parentCatHasPermission: false,
			loaded: false
		}
	},
	mounted () {
		this.fetchPermission();
	},
	computed: {
		link () {
			const index = this.index;
			let url = '#';

			if (index === 0) {
				url = `#/products/${this.itemId}`;
			}

			if (index === 1) {
				url = `#/products/${this.itemId}/items`;
			}

			if (index === 2) {
				url = `#/product/${this.itemId}`;
			}

			return url;
		}
	},
	methods: {
		fetchPermission () {
			if (this.parentCat) {
				return db.ref('parentCat')
					.orderByChild('id')
					.equalTo(this.parentCat)
					.once('child_added', snapshot => {
						if (snapshot.val().showItsChilds) {
							this.parentCatHasPermission = true;
						}

						this.loaded = true;
					});
			}

			this.parentCatHasPermission = true;
			this.loaded = true;
		}
	},
	props: ['sub-data']
}
</script>
