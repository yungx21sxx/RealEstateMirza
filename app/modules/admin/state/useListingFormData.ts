import type {IListingFormData} from "~/modules/admin/types/formData.types";

export default () => {
    const listingFormData: globalThis.Ref<IListingFormData> = useState('listing-form-data', () => ({
        title: null,
        description: null,
        minPrice: null,

        address: null,
        longitude: null,
        latitude: null,

        roomCount: null,
        bedDescription: null,
        area: null,
        floor: null,
        maxFloor: null,
        balcony: null,
        viewDescription: null,

        appliances: [],
        internetAndTV: [],
        amenities: [],

        pricePeriods: [],
        photos: [],

        monthlyRental: false,
        withAnimals: false,
        places: null,
        parkingDescription: null,
    }))



    return {
        listingFormData
    }
}