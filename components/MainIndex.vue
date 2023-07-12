<template>
    <v-container class="white mt-1" id="login-page">
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
                                    <v-img width="350" class="mx-auto" aspect-ratio="16/9" :src="imgLogo" id="logo-image"></v-img>
                                    <div class="mx-auto welcome" >
                                      <span class="black--text text-center">WELCOME TO THE LUNA PEDRARIA'S MANAGER PAGE<br></span>
                                    </div>
                                    <div v-if="$auth.loggedIn" class="welcome">
                                      <span class="green--text"><br>{{$auth.user.nome.toUpperCase() || ""+' '+$auth.user.sobrenome.toUpperCase() || ""}} YOU ARE LOGGED IN</span>
                                    </div>
                                    <div v-if="!$auth.loggedIn" class="welcome">
                                      <span class="red--text"><br>YOU ARE NOT LOGGED IN</span>
                                    </div>
                                    <div v-if="!$auth.loggedIn" class="welcome mt-2">
                                      <v-btn text color="primary" to="/login">LOGIN</v-btn>
                                    </div>
                            </v-sheet>    
                    </v-col>
                    <v-col 
                      cols="4" 
                      sm="2" 
                      class="hidden-sm-and-down"
                    >
                    </v-col>
            </v-row>
    </v-container>
</template>

<script>
import logo from "@/static/logo/logoLuna.svg";
export default {
    data: () => ({
      imgLogo: logo,
      form: false,
      email: null,
      password: null,
      loading: false,
      show: false,
    }),
}
</script>

<style>
#login-page {
  margin-top: 10px;
}

#logo-image {
  margin-left: auto;
  margin-right: auto;
}

.welcome{
  display: flex;
  justify-content: center;
  font-family: Monaco;
  font-size: 18px;
}
</style>
    
