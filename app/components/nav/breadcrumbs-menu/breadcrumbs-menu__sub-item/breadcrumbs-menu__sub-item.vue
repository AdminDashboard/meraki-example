<template>
	<a :href="link">{{this.title}}</a>
</template>

<script>
export default {
	data () {
		return {
			index: this.subData.index,
			title: this.subData.item.title,
			itemId: this.subData.item.id
		}
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
	props: ['sub-data']
}
</script>
