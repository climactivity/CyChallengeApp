import { flip } from 'svelte/animate';
import { fade, fly } from 'svelte/transition';

/**
 * We are resetting the styles if animation already exists
 * Be aware that all default styles will be overriden that way
 */
export function customFlip(node, fromTo) {
	if (node.style.animation) node.style = null;
	return flip(node, fromTo, { duration: 500 });
}

/**
 * If the element is still animating,
 * reset everything and start again
 */
export function customFlyIn(node) {
	if (node.style.animation) return;
	return fly(node, { y: 15, duration: 400 });
}

/**
 * If the element was already flying out, leave it that way.
 * Do not add another flying animation, as the new element is going
 * to
 */
export function customFlyOut(node) {
	if (node.style.animation) return;
	return fly(node, { y: 15, duration: 400 });
}

/**
 * If the element was already flying out, leave it that way.
 * Do not add another flying animation, as the new element is going
 * to
 */
export function customFly(node, { y, duration }) {
	if (node.style.animation) return;
	return fly(node, { y, duration });
}

export function customFade(node, { duration = 1 }) {
	if (node.style.animation) return;
	node.style.position = 'absolute';
	return fade(node, { duration });
}
