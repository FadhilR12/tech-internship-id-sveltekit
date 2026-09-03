<script>
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col bg-slate-50 text-slate-900">
	{@render children()}
</div>
