import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faClipboard,
  faUser,
  faUserCog,
  faCog,
  faCar,
  faCreditCard,
  faPlus,
  faFrown,
  faChevronLeft,
  faSignOutAlt,
  faHouseUser,
  faCloudDownloadAlt,
  faEye,
  faHome,
  faSlash,
} from "@fortawesome/free-solid-svg-icons";

export const initIconLibrary = () => {
  library.add(
    faClipboard,
    faUser,
    faUserCog,
    faCog,
    faCar,
    faCreditCard,
    faPlus,
    faFrown,
    faChevronLeft,
    faSignOutAlt,
    faHouseUser,
    faCloudDownloadAlt,
    faEye,
    faHome,
    faSlash,
  );
};
