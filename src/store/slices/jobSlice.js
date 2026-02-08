import { createSlice } from '@reduxjs/toolkit';
import { jobPostings } from '../../data/dummyData';

const initialState = {
	jobs: jobPostings,
	selectedJob: null,
	savedJobs: [],
	filters: {
		specialty: null,
		location: null,
		salaryMin: null,
		salaryMax: null,
		experienceLevel: null,
		shiftType: null,
		employmentType: null
	},
	loading: false,
	error: null
};

const jobSlice = createSlice({
	name: 'job',
	initialState,
	reducers: {
		setJobs: (state, action) => {
			state.jobs = action.payload;
		},
		addJob: (state, action) => {
			state.jobs.unshift(action.payload);
		},
		updateJob: (state, action) => {
			const index = state.jobs.findIndex(job => job.id === action.payload.id);
			if (index !== -1) {
				state.jobs[index] = { ...state.jobs[index], ...action.payload };
			}
		},
		deleteJob: (state, action) => {
			state.jobs = state.jobs.filter(job => job.id !== action.payload);
		},
		setSelectedJob: (state, action) => {
			state.selectedJob = action.payload;
		},
		toggleSaveJob: (state, action) => {
			const jobId = action.payload;
			const index = state.savedJobs.indexOf(jobId);
			if (index > -1) {
				state.savedJobs.splice(index, 1);
			} else {
				state.savedJobs.push(jobId);
			}
		},
		setFilters: (state, action) => {
			state.filters = { ...state.filters, ...action.payload };
		},
		clearFilters: state => {
			state.filters = {
				specialty: null,
				location: null,
				salaryMin: null,
				salaryMax: null,
				experienceLevel: null,
				shiftType: null,
				employmentType: null
			};
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
	setJobs,
	addJob,
	updateJob,
	deleteJob,
	setSelectedJob,
	toggleSaveJob,
	setFilters,
	clearFilters,
	setLoading,
	setError
} = jobSlice.actions;

export const selectFilteredJobs = state => {
	let filtered = state.job.jobs;
	const filters = state.job.filters;

	if (filters.specialty) {
		filtered = filtered.filter(job => job.specialty === filters.specialty);
	}
	if (filters.location) {
		filtered = filtered.filter(job => job.location.toLowerCase().includes(filters.location.toLowerCase()));
	}
	if (filters.salaryMin) {
		filtered = filtered.filter(job => job.salaryMax >= filters.salaryMin);
	}
	if (filters.salaryMax) {
		filtered = filtered.filter(job => job.salaryMin <= filters.salaryMax);
	}
	if (filters.shiftType) {
		filtered = filtered.filter(job => job.shiftType === filters.shiftType);
	}
	if (filters.employmentType) {
		filtered = filtered.filter(job => job.employmentType === filters.employmentType);
	}

	return filtered;
};

export default jobSlice.reducer;
