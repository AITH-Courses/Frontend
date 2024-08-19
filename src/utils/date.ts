function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    // Сегодня
    if (date.toDateString() === now.toDateString()) {
        return 'сегодня';
    }

    // Вчера
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    if (date.toDateString() === yesterday.toDateString()) {
        return 'вчера';
    }

    // Позавчера
    const beforeYesterday = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    if (date.toDateString() === beforeYesterday.toDateString()) {
        return 'позавчера';
    }

    // На этой неделе
    const weekStart = new Date(now.getTime() - now.getDay() * 24 * 60 * 60 * 1000);
    if (date >= weekStart && date < now) {
        return 'на этой неделе';
    }

    // На прошлой неделе
    const lastWeekStart = new Date(weekStart.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastWeekEnd = new Date(weekStart.getTime() - 1);
    if (date >= lastWeekStart && date <= lastWeekEnd) {
        return 'на прошлой неделе';
    }

    // В этом месяце
    if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()) {
        return 'в этом месяце';
    }

    // В прошлом месяце
    const lastMonth = new Date(now.getTime());
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    if (date.getFullYear() === lastMonth.getFullYear() && date.getMonth() === lastMonth.getMonth()) {
        return 'в прошлом месяце';
    }

    // В этом году
    if (date.getFullYear() === now.getFullYear()) {
        return 'в этом году';
    }

    // В прошлом году
    const lastYear = new Date(now.getTime());
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    if (date.getFullYear() === lastYear.getFullYear()) {
        return 'в прошлом году';
    }

    // Давно
    return 'давно';
}

export {formatDate};