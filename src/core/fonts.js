import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
// internal icons
import {
    faHome,
    faLink,
    faPlus,
    faBookmark,
    faPlay,
    faUpload,
    faCheck,
    faEye,
    faExclamationCircle,
    faTag,
    faStar,
    faSortDown,
    faSortUp,
    faSlidersH,
    faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
    faHome,
    faLink,
    faPlus,
    faBookmark,
    faPlay,
    faUpload,
    faCheck,
    faEye,
    faExclamationCircle,
    faTag,
    faStar,
    faSortDown,
    faSortUp,
    faSlidersH,
    faTrashAlt
);
Vue.component('vue-fontawesome', FontAwesomeIcon);