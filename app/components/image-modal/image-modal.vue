<template>
	<div class="image-modal" v-on:click="close" v-bind:class="mod">
		<div class="image-modal__image" v-bind:style="imagePositionData">
			<img v-bind:src='imageData.src'></div>
		</div>
	</div>
</template>

<script>
import './image-modal.sass';

export default {
	data () {
		return {};
	},
	props: ['imageData'],
	computed: {
		isActive () {
			return this.imageData.active;
		},
		imagePositionData () {
			const offsetData = this.imageData.offsetData;

			if (!offsetData) {
				return {};
			}

			return {
				width: `${offsetData.width}px`,
				top: `${offsetData.top}px`,
				left: `${offsetData.left}px`
			};
		},
		mod () {
			return {
				'image-modal_active': this.isActive
			}
		}
	},
	mounted () {
		document.addEventListener('keyup', (event) => {
			if (event.keyCode == 27) {
				this.close();
			}
		});
	},
	methods: {
		close () {
			this.imageData.active = false;
		}
	}
}
</script>
