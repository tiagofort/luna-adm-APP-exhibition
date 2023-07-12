<template>
    <v-container>
        <v-overlay :value="overlay">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>
        <BanerBlock v-if="!$auth.loggedIn" />
        <v-row class="mt-4" v-if="$auth.loggedIn">
            <v-col class="pr-0">
                <v-card
                    class="mt-4 mx-auto grey lighten-3"
                    width="800"
                >
                    <v-sheet
                        class="v-sheet--offset mx-auto"
                        color="cyan"
                        elevation="12"
                        max-width="calc(100% - 32px)"
                    >
                        <v-sparkline
                            :labels="produtos_qtd"
                            :value="valores_qtd"
                            :gradient="gradient"
                            line-width="2"
                            stroke-linecap="round"
                            smooth="10"
                            padding="10"
                            type="bar"
                            class="white--text"
                            label-size="6"
                        ></v-sparkline>
                    </v-sheet>
                    <v-card-text class="pt-0">
                        <div class="text-h6 font-weight-light mb-2">
                            Top 4 selling products / Quantity
                        </div>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn
                            block
                            text
                            class="cyan white--text"
                            @click="abrirDetalhes(1)"
                        >
                           Details
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col class="pr-0 ml-0">
                <v-card
                    class="mt-4 mx-auto mt-2 grey lighten-3"
                    width="800"
                >
                    <v-sheet
                        class="v-sheet--offset mx-auto"
                        color="cyan"
                        elevation="12"
                        max-width="calc(100% - 32px)"
                    >
                        <v-sparkline
                            :labels="produtos_total"
                            :value="valores_total"
                            :gradient="gradient"
                            line-width="2"
                            stroke-linecap="round"
                            smooth="10"
                            padding="10"
                            type="bar"
                            class="white--text"
                            label-size="6"
                        ></v-sparkline>
                    </v-sheet>
                    <v-card-text class="pt-0">
                        <div class="text-h6 font-weight-light mb-2">
                            Top 4 selling products / Total
                        </div>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn
                            block
                            text
                            class="cyan white--text"
                            @click="abrirDetalhes(2)"
                        >
                           Details
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
            <v-dialog
                v-model="dialog"
                persistent
                width="800"
            >
                <v-card>
                    <v-card-title>
                        <span class="text-h6">{{tituloDialog}}</span>
                        <v-spacer></v-spacer>
                        <v-btn @click="imprimirExcel()" class="mr-2 success hidden-sm-and-down" small>Export Excel</v-btn>
                        <v-btn @click="imprimirExcel()" class="mr-2 success hidden-sm-and-up" small><v-icon>mdi-microsoft-excel</v-icon></v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-data-table
                                :headers="cabecalho"
                                :items="selecionado"
                                :items-per-page="5"
                                class="elevation-1"
                            ></v-data-table>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="red darken-1"
                            text
                            @click="dialog = false"
                        >
                            Close
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        <v-divider class="mt-5 mb-3"></v-divider>    
        <v-row class="mt-4" v-if="$auth.loggedIn">
            <v-col class="pr-0">
                <v-card
                    class="mt-4 mx-auto mt-2 grey lighten-3"
                    width="800"
                >
                    <v-sheet
                        class="v-sheet--offset mx-auto"
                        color="cyan"
                        elevation="12"
                        max-width="calc(100% - 32px)"
                    >
                        <v-sparkline
                            :labels="cli_qtd"
                            :value="qtd_cli"
                            :gradient="gradient"
                            line-width="2"
                            stroke-linecap="round"
                            smooth="10"
                            padding="10"
                            type="bar"
                            class="white--text"
                            label-size="6"
                        ></v-sparkline>
                    </v-sheet>
                    <v-card-text class="pt-0">
                        <div class="text-h6 font-weight-light mb-2">
                            Top 4 selling Customers / Quantity
                        </div>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn
                            block
                            text
                            class="cyan white--text"
                            @click="abrirDetalhes(3)"
                        >
                           Details
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col>
                <v-card
                    class="mt-4 mx-auto mt-2 grey lighten-3"
                    width="800"
                >
                    <v-sheet
                        class="v-sheet--offset mx-auto"
                        color="cyan"
                        elevation="12"
                        max-width="calc(100% - 32px)"
                    >
                        <v-sparkline
                            :labels="cli_total"
                            :value="total_cli"
                            :gradient="gradient"
                            line-width="2"
                            stroke-linecap="round"
                            smooth="10"
                            padding="10"
                            type="bar"
                            class="white--text"
                            label-size="6"
                        ></v-sparkline>
                    </v-sheet>
                    <v-card-text class="pt-0">
                        <div class="text-h6 font-weight-light mb-2">
                            Top 4 selling Customers / Total
                        </div>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn
                            block
                            text
                            class="cyan white--text"
                            @click="abrirDetalhes(4)"
                        >
                           Details
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-if="$auth.loggedIn">
            <v-col>
                <v-card
                    class="mt-4 mx-auto mt-2 grey lighten-3"
                    width="800"
                >
                    <v-sheet
                        class="v-sheet--offset mx-auto"
                        color="cyan"
                        elevation="12"
                        max-width="calc(100% - 32px)"
                    >
                        <v-sparkline
                            :labels="produto_lucro"
                            :value="lucro_total"
                            :gradient="gradient"
                            line-width="2"
                            stroke-linecap="round"
                            smooth="10"
                            padding="10"
                            type="bar"
                            class="white--text"
                            label-size="6"
                        ></v-sparkline>
                    </v-sheet>
                    <v-card-text class="pt-0">
                        <div class="text-h6 font-weight-light mb-2">
                            Top 4 product profit
                        </div>
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn
                            block
                            text
                            class="cyan white--text"
                            @click="abrirDetalhes(5)"
                        >
                           Details
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import BannerBlock from '@/components/BanerBlock.vue';
import fileDownload from 'js-file-download';
export default {
    data: () => ({
        dialog: false,
        tituloDialog: "",
        controle: 0,
        selecionado: [],
        topVendaProdutoQtd: [],
        topVendaProdutoTotal: [],
        produtos_qtd: [],
        valores_qtd: [],
        produtos_total: [],
        valores_total: [],
        topVendaClieQtd: [],
        topVendaClieTotal: [],
        cli_qtd: [],
        qtd_cli: [],
        cli_total: [],
        total_cli: [],
        topProdLucro:[],
        produto_lucro:[],
        lucro_total: [],
        cabecalho: [],
        overlay: false,
        gradient: ['green', 'orange', 'red'], 
    }),

    methods: {

        topVendaProdQtd() {
            if (this.$auth.loggedIn) {
            this.$axios.get(`/venda/topProdQtd/0`).then((response) => {
                this.topVendaProdutoQtd = response.data;
                this.converterGraficoProd_qtd();
            });
            }
        },

        topVendaProdTotal() {
            if (this.$auth.loggedIn) {
            this.$axios.get(`/venda/topProdTotal/0`).then((response) => {
                this.topVendaProdutoTotal = response.data;
                this.converterGraficoProd_total();
            });
            }
        },

        topProdutoLucro() {
            if (this.$auth.loggedIn) {
            this.$axios.get(`/venda/topProdLucro/0`).then((response) => {
                this.topProdLucro = response.data;
                this.converterGraficoLucro();
            });
            }
        },

        topVendaClienteQtd() {
            if (this.$auth.loggedIn) {
            this.$axios.get(`/venda/topClienteQtd/0`).then((response) => {
                this.topVendaClieQtd = response.data;
                this.converterGraficoCli_qtd();
            });
            }
        },

        topVendaClienteTotal() {
            if (this.$auth.loggedIn) {
            this.$axios.get(`/venda/topClienteTotal/0`).then((response) => {
                this.topVendaClieTotal = response.data;
                this.converterGraficoCli_total();
            });
            }
        },

        converterGraficoProd_qtd(){
            Object.keys(this.topVendaProdutoQtd.slice(0,4)).forEach((i) => {
                this.produtos_qtd.push(this.topVendaProdutoQtd[i].item+' : '+this.topVendaProdutoQtd[i].qtd_vendida);
                this.valores_qtd.push(this.topVendaProdutoQtd[i].qtd_vendida);
            })
        },

        converterGraficoProd_total(){
            Object.keys(this.topVendaProdutoTotal.slice(0,4)).forEach((i) => {
                this.produtos_total.push(this.topVendaProdutoTotal[i].item+' :  €'+this.topVendaProdutoTotal[i].qtd_total);
                this.valores_total.push(this.topVendaProdutoTotal[i].qtd_total);
            })
        },

        converterGraficoLucro(){
            Object.keys(this.topProdLucro.slice(0,4)).forEach((i) => {
                this.produto_lucro.push(this.topProdLucro[i].item+' :  €'+this.topProdLucro[i].lucro);
                this.lucro_total.push(this.topProdLucro[i].lucro);
            })
        },

        converterGraficoCli_qtd(){
            Object.keys(this.topVendaClieQtd.slice(0,4)).forEach((i) => {
                this.cli_qtd.push(this.topVendaClieQtd[i].nome+' : '+this.topVendaClieQtd[i].qtd_vendida);
                this.qtd_cli.push(this.topVendaClieQtd[i].qtd_vendida);
            })
        },

        converterGraficoCli_total(){
            Object.keys(this.topVendaClieTotal.slice(0,4)).forEach((i) => {
                this.cli_total.push(this.topVendaClieTotal[i].nome+' : €'+this.topVendaClieTotal[i].qtd_total);
                this.total_cli.push(this.topVendaClieTotal[i].qtd_total);
            })
        },

        abrirDetalhes(ref){
            if(ref == 1){
                this.dialog = true;
                this.controle = 1;
                this.tituloDialog = "Product details per Quantity";
                this.selecionado = this.topVendaProdutoQtd;
                this.cabecalho = [
                    {
                        text: 'Product Code',
                        align: 'start',
                        sortable: false,
                        value: 'cod_prod',
                    },
                    { text: 'Product', value: 'item' },
                    { text: 'Stone', value: 'pedra' },
                    { text: 'Type', value: 'tipo' },
                    { text: 'Material', value: 'material' },
                    { text: 'Quantity', value: 'qtd_vendida' },
                ];

            }else if(ref == 2){
                this.dialog = true;
                this.controle = 2;
                this.tituloDialog = "Product details per Total";
                this.selecionado = this.topVendaProdutoTotal;
                this.cabecalho = [
                    {
                        text: 'Product Code',
                        align: 'start',
                        sortable: false,
                        value: 'cod_prod',
                    },
                    { text: 'Product', value: 'item' },
                    { text: 'Stone', value: 'pedra' },
                    { text: 'Type', value: 'tipo' },
                    { text: 'Material', value: 'material' },
                    { text: 'Total €', value: 'qtd_total' },
                ];
            }else if (ref == 3){
                this.dialog = true;
                this.controle = 3;
                this.tituloDialog = "Customer details per Quantity";
                this.selecionado = this.topVendaClieQtd;
                this.cabecalho = [
                    {
                        text: 'Name',
                        align: 'start',
                        sortable: false,
                        value: 'nome',
                    },
                    { text: 'Surname', value: 'sobrenome' },
                    { text: 'Email', value: 'email' },
                    { text: 'Quantity', value: 'qtd_vendida' },
                ];
            }else if(ref == 4){
                this.dialog = true;
                this.controle = 4;
                this.tituloDialog = "Customer details per Total";
                this.selecionado = this.topVendaClieTotal;
                this.cabecalho = [
                    {
                        text: 'Name',
                        align: 'start',
                        sortable: false,
                        value: 'nome',
                    },
                    { text: 'Surname', value: 'sobrenome' },
                    { text: 'Email', value: 'email' },
                    { text: 'Total €', value: 'qtd_total' },
                ];
            }else if (ref == 5){
                this.dialog = true;
                this.controle = 5;
                this.tituloDialog = "Product details per Profit";
                this.selecionado = this.topProdLucro;
                this.cabecalho = [
                    {
                        text: 'Product Code',
                        align: 'start',
                        sortable: false,
                        value: 'cod_prod',
                    },
                    { text: 'Product', value: 'item' },
                    { text: 'Stone', value: 'pedra' },
                    { text: 'Type', value: 'tipo' },
                    { text: 'Material', value: 'material' },
                    { text: 'Sale value', value: 'vlr_venda' },
                    { text: 'purchase Price', value: 'vlr_compra' },
                    { text: 'Profit', value: 'lucro' },
                ];
            }
        },

        imprimirExcel(){
            if(this.controle == 1){
                if (this.$auth.loggedIn) {
                    this.$axios.get('/venda/topProdQtd/1', {
                        responseType: 'blob',
                    }).then(res => {
                        fileDownload(res.data, 'Mais_Vendidos_Produtos_QTD.xlsx');
                    });   
                }
            }else if(this.controle == 2){
                if (this.$auth.loggedIn) {
                    this.$axios.get('/venda/topProdTotal/1', {
                        responseType: 'blob',
                    }).then(res => {
                        fileDownload(res.data, 'Mais_Vendidos_Produtos_TOTAL.xlsx');
                    });   
                }
            }else if(this.controle == 3){
                if (this.$auth.loggedIn) {
                    this.$axios.get('/venda/topClienteQtd/1', {
                        responseType: 'blob',
                    }).then(res => {
                        fileDownload(res.data, 'Mais_Vendidos_Clientes_QTD.xlsx');
                    });   
                }
            }else if(this.controle == 4){
                if (this.$auth.loggedIn) {
                    this.$axios.get('/venda/topClienteTotal/1', {
                        responseType: 'blob',
                    }).then(res => {
                        fileDownload(res.data, 'Mais_Vendidos_Clientes_Total.xlsx');
                    });   
                }
            }else if (this.controle == 5){
                if (this.$auth.loggedIn) {
                    this.$axios.get('/venda/topProdLucro/1', {
                        responseType: 'blob',
                    }).then(res => {
                        fileDownload(res.data, 'Top_Lucro_Produtos.xlsx');
                    });   
                }
            }
        }    
    },

    mounted() {
      this.overlay = true;  
      this.topVendaProdQtd();
      this.topVendaProdTotal();
      this.topProdutoLucro();
      this.topVendaClienteQtd();
      this.topVendaClienteTotal();
    },

    watch: {
      overlay(val) {
        val &&
          setTimeout(() => {
            this.overlay = false;
          }, 1000);
      },
    },

    components: {BannerBlock}
}
</script>

<style>
.v-sheet--offset {
    top: -24px;
    position: relative;
}
</style>