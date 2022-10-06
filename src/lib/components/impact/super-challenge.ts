export type SuperChallenge = {
	slug: string;
	label: string;
	icon: string;
};

export const superChallenges: SuperChallenge[] = [
	{ label: 'Ernährung', icon: '/icons/super-challenge-ernährung.svg', slug: 'iss_mehr_pflanzen' },
	{ label: 'Strom', icon: '/icons/super-challenge-strom.svg', slug: 'wechsel_zu_oekostrom' },
	{ label: 'Wärme', icon: '/icons/super-challenge-wärme.svg', slug: 'bleib_cool' },
	{
		label: 'Bewusster Konsume',
		icon: '/icons/super-challenge-konsum.svg',
		slug: 'wuensch_dir_was'
	},
	{
		label: 'Mobilität Land',
		icon: '/icons/super-challenge-mobilität.svg',
		slug: 'weniger_allein__mehr_klimaschutz'
	},
	{ label: 'Geld', icon: '/icons/super-challenge-geld.svg', slug: 'bankwechsel' },
	{
		label: 'Reisen & Fliegen',
		icon: '/icons/super-challenge-travel.svg',
		slug: 'bleib_mal_am_boden'
	}
];

export const getSuperChallengeDataForLeadChallenge = (slug) => {
	console.log('getting super challenge:', slug);
	return superChallenges.find((element) => element.slug === slug);
};
