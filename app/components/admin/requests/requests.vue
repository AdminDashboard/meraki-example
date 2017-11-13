<template>
	<div class="requests-wrapper">
		<div class="requests__item requests__item_headings">
			<div class="requests__item-name">
				<div class="requests__item-label">name</div>
			</div>
			<div class="requests__item-email">
				<div class="requests__item-label">email</div>
			</div>
			<div class="requests__item-phone">
				<div class="requests__item-label">phone</div>
			</div>
			<div class="requests__item-message">
				<div class="requests__item-label">message</div>
			</div>
			<div class="requests__item-page">
				<div class="requests__item-label">page</div>
			</div>
			<div class="requests__item-time">
				<div class="requests__item-label">time</div>
			</div>
			<div class="requests__item-mark">
			</div>
		</div>

		<div class="requests__item" v-for="request, index in items" v-bind:class="{seen: request.seen}">
			<div class="requests__item-name">
				<div class="requests__item-value">{{request.name}}</div>
			</div>
			<div class="requests__item-email">
				<div class="requests__item-value">{{request.email}}</div>
			</div>
			<div class="requests__item-phone">
				<div class="requests__item-value">{{request.phone}}</div>
			</div>
			<div class="requests__item-message">
				<div class="requests__item-value">{{request.message}}</div>
			</div>
			<div class="requests__item-page">
				<div class="requests__item-value">{{request.page}}</div>
			</div>
			<div class="requests__item-time">
				<div class="requests__item-value">{{request.formatTime}}</div>
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
	computed: {
		items () {
			if (this.loaded) {
				return this.requests.sort((a, b) => b.unixTime - a.unixTime);
			}
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
				seen: mark,
				unixTime: item.unixTime,
				formatTime: item.formatTime
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
			width: 15%
		> div:nth-child(7)
			width: 10%
		&-label
			color: gray
			text-transform: capitalize
		&-value
			font-size: .9em
		&.seen
			background: none
		&_headings
			background: none
			border-bottom: 1px solid lightgray
	&__item-time
		.requests__item-value
			font-size: .8em
</style>
