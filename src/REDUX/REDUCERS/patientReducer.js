/*
1. başlangıç state'i oluştur --- initial state,
2. reducer'ı yaz


*/

import actionTypes from "../ACTIONS/actionTypes";

const initialState = {
	start: false,
	success: false,
	patient: [],
	fail: false,
	error: "",
};

//reducer: bir fonksiyondur ve işlevi kendisine gelen action'ın type'ına göre ilgili state'de değişiklik yapmaktır.

const patientReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_PATIENT_START:
			return {
				...state,
				start: true,
			};

		case actionTypes.FETCH_PATIENT_SUCCESS:
			return {
				...state,
				start: false,
				fail: false,
				error: "",
				success: true,
				patient: action.payload,
			};

		case actionTypes.FETCH_PATIENT_FAIL:
			return {
				start: false,
				success: false,
				fail: true,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default patientReducer;
