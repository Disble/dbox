<template>
  <div>
    <div class="is-flex justify-content-center">
      <button
        class="button is-black mt-4"
        @click="addApp"
      >
        <b-icon
          icon="plus"
          size="is-small"
        />
        <span>Agregar apps & links</span>
      </button>
    </div>
    <section class="section">
      <b-notification
        v-if="settings"
        type="is-semi-transparent dbox-banner"
        aria-close-label="Close notification"
        @close="closeBanner"
      >
        <div class="dbox-banner-content">
          <p class="has-text-centered">
            Conecta todas tus aplicaciones tanto de escritorio como de navegador en una sola librería.
          </p>

          <div class="tile is-ancestor dbox-icons-banner mt-3">
            <div class="tile is-vertical">
              <div class="tile">
                <div class="tile is-parent is-vertical">
                  <article class="tile is-child is-flex align-items-center">
                    <b-icon
                      pack="fas"
                      icon="box-open"
                      size="is-small"
                    />
                    <p class="ml-5 is-size-7">
                      Organiza y ejecuta tus aplicaciones desde colecciones (cajas).
                    </p>
                  </article>
                  <article class="tile is-child is-flex align-items-center">
                    <b-icon
                      pack="fas"
                      icon="network-wired"
                      size="is-small"
                    />
                    <p class="ml-5 is-size-7">
                      Funciona tanto con apps de escritorio como links de navegador.
                    </p>
                  </article>
                </div>
                <div class="tile is-parent is-vertical">
                  <article class="tile is-child is-flex align-items-center">
                    <b-icon
                      pack="fas"
                      icon="desktop"
                      size="is-small"
                    />
                    <p class="ml-5 is-size-7">
                      No necesitas estar conectado a internet para utilizar dbox.
                    </p>
                  </article>
                  <article class="tile is-child is-flex align-items-center">
                    <b-icon
                      pack="fas"
                      icon="project-diagram"
                      size="is-small"
                    />
                    <p class="ml-5 is-size-7">
                      Has un seguimiento de la actividad que realices.
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-notification>
      <h1 class="has-text-weight-bold is-size-7 has-text-grey-light">
        RECIENTEMENTE LANZADA POR MÍ
      </h1>
      <div
        v-if="appsLatelyLaunched.length > 0"
        class="is-flex buttons"
      >
        <router-link
          v-for="app in appsLatelyLaunched"
          :key="app._id"
          :to="`/detail/${app._id}`"
          class="mt-4"
        >
          <div
            class="dbox-app-card mr-4"
            :style="{ backgroundImage: `url('${app.tile}')` }"
          />
        </router-link>
      </div>
      <div
        v-else
        class="section has-text-centered dbox-card-semitransparent mt-3"
      >
        <h2 class="is-size-6 has-text-weight-bold has-text-grey-light">
          ¡Vamos a agregar algunas apps!
        </h2>
        <p class="has-text-grey-light mt-4">
          Esta sección esta vacia porque aún no has lanzado alguna app.
        </p>
        <button
          class="button is-white is-outlined mt-4"
          @click="addApp"
        >
          <span>Agrega una app o link</span>
        </button>
      </div>
      <h1 class="has-text-weight-bold is-size-7 has-text-grey-light mt-6">
        ESTADISTICAS
      </h1>
      <div
        class="mt-4"
        style="height: 100px; width: 100px;"
      >
      </div>
      <charts-home />
      <h1 class="has-text-weight-bold is-size-7 has-text-grey-light mt-6">
        RECIENTEMENTE AÑADIDAS
      </h1>
      <ul
        v-if="apps.length > 0"
        class="mt-3"
      >
        <router-link
          v-for="app in appsRecentAdded"
          :key="app._id"
          :to="`/detail/${app._id}`"
        >
          <li class="has-text-grey-lighter is-size-7 is-flex align-items-center acrylic__hover dbox-icon-app__row">
            <span>
              <figure class="image is-16x16 mr-3">
                <img
                  class="is-rounded dbox-icon-app"
                  :src="app.icon"
                >
              </figure>
            </span>
            <span>{{ app.title }}</span>
          </li>
        </router-link>
      </ul>
      <div
        v-else
        class="section has-text-centered dbox-card-semitransparent mt-3"
      >
        <h2 class="is-size-6 has-text-weight-bold has-text-grey-light">
          ¡Parece que tu librería esta vacía!
        </h2>
        <p class="has-text-grey-light mt-4">
          Agrega alguna app o link y empieza tu colección.
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
import { mapState, mapActions } from 'vuex';
import CreateAppForm from '@/components/apps/CreateAppForm.vue';
import ChartsHome from '@/components/apps/ChartsHome.vue';

export default {
    components: {
        ChartsHome
    },
    computed: {
        ...mapState(['apps', 'settings']),

        appsRecentAdded() {
            return this.apps
                .slice()
                .sort((a, b) => b.createDate - a.createDate);
        },

        appsLatelyLaunched() {
            return this.apps
                .filter(app => app.numLaunch > 0)
                .sort((a, b) => b.lastLaunchDate - a.lastLaunchDate);
        }
    },

    created() {
        // Here use `then` instead async/await because it can't use async
        // with the hooks on Vue.js
        this.getApps();
        this.updateDboxBackground({
            dboxBackground: {
                path: 'home'
            }
        });
        this.getSetting({ key: 'firstTime.home', value: true });
    },

    methods: {
        ...mapActions([
            'getApps',
            'updateDboxBackground',
            'getSetting',
            'setSetting'
        ]),

        addApp() {
            this.$buefy.modal.open({
                parent: this,
                component: CreateAppForm,
                hasModalCard: true,
                customClass: 'acrylic__modal',
                trapFocus: true,
                events: {
                    close: args => {
                        const { submited } = args;
                        if (submited === true) {
                            this.getApps();
                            this.$buefy.notification.open({
                                message: 'App creada',
                                type: 'is-success'
                            });
                        }
                    }
                }
            });
        },

        closeBanner() {
            this.setSetting({ key: 'firstTime.home', value: false });
        }
    }
};
</script>

<style lang="scss" scoped>
::v-deep {
    .dbox-app-card {
        width: 99px;
        height: 132px;
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
    .dbox-icon-app {
        border: 1px solid white;
    }
    .dbox-icon-app__row {
        padding: 6px 8px;
        border-radius: 1px;
        margin-left: -8px;
        cursor: pointer;
    }
    .dbox-icon-app__row:hover {
        /* Parent background + Gaussian blur */
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);

        /* Exclusion blend */
        background-blend-mode: exclusion;

        /* Color/tint overlay + Opacity */
        background: rgba(255, 255, 255, 0.2);
    }
    .dbox-icon-app__row:active {
        /* Parent background + Gaussian blur */
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);

        /* Exclusion blend */
        background-blend-mode: exclusion;

        /* Color/tint overlay + Opacity */
        background: rgba(255, 255, 255, 0.3);
    }
    .dbox-icons-banner {
        padding: 10px 20%;
    }
    .dbox-banner {
        position: relative;
    }
    .dbox-banner::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: radial-gradient(
                circle,
                rgba(43, 16, 80, 0.7595413165266106) 25%,
                rgba(179, 224, 255, 0) 100%,
                rgba(140, 103, 239, 0) 100%,
                rgba(179, 224, 255, 1) 100%
            ),
            url('../assets/banner_home.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        filter: blur(2px);
        opacity: 0.4;
    }
    .dbox-banner-content {
        position: relative;
    }
}
</style>
