

import type {BookingCreateDTO} from "#shared/types/booking.types";
import {beautifyDate, formatNights} from "~/common/utils/dates.utils";

export default () => {
	const bookingBotToken = '8047984268:AAHG4Vqc4rsUezydALb7_faeNx5l8mmNAoU';
	const bookingBotChatID = -1002432017175;

	function formatBookingMessageForTelegramLink(bookingData: BookingCreateDTO, listingLink: string) {
		const messageParts = [
			`Новое бронирование:`,
			`**Дата заезда:** ${beautifyDate( bookingData.checkIn)}`,
			`**Дата выезда:** ${beautifyDate( bookingData.checkOut)}`,
			`Цена за ${formatNights(bookingData.daysCount)}: ${bookingData.totalPrice.toLocaleString()} ₽`,
			`Имя: ${bookingData.userName}`,
			`Телефон: ${encodeURIComponent(bookingData.userPhone)}`,
			`Способ связи: ${bookingData.communication}`,
			`Взрослые: ${bookingData.adults}`,
			`Дети: ${bookingData.childrenCount}`,
			`Возраст детей: ${bookingData.childrenAges.map(i => `${i} ${getYearWord(i)}`).join(', ')}`,
			`Комментарий: ${bookingData.comment ?? 'Нет'}`,
			`Ссылка на объект: ${listingLink}  `,
		];

		// Фильтрация пустых строк и соединение частей сообщения с кодированным переносом строки
		return messageParts.filter(part => part !== '').join('%0A');
	}

	const getUrl = (text: string, token: string, chatID: number): string => `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatID}&text=${text}`
	// @ts-ignore

	// @ts-ignore
	const sendBookingInfo = async (bookingData: BookingCreateDTO, listingLink: string) => {
		const text = formatBookingMessageForTelegramLink(bookingData, listingLink);
		const url = getUrl(text, bookingBotToken, bookingBotChatID);
		return useFetch(url)
	}



	const fetchForCallData = async (phone: string, name: string, question: string | undefined ) => {
		let text = `Клиент оставил заявку на звонок: %0A👶Имя: ${name} %0A📱Номер телефона: ${encodeURIComponent(phone)}%0A Вопрос: ${question ? question : 'Нет'}`;
		const url = getUrl(text, bookingBotToken, bookingBotChatID);
		return useFetch(url)
	}

	return {
		sendBookingInfo,
		fetchForCallData
	}

}