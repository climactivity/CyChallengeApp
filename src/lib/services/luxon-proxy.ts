import { DateTime } from 'luxon';

// this looks completely useless but it's needed to trick svelte into running local() on mount without using the onMount callback everywhere
const LocalDateTime = DateTime.local();

export { LocalDateTime };
