import {CHANGE_DASHBOARD_VIEW} from '../actions/types';

const INITIAL_STATE = {dashboardView: 'home'};

export default function(state = INITIAL_STATE, action){
	let result = Object.assign({}, state);
  switch(action.type){
    case CHANGE_DASHBOARD_VIEW:
      return {dashboardView: action.payload.nextView};
    default:
      return state;
  }
}
