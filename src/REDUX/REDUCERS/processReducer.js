/*
1. başlangıç state'i oluştur --- initial state,
2. reducer'ı yaz ---switch/case 


*/

import actionTypes from "../ACTIONS/actionTypes";

const initialState = {
	start: false,
	success: false,
	appointment: [],
	fail: false,
	error: "",
};

//reducer: bir fonksiyondur ve işlevi kendisine gelen action'ın type'ına göre ilgili state'de değişiklik yapmaktır.

const processReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_PROCESS_START:
			return {
				...state,
				start: true,
			};

		case actionTypes.FETCH_PROCESS_SUCCESS:
			return {
				...state,
				start: false,
				fail: false,
				error: "",
				success: true,
				process: action.payload,
			};

		case actionTypes.FETCH_PROCESS_FAIL:
			return {
				start: false,
				success: false,
				fail: true,
				error: action.payload,
			};

		case actionTypes.ADD_PROCESS:
			return {
				...state,
				process: [action.payload, ...state.process],
			};

		case actionTypes.DELETE_PROCESS:
			const filteredProcess = state.process.filter(
				(item) => item.id !== action.payload
			);
			return {
				...state,
				process: filteredProcess,
			};

		case actionTypes.EDIT_PROCESS:
			//ESKİYİ ÇIKAR YENİYİ EKLE !!
			const filteredEditProcess = state.process.filter(
				(item) => item.id !== action.payload.id
			);

			filteredEditProcess.push(action.payload);

			return {
				...state,
				appointment: [...filteredEditProcess, action.payload],
			};

		default:
			return state;
	}
};

export default processReducer;
