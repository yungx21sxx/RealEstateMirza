import type {BookingFiltersDTO} from "#shared/types/dto.types";
import type {ICalculatedPrices} from "#shared/types/listing.types";




export default () => {

    const bookingData = useState<BookingFiltersDTO>('booking-data');
    const calculatedPrices = useState<ICalculatedPrices | null>('listing-prices', () => null);

    const bookingConfirmModal = useState(() => false)

    const setBookingData = (data: BookingFiltersDTO) => {
        bookingData.value = data;
    }


    const setPrices = (prices: ICalculatedPrices | null) => {
        calculatedPrices.value = prices;
    }

    return {
        bookingData,
        setBookingData,
        calculatedPrices,
        setPrices,
        bookingConfirmModal
    }
}