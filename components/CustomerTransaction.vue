<template>
    <v-container>
        <v-overlay :value="overlay">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>
        <BanerBlock v-if="!$auth.loggedIn"/>
        <v-row v-if="$auth.loggedIn">
            <v-col>
                <v-card>
                    <v-card-title class="font-weight-bold">
                        Customers
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
                        :items="clientes"
                        :items-per-page="5"
                        :search="busca"
                        class="elevation-18"
                    >
                        <template v-slot:item.actions="{ item }">
                            <v-btn class="tooltip hidden-sm-and-down" icon small @click="carregarTransacao(item._id)">
                                <v-icon
                                    small
                                    color="orange darken-4"
                                >
                                    mdi-swap-horizontal 
                                </v-icon>
                                <span class="tooltiptext">Show Transactions</span>
                            </v-btn>
                            <v-btn class="tooltip hidden-sm-and-down" icon small @click="carregarCliente(item._id)">
                                <v-icon
                                    small
                                    color="orange darken-4"
                                >
                                    mdi-eye 
                                </v-icon>
                                <span class="tooltiptext">Customer Details</span>
                            </v-btn>
                            <v-btn @click="carregarTransacao(item._id)" class="hidden-sm-and-up mb-1 orange darken-4" text small> Transactions </v-btn> 
                            <v-btn @click="carregarCliente(item._id)" class="hidden-sm-and-up mb-1 orange darken-4" text small> Client Details </v-btn>  
                         </template>
                    </v-data-table>
                </v-card>
            </v-col>
            <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
            >
                <v-card>
                    <v-card-title>
                        <span class="text-h5">{{tituloDialog}}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container :key="chave" v-if="visualizar == 0">
                            <v-row>
                                <v-col></v-col>
                                <v-col class="d-flex justify-center align-center">
                                    <v-avatar size="62">
                                        <img
                                            :src="cliente.avatar"
                                        >
                                    </v-avatar>
                                </v-col>
                                <v-col></v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <span class="black--text text-button font-weight-bold">Name:</span>
                                    <span class="black--text text-body-1 mt-3 ml-1">{{cliente.nome+" "+cliente.sobrenome}}</span>
                                </v-col>
                                <v-col cols="12">
                                    <span class="black--text text-button font-weight-bold"> Email:</span>
                                    <span class="black--text text-body-1 mt-3 ml-1">{{cliente.email}}</span>
                                </v-col>
                                <v-col cols="12">
                                    <span class="black--text text-button font-weight-bold">Username:</span>
                                    <span class="black--text text-body-1 mt-3 ml-1">{{cliente.usuario}}</span>
                                </v-col>
                            </v-row>
                        </v-container>
                        <v-container v-if="visualizar == 1">
                            <v-row :key="chave">
                                <v-col></v-col>
                                <v-col class="d-flex justify-center align-center">
                                    <v-avatar size="62">
                                        <img
                                            :src="venda.url"
                                        >
                                    </v-avatar>
                                </v-col>
                                <v-col></v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <span class="black--text text-button font-weight-bold">Sale Code:</span>
                                    <span class="black--text text-body-1 mt-3 ml-1">{{venda.codigo_venda}}</span>
                                </v-col>
                                <v-col cols="12">
                                    <span class="black--text text-button font-weight-bold">Sale Date:</span>
                                    <span class="black--text text-body-1 mt-3 ml-1">{{format(venda.data_venda)}}</span>
                                </v-col>
                                <v-col cols="6">
                                    <span class="black--text text-button font-weight-bold">Quantity:</span>
                                    <span class="black--text text-body-1 mt-3 ml-1">{{venda.qtd}}</span>
                                </v-col>
                                <v-col cols="6">
                                    <span class="black--text text-button font-weight-bold">Price</span>
                                    <span class="black--text text-body-1 mt-3 ml-1">{{venda.vlr}}</span>
                                </v-col>
                                <v-col><v-divider inset></v-divider></v-col>
                                <v-col cols="12">
                                    <span class="black--text text-button font-weight-bold">Product Code:</span>
                                    <span class="black--text text-body-1 mt-3 ml-1">{{venda.cod_item}}</span>
                                </v-col>
                                <v-col cols="6">
                                    <span class="black--text text-button font-weight-bold">Product:</span>
                                    <span class="black--text text-body-1 mt-3 ml-1">{{venda.item}}</span>
                                </v-col>
                                <v-col cols="6">
                                    <span class="black--text text-button font-weight-bold">Stone:</span>
                                    <span class="black--text text-body-1 mt-3 ml-1 pr-0">{{venda.item_pedra}}</span>
                                </v-col>
                                <v-col cols="6">
                                    <span class="black--text text-button font-weight-bold">Material:</span>
                                    <span class="black--text text-body-1 mt-3 ml-1">{{venda.item_material}}</span>
                                </v-col>
                                <v-col cols="6">
                                    <span class="black--text text-button font-weight-bold">Type:</span>
                                    <span class="black--text text-body-1 mt-3 ml-1">{{venda.item_tipo}}</span>
                                </v-col>
                                <v-col cols="12"><v-divider inset></v-divider></v-col>
                                <v-col>
                                    <span class="black--text text-button font-weight-bold">Customer Name:</span>
                                    <span class="black--text text-body-1 mt-3 ml-1">{{venda.nome+" "+venda.sobrenome}}</span>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="red darken-1"
                            text
                            @click="fechar()"
                        >
                            Close
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog> 
            <v-col>
                <v-card>
                    <v-card-title class="font-weight-bold">
                        Customer Transactions
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="buscaDet"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                        ></v-text-field>         
                    </v-card-title>
                    <v-row class="pl-2 ml-1">
                        <v-col><span class="black--text text-h6">{{nome}}</span></v-col>
                    </v-row>
                    <v-row class="pl-2 ml-1 mb-1">
                        <v-col><span class="black--text text-body-1">{{"Quantity bought: "+qtd_comprada}}</span></v-col>
                        <v-col><span class="black--text text-body-1">{{"Total bought: "+qtd_total}}</span></v-col>
                    </v-row>
                    <v-data-table
                        :headers="cabecalhoDetalhes"
                        :items="detalhesCliente"
                        :items-per-page="5"
                        :search="buscaDet"
                        class="elevation-18"
                    >
                        <template v-slot:item.actions="{ item }">
                            <v-btn class="tooltip hidden-sm-and-down" icon small @click="mostrarDetalhes(item.codigo_venda)">
                                <v-icon
                                    small
                                    color="orange darken-4"
                                >
                                    mdi-eye 
                                </v-icon>
                                <span class="tooltiptext">Show Details</span>
                            </v-btn> 
                            <v-btn class="tooltip orange darken-4 hidden-sm-and-up" small @click="mostrarDetalhes(item.codigo_venda)">
                                Show Details
                                <span class="tooltiptext">Show Details</span>
                            </v-btn>   
                         </template>
                         <template v-slot:item.data_venda="{ item }">
                            <v-chip>
                                {{ format(item.data_venda) }}
                            </v-chip>
                         </template>
                    </v-data-table>
                </v-card>    
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import noimg from '@/static/utilities/noimg.png';
export default {  
data: () => ({
    overlay: false,
    clientes: [],
    movimentacao: [],
    detalhesCliente: [],
    chave: 0,
    visualizar: 0,
    cliente: {
        nome: "",
        sobrenome: "",
        avatar: "",
        email: "",
        usuario: ""
    },
    venda: {
        cod_item: "",
        codigo_venda: "",
        data_venda: "",
        qtd: "",
        vlr: "",
        id_cliente: "",
        id_item: "",
        item: "",
        item_material: "",
        item_pedra: "",
        item_tipo: "",
        nome: "",
        sobrenome: "",
        url: "",
    },
        qtd_comprada: "",
        qtd_total: "",
        nome: "",
        busca: "",
        buscaDet: "",
        dialog: false,
        tituloDialog: "",
        cabecalho: 
        [
            {
                text: "Name",
                align: "start",
                sortable: false,
                value: "nome",
            },
            {   text: "Surname", 
                value: "sobrenome" 
            },
            {   text: "Actions", 
                value: "actions", 
                sortable: false 
            },
        ],
        cabecalhoDetalhes: 
        [
            {
                text: "Sale Code",
                align: "start",
                sortable: false,
                value: "codigo_venda",
            },
            { 
                text: "Date", 
                value: "data_venda" 
            },
            { 
                text: "Product", 
                value: "item" 
            },
            { 
                text: "Actions",
                 value: "actions", 
                 sortable: false 
            },
        ],
}),

methods: {
    renderDialog(){
        this.chave += 1;
    },

    async getClientes(){
        if (this.$auth.loggedIn) {
            await this.$axios
                  .get("/usuario/buscarClientes")
                  .then((response) => { this.clientes = response.data });
        }
    },

    async getMovimentacao(){
        if (this.$auth.loggedIn) {
            await this.$axios
                  .get("/usuario/buscarMovimentacao")
                  .then((response) => { this.movimentacao = response.data });
        }
    },

    carregarTransacao(id){
        this.detalhesCliente = [];
        this.detalhesCliente = this.movimentacao.filter(element => element.id_cliente == id);
        if(this.detalhesCliente.length > 0) {
            this.nome = this.detalhesCliente[0].nome +" "+ this.detalhesCliente[0].sobrenome; 
            this.qtd_comprada = this.detalhesCliente[0].qtd_comprada;
            this.qtd_total = this.detalhesCliente[0].qtd_paga;
        }else{
            this.$notifier.showMessage({
                content: "The Customer your are selecting has no transactions!",
                color: "red",
                time: 3000
            });
        }      
    },
        
    carregarCliente(id){
        this.visualizar = 0;
        var selecao = this.clientes.find(element => element._id == id);
        this.cliente.nome = selecao.nome;
        this.cliente.sobrenome = selecao.sobrenome;
        this.cliente.avatar = selecao.avatar == "" ? noimg : selecao.avatar;
        this.cliente.email = selecao.email;
        this.cliente.usuario = selecao.usuario;
        this.dialog = true;
        this.tituloDialog = "Customer Details";
        this.renderDialog();
    },

    mostrarDetalhes(cod){
        this.tituloDialog = "Sale Details";
        this.visualizar= 1;
        this.dialog = true;
        var selecao = this.movimentacao.filter(element => element.codigo_venda == cod);
        this.venda.cod_item = selecao[0].cod_item;
        this.venda.codigo_venda = selecao[0].codigo_venda;
        this.venda.data_venda = selecao[0].data_venda;
        this.venda.qtd = selecao[0].qtd;
        this.venda.vlr = selecao[0].vlr;
        this.venda.id_cliente = selecao[0].id_cliente;
        this.venda.id_item = selecao[0].id_item;
        this.venda.item = selecao[0].item;
        this.venda.item_material = selecao[0].item_material;
        this.venda.item_pedra = selecao[0].item_pedra;
        this.venda.item_tipo = selecao[0].item_tipo;
        this.venda.nome = selecao[0].nome;
        this.venda.sobrenome = selecao[0].sobrenome;
        this.venda.url = selecao[0].url;
    },
    
    fechar(){
        this.dialog = false;     
    },
    
    format(data){
        const dt = new Date(data);
        let dia  = dt.getDate()
        let mes  = (dt.getMonth()+1);
        let ano  = dt.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }
},

async mounted(){
    this.overlay = true;
    await this.getClientes(); 
    await this.getMovimentacao();
},

watch: {
    overlay(val) {
        val &&
        setTimeout(() => {
            this.overlay = false;
        }, 1000);
    },
},

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

.v-dialog > .v-card > .v-card__text {
    padding: 0 0px 0px;
}
</style>