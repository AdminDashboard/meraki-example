<template>
	<div class="instagram-feed">
		<div class="instagram-feed__image" v-for="image in images">
			<img :src="image.images.low_resolution.url">
		</div>
	</div>
</template>

<script>

export default {
	data () {
		return {
			images: []
		};
	},
	mounted () {
		this.getData();
	},
	methods: {
		getData () {
			var accessToken = '2374801533.97f1825.9e25972bb0c444e893ac48c6fe32025e';

			$.getJSON('https://api.instagram.com/v1/users/self/media/recent/?access_token='+accessToken+'&callback=?', data => this.images = data.data);
		}
	}
}
</script>

<style scoped lang='sass'>
.instagram-feed
	img
		width: 100%
</style>
