interface CurrentPhoto {
	index: number,
	modal: boolean,
}


export default () => {
	const currentPhoto = useState<CurrentPhoto>('current-photo', () => ({
		index: 0,
		modal: false,
	}));
	const galleyThumbsModalIsOpen = useState<boolean>(() => false)

	return {
		currentPhoto,
		galleyThumbsModalIsOpen
	}
}