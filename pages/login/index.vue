<template>
    <v-container>
      <Autentication textoBotao="Login" :submeterForm="logarUsuario"/>
    </v-container>
</template>

<script>
import Autentication from '~/components/Autentication.vue';
export default {
  data: () => ({}),
  
  components:{
    Autentication
  },
  
  methods:{
    async logarUsuario(loginInfo){
      await this.$auth.loginWith('local', {
            data: loginInfo
      }).then(response => {
            this.$notifier.showMessage({ content: 'Welcome! Thanks for logged in', color: 'green', time: 2000 })
      }).catch(error => {
         if (error.response) {
            const errorMessage = error.response.data.message;
            this.$notifier.showMessage({ content: errorMessage, color: 'red', time: 2000 });
          }
      });  
    }
  }
}
</script>