export function beautifyDate(dateInput: Date): string {
    const date = new Date(dateInput);
    const now = new Date();
    const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
        month: 'short',
        day: 'numeric',
        year: now.getFullYear() === date.getFullYear() ? undefined : 'numeric',
    });
    return dateFormatter.format(date).replace('.', '');
}

export function getDaysWord(days: number): string {
    if (days % 10 === 1 && days % 100 !== 11) {
        return `${days} день`;
    } else if (days % 10 >= 2 && days % 10 <= 4 && (days % 100 < 10 || days % 100 >= 20)) {
        return `${days} дня`;
    } else {
        return `${days} дней`;
    }
}

export function calculateDaysBetweenDates(startDate: Date, endDate: Date): string {
    const oneDay = 24 * 60 * 60 * 1000; // Количество миллисекунд в одном дне
    const differenceInTime = endDate.getTime() - startDate.getTime();
    const days =  Math.round(differenceInTime / oneDay);
    return `${days} ${getDaysWord(days)}`
}

export function formatNights(nights: number): string {
    const lastDigit = nights % 10;
    const lastTwoDigits = nights % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
        return `${nights} ночь`;
    } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
        return `${nights} ночи`;
    } else {
        return `${nights} ночей`;
    }
}