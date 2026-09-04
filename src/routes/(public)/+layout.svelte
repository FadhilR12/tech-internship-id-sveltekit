<script>
	const { children } = $props();
</script>

<div class="flex min-h-screen flex-col bg-slate-50 text-slate-900">
	{@render children()}

	<footer class="border-t border-slate-200 bg-white px-5 py-7 text-center text-sm text-slate-500">
		TechInternship.ID · Internship tech Indonesia
	</footer>
</div>
