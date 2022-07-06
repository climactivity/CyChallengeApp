export const detectLinks = (text: string): string => {
	const regex = /(https?:\/\/[^\s]+)/g;
	return text.replace(regex, (match) => {
		return `<a href="${match}" target="_blank">${match}</a>`;
	});
};
