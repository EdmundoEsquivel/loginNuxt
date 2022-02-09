import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize
} from 'vee-validate'
import { required, min, email } from 'vee-validate/dist/rules'

localize({
  en: {
    messages: {
      required: (name) => `campo ${name} es requerido`,
      email: (name) => `Ingresa un dirección de correo valida`,
      min: (name, { length }) =>
        `campo ${name} debe tener al menos ${length} caracteres o más`
    }
  }
})

extend('min', min)
extend('email', email)
extend('required', required)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)