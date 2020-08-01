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
      <h1 class="has-text-weight-bold is-size-7 has-text-grey-light">RECENTLY LAUNCHED BY ME</h1>
      <div class="is-flex">
        <router-link
          to="/detail/1"
          class="mt-4"
        >
          <div
            class="dbox-app-card"
            style="background-image: url(https://www.muycomputer.com/wp-content/uploads/2020/02/Microsoft-Word-560x600.jpg)"
          />
        </router-link>
        <router-link
          to="/detail/2"
          class="mt-4 ml-5"
        >
          <div
            class="dbox-app-card"
            style="background-image: url(https://us.123rf.com/450wm/dennizn/dennizn1606/dennizn160600056/58006921-montreal-canad%C3%A1-23-de-mayo-2016-logotipo-de-microsoft-office-powerpoint-en-una-pantalla-de-tel%C3%A9fono-m%C3%B3vil-m.jpg?ver=6)"
          />
        </router-link>
      </div>
      <h1 class="has-text-weight-bold is-size-7 has-text-grey-light mt-6">THIS MONTH'S SUMMARY</h1>
      <div class="is-flex">
        <p class="has-text-grey mt-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, illum saepe! Modi minima id numquam non ea quis doloremque molestias ipsum laudantium natus et, eveniet dignissimos culpa iusto amet accusantium?
        </p>
      </div>
      <h1 class="has-text-weight-bold is-size-7 has-text-grey-light mt-6">RECENTLY ADDED</h1>
      <ul class="mt-3">
        <li class="has-text-grey-lighter is-size-7 is-flex align-items-center acrylic__hover dbox-icon-app__row">
          <span>
            <figure class="image is-16x16 mr-3">
              <img
                class="is-rounded dbox-icon-app"
                src="https://icons.iconarchive.com/icons/blackvariant/button-ui-microsoft-office-apps/1024/Microsoft-Office-Word-icon.png"
              >
            </figure>
          </span>
          <span>Ligeo</span>
        </li>
        <li class="has-text-grey-lighter is-size-7 is-flex align-items-center acrylic__hover dbox-icon-app__row">
          <span>
            <figure class="image is-16x16 mr-3">
              <img
                class="is-rounded dbox-icon-app"
                src="https://icons.iconarchive.com/icons/blackvariant/button-ui-microsoft-office-apps/1024/Microsoft-Office-Word-icon.png"
              >
            </figure>
          </span>
          <span>Autoreas</span>
        </li>
        <li class="has-text-grey-lighter is-size-7 is-flex align-items-center acrylic__hover dbox-icon-app__row">
          <span>
            <figure class="image is-16x16 mr-3">
              <img
                class="is-rounded dbox-icon-app"
                src="https://icons.iconarchive.com/icons/blackvariant/button-ui-microsoft-office-apps/1024/Microsoft-Office-Word-icon.png"
              >
            </figure>
          </span>
          <span>D-cal</span>
        </li>
        <li class="has-text-grey-lighter is-size-7 is-flex align-items-center acrylic__hover dbox-icon-app__row">
          <span>
            <figure class="image is-16x16 mr-3">
              <img
                class="is-rounded dbox-icon-app"
                src="https://icons.iconarchive.com/icons/blackvariant/button-ui-microsoft-office-apps/1024/Microsoft-Office-Word-icon.png"
              >
            </figure>
          </span>
          <span>GOG Galaxy</span>
        </li>
        <li class="has-text-grey-lighter is-size-7 is-flex align-items-center acrylic__hover dbox-icon-app__row">
          <span>
            <figure class="image is-16x16 mr-3">
              <img
                class="is-rounded dbox-icon-app"
                src="https://icons.iconarchive.com/icons/blackvariant/button-ui-microsoft-office-apps/1024/Microsoft-Office-Word-icon.png"
              >
            </figure>
          </span>
          <span>Notion</span>
        </li>
        <li class="has-text-grey-lighter is-size-7 is-flex align-items-center acrylic__hover dbox-icon-app__row">
          <span>
            <figure class="image is-16x16 mr-3">
              <img
                class="is-rounded dbox-icon-app"
                src="https://icons.iconarchive.com/icons/blackvariant/button-ui-microsoft-office-apps/1024/Microsoft-Office-Word-icon.png"
              >
            </figure>
          </span>
          <span>Microsoft Edge</span>
        </li>
        <li class="has-text-grey-lighter is-size-7 is-flex align-items-center acrylic__hover dbox-icon-app__row">
          <span>
            <figure class="image is-16x16 mr-3">
              <img
                class="is-rounded dbox-icon-app"
                src="https://icons.iconarchive.com/icons/blackvariant/button-ui-microsoft-office-apps/1024/Microsoft-Office-Word-icon.png"
              >
            </figure>
          </span>
          <span>Vivaldi</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
    methods: {
        addApp() {
            this.$buefy.notification.open({
                message: 'Clicked!!',
                type: 'is-black'
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
