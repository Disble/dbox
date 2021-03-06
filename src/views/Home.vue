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
        RECIENTEMENTE EJECUTADA POR MÍ
      </h1>
      <div
        v-if="appsLatelyLaunched.length > 0"
        class="is-flex dbox-launched-apps"
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
          Esta sección esta vacia porque aún no has ejecutado alguna app.
        </p>
        <button
          class="button is-white is-outlined mt-4"
          @click="addApp"
        >
          <span>Agrega una app o link</span>
        </button>
      </div>
      <h1 class="has-text-weight-bold is-size-7 has-text-grey-light mt-6">
        RESUMEN DE ACTIVIDAD
      </h1>
      <div class="columns mt-3">
        <div class="column is-one-third">
          <div class="dbox-card-semitransparent px-4 py-4">
            <h2 class="is-size-6 has-text-weight-bold has-text-centered has-text-info">
              5 apps más ejecutadas ({{ appsLaunched }} total)
            </h2>
            <div class="mt-3">
              <charts-bars
                style="width: 100%;"
                :data-bars="appsTop5Launched"
              />
            </div>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="dbox-card-semitransparent px-4 py-4">
            <h2 class="is-size-6 has-text-weight-bold has-text-centered has-text-success">
              5 cajas más ejecutadas ({{ boxesLaunched }} total)
            </h2>
            <div class="mt-3">
              <charts-bars
                style="width: 100%;"
                :data-bars="boxesTop5Launched"
              />
            </div>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="dbox-card-semitransparent px-4 py-4">
            <h2 class="is-size-6 has-text-weight-bold has-text-centered has-text-warning">
              5 apps más visitadas ({{ appsVisited }} total)
            </h2>
            <div class="mt-3">
              <charts-bars
                style="width: 100%;"
                :data-bars="appsTop5Visited"
              />
            </div>
          </div>
        </div>
      </div>
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
              <div
                class="dbox-icon__head mr-3"
                :style="{ backgroundImage: `url('${app.icon}')` }"
              />
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
import ChartsBars from '@/components/apps/ChartsBars.vue';

export default {
    components: {
        ChartsBars
    },
    computed: {
        ...mapState(['apps', 'settings', 'boxes']),

        appsRecentAdded() {
            return this.apps
                .slice()
                .sort((a, b) => b.createDate - a.createDate);
        },

        appsLatelyLaunched() {
            return this.apps
                .filter(app => app.numLaunch > 0)
                .sort((a, b) => b.lastLaunchDate - a.lastLaunchDate);
        },

        appsTop5Launched() {
            const top5 = this.apps
                .filter(app => app.numLaunch > 0)
                .sort((a, b) => b.numLaunch - a.numLaunch)
                .slice(0, 5);
            const labelsApps = [];
            const dataApps = [];
            for (const app of top5) {
                labelsApps.push(
                    app.title.length > 15
                        ? `${app.title.slice(0, 15).trim()}...`
                        : app.title
                );
                dataApps.push(app.numLaunch);
            }
            if (labelsApps.length === 0) return;
            return {
                data: ctx => {
                    const gradient = ctx.createLinearGradient(0, 0, 0, 450);
                    gradient.addColorStop(0, 'hsla(217, 71%, 53%, 1)');
                    gradient.addColorStop(0.4, 'hsla(217, 71%, 53%, 0.1)');

                    return {
                        labels: labelsApps,
                        datasets: [
                            {
                                label: 'Veces ejecutadas',
                                data: dataApps,
                                backgroundColor: gradient,
                                borderWidth: 0
                            }
                        ]
                    };
                }
            };
        },

        boxesTop5Launched() {
            const top5 = this.boxes
                .filter(box => box.numLaunch > 0)
                .sort((a, b) => b.numLaunch - a.numLaunch)
                .slice(0, 5);
            const labelsBoxes = [];
            const dataBoxes = [];
            for (const box of top5) {
                labelsBoxes.push(
                    box.title.length > 15
                        ? `${box.title.slice(0, 15).trim()}...`
                        : box.title
                );
                dataBoxes.push(box.numLaunch);
            }
            if (labelsBoxes.length === 0) return;
            return {
                data: ctx => {
                    const gradient = ctx.createLinearGradient(0, 0, 0, 450);
                    gradient.addColorStop(0, 'hsla(141, 53%, 53%, 1)');
                    gradient.addColorStop(0.4, 'hsla(141, 53%, 53%, 0.1)');

                    return {
                        labels: labelsBoxes,
                        datasets: [
                            {
                                label: 'Veces ejecutadas',
                                data: dataBoxes,
                                backgroundColor: gradient,
                                borderWidth: 0
                            }
                        ]
                    };
                }
            };
        },

        appsTop5Visited() {
            const top5 = this.apps
                .filter(app => app.numOpen > 0)
                .sort((a, b) => b.numOpen - a.numOpen)
                .slice(0, 5);
            const labelsApps = [];
            const dataApps = [];
            for (const app of top5) {
                labelsApps.push(
                    app.title.length > 15
                        ? `${app.title.slice(0, 15).trim()}...`
                        : app.title
                );
                dataApps.push(app.numOpen);
            }
            if (labelsApps.length === 0) return;
            return {
                data: ctx => {
                    const gradient = ctx.createLinearGradient(0, 0, 0, 450);
                    gradient.addColorStop(0, 'hsla(48, 100%, 67%, 1)');
                    gradient.addColorStop(0.4, 'hsla(48, 100%, 67%, 0.1)');

                    return {
                        labels: labelsApps,
                        datasets: [
                            {
                                label: 'Veces visitadas',
                                data: dataApps,
                                backgroundColor: gradient,
                                borderWidth: 0
                            }
                        ]
                    };
                }
            };
        },

        appsVisited() {
            return this.apps
                .filter(app => app.numOpen > 0)
                .map(app => app.numOpen)
                .reduce((a, b) => a + b, 0);
        },

        appsLaunched() {
            return this.apps
                .filter(app => app.numLaunch > 0)
                .map(app => app.numLaunch)
                .reduce((a, b) => a + b, 0);
        },

        boxesLaunched() {
            return this.boxes
                .filter(box => box.numLaunch > 0)
                .map(box => box.numLaunch)
                .reduce((a, b) => a + b, 0);
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
    .dbox-launched-apps {
        width: 100%;
        overflow: auto;
        padding: 1em 0;
    }
    .dbox-icon__head {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        border: 1px solid white;
    }
}
</style>
