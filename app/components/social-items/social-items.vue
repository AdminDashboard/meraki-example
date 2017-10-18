<template>
	<div class="social-items">
		<a class="social-items__item" :href="item.url" v-for="item in socials">
			<i :class="getClasses(item.type)" aria-hidden="true"></i>
			</a>
	</div>
</template>

<script>
import db from '../database-controller/database-controller.js';
import fontAwesomeIcons from '../utils/fontAwesomeIcons.js';

export default {
	firebase ()  {
		return {
			socials: {
				source: db.ref('general').child('socials'),
				readyCallback: function () {
					this.loaded = true;
				}
			}
		}
	},
	methods: {
		getClasses (type) {
			return ['fa', fontAwesomeIcons[type]];
		}
	}
};
</script>

<style scoped lang='sass'>
.social-items
	display: flex
	&__item
		display: block
		text-decoration: none
		color: #fff
		margin-left: 5px
		transition: all .2s ease-in-out
		font-size: 1.5em
		&:first-child
			margin-left: 0
		&:hover
			opacity: .5
</style>
