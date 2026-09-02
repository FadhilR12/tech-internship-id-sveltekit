<script>
	let { data } = $props();
	import { goto } from '$app/navigation';
	import {
		GraduationCap,
		ChartNoAxesColumnIncreasing,
		BriefcaseBusiness,
		ExternalLink,
		LogOut,
		Eye,
		EyeOff,
		CalendarDays,
		ListFilter,
		Inbox
	} from '@lucide/svelte';
</script>

<header class="border-b border-slate-200 bg-white">
	<nav class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
		<a href="/admin" class="flex items-center gap-2 font-extrabold"
			><span class="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-white">
				<GraduationCap data-lucide="graduation-cap" class="h-4 w-4" aria-hidden="true"
				></GraduationCap>
			</span>TechInternship<span class="-ml-2 text-indigo-600">.ID</span><span
				class="text-xs font-semibold text-slate-400">Admin</span
			></a
		>
		<div class="flex items-center gap-1 text-sm font-bold">
			<a
				href="/admin"
				class="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-indigo-700"
				><ChartNoAxesColumnIncreasing
					data-lucide="chart-no-axes-column-increasing"
					class="h-4 w-4"
					aria-hidden="true"
				></ChartNoAxesColumnIncreasing>Analytics</a
			><a
				href="/admin/vacancies"
				class="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-500 hover:text-slate-900"
				><BriefcaseBusiness data-lucide="briefcase-business" class="h-4 w-4" aria-hidden="true"
				></BriefcaseBusiness>Vacancy</a
			><a
				href="/"
				class="hidden items-center gap-2 rounded-lg px-3 py-2 text-slate-500 hover:text-slate-900 sm:flex"
				><ExternalLink data-lucide="external-link" class="h-4 w-4" aria-hidden="true"
				></ExternalLink>Website</a
			><button data-logout class="flex items-center gap-2 rounded-lg px-3 py-2 text-rose-600"
				><LogOut data-lucide="log-out" class="h-4 w-4" aria-hidden="true"></LogOut>Keluar</button
			>
		</div>
	</nav>
