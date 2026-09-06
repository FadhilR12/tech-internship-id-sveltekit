<script>
	import { onMount } from 'svelte';
	import {
		GraduationCap,
		ChartNoAxesColumnIncreasing,
		BriefcaseBusiness,
		LogOut,
		ArrowLeft,
		ExternalLink,
		Pencil,
		Trash2,
		FileText,
		MapPin,
		Laptop,
		Calendar,
		Link,
		Eye,
		CalendarDays,
		BarChart3,
		EyeOff
	} from '@lucide/svelte';
	import { passedDays, sanitizeHtml } from '$lib';
	let { data } = $props();
	let safeDescription = $state('');

	console.log(data.vacancy)
	onMount(async () => {
		safeDescription = await sanitizeHtml(data.vacancy.descHtml);
	});
</script>

<header class="border-b border-slate-200 bg-white">
	<nav class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
		<a href="/admin" class="flex items-center gap-2 font-extrabold"
			><span class="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-white"
				><GraduationCap class="h-4 w-4" aria-hidden="true"></GraduationCap></span
			>TechInternship<span class="-ml-2 text-indigo-600">.ID</span><span
				class="text-xs font-semibold text-slate-400">Admin</span
			></a
		>
		<div class="flex items-center gap-1 text-sm font-bold">
			<a href="/admin" class="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-500"
				><ChartNoAxesColumnIncreasing class="h-4 w-4" aria-hidden="true"
				></ChartNoAxesColumnIncreasing>Analytics</a
			><a
				href="/admin/vacancy"
				class="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-indigo-700"
				><BriefcaseBusiness class="h-4 w-4" aria-hidden="true"></BriefcaseBusiness>Vacancy</a
			><a href="login.html" class="flex items-center gap-2 rounded-lg px-3 py-2 text-rose-600"
				><LogOut class="h-4 w-4" aria-hidden="true"></LogOut>Keluar</a
			>
		</div>
	</nav>
