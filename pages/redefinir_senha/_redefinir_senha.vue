<template>
    <v-container class="white" id="login-page">
        <v-row class="d-flex justify-center" no-gutters>
          <v-col
              cols="4"
              sm="2"
              class="hidden-sm-and-down"
            >
          </v-col>
          <v-col
              cols="12"
              sm="8"
              align-self="center"
            >
              <v-sheet
                  min-height="70vh"
                  rounded="lg"
                  class="white"
              >
                  <v-img width="350" aspect-ratio="16/9" :src="imgLogo" id="logo-image"></v-img>
                  <v-card class="mx-auto px-6 py-8 elevation-18" width="450">
                      <v-form v-model="valido">
                          <v-text-field
                            outlined
                            v-model="usuInfo.senha1"
                            :append-icon="mostrarSenhar1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="mostrarSenhar1 ? 'text' : 'password'"
                            :rules="[required('password')]"
                            @click:append="mostrarSenhar1 = !mostrarSenhar1"
                            clearable
                            counter=true
                            label="New Password"
                          ></v-text-field>
                          <v-text-field
                            outlined
                            v-model="usuInfo.senha2"
                            :append-icon="mostrarSenhar2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="mostrarSenhar2 ? 'text' : 'password'"
                            :rules="[required('password'), passwordEqual(usuInfo.senha2, usuInfo.senha1)]"
                            @click:append="mostrarSenhar2 = !mostrarSenhar2"
                            clearable
                            counter=true
                            label="Repeat Password"
                          ></v-text-field>
                          <br>
                          <v-btn
                            :disabled="!valido"
                            @click="mudarSenha(usuInfo)"
                            block
                            color="primary"
                            size="large"
                          >
                            Save
                          </v-btn>
                      </v-form>
                  </v-card>
              </v-sheet>    
          </v-col>
          <v-col cols="4" sm="2" class="hidden-sm-and-down">
          </v-col>
        </v-row>
    </v-container>
  </template>
  
<script>
import validacao from '@/utils/validacao';
import logo from "@/static/logo/logoLuna.svg";
export default {
  data() {
    return{
        imgLogo: logo,
        valido: false,
        mostrarSenhar1: false,
        mostrarSenhar2: false,
        usuInfo: 
        {
          senha1: '',
          senha2: ''
        },
        ...validacao
    }
  },

  methods: {

      async mudarSenha(usu){
          var token = window.location.href.split('=');
          await this.$axios
                .$post("/usuario/redefinir_senha", 
                      { senha: this.usuInfo.senha2 },
                      { headers: { Authorization: `Bearer ${token[1]}` } })
                .then((response) => {
                        console.log(response)
                        this.$notifier.showMessage({ content: 'Your password has been changed', color: 'green', time: 2000 });
                        this.$router.push('/login') })
                .catch((error) => {
                        console.log({ error });
                        this.$notifier.showMessage({ 
                          content: 'The password could not be changed! Probably your request has expired! Try Again!', 
                          color: 'green', 
                          time: 3000 
                        });
                        this.$router.push('/login') });
      },
  }
}  
</script>

<style scoped>
#login-page {
    margin-top: 10px;
}

#logo-image {
    margin-left: auto;
    margin-right: auto;
}

#login-page{
    width: 100%;
}
  
</style>