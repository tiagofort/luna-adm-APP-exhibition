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
                <v-container v-if="$auth.loggedIn">
                    <v-row class="mb-2" no-gutters>
                        <v-col></v-col>
                        <v-col align-self="center">
                            <v-menu
                                v-model="showMenu"
                                absolute
                                offset-y
                                style="max-width: 600px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <div v-bind="attrs" v-on="on" width="700" height="500" class="pa-4 primary rounded-lg">
                                    <v-card tile class="primary">
                                        <v-img
                                            contain
                                            height="450"
                                            width="550"
                                            :src="imgPrincipal"
                                        ></v-img>
                                    </v-card>
                                    </div>
                                </template>
                                <v-list max-width="150" class="white pa-0" v-for="(item, index) in items" :key="index">
                                    <v-list-item
                                        class="itemMenu"
                                        @click="btAcoes(item.title)"
                                    >
                                        <v-list-item-title class="black--text mt-n1 mb-n1"><span class="menu">{{item.title}}</span></v-list-item-title>  
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                            <v-dialog
                                v-model="dialog"
                                persistent
                                :max-width="dialogSize"
                            >
                                <v-card color="grey lighten-4" class="pa-4">
                                    <v-card-title class="text-h5 black--text"> {{tituloDialog}} </v-card-title>
                                    <v-card-text class="black--text"> {{textoDialog}} </v-card-text>
                                    <v-combobox
                                        v-model="pos_alterada"
                                        v-if="modoDelete == false && modoinsert == false"
                                        class="ma-3 something"
                                        :items="posicoes"
                                        label="Select the new position"
                                        outlined
                                        dense
                                    ></v-combobox>
                                            <v-autocomplete
                                                v-model="produto"
                                                :items="produtos"
                                                chips
                                                color="black--text"
                                                label="Select"
                                                item-text="_id"
                                                item-value="_id"
                                                class="pa-4 custom-color-two"
                                                v-if="modoDelete == false && modoEdit == false"
                                                @change="selecionarMidia"
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
                                            <v-row class="pa-5" >
                                                <v-col class="pa-0 avatar ml-2" v-for="(img,i) in midia" :key="i">
                                                    <v-avatar @click="selecionarIMG(img.url, i)" class="pa-0 ml-0" left>
                                                        <v-img class="pa-0" :src="img.url"></v-img>
                                                    </v-avatar>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col>
                                                    <v-chip
                                                        v-if="chipIMG"
                                                        class="ma-2"
                                                        close
                                                        color="Green"
                                                        text-color="black"
                                                        @click:close="fecharChip()"
                                                    >
                                                        {{chipTitulo}}
                                                    </v-chip>
                                                </v-col>
                                            </v-row>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    color="red darken-1"
                                                    text
                                                    @click="btCancelar()"
                                                >
                                                    {{btEsq}}
                                                </v-btn>
                                                <v-btn
                                                    color="green darken-1"
                                                    text
                                                    @click="btConfirmar()"
                                                >
                                                    {{btDir}}
                                                </v-btn>
                                            </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-col>
                        <v-col></v-col>
                    </v-row>
                </v-container>
                <v-row v-if="$auth.loggedIn">
                    <v-col cols="12">
                        <v-sheet
                            v-if="slides.length > 0"
                            class="mx-auto black--text"
                            color="white"
                            elevation="8"
                            max-width="800"
                        >
                            <v-slide-group
                                v-model="slide"
                                class="pa-4"
                                center-active
                                show-arrows
                            >
                                <v-slide-item
                                    v-for="n in slides"
                                    :key="n._id"
                                    v-slot="{ active, toggle }"
                                    @click="selecionarImagem(n.url, n._id, n.posicao)"
                                >
                                    <v-card
                                        :color="active ? 'primary' : 'grey lighten-5'"
                                        class="ma-4"
                                        height="110"
                                        width="110"
                                        @click="toggle"
                                        v-on:click="selecionarImagem(n.url, n._id, n.posicao)"
                                    >
                                        <v-row
                                            class="fill-height"
                                            align="center"
                                            justify="center"
                                        >
                                            <v-scale-transition>
                                                <v-img contain class="mt-4"  max-height="100" max-width="80" :src="n.url"></v-img>
                                            </v-scale-transition>
                                        </v-row>
                                    </v-card>
                                </v-slide-item>
                            </v-slide-group>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import validacao from "~/utils/validacao";
