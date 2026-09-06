export async function load({ fetch }) {
    const [resVacancies, resViews] = await Promise.all([
        fetch('/api/vacancies'),
        fetch('/api/views')
    ]);
    const vacancies = await resVacancies.json();
    const views = await resViews.json();

    // Cari tanggal terbaru untuk referensi "Hari Ini"
    const dates = views.map(v => {
        const [d, m, y] = v.createdAt.split('-');
        return new Date(`${y}-${m}-${d}`).getTime();
    });
    const latestDate = new Date(Math.max(...dates));
    
    const dd = String(latestDate.getDate()).padStart(2, '0');
    const mm = String(latestDate.getMonth() + 1).padStart(2, '0');
    const yyyy = latestDate.getFullYear();
    const todayStr = `${dd}-${mm}-${yyyy}`;

    let todayTotalViews = 0;
    let sevenDayTotalViews = 0;
    
    const viewsPerVac = {};

    // Agregasi data views
    views.forEach(v => {
        if (!viewsPerVac[v.vacId]) {
            viewsPerVac[v.vacId] = { today: 0, sevenDays: 0 };
        }
        
        // Asumsi di mock data saat ini seluruh view mewakili 7 hari terakhir
        // Kalau datanya lebih banyak dari 7 hari, butuh logic filtering tambahan
        viewsPerVac[v.vacId].sevenDays += v.count;
        sevenDayTotalViews += v.count;

        if (v.createdAt === todayStr) {
            viewsPerVac[v.vacId].today += v.count;
            todayTotalViews += v.count;
        }
    });

    // Gabungkan (join) views dengan data vacancy, lalu filter isDeleted
    const enrichedVacancies = vacancies
        .filter(vac => !vac.isDeleted)
        .map(vac => {
            return {
                ...vac,
                todayViews: viewsPerVac[vac.id]?.today || 0,
                sevenDayViews: viewsPerVac[vac.id]?.sevenDays || 0
            };
        });

    // Urutkan berdasarkan 7-day views (descending) & ambil top 7
    const topVacancies = enrichedVacancies
        .sort((a, b) => b.sevenDayViews - a.sevenDayViews)
        .slice(0, 7);

    return {
        overview: {
            todayTotalViews,
            sevenDayTotalViews
        },
        topVacancies
    };
}
