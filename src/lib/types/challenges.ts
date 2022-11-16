import type { ChallengeType } from '$lib/services/challenge-storage';

export type Sector = 'consumption' | 'energy' | 'food' | 'mobility' | 'private' | 'public';

export interface Step {
	name: string;
	reward: any;
}

export interface CompletedStep extends Step {
	completed: boolean;
	completedAt: Date;
}

export interface Challenge {
	title: string;
	slug: string;
	id: string;
	sector: Sector;
	frontMatter: string;
	interval: number; // in days?
	content: string;
	steps: Step[];
	prerequisites: any[];
}

export interface ImageSource {
	url?: string;
	alt?: string;
	file?: {
		path?: string;
		size?: {
			x: number;
			y: number;
		};
	};
	thumb?: {
		path?: string;
	};
}

export interface ChallengeV2 extends Record<string, any> {
	title: string;
	topic: string;
	type?: ChallengeType;
	upgradeText?: string;
	reminderText?: string;
	tags: string[];
	frontMatter: string;
	content: string;
	difficulties: Difficulties;
	slug: string;
	impact: string;
	score: number;
	image?: '' | string | ImageSource;
	Status?: string;
	lead: boolean;
	notificationDays: number[];
}

export interface Difficulties {
	[difficulties: string]: Difficulty;
}

export interface Difficulty {
	upgradeText?: string;
	taskDescription: string;
	todos: Todo[];
	name: string;
}

export interface Todo {
	name: string;
	reward?: any;
}

export interface AcceptedChallenge extends Challenge {
	completedSteps: CompletedStep[];
	accepted: boolean;
	acceptedAt: Date;
	completed: boolean;
	completedAt?: Date;
}

export function isAccepted(
	challenge: Challenge | AcceptedChallenge
): challenge is AcceptedChallenge {
	return (<AcceptedChallenge>challenge).accepted !== undefined;
}
