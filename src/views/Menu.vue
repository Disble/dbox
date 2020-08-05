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
          :to="item.link"
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
                    id: bcrypt.hashSync('Local', 8),
                    name: 'Local',
                    link: '/about',
                    icon: 'desktop',
                    isActive: false
                },
                {
                    id: bcrypt.hashSync('Online', 8),
                    name: 'Online',
                    link: '/about',
                    icon: 'network-wired',
                    isActive: false
                },
                {
                    id: bcrypt.hashSync('Productividad', 8),
                    name: 'Productividad',
                    link: '/about',
                    icon: 'bookmark',
                    isActive: false
                }
            ]
        };
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
