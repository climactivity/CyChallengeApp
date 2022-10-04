<script lang="ts">
	import { headerState } from '$lib/stores/header-store';
	headerState.set({
		backbutton: true,
		title: 'changelog',
		hidden: false
	});
</script>

<div class="prose mx-4 p-4 rounded shadow bg-white">
	<p>
		<strong>22-08-08</strong> - Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, odit
		corporis voluptatibus, minus totam perspiciatis incidunt iste soluta, nostrum quo blanditiis consequatur
		earum ad esse? Ipsa asperiores rerum vitae debitis
	</p>
	<hr />
	<p>
		<strong>22-08-19</strong> - Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, odit
		corporis voluptatibus, minus totam perspiciatis incidunt iste soluta, nostrum quo blanditiis consequatur
		earum ad esse? Ipsa asperiores rerum vitae debitis.
	</p>
</div>
