<script lang="ts">
	import {
		Dialog,
		DialogDescription,
		DialogOverlay,
		DialogTitle,
		Transition,
		TransitionChild
	} from '@rgossiaux/svelte-headlessui';

	import { fly, fade } from 'svelte/transition';
	import MedalIcon from './medal-icon.svelte';

	let isOpen = false;
	let state: { error: string; description: string } = null;

	const close = () => {
		isOpen = false;
	};

	export let open = () => {
		isOpen = true;
	};
</script>

<!-- <Transition show={isOpen}>
	<Dialog open={isOpen} on:close={close}>

		<TransitionChild
			enter="ease-out duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="ease-in duration-200"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<DialogOverlay />
		</TransitionChild>

		<TransitionChild
			enter="ease-out duration-300"
			enterFrom="opacity-0 scale-95"
			enterTo="opacity-100 scale-100"
			leave="ease-in duration-200"
			leaveFrom="opacity-100 scale-100"
			leaveTo="opacity-0 scale-95"
		>
			<div
				class="absolute left-8 right-8 bottom-0 h-60 bg-white rounded-lg p-4 space-y-4 shadow-xl z-[9000]"
			>
				<DialogTitle class="text-xl font-bold">
					<div class="flex flex-row place-content-between">TITLE</div>
				</DialogTitle>
				<DialogDescription>CONTENT</DialogDescription>
			</div>
		</TransitionChild>
	</Dialog>
