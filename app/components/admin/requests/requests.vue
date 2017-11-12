<template>
	<div class="requests-wrapper">
		<div class="requests__item" v-for="request in requests" v-bind:class="{seen: request.seen}">
			<div class="requests__item-name">
				<div class="requests__item-label">name:</div>
				<div class="requests__item-value">{{request.name}}</div>
			</div>
			<div class="requests__item-email">
				<div class="requests__item-label">email:</div>
				<div class="requests__item-value">{{request.email}}</div>
			</div>
			<div class="requests__item-phone">
				<div class="requests__item-label">phone:</div>
				<div class="requests__item-value">{{request.phone}}</div>
			</div>
			<div class="requests__item-message">
				<div class="requests__item-label">message:</div>
				<div class="requests__item-value">{{request.message}}</div>
			</div>
			<div class="requests__item-page">
				<div class="requests__item-label">page:</div>
				<div class="requests__item-value">{{request.page}}</div>
			</div>
			<div class="requests__item-mark">
				<button class="requests__mark"
					v-text="request.seen
						? 'Mark as unseen'
						: 'Mark as seen'"
					@click="request.seen
						? edit(request, false)
						: edit (request, true)"></button>
			</div>
		</div>
	</div>
</template>

<script>
import db from '../../database-controller/database-controller.js';

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
			loaded: false
		}
	},
	methods: {
		edit (item, mark) {
			this.$firebaseRefs.requests.child(item['.key']).set({
				type: item.type,
				name: item.name,
				email: item.email,
				phone: item.phone,
				message: item.message,
				page: item.page,
				seen: mark
			});
		}
	}
}
</script>

<style scoped lang='sass'>
.requests
	&__item
		display: flex
		background: #ffdb4d
		margin-bottom: 10px
		box-sizing: border-box
		padding: 10px
		align-items: center
		justify-content: space-between
		> div:nth-child(1), > div:nth-child(2), > div:nth-child(3)
			width: 10%
		> div:nth-child(4)
			width: 15%
		> div:nth-child(5)
			width: 30%
		> div:nth-child(6)
			width: 10%
		&-label
			color: gray
		&-value
			margin-left: 10px
		&.seen
			background: none
</style>
