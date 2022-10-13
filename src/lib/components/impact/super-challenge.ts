import { pb } from '$lib/pb-client';
import type { ChallengeAccept, ChallengeInteraction } from '$lib/services/challenge-storage';

export type SuperChallenge = {
	slug: string;
	label: string;
	icon_path: string;
	frontPage: boolean;
	[key: string]: any; // allow for pb meta data
};

const _superChallenges: Promise<SuperChallenge[]> = Promise.resolve([
	{
		label: 'Ernährung',
		icon_path: '/icons/super-challenge-ernährung.svg',
		slug: 'iss_mehr_pflanzen',
		frontPage: true
	},
	{
		label: 'Ernährung',
		icon_path: '/icons/super-challenge-ernährung.svg',
		slug: 'lecker_satt_werden_mit_weniger_fleisch',
		frontPage: false
	},
	{
		label: 'Strom',
		icon_path: '/icons/super-challenge-strom.svg',
		slug: 'wechsel_zu_oekostrom',
		frontPage: true
	},
	{
		label: 'Wärme',
		icon_path: '/icons/super-challenge-wärme.svg',
		slug: 'bleib_cool',
		frontPage: true
	},
	{
		label: 'Bewusster Konsum',
		icon_path: '/icons/super-challenge-konsum.svg',
		slug: 'wuensch_dir_was',
		frontPage: true
	},
	{
		label: 'Mobilität Land',
		icon_path: '/icons/super-challenge-mobilität.svg',
		slug: 'weniger_allein__mehr_klimaschutz',
		frontPage: true
	},
	{
		label: 'Geld',
		icon_path: '/icons/super-challenge-geld.svg',
		slug: 'bankwechsel',
		frontPage: true
	},
	{
		label: 'Reisen & Fliegen',
		icon_path: '/icons/super-challenge-travel.svg',
		slug: 'bleib_mal_am_boden',
		frontPage: true
	}
]);

export const superChallenges: Promise<SuperChallenge[]> = pb.records
	.getList('super_challenges', 0, 100, { sort: 'index' })
	.then((superChallengesPage) =>
		superChallengesPage.items.map(
			(superChallengeRecord) => (superChallengeRecord as unknown) as SuperChallenge
		)
	)
	.catch((e) => {
		console.error('PocketBase failed to fetch super challenges:', e);
		return _superChallenges;
	});

export const getSuperChallengeDataForLeadChallenge = async (slug) => {
	// console.log('getting super challenge:', slug);
	return (await superChallenges).find((element) => element.slug === slug);
};

export const getSuperChallengeCssClassForInteracion = (interaction: ChallengeInteraction) => {
	if (!interaction) {
		return 'not-accepted';
	} else {
		// console.log('fetched interaction', value);

		if (interaction.type === 'accept') {
			console.log(interaction);
			if ((interaction as ChallengeAccept).completions?.length > 5) return 'complete';
		}

		return interaction.type;
	}
};
