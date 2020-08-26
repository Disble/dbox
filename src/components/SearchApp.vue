<template>
  <div class="acrylic__search dbox-search">
    <div class="dbox-search-head is-flex align-items-center justify-content-space-between">
      <span v-if="selected !== null">
        <div
          class="dbox-icon__head ml-3"
          :style="{ backgroundImage: `url('${selected.icon}')` }"
        />
      </span>
      <b-input
        ref="inputSearch"
        v-model="name"
        placeholder="Busca por cualquier app y..."
        :icon="selected !== null ? '' : 'search'"
        custom-class="has-text-grey-lighter has-text-weight-bold dbox-search-input"
        :style="{ 'width': selected !== null && hasBox ? 'auto' : 'inherit' }"
      />
      <div
        v-if="selected !== null"
        class="buttons"
      >
        <b-button
          type="is-primary"
          @click="openApp"
        >
          Mostrar app
        </b-button>
        <b-button
          v-if="hasBox"
          type="is-white"
          outlined
          @click="addAppToBox"
        >
          Agregar a caja
        </b-button>
      </div>
    </div>
    <section class="section dbox-search-list">
      <h1 class="has-text-grey-light is-size-7 has-text-weight-bold">
        APPS ({{ filteredDataArray.length }})
      </h1>
      <ul class="mt-3">
        <li
          v-for="app in filteredDataArray"
          :key="app._id"
          class="has-text-white-ter is-flex align-items-center acrylic-white__hover dbox-icon-app__row"
          :class="{'acrylic-primary': selected !== null && app._id === selected._id}"
          @click="selectApp(app)"
        >
          <span>
            <div
              class="dbox-icon"
              :style="{ backgroundImage: `url('${app.icon}')` }"
            />
          </span>
          <span>{{ app.title }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    props: {
        hasBox: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            name: '',
            selected: null
        };
    },

    computed: {
        ...mapState(['apps', 'box']),

        filteredDataArray() {
            return this.apps.filter(app => {
                return (
                    app.title
                        .toString()
                        .toLowerCase()
                        .indexOf(this.name.toLowerCase()) >= 0
                );
            });
        }
    },

    created() {
        this.getApps();
    },

    mounted() {
        this.$refs.inputSearch.focus();
    },

    methods: {
        ...mapActions(['getApps', 'updateBox']),

        selectApp(app) {
            this.selected = app;
            console.log(this.selected);
            this.name = app.title;
        },

        openApp() {
            this.$router.push({ path: `/detail/${this.selected._id}` });
            this.cancel(false);
        },

        addAppToBox() {
            console.log('addAppToBox()', this.selected, this.box);
            this.box.apps.push(this.selected._id);
            this.updateBox({ boxId: this.box._id, box: this.box }).then(() => {
                this.cancel(true);
            });
        },

        cancel(submited) {
            this.$emit('close', { submited });
        }
    }
};
</script>

<style lang="scss" scoped>
.dbox-icon {
    display: inline-block;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 10px;
    border: 1px solid white;
}
.dbox-icon__head {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 10px;
    border: 1px solid white;
}
.dbox-icon-app__row {
    padding: 6px 8px;
    border-radius: 5px;
    cursor: pointer;
}
.dbox-search-list {
    position: relative;
    max-height: 60vh;
    overflow: auto;
    padding: 24px 12px;
}
.dbox-search {
    min-width: 40vw;
    border-radius: 8px;
    border: 1px solid hsla(0, 0%, 0%, 0.2);
}
::v-deep {
    .width-inherit {
        width: inherit;
    }
    .dbox-search-head {
        width: 100%;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-right: 12px;
        border-radius: 8px 8px 0 0;
        border-bottom: 1px solid hsla(0, 0%, 0%, 0.2);
        //
        /* Parent background + Gaussian blur */
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);

        /* Exclusion blend */
        background-blend-mode: exclusion;

        /* Color/tint overlay + Opacity */
        background: transparent;
    }
    .dbox-search-input {
        border: 0;
        //
        /* Parent background + Gaussian blur */
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);

        /* Exclusion blend */
        background-blend-mode: exclusion;

        /* Color/tint overlay + Opacity */
        background: transparent;
    }
    ::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: hsl(0, 0%, 40%);
        opacity: 1; /* Firefox */
        font-weight: normal;
    }
    ::-webkit-scrollbar {
        background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: hsl(0, 0%, 30%);
    }

    ::-webkit-scrollbar-thumb:active,
    ::-webkit-scrollbar-thumb:hover {
        background: hsl(240, 1%, 40%);
    }
}
</style>
