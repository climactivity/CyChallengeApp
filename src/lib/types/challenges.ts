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
