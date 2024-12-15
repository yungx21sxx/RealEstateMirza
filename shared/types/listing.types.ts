import type {PhotoConnectDTO} from "#shared/types/dto.types";

export interface IListingPricePeriod {
    price: number,
    startDate: Date,
    endDate: Date,
}

export interface ICalculatedPrices {
    dailyPrice: number,
    totalPrice: number,
    daysCount: number,
}


export interface IListingProperties {
    title: string;
    description: string;
    minPrice: number;

    address: string;
    longitude: number;
    latitude: number;

    roomCount: number;
    bedDescription: string;
    area           : number;
    floor          : number;
    maxFloor       : number;
    balcony: string;
    viewDescription: string;

    appliances     : string[];
    internetAndTV  : string[];
    amenities      : string[];

    monthlyRental: boolean;
    withAnimals: boolean;
    places: number;

    parkingDescription: string;
}