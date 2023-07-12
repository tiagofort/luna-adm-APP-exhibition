<template>
    <v-container>
        <v-overlay :value="overlay">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>
        <v-row>
            <v-col md="5" sm="12" xs="12">
                <BanerBlock v-if="!$auth.loggedIn"/>
                <v-card class="mt-3"  elevation="18" v-if="$auth.loggedIn">
                    <v-card-title>New User</v-card-title>
                    <v-divider></v-divider>
                    <v-form v-model="valido">
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="nome"
                                        :rules="[required('Name')]"
                                        label="First name"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="sobrenome"
                                        :rules="[required('Surname')]"
                                        label="Last name"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="usuario"
                                        :rules="[required('User')]"
                                        label="User"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="email"
                                        :rules="[required('Email'), emailFormat()]"
                                        label="Email"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="senha"
                                        :append-icon="mostrarSenhar ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="mostrarSenhar ? 'text' : 'password'"
                                        :rules="[required('password'), minLength('Password',8)]"
                                        @click:append="mostrarSenhar = !mostrarSenhar"
                                        clearable
                                        counter=true
                                        label="Password"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="senhaconfirm"
                                        :append-icon="mostrarSenhar ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="mostrarSenhar ? 'text' : 'password'"
                                        :rules="[required('password'), minLength('Password', 8), passwordEqual(senha,senhaconfirm)]"
                                        @click:append="mostrarSenhar = !mostrarSenhar"
                                        clearable
                                        counter=true
                                        label="Password"
                                    ></v-text-field>
                                </v-col>
                                <v-col class="d-flex justify-end mb-2 mt-2">
                                    <v-btn
                                        color="red"
                                        class="mr-4 text-right"
                                        text
                                        @click="limparDados"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        :disabled="!valido"
                                        color="success"
                                        class="mr-4 text-right"
                                        text
                                        @click="cadastrarUsuario"
                                    >
                                        Save
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card>
            </v-col>
            <v-dialog
                v-model="editarDialog"
                persistent
                width="550"
                v-if="$auth.loggedIn"
            >
                <v-card class="pa-3">
                    <v-card-title class="text-h5 pa-2"> Editing password </v-card-title>
                    <v-form v-model="edit">
                        <v-row class="pa-6">
                            <v-col cols="12">  
                                <v-text-field
                                    v-model="editSenha"
                                    :append-icon="mostrarSenhar ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="mostrarSenhar ? 'text' : 'password'"
                                    :rules="[required('Password'),minLength('Password',8)]"
                                    @click:append="mostrarSenhar = !mostrarSenhar"
                                    clearable
                                    counter=true
                                    label="Password"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="editConfirm"
                                    :append-icon="mostrarSenhar ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="mostrarSenhar ? 'text' : 'password'"
                                    :rules="[required('Password'), minLength('Password', 8), passwordEqual(senha,senhaconfirm)]"
                                    @click:append="mostrarSenhar = !mostrarSenhar"
                                    clearable
                                    counter=true
                                    label="Password"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="red darken-1"
                            text
                            @click="editarDialog = false"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            :disabled="!edit"
                            color="green darken-1"
                            text
                            @click="salvarEdicao"
                        >
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-col v-if="$auth.loggedIn">
                <v-card class="mt-3">
                    <v-card-title> Users
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="busca"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                        ></v-text-field>
                    </v-card-title>

                    <v-data-table
                        :headers="cabecalho"
                        :items="usuarios"
                        :items-per-page="5"
                        class="elevation-18"
                        :search="busca"
                        :key="chaveRender"
                    >
                        <template v-slot:item.acesso="{ item }">
                            <v-chip
                                :color="cor(item.acesso)"
                                dark
                            >
                            </v-chip>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-btn class="tooltip hidden-sm-and-down" icon small @click="editar(item._id)">
                                <v-icon
                                    small
                                    color="orange darken-4"
                                    class="hidden-sm-and-down"
                                >
                                    mdi-pencil 
                                </v-icon>
                                <span class="tooltiptext">Edit Password</span>
                            </v-btn>
                            <v-btn @click="editar(item._id)" small class="orange darken-4 hidden-sm-and-up ml-4 tooltip">
                                Edit Password
                            </v-btn>
                            <v-btn class="tooltip hidden-sm-and-down" icon small @click="desabilitarUsuario(item._id)">
                                <v-icon
                                    v-if="item.acesso == 1"
                                    small
                                    color="orange darken-4"
                                    class="hidden-sm-and-down"
                                >
                                    mdi-account-check
                                </v-icon>
                                <v-icon
                                    v-if="item.acesso == 0"
                                    small
                                    color="orange darken-4"
                                    class="hidden-sm-and-down"
                                >
                                    mdi-account-cancel
                                </v-icon>
                                <span v-if="item.acesso == 1" class="tooltiptext">Unlock User</span>
                                <span v-if="item.acesso == 0" class="tooltiptext">Block User</span>
                            </v-btn>
                            <v-btn class="hidden-sm-and-up orange darken-4 tooltip" v-if="item.acesso == 1" @click="desabilitarUsuario(item._id)" small> Unlock User
                                <span v-if="item.acesso == 1" class="tooltiptext">Unlock User</span>  
                            </v-btn>
                            <v-btn class="hidden-sm-and-up orange darken-4 tooltip" v-if="item.acesso == 0" @click="desabilitarUsuario(item._id)" small> Block User 
                                <span v-if="item.acesso == 0" class="tooltiptext">Block User</span>
                            </v-btn>    
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import BanerBlock from '@/components/BanerBlock.vue';
import validacao from '@/utils/validacao';
export default {  
    data: () => ({
        ...validacao,
        chaveRender: 0,
        overlay: false,
        editarDialog: false,
        valido: false,
        edit: false,
        mostrarSenhar: false,
        nome: "",
        sobrenome: "",
        usuario: "",
        email: "",
        tipo:"",
        senha: "",
        senhaconfirm: "",
        editSenha: "",
        editConfirm: "",
        usuarios: [],
        id_edicao: "",
        cabecalho: 
            [
                {
                    text: "Name",
                    align: "start",
                    sortable: false,
                    value: "nome",
                },
                { 
                    text: "Surname", 
                    value: "sobrenome" 
                },
                { 
                    text: "Status", 
                    value: "acesso" 
                },
                { 
                    text: "Email", 
                    value: "email" 
                },
                { 
                    text: "Actions", 
                    value: "actions", 
                    sortable: false 
                },
            ],
        busca: ""  
    }),
    
    async mounted() {
        await this.getUsuarios();
        this.overlay = true;
    },
    
    methods:{

        renderTable(){
          this.chaveRender += 1;
        },

        async getUsuarios(){
          if (this.$auth.loggedIn) {
                await this.$axios
                      .get("/usuario/buscarUsuarios")
                      .then((response) => {
                            this.usuarios = response.data;
                });
            }
        },

        async cadastrarUsuario(){
          await this.$axios
                .$post(`/usuario/salvar`, {
                    nome: this.nome,
                    sobrenome: this.sobrenome,
                    usuario: this.usuario,
                    email: this.email,
                    phone: '',
                    senha: this.senhaconfirm,
                    tipo: 0
                })
                .then((response) => {
                    this.limparDados();
                    this.$notifier.showMessage({
                        content: "The User has been saved",
                        color: "green",
                        time: 3000
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        limparDados(){
          this.nome = "";
          this.sobrenome = "";
          this.usuario = "";
          this.email = "";
          this.senha = "";
          this.senhaconfirm = "";
          this.id_edicao = "";
          this.editSenha = "";
          this.editConfirm = "";

        },

        async editar(id){
          this.editarDialog = true;
          this.id_edicao = id;
        },

        async salvarEdicao(){
          await this.$axios
                .$put(`/usuario/editarSenha/${this.id_edicao}`, {
                    senha: this.editConfirm
                })
                .then((response) => {
                    console.log("Success");
                    this.getUsuarios();
                    this.renderTable();
                    this.$notifier.showMessage({
                        content: "User has been edited",
                        color: "green",
                        time: 3000
                    });
                    this.editarDialog = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        async desabilitarUsuario(id){
          await this.$axios
                .$put(`/usuario/alterarTipo/${id}`, {})
                .then((response) => {
                    console.log("Success");
                    this.getUsuarios();
                    this.renderTable();
                    this.$notifier.showMessage({
                        content: "The user status has been updated.",
                        color: "green",
                        time: 3000
                    });
                })
                .catch((error) => {
                    console.log(error);
                });

        },

        cor(acesso){
          if(acesso == 0) return 'green'
          else return 'red'
        }
    },

    watch: {
      overlay(val) {
        val &&
          setTimeout(() => {
            this.overlay = false;
          }, 1000);
        },
    },

    components: { BanerBlock }
}
   </script>

<style>
.tooltip {
    position: relative;
    display: inline-block;
}

.tooltip .tooltiptext {
    visibility: hidden;
    background-color: black;
    color: white;
    border-radius: 7px;
    padding: 5px 10px;

    position: absolute;
    z-index: 1;
    bottom: 100%;
  
    left: 60%;
    margin-left: -65px;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
}
</style>