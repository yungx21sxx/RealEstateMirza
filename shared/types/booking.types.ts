export interface BookingCreateDTO {
    checkIn: Date;
    checkOut: Date;
    adults: number;
    childrenCount: number;
    childrenAges: number[];
    userName: string;
    userPhone: string;
    comment: string;
    listingId: number;
    totalPrice: number,
    daysCount: number,
    communication: string
}
