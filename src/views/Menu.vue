<template>
  <aside class="menu">
    <p class="menu-label">
      Cajas
    </p>
    <ul class="menu-list">
      <li
        v-for="(item, index) in menu"
        :key="index"
        @click="toggleActive(item)"
      >
        <router-link
          :class="{ 'is-active': item.isActive }"
          :to="{ path: item.link, params: { name: item.name } }"
        >
          <b-icon
            pack="fas"
            :icon="item.icon"
            size="is-small"
            custom-class="dbox-icon-menu"
          />
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
import bcrypt from 'bcryptjs';

export default {
    data() {
        return {
            menu: [
                {
                    id: bcrypt.hashSync('Recientes', 8),
                    name: 'Recientes',
                    link: '/',
                    icon: 'clock',
                    isActive: true
                },
                {
                    id: '1a',
                    name: 'Local',
                    link: `/box/${'1a'}`,
                    icon: 'desktop',
                    isActive: false
                },
                {
                    id: '2b',
                    name: 'Online',
                    link: `/box/${'2b'}`,
                    icon: 'network-wired',
                    isActive: false
                },
                {
                    id: '3c',
                    name: 'Productividad',
                    link: `/box/${'3c'}`,
                    icon: 'bookmark',
                    isActive: false
                }
            ]
        };
    },

    created() {
        // console.log('this.$route from Menu', this.$route);
        this.menu.forEach(route => {
            if (route.id === this.$route.params.id) {
                this.toggleActive(route);
                return;
            }
        });
    },

    methods: {
        toggleActive(itemActive) {
            this.menu.forEach(item => {
                if (item.id === itemActive.id) {
                    item.isActive = true;
                    return;
                }
                item.isActive = false;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
::v-deep {
    .dbox-icon-menu {
        padding-top: 10px;
        margin-right: 23px;
    }
}
</style>
