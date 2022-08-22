<script lang="ts">
	import { headerState } from '$lib/stores/header-store';
	headerState.set({
		backbutton: true,
		title: 'Einstellungen',
		hidden: false
	});
</script>

<label for="notification_freq">
	Wieviele Benachrichtigungen sollen angezeigt werden?

	<input
		class="w-full notifications-input"
		type="range"
		id="notification_freq"
		name="notification_freq"
		min="0"
		max="2"
		step="1"
		value="1"
		list="steplist"
	/>
	<datalist id="steplist">
		<option value="0">Keine</option>
		<option value="1">Einige</option>
		<option value="2">Alle</option>
	</datalist>
</label>

<style lang="scss">
	.notifications-input {
		@apply mb-8;

		position: relative;
		&:before,
		&:after {
			@apply text-sm;
			position: absolute;
			bottom: -1.5rem;
		}

		&:before {
			content: 'Keine';

			left: 0;
		}
		&:after {
			content: 'Alle';

			right: 0;
		}
	}
</style>
