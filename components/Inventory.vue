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
                    :items="items_cad"
                    class="elevation-18"
                    :items-per-page="10"
                    :search="pesquisa"
                    :key="chaveRender"
                >
                    <template v-slot:item.inventory="{ item }">
                        <v-chip
                        :color="getColor(item.inventory)"
                        >
                            {{ item.inventory || 0 }}
                        </v-chip>
                    </template>
                    <template v-slot:top>  
                        <v-toolbar flat>
                            <v-toolbar-title>Products Inventory </v-toolbar-title>
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
                                <v-col cols="3" class="text-right hidden-md-and-down">
                                    <v-btn @click="abrirMov()" class="success">Inventory history</v-btn>
                                </v-col>
                                <v-col cols="3" class="text-right hidden-lg-and-up">
                                    <v-btn @click="abrirMov()" fab x-small color="success">
                                        <v-icon>mdi-list-box</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-dialog v-model="dialog" width="650">            
                                <v-card>
                                    <v-card-title>
                                        <span class="text-h5 mb-3">Inventory Entry</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col v-if="inclusao" cols="12">
                                                    <v-text-field
                                                        :rules="[required('Insert Amount')]"
                                                        v-model="qtdEntrada"
                                                        label="Insert Amount"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col v-if="inclusao" cols="12">
                                                    <v-text-field
                                                        :rules="[required('Value Entry')]"
                                                        v-model="vlr_unit"
                                                        label="Value Entry (Unit)"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col v-if="inclusao == false" cols="12">
                                                    <v-data-table
                                                        :headers="cabecalho2"
                                                        :items="estoque_mov"
                                                        :items-per-page="5"
                                                        class="elevation-1"
                                                    >
                                                        <template v-slot:item.data_inclusao="{ item }">
                                                            <v-chip>
                                                                {{ format(item.data_inclusao) }}
                                                            </v-chip>
                                                        </template>
                                                        <template v-slot:item.actions="{ item }">
                                                            <v-icon
                                                                small
                                                                class="mr-2 hidden-sm-and-down"
                                                                @click="deleteMovimentacao(item._id)"
                                                                color="orange darken-4"
                                                            >
                                                                mdi-delete-sweep
                                                            </v-icon>
                                                            <v-btn @click="deleteMovimentacao(item._id)" small class="orange darken-4 hidden-sm-and-up">Delete</v-btn>
                                                        </template>
                                                    </v-data-table>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="red darken-1" text @click="cancelar">
                                            Cancel
                                        </v-btn>
                                        <v-btn v-if="inclusao == true" color="green darken-1" text @click="salvarEntrada">
                                            Save
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
                            @click="addEntrada(item._id, item.cod_prod)"
                            color="orange darken-4"
                        >
                            mdi-storefront-plus
                        </v-icon>
                        <v-btn @click="addEntrada(item._id, item.cod_prod)" small class="orange darken-4 hidden-sm-and-up">Check in</v-btn>
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
import BanerBlock from '~/components/BanerBlock.vue';
import validacao from '@/utils/validacao';
export default {
    data() {
        return {
            overlay: false,
            inclusao: true,
            itens: "",
            estoques: "",
            saidas: "",
            movEstoque: "",
            pesquisa: "",
            dialog: false,
            chaveRender: 0,
            chaveRender2: 0,
            id_prod: '',
            cd_prod:'',
            cabecalho: [
                {
                    text: "Product name",
                    align: "start",
                    sortable: false,
                    value: "titulo",
                },
                { text: "Product Code", value: "cod_prod" },
                { text: "Type", value: "tipo" },
                { text: "Material", value: "material" },
                { text: "Stone", value: "pedra" },
                { text: "Sale Value", value: "preco" },
                { text: "Purchase Amount", value: "valor_compra" },
                { text: "Inventory Number", value: "inventory" },
                { text: "Actions", value: "actions", sortable: false },
            ],
            cabecalho2: [
                {
                    text: "Date insert",
                    align: "start",
                    sortable: false,
                    value: "data_inclusao",
                },
                { text: "Prod Code", value: "cod_prod" },
                { text: "Quantity", value: "qtd" },
                { text: "Unit Value", value: "vlr_unidade" },
                { text: "Actions", value: "actions", sortable: false },

            ],
            qtdEntrada: "",
            vlr_unit: "",
            ...validacao
        }
    },

    methods: {
        renderTabela(){
            this.chaveRender += 1;
            this.chaveRender2 += 1;
        },

        async getEstoque(){
            if (this.$auth.loggedIn) {
                await this.$axios
                      .get("/estoque/estoques")
                      .then((response) => (this.estoques = response.data));
            }
            if (this.$auth.loggedIn) {
                await this.$axios
                      .get("/estoque/saidas")
                      .then((response) => (this.saidas = response.data));
            } 
        },

        async getItens() {
            if (this.$auth.loggedIn) {
                await this.$axios
                      .get("/item/bucarItens")
                      .then((response) => (this.itens = response.data));
            }
        },

        async getMovEstoque(){
          if (this.$auth.loggedIn) {
                await this.$axios
                      .get("/estoque/estoquesMov")
                      .then((response) => (this.movEstoque = response.data));
            }
        },

        async salvarEntrada() {
          if(this.qtdEntrada == "" || this.vlr_unit == "") {
            this.$notifier.showMessage({
                content: "There is/are required fields in blank. Please fill them",
                color: "red",
                time: 4000
            });
          }else{
            await this.$axios
                       .post(`/estoque/addEstoque`, {
                            id_produto: this.id_prod,
                            cod_prod: this.cd_prod,
                            vlr_unidade: this.vlr_unit,
                            qtd: this.qtdEntrada,
                            tipo: 0 })
                        .then((response) => {
                            console.log("Success");
                            this.carregarTabela();
                            this.limparDados();
                            this.dialog = false; })
                        .catch((error) => {
                            console.log(error) });
          }                   
        },

        cancelar() {
            this.dialog = false;
            this.limparDados();
        },

        addEntrada(id, cd) {
            this.inclusao = true;
            this.id_prod = id;
            this.cd_prod = cd;
            this.dialog = true;
        },

        async inventorio(){
           for(let i = 0; i < this.itens.length; i++){
                for(let x = 0; x < this.estoques.length; x++){
                    if(this.itens[i]._id.toString() == this.estoques[x].id){
                        this.itens[i].inventory = this.estoques[x].qtd == null? 0 : this.estoques[x].qtd;
                        for(let y =0; y < this.saidas.length; y++){
                            if(this.itens[i]._id.toString() == this.saidas[y].id){
                                let s = this.saidas[y].qtd == null? 0 : this.saidas[y].qtd;
                                this.itens[i].inventory = this.itens[i].inventory - s;
                            } 
                        }
                    }
                }
            }
        },

        limparDados(){
            this.qtdEntrada = '';
            this.vlr_unit = '';
            this.id_prod = '';
            this.cd_prod = '';
        },

        async carregarTabela(){
            await this.getItens();
            await this.getEstoque();
            await this.inventorio();
            await this.getMovEstoque();
            this.renderTabela();
        },

        getColor (inventory) {
            if (inventory == 1) return 'red'
            else if (inventory > 1 && inventory <= 3) return 'orange'
            else if (inventory == null || inventory == 0) return 'grey'
            else return 'green'
        },

        async abrirMov(){
            await this.getMovEstoque();
            this.inclusao = false;
            this.dialog = true;
        },

        async deleteMovimentacao(id){
            await this.$axios
                       .delete(`/estoque/deletar/${id}`)
                       .then((response) => {
                            console.log(response);
                            this.carregarTabela()
                            this.limparDados() });
        },

        format(data){
            const dt = new Date(data);
            let dia  = dt.getDate()
            let mes  = (dt.getMonth()+1);
            let ano  = dt.getFullYear();
            return `${dia}/${mes}/${ano}`;
        }
    },

    computed: {
        items_cad() {
            return Array.from(this.itens);
        },
        estoque_mov() {
            return Array.from(this.movEstoque);
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
        this.overlay = true;
        await this.getItens();
        await this.getEstoque();
        await this.inventorio();
        await this.getMovEstoque();
        this.renderTabela();
    },

    components: { BanerBlock }
};
</script>      
