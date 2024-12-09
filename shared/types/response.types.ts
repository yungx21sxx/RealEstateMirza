import type {ICalculatedPrices, IListingPricePeriod, IListingProperties} from "#shared/types/listing.types";

export interface ListingCatalogResponse {
    id: number;
    title: string;
    photos: string[];
    rooms: number;
    type: string;
    area: number;
    places: number;
    minPrice: number;
    calculatedPrices: ICalculatedPrices | null
}

export interface PhotoUploadResponse {
    photoId: number,
    urlMin: string,
}

export interface IListingResponse extends IListingProperties {
    id: number;
    photos: PhotoResponse[]
    pricePeriods: IListingPricePeriod[]
}

export interface PhotoResponse {
    id: number;
    urlMin: string;
    urlFull: string;
    position: number;
}

export interface ListingSuccessCreateResponse {
    listingId: number
}
