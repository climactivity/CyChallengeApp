import { mapToRange } from '$lib/util';
import { cubicOut, linear } from 'svelte/easing';

export const ANIMATION_BASE_SPEED = 250;

export enum AnimationDirection {
	left = 'left',
	right = 'right',
	up = 'up',
	down = 'down'
}

export enum AnimationRole {
	from = 'from',
	to = 'to'
}

const screenOrderLtR = {
	home: 0,
	journal: 1,
	challenges: 2,
	challenge: 2,
	quiz: 3,
	feed: 4,
	info: 5
};
const screenOrderRtL = {
	home: 5,
	journal: 4,
	challenges: 3,
	challenge: 3,
	quiz: 2,
	feed: 1,
	info: 0
};
export let screenOrder = screenOrderLtR;

const screenOrderIndex = (string): number => {
	const screen = string.split('/')[1];
	console.log('animationDirection', string.split('/').slice(1));
	return screenOrder[screen] ?? 0;
};

const currentAnimDirection = (naviation): AnimationDirection => {
	const originPath = naviation.from.pathname;
	const targetPath = naviation.to.pathname;
	const originPathBase = screenOrderIndex(originPath);
	const targetPathBase = screenOrderIndex(targetPath);

	const originPathDepth = originPath.split('/').length;
	const targetPathDepth = targetPath.split('/').length;

	if (originPathBase !== targetPathBase) {
		if (originPathBase > targetPathBase) {
			return AnimationDirection.left;
		} else {
			return AnimationDirection.right;
		}
	} else {
		if (originPathDepth > targetPathDepth) {
			return AnimationDirection.up;
		} else {
			return AnimationDirection.down;
		}
	}
};

const css = (
	currentAnimDirection: AnimationDirection,
	currentRole: AnimationRole,
	computedStyle: CSSStyleDeclaration
) => (t, s) => {
	const opacity = +computedStyle.opacity;
	const height = parseFloat(computedStyle.height);
	const width = parseFloat(computedStyle.width);

	const baseStyle =
		'overflow: hidden; position: absolute;' +
		`width: ${width}px;` +
		`height: ${height}px;` +
		`opacity: ${Math.min(t * 20, 1) * opacity};`;

	switch (currentAnimDirection) {
		case AnimationDirection.left: {
			const direction = currentRole === AnimationRole.to ? -1 : 1;

			return baseStyle + `z-index: 0;` + `transform: translateX( ${direction * s * width}px);`;
		}
		case AnimationDirection.right: {
			const direction = currentRole === AnimationRole.from ? -1 : 1;

			return baseStyle + `z-index: 0;` + `transform: translateX( ${direction * s * width}px);`;
		}
		case AnimationDirection.up: {
			const zIndex = currentRole === AnimationRole.to ? 0 : 10;
			const direction = currentRole === AnimationRole.to ? -1 : 1;
			return (
				baseStyle + `z-index: ${zIndex};` + `transform: translateX( ${direction * s * width}px);`
			);
		}

		case AnimationDirection.down: {
			const zIndex = currentRole === AnimationRole.from ? 0 : 10;
			const direction = currentRole === AnimationRole.from ? -1 : 1;
			return (
				baseStyle + `z-index: ${zIndex};` + `transform: translateX( ${direction * s * width}px);`
			);
		}
	}
};

export function mainScreenAnim(
	node,
	{ delay = 0, duration = 1000, easing = linear, navigation = null, role = AnimationRole.from } = {}
) {
	const style = getComputedStyle(node);
	const animationDirection = currentAnimDirection(navigation);
	duration =
		duration ?? (animationDirection === AnimationDirection.up && role === AnimationRole.from)
			? ANIMATION_BASE_SPEED * 2
			: animationDirection === AnimationDirection.up ||
			  (animationDirection === AnimationDirection.down && role === AnimationRole.to)
			? ANIMATION_BASE_SPEED * 2
			: ANIMATION_BASE_SPEED * 4;

	easing = role === AnimationRole.to ? cubicOut : linear;
	console.log('mainScreenAnim', role, navigation);
	return {
		delay,
		duration: duration,
		easing,
		css: css(animationDirection, role, style)
	};
}
