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
        <span>Add apps & links</span>
      </button>
    </div>
    <section class="section">
      <h1 class="has-text-weight-bold is-size-7 has-text-grey-light">
        RECENTLY LAUNCHED BY ME
      </h1>
      <div class="is-flex">
        <router-link
          v-for="(app, i) in apps"
          :key="app._id"
          :to="`/detail/${app._id}`"
          class="mt-4"
        >
          <div
            class="dbox-app-card"
            :style="{ backgroundImage: `url('${app.tile}')` }"
            :class="{ 'ml-5': i > 0 }"
          />
        </router-link>
      </div>
      <h1 class="has-text-weight-bold is-size-7 has-text-grey-light mt-6">
        THIS MONTH'S SUMMARY
      </h1>
      <div class="is-flex">
        <p class="has-text-grey mt-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, illum saepe! Modi minima id numquam non ea quis doloremque molestias ipsum laudantium natus et, eveniet dignissimos culpa iusto amet accusantium?
        </p>
      </div>
      <h1 class="has-text-weight-bold is-size-7 has-text-grey-light mt-6">
        RECENTLY ADDED
      </h1>
      <ul class="mt-3">
        <router-link
          v-for="app in apps"
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
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CreateAppForm from '@/components/apps/CreateAppForm.vue';

export default {
    computed: {
        ...mapState(['apps'])
    },

    created() {
        console.log('created Home');

        // Here use `then` instead async/await because it can't use async
        // with the hooks on Vue.js
        this.getApps().then(apps => {
            console.log('Apps loaded...', apps);
        });
    },

    methods: {
        ...mapActions(['getApps']),

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
                            this.getApps().then(apps => {
                                console.log('Apps reloaded...', apps);
                            });
                            this.$buefy.notification.open({
                                message: 'App creada',
                                type: 'is-success'
                            });
                        }
                    }
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
::v-deep {
    .dbox-app-card {
        width: 110px;
        height: 146.67px;
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
        // padding-top: 5px;
        // padding-bottom: 5px;
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
}
</style>
