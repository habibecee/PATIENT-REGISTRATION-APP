/* 

1. store'a konulacak state'ler için oluşturulan reducer'ları import et!
2. import ettiğin reducerları store'a yüklemek üzere combine et!
3. combine edilen stateleri store'a yükle!

*/

import { combineReducers, createStore } from "redux";
import patientReducer from "./REDUCERS/patientReducer";
import appointmentReducer from "./REDUCERS/appointmentReducer";
import processReducer from "./REDUCERS/processReducer";

const rootReducer = combineReducers({
	patientReducer: patientReducer,
	appointmentReducer: appointmentReducer,
	processReducer: processReducer,
});

const store = createStore(rootReducer);

export default store;
