export default () => {
    const callSubmitModal = useState<boolean>(() => false)

    const openCallSubmitModal = () => callSubmitModal.value = true;

    const closeCallSubmitModal = () => callSubmitModal.value = false;

    return {
        callSubmitModal,
        openCallSubmitModal,
        closeCallSubmitModal
    }
}