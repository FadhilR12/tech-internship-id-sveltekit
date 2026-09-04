<script>
	import {
		Sparkles,
		ArrowRight,
		BadgeCheck,
		WalletCards,
		Users,
		MapPin,
		Laptop,
		Rocket,
		Search,
		SearchX,
		RotateCcw,
		Clock3,
		Wifi,
		Building2,
		GraduationCap,
		ArrowDown,
		ArrowUpDown
	} from '@lucide/svelte';
</script>

<header class="border-b border-slate-200 bg-white">
	<nav class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
		<a href="index.html" class="flex items-center gap-2 font-extrabold"
			><span class="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-white"
				><i data-lucide="graduation-cap" class="h-4 w-4" aria-hidden="true"></i></span
			>TechInternship<span class="-ml-2 text-indigo-600">.ID</span><span
				class="text-xs font-semibold text-slate-400">Admin</span
			></a
		>
		<div class="flex items-center gap-1 text-sm font-bold">
			<a href="index.html" class="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-500"
				><i data-lucide="chart-no-axes-column-increasing" class="h-4 w-4" aria-hidden="true"
				></i>Analytics</a
			><a
				href="vacancies.html"
				class="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-indigo-700"
				><i data-lucide="briefcase-business" class="h-4 w-4" aria-hidden="true"></i>Vacancy</a
			><a href="login.html" class="flex items-center gap-2 rounded-lg px-3 py-2 text-rose-600"
				><i data-lucide="log-out" class="h-4 w-4" aria-hidden="true"></i>Keluar</a
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
				href="vacancies.html"
				class="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600"
				><i data-lucide="arrow-left" class="h-4 w-4" aria-hidden="true"></i>Semua vacancy</a
			>
			<div class="mt-4 flex flex-wrap items-center gap-3">
				<h1 class="text-3xl font-extrabold">Frontend Engineer Intern</h1>
				<span
					class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700"
					><i data-lucide="eye" class="h-3 w-3" aria-hidden="true"></i>Shown</span
				>
			</div>
			<p class="mt-2 text-sm font-semibold text-slate-500">Arunika Commerce</p>
		</div>
		<div class="flex flex-wrap gap-2">
			<a
				href="../vacancy-detail.html"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold"
				><i data-lucide="external-link" class="h-4 w-4" aria-hidden="true"></i>Lihat publik</a
			><button
				type="button"
				data-dialog-open="vacancy-modal"
				class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-3.5 py-2.5 text-xs font-bold text-white"
				><i data-lucide="pencil" class="h-4 w-4" aria-hidden="true"></i>Edit</button
			><button
				type="button"
				data-dialog-open="delete-dialog"
				class="inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-bold text-rose-600"
				><i data-lucide="trash-2" class="h-4 w-4" aria-hidden="true"></i>Hapus</button
			>
		</div>
	</div>
	<section class="mt-7 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
		<div class="flex items-center gap-3">
			<span class="grid h-9 w-9 place-items-center rounded-xl bg-indigo-50 text-indigo-600"
				><i data-lucide="file-text" class="h-4 w-4" aria-hidden="true"></i></span
			>
			<h2 class="font-extrabold">Detail vacancy</h2>
		</div>
		<dl class="mt-5 grid gap-5 border-b border-slate-100 pb-6 sm:grid-cols-3">
			<div>
				<dt
					class="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-400 uppercase"
				>
					<i data-lucide="map-pin" class="h-3.5 w-3.5" aria-hidden="true"></i>Location
				</dt>
				<dd class="mt-1 text-sm font-bold">Jakarta Selatan</dd>
			</div>
			<div>
				<dt
					class="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-400 uppercase"
				>
					<i data-lucide="laptop" class="h-3.5 w-3.5" aria-hidden="true"></i>WorkType
				</dt>
				<dd class="mt-1 text-sm font-bold">Hybrid</dd>
			</div>
			<div>
				<dt
					class="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-400 uppercase"
				>
					<i data-lucide="calendar" class="h-3.5 w-3.5" aria-hidden="true"></i>Dibuat
				</dt>
				<dd class="mt-1 text-sm font-bold">11 Agu 2026</dd>
			</div>
		</dl>
		<div class="rich-content mt-6">
			<h2>Tentang role ini</h2>
			<p>
				Arunika Commerce membantu brand lokal mengelola katalog, pesanan, dan promosi dari satu
				dashboard. Kamu akan bergabung dengan tim Product Engineering untuk membangun pengalaman web
				yang cepat dan mudah digunakan oleh ribuan pemilik usaha.
			</p>
			<h2>Yang akan kamu kerjakan</h2>
			<ul>
				<li>Mengembangkan komponen antarmuka reusable berdasarkan design system.</li>
				<li>
					Mengintegrasikan halaman dengan REST API dan menangani loading, error, serta empty state.
				</li>
				<li>Menulis unit test sederhana dan mengikuti code review bersama engineer.</li>
			</ul>
			<h2>Kualifikasi minimum</h2>
			<ul>
				<li>Mahasiswa aktif atau fresh graduate bidang Informatika dan bidang terkait.</li>
				<li>Memahami HTML, CSS, JavaScript, responsive design, dan dasar Git.</li>
				<li>Pernah membuat minimal satu aplikasi web yang dapat didemonstrasikan.</li>
			</ul>
			<h2>Nilai tambah</h2>
			<ul>
				<li>Familiar dengan React, TypeScript, atau testing library.</li>
				<li>Peduli pada accessibility dan detail visual.</li>
			</ul>
			<h2>Yang akan kamu dapatkan</h2>
			<p>
				Mentor engineering, sesi code review mingguan, dan kesempatan mengirim fitur nyata ke
				pengguna secara bertahap.
			</p>
		</div>
		<div class="mt-6 border-t border-slate-100 pt-5">
			<p
				class="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-400 uppercase"
			>
				<i data-lucide="link" class="h-3.5 w-3.5" aria-hidden="true"></i>URL Lamaran
			</p>
			<a
				href="https://example.com/careers/frontend-intern"
				target="_blank"
				rel="noopener noreferrer"
				class="mt-2 inline-flex items-center gap-2 text-sm font-bold break-all text-indigo-600 hover:underline"
				>https://example.com/careers/frontend-intern <i
					data-lucide="external-link"
					class="h-4 w-4 shrink-0"
					aria-hidden="true"
				></i></a
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
					><i data-lucide="eye" class="h-4 w-4" aria-hidden="true"></i></span
				>
				<p
					class="mt-3 text-[11px] font-semibold whitespace-nowrap text-slate-500 sm:mt-4 sm:text-sm"
				>
					Hari ini
				</p>
				<p
					class="mt-1 max-w-full text-[clamp(1rem,5vw,1.25rem)] leading-tight font-extrabold tabular-nums sm:text-3xl"
				>
					6
				</p>
			</div>
			<div
				class="flex min-w-0 flex-col items-center border-r border-slate-200 p-2.5 text-center sm:rounded-2xl sm:border sm:border-slate-200 sm:bg-white sm:p-5"
			>
				<span
					class="grid h-8 w-8 place-items-center rounded-xl bg-lime-100 text-lime-800 sm:h-9 sm:w-9"
					><i data-lucide="calendar-days" class="h-4 w-4" aria-hidden="true"></i></span
				>
				<p
					class="mt-3 text-[11px] font-semibold whitespace-nowrap text-slate-500 sm:mt-4 sm:text-sm"
				>
					<span class="sm:hidden">7 hari</span><span class="hidden sm:inline">7 hari terakhir</span>
				</p>
				<p
					class="mt-1 max-w-full text-[clamp(1rem,5vw,1.25rem)] leading-tight font-extrabold tabular-nums sm:text-3xl"
				>
					21
				</p>
			</div>
			<div
				class="flex min-w-0 flex-col items-center p-2.5 text-center sm:rounded-2xl sm:border sm:border-slate-200 sm:bg-white sm:p-5"
			>
				<span
					class="grid h-8 w-8 place-items-center rounded-xl bg-slate-100 text-slate-600 sm:h-9 sm:w-9"
					><i data-lucide="bar-chart-3" class="h-4 w-4" aria-hidden="true"></i></span
				>
				<p
					class="mt-3 text-[11px] font-semibold whitespace-nowrap text-slate-500 sm:mt-4 sm:text-sm"
				>
					<span class="sm:hidden">Total</span><span class="hidden sm:inline">Total views</span>
				</p>
				<p
					class="mt-1 max-w-full text-[clamp(1rem,5vw,1.25rem)] leading-tight font-extrabold tabular-nums sm:text-3xl"
				>
					105
				</p>
			</div>
		</div>
	</section>
</main>
