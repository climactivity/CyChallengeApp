export const detectLinks = (text: string): string => {
	const regex = /(https?:\/\/[^\s]+)/g;
	return text.replace(regex, (match) => {
		return `<a href="${match}" target="_blank">${match}</a>`;
	});
};

export const randomIntBetween = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const mapToRange = (
	value: number,
	min: number,
	max: number,
	outMin: number,
	outMax: number
): number => {
	return ((value - min) * (outMax - outMin)) / (max - min) + outMin;
};
