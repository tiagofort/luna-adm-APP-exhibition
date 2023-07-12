<template>
        <v-row justify="center">
            <v-dialog
                v-model="dialog_suggest"
                fullscreen
                hide-overlay
                persistent
                transition="dialog-bottom-transition"
            >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            class="mt-4 white--text" color="green darken-3" small
                            v-bind="attrs"
                            v-on="on"
                        >
                            Manage Suggestions
                        </v-btn>
                    </template>
                    <v-card class="pa-5">
                        <v-toolbar
                            dark
                            color="grey lighten-3"
                        >
                            <v-btn
                                color="black"  
                                icon
                                dark
                                @click="dialog_suggest = false"
                            >
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                            <v-toolbar-title class="black--text">Managing Suggestions</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-items>
                                <v-btn
                                    class="black--text"
                                    dark
                                    text
                                    @click="save()"
                                >
                                    Save
                                </v-btn>
                            </v-toolbar-items>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <v-row class="pa-5 my-auto" justify="center" align="center">
                            <v-col :cols="getCols">
                                <v-card height="500" class="overflow-y-auto pa-3">
                                    <v-row>
                                        <v-col>
                                            <p class="text-left">Product Selected</p>
                                            <v-list three-line>
                                                <v-list-item>
                                                    <v-list-item-avatar>
                                                        <v-img :src="selecionado.mdia.pic1"></v-img>
                                                    </v-list-item-avatar>
                                                    <v-list-item-content>
                                                        <v-list-item-title>
                                                            {{ 
                                                               selecionado.txtTitulo + ' - ' + 
                                                               selecionado.txtSubtitulo + ' - ' + 
                                                               selecionado.txtPedra
                                                            }}
                                                        </v-list-item-title>
                                                        <v-list-item-subtitle>
                                                            {{ 
                                                                selecionado.txtCod_prod 
                                                            }}
                                                        </v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </v-list-item>
                                            </v-list>
                                            <v-divider class="mb-3"></v-divider>
                                            <v-item-group mandatory>
                                                <v-row>
                                                    <v-col
                                                        v-for="sugestao in getSugestoes"
                                                        :key="sugestao._id"
                                                        class="d-flex child-flex"
                                                        cols="4"
                                                    >
                                                        <v-item v-slot="{ active, toggle }">
                                                            <a @click="selectingSugestao(sugestao._id)">
                                                                <v-img
                                                                    class="d-flex align-center"
                                                                    contain
                                                                    max-width="100"
                                                                    height="130"
                                                                    :src="sugestao.midia.url1"
                                                                    @click="toggle"
                                                                >
                                                                    <v-scroll-y-transition>
                                                                        <div
                                                                            v-if="active"
                                                                            class="text-subtitle-2 flex-grow-1 text-center white--text"
                                                                        >
                                                                            <div class="selected">Selected</div>
                                                                        </div>
                                                                    </v-scroll-y-transition>
                                                                </v-img>
                                                            </a>
                                                        </v-item>
                                                    </v-col>
                                                </v-row>
                                            </v-item-group>        
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                            <v-col :cols="getColArrow" class="mx-auto ma-n1">
                                <v-card
                                    class="d-flex align-center mb-6"
                                    color="white"
                                    flat
                                    tile
                                >
                                    <v-sheet class="mx-auto text-center hidden-sm-and-down" color="white">
                                        <v-row class="mt-10">
                                            <v-col>
                                                <v-btn fab dark @click="removerSugest(selected_sugestao)">
                                                    <v-icon dark>
                                                        mdi-arrow-right-bold
                                                    </v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-btn fab dark @click="inserirSugest(selected_item)">
                                                    <v-icon dark>
                                                        mdi-arrow-left-bold
                                                    </v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-sheet>
                                    <v-sheet class="hidden-sm-and-up" color="white">
                                        <v-row class="mt-2">
                                            <v-col cols="6">
                                                <v-btn fab dark @click="inserirSugest(selected_item)">
                                                    <v-icon dark>
                                                        mdi-arrow-up-bold-circle
                                                    </v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-btn fab dark @click="removerSugest(selected_sugestao)">
                                                    <v-icon dark>
                                                        mdi-arrow-down-bold-circle
                                                    </v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-sheet>
                                </v-card>
                            </v-col>
                            <v-col :cols="getCols">
                                <v-card height="500" class="overflow-y-auto pa-3">
                                    <v-item-group mandatory>
                                                <v-row>
                                                        <v-col
                                                            v-for="item in getListItens"
                                                            :key="item._id"
                                                            class="d-flex child-flex"
                                                            cols="3"
                                                        >
                                                                <v-item v-slot="{ active, toggle }">
                                                                        <a @click="selectingItens(item._id)">
                                                                            <v-img
                                                                                class="d-flex align-center"
                                                                                contain
                                                                                max-width="100"
                                                                                height="130"
                                                                                :src="item.midia.url1"
                                                                                @click="toggle"
                                                                            >
                                                                                <v-scroll-y-transition>
                                                                                    <div
                                                                                        v-if="active"
                                                                                        class="text-subtitle-2 flex-grow-1 text-center white--text"
                                                                                    >
                                                                                        <div class="selected">Selected</div>
                                                                                    </div>
                                                                                </v-scroll-y-transition>
                                                                            </v-img>
                                                                        </a>
                                                                </v-item>
                                                        </v-col>
                                                </v-row>
                                    </v-item-group>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card>
            </v-dialog>
        </v-row>
  </template>

<script>
export default {
  data () {
    return {
      dialog_suggest: false,
      sugestoes: [],
      selected_sugestao: [],
      selected_item: []   
    }
  },

  methods: {
    fecharDialog(){
        this.dialog_suggest = false;
    },
    selectingItens(id){
       this.selected_item = id; 
    },
    selectingSugestao(id){ 
       this.selected_sugestao = id;
    },
    save(){
        this.dialog_suggest = false;
        this.salvarAlteracoes();
    },
  },

  computed: {
    getCols(){
        return this.$vuetify.breakpoint.smAndDown? 12 : 5;
    },
    getColArrow(){
        return this.$vuetify.breakpoint.smAndDown? 5 : 1;
    },
    getListItens(){
        return this.tdos_itens;
    },
    getSugestoes(){
        this.sugestoes = this.tdasugestoes;
        return this.sugestoes;
    },
  },

  props: [ 
    "selecionado", 
    "tdasugestoes", 
    "tdos_itens", 
    "removerSugest", 
    "inserirSugest", 
    "fechaSugestao", 
    "salvarAlteracoes"
  ],
}
</script>

<style>
.selected {
   background-color: #080808;
}
</style>