<template>
    <v-container>
        <v-overlay :value="overlay">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>
        <v-row>
            <v-col>
                <BanerBlock v-if="!$auth.loggedIn"/>
                <v-data-table
                    v-if="$auth.loggedIn"
                    :headers="cabecalho"
                    :items="vendas_cad"
                    class="elevation-18 white black--text"
                    :search="pesquisa"
                    :key="chaveRender"
                >
                    <template v-slot:item.data_venda="{ item }">
                        <v-chip
                        >
                        {{ format(item.data_venda) }}
                        </v-chip>
                    </template>
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title> Sales </v-toolbar-title>
                            <v-row justify="end">
                                <v-col cols="4" class="text-right">
                                    <v-text-field
                                        v-model="pesquisa"
                                        append-icon="mdi-magnify"
                                        label="Search"
                                        single-line
                                        hide-details
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="3" class="text-right hidden-sm-and-down">
                                    <v-btn @click="inserirVenda" class="success">New Sale</v-btn>
                                </v-col>
                                <v-col cols="3" class="text-right hidden-md-and-up">
                                    <v-btn @click="inserirVenda" fab x-small color="success">+</v-btn>
                                </v-col>
                            </v-row>  
                            <v-dialog v-model="dialog" max-width="600px">            
                                <v-card>
                                    <v-card-title>
                                        <span class="text-h5">{{ tituloDialog }}</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col v-if="deleteMode == false" cols="12">
                                                    <v-autocomplete
                                                        v-model="venda.cbCliente"
                                                        :items="clientes"
                                                        chips
                                                        clearable
                                                        color="blue-grey lighten-2"
                                                        label="Select"
                                                        item-text="venda"
                                                        item-value="venda"
                                                    >
                                                        <template v-slot:selection="data">
                                                            <v-chip
                                                            v-bind="data.attrs"
                                                            :input-value="data.selected"
                                                            @click="data.select"
                                                            >
                                                            <v-avatar left>
                                                                <v-img :src="data.item.avatar || noimg"></v-img>
                                                            </v-avatar>
                                                            {{ data.item.nome }}
                                                            </v-chip>
                                                        </template>
                                                        <template v-slot:item="data">
                                                            <template v-if="typeof data.item !== 'object'">
                                                                <v-list-item-content v-text="data.item"></v-list-item-content>
                                                            </template>
                                                            <template v-else>
                                                                <v-list-item-avatar>
                                                                    <img :src="data.item.avatar || noimg">
                                                                </v-list-item-avatar>
                                                                <v-list-item-content>
                                                                    <v-list-item-title v-html="data.item.nome+' '+data.item.sobrenome"></v-list-item-title>
                                                                    <v-list-item-subtitle v-html="data.item.pedra"></v-list-item-subtitle>
                                                                </v-list-item-content>
                                                            </template>
                                                        </template>
                                                    </v-autocomplete>
                                                </v-col>
                                                <v-col v-if="deleteMode == false" cols="12">
                                                    <v-text-field
                                                        v-model="venda.txtCliente"
                                                        dense
                                                        label="Or Insert customer name yourself"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col v-if="deleteMode == false" cols="12">
                                                    <v-autocomplete
                                                        v-model="venda.produto"
                                                        :items="produtos"
                                                        chips
                                                        clearable
                                                        color="blue-grey lighten-2"
                                                        label="Select"
                                                        item-text="produtos"
                                                        item-value="produtos"
                                                    >
                                                        <template v-slot:selection="data">
                                                            <v-chip
                                                                v-bind="data.attrs"
                                                                :input-value="data.selected"
                                                                @click="data.select"
                                                            >
                                                                <v-avatar left>
                                                                    <v-img :src="data.item.midia.url1"></v-img>
                                                                </v-avatar>
                                                                {{ data.item.titulo }}
                                                            </v-chip>
                                                        </template>
                                                        <template v-slot:item="data">
                                                            <template v-if="typeof data.item !== 'object'">
                                                                <v-list-item-content v-text="data.item"></v-list-item-content>
                                                            </template>
                                                            <template v-else>
                                                                <v-list-item-avatar>
                                                                    <img :src="data.item.midia.url1">
                                                                </v-list-item-avatar>
                                                                <v-list-item-content>
                                                                    <v-list-item-title v-html="data.item.titulo+' - - '+data.item.cod_prod"></v-list-item-title>
                                                                    <v-list-item-subtitle v-html="data.item.pedra"></v-list-item-subtitle>
                                                                </v-list-item-content>
                                                            </template>
                                                        </template>
                                                    </v-autocomplete>
                                                </v-col>
                                                <v-col v-if="deleteMode == false" cols="12" sm="6" md="6">
                                                    <v-text-field 
                                                        v-model="venda.qtd" 
                                                        label="Quantity" 
                                                        :rules="[required('Quantity')]">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col v-if="deleteMode == false" cols="12" sm="6" md="6">
                                                    <v-text-field 
                                                        v-model="venda.vlr_unit" 
                                                        label="Unit Value" 
                                                        :rules="[required('Unit Value')]">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" v-if="deleteMode == false">
                                                    <v-menu
                                                        ref="menuData"
                                                        v-model="menuData"
                                                        :close-on-content-click="false"
                                                        :return-value.sync="venda.data"
                                                        transition="scale-transition"
                                                        offset-y
                                                        min-width="290px"
                                                    >
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field
                                                                v-model="venda.data"
                                                                hint="MM/DD/YYYY format"
                                                                prepend-icon="mdi-calendar"
                                                                readonly
                                                                v-bind="attrs"
                                                                v-on="on"
                                                                :rules="[required('Sale Date')]"
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="venda.data" no-title scrollable>
                                                            <v-spacer></v-spacer>
                                                            <v-btn text color="primary" @click="menuData = false">Cancel</v-btn>
                                                            <v-btn text color="primary" @click="$refs.menuData.save(venda.data)">OK</v-btn>
                                                        </v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="red darken-1" text @click="cancelar">
                                            Cancel
                                        </v-btn>
                                        <v-btn color="green darken-1" text @click="botaoConfirm">
                                            {{ btConfirm }}
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>     
                    <template v-slot:item.actions="{ item }">
                        <v-icon
                            small
                            class="mr-2 hidden-sm-and-down"
                            @click="deleteVenda(item._id)"
                            color="orange darken-4"
                        >
                            mdi-delete-empty
                        </v-icon>
                        <v-btn class="orange darken-4 hidden-sm-and-up" small @click="deleteVenda(item._id)">
                            Delete
                        </v-btn>
                    </template>  
                    <template v-slot:no-data>
                        <v-btn
                            color="primary"
                            @click="carregarTabela"
                        >
                            Reset
                        </v-btn>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import noImg from "@/static/utilities/noimg.png";