</header>
<main class="mx-auto max-w-6xl px-5 py-9">
	<div>
		<p class="text-xs font-extrabold tracking-[.18em] text-indigo-600 uppercase">Overview</p>
		<h1 class="mt-2 text-3xl font-extrabold">Analytics views</h1>
		<p class="mt-2 text-sm text-slate-500">
			Lihat traction platform dan vacancy yang paling banyak dibuka.
		</p>
	</div>
	<div
		class="mt-7 grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white sm:gap-4 sm:overflow-visible sm:rounded-none sm:border-0 sm:bg-transparent"
	>
		<div
			class="flex min-w-0 flex-col items-center border-r border-slate-200 p-3 text-center sm:rounded-2xl sm:border sm:border-slate-200 sm:bg-white sm:p-5"
		>
			<span
				class="grid h-8 w-8 place-items-center rounded-xl bg-indigo-50 text-indigo-600 sm:h-9 sm:w-9"
				><Eye data-lucide="eye" class="h-4 w-4" aria-hidden="true"></Eye></span
			>
			<p class="mt-3 text-xs font-semibold whitespace-nowrap text-slate-500 sm:mt-4 sm:text-sm">
				<span class="sm:hidden">Hari ini</span><span class="hidden sm:inline">Views hari ini</span>
			</p>
			<p id="today-views" class="mt-1 max-w-full text-2xl font-extrabold tabular-nums sm:text-3xl">
				{data.totalTodayViews}
			</p>
		</div>
		<div
			class="flex min-w-0 flex-col items-center p-3 text-center sm:rounded-2xl sm:border sm:border-slate-200 sm:bg-white sm:p-5"
		>
			<span
				class="grid h-8 w-8 place-items-center rounded-xl bg-lime-100 text-lime-800 sm:h-9 sm:w-9"
				><CalendarDays data-lucide="calendar-days" class="h-4 w-4" aria-hidden="true"
				></CalendarDays></span
			>
			<p class="mt-3 text-xs font-semibold whitespace-nowrap text-slate-500 sm:mt-4 sm:text-sm">
				<span class="sm:hidden">7 hari</span><span class="hidden sm:inline">Views 7 hari</span>
			</p>
			<p
				id="seven-day-views"
				class="mt-1 max-w-full text-2xl font-extrabold tabular-nums sm:text-3xl"
			>
				{data.totalSevenDaysViews}
			</p>
		</div>
	</div>
	<section class="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
		<div class="flex items-center gap-3 border-b border-slate-200 p-5">
			<span class="grid h-9 w-9 place-items-center rounded-xl bg-indigo-50 text-indigo-600"
				><ListFilter data-lucide="list-filter" class="h-4 w-4" aria-hidden="true"
				></ListFilter></span
			>
			<div>
				<h2 class="font-extrabold">Top 7 vacancy</h2>
				<p class="mt-0.5 text-xs text-slate-400">
					Ranking views 7 hari untuk vacancy aktif dan arsip. Klik row untuk melihat detail.
				</p>
			</div>
		</div>
		{#if data.vacancies.length > 0}
			<div class="overflow-x-auto">
				<table class="w-full min-w-[650px] text-left">
					<thead>
						<tr class="border-b border-slate-100 text-xs tracking-wide text-slate-400 uppercase">
							<th class="px-5 py-4">Vacancy</th>
							<th class="px-4 py-4">Status</th>
							<th class="px-4 py-4 text-right">Hari ini</th>
							<th class="px-5 py-4 text-right">7 hari</th>
						</tr>
					</thead>

					<!-- Table body -->
					<tbody id="analytics-table">
						{#each data.vacancies as vacancy}
							{#if vacancy.visibleStatus === 'Hidden'}
								<tr
									onclick={() => goto(`/admin/vacancy/${vacancy.id}`)}
									aria-label="Buka detail {vacancy.title}"
									class="focus-visible:outline-inset cursor-pointer border-b border-slate-100 transition last:border-0 hover:bg-slate-50 focus-visible:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
								>
									<td class="px-5 py-4">
										<div class="flex items-center gap-3">
											<span
												class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-indigo-50 text-xs font-extrabold text-indigo-700"
												>{vacancy.companyInitial}</span
											>
											<div>
												<p class="text-sm font-extrabold">{vacancy.title}</p>
												<p class="mt-1 text-xs text-slate-400">{vacancy.company}</p>
											</div>
										</div>
									</td>
									<td class="px-4 py-4"
										><span
											class="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700"
										>
											<EyeOff class="h-3 w-3" aria-hidden="true"></EyeOff>
											{vacancy.visibleStatus}</span
										></td
									>
									<td class="px-4 py-4 text-right text-sm font-semibold"
										><span class="inline-flex items-center justify-end gap-1.5">
											<Eye class="h-3.5 w-3.5 text-slate-400" aria-hidden="true"></Eye>
											{vacancy.todayViews}</span
										></td
									>
									<td class="px-5 py-4 text-right text-sm font-extrabold text-indigo-600"
										>{vacancy.sevenDaysViews}</td
									>
								</tr>
							{:else}
								<tr
									onclick={() => goto(`/admin/vacancy/${vacancy.id}`)}
									aria-label="Buka detail {vacancy.title}"
									class="focus-visible:outline-inset cursor-pointer border-b border-slate-100 transition last:border-0 hover:bg-slate-50 focus-visible:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
								>
									<td class="px-5 py-4">
										<div class="flex items-center gap-3">
											<span
												class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-indigo-50 text-xs font-extrabold text-indigo-700"
												>{vacancy.companyInitial}</span
											>
											<div>
												<p class="text-sm font-extrabold">{vacancy.title}</p>
												<p class="mt-1 text-xs text-slate-400">{vacancy.company}</p>
											</div>
										</div>
									</td>
									<td class="px-4 py-4"
										><span
											class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700"
										>
											<Eye class="h-3 w-3" aria-hidden="true"></Eye>
											{vacancy.visibleStatus}</span
										></td
									>
									<td class="px-4 py-4 text-right text-sm font-semibold"
										><span class="inline-flex items-center justify-end gap-1.5">
											<Eye class="h-3.5 w-3.5 text-slate-400" aria-hidden="true"></Eye>
											{vacancy.todayViews}</span
										></td
									>
									<td class="px-5 py-4 text-right text-sm font-extrabold text-indigo-600"
										>{vacancy.sevenDaysViews}</td
									>
								</tr>
							{/if}
						{/each}
					</tbody>
				</table>
			</div>
		{:else}
			<div id="analytics-empty" class="py-14 text-center">
				<span
					class="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-500"
				>
					<Inbox data-lucide="inbox" class="h-6 w-6" aria-hidden="true"></Inbox></span
				>
				<p class="mt-4 font-extrabold">Belum ada vacancy dengan views</p>
				<a
					href="/admin/vacancies"
					class="mt-3 inline-flex items-center gap-2 text-sm font-bold text-indigo-600"
				>
					<BriefcaseBusiness data-lucide="briefcase-business" class="h-4 w-4" aria-hidden="true"
					></BriefcaseBusiness>Kelola vacancy</a
				>
			</div>
		{/if}
	</section>
</main>
