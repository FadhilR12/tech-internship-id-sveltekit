import { error } from "@sveltejs/kit";

// TODO: sediakan api untuk get vacancy sesuai dengan id

export async function load({ fetch, params }) {
    const [resVacancies, resViews, resTotalViews] = await Promise.all([
        fetch('/api/vacancies'),
        fetch('/api/views'),
        fetch('/api/totalViews')
    ]);

    const vacancies = await resVacancies.json();
    const views = await resViews.json();
    const totalViewsData = await resTotalViews.json();

    const vacancy = vacancies.find(v => String(v.id) === String(params.id));
    if (!vacancy) {
        error(404, "Vacancy not found");
    }

    // Ambil total views untuk vacancy ini
    const tv = totalViewsData.find(item => String(item.vacId) === String(params.id));
    const totalViews = tv ? tv.count : 0;

    // Filter views khusus untuk vacancy ini
    const vacancyViews = views.filter(v => String(v.vacId) === String(params.id));

    // Cari tanggal terbaru untuk referensi "Hari Ini" dari seluruh data views (agar konsisten dengan dashboard admin)
    let todayStr = '';
    if (views.length > 0) {
        const dates = views.map(v => {
            const [d, m, y] = v.createdAt.split('-');
            return new Date(`${y}-${m}-${d}`).getTime();
        });
        const latestDate = new Date(Math.max(...dates));
        const dd = String(latestDate.getDate()).padStart(2, '0');
        const mm = String(latestDate.getMonth() + 1).padStart(2, '0');
        const yyyy = latestDate.getFullYear();
        todayStr = `${dd}-${mm}-${yyyy}`;
    }

    let todayViews = 0;
    let sevenDayViews = 0;

    vacancyViews.forEach(v => {
        // Asumsi di mock data saat ini seluruh view mewakili 7 hari terakhir
        sevenDayViews += v.count;

        if (v.createdAt === todayStr) {
            todayViews += v.count;
        }
    });

    return {
        vacancy,
        totalViews,
        todayViews,
        sevenDayViews
    };
}