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
    </div>
    <section class="section">
      <h1 class="title has-text-centered has-text-white">{{ app.title }}</h1>
      <figure class="image is-128x128">
        <img :src="app.tile">
      </figure>
    </section>
  </div>
</template>

<script>
const { shell } = require('electron');
import { mapState, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState(['app'])
    },

    created() {
        const id = this.$route.params.id;

        console.log('app id', id);

        if (!this.app || !this.app.id || this.app.id !== id) {
            this.getAppById({ id }).then(() => {
                console.log('App loaded...');
            });
        }
    },

    methods: {
        ...mapActions(['getAppById']),

        async openApp() {
            this.$buefy.notification.open({
                message: 'Opened!!',
                type: 'is-black'
            });
            await shell.openExternal(this.app.path);
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
