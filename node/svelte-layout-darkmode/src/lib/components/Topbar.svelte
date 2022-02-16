<script>	
	import { Icon, Code, Search, User } from 'svelte-hero-icons';
</script>

<div class="my-auto flex flex-row justify-between items-center">

	<div class="flex items-center">
		<Icon solid src={Code} class="h-8 w-8 mr-8 dark:text-blue-400 dark:hover:text-blue-300 text-blue-500 hover:text-blue-600 cursor-pointer " />

		<div class="flex align-baseline p-1 border rounded-md dark:hover:text-white dark:hover:border-white border-gray-400">
			<Icon solid src={Search} class="h-6  w-6 mr-2  text-gray-400 dark:text-white" />
			<input class="outline-none dark:bg-transparent " placeholder="search" />
		</div>		

	</div>
	<Icon solid src={User} class="w-6 h-6 text-gray-400 dark:hover:text-white cursor-pointer hover:text-gray-800" />
</div>
