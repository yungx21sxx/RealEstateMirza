import type {LocationQuery} from "vue-router";
import type {BookingFiltersDTO} from "#shared/types/dto.types";

// import parsePhoneNumber from 'libphonenumber-js'

export function parseQueryToBookingFilters(query: LocationQuery): BookingFiltersDTO {
    return {
        adults: Number(query.adults) || 2,
        childrenCount: Number(query.childrenCount) || 0,
        checkIn: query.checkIn ? new Date(Date.parse(query.checkIn as string)) : null,
        checkOut: query.checkOut ? new Date(Date.parse(query.checkOut as string)) : null,
        childrenAges: Array.isArray(query.childrenAges)
            ? query.childrenAges.map(child => Number(child)).filter(child => !isNaN(child))
            : []
    };
}

export const describeGroup = (adults: number, childrens: number) => {
    function pluralize(n: number, forms: [string, string, string]): string {
        if (n % 10 === 1 && n % 100 !== 11) {
            return forms[0];
        } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
            return forms[1];
        } else {
            return forms[2];
        }
    }

    const adultsStr = `${adults} ${pluralize(adults, ['взрослый', 'взрослых', 'взрослых'])}`;
    const childrenStr = childrens > 0 ? `, ${childrens} ${pluralize(childrens, ['ребенок', 'ребенка', 'детей'])}` : '';

    return `${adultsStr}${childrenStr}`;
}

export function getYearWord(age: number): string {
    if (age > 10 && age < 20) return "лет"; // Для чисел от 11 до 19 всегда "лет"
    const lastDigit = age % 10;
    if (lastDigit === 1) return "год";
    if (lastDigit >= 2 && lastDigit <= 4) return "года";
    return "лет";
}

export const parsePhone = async (phone: string): Promise<null | string> => {
    try {
        const {default: parsePhoneNumber} = await import('libphonenumber-js');
        const parseResult = parsePhoneNumber(phone, "RU");
        return parseResult ? parseResult.formatNational() : null;
    } catch (e) {
        console.log(e)
        return null;
    }
}