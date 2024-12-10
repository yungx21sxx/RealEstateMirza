<script setup lang="ts">


import type {PhotoUploadResponse} from "#shared/types/response.types";
import { VueDraggableNext } from 'vue-draggable-next'
import type {H3Error} from "h3";
import type { FetchOptions } from 'ofetch'


const photos = defineModel<PhotoUploadResponse[]>({required: true})

const filesLoading = ref(false);
const files = ref<File[]>([]);

const handleFileChange = (filesInput: File[]) => {
	// Проверяем, что событие содержит корректный target
	
	// FileList из target.files
	const selectedFiles = Array.from(filesInput); // Преобразуем FileList в массив
	
	console.log("Выбранные файлы:", selectedFiles);
	
	files.value = [...files.value, ...selectedFiles];
	filesInput = []
};

async function uploadPhotos() {
	const formData = new FormData()
	if (files.value.length === 0) {
		alert('Необходимо загрузить фотографии');
		return;
	}
	for (let i = 0; i < files.value.length; i++) {
		const file = files.value[i]
		if (file) {
			formData.append(`photo${i}`, file)
		}
	}
	try {
		filesLoading.value = true;
		
		const photosResponse = await $fetch<PhotoUploadResponse[]>(`/api/photo/upload-photos`, {
			method: "POST",
			body: formData,
		} satisfies FetchOptions)
		
		filesLoading.value = false;
		files.value = [];
		
		if (photos.value) {
			photos.value.push(...photosResponse);
		}
		
	} catch (e) {
		console.log(e)
	}
}

interface rotateDTO {
	target: 'left' | 'right',
	photoId: number,
}


const rotate = async (dto: rotateDTO) => {
	try {
		await $fetch('/api/photo/rotate', {
			method: 'POST',
			body: {
				target: dto.target,
				photoId: dto.photoId
			}
		});
		const index = photos.value.findIndex(p => p.photoId === dto.photoId);
		if (index !== -1) {
			// Добавляем метку времени для обновления кэшированного изображения
			photos.value[index].urlMin = `${photos.value[index].urlMin}?t=${new Date().getTime()}`;
		}
	} catch (e: H3Error) {
		console.log(e.data.message);
	}
}

const deletePhoto = async (id: number) => {
	try {
		await $fetch(`/api/photo/${id}`, {
			method: "DELETE",
		})
		if (photos.value)
			photos.value = photos.value.filter(photo => photo.photoId !== id);
	} catch (e) {
		console.log(e)
	}
}

</script>

<template>
	<UCard class="-mx-4">
		<template #header>
			<h2 class="text-xl font-semibold">Загрузка фотографий</h2>
		</template>
		
		<div>
			<UInput
				type="file"
				@change="handleFileChange"
				label="Фотографии объекта"
				multiple
				placeholder="Select your files"
			/>
			<UButton
				:loading="filesLoading"
				:disabled="filesLoading"
				@click="uploadPhotos()"
				class="my-4"
			>
				Загрузить
			</UButton>
			<div v-if="photos && photos.length > 0" class="overflow mt-4">
				<h3 class="font-bold mb-2">Загруженные фотки</h3>
				<p>Фотографии можно менять местами и переворачивать.</p>
				<VueDraggableNext v-model="photos" class="gallery mt-4">
					<transition-group>
						<div
							class="img bg-no-repeat bg-cover h-16"
							v-for="photo of photos"
							:style="{
								backgroundImage: `url('${photo.urlMin}')`,
							}"
							:key="photo.photoId"
						>
							<div class="image-control">
								<UButton class="delete-btn" icon="i-material-symbols:delete-forever-outline" @click="deletePhoto(photo.photoId)"></UButton>
								<div class="rotate-btns">
									<UButton icon="i-material-symbols:rotate-left" density="compact" @click="rotate({target: 'left', photoId: photo.photoId})"></UButton>
									<UButton icon="i-material-symbols:rotate-right" density="compact" @click="rotate({target: 'right', photoId: photo.photoId})"></UButton>
								</div>
							</div>
						</div>
					</transition-group>
				</VueDraggableNext>
			</div>
		</div>
	</UCard>
</template>

<style scoped lang="scss">


.image-control {
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	justify-content: space-between;
	.rotate-btns {
		display: flex;
		justify-content: space-between;
	}
	
	.delete-btn {
		margin-left: auto;
	}
}

.gallery {
	display: grid;
	
	width: 100%;
	max-width: 100% !important;
	grid-template-columns: repeat(auto-fit, minmax(120px, 200px));
	gap: 8px;
	
	@media screen and (max-width: 700px) {
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
	}
	
	
}

.img {
	position: relative;
	padding: 8px;
	width: 100%; /* или фиксированная ширина */
	background-size: cover;
	background-position: center;
	border-radius: 8px; /* (опционально) скругление углов */
	height: 150px;
}

</style>