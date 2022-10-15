import Vue from "vue";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPalette,
  faIdCard,
  faTrophy,
  faBacon,
} from "@fortawesome/free-solid-svg-icons";
// import { faFile } from '@fortawesome/free-regular-svg-icons'
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

config.autoAddCss = false;
library.add(faPalette, faIdCard, faTrophy, faBacon, faTwitter);
Vue.component("font-awesome-icon", FontAwesomeIcon);
