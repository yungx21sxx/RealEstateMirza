import type {IListingPricePeriod} from "#shared/types/listing.types";
import type {PhotoUploadResponse} from "#shared/types/response.types";

export interface IListingFormData {
    title: string | null;
    description: string | null;
    minPrice: number | null;

    address: string | null;
    longitude: number | null;
    latitude: number | null;

    roomCount: number | null;
    bedDescription: string | null;
    area           : number | null;
    floor          : number | null;
    maxFloor       : number | null;
    balcony: null;
    viewDescription: string | null;

    appliances     : string[];
    internetAndTV  : string[];
    amenities      : string[];

    pricePeriods: IListingPricePeriod[];
    photos: PhotoUploadResponse[];
    monthlyRental: boolean;
    withAnimals: boolean;
    places: number | null;
}