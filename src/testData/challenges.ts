import type { Challenge, ChallengeV2 } from '$lib/types/challenges';

import * as available_challenges from './available_challenges.json';

export const challenges: Challenge[] = [
	{
		slug: 'v-day',
		id: '1',
		sector: 'food',
		prerequisites: [],
		title: 'Mache einen veganen Tag',
		interval: 14,
		frontMatter: `Wusstest du, dass du mit der Umstellung 
        auf eine pflanzlichere Ernährung ca. 35 % CO2 einsparen kannst?
        
        Definitiv ein Grund einen veganen Tag in der Woche auszuprobieren.`,
		content: `Klimaschutz und intensive Massentierhaltung sind unvereinbar. Ein betrieblicher oder regionaler Nährstoffkreislauf im landwirtschaftlichen Betrieb lässt sich nicht realisieren. Futtermittelimporte, die in vielen Fällen den Rodungsdruck auf den Regenwald erhöhen, sind unausweichlich. Die hohe Konzentration von Tieren führt zu einem Überangebot an Gülle mit der Folge, dass sie auf dem eigenen Betrieb weder bedarfsgerecht noch umweltverträglich verwertet werden kann.`,
		steps: [
			{ name: 'Vegane Rezepte suchen', reward: undefined },
			{ name: 'Einkaufen gehen', reward: undefined },
			{ name: 'Zubereiten & Ausprobieren', reward: undefined },
			{ name: 'Einen Tag keine tierischen Lebensmittel essen', reward: undefined }
		]
	}
];

const flattenChallenges = (challenges: { [key: string]: any[] }): any[] => {
	return Object.values(challenges).flatMap((challenge) => challenge);
};

export const availableChallenges: any[] = flattenChallenges(available_challenges.challenges);

export const availableTags: { [key: string]: string } = available_challenges.topics;
export const availableTopics: { [key: string]: string } = available_challenges.tags;
export const availableChallengesByTopic = available_challenges.challenges;
//export const availableChallenges: ChallengeV2[] =