import validacao from '~/utils/validacao';
export default {
    data: () => ({
        noimg: noImg,
        overlay: false,
        vendas: "",
        pesquisa: "",
        chaveRender: 0,
        idDelete: "",
        cabecalho: [
                {
                    text: "Sale code",
                    align: "start",
                    sortable: false,
                    value: "cod_venda",
                },
                { text: "Customer code", value: "id_cliente" },
                { text: "Product code", value: "id_item" },
                { text: "Sale Date", value: "data_venda" },
                { text: "Quantity", value: "qtd" },
                { text: "Unit Value", value: "vlr_unit" },
                { text: "Actions", value: "actions", sortable: false },
              ],
        venda: {
           cbCliente: [],
           txtCliente: "",
           produto: [],
           qtd: "",
           vlr_unit:"",
           data: new Date().toISOString().substr(0, 10)
        },      
        dialog: false,
        menuData: false,
        tituloDialog: "",
        btConfirm: "",
        deleteMode: false,
        insertMode: false,
        produtos: [],
        clientes: [],
        ...validacao
    }),
  
    computed: {
        vendas_cad() {
            return Array.from(this.vendas);
        },
    },

    methods: {

        async getVendas() {
            if (this.$auth.loggedIn) {
                await this.$axios
                      .get("/venda/buscarVendas")
                      .then((response) => (this.vendas = response.data));
            }
        },

        async getItens(){
          if (this.$auth.loggedIn) {
                await this.$axios
                      .get("/item/bucarItens")
                      .then((response) => (this.produtos = response.data));
            }
        },

        async getClientes(){
          if (this.$auth.loggedIn) {
                await this.$axios
                      .get("/usuario/buscarClientes")
                      .then((response) => (this.clientes = response.data));
            }
        },

        async botaoConfirm() {
            if(this.deleteMode == true){
                await this.$axios
                        .delete(`/venda/apagar/${this.idDelete}`)
                        .then((response) => {
                                this.carregarTabela();
                                this.limparDados();
                                this.dialog = false });
            }else if (this.insertMode == true){
                    if((this.venda.cbCliente == null && this.venda.txtCliente == "") || this.venda.produto.cod_prod == null || this.venda.qtd == "" ||
                        this.venda.vlr_unit == ""){
                        this.$notifier.showMessage({
                            content: "There is/are required fields in blank. Please fill them",
                            color: "red",
                            time: 4000
                        });
                    }else{
                        await this.$axios
                                .post("/venda/addVenda", {
                                    cod_venda: "",
                                    id_cliente: this.venda.cbCliente._id == null? this.venda.txtCliente : this.venda.cbCliente._id,
                                    id_item: this.venda.produto._id,
                                    qtd: this.venda.qtd,
                                    vlr_unit: this.venda.vlr_unit,
                                    data_venda: this.venda.data 
                                })
                                .then((response) => {
                                    console.log("Success");
                                    this.carregarTabela();
                                    this.limparDados();
                                    this.dialog = false 
                                })
                                .catch((error) => {
                                    const errorMessage = error.response.data.message;
                                    this.$notifier.showMessage({
                                        content: errorMessage,
                                        color: "red",
                                        time: 6000
                                    })
                                });
                    }   
            }               
        },

        cancelar() {
            this.dialog = false;
        },

        deleteVenda(id) {
            this.insertMode = false;
            this.deleteMode = true;
            this.btConfirm = "Yes";
            this.tituloDialog = "Do you want to delete the selected sale?"
            this.dialog = true;
            this.idDelete = id;
        },

        inserirVenda(){
            this.deleteMode = false;
            this.insertMode = true;
            this.btConfirm = "Save";
            this.tituloDialog = "Inserting a new Sale"
            this.dialog = true;
        },

        async carregarTabela(){
          await this.getVendas();
          this.renderTabela();
        },

        renderTabela(){
          this.chaveRender += 1;
        },

        limparDados(){
           this.venda.cbCliente = "";
           this.venda.txtCliente = "";
           this.venda.produto = "";
           this.venda.qtd = "";
           this.venda.vlr_unit = "";
           this.venda.data = new Date().toISOString().substr(0, 10);
           this.idDelete = "";
           this.deleteMode = false;
           this.insertMode = false;
        },

        format(data){
          const dt = new Date(data);
          let dia  = dt.getDate()
          let mes  = (dt.getMonth()+1);
          let ano  = dt.getFullYear();
          return `${dia}/${mes}/${ano}`;
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
      
    async mounted() {
        await this.getVendas();
        await this.getItens();
        await this.getClientes();
        this.overlay = true;
    }
}
</script>