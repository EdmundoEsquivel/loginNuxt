<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <h2 class="text-3xl font-bold">Reset Password</h2>
      <p class="mt-6 text-base leading-5 text-gray-600 max-w-sm mx-auto">
        Enter your email below and we'll send you instructions on how to create
        a new password.
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(submit)">
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-5 text-gray-700"
              >
                Email
              </label>

              <div class="mt-1 rounded-md shadow-sm">
                <ValidationProvider
                  rules="required|email"
                  name="Email"
                  v-slot="{ errors }"
                >
                  <input
                    v-model="email"
                    :class="{ 'border border-solid border-red': errors[0] }"
                    placeholder="you@example.com"
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-purple focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                  <RevealText>
                    <p v-if="errors[0]" class="text-sm text-red mt-1">
                      {{ errors[0] }}
                    </p>
                  </RevealText>
                </ValidationProvider>
              </div>
            </div>

            <div class="mt-6">
              <span class="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  class="rounded-full tracking-wider bg-black hover:bg-gray-900 text-white font-bold text-center py-3 px-8 text-sm uppercase transition transform duration-200 focus:outline-none w-full"
                >
                  Send Reset
                </button>
              </span>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
import RevealText from '../../components/transitions/RevealText.vue';

export default {
components: { RevealText },  
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async submit() {
      try {
        await this.$axios.post("/api/users/sendResetPasswordRequest", {
          email: this.email,
        });
        console.log(response);
      } catch ({ response }) {
        swal({
          title: "Error",
          text: response.data,
          icon: "error",
        });
        console.log(response);
        // throw new Error(err);
      }
    },
  },
};
</script>

<style></style>
