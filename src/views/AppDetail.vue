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
        <span>Open</span>
      </button>

      <button
        class="button is-black mt-4 ml-4"
        @click="updateApp"
      >
        <b-icon
          icon="sliders-h"
          size="is-small"
        />
      </button>

      <button
        class="button is-black mt-4 ml-4"
        @click="removeApp"
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

    created() {
        const id = this.$route.params.id;

        console.log('app id', id);

        if (!this.app || !this.app.id || this.app.id !== id) {
            this.getAppById({ id }).then(app => {
                console.log('App loaded...', app);
                this.updateDboxBackground({
                    dboxBackground: this.app.background
                });
            });
        }
    },

    methods: {
        ...mapActions(['getAppById', 'deleteApp', 'updateDboxBackground']),

        async openApp() {
            this.$buefy.notification.open({
                message: 'Opened!!',
                type: 'is-black'
            });
            await shell.openExternal(this.app.path);
        },

        updateApp() {
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
                            this.getApps().then(apps => {
                                console.log('Apps reloaded...', apps);
                            });
                            this.$buefy.notification.open({
                                message: 'App actualizada',
                                type: 'is-success'
                            });
                        }
                    }
                }
            });
        },

        removeApp() {
            this.$buefy.dialog.confirm({
                title: `Borrando "${this.app.title}"`,
                message: `Estas apunto de borrar "${this.app.title}". </ br> ¿Estás seguro?`,
                confirmText: 'Borrar',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () =>
                    this.deleteApp({ appId: this.app._id }).then(res => {
                        console.log('Apps reloaded...', res);
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
