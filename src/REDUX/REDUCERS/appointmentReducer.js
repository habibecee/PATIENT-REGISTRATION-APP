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

const appointmentReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_APPOINTMENT_START:
			return {
				...state,
				start: true,
			};

		case actionTypes.FETCH_APPOINTMENT_SUCCESS:
			return {
				...state,
				start: false,
				fail: false,
				error: "",
				success: true,
				appointment: action.payload,
			};

		case actionTypes.FETCH_APPOINTMENT_FAIL:
			return {
				start: false,
				success: false,
				fail: true,
				error: action.payload,
			};

		case actionTypes.ADD_APPOINTMENT:
			return {
				...state,
				appointment: [action.payload, ...state.appointment],
			};

		case actionTypes.DELETE_APPOINTMENT:
			const filteredAppointment = state.appointment.filter(
				(item) => item.id !== action.payload
			);

			return {
				...state,
				appointment: filteredAppointment,
			};

		case actionTypes.EDIT_APPOINTMENT:
			const filteredEditedAppointment = state.appointment.filter(
				(item) => item.id !== action.payload.id
			);

			return {
				...state,
				appointment: [...filteredEditedAppointment, action.payload],
			};

		default:
			return state;
	}
};

export default appointmentReducer;