</Transition> -->
{#if isOpen}
	<Dialog open={isOpen} on:close={close} static>
		<DialogOverlay
			style={'position: absolute; inset: 0; background-color: rgb(0 0 0); opacity: 0.3; z-index: 8999'}
		/>
		<div transition:fly={{ y: 400 }} class="z-[9000]">
			<div
				class="absolute left-4 right-4 bottom-0  max-h-[90vh] bg-white rounded-t-lg p-4 space-y-4 shadow-xl z-[9000] overflow-scroll"
			>
				<DialogTitle
					class="text-xl font-bold sticky top-[-1rem] border-b-2 bg-white left-0 right-0 h-14"
				>
					<div class="flex flex-row place-content-between pt-4">Über Challenges</div>
				</DialogTitle>
				<DialogDescription>
					<div class="overflow-scroll">
						<div class="test ">
							<p class="mb-4">
								Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore aliquid, quam sunt
								est obcaecati similique eius consequuntur, nihil ipsam eos deserunt amet sint
								perspiciatis eveniet odio laborum! Accusantium, velit totam!
							</p>

							<h2 class=" font-bold text-md ml-12 ">Super Challenges</h2>
							<div class="grid grid-flow-col" style="grid-template-columns: 3rem 1fr; ">
								<svg
									aria-hidden
									style="margin-top: 0.75rem"
									width={40}
									height={40}
									viewBox="0 0 40 40"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M15.1265 17.2448C15.1998 17.4655 15.1826 17.7064 15.0786 17.9144C14.9746 18.1224 14.7923 18.2807 14.5717 18.3544C14.3021 18.4396 14.0521 18.5774 13.8361 18.7597C13.62 18.9419 13.4422 19.1652 13.3129 19.4166C12.9881 20.0293 12.7651 21.037 12.9705 22.6821C12.9922 22.9095 12.9243 23.1365 12.7813 23.3147C12.6383 23.4929 12.4314 23.6083 12.2047 23.6364C11.9779 23.6645 11.7491 23.6031 11.5669 23.4653C11.3847 23.3274 11.2635 23.1239 11.2289 22.898C10.9954 21.0318 11.2114 19.6255 11.7644 18.5914C12.3262 17.538 13.1812 16.9674 14.0169 16.6901C14.2376 16.6167 14.4784 16.6339 14.6865 16.7379C14.8945 16.8419 15.0527 17.0242 15.1265 17.2448ZM23.7888 7.82056C24.0013 7.74064 24.1746 7.58148 24.2722 7.37652C24.3699 7.17155 24.3844 6.93672 24.3126 6.72132C24.2408 6.50593 24.0883 6.32673 23.8872 6.22136C23.6861 6.11599 23.452 6.09264 23.234 6.15621C21.5872 6.70397 20.5602 8.05581 19.958 9.50422C19.8763 9.69998 19.8013 9.89848 19.7333 10.0994C19.4049 9.47648 18.9847 8.90654 18.4867 8.4087C17.8119 7.73243 17.0059 7.20135 16.1183 6.84811C15.2306 6.49486 14.2801 6.32691 13.3252 6.3546C12.8361 6.36787 12.3707 6.56796 12.0246 6.91375C11.6784 7.25954 11.4779 7.72476 11.4642 8.21382C11.4365 9.1816 11.6097 10.1446 11.973 11.0421C12.3362 11.9395 12.8815 12.752 13.5745 13.4281C12.0997 13.7475 10.767 14.5333 9.77353 15.669C8.78006 16.8048 8.17863 18.2302 8.05824 19.7343L8.04771 19.8643C7.81593 22.7561 8.43213 25.6529 9.82091 28.2L10.4512 29.3552C10.4687 29.3851 10.4863 29.4149 10.5074 29.443L12.263 31.9044C12.6609 32.4617 13.1754 32.9256 13.7708 33.2638C14.3662 33.602 15.0281 33.8065 15.7105 33.863C16.3929 33.9195 17.0794 33.8266 17.7223 33.5908C18.3651 33.3551 18.9489 32.9821 19.433 32.4978C19.5074 32.4235 19.5957 32.3645 19.6928 32.3242C19.79 32.284 19.8941 32.2633 19.9992 32.2633C20.1044 32.2633 20.2085 32.284 20.3057 32.3242C20.4028 32.3645 20.4911 32.4235 20.5654 32.4978C21.0495 32.9821 21.6333 33.3551 22.2762 33.5908C22.9191 33.8266 23.6056 33.9195 24.288 33.863C24.9704 33.8065 25.6323 33.602 26.2277 33.2638C26.823 32.9256 27.3376 32.4617 27.7355 31.9044L29.4911 29.4448C29.5122 29.4161 29.5315 29.3862 29.549 29.3552L30.1776 28.2C31.5669 25.6531 32.1838 22.7563 31.9525 19.8643L31.942 19.7343C31.8643 18.765 31.5861 17.8224 31.125 16.9662C30.664 16.11 30.0302 15.3589 29.2637 14.7604C28.4972 14.162 27.6148 13.7292 26.6724 13.4896C25.73 13.25 24.748 13.2087 23.7888 13.3684L20.8779 13.8529C20.8955 12.6573 21.1062 11.3125 21.5767 10.1784C22.07 8.99332 22.8004 8.15062 23.7888 7.82056ZM17.7494 13.6247L17.479 13.5791C16.4487 13.3798 15.5019 12.8759 14.7613 12.1324C14.2537 11.6265 13.8551 11.0221 13.59 10.3563C13.3249 9.69053 13.1989 8.97753 13.2198 8.26122C13.2203 8.22055 13.2368 8.1817 13.2657 8.15311C13.2946 8.12451 13.3337 8.10848 13.3743 8.10848C14.0903 8.08781 14.803 8.21391 15.4685 8.47901C16.1339 8.7441 16.7381 9.14259 17.2438 9.64993C18.3094 10.7156 18.8238 12.1219 18.7852 13.5211C18.7848 13.5615 18.7685 13.6001 18.74 13.6286C18.7114 13.6572 18.6728 13.6734 18.6325 13.6739C18.3372 13.6821 18.0419 13.6657 17.7494 13.6247ZM17.1735 15.3084L17.479 15.3593L18.8449 15.5875C19.6098 15.7151 20.3905 15.7151 21.1553 15.5875L24.0767 15.0994C24.7963 14.9794 25.533 15.0102 26.2401 15.1899C26.9472 15.3695 27.6093 15.6941 28.1844 16.1431C28.7594 16.592 29.2349 17.1555 29.5808 17.7979C29.9266 18.4403 30.1352 19.1475 30.1934 19.8748L30.2021 20.0047C30.4064 22.5569 29.8622 25.1132 28.6361 27.3608L28.0322 28.4669L26.3064 30.8827C26.0568 31.2325 25.734 31.5237 25.3604 31.7361C24.9868 31.9486 24.5715 32.077 24.1432 32.1126C23.7149 32.1482 23.2841 32.0901 22.8806 31.9422C22.477 31.7944 22.1106 31.5604 21.8067 31.2566C21.3273 30.7773 20.6771 30.508 19.9992 30.508C19.3213 30.508 18.6712 30.7773 18.1918 31.2566C17.8879 31.5604 17.5214 31.7944 17.1179 31.9422C16.7144 32.0901 16.2835 32.1482 15.8553 32.1126C15.427 32.077 15.0116 31.9486 14.6381 31.7361C14.2645 31.5237 13.9417 31.2325 13.6921 30.8827L11.9663 28.4669L11.3624 27.3608C10.1363 25.1132 9.59206 22.5569 9.79633 20.0047L9.80686 19.8748C9.86501 19.1475 10.0736 18.4403 10.4194 17.7979C10.7653 17.1555 11.2408 16.592 11.8159 16.1431C12.3909 15.6941 13.053 15.3695 13.7601 15.1899C14.4672 15.0102 15.2039 14.9794 15.9235 15.0994L17.1735 15.3084Z"
										fill="currentcolor"
										fill-opacity="1"
									/>
									<rect
										x="1"
										y="1"
										width="38"
										height="38"
										rx="19"
										stroke="currentColor"
										stroke-opacity="1"
										stroke-width="2"
										fill-opacity="1"
									/>
								</svg>

								<p class="border-t border-gray-700 mb-4">
									Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore aliquid, quam
									sunt est obcaecati similique eius consequuntur, nihil ipsam eos deserunt amet sint
									perspiciatis eveniet odio laborum! Accusantium, velit totam!
								</p>
							</div>
						</div>

						<div class="test ">
							<h2 class=" font-bold text-md ml-12 ">Medallien</h2>
							<div class="grid grid-flow-col" style="grid-template-columns: 3rem 1fr; ">
								<MedalIcon />

								<p class="border-t border-gray-700 mb-4">
									Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore aliquid, quam
									sunt est obcaecati similique eius consequuntur, nihil ipsam eos deserunt amet sint
									perspiciatis eveniet odio laborum! Accusantium, velit totam!
								</p>
							</div>
						</div>

						<div class="test ">
							<h2 class=" font-bold text-md ml-12 ">Zeitaufwand</h2>
							<div class="grid grid-flow-col" style="grid-template-columns: 3rem 1fr; ">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="-0 -2 30 30"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-12 h-12"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
									/>
								</svg>

								<p class="border-t border-gray-700 mb-4">
									Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore aliquid, quam
									sunt est obcaecati similique eius consequuntur, nihil ipsam eos deserunt amet sint
									perspiciatis eveniet odio laborum! Accusantium, velit totam!
								</p>
							</div>
						</div>

						<div class="test ">
							<h2 class=" font-bold text-md ml-12 ">Schwierigkeit</h2>
							<div class="grid grid-flow-col" style="grid-template-columns: 3rem 1fr; ">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 -1 15 17"
									stroke-width=".7"
									stroke="currentColor"
									class="w-12 h-12"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										fill="currentColor"
										stroke="currentColor"
										d="M 1 8 l 0 -3 c 0 -1 0 -1 1 -1 c 1 0 1 0 1 1 l 0 3 c 0 1 0 1 -1 1 c -1 0 -1 0 -1 -1 Z"
									/>

									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke="currentColor"
										d="M 4 8 l 0 -5 c 0 -1 0 -1 1 -1 c 1 0 1 0 1 1 l 0 5 c 0 1 0 1 -1 1 c -1 0 -1 0 -1 -1 Z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke="currentColor"
										d="M 7 8 l 0 -7 c 0 -1 0 -1 1 -1 c 1 0 1 0 1 1 l 0 7 c 0 1 0 1 -1 1 c -1 0 -1 0 -1 -1 Z"
									/>
									<!-- <rect
										x="-2"
										y="-2"
										width="14"
										height="14"
										rx="7"
										stroke="currentColor"
										stroke-opacity="1"
										stroke-width="0.7"
										fill-opacity="1"
									/> -->
								</svg>

								<p class="border-t border-gray-700 mb-4">
									Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore aliquid, quam
									sunt est obcaecati similique eius consequuntur, nihil ipsam eos deserunt amet sint
									perspiciatis eveniet odio laborum! Accusantium, velit totam!
								</p>
							</div>
						</div>
					</div>
				</DialogDescription>
			</div>
		</div>
	</Dialog>
{/if}
