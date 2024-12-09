import type {IListingProperties, IListingPricePeriod} from "#shared/types/listing.types";

export interface ListingCreateDTO extends IListingProperties {
    photos: PhotoConnectDTO[];
    pricePeriods: IListingPricePeriod[];
}

export interface ListingUpdateDTO extends ListingCreateDTO {
    id: number;
}

export interface PhotoConnectDTO {
    photoId: number;
    position: number;
}

export interface PhotoRotateDTO {
    target: 'left' | 'right'
    photoId: number;
}

export interface BookingFiltersDTO extends IGuestsOptions {
    checkIn: Date | null,
    checkOut: Date | null,
}


export interface IGuestsOptions {
    adults: number,
    childrenCount: number,
    childrenAges: number[],
}
