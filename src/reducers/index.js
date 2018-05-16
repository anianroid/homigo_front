import {combineReducers} from 'redux';
import BuildingsReducer from './buildings_reducer';
import HousesReducer from './houses_reducer';
import SessionReducer from './session_reducer';
import PaymentsReducer from './payments_reducer';
import MapReducer from './map_reducer';
import SetHousesChoiceReducer from './set_houses_choice_reducer';
import BookingsReducer from './bookings_reducer';
import DashboardReducer from './dashboard_reducer';
import DocumentsReducer from './documents_reducer';
import WalletReducer from './wallet_reducer';
const allReducers = combineReducers({
    buildings: BuildingsReducer,
    houses: HousesReducer,
    session: SessionReducer,
    payments: PaymentsReducer,
    mapConfig: MapReducer,
    housesChoice: SetHousesChoiceReducer,
    bookings: BookingsReducer,
    dashboardView: DashboardReducer,
    documents: DocumentsReducer,
    wallet: WalletReducer
});

export default allReducers;
