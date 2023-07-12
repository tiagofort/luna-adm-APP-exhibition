<template>
    <v-container class="white mt-1" id="login-page">
        <v-overlay :value="overlay">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>
        <v-row>
            <v-col>
                <v-card elevation="18" class="mx-auto" max-width="100%" v-if="$auth.loggedIn">
                    <v-stepper v-model="e1" height="500">
                        <v-stepper-header>
                            <v-stepper-step :complete="e1 > 1" step="1">
                                Products Data
                            </v-stepper-step>
                                <v-divider></v-divider>
                            <v-stepper-step :complete="e1 > 2" step="2">
                                Products Complement
                            </v-stepper-step>
                                <v-divider></v-divider>
                            <v-stepper-step step="3"> 
                                Pictures 
                            </v-stepper-step>
                        </v-stepper-header>
                        <v-stepper-items>
                            <v-stepper-content step="1" class="grey lighten-4">
                                <v-card
                                    class="mb-2 overflow-y-auto"
                                    color="grey lighten-5"
                                    height="350px"
                                >
                                    <v-form :disabled="isDesabilitado">
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" xs="1" sm="6">
                                                    <v-text-field
                                                        v-model="dadosProd.txtTitulo"
                                                        counter="25"
                                                        hint="This field must be filled"
                                                        label="Tittle"
                                                        :rules="[required('Tittle')]"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" xs="1" sm="6">
                                                    <v-text-field
                                                        v-model="dadosProd.txtSubtitulo"
                                                        counter
                                                        maxlength="25"
                                                        hint="Optional"
                                                        label="Subtitle"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" xs="1" sm="6">
                                                    <v-combobox
                                                        v-model="dadosProd.txtTipo"
                                                        clearable
                                                        label="Select Type"
                                                        :rules="[required('Type')]"
                                                        :items="getTipos"
                                                    >
                                                    </v-combobox>
                                                </v-col>
                                                <v-col cols="12" xs="1" sm="6">
                                                    <v-combobox
                                                        v-model="dadosProd.txtMaterial"
                                                        clearable
                                                        label="Select Material"
                                                        :rules="[required('Material')]"
                                                        :items="getMateriais"
                                                    >
                                                    </v-combobox>
                                                </v-col>
                                                <v-col cols="12" xs="1" sm="6">
                                                    <v-combobox
                                                        v-model="dadosProd.txtPedra"
                                                        clearable
                                                        label="Select Stone"
                                                        :rules="[required('Stone')]"
                                                        :items="getPedras"
                                                    >
                                                    </v-combobox>
                                                </v-col>
                                                <v-col cols="12" xs="1" sm="6">
                                                    <v-text-field
                                                        v-model="dadosProd.txtPeso"
                                                        hint="Optional"
                                                        label="Weight"
                                                        suffix="grams"
                                                    >
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" xs="1" sm="6">
                                                    <v-combobox
                                                        v-model="dadosProd.txtSituacao"
                                                        clearable
                                                        label="Select Status"
                                                        :rules="[required('Status')]"
                                                        :items="this.situacao"
                                                    >
                                                    </v-combobox>
                                                </v-col>
                                                <v-col v-if="this.edicao == true || this.visualizacao == true" cols="12" xs="1" sm="6">
                                                    <v-text-field
                                                        disabled
                                                        v-model="dadosProd.txtCod_prod"
                                                        hint="Blocked"
                                                        label="Product Code"
                                                    >
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-form>
                                </v-card>
                                <v-btn color="primary" @click="e1 = e1 + 2"> Preview </v-btn>
                                <v-btn color="primary" @click="e1 = e1 + 1"> Next </v-btn>
                            </v-stepper-content>
                            <v-stepper-content step="2" class="grey lighten-4">
                                <v-card class="mb-2 overflow-y-auto" color="grey lighten-5" height="350px">
                                    <v-form :disabled="isDesabilitado">
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" xs="1" sm="6">
                                                    <v-text-field
                                                        v-model="dadosProd.txtPreco"
                                                        :rules="[required('Sale Value')]"
                                                        hint="Optional"
                                                        label="Sale value"
                                                        suffix="euro"
                                                    >
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" xs="1" sm="6">
                                                    <v-text-field
                                                        v-model="dadosProd.txtVlrCompra"
                                                        :rules="[required('Purchase Amount')]"
                                                        hint="Optional"
                                                        label="Purchase Amount"
                                                        suffix="euro"
                                                    >
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" xs="1" sm="6">
                                                    <v-text-field
                                                        v-model="dadosProd.txtDesconto"
                                                        hint="Optional"
                                                        label="Discount"
                                                        suffix="%"
                                                    >
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" xs="1" sm="6" align="end" justify="end">
                                                    <Suggestion 
                                                        v-if="btSugestao == false"  
                                                        :selecionado="dadosProd" 
                                                        :tdasugestoes="sugestoes" 
                                                        :tdos_itens="itens_filtrados"
                                                        :removerSugest = "removeSugestao"
                                                        :inserirSugest = "insereSugestao"
                                                        :salvarAlteracoes = "salvaAlteracoes"
                                                    />
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col class="mt-2">
                                                    <v-textarea
                                                        v-model="dadosProd.txtComentario"
                                                        label="Comments"
                                                        auto-grow
                                                        outlined
                                                        rows="3"
                                                        row-height="25"
                                                    ></v-textarea>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-form>
                                </v-card>
                                <v-btn color="primary" @click="e1 = e1 - 1"> Preview </v-btn>
                                <v-btn color="primary" @click="e1 = e1 + 1"> Next </v-btn>
                            </v-stepper-content>
                            <v-stepper-content step="3" class="grey lighten-4">
                                <v-card
                                    class="mb-2 overflow-y-auto"
                                    color="grey lighten-5"
                                    height="350px"
                                >
                                    <v-form :disabled="isDesabilitado">
                                        <v-row>
                                            <v-col xl="3" lg="3" md="4" sm="2" xs="1">
                                                <v-row class="ml-1 mr-1" v-if="edicao || visualizacao">
                                                    <v-col>
                                                        <v-sheet
                                                            @click="deleteIMG(1)"
                                                            class="ml-1 mt-2 pa-1"
                                                            color="grey lighten-3"
                                                            height="100"
                                                            width="95"
                                                        >
                                                            <div class="containerdiv">
                                                                <v-img
                                                                    aspect-ratio="16/9"
                                                                    height="90"
                                                                    width="95"
                                                                    :src="this.dadosProd.mdia.pic1"
                                                                    class="image"
                                                                >
                                                                </v-img>
                                                                <div
                                                                    v-if="edicao && this.dadosProd.mdia.pic1 != this.imgnull"
                                                                    class="overlay"
                                                                >
                                                                    <div class="text">Delete</div>
                                                                </div>
                                                            </div>
                                                            <sheet-footer> 1 </sheet-footer>
                                                        </v-sheet>
                                                    </v-col>
                                                    <v-col class="pe-0">
                                                        <v-sheet
                                                            @click="deleteIMG(2)"
                                                            class="ml-1 mt-2 pa-1"
                                                            color="grey lighten-3"
                                                            height="100"
                                                            width="95"
                                                        >
                                                            <div class="containerdiv">
                                                              <v-img
                                                                  aspect-ratio="16/9"
                                                                  height="90"
                                                                  width="95"
                                                                  :src="this.dadosProd.mdia.pic2"
                                                              >
                                                              </v-img>
                                                              <div
                                                                  v-if="
                                                                  edicao &&
                                                                  this.dadosProd.mdia.pic2 != this.imgnull
                                                                  "
                                                                  class="overlay"
                                                              >
                                                                  <div class="text">Delete</div>
                                                              </div>
                                                            </div>
                                                            <sheet-footer> 2 </sheet-footer>
                                                        </v-sheet>
                                                    </v-col>
                                                    <v-col class="pe-0">
                                                        <v-sheet
                                                            @click="deleteIMG(3)"
                                                            class="ml-1 mt-2 pa-1"
                                                            color="grey lighten-3"
                                                            height="100"
                                                            width="95"
                                                        >
                                                            <div class="containerdiv">
                                                                <v-img
                                                                    aspect-ratio="16/9"
                                                                    height="90"
                                                                    width="95"
                                                                    :src="this.dadosProd.mdia.pic3"
                                                                >
                                                                </v-img>
                                                                <div
                                                                    v-if="edicao && this.dadosProd.mdia.pic3 != this.imgnull"
                                                                    class="overlay"
                                                                >
                                                                    <div class="text">Delete</div>
                                                                </div>
                                                            </div>
                                                            <sheet-footer> 3 </sheet-footer>
                                                        </v-sheet>
                                                    </v-col>
                                                    <v-col class="pe-0">
                                                        <v-sheet
                                                            @click="deleteIMG(4)"
                                                            class="ml-1 mt-2 pa-1"
                                                            color="grey lighten-3"
                                                            height="100"
                                                            width="95"
                                                        >
                                                            <div class="containerdiv">
                                                                <v-img
                                                                    aspect-ratio="16/9"
                                                                    height="90"
                                                                    width="95"
                                                                    :src="this.dadosProd.mdia.pic4"
                                                                >
                                                                </v-img>
                                                                <div
                                                                    v-if="edicao && this.dadosProd.mdia.pic4 != this.imgnull"
                                                                    class="overlay"
                                                                >
                                                                    <div class="text">Delete</div>
                                                                </div>
                                                            </div>
                                                            <sheet-footer> 4 </sheet-footer>
                                                        </v-sheet>
                                                    </v-col>
                                                    <v-col class="pe-0">
                                                        <v-sheet
                                                            @click="deleteIMG(5)"
                                                            class="ml-1 mt-2 pa-1"
                                                            color="grey lighten-3"
                                                            height="100"
                                                            width="95"
                                                        >
                                                            <div class="containerdiv">
                                                                <v-img
                                                                    aspect-ratio="16/9"
                                                                    height="90"
                                                                    width="95"
                                                                    :src="this.dadosProd.mdia.pic5"
                                                                >
                                                                </v-img>
                                                                <div
                                                                    v-if="edicao && this.dadosProd.mdia.pic5 != this.imgnull"
                                                                    class="overlay"
                                                                >
                                                                    <div class="text">Delete</div>
                                                                </div>
                                                            </div>
                                                            <sheet-footer> 5 </sheet-footer>
                                                        </v-sheet>
                                                    </v-col>
                                                    <v-col class="pe-0">
                                                        <v-sheet
                                                            @click="deleteIMG(6)"
                                                            class="ml-1 mt-2 pa-1"
                                                            color="grey lighten-3"
                                                            height="100"
                                                            width="95"
                                                        >
                                                            <div class="containerdiv">
                                                                <v-img
                                                                    aspect-ratio="16/9"
                                                                    height="90"
                                                                    width="95"
                                                                    :src="this.dadosProd.mdia.pic6"
                                                                >
                                                                </v-img>
                                                                <div
                                                                    v-if="edicao && this.dadosProd.mdia.pic6 != this.imgnull"
                                                                    class="overlay"
                                                                >
                                                                    <div class="text">Delete</div>
                                                                </div>
                                                            </div>
                                                            <sheet-footer> 6 </sheet-footer>
                                                        </v-sheet>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col>
                                                <v-row class="hidden-sm-and-down">
                                                    <v-col xs="12">
                                                        <v-file-input
                                                            v-model="item_img.i1"
                                                            :rules="[required('Image 1')]"
                                                            accept="image/png, image/jpeg"
                                                            placeholder="Pick an image"
                                                            prepend-icon="mdi-camera"
                                                            label="Image 1"
                                                        >
                                                        </v-file-input>
                                                    </v-col>
                                                    <v-col md="6" lg="6">
                                                        <v-file-input
                                                            v-model="item_img.i2"
                                                            accept="image/png, image/jpeg"
                                                            placeholder="Pick an image"
                                                            prepend-icon="mdi-camera"
                                                            label="Image 2"
                                                        >
                                                        </v-file-input>
                                                    </v-col>
                                                    <v-col md="6" lg="6">
                                                        <v-file-input
                                                            v-model="item_img.i3"
                                                            accept="image/png, image/jpeg"
                                                            placeholder="Pick an image"
                                                            prepend-icon="mdi-camera"
                                                            label="Image 3 "
                                                        >
                                                        </v-file-input>
                                                    </v-col>
                                                    <v-col md="6" lg="6">
                                                        <v-file-input
                                                            v-model="item_img.i4"
                                                            accept="image/png, image/jpeg"
                                                            placeholder="Pick an image"
                                                            prepend-icon="mdi-camera"
                                                            label="Image 4 "
                                                        >
                                                        </v-file-input>
                                                    </v-col>
                                                    <v-col md="6" lg="6">
                                                        <v-file-input
                                                            v-model="item_img.i5"
                                                            accept="image/png, image/jpeg"
                                                            placeholder="Pick an image"
                                                            prepend-icon="mdi-camera"
                                                            label="Image 5"
                                                        >
                                                        </v-file-input>
                                                    </v-col>
                                                    <v-col md="6" lg="6">
                                                        <v-file-input
                                                            v-model="item_img.i6"
                                                            accept="image/png, image/jpeg"
                                                            placeholder="Pick an image"
                                                            prepend-icon="mdi-camera"
                                                            label="Image 6"
                                                        >
                                                        </v-file-input>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="hidden-sm-and-up">
                                                    <v-col xs="12">
                                                        <v-file-input
                                                            v-model="item_img.i1"
                                                            :rules="[required('Image 1')]"
                                                            accept="image/png, image/jpeg"
                                                            placeholder="Pick an image"
                                                            prepend-icon="mdi-camera"
                                                            label="Image 1"
                                                        >
                                                        </v-file-input>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="hidden-sm-and-up">
                                                    <v-col>
                                                        <v-file-input
                                                            v-model="item_img.i2"
                                                            accept="image/png, image/jpeg"
                                                            placeholder="Pick an image"
                                                            prepend-icon="mdi-camera"
                                                            label="Image 2"
                                                        >
                                                        </v-file-input>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="hidden-sm-and-up">
                                                    <v-col md="6" lg="6">
                                                        <v-file-input
                                                            v-model="item_img.i3"
                                                            accept="image/png, image/jpeg"
                                                            placeholder="Pick an image"
                                                            prepend-icon="mdi-camera"
                                                            label="Image 3 "
                                                        >
                                                        </v-file-input>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="hidden-sm-and-up">
                                                    <v-col>
                                                        <v-file-input
                                                            v-model="item_img.i4"
                                                            accept="image/png, image/jpeg"
                                                            placeholder="Pick an image"
                                                            prepend-icon="mdi-camera"
                                                            label="Image 4 "
                                                        >
                                                        </v-file-input>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="hidden-sm-and-up">
                                                    <v-col>
                                                        <v-file-input
                                                            v-model="item_img.i5"
                                                            accept="image/png, image/jpeg"
                                                            placeholder="Pick an image"
                                                            prepend-icon="mdi-camera"
                                                            label="Image 5"
                                                        >
                                                        </v-file-input>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="hidden-sm-and-up">
                                                    <v-col>
                                                        <v-file-input
                                                            v-model="item_img.i6"
                                                            accept="image/png, image/jpeg"
                                                            placeholder="Pick an image"
                                                            prepend-icon="mdi-camera"
                                                            label="Image 6"
                                                        >
                                                        </v-file-input>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </v-card>
                                <v-btn color="primary" @click="e1 = e1 - 1"> Preview </v-btn>
                                <v-btn color="primary" @click="e1 = e1 - 2"> Next </v-btn>
                            </v-stepper-content>
                        </v-stepper-items>
                    </v-stepper>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <BanerBlock v-if="!$auth.loggedIn" />
                <v-form class="mt-1 mb-1">
                    <v-btn
                        v-if="$auth.loggedIn"
                        :disabled="btAdicionar"
                        class="ml-0 mb-1 tooltip"
                        dark
                        color="green"
                        @click="modoAdicionar()"
                    >
                        <v-icon> mdi-plus-box-multiple </v-icon>
                        <span class="tooltiptext">Insert New</span>
                    </v-btn>
                    <v-btn
                        v-if="$auth.loggedIn"
                        :disabled="btConfirmar"
                        class="ml-1 mb-1 tooltip"
                        dark
                        color="primary"
                        @click="dialogMessagem()"
                    >
                        <v-icon> mdi-check-bold </v-icon>
                        <span class="tooltiptext">Save</span>
                    </v-btn>
                    <v-btn
                        v-if="$auth.loggedIn"
                        :disabled="btCancelar"
                        class="ml-1 mb-1 tooltip"
                        dark
                        color="red"
                        @click="modoCancelar()"
                    >
                        <v-icon> mdi-close-circle </v-icon>
                        <span class="tooltiptext">Cancel</span>
                    </v-btn>
                    <v-dialog v-model="dialogConfirm" persistent max-width="290">
                        <v-card class="white">
                            <v-card-title class="text-h5 black--text">
                            {{ txtTituloDialog }}
                            </v-card-title>
                            <v-card-text class="black--text pa-4">{{ txtMsgDialog }}</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red darken-1" text @click="dialogConfirm = false">
                                    NO
                                </v-btn>
                                <v-btn color="green darken-1" text @click="modoConfirmar()">
                                    YES
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-form>
                <v-card elevation="18" class="mx-auto pa-1 justify-center" max-width="100%" v-if="$auth.loggedIn && item == ''">
                    <v-card-title class="justify-center">There is no one product registered </v-card-title>
                    <div class="container">
                        <p>Please, click on green button (+) to insert a new product</p>
                    </div>
                </v-card>
                <v-card elevation="18" class="mx-auto pa-1" max-width="100%" v-if="$auth.loggedIn && item != ''">
                    <v-virtual-scroll :items="itens" item-height="50" height="300">
                        <template v-slot:default="{ item }">
                            <v-list-item class="mb-4 mt-2">
                                <v-list-item-avatar>
                                    <v-avatar size="55">
                                        <img aspect-ratio="16/9" :src="item.midia.url1" />
                                    </v-avatar>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title class="black--text">
                                        {{ item.titulo }}
                                    </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-content class="hidden-sm-and-down">
                                    <v-list-item-title class="black--text">
                                        {{ item.subtitulo }}
                                    </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-content class="hidden-sm-and-down">
                                    <v-list-item-title class="black--text">
                                        {{ item.material }}
                                    </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action class="mr-3">
                                    <v-btn
                                        v-if="edicao == false && insercao == false"
                                        class="tooltip"
                                        icon
                                        small
                                        @click="visualizar(item._id)"
                                    >
                                        <v-icon color="orange darken-4" right> mdi-eye </v-icon>
                                        <span class="tooltiptext">Show</span>
                                    </v-btn>
                                </v-list-item-action>
                                <v-list-item-action>
                                    <v-btn v-if="insercao == false " class="tooltip" icon small @click="editar(item._id)">
                                        <v-icon color="orange darken-4" right> mdi-pencil </v-icon>
                                        <span class="tooltiptext">Edit</span>
                                    </v-btn>
                                </v-list-item-action>
                                <v-list-item-action class="mr-1">
                                    <v-btn
                                        v-if="edicao == false && insercao == false"
                                        class="tooltip"
                                        icon
                                        small
                                        @click="dialogMessagem(item._id)"
                                    >
                                        <v-icon color="orange darken-4" right>
                                            mdi-delete-alert
                                        </v-icon>
                                        <span class="tooltiptext">Delete</span>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </template>
                    </v-virtual-scroll>
                </v-card>
            </v-col>
        </v-row>
    </v-container>   
