// Reexport your entry components here
// src/lib/index.js

export function plainText(html) {
    if (!html) return '';

    return html
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}    

export function excerpt(text, max = 140) {
    if (!text) return '';

    if (text.length <= max) {
        return text;
    }

    return text.slice(0, max) + '...';
}

export function passedDays(timestamp) {
    const pastTime = new Date(timestamp * 1000);
    const now = new Date();
    const daysPassed = Math.floor((now - pastTime) / (1000 * 60 * 60 * 24));

    if (daysPassed === 0) {
        return 'Hari ini';
    }

    return `${daysPassed} hari lalu`;
}

export function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    });
}