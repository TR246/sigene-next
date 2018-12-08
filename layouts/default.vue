<template>
    <v-app>
        <!-- 左メニュー -->
        <v-navigation-drawer
            v-model="drawer"
            fixed
            app
        >
            <v-list>
                <v-list-tile
                    class="hidden-lg-and-up"
                    exact
                    @click="drawer = false">
                    <v-list-tile-action>
                        <v-icon>arrow_back</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>閉じる</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile
                    v-for="(item, i) in items"
                    :to="item.to"
                    :key="i"
                    router
                    exact
                >
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <!-- ヘッダー -->
        <v-toolbar
            dark
            color="primary"
            fixed
            app
        >
            <v-toolbar-side-icon @click="drawer = !drawer" />
            <v-toolbar-title v-text="title"/>
            <v-spacer/>
            <v-btn
                icon
                @click.stop="rightDrawer = !rightDrawer"
            >
                <v-icon>share</v-icon>
            </v-btn>
        </v-toolbar>

        <!-- 内容 -->
        <v-content>
            <v-container>
                <nuxt />
            </v-container>
        </v-content>

        <!-- 右メニュー -->
        <v-navigation-drawer
            :right="true"
            v-model="rightDrawer"
            temporary
            fixed
        >
            <v-list>
                <v-list-tile
                    class="hidden-lg-and-up"
                    exact
                    @click="rightDrawer = false">
                    <v-list-tile-action>
                        <v-icon>arrow_forward</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>閉じる</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon light>share</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>共有</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            drawer: true,
            items: [
                { icon: "apps", title: "Welcome", to: "/" },
                { icon: "bubble_chart", title: "Inspire", to: "/inspire" }
            ],
            rightDrawer: false,
            title: "Singene Next"
        };
    }
};
</script>
