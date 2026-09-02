<script>
	import './layout.css';
	import { GraduationCap, ArrowDown } from '@lucide/svelte';
	const { children } = $props();
</script>

<header class="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
	<nav
		class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"
		aria-label="Navigasi utama"
	>
		<a href="/" class="flex items-center gap-2.5 font-extrabold">
			<span class="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white shadow-sm">
				<GraduationCap class="h-5 w-5" aria-hidden="true" />
			</span>

			<span>
				TechInternship<span class="text-indigo-600">.ID</span>
			</span>
		</a>

		<a
			href="#vacancies"
			class="group flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600"
		>
			Cari internship

			<ArrowDown class="h-4 w-4 transition group-hover:translate-y-0.5" aria-hidden="true" />
		</a>
	</nav>
</header>

{@render children()}
