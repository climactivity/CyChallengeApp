import { mapToRange } from '$lib/util';
import { cubicOut, linear } from 'svelte/easing';

export const ANIMATION_BASE_SPEED = 250;

export enum AnimationDirection {
	left = 'left',
	right = 'right',
	up = 'up',
	down = 'down',
	neutral = 'neutral'
}

export enum AnimationRole {
	from = 'from',
	to = 'to'
}

const screenOrderLtR = {
	home: 0,
	impact: 5,
	journal: 10,
	challenges: 20,
	challenge: 25,
	quiz: 30,
	feed: 40,
	info: 50
};
const screenOrderRtL = {
	home: 50,
	impact: 45,
	journal: 40,
	challenges: 35,
	challenge: 30,
	quiz: 20,
	feed: 10,
	info: 0
};
export let screenOrder = screenOrderLtR;

const screenOrderIndex = (string): number => {
	const screen = string.split('/')[1];
	// console.log('animationDirection', string.split('/').slice(1));
	return screenOrder[screen] ?? 0;
};

const currentAnimDirection = (navigation): AnimationDirection => {
	if (!navigation || !navigation.from || !navigation.to) {
		console.warn('No from or to screen in navigation', navigation);
		return AnimationDirection.neutral;
	}

	const originPath = navigation.from.pathname;
	const targetPath = navigation.to.pathname;
	const originPathBase = screenOrderIndex(originPath);
	const targetPathBase = screenOrderIndex(targetPath);

	const originPathDepth = originPath.split('/').length;
	const targetPathDepth = targetPath.split('/').length;

	if (originPathBase === screenOrder.challenge && targetPathBase === screenOrder.challenge) {
		if (originPathDepth === 3 || targetPathDepth === 3) {
			return AnimationDirection.neutral;
		}
	}

	// if (originPathBase === screenOrder.challenges && targetPathBase === screenOrder.challenges) {
	// 	// console.log('challenges', originPathDepth, targetPathDepth);
	// 	if (originPathDepth === 3 || targetPathDepth === 4) {
	// 		return AnimationDirection.neutral;
	// 	}
	// }

	if (originPathBase === screenOrder.journal && targetPathBase === screenOrder.journal) {
		return AnimationDirection.neutral;
	}

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

// yes this is curried, no im not sorry
const css = (
	currentAnimDirection: AnimationDirection,
	currentRole: AnimationRole,
	computedStyle: CSSStyleDeclaration
) => (t, s) => {
	const opacity = parseFloat(computedStyle.opacity);
	const height = parseFloat(computedStyle.height);
	const width = parseFloat(computedStyle.width);

	const baseStyle =
		'overflow: hidden; position: absolute;' +
		`width: ${width}px;` +
		`height: ${height}px;` +
		// `opacity: ${Math.min(t * 20, 1) * opacity};
		``;
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

	// if moving between action pages on a challenge skip main animation
	if (animationDirection === AnimationDirection.neutral) {
		console.log('skipping main screen animation');
		return {
			delay: 0,
			duration: 0,
			easing: linear,
			css: (t, s) => ''
		};
	}

	// the outgoing page is slower to create sell the illusion of depth
	duration =
		duration ?? (animationDirection === AnimationDirection.up && role === AnimationRole.from)
			? ANIMATION_BASE_SPEED * 1
			: animationDirection === AnimationDirection.up ||
			  (animationDirection === AnimationDirection.down && role === AnimationRole.to)
			? ANIMATION_BASE_SPEED * 2
			: ANIMATION_BASE_SPEED * 4;

	// making the leaving page ease gives the animation a janky feel, so set it to linear
	easing = role === AnimationRole.to ? cubicOut : linear;

	// console.log('mainScreenAnim', role, navigation);
	return {
		delay,
		duration: duration,
		easing,
		css: css(animationDirection, role, style)
	};
}
