<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <p class="text-center text-base leading-5 text-gray-600 max-w-xs mx-auto">
        Welcome back {{ user.email }}, please enter your new password below.
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="submit">
          <div>
            <label
              for="password"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              Password
            </label>

            <div class="mt-1 rounded-md shadow-sm">
              <input
                id="password"
                type="password"
                v-model="password"
                required
                placeholder="******************"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-purple focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>

          <div class="mt-6">
            <span class="block w-full rounded-md shadow-sm">
              <button
                type="submit"
                class="w-full bg-black hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
              >
                Reset Password
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import swal from "sweetalert";
export default {
  data() {
    return {
      password: "",
    };
  },
  layout: "bare",
  async asyncData({ $axios, params, redirect }) {
    try {
      console.log(params.token);
      const { data } = await $axios.get(`/api/users/tokens/${params.token}`);
      if (
        moment() > moment(data.resetPasswordTokenExpiration) ||
        data.resetPasswordTokenExpiration === null
      ) {
        redirect("/");
      }
      console.log(data.resetPasswordTokenExpiration);

      return {
        user: data,
      };
    } catch (err) {
      if (err) redirect("/");
    }
  },
  methods: {
    async submit() {
      try {
        await this.$axios.put(`/api/users/${this.user.id}/resetPassword`, {
          password: this.password,
        });
        this.$router.push("/");
        // console.log("esroy yndo clic");
      } catch ({ response }) {
        swal({
          title: "Error",
          text: response.data.message,
          icon: "error",
        });
        console.log(response);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
