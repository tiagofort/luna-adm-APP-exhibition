<template>
    <v-row>
        <v-col class="hidden-sm-and-down" cols="4"></v-col>
        <v-col>
            <v-banner two-line>
                <v-avatar
                    slot="icon"
                    color="red accent-4"
                    size="40"
                >
                    <v-icon
                    icon="mdi-lock"
                    color="white"
                    >
                    mdi-lock
                    </v-icon>
                </v-avatar>
        
                <span class="red--text">YOU ARE NOT LOGGED IN. ACCESS DENIED!</span>
        
                <template v-slot:actions>
                    <v-btn
                    text
                    color="blue accent-4"
                    to="/login"
                    >
                    Login
                    </v-btn>
                </template>
            </v-banner>
        </v-col>
        <v-col class="hidden-sm-and-down" cols="4"></v-col>
    </v-row>
</template>