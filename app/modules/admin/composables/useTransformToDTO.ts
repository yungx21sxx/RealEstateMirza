import type {IListingFormData} from "~/modules/admin/types/formData.types";
import type {ListingCreateDTO} from "#shared/types/dto.types";

export function transformFormToDTO(formData: IListingFormData): ListingCreateDTO {
    return {
        title: formData.title ?? '',
        description: formData.description ?? '',
        minPrice: formData.minPrice ?? 0,
        address: formData.address ?? '',
        longitude: formData.longitude ?? 0,
        latitude: formData.latitude ?? 0,
        roomCount: formData.roomCount ?? 0,
        bedDescription: formData.bedDescription ?? '',
        area: formData.area ?? 0,
        floor: formData.floor ?? 0,
        maxFloor: formData.maxFloor ?? 0,
        balcony: formData.balcony ?? 'Нет',
        viewDescription: formData.viewDescription ?? '',
        appliances: formData.appliances ?? [],
        internetAndTV: formData.internetAndTV ?? [],
        amenities: formData.amenities ?? [],
        pricePeriods: formData.pricePeriods ?? [],
        photos: formData.photos.map(((photo, index) => ({
                position: index,
                photoId: photo.photoId
        }))),
        monthlyRental: formData.monthlyRental,
        withAnimals: formData.withAnimals,
        places: formData.places ?? 2,
        parkingDescription: formData.parkingDescription ?? 'Нет'
    };
}