</header>
<!-- Go template: render detail, status, action, dan analytics vacancy di dalam main ini. -->
<!-- TODO(JS): Muat data vacancy dan metrics, implementasikan edit, rich-text editor, simpan, konfirmasi hapus/arsip, serta pembaruan status. -->
<main class="mx-auto max-w-6xl px-5 py-9">
	<div class="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
		<div>
			<a
				href="/admin/vacancy"
				class="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600"
				><ArrowLeft class="h-4 w-4" aria-hidden="true"></ArrowLeft>Semua vacancy</a
			>
			<div class="mt-4 flex flex-wrap items-center gap-3">
				<h1 class="text-3xl font-extrabold">{data.vacancy.title}</h1>
				{#if data.vacancy.visibleStatus == 'Shown'}
					<span
						class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700"
						><Eye class="h-3 w-3" aria-hidden="true"></Eye>{data.vacancy.visibleStatus}</span
					>
				{:else}
					<span
						class="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700"
						><EyeOff class="h-3 w-3" aria-hidden="true"></EyeOff>{data.vacancy.visibleStatus}</span
					>
				{/if}
			</div>
			<p class="mt-2 text-sm font-semibold text-slate-500">{data.vacancy.company}</p>
		</div>
		<div class="flex flex-wrap gap-2">
			<a
				href="/vacancy/{data.vacancy.id}"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold"
				><ExternalLink class="h-4 w-4" aria-hidden="true"></ExternalLink>Lihat publik</a
			><button
				type="button"
				data-dialog-open="vacancy-modal"
				class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-3.5 py-2.5 text-xs font-bold text-white"
				><Pencil class="h-4 w-4" aria-hidden="true"></Pencil>Edit</button
			><button
				type="button"
				data-dialog-open="delete-dialog"
				class="inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-bold text-rose-600"
				><Trash2 class="h-4 w-4" aria-hidden="true"></Trash2>Hapus</button
			>
		</div>
	</div>
	<section class="mt-7 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
		<div class="flex items-center gap-3">
			<span class="grid h-9 w-9 place-items-center rounded-xl bg-indigo-50 text-indigo-600"
				><FileText class="h-4 w-4" aria-hidden="true"></FileText></span
			>
			<h2 class="font-extrabold">Detail vacancy</h2>
		</div>
		<dl class="mt-5 grid gap-5 border-b border-slate-100 pb-6 sm:grid-cols-3">
			<div>
				<dt
					class="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-400 uppercase"
				>
					<MapPin class="h-3.5 w-3.5" aria-hidden="true"></MapPin>Location
				</dt>
				<dd class="mt-1 text-sm font-bold">{data.vacancy.location}</dd>
			</div>
			<div>
				<dt
					class="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-400 uppercase"
				>
					<Laptop class="h-3.5 w-3.5" aria-hidden="true"></Laptop>WorkType
				</dt>
				<dd class="mt-1 text-sm font-bold">{data.vacancy.workType}</dd>
			</div>
			<div>
				<dt
					class="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-400 uppercase"
				>
					<Calendar class="h-3.5 w-3.5" aria-hidden="true"></Calendar>Dibuat
				</dt>
				<dd class="mt-1 text-sm font-bold">11 Agu 2026</dd>
			</div>
		</dl>
		<div class="rich-content mt-6">
			{@html safeDescription}
		</div>
		<div class="mt-6 border-t border-slate-100 pt-5">
			<p
				class="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-400 uppercase"
			>
				<Link class="h-3.5 w-3.5" aria-hidden="true"></Link>URL Lamaran
			</p>
			<a
				href="{data.vacancy.applyUrl}"
				target="_blank"
				rel="noopener noreferrer"
				class="mt-2 inline-flex items-center gap-2 text-sm font-bold break-all text-indigo-600 hover:underline"
				>{data.vacancy.applyUrl} <ExternalLink
					class="h-4 w-4 shrink-0"
					aria-hidden="true"
				></ExternalLink></a
			>
		</div>
	</section>
	<section class="mt-7">
		<h2 class="text-2xl font-extrabold">Analytics views</h2>
		<p class="mt-1 text-sm text-slate-500">Jumlah pembukaan halaman detail vacancy ini.</p>
		<div
			class="mt-5 grid grid-cols-3 overflow-hidden rounded-2xl border border-slate-200 bg-white sm:gap-4 sm:overflow-visible sm:rounded-none sm:border-0 sm:bg-transparent"
		>
			<div
				class="flex min-w-0 flex-col items-center border-r border-slate-200 p-2.5 text-center sm:rounded-2xl sm:border sm:border-slate-200 sm:bg-white sm:p-5"
			>
				<span
					class="grid h-8 w-8 place-items-center rounded-xl bg-indigo-50 text-indigo-600 sm:h-9 sm:w-9"
					><Eye class="h-4 w-4" aria-hidden="true"></Eye></span
				>
				<p
					class="mt-3 text-[11px] font-semibold whitespace-nowrap text-slate-500 sm:mt-4 sm:text-sm"
				>
					Hari ini
				</p>
				<p
					class="mt-1 max-w-full text-[clamp(1rem,5vw,1.25rem)] leading-tight font-extrabold tabular-nums sm:text-3xl"
				>
					{data.todayViews}
				</p>
			</div>
			<div
				class="flex min-w-0 flex-col items-center border-r border-slate-200 p-2.5 text-center sm:rounded-2xl sm:border sm:border-slate-200 sm:bg-white sm:p-5"
			>
				<span
					class="grid h-8 w-8 place-items-center rounded-xl bg-lime-100 text-lime-800 sm:h-9 sm:w-9"
					><CalendarDays class="h-4 w-4" aria-hidden="true"></CalendarDays></span
				>
				<p
					class="mt-3 text-[11px] font-semibold whitespace-nowrap text-slate-500 sm:mt-4 sm:text-sm"
				>
					<span class="sm:hidden">7 hari</span><span class="hidden sm:inline">7 hari terakhir</span>
				</p>
				<p
					class="mt-1 max-w-full text-[clamp(1rem,5vw,1.25rem)] leading-tight font-extrabold tabular-nums sm:text-3xl"
				>
					{data.sevenDayViews}
				</p>
			</div>
			<div
				class="flex min-w-0 flex-col items-center p-2.5 text-center sm:rounded-2xl sm:border sm:border-slate-200 sm:bg-white sm:p-5"
			>
				<span
					class="grid h-8 w-8 place-items-center rounded-xl bg-slate-100 text-slate-600 sm:h-9 sm:w-9"
					><BarChart3 class="h-4 w-4" aria-hidden="true"></BarChart3></span
				>
				<p
					class="mt-3 text-[11px] font-semibold whitespace-nowrap text-slate-500 sm:mt-4 sm:text-sm"
				>
					<span class="sm:hidden">Total</span><span class="hidden sm:inline">Total views</span>
				</p>
				<p
					class="mt-1 max-w-full text-[clamp(1rem,5vw,1.25rem)] leading-tight font-extrabold tabular-nums sm:text-3xl"
				>
					{data.totalViews}
				</p>
			</div>
		</div>
	</section>
</main>
