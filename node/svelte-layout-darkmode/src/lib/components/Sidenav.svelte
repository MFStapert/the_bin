{#each [0, 1, 2] as j}
<nav  class="my-4">
	<span class="px-6 font-semibold text-md">Nav {j}</span>
	<ul class="flex flex-col ">	
		{#each [0, 1, 2] as i}
			<li>
				<a class="side-nav-item active:font-normal  dark:hover:bg-neutral-800 hover:bg-gray-100 font-light dark:font-normal" href="#!">Sidenav link 1</a>
			</li>
		{/each}	
	</ul>
</nav>
{/each}

<style>
	.side-nav-item {
		@apply
				
		flex items-center
		text-sm py-3 px-8 rounded
		transition duration-300 ease-in-out;
	}
</style>
