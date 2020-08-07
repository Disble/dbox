<template>
  <div>
    <div class="is-flex justify-content-center">
      <div class="buttons has-addons mt-4 mr-4">
        <button class="button is-black has-text-weight-bold dbox-btn-box">
          {{ nameBox }}
        </button>
        <button class="button is-black has-text-weight-bold has-text-grey-lighter">
          Caja
        </button>
      </div>

      <button class="button is-black mt-4 mr-4 has-text-weight-bold has-text-grey-lighter">
        <b-icon
          icon="filter"
          size="is-small"
        />
        <span>Filtrar</span>
      </button>

      <button class="button is-black mt-4 mr-4 has-text-grey-lighter">
        <b-icon
          icon="plus"
          size="is-small"
        />
      </button>

      <button class="button is-black mt-4 mr-4 has-text-weight-bold has-text-grey-light">
        <b-icon
          icon="search"
          size="is-small"
        />
        <span>Buscar</span>
      </button>

      <button class="button is-black mt-4 has-text-grey-lighter">
        <b-icon
          icon="sliders-h"
          size="is-small"
        />
      </button>
    </div>
    <section class="section">
      <div class="is-flex buttons">
        <router-link
          v-for="app in apps"
          :key="app._id"
          :to="`/detail/${app._id}`"
          class="mt-4"
        >
          <div
            class="dbox-app-card mr-5"
            :style="{ backgroundImage: `url('${app.tile}')` }"
          />
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            nameBox: 'Local'
        };
    },

    computed: {
        ...mapState(['apps'])
    },

    watch: {
        $route(to) {
            // react to route changes...
            this.getBox(to.params.id);
        }
    },

    created() {
        const id = this.$route.params.id;
        this.nameBox = this.$route.params.name;

        // console.log('box id', id);

        this.getBox(id);

        // Here use `then` instead async/await because it can't use async
        // with the hooks on Vue.js
        this.getApps();

        this.updateDboxBackground({
            dboxBackground: {
                path: 'home'
            }
        });
    },

    methods: {
        ...mapActions(['getApps', 'updateDboxBackground']),

        getBox(id) {
            console.log('getBox()', {
                id
            });
        }
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
