// Mock Data
const stats = {
    sent: { value: 24, trend: '+2', trendIcon: 'trending_up' },
    interviews: { value: 5, trend: '+1', trendIcon: 'trending_up' },
    offers: { value: '12%', trend: '0%', trendIcon: 'remove' }
};
const applications = [
    {
        id: '1', company: 'TechFlow', companyInitials: 'TF', role: 'Senior Product Designer', date: 'Oct 24, 2023', status: 'Entrevista',
        statusClasses: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800', dotColorClass: 'bg-amber-500'
    },
    {
        id: '2', company: 'DataSystems', companyInitials: 'DS', role: 'Frontend Engineer', date: 'Oct 22, 2023', status: 'Aplicado',
        statusClasses: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800', dotColorClass: 'bg-blue-500'
    },
    {
        id: '3', company: 'CloudScale', companyInitials: 'CS', role: 'UX Researcher', date: 'Oct 20, 2023', status: 'Rechazado',
        statusClasses: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800', dotColorClass: 'bg-rose-500'
    },
    {
        id: '4', company: 'AlphaCorp', companyInitials: 'AC', role: 'Full Stack Dev', date: 'Oct 18, 2023', status: 'Oferta',
        statusClasses: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800', dotColorClass: 'bg-emerald-500'
    },
    {
        id: '5', company: 'BetaInc', companyInitials: 'BI', role: 'Product Manager', date: 'Oct 15, 2023', status: 'Aplicado',
        statusClasses: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800', dotColorClass: 'bg-blue-500'
    }
];
document.addEventListener('DOMContentLoaded', () => {
    // Populate stats
    const sentEl = document.getElementById('stat-sent');
    if (sentEl)
        sentEl.textContent = stats.sent.value.toString();
    const sentTrend = document.getElementById('stat-sent-trend');
    if (sentTrend) {
        sentTrend.innerHTML = `<span class="material-symbols-outlined text-[16px] mr-0.5">${stats.sent.trendIcon}</span>${stats.sent.trend}`;
        sentTrend.classList.remove('hidden');
    }
    const intEl = document.getElementById('stat-interviews');
    if (intEl)
        intEl.textContent = stats.interviews.value.toString();
    const intTrend = document.getElementById('stat-interviews-trend');
    if (intTrend) {
        intTrend.innerHTML = `<span class="material-symbols-outlined text-[16px] mr-0.5">${stats.interviews.trendIcon}</span>${stats.interviews.trend}`;
        intTrend.classList.remove('hidden');
    }
    const offEl = document.getElementById('stat-offers');
    if (offEl)
        offEl.textContent = stats.offers.value.toString();
    const offTrend = document.getElementById('stat-offers-trend');
    if (offTrend) {
        offTrend.innerHTML = `<span class="material-symbols-outlined text-[16px] mr-0.5">${stats.offers.trendIcon}</span>${stats.offers.trend}`;
        offTrend.classList.remove('hidden');
    }
    // Populate table
    const tbody = document.getElementById('applications-table-body');
    if (tbody) {
        tbody.innerHTML = applications.map(app => `
            <tr class="group hover:bg-slate-50 dark:hover:bg-surface-hover/50 transition-colors">
                <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-900 dark:text-white font-bold">
                            ${app.companyInitials}
                        </div>
                        <span class="font-medium text-slate-900 dark:text-white">${app.company}</span>
                    </div>
                </td>
                <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">${app.role}</td>
                <td class="px-6 py-4 text-sm text-slate-500 dark:text-text-secondary">${app.date}</td>
                <td class="px-6 py-4">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${app.statusClasses}">
                        <span class="w-1.5 h-1.5 rounded-full ${app.dotColorClass}"></span>
                        ${app.status}
                    </span>
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="estrategiaRes.html" class="inline-flex items-center justify-center text-sm font-semibold text-primary dark:text-blue-400 hover:text-primary-dark dark:hover:text-blue-300 transition-colors">
                        Ver preparación
                        <span class="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
                    </a>
                </td>
            </tr>
        `).join('');
    }
});
export {};
