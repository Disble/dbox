<template>
  <section
    class="dcal-media is-relative"
    :style="{ backgroundImage: `url('${dboxBackground.backgroundUrl}')` }"
  >
    <div class="columns is-gapless">
      <div
        class="column is-narrow dbox-fullheight acrylic acrylic__black-4"
        :class="{ 'acrylic__blur-1': dboxBackground.path !== 'home' }"
      >
        <section class="section dbox-menu">
          <Menu />
        </section>
      </div>
      <div
        class="column rest dbox-fullheight acrylic acrylic__black"
        :class="{ 'acrylic__blur-1': dboxBackground.path !== 'home' }"
      >
        <router-view />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import Menu from '@/views/Menu';

export default {
    components: {
        Menu
    },

    computed: {
        ...mapState(['dboxBackground'])
    }
};
</script>

<style lang="scss" scoped>
.dbox-menu {
    width: 300px;
}
.dbox-fullheight {
    height: 100vh;
    overflow: auto;
}
.dcal-media {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
</style>
