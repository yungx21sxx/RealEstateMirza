import type { BookingCreateDTO } from '#shared/types/booking.types'
import { getYearWord } from '#shared/utils/booking.utils'
import { beautifyDate, formatNights } from '~/common/utils/dates.utils'

export default () => {
  function formatBookingMessage(bookingData: BookingCreateDTO, listingLink: string) {
    const messageParts = [
      `Новое бронирование:`,
      `**Дата заезда:** ${beautifyDate(bookingData.checkIn)}`,
      `**Дата выезда:** ${beautifyDate(bookingData.checkOut)}`,
      `Цена за ${formatNights(bookingData.daysCount)}: ${bookingData.totalPrice.toLocaleString()} ₽`,
      `Имя: ${bookingData.userName}`,
      `Телефон: ${bookingData.userPhone}`,
      `Способ связи: ${bookingData.communication}`,
      `Взрослые: ${bookingData.adults}`,
      `Дети: ${bookingData.childrenCount}`,
      `Возраст детей: ${bookingData.childrenAges.map(i => `${i} ${getYearWord(i)}`).join(', ')}`,
      `Комментарий: ${bookingData.comment ?? 'Нет'}`,
      `Ссылка на объект: ${listingLink}  `
    ]

    return messageParts.filter(part => part !== '').join('\n')
  }

  const sendSubmit = (text: string) => $fetch('/api/send-submit', {
    method: 'POST',
    body: { text },
    retry: 0
  })

  const sendBookingInfo = async (bookingData: BookingCreateDTO, listingLink: string) => {
    const text = formatBookingMessage(bookingData, listingLink)
    return sendSubmit(text)
  }

  const fetchForCallData = async (phone: string, name: string, question: string | undefined) => {
    const text = `Клиент оставил заявку на звонок:\n👶Имя: ${name}\n📱Номер телефона: ${phone}\nВопрос: ${question || 'Нет'}`
    return sendSubmit(text)
  }

  return {
    sendBookingInfo,
    fetchForCallData
  }
}
