<script lang="ts">
    import {page} from "$app/navigation/";

    export let label = "IconButton"
    export let showLabel = false
    let selected = false
    const select = (_e) => {
        selected = !selected;
        console.log(selected)
    }

    if (browser) {

    }
    page.subscribe(page => {
        selected = false
    })
</script>


<div class="cursor-pointer  transition-all duration-500 {selected ? 'selected' : 'unselected'} grid place-content-center grid-flow-col gap-2"
     on:click={select}>
    <a href="/home">
        <slot/>
        {#if showLabel}
            <div>
            <span>
                {label}
            </span>
            </div>
        {/if}
    </a>

</div>

<style>


    .selected {
        fill: #2563eb;
        color: #2563eb;
        animation: select 150ms ease forwards;
    }

    .unselected {
        fill: #000000;


    }

    @keyframes select {
        0% {
            transform: scale3d(1, 1, 1) translateY(0px);
        }

        33% {
            transform: scale3d(1.1, 1.1, 1.1) translateY(-2px);

        }

        100% {
            transform: scale3d(1, 1, 1) translateY(0px);

        }

    }
</style>