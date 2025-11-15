import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';

export default defineNuxtPlugin({
  name: 'phone-input',
  parallel: true,
  async setup(app) {
    const globalOptions = {
      mode: 'auto',
      defaultCountry: 'RU',
      autoFormat: true,
      invalidMsg: 'Некорректный номер',
      validCharactersOnly: true,
      dropdownOptions: {
        showSearchBox: true,
      },
      inputOptions: {
        placeholder: 'Номер телефона',
        required: true,
      },
    };
    app.vueApp.use(VueTelInput, globalOptions);
  },
});
