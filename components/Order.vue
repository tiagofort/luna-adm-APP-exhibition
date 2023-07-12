<template>
    <v-container>
                <v-row v-if="!$auth.loggedIn">
                    <v-col>
                        <BanerBlock />
                    </v-col>
                </v-row>
                <v-row v-if="$auth.loggedIn">
                        <v-col :cols="getCols">
                            <Strong><div class="text-letf">Orders</div></Strong>
                            <v-card height="700" class="auto-mx mt-2 pa-2 overflow-y-auto">
                                <v-card-title>
                                    <v-checkbox @change="filtrar()" v-model="filtro" label="Pending" value="0"></v-checkbox>
                                    <v-checkbox @change="filtrar()" v-model="filtro" class="ml-2" label="Finished" value="1"></v-checkbox>
                                    <v-checkbox @change="filtrar()" v-model="filtro" class="ml-2" label="Canceled" value="2"></v-checkbox>
                                </v-card-title>
                                <div v-if="pedidos.length == 0" class="text-center">
                                    <strong><p>There is no Orders yet</p></strong>
                                </div>
                                <div v-if="pedidos.length > 0">
                                    <v-list three-line>
                                            <v-sheet
                                                v-for="(item) in getListPedidos"
                                                :key="item._id"
                                                :color="getColor(item.status)"
                                                class="pa-2 ml-1 mr-1 mb-1"
                                            >
                                                <a @click="details(item.id_pedido)">
                                                    <v-list-item>
                                                        <v-list-item-avatar>
                                                            <v-img :src="item.img1"></v-img>
                                                        </v-list-item-avatar>

                                                        <v-list-item-content>
                                                            <v-list-item-title>Product: {{item.produto}} - {{item.tipo}}</v-list-item-title>
                                                            <v-list-item-title>Customer: {{ item.nome_remetente }}</v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </a> 
                                            </v-sheet>
                                    </v-list>
                                </div>
                            </v-card>
                        </v-col>
                        <v-col :cols="getCols">
                            <Strong><div class="text-letf">Order detail</div></Strong>
                            <v-card height="auto" class="mt-2">
                                <div v-if="item_detail.length == 0" class="text-center">
                                    <strong><p>Select by clicking an order on Orders to see more details</p></strong>
                                </div>
                                <div v-if="item_detail.length > 0">
                                    <v-card-title>{{ item_detail[0].titulo }}</v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-subtitle class="text-decoration-underline">Product Details:</v-card-subtitle>
                                    <v-card-text>
                                                <v-row>
                                                        <v-col>
                                                            <strong>Product code:</strong>{{ item_detail[0].cod_prod }} 
                                                        </v-col>
                                                        <v-col>
                                                            <v-avatar>
                                                                <img
                                                                    :src="item_detail[0].img1"
                                                                >
                                                            </v-avatar>
                                                        </v-col>
                                                </v-row>
                                                <v-row>
                                                        <v-col :cols="getColsDetails">
                                                            <strong>Product:</strong> {{ item_detail[0].produto }}  
                                                        </v-col>
                                                        <v-col :cols="getColsDetails">
                                                            <strong>Type:</strong> {{ item_detail[0].tipo }}  
                                                        </v-col>
                                                        <v-col :cols="getColsDetails">
                                                            <strong>Stone:</strong> {{ item_detail[0].pedra }}  
                                                        </v-col>
                                                        <v-col>
                                                            <strong>Material:</strong> {{ item_detail[0].material }}  
                                                        </v-col>
                                                        <v-col>
                                                            <strong>Price:</strong> {{ item_detail[0].preco }}€  
                                                        </v-col>
                                                </v-row>
                                                <v-divider></v-divider>
                                    </v-card-text>
                                    <v-card-subtitle class="mt-2 text-decoration-underline">Customer Details:</v-card-subtitle>
                                    <v-card-text>
                                                <v-row>
                                                    <v-col>
                                                        <strong>Customer name: </strong>{{ item_detail[0].nome_remetente }} 
                                                    </v-col>
                                                    <v-col>
                                                        <v-avatar>
                                                            <img
                                                                :src="item_detail[0].avatar"
                                                            >
                                                        </v-avatar>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                        <v-col :cols="getColsDetails">
                                                            <strong>Email:</strong> {{ item_detail[0].email }}  
                                                        </v-col>
                                                        <v-col :cols="getColsDetails">
                                                            <strong>Phone number:</strong> {{ item_detail[0].phone }}  
                                                        </v-col>
                                                </v-row>
                                    </v-card-text>
                                    <v-divider></v-divider>
                                    <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <div class="hidden-sm-and-down">
                                                <v-btn
                                                    v-if="item_detail[0].status == 0"
                                                    color="green"
                                                    class=" mt-1"
                                                    @click="markDone()"
                                                >
                                                    Make as done
                                                </v-btn>
                                                <v-btn
                                                    v-if="item_detail[0].status == 1 || item_detail[0].status == 2"
                                                    color="yellow"
                                                    class=" mt-1"
                                                    @click="reopen()"
                                                >
                                                    Reopen
                                                </v-btn>
                                                <v-btn
                                                    v-if="item_detail[0].status != 2 && item_detail[0].status != 1"
                                                    color="red"
                                                    class=" mt-1"
                                                    @click="cancel()"
                                                >
                                                    Cancel order
                                                </v-btn>
                                            </div>
                                            <div class="hidden-sm-and-up">
                                                <v-btn fab small dark icon color="green" v-if="item_detail[0].status == 0" @click="markDone()">
                                                    <v-icon dark>mdi-check-circle</v-icon>
                                                </v-btn>
                                                <v-btn fab small dark icon color="yellow" v-if="item_detail[0].status == 1 || item_detail[0].status == 2" @click="reopen()">
                                                    <v-icon dark>mdi-autorenew</v-icon>
                                                </v-btn>
                                                <v-btn fab small dark icon color="red"  v-if="item_detail[0].status != 2 && item_detail[0].status != 1">
                                                    <v-icon dark>mdi-close-octagon</v-icon>
                                                </v-btn>
                                            </div>
                                    </v-card-actions>
                                </div>
                            </v-card>
                        </v-col>
                </v-row>
    </v-container>
