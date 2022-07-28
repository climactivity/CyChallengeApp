import { cubicOut, cubicIn, linear } from 'svelte/easing';

export function slideLeft(node, { delay = 0, duration = 1000, easing = linear } = {}) {
	const style = getComputedStyle(node);
	const opacity = +style.opacity;
	const height = parseFloat(style.height);
	const width = parseFloat(style.width);

	const padding_left = parseFloat(style.paddingLeft);
	const padding_right = parseFloat(style.paddingRight);
	const margin_left = parseFloat(style.marginLeft);
	const margin_right = parseFloat(style.marginRight);
	const border_left_width = parseFloat(style.borderLeftWidth);
	const border_right_width = parseFloat(style.borderRightWidth);

	// const padding_top = parseFloat(style.paddingTop);
	// const padding_bottom = parseFloat(style.paddingBottom);
	// const margin_top = parseFloat(style.marginTop);
	// const margin_bottom = parseFloat(style.marginBottom);
	// const border_top_width = parseFloat(style.borderTopWidth);
	// const border_bottom_width = parseFloat(style.borderBottomWidth);
	return {
		delay,
		duration,
		easing,
		css: (t, s) =>
			'overflow: hidden;' +
			`position: absolute; z-index: 0;  ` +
			`opacity: ${Math.min(t * 20, 1) * opacity};` +
			`transform: translateX( ${-s * width}px);` +
			`width: ${width}px;` +
			`height: ${height}px;` +
			// `padding-left: ${-s * padding_left}px;` +
			// `padding-right: ${-s * padding_right}px;` +
			// `margin-left: ${-s * margin_left}px;` +
			// `margin-right: ${-s * margin_right}px;` +
			// `border-top-left: ${-s * border_left_width}px;` +
			// `border-bottom-right: ${-s * border_right_width}px;` +
			''
	};
}

export function slideOver(node, { delay = 0, duration = 500, easing = cubicOut } = {}) {
	const style = getComputedStyle(node);
	const opacity = +style.opacity;
	const height = parseFloat(style.height);
	const width = parseFloat(style.width);

	const padding_left = parseFloat(style.paddingLeft);
	const padding_right = parseFloat(style.paddingRight);
	const margin_left = parseFloat(style.marginLeft);
	const margin_right = parseFloat(style.marginRight);
	const border_left_width = parseFloat(style.borderLeftWidth);
	const border_right_width = parseFloat(style.borderRightWidth);

	// const padding_top = parseFloat(style.paddingTop);
	// const padding_bottom = parseFloat(style.paddingBottom);
	// const margin_top = parseFloat(style.marginTop);
	// const margin_bottom = parseFloat(style.marginBottom);
	// const border_top_width = parseFloat(style.borderTopWidth);
	// const border_bottom_width = parseFloat(style.borderBottomWidth);
	return {
		delay,
		duration,
		easing,
		css: (t, s) =>
			'overflow: hidden;' +
			`position: absolute; z-index: 10;  ` +
			`opacity: ${Math.min(t * 20, 1) * opacity};` +
			`transform: translateX( ${s * width}px);` +
			`width: ${width}px;` +
			`height: ${height}px;` +
			// `padding-left: ${-s * padding_left}px;` +
			// `padding-right: ${-s * padding_right}px;` +
			// `margin-left: ${-s * margin_left}px;` +
			// `margin-right: ${-s * margin_right}px;` +
			// `border-top-left: ${-s * border_left_width}px;` +
			// `border-bottom-right: ${-s * border_right_width}px;` +
			''
	};
}