import BanerBlock from "@/components/BanerBlock.vue";
import noimg from '@/static/utilities/insertPicture.png';
export default {
  data() {
        return {
          ...validacao,
          overlay: false,
          slide: null,
          slides: [],
          posicoes: [],
          imgPrincipal: "",
          produtos: [],
          midia: [],
          imagem: "",
          id_ImgPrincipal: "",
          posicao: "",
          pos_alterada: "",
          produto: "",
          url_selecionada:"",
          chipTitulo: "",
          chipIMG: false,
          showMenu: false,
          dialog: false,
          tituloDialog: "",
          textoDialog:"",
          btEsq: "",
          btDir: "",
          modoDelete: false,
          modoinsert: false,
          modoEdit: false,
          dialogSize: 320,
          chaveReder: 0,
          chaverender2: 0,
          items: [{ title: 'Insert' },{ title: 'Change Position' },{ title: 'Delete' }],
        }
  },
  methods: {
   async renderPagina(){
     await this.getSlides();
     this.chaveReder += 1;
   }, 
   renderimgs(){
    this.chaverender2 += 1;
   },
  async getSlides(){
    if (this.$auth.loggedIn) {
                await this.$axios
                    .get("/slide/buscarSlides")
                    .then((response) => {
                        this.slides = response.data;
                        console.log('slides: '+ this.slides.length)
                        if(this.slides.length > 0){
                            this.imgPrincipal = this.slides[0].url;
                            this.id_ImgPrincipal = this.slides[0]._id;
                            this.posicao = this.slides[0].posicao;
                        }else{
                            this.imgPrincipal = noimg;
                        }
                            
                    });
            }
    },
    async getItens() {
            if (this.$auth.loggedIn) {
                await this.$axios
                    .get("/item/bucarItens")
                    .then((response) => (this.produtos = response.data));
            }
    },
    async deletarSlide(){
      await this.$axios
                            .delete(`/slide/deletarSlide/${this.id_ImgPrincipal}`)
                            .then((response) => {
                               console.log(response);
                               this.renderPagina();
                               this.limparDados();
                               this.organizarPosicao();
                               this.dialog = false;
                               this.$notifier.showMessage({
                                content: "The slide has been deleted",
                                color: "green",
                                time: 3000
                              });
                            });
    },
    async organizarPosicao(){  
    await this.$axios
                            .$post(`/slide/organizarSlide`, {
                               pos: this.posicao
                            })
                            .then((response) => {
                              console.log("Success");
                            })
                            .catch((error) => {
                              console.log(error);
                            });
    },
    async editarPoisicao(){
      let parametro = this.posicao +'-'+ this.pos_alterada;
      await this.$axios
                            .$put(`/slide/editarPosicao/${parametro}`, {
                              
                            })
                            .then((response) => {
                              console.log("Success");
                              this.renderPagina();
                              this.limparDados();
                              this.dialog = false;
                              this.$notifier.showMessage({
                                content: "The position has been changed",
                                color: "green",
                                time: 3000
                              });
                            })
                            .catch((error) => {
                              console.log(error);
                            });
       
    },
    async inserirSlide(){
      await this.$axios
                            .$post(`/slide/addSlide`, {
                              url: this.url_selecionada,
                              id_produto: this.produto,
                              ativo: true,
                              posicao: ""
                            })
                            .then((response) => {
                              this.renderPagina();
                              this.limparDados();
                              this.dialog = false;
                              this.$notifier.showMessage({
                                content: "The slide has been inserted",
                                color: "green",
                                time: 3000
                              });
                            })
                            .catch((error) => {
                              console.log(error);
                            });
    },
    selecionarImagem(url, id, pos){
      this.imgPrincipal = url;
      this.id_ImgPrincipal = id;
      this.posicao = pos;
    },
    limparDados(){
      this.midia = [];
      this.produto = "";
      this.chipIMG = false;
      this.chipTitulo = "";
      this.url_selecionada = "";
    },
    btAcoes(titulo){
      if( titulo == "Delete"){
          this.dialog = true;
          this.modoEdit = false;
          this.modoDelete = true;
          this.modoinsert = false;
          this.tituloDialog = "Deleting";
          this.textoDialog = "Are you sure you want to delete the selected Slide?"
          this.btDir = "YES";
          this.btEsq = "NO";
      }else if(titulo == "Change Position"){
          this.cbPosicoes();
          this.dialog = true;
          this.modoEdit = true;
          this.modoDelete = false;
          this.modoinsert = false;
          this.tituloDialog = "Editing Position";
          this.textoDialog = "Please, select the new position to the slide selected!"
          this.btDir = "Save";
          this.btEsq = "Cancel";
      }else if (titulo == "Insert"){
          this.dialogSize = 520
          this.dialog = true;
          this.modoEdit = false;
          this.modoDelete = false;
          this.modoinsert = true;
          this.tituloDialog = "Inserting a Slide";
          this.textoDialog = "Please, fill the form to complete"
          this.btDir = "Save";
          this.btEsq = "Cancel";
      }
    },
    btCancelar(){
      this.dialog= false;
      this.dialogSize = 320;
      this.limparDados();
    },
    async btConfirmar(){
      if(this.modoDelete == true){
          await this.deletarSlide();
      }else if (this.modoEdit == true){
          await this.editarPoisicao();
      }else if (this.modoinsert == true){
        if(this.url_selecionada == ""){
          this.$notifier.showMessage({
              content: "Image not selected. Please, click on one of the listed.",
              color: "red",
              time: 3000
          });
        }else{
          await this.inserirSlide();
        }  
      }
    },
    cbPosicoes(){
      this.pos_alterada = "";
      this.posicoes = [];
      let arr = [];
      for(let i = 0; i < this.slides.length; i ++){
        arr.push(i+1);  
      }
      arr.splice(this.posicao-1, 1);
      this.posicoes = arr;
    },
    selecionarMidia(){
      this.chipIMG = false;
      this.url_selecionada = "";
      this.chipTitulo = "";
      this.midia= [];
      let arr = [];
      console.log(this.produto)
       arr = this.produtos.find(element => element._id == this.produto);
       console.log(arr)
       this.midia.push({url: arr.midia.url1})
       this.midia.push({url: arr.midia.url2})
       this.midia.push({url: arr.midia.url3})
       this.midia.push({url: arr.midia.url4})
       this.midia.push({url: arr.midia.url5})
       this.midia.push({url: arr.midia.url6})
       this.renderimgs();
      
    },
    selecionarIMG(url, i){
      this.url_selecionada = url;
      this.chipIMG = true;
      this.chipTitulo = 'Imagem '+(i+1)+' selected';
    },
    fecharChip(){
      this.chipIMG = false;
      this.url_selecionada = "";
      this.chipTitulo = "";
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
    await this.getSlides();
    await this.getItens();
    this.overlay = true;
  },
  components: { BanerBlock }  
}

</script>

<style>
#linha-horizontal {
    width: 300px;
    border: 1px solid rgb(44, 44, 44);
}

.menu { 
    color: rgb(14, 14, 14); 
}

.itemMenu:hover { 
    background-color: rgb(75, 75, 75);
}

.itemMenu:hover .menu { 
    color: rgb(223, 223, 223);
}

.avatar { flex-grow: 0;}

</style>