</template>

<script>
import BanerBlock from '@/components/BanerBlock.vue';
export default {
    data () {
      return {
        pedidos: [],
        bkp_pedidos: [],
        item_detail: [],
        filtro: '',
        model: 1
      }
    },

    methods: { 
      
        async getPedidos(){
        if (this.$auth.loggedIn) {
            await this.$axios
                  .get('/pedido/buscar_todos')
                  .then((response) => {
                      this.pedidos = response.data;
                      this.bkp_pedidos = response.data;
            });
        }
      },

      async markDone(){
        await this.$axios
            .$put(`/pedido/status/${this.item_detail[0].id_pedido}/1`)
            .then(() => {
                this.getPedidos();
                this.details(this.item_detail[0].id_pedido);
                this.item_detail[0].status = 1;
            }).catch((error) => {
                console.log(error);
            });    
      },

      async reopen(){
        await this.$axios
            .$put(`/pedido/status/${this.item_detail[0].id_pedido}/0`)
            .then(() => {
                this.getPedidos();
                this.details(this.item_detail[0].id_pedido);
                this.item_detail[0].status = 0;
            }).catch((error) => {
                console.log(error);
            });
      },

      async cancel(){
        await this.$axios
            .$put(`/pedido/status/${this.item_detail[0].id_pedido}/2`)
            .then(() => {
                this.getPedidos();
                this.details(this.item_detail[0].id_pedido);
                this.item_detail[0].status = 2;
            }).catch((error) => {
                console.log(error);
            });
      },

      details(id){
        this.item_detail = [];
        this.item_detail = this.bkp_pedidos.filter((number) => number.id_pedido == id);
      },

      getColor(param){
        if(param == 0) 
            return "green lighten-2";
        if(param == 1)
            return "grey lighten-4";
        if(param == 2) 
            return "deep-orange lighten-3";
      },

      filtrar(){
        this.pedidos = this.bkp_pedidos;
        if(this.filtro === '0'){
            this.pedidos = this.pedidos.filter((item) => item.status == 0);
        }else if(this.filtro === '1'){
            this.pedidos = this.pedidos.filter((item) => item.status == 1);
        }else if(this.filtro === '2'){
            this.pedidos = this.pedidos.filter((item) => item.status == 2);
        }else if(this.filtro === null){
            this.pedidos = this.bkp_pedidos;
        }
      }
    },

    mounted () {
       this.getPedidos();
    },

    computed: {
        getCols(){
            return this.$vuetify.breakpoint.smAndDown? 12 : 6;
        },
        getColsDetails(){
            return this.$vuetify.breakpoint.smAndDown? 6 : 4;
        },
        getListPedidos(){
            return this.pedidos;
        },
    },
    
    components: { BanerBlock }
}
</script>

<style>
.card-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-actions {
  align-self: flex-end;
}

.border {
  border: 2px dashed orange;
}
</style>