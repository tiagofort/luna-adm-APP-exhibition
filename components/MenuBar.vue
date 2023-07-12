<template>
    <div>
    <v-app-bar
      color="grey lighten-4 accent-4 mb-0"
      elevation="2"
      rominent
      dark
    >
        <v-app-bar-nav-icon v-if="$auth.loggedIn" class="black--text" @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title></v-toolbar-title>

        <v-spacer></v-spacer>
        <div v-if="!$auth.loggedIn">
          <v-btn icon to="/login">
            <v-icon class="mr-1 black--text">mdi-login</v-icon>
            <span class="mr-6 hidden-sm-and-down black--text">Login</span>
          </v-btn>
        </div>
        <div v-if="$auth.loggedIn">
          <!-- <span class="mr-5">{{ $auth.user.email }}</span> -->
          <v-btn icon @click="$auth.logout()">
            <v-icon class="mr-1 black--text">mdi-logout</v-icon>
            <span class="mr-6 hidden-sm-and-down black--text">Logout</span>
          </v-btn>
        </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="grey lighten-5--text text--accent-4"
        >
          <v-list-item v-for="(menu,i) in menus" :key="i" :to="menu.rota">
            <v-list-item-icon>
              <v-icon>mdi-arrow-right-thin-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ menu.desc }}</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
  </template>

  
<script>  
    export default {
      data: () => ({
        drawer: false,
        group: null,
        menus: ''
      }),
      mounted(){
        this.getMenu();
        console.log(this.menu);
      },
      methods:{
        getMenu(){
         this.$axios
                .get("/menu/menus")
                .then((response) => (this.menus = response.data));
        }
      }
    }
  </script>

<style scoped>

  
</style>