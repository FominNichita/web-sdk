<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'EXCEPTIONS/Popups',
	});
</script>

<script lang="ts">
	import {
		StoryGameTemplate,
		StoryLocale,
		templateArgs,
		type TemplateArgs,
	} from 'components-storybook';
	import { stateModal } from 'state-shared';

	import { setContext } from '../game/context';
	import ExceptionStoryGame from './ExceptionStoryGame.svelte';

	type PopupStoryData =
		| {
				name: 'autoSpinMessage';
				message: 'insufficientFunds' | 'lossLimitReached' | 'singleWinLimitReached';
		  }
		| {
				name: 'error';
				error: unknown;
		  };

	setContext();
</script>

{#snippet template(args: TemplateArgs<PopupStoryData>)}
	<StoryGameTemplate
		skipLoadingScreen={args.skipLoadingScreen}
		action={async () => {
			if (!args.data) return;
			stateModal.modal =
				args.data.name === 'error'
					? { name: 'error', error: args.data.error }
					: { name: 'autoSpinMessage', message: args.data.message };
		}}
	>
		<StoryLocale lang="en">
			<ExceptionStoryGame />
		</StoryLocale>
	</StoryGameTemplate>
{/snippet}

<Story
	name="Insufficient Funds"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {
			name: 'autoSpinMessage',
			message: 'insufficientFunds',
		},
	})}
	{template}
/>

<Story
	name="Loss Limit Reached"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {
			name: 'autoSpinMessage',
			message: 'lossLimitReached',
		},
	})}
	{template}
/>

<Story
	name="Single Win Limit Reached"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {
			name: 'autoSpinMessage',
			message: 'singleWinLimitReached',
		},
	})}
	{template}
/>

<Story
	name="Generic Request Error"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {
			name: 'error',
			error: {
				error: 'BET_REQUEST_FAILED',
				message: 'The RGS request failed or returned an invalid round state.',
			},
		},
	})}
	{template}
/>
