export function getRoomLabel(roomCount: number): string {
    if (roomCount === 0) return 'студия';

    const lastDigit = roomCount % 10;
    const lastTwoDigits = roomCount % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return `${roomCount} комнат`;
    }

    if (lastDigit === 1) {
        return `${roomCount} комната`;
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return `${roomCount} комнаты`;
    }

    return `${roomCount} комнат`;
}