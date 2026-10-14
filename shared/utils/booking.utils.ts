import type { BookingFiltersDTO } from '#shared/types/dto.types'

type QueryValue = string | number | boolean | null | undefined | QueryValue[]
type LocationQuery = Record<string, QueryValue>

export function parseQueryToBookingFilters(query: LocationQuery): BookingFiltersDTO {
  console.log(query)
  return {
    adults: Number(query.adults) || 2,
    childrenCount: Number(query.childrenCount) || 0,
    checkIn: query.checkIn ? new Date(Date.parse(query.checkIn as string)) : null,
    checkOut: query.checkOut ? new Date(Date.parse(query.checkOut as string)) : null,
    childrenAges: Array.isArray(query.childrenAges)
      ? query.childrenAges.map((child) => Number(child)).filter((child) => !isNaN(child))
      : typeof query.childrenAges === 'string'
        ? [Number(query.childrenAges)]
        : []
  }
}

export function describeGroup(adults: number, childrens: number) {
  function pluralize(n: number, forms: [string, string, string]): string {
    if (n % 10 === 1 && n % 100 !== 11) {
      return forms[0]
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
      return forms[1]
    } else {
      return forms[2]
    }
  }

  const adultsStr = `${adults} ${pluralize(adults, ['взрослый', 'взрослых', 'взрослых'])}`
  const childrenStr
    = childrens > 0 ? `, ${childrens} ${pluralize(childrens, ['ребенок', 'ребенка', 'детей'])}` : ''

  return `${adultsStr}${childrenStr}`
}

export function getYearWord(age: number): string {
  if (age > 10 && age < 20)
    return 'лет' // Для чисел от 11 до 19 всегда "лет"
  const lastDigit = age % 10
  if (lastDigit === 1)
    return 'год'
  if (lastDigit >= 2 && lastDigit <= 4)
    return 'года'
  return 'лет'
}

export async function parsePhone(phone: string): Promise<null | string> {
  try {
    const digits = phone.replace(/\D/g, '')
    const normalizedPhone = digits.startsWith('8')
      ? `7${digits.slice(1)}`
      : digits.startsWith('7')
        ? digits
        : digits.length === 10
          ? `7${digits}`
          : digits

    if (normalizedPhone.length !== 11 || !normalizedPhone.startsWith('7')) {
      return null
    }

    const nationalNumber = normalizedPhone.slice(1)
    return `+7 (${nationalNumber.slice(0, 3)}) ${nationalNumber.slice(3, 6)}-${nationalNumber.slice(6, 8)}-${nationalNumber.slice(8, 10)}`
  } catch (e) {
    console.log(e)
    return null
  }
}
