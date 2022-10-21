<script lang="ts">
	import Sponsors from '$lib/sponsors.svelte';
	import { headerState } from '$lib/stores/header-store';
	headerState.set({
		backbutton: true,
		title: 'Unsere Partner',
		hidden: false
	});
</script>

<div class="prose mx-4 p-4 rounded  ">
	Die Klimawette möchte als Partizipationskampagne für besseren Klimaschutz jede und jeden Einzelnen
	ermutigen selbst Verantwortung zu übernehmen, wenn es darum geht effektiven Klimaschutz
	voranzutreiben. Wir unterstützen Climactivity, denn es bietet der Gesellschaft ein Potpourri an
	Möglichkeiten sich zu engagieren, sodass es keine Ausreden mehr gibt nicht handeln zu können.”
</div>

<Sponsors />
