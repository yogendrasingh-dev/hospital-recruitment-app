import { createSlice } from '@reduxjs/toolkit';
import { applications } from '../../data/dummyData';

const initialState = {
	applications: applications,
	userApplications: [],
	selectedApplication: null,
	loading: false,
	error: null
};

const applicationSlice = createSlice({
	name: 'application',
	initialState,
	reducers: {
		setApplications: (state, action) => {
			state.applications = action.payload;
		},
		addApplication: (state, action) => {
			state.applications.unshift(action.payload);
			state.userApplications.unshift(action.payload);
		},
		updateApplicationStatus: (state, action) => {
			const { applicationId, status, notes } = action.payload;
			const application = state.applications.find(app => app.id === applicationId);
			if (application) {
				application.status = status;
				application.lastUpdated = new Date().toISOString().split('T')[0];
				if (notes) application.notes = notes;
			}
			const userApplication = state.userApplications.find(app => app.id === applicationId);
			if (userApplication) {
				userApplication.status = status;
				userApplication.lastUpdated = new Date().toISOString().split('T')[0];
				if (notes) userApplication.notes = notes;
			}
		},
		scheduleInterview: (state, action) => {
			const { applicationId, date, time } = action.payload;
			const application = state.applications.find(app => app.id === applicationId);
			if (application) {
				application.status = 'interview';
				application.interviewDate = date;
				application.interviewTime = time;
				application.lastUpdated = new Date().toISOString().split('T')[0];
			}
		},
		setSelectedApplication: (state, action) => {
			state.selectedApplication = action.payload;
		},
		setUserApplications: (state, action) => {
			state.userApplications = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		}
	}
});

export const {
	setApplications,
	addApplication,
	updateApplicationStatus,
	scheduleInterview,
	setSelectedApplication,
	setUserApplications,
	setLoading,
	setError
} = applicationSlice.actions;

export const selectApplicationsByJob = (state, jobId) => {
	return state.application.applications.filter(app => app.jobId === jobId);
};

export const selectApplicationsByStatus = (state, status) => {
	return state.application.userApplications.filter(app => app.status === status);
};

export default applicationSlice.reducer;
