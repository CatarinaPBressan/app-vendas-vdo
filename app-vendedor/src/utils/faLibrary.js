import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faClipboard,
  faUserCog,
  faPencilAlt,
  faCog,
  faHouseDamage,
  faChartLine,
  faTooth,
  faCarCrash,
  faHome,
  faCar,
  faMotorcycle,
  faCreditCard,
  faMobileAlt,
  faHeartbeat,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

export const initIconLibrary = () => {
  library.add(
    faClipboard,
    faUserCog,
    faPencilAlt,
    faCog,
    faHouseDamage,
    faChartLine,
    faHeartbeat,
    faTooth,
    faCarCrash,
    faHome,
    faCar,
    faMotorcycle,
    faMobileAlt,
    faCreditCard,
    faPlus
  );
};
