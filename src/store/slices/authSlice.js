import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuthenticated: false,
	user: null,
	userRole: null, // 'hospital' or 'professional'
	loading: false,
	error: null
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginStart: state => {
			state.loading = true;
			state.error = null;
		},
		loginSuccess: (state, action) => {
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.userRole = action.payload.role;
			state.loading = false;
			state.error = null;
		},
		loginFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		logout: state => {
			state.isAuthenticated = false;
			state.user = null;
			state.userRole = null;
			state.loading = false;
			state.error = null;
		},
		setUserRole: (state, action) => {
			state.userRole = action.payload;
		},
		updateUser: (state, action) => {
			state.user = { ...state.user, ...action.payload };
		}
	}
});

export const { loginStart, loginSuccess, loginFailure, logout, setUserRole, updateUser } = authSlice.actions;

export default authSlice.reducer;
