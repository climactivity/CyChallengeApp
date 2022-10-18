<script>
	import JournalButton from '$lib/components/buttons/journal-button.svelte';
	import TutorialCard from '$lib/components/challenge/tutorial-card.svelte';
	import CollapsableHtmlView from '$lib/components/collapsable-html-view.svelte';
</script>

<div class="min-h-screen grid place-content-start">
	<div>
		<CollapsableHtmlView
			title={'Test View'}
			collapsed={false}
			canCollapse={true}
			collapsedSize={'8rem'}
			content={`<p>Die Ernährung trägt <b>weltweit</b> auch in Deutschland mit ca. 15% zur globalen Treibhausgas-Emission bei. Soll dieser CO2-Fußabdruck gesenkt werden, müssen sich unsere Ernährungsgewohnheiten und folglich auch die Landwirtschaft ändern. Dafür eignet sich sich eine "Klimatarische Ernährung". </p>
		<p> Im Gegensatz zu einer veganen Ernährung musst du bei einer klimatarischen Ernährung den Verzehr von tierischen Produkten zwar auch deutlich reduzieren, aber nicht gänzlich darauf verzichten. Dennoch lohnt es sich zur Ernährungsumstellung auch mal Dinnerpartys zu veranstalten, die ganz ohne tierische Produkte <a href="https://google.com">auskommen</a>, um deine Gewohnheiten und die deiner Gäste zu verändern. </p> 
		<p> Im Gegensatz zu einer veganen Ernährung musst du bei einer klimatarischen Ernährung den Verzehr von tierischen Produkten zwar auch deutlich reduzieren, aber nicht gänzlich darauf verzichten. Dennoch lohnt es sich zur Ernährungsumstellung auch mal Dinnerpartys zu veranstalten, die ganz ohne tierische Produkte auskommen, um deine Gewohnheiten und die deiner Gäste zu verändern. </p> 
		
		
		 `}
		/>
	</div>
</div>
