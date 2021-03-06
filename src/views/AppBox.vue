<template>
  <div>
    <div class="is-flex justify-content-center">
      <div class="buttons has-addons mt-4 mr-4">
        <button class="button is-black has-text-weight-bold dbox-btn-box">
          {{ box.title }}
        </button>
        <button class="button is-black has-text-weight-bold has-text-grey-lighter">
          Caja
        </button>
      </div>

      <button
        class="button is-primary mt-4 mr-4"
        @click="openApps"
      >
        <b-icon
          icon="play"
          size="is-small"
        />
        <span>Abrir todo</span>
      </button>

      <button
        class="button is-black mt-4 mr-4 has-text-weight-bold has-text-grey-lighter"
        @click="filterInBox"
      >
        <b-icon
          icon="filter"
          size="is-small"
        />
        <span>Filtrar</span>
      </button>

      <button
        class="button is-black mt-4 mr-4 has-text-grey-lighter"
        @click="addApp"
      >
        <b-icon
          icon="plus"
          size="is-small"
        />
      </button>

      <button
        class="button is-black mt-4 mr-4 has-text-weight-bold has-text-grey-light"
        @click="searchInBox"
      >
        <b-icon
          icon="search"
          size="is-small"
        />
        <span>Buscar</span>
      </button>

      <button
        class="button is-black mt-4 has-text-grey-lighter"
        @click="optionsBox"
      >
        <b-icon
          icon="sliders-h"
          size="is-small"
        />
      </button>
    </div>
    <section class="section">
      <div v-if="appsBox.length > 0">
        <draggable
          v-model="appsBoxList"
          group="apps"
          class="is-flex buttons"
          @start="drag=true"
          @end="drag=false"
          @change="updateOrderApp"
        >
          <router-link
            v-for="app in appsBoxList"
            :key="app._id"
            :to="`/detail/${app._id}`"
            class="mt-4 mr-5"
          >
            <context-menu
              :items-menu="contextualMenu"
              @on-click="contextualClick($event, app)"
            >
              <div
                class="dbox-app-card"
                :style="{ backgroundImage: `url('${app.tile}')` }"
              />
            </context-menu>
          </router-link>
        </draggable>
      </div>
      <div
        v-else
        class="section has-text-centered dbox-card-semitransparent mt-3"
      >
        <h2 class="is-size-6 has-text-weight-bold has-text-grey-light">
          ¡Vamos a agregar algunas apps!
        </h2>
        <p class="has-text-grey-light mt-4">
          Esta sección esta vacia porque aún no has agregado alguna app.
        </p>
        <button
          class="button is-white is-outlined mt-4"
          @click="addApp"
        >
          <span>Agrega una app o link</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script>
const { shell } = require('electron');
import SearchApp from '@/components/SearchApp.vue';
// import UpdateAppForm from '@/components/apps/UpdateAppForm.vue';
import ContextMenu from '@/components/ContextMenu.vue';
import { mapState, mapActions } from 'vuex';
import draggable from 'vuedraggable';
import appService from '@/utils/appService';

export default {
    components: {
        draggable,
        ContextMenu
    },

    data() {
        return {
            drag: false,
            contextualMenu: [
                {
                    id: '1',
                    title: 'Abrir',
                    type: 'item'
                },
                {
                    id: '2',
                    title: 'Editar',
                    type: 'item'
                },
                {
                    id: '3',
                    isDivider: true,
                    type: 'divider'
                },
                {
                    id: '4',
                    title: 'Eliminar (caja)',
                    type: 'item',
                }
            ]
        };
    },

    computed: {
        ...mapState(['box', 'appsBox', 'app']),

        appsBoxList: {
            get() {
                return this.$store.state.appsBox;
            },
            set(value) {
                this.$store.commit('setAppsBox', value);
            }
        }
    },

    watch: {
        $route(to) {
            // react to route changes...
            this.loadBox(to.params.id);
        }
    },

    created() {
        // Here use `then` instead async/await because it can't use async
        // with the hooks on Vue.js
        this.loadBox(this.$route.params.id);
        this.updateDboxBackground({
            dboxBackground: {
                path: 'home'
            }
        });
    },

    methods: {
        ...mapActions([
            'getBoxById',
            'updateDboxBackground',
            'getAppsById',
            'getAppById',
            'updateBox',
            'getBoxes',
            'updateApp',
            'getApps'
        ]),

        async loadBox(id) {
            await this.getBoxById({ id });
            await this.getAppsById({ appsId: this.box.apps });
            this.box.numOpen++;
            await this.updateBox({ boxId: this.box._id, box: this.box });
            await this.getBoxes();
        },

        async openApps() {
            this.$buefy.notification.open({
                message: '¡Abriendo!',
                type: 'is-black'
            });
            for (const app of this.appsBox) {
                shell.openExternal(app.path);
                app.numLaunch++;
                if (app.firstLaunchDate === null) {
                    app.firstLaunchDate = new Date();
                }
                app.lastLaunchDate = new Date();
                await this.updateApp({ appId: app._id, app: app });
                await this.getApps();
            }
            this.box.numLaunch++;
            if (this.box.firstLaunchDate === null) {
                this.box.firstLaunchDate = new Date();
            }
            this.box.lastLaunchDate = new Date();
            await this.updateBox({ boxId: this.box._id, box: this.box });
            await this.getBoxes();
        },

        addApp() {
            this.$buefy.modal.open({
                parent: this,
                component: SearchApp,
                hasModalCard: true,
                customClass: 'acrylic__modal',
                trapFocus: true,
                props: {
                    hasBox: true
                },
                events: {
                    close: args => {
                        const { submited } = args;
                        if (submited === true) {
                            this.getAppsById({ appsId: this.box.apps });
                            this.$buefy.notification.open({
                                message: 'App agregada',
                                type: 'is-black'
                            });
                        }
                    }
                }
            });
        },

        optionsBox() {
            this.$buefy.notification.open({
                message: 'Próximamente',
                type: 'is-black'
            });
        },

        searchInBox() {
            this.$buefy.notification.open({
                message: 'Próximamente',
                type: 'is-black'
            });
        },

        filterInBox() {
            this.$buefy.notification.open({
                message: 'Próximamente',
                type: 'is-black'
            });
        },

        async updateOrderApp() {
            for (const i in this.appsBoxList) {
                const app = this.appsBoxList[i];
                app.order = parseInt(i) + 1;
                await this.updateApp({ appId: app._id, app });
            }
        },

        async contextualClick(event, app) {
            await this.getAppById({ id: app._id });
            const menuEvents = {
              '1': this.openApp,
              '2': this.updateAppDetail,
              '3': () => {},
              '4': this.deleteAppFromBox
            };
            menuEvents[event.id]();
        },

        ...appService
    }
};
</script>

<style lang="scss" scoped>
::v-deep {
    .dbox-app-card {
        width: 141px;
        height: 188px;
        border-radius: 5px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
    }
    .dbox-app-card:hover {
        filter: brightness(110%);
    }
    .dbox-app-card:active {
        filter: brightness(120%);
    }
    .dbox-btn-box {
        color: hsl(256, 81%, 67%);
    }
    .dbox-btn-box:hover {
        color: hsl(246, 81%, 77%);
    }
    .dbox-btn-box:active {
        color: hsl(236, 81%, 87%);
    }
}
</style>
