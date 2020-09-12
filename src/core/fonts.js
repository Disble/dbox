import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
// internal icons
import {
    faClock,
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
    faTrashAlt,
    faNetworkWired,
    faDesktop,
    faSearch,
    faFilter,
    faTimesCircle,
    faCog,
    faBoxOpen,
    faProjectDiagram,
    faWindowMaximize,
    faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
    faClock,
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
    faTrashAlt,
    faNetworkWired,
    faDesktop,
    faSearch,
    faFilter,
    faTimesCircle,
    faCog,
    faBoxOpen,
    faProjectDiagram,
    faWindowMaximize,
    faCheckCircle
);
Vue.component('vue-fontawesome', FontAwesomeIcon);
