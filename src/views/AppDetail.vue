<template>
  <div>
    <div class="is-flex justify-content-center">
      <button
        class="button is-primary mt-4"
        @click="openApp"
      >
        <b-icon
          icon="play"
          size="is-small"
        />
        <span>Abrir</span>
      </button>

      <button
        class="button is-black mt-4 ml-4"
        @click="updateAppDetail"
      >
        <b-icon
          icon="sliders-h"
          size="is-small"
        />
      </button>

      <button
        class="button is-black mt-4 ml-4"
        @click="removeAppDetail"
      >
        <b-icon
          icon="trash-alt"
          size="is-small"
        />
      </button>
    </div>
    <section class="section">
      <h1 class="title has-text-centered has-text-white">
        {{ app.title }}
      </h1>
      <figure class="image is-128x128">
        <img :src="app.tile">
      </figure>
    </section>
  </div>
</template>

<script>
const { shell } = require('electron');
import { mapState, mapActions } from 'vuex';
import UpdateAppForm from '@/components/apps/UpdateAppForm.vue';

export default {
    computed: {
        ...mapState(['app', 'dboxBackground'])
    },

    watch: {
        '$route.params.id'(id) {
            this.loadApp(id);
        }
    },

    created() {
        const id = this.$route.params.id;
        this.loadApp(id);
    },

    methods: {
        ...mapActions([
            'getAppById',
            'getApps',
            'deleteApp',
            'updateDboxBackground',
            'updateApp'
        ]),

        async loadApp(id) {
            await this.getAppById({ id });
            this.updateDboxBackground({
                dboxBackground: {
                    backgroundUrl: this.app.background,
                    path: 'detail'
                }
            });
            this.app.numOpen++;
            await this.updateApp({ appId: this.app._id, app: this.app });
        },

        async openApp() {
            this.$buefy.notification.open({
                message: '¡Abriendo!',
                type: 'is-black'
            });
            await shell.openExternal(this.app.path);
            this.app.numLaunch++;
            if (this.app.firstLaunchDate === null) {
                this.app.firstLaunchDate = new Date();
            }
            this.app.lastLaunchDate = new Date();
            this.updateApp({ appId: this.app._id, app: this.app });
        },

        updateAppDetail() {
            this.$buefy.modal.open({
                parent: this,
                component: UpdateAppForm,
                hasModalCard: true,
                customClass: 'acrylic__modal',
                trapFocus: true,
                events: {
                    close: args => {
                        const { submited } = args;
                        if (submited === true) {
                            this.getApps();
                            this.$buefy.notification.open({
                                message: 'App actualizada',
                                type: 'is-success'
                            });
                        }
                    }
                }
            });
        },

        removeAppDetail() {
            this.$buefy.dialog.confirm({
                title: `Borrando "${this.app.title}"`,
                message: `Estas apunto de borrar "${this.app.title}". </ br> ¿Estás seguro?`,
                confirmText: 'Borrar',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () =>
                    this.deleteApp({ appId: this.app._id }).then(() => {
                        this.$router.push({ name: 'Home' });
                    })
            });
        }
    }
};
</script>

<style lang="scss" scoped>
::v-deep {
    .justify-content-center {
        justify-content: center;
    }
    .align-items-center {
        align-items: center;
    }
}
</style>
