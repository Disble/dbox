<template>
  <div>
    <section class="section-menu-options">
      <div class="is-flex justify-content-space-between">
        <b-button
          type="is-transparent"
          @click="settings"
        >
          <b-icon
            pack="fas"
            icon="cog"
            size="is-small"
          />
        </b-button>
        <b-button
          type="is-transparent"
          @click="searchApp"
        >
          <b-icon
            pack="fas"
            icon="search"
            size="is-small"
          />
        </b-button>
      </div>
    </section>
    <section class="section">
      <aside class="menu">
        <p class="menu-label">
          Cajas
          <span
            class="is-pulled-right dbox-box-icon"
            @click="newBox"
          >
            <b-icon
              pack="fas"
              icon="plus"
              size="is-small"
            />
          </span>
        </p>
        <ul class="menu-list">
          <li
            v-for="box in menu"
            :key="box._id"
            class="mb-1 dbox-row-menu is-flex align-items-center justify-content-space-between"
            @click="toggleActive(box)"
          >
            <router-link
              class="is-fullwidth-dbox is-flex align-items-center"
              :class="{ 'is-active': box.isActive }"
              :to="{ name: box.nameLink, params: { id: box._id, nameBox: box.title } }"
            >
              <b-icon
                pack="fas"
                :icon="box.icon"
                size="is-small"
                custom-class="dbox-icon-menu"
              />
              <span
                v-if="!box.isEditable"
                @dblclick="box.isEditable = true"
              >{{ box.title }}</span>
              <b-input
                v-else
                v-model="box.title"
                custom-class="dbox-input-editable has-text-white"
                @blur="updateMenuItem(box)"
              />
            </router-link>
            <span
              class="is-inline-flex align-items-center dbox-item-menu-trash dbox-box-icon"
              @click="deleteMenuItem(box)"
            >
              <b-icon
                pack="fas"
                icon="trash-alt"
                size="is-small"
              />
            </span>
          </li>
        </ul>
      </aside>
    </section>
  </div>
</template>

<script>
import bcrypt from 'bcryptjs';
import { mapState, mapActions } from 'vuex';
import SearchApp from '@/components/SearchApp.vue';

export default {
    data() {
        return {
            menu: [
                {
                    apps: [],
                    createdDate: null,
                    customOptions: {
                        aditionalDate: false,
                        rating: false,
                        sizeText: 10,
                        title: false
                    },
                    defaultSort: '',
                    defaultView: 'grid',
                    deleteDate: null,
                    lastLaunchDate: null,
                    modifiedDate: null,
                    title: 'Recientes',
                    numLaunch: 0,
                    numRun: 0,
                    visible: true,
                    _id: bcrypt.hashSync('Recientes', 8),
                    link: '/',
                    icon: 'clock',
                    nameLink: 'Home',
                    isActive: true,
                    isEditable: false
                }
            ]
        };
    },

    computed: {
        ...mapState(['boxes', 'box'])
    },

    created() {
        // console.log('this.$route from Menu', this.$route);
        this.getBoxes().then(boxes => {
            console.log('getBoxes()', boxes);
            boxes.forEach(box => {
                const menuBox = this.createItemMenu(box);
                this.menu.push(menuBox);
            });
            //
            this.menu.forEach(box => {
                if (box._id === this.$route.params.id) {
                    this.toggleActive(box);
                    return;
                }
            });
        });
    },

    methods: {
        ...mapActions(['getBoxes', 'createBox', 'updateBox', 'deleteBox']),
        toggleActive(itemActive) {
            this.menu.forEach(item => {
                if (item._id === itemActive._id) {
                    item.isActive = true;
                    return;
                }
                item.isActive = false;
            });
        },

        searchApp() {
            this.$buefy.modal.open({
                parent: this,
                component: SearchApp,
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

        settings() {
            this.$buefy.notification.open({
                message: 'Próximamente',
                type: 'is-black'
            });
        },

        async newBox() {
            const box = {
                title: 'Nueva caja',
                apps: [],
                numOpen: 0,
                numLaunch: 0,
                createdDate: new Date(),
                modifiedDate: null,
                deletedDate: null, // tentativo porque puede que si se borren
                firstLaunchDate: null,
                lastLaunchDate: null,
                timeLaunched: 0,
                state: 'ok',
                visible: true,
                defaultSort: '', // tentativo
                defaultView: 'grid', // si se ve en lista o con portadas
                customOptions: {
                    // solo para grid
                    title: false,
                    rating: false,
                    aditionalData: false,
                    sizeText: 10
                }
            };
            const boxCreated = await this.createBox({ box });
            await this.getBoxes();
            const boxCreatedMenu = this.createItemMenu(boxCreated, true);
            this.menu.push(boxCreatedMenu);
        },

        async updateMenuItem(box) {
            box.isEditable = false;
            this.box.title = box.title;
            this.box.modifiedDate = new Date();
            await this.updateBox({ boxId: box._id, box: this.box });
            await this.getBoxes();
        },

        createItemMenu(originalBox, isEditable = false) {
            const defaultIcons = {
                Local: 'desktop',
                Online: 'network-wired'
            };
            const boxCreatedMenu = Object.assign({}, originalBox);
            boxCreatedMenu.link = '/box';
            boxCreatedMenu.icon =
                defaultIcons[boxCreatedMenu.title] || 'bookmark';
            boxCreatedMenu.nameLink = 'Box';
            boxCreatedMenu.isActive = false;
            boxCreatedMenu.isEditable = isEditable;
            return boxCreatedMenu;
        },

        deleteMenuItem(box) {
            this.$buefy.dialog.confirm({
                title: `Borrando "${box.title}"`,
                message: `Estas apunto de borrar "${box.title}". ¿Estás seguro?`,
                confirmText: 'Borrar',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: async () => {
                    await this.deleteBox({ boxId: box._id });
                    const itemMenu = this.menu.indexOf(box);
                    this.menu.splice(itemMenu, 1);
                    await this.getBoxes();
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.section-menu-options {
    padding: 24px 16px 0;
}
.dbox-box-icon {
    cursor: pointer;
}
.dbox-box-icon:hover {
    color: hsl(0, 0%, 68%);
}
.dbox-box-icon:active {
    color: hsl(0, 0%, 78%);
}
.dbox-row-menu .dbox-item-menu-trash {
    display: none !important;
}
.dbox-row-menu:hover .dbox-item-menu-trash {
    display: inline-flex !important;
}
::v-deep {
    .dbox-input-editable {
        border: 0;
        background-color: transparent;
    }
    .dbox-icon-menu {
        // padding-top: 10px;
        margin-right: 23px;
    }
}
</style>
