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
          :to="{ name: item.nameLink, params: { id: item.id, nameBox: item.nameBox } }"
        >
          <b-icon
            pack="fas"
            :icon="item.icon"
            size="is-small"
            custom-class="dbox-icon-menu"
          />
          {{ item.nameBox }}
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
                    nameBox: 'Recientes',
                    link: '/',
                    icon: 'clock',
                    nameLink: 'Home',
                    isActive: true
                },
                {
                    id: '1a',
                    nameBox: 'Local',
                    link: `/box`,
                    icon: 'desktop',
                    nameLink: 'Box',
                    isActive: false
                },
                {
                    id: '2b',
                    nameBox: 'Online',
                    link: `/box`,
                    icon: 'network-wired',
                    nameLink: 'Box',
                    isActive: false
                },
                {
                    id: '3c',
                    nameBox: 'Productividad',
                    link: `/box`,
                    icon: 'bookmark',
                    nameLink: 'Box',
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
