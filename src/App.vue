<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
// Import Bulma's core
@import '~bulma/sass/utilities/_all';

// Set your colors
$primary: #8c67ef;
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);
$semitransparent: rgba(185, 170, 201, 0.1);
$semitransparent-invert: findColorInvert($semitransparent);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    'white': (
        $white,
        $black
    ),
    'black': (
        $black,
        $white
    ),
    'light': (
        $light,
        $light-invert
    ),
    'dark': (
        $dark,
        $dark-invert
    ),
    'primary': (
        $primary,
        $primary-invert
    ),
    'info': (
        $info,
        $info-invert
    ),
    'success': (
        $success,
        $success-invert
    ),
    'warning': (
        $warning,
        $warning-invert
    ),
    'danger': (
        $danger,
        $danger-invert
    ),
    'twitter': (
        $twitter,
        $twitter-invert
    ),
    'semi-transparent': (
        $semitransparent,
        $semitransparent-invert
    )
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Menu
$menu-item-hover-background-color: transparent;
$menu-item-hover-color: white;
$menu-item-color: hsl(0, 0%, 69%);
$menu-item-active-background-color: transparent;

// Import Bulma and Buefy styles
@import '~bulma';
@import '~buefy/src/scss/buefy';

html {
    overflow: hidden;
}

/* Tamaño del scroll */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

/* Estilos barra (thumb) de scroll */
::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:active,
::-webkit-scrollbar-thumb:hover {
    background: #919193;
}

/* Dark scroll bar */
@media (prefers-color-scheme: dark) {
    ::-webkit-scrollbar {
        background-color: hsl(0, 1%, 14%);
    }
    ::-webkit-scrollbar-thumb {
        background: hsl(0, 0%, 20%);
    }

    ::-webkit-scrollbar-thumb:active,
    ::-webkit-scrollbar-thumb:hover {
        background: hsl(240, 1%, 30%);
    }
}
</style>
