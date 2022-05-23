<script>
    import { SafeArea } from "capacitor-plugin-safe-area";
    import "../app.css";
    import BottomNavbar from "$lib/components/bottom-navbar.svelte";
    let insets = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
    SafeArea.getSafeAreaInsets().then(({ insets: _insets }) => {
        insets = _insets;

    })
</script>

<div class="relative w-[100vw] h-[100vh]">

<safe-area class="absolute" style="top: {insets.top}px; bottom: {insets.bottom}px; left: {insets.left}px; right: {insets.right}px;">
    <main class="h-full pb-12 ">
        <div class="bg-amber-200 h-full">
            <slot />
        </div>
    </main>
    <nav class="absolute bottom-0  w-full bg-fuchsia-200">
        <BottomNavbar/>
    </nav>
</safe-area>
</div>
