import {useAuth} from "~/modules/auth/composables/useAuth";


export default defineNuxtPlugin(async () => {
	const {fetchProfile} = useAuth();
	await fetchProfile();
});