</template>

<script>
import BanerBlock from "@/components/BanerBlock.vue";
import selectImg from "@/static/utilities/insertPicture.png";
import validacao from '@/utils/validacao';
import Suggestion from '@/components/Suggestion.vue';
export default {
  data: () => ({
      overlay: false,
      imgnull: selectImg,
      txtTituloDialog: "",
      txtMsgDialog: "",
      dialogConfirm: false,
      item: "",
      chaveItens: 0,
      sugestoes: [],
      item_img: {
        i1: null,
        i2: null,
        i3: null,
        i4: null,
        i5: null,
        i6: null,
        v1: null,
      },
      urls: [],
      tipos: [],
      materiais: [],
      pedras: [],
      btAdicionar: false,
      btConfirmar: true,
      btCancelar: true,
      btSugestao: true,
      situacao: ["Active", "Inactive"],
      isDesabilitado: true,
      edicao: false,
      insercao: false,
      visualizacao: false,
      e1: 1,
      itens_filtrados: [],
      dadosProd: {
        txtID: "",
        txtCod_prod: "",
        txtTitulo: "",
        txtSubtitulo: "",
        txtTipo: "",
        txtMaterial: "",
        txtPedra: "",
        txtPeso: "",
        txtDesconto: 0,
        txtComentario: "",
        mdia: {
          pic1: "",
          pic2: "",
          pic3: "",
          pic4: "",
          pic5: "",
          pic6: "",
          vdeo: "",
        },
        txtSituacao: "",
        txtPreco: "",
        txtVlrCompra: "",
      },
      ...validacao
  }),
  computed: {
    itens(){
      return Array.from(this.item);
    },
    getTipos(){
      return this.tipos;
    },
    getMateriais(){
      return this.materiais;
    },
    getPedras(){
      return this.pedras;
    }
  },
  methods: {
    
    renderItens() {
      this.chaveItens += 1;
    },
    
    async getItens() {
      if (this.$auth.loggedIn) {
          await this.$axios
                .get("/item/bucarItens")
                .then((response) => (this.item = response.data));
      }
    },
    
    async getCadProd() {
      if (this.$auth.loggedIn) {
          await this.$axios
                .get("/cadastros/buscaCadProd")
                .then((response) => {
                    this.tipos = response.data.balde1;
                    this.materiais = response.data.balde2;
                    this.pedras = response.data.balde3 });
      }
    },
    
    dialogMessagem(id) {
        if (this.insercao == true) {
          this.dialogConfirm = true;
          this.txtTituloDialog = "Inserting...";
          this.txtMsgDialog = "Do you want to save the new product?";
        } else if (this.edicao == true) {
          this.dialogConfirm = true;
          this.txtTituloDialog = "Editing...";
          this.txtMsgDialog = "Do you want to save the changes you have made?";
        } else if (this.edicao == false && this.insercao == false) {
          this.dialogConfirm = true;
          this.txtTituloDialog = "Deleting...";
          this.txtMsgDialog = "Do you want to confirm and delete the product?";
          this.setarDados(id);
        }
    },
    
    async modoConfirmar(id) {
        if (this.insercao == true) {
          if(this.dadosProd.txtTitulo == "" || this.dadosProd.txtTipo == "" || this.dadosProd.txtMaterial =="" ||
             this.dadosProd.txtPedra == ""  || this.dadosProd.txtSituacao == "" || this.dadosProd.txtPreco == "" ||
             this.dadosProd.txtVlrCompra == "" || this.dadosProd.mdia.pic1 == ""){
                this.$notifier.showMessage({
                  content: "There is/are required fields in blank. Please fill them",
                  color: "red",
                  time: 4000
                });
             }else{
                this.overlay = true;
                await this.salvarImagens();
                await this.salvarNovo();
                await this.getItens();
                this.$notifier.showMessage({
                  content: "The Product has been inserted!",
                  color: "green",
                  time: 3000
                });
                this.limparDados();
                this.renderItens();
                this.dialogConfirm = false;
             }
        } else if (this.edicao == true) {
          if(this.dadosProd.txtTitulo == "" || this.dadosProd.txtTipo == "" || this.dadosProd.txtMaterial =="" ||
             this.dadosProd.txtPedra == ""  || this.dadosProd.txtSituacao == "" || this.dadosProd.txtPreco == "" ||
             this.dadosProd.txtVlrCompra == ""){
                this.$notifier.showMessage({
                  content: "There is/are required fields in blank. Please fill them",
                  color: "red",
                  time: 4000
                });
             }else{
                this.overlay = true;
                await this.salvarImagens();
                await this.editarDados();
                await this.getItens();
                this.$notifier.showMessage({
                  content: "The Product has been edited!",
                  color: "green",
                  time: 3000
                });
                this.limparDados();
                this.renderItens();
                this.dialogConfirm = false;
             }         
        } else if (this.edicao == false && this.insercao == false) {
            this.overlay = true;
            await this.deletar();
            this.$notifier.showMessage({
              content: "The Product has been deleted!",
              color: "green",
              time: 3000
            });
            this.dialogConfirm = false;
        }
    },
    
    modoAdicionar() {
        this.limparDados();
        this.insercao = true;
        this.btAdicionar = true;
        this.btConfirmar = false;
        this.btCancelar = false;
        this.isDesabilitado = false;
    },
    
    modoCancelar() {
        this.btAdicionar = false;
        this.btConfirmar = true;
        this.btCancelar = true;
        this.isDesabilitado = true;
        this.edicao = false;
        this.insercao = false;
        this.visualizacao = false;
        this.limparDados();
    },
    
    limparDados() {
        this.e1 = 1;
        this.dadosProd.txtCod_prod = "";
        this.dadosProd.txtID = "";
        this.dadosProd.txtTitulo = "";
        this.dadosProd.txtSubtitulo = "";
        this.dadosProd.txtTipo = "";
        this.dadosProd.txtMaterial = "";
        this.dadosProd.txtPedra = "";
        this.dadosProd.txtPeso = "";
        this.dadosProd.txtComentario = "";
        this.dadosProd.txtSituacao = "";
        this.dadosProd.txtPreco = "";
        this.dadosProd.txtVlrCompra = "";
        this.dadosProd.txtDesconto = 0;
        this.dadosProd.mdia.pic1 = selectImg;
        this.dadosProd.mdia.pic2 = selectImg;
        this.dadosProd.mdia.pic3 = selectImg;
        this.dadosProd.mdia.pic4 = selectImg;
        this.dadosProd.mdia.pic5 = selectImg;
        this.dadosProd.mdia.pic6 = selectImg;
        this.dadosProd.mdia.vdeo = selectImg;
        this.urls = [];
        this.item_img.i1 = null;
        this.item_img.i2 = null;
        this.item_img.i3 = null;
        this.item_img.i4 = null;
        this.item_img.i5 = null;
        this.item_img.i6 = null;
        this.btAdicionar = false;
        this.btConfirmar = true;
        this.btSugestao = true;
        this.btCancelar = true;
        this.isDesabilitado = true;
        this.insercao = false;
        this.edicao = false;
        this.visualizacao = false;
    },
    
    visualizar(id) {
        this.setarDados(id);
        this.visualizacao = true;
    },
    
    async editar(id) {
        this.setarDados(id);
        await this.getSugestoes();
        this.edicao = true;
        this.btAdicionar = true;
        this.btConfirmar = false;
        this.btSugestao = false;
        this.btCancelar = false;
        this.isDesabilitado = false;
    },
    
    async deletar() {
        await this.$axios
              .delete(`/item/apagar/${this.dadosProd.txtID}`);
        await this.getItens();
        this.renderItens();
        this.limparDados();
    },
    
    async setarDados(id) {
        var dados = this.item.filter((i) => { return i._id == id });
        this.itens_filtrados = this.item.filter((i) => i._id !== id);
        this.dadosProd.txtID = dados[0]._id;
        this.dadosProd.txtCod_prod = dados[0].cod_prod;
        this.dadosProd.txtTitulo = dados[0].titulo;
        this.dadosProd.txtSubtitulo = dados[0].subtitulo;
        this.dadosProd.txtTipo = dados[0].tipo;
        this.dadosProd.txtMaterial = dados[0].material;
        this.dadosProd.txtPedra = dados[0].pedra;
        this.dadosProd.txtPeso = dados[0].peso;
        this.dadosProd.txtComentario = dados[0].comentario;
        this.dadosProd.txtDesconto = dados[0].desconto || 0;
        this.dadosProd.txtSituacao = dados[0].situacao == true ? "Active" : "Inactive";
        this.dadosProd.txtPreco = dados[0].preco;
        this.dadosProd.txtVlrCompra = dados[0].valor_compra;
        this.dadosProd.mdia.pic1 = dados[0].midia.url1 == "" ? selectImg : dados[0].midia.url1;
        this.dadosProd.mdia.pic2 = dados[0].midia.url2 == "" ? selectImg : dados[0].midia.url2;
        this.dadosProd.mdia.pic3 = dados[0].midia.url3 == "" ? selectImg : dados[0].midia.url3;
        this.dadosProd.mdia.pic4 = dados[0].midia.url4 == "" ? selectImg : dados[0].midia.url4;
        this.dadosProd.mdia.pic5 = dados[0].midia.url5 == "" ? selectImg : dados[0].midia.url5;
        this.dadosProd.mdia.pic6 = dados[0].midia.url6 == "" ? selectImg : dados[0].midia.url6;
        this.dadosProd.mdia.vdeo = dados[0].midia.video == "" ? selectImg : dados[0].midia.video;
    },
    
    async salvarImagens() {
        var urls = new Array();
        if (this.item_img.i1) {
            var formData = new FormData();
            formData.append("image", this.item_img.i1);
            await this.$axios
                  .post("/envio_imagem_prod/salvar", formData)
                  .then((response) => {
                      this.setURL(response.data) })
                  .catch((error) => {
                      console.log({ error }) });
        } else {
          if (this.dadosProd.mdia.pic1 == selectImg) {
            this.setURL("");
          } else {
            this.setURL(this.dadosProd.mdia.pic1);
          }
        }
  
        if (this.item_img.i2) {
            var formData = new FormData();
            formData.append("image", this.item_img.i2);
            await this.$axios
                  .post("/envio_imagem_prod/salvar", formData)
                  .then((response) => {
                      this.setURL(response.data) })
                  .catch((error) => {
                      console.log({ error }) });
        } else {
          if (this.dadosProd.mdia.pic2 == selectImg) {
            this.setURL("");
          } else {
            this.setURL(this.dadosProd.mdia.pic2);
          }
        }
  
        if (this.item_img.i3) {
            var formData = new FormData();
            formData.append("image", this.item_img.i3);
            await this.$axios
                  .post("/envio_imagem_prod/salvar", formData)
                  .then((response) => {
                      this.setURL(response.data) })
                  .catch((error) => {
                      console.log({ error }) });
        } else {
          if (this.dadosProd.mdia.pic3 == selectImg) {
            this.setURL("");
          } else {
            this.setURL(this.dadosProd.mdia.pic3);
          }
        }
  
        if (this.item_img.i4) {
            var formData = new FormData();
            formData.append("image", this.item_img.i4);
            await this.$axios
                  .post("/envio_imagem_prod/salvar", formData)
                  .then((response) => {
                      this.setURL(response.data) })
                  .catch((error) => {
                      console.log({ error }) });
        } else {
          if (this.dadosProd.mdia.pic4 == selectImg) {
            this.setURL("");
          } else {
            this.setURL(this.dadosProd.mdia.pic4);
          }
        }
  
        if (this.item_img.i5) {
            var formData = new FormData();
            formData.append("image", this.item_img.i5);
            await this.$axios
                  .post("/envio_imagem_prod/salvar", formData)
                  .then((response) => {
                      this.setURL(response.data) })
                  .catch((error) => {
                      console.log({ error }) });
        } else {
          if (this.dadosProd.mdia.pic5 == selectImg) {
            this.setURL("");
          } else {
            this.setURL(this.dadosProd.mdia.pic5);
          }
        }
  
        if (this.item_img.i6) {
            var formData = new FormData();
            formData.append("image", this.item_img.i6);
            await this.$axios
                  .post("/envio_imagem_prod/salvar", formData)
                  .then((response) => {
                      this.setURL(response.data) })
                  .catch((error) => {
                      console.log({ error }) });
        } else {
          if (this.dadosProd.mdia.pic6 == selectImg) {
            this.setURL("");
          } else {
            this.setURL(this.dadosProd.mdia.pic6);
          }
        }
  
      return urls;
    },
    
    async salvarNovo() {
        await this.$axios
              .$post("/item/salvar", {
                  titulo: this.dadosProd.txtTitulo,
                  subtitulo: this.dadosProd.txtSubtitulo,
                  tipo: this.dadosProd.txtTipo,
                  material: this.dadosProd.txtMaterial,
                  pedra: this.dadosProd.txtPedra,
                  peso: this.dadosProd.txtPeso,
                  comentario: this.dadosProd.txtComentario,
                  midia: {
                    url1: this.urls[0] == null ? "" : this.urls[0],
                    url2: this.urls[1] == null ? "" : this.urls[1],
                    url3: this.urls[2] == null ? "" : this.urls[2],
                    url4: this.urls[3] == null ? "" : this.urls[3],
                    url5: this.urls[4] == null ? "" : this.urls[4],
                    url6: this.urls[5] == null ? "" : this.urls[5],
                    video: this.urls[6] == null ? "" : this.urls[6],
                  },
                  situacao: this.dadosProd.txtSituacao == "Active" ? true : false,
                  preco: this.dadosProd.txtPreco,
                  valor_compra: this.dadosProd.txtVlrCompra,
                  desconto: this.dadosProd.txtDesconto,
                  sugestoes: [""] })
              .then((response) => {
                  console.log("Success");
                  this.limparDados() })
              .catch((error) => {
                  console.log(error) });
    },

    async editarDados() {
        this.dadosProd.mdia.pic1 = this.dadosProd.mdia.pic1 == this.imgnull ? "" : this.dadosProd.mdia.pic1;
        this.dadosProd.mdia.pic2 = this.dadosProd.mdia.pic2 == this.imgnull ? "" : this.dadosProd.mdia.pic2;
        this.dadosProd.mdia.pic3 = this.dadosProd.mdia.pic3 == this.imgnull ? "" : this.dadosProd.mdia.pic3;
        this.dadosProd.mdia.pic4 = this.dadosProd.mdia.pic4 == this.imgnull ? "" : this.dadosProd.mdia.pic4;
        this.dadosProd.mdia.pic5 = this.dadosProd.mdia.pic5 == this.imgnull ? "" : this.dadosProd.mdia.pic5;
        this.dadosProd.mdia.pic6 = this.dadosProd.mdia.pic6 == this.imgnull ? "" : this.dadosProd.mdia.pic6;
        await this.$axios
              .$put(`/item/editar/${this.dadosProd.txtID}`, {
                  titulo: this.dadosProd.txtTitulo,
                  subtitulo: this.dadosProd.txtSubtitulo,
                  tipo: this.dadosProd.txtTipo,
                  material: this.dadosProd.txtMaterial,
                  pedra: this.dadosProd.txtPedra,
                  peso: this.dadosProd.txtPeso,
                  comentario: this.dadosProd.txtComentario,
                  midia: {
                    url1:
                      this.urls[0] == null ? this.dadosProd.mdia.pic1 : this.urls[0],
                    url2:
                      this.urls[1] == null ? this.dadosProd.mdia.pic2 : this.urls[1],
                    url3:
                      this.urls[2] == null ? this.dadosProd.mdia.pic3 : this.urls[2],
                    url4:
                      this.urls[3] == null ? this.dadosProd.mdia.pic4 : this.urls[3],
                    url5:
                      this.urls[4] == null ? this.dadosProd.mdia.pic5 : this.urls[4],
                    url6:
                      this.urls[5] == null ? this.dadosProd.mdia.pic6 : this.urls[5],
                    video:
                      this.urls[6] == null ? this.dadosProd.mdia.vdeo : this.urls[6],
                  },
                  situacao: this.dadosProd.txtSituacao == "Active" ? true : false,
                  preco: this.dadosProd.txtPreco,
                  valor_compra: this.dadosProd.txtVlrCompra,
                  desconto: this.dadosProd.txtDesconto })
              .then((response) => {
                  console.log("Success");
                  this.limparDados() })
              .catch((error) => {
                  console.log(error) });
    },

    deleteIMG(i) {
        if (this.edicao == true) {
          if (i == 1) {
            this.dadosProd.mdia.pic1 = this.imgnull;
            this.renderItens();
          }
          if (i == 2) {
            this.dadosProd.mdia.pic2 = this.imgnull;
            this.renderItens();
          }
          if (i == 3) {
            this.dadosProd.mdia.pic3 = this.imgnull;
            this.renderItens();
          }
          if (i == 4) {
            this.dadosProd.mdia.pic4 = this.imgnull;
            this.renderItens();
          }
          if (i == 5) {
            this.dadosProd.mdia.pic5 = this.imgnull;
            this.renderItens();
          }
          if (i == 6) {
            this.dadosProd.mdia.pic6 = this.imgnull;
            this.renderItens();
          }
        }
    },
    
    setURL(u) {
      this.urls.push(u);
    },
    
    async getSugestoes(){
      if (this.$auth.loggedIn) {
          await this.$axios
                .get("item/buscar_sugestoes/"+this.dadosProd.txtID)
                .then((response) => (this.sugestoes = response.data));
      }
    },
    
    removeSugestao(id){
      this.sugestoes = this.sugestoes.filter((i) => i._id !== id);
    },

    insereSugestao(id){
      let seDuplicado = this.sugestoes.filter((s) => s._id == id);
      if(seDuplicado.length > 0){
          this.$notifier.showMessage({
                content: "You are trying to insert an item already linked as suggestion!",
                color: "red",
                time: 3000
          });
      }else{
          let temp = this.item.filter((i) => i._id == id);
          this.sugestoes.push(temp[0]);
      }
    },

    async salvaAlteracoes(){
      let ids_sugestoes = this.sugestoes.map(obj => obj._id);
      await this.$axios
            .$put(`/item/gerir_sugestoes/${this.dadosProd.txtID}`, {
                sugestoes: ids_sugestoes })
            .then((response) => {
                this.$notifier.showMessage({
                  content: "Suggestions have been saved!",
                  color: "green",
                  time: 3000
                }) })
            .catch((error) => {
                  console.log(error) });
    }
  },

  async mounted() {
      this.getItens();
      this.getCadProd();
      this.overlay = true;
  },

  watch: {
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false;
        }, 1000);
    },
  },

  components: {
    BanerBlock,
    Suggestion,
    SheetFooter: {
      functional: true,
      render(h, { children }) {
        return h(
          "v-sheet",
            {
              staticClass: "mt-auto align-center justify-center d-flex px-2",
              props: {
                color: "transparent",
                dark: true,
                height: 50,
              },
            },
          children
        );
      },
    },
  },
};
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

div.ex1 {
  background-color: black;
  width: 100%;
  height: 100%;
  overflow: scroll;
  border: 0;
}

.containerdiv {
  position: relative;
  width: 100%;
}

.image {
  display: block;
  width: 100%;
  height: auto;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.5s ease;
  background-color: #b40303;
}

.containerdiv:hover .overlay {
  opacity: 1;
}

.text {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}

p{
  text-align: center;
}
</style>