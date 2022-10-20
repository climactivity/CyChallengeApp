<script lang="ts">
	export let videoId;
	export let startAt = 0;
	let content;
	let w, h;
	let posterUrl = `https://embetty.climactivity.de/video/youtube/${videoId}-poster-image`;
	const loadYtIframe = () => {
		content = `
        <iframe
          id="ytplayer"
          width="${w}"
          height="${h}"
          src="//www.youtube-nocookie.com/embed/${videoId}?autoplay=1&start=${startAt}"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        `;
	};
</script>

<div
	class="relative rounded overflow-hidden"
	bind:innerHTML={content}
	contenteditable
	bind:clientWidth={w}
	bind:clientHeight={h}
>
	<img src={posterUrl} class="rounded shadow" />

	<button
		type="button"
		id="playbutton"
		aria-label="Abspielen"
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
		on:click={() => loadYtIframe()}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="72"
			height="72"
			viewBox="0 0 2000 2000"
			fill="#fff"
			class="video-playbutton"
		>
			<g transform="matrix(1.05356,0,0,1.03089,24.9824,-12.7689)">
				<ellipse
					cx="925.453"
					cy="982.42"
					rx="906.453"
					ry="926.382"
					style="fill:black;fill-opacity:0.65;stroke:white;stroke-width:70px;"
				/>
			</g>
			<g transform="matrix(1.6783e-16,2.74087,-2.70471,1.65616e-16,2834.26,-542.169)">
				<path
					d="M552.398,514.228C554.346,510.792 557.954,508.67 561.865,508.661C565.775,508.652 569.393,510.758 571.356,514.186C599.993,564.195 685.165,712.931 713.834,762.997C715.799,766.428 715.806,770.661 713.852,774.099C711.898,777.537 708.282,779.655 704.367,779.655L420.852,779.655C416.946,779.655 413.336,777.546 411.379,774.12C409.422,770.694 409.415,766.471 411.361,763.039C439.708,713.029 524.019,564.293 552.398,514.228Z"
					style="fill:white;"
				/>
			</g>
		</svg>
	</button>

	<a
		href="https://www.heise.de/embetty"
		target="_blank"
		rel="noopener"
		id="powered-by"
		title="embetty - displaying remote content without compromising your privacy."
		class="absolute bottom-0 right-0 flex flex-row items-end gap-1 text-black text-xs"
		contenteditable="false"
	>
		powered by <img src="/images/embetty.svg" alt="embetty hype" class="w-5 h-10 inline-block" />
	</a>
</div>

<style lang="scss">
	iframe {
		position: absolute;
		inset: 0px;
	}
</style>
