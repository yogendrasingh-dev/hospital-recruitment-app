export const hospitals = [
	{
		id: 'h1',
		name: 'City General Hospital',
		email: 'admin@citygeneral.com',
		phone: '+1234567890',
		location: 'New York, NY',
		address: '123 Medical Center Drive, New York, NY 10001',
		latitude: 40.7128,
		longitude: -74.006,
		type: 'Multi-Specialty',
		beds: 500,
		established: 1985,
		verified: true,
		rating: 4.5,
		logo: 'https://via.placeholder.com/150/00B4D8/FFFFFF?text=CGH',
		description: 'Leading multi-specialty hospital providing comprehensive healthcare services.',
		facilities: ['ICU', 'Emergency', 'Surgery', 'Radiology', 'Laboratory']
	},
	{
		id: 'h2',
		name: 'MediCare Central',
		email: 'hr@medicarecentral.com',
		phone: '+1234567891',
		location: 'Los Angeles, CA',
		address: '456 Healthcare Ave, Los Angeles, CA 90001',
		latitude: 34.0522,
		longitude: -118.2437,
		type: 'Specialty',
		beds: 300,
		established: 1992,
		verified: true,
		rating: 4.3,
		logo: 'https://via.placeholder.com/150/0096C7/FFFFFF?text=MC',
		description: 'Specialized care center with state-of-the-art facilities.',
		facilities: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics']
	}
];

export const professionals = [
	{
		id: 'p1',
		name: 'Dr. Sarah Johnson',
		email: 'sarah.johnson@email.com',
		phone: '+1234567892',
		specialty: 'Cardiologist',
		experience: 8,
		qualification: 'MD, FACC',
		location: 'New York, NY',
		availability: 'Immediate',
		avatar: 'https://via.placeholder.com/150/06D6A0/FFFFFF?text=SJ',
		resume: 'resume_sarah.pdf',
		verified: true,
		rating: 4.8,
		languages: ['English', 'Spanish'],
		skills: ['Interventional Cardiology', 'Echocardiography', 'Cardiac Catheterization'],
		certifications: ['Board Certified Cardiologist', 'ACLS', 'BLS'],
		about: 'Experienced cardiologist with expertise in interventional procedures and patient care.'
	},
	{
		id: 'p2',
		name: 'Emily Davis',
		email: 'emily.davis@email.com',
		phone: '+1234567893',
		specialty: 'Registered Nurse',
		experience: 5,
		qualification: 'BSN, RN',
		location: 'Los Angeles, CA',
		availability: '2 weeks notice',
		avatar: 'https://via.placeholder.com/150/FFB703/FFFFFF?text=ED',
		resume: 'resume_emily.pdf',
		verified: true,
		rating: 4.6,
		languages: ['English'],
		skills: ['Critical Care', 'Patient Assessment', 'IV Therapy', 'Wound Care'],
		certifications: ['RN License', 'ACLS', 'PALS', 'BLS'],
		about: 'Dedicated nurse with strong clinical skills and compassionate patient care.'
	},
	{
		id: 'p3',
		name: 'Michael Chen',
		email: 'michael.chen@email.com',
		phone: '+1234567894',
		specialty: 'Lab Technician',
		experience: 3,
		qualification: 'BS Medical Technology',
		location: 'Chicago, IL',
		availability: 'Immediate',
		avatar: 'https://via.placeholder.com/150/118AB2/FFFFFF?text=MC',
		resume: 'resume_michael.pdf',
		verified: true,
		rating: 4.4,
		languages: ['English', 'Mandarin'],
		skills: ['Blood Analysis', 'Microscopy', 'Quality Control', 'Lab Safety'],
		certifications: ['MLT Certification', 'ASCP Certified'],
		about: 'Detail-oriented lab technician with expertise in diagnostic testing.'
	}
];

export const jobPostings = [
	{
		id: 'j1',
		hospitalId: 'h1',
		hospitalName: 'City General Hospital',
		hospitalLogo: 'https://via.placeholder.com/150/00B4D8/FFFFFF?text=CGH',
		title: 'Senior Cardiologist',
		positionType: 'Doctor',
		specialty: 'Cardiology',
		description:
			'We are seeking an experienced cardiologist to join our growing cardiology department. The ideal candidate will have expertise in interventional procedures and patient care.',
		requirements: [
			'MD degree with cardiology specialization',
			'Board certification in Cardiology',
			'Minimum 5 years of clinical experience',
			'Excellent communication skills',
			'Strong diagnostic abilities'
		],
		responsibilities: [
			'Diagnose and treat cardiovascular conditions',
			'Perform cardiac catheterizations and interventions',
			'Collaborate with multidisciplinary team',
			'Supervise junior doctors and residents',
			'Maintain accurate patient records'
		],
		salaryMin: 150000,
		salaryMax: 250000,
		salaryPeriod: 'year',
		experienceRequired: 5,
		location: 'New York, NY',
		shiftType: 'Day',
		employmentType: 'Full-time',
		benefits: ['Health Insurance', 'Dental Insurance', '401k', 'CME Allowance', 'Paid Time Off'],
		postedDate: '2026-01-15',
		deadline: '2026-02-28',
		openings: 2,
		applicants: 15,
		status: 'active',
		featured: true
	},
	{
		id: 'j2',
		hospitalId: 'h1',
		hospitalName: 'City General Hospital',
		hospitalLogo: 'https://via.placeholder.com/150/00B4D8/FFFFFF?text=CGH',
		title: 'ICU Registered Nurse',
		positionType: 'Nurse',
		specialty: 'Critical Care',
		description:
			'Join our ICU team and provide exceptional care to critically ill patients. We offer competitive compensation and excellent growth opportunities.',
		requirements: [
			'Current RN license',
			'BSN degree preferred',
			'ICU experience required',
			'ACLS and BLS certification',
			'Strong critical thinking skills'
		],
		responsibilities: [
			'Provide direct patient care in ICU setting',
			'Monitor vital signs and patient status',
			'Administer medications and treatments',
			'Collaborate with physicians and team',
			'Maintain detailed patient documentation'
		],
		salaryMin: 70000,
		salaryMax: 95000,
		salaryPeriod: 'year',
		experienceRequired: 2,
		location: 'New York, NY',
		shiftType: 'Rotating',
		employmentType: 'Full-time',
		benefits: ['Health Insurance', 'Shift Differential', 'Tuition Reimbursement', 'Retirement Plan'],
		postedDate: '2026-01-20',
		deadline: '2026-03-15',
		openings: 5,
		applicants: 23,
		status: 'active',
		featured: true
	},
	{
		id: 'j3',
		hospitalId: 'h2',
		hospitalName: 'MediCare Central',
		hospitalLogo: 'https://via.placeholder.com/150/0096C7/FFFFFF?text=MC',
		title: 'Medical Lab Technician',
		positionType: 'Lab Technician',
		specialty: 'Laboratory',
		description:
			'Seeking a skilled lab technician to perform diagnostic tests and maintain laboratory equipment. Great opportunity for career growth.',
		requirements: [
			'BS in Medical Technology or related field',
			'MLT or MT certification',
			'Knowledge of lab safety protocols',
			'Attention to detail',
			'Computer proficiency'
		],
		responsibilities: [
			'Perform laboratory tests and analyses',
			'Operate and maintain lab equipment',
			'Ensure quality control standards',
			'Record and report test results',
			'Follow safety procedures'
		],
		salaryMin: 45000,
		salaryMax: 65000,
		salaryPeriod: 'year',
		experienceRequired: 1,
		location: 'Los Angeles, CA',
		shiftType: 'Day',
		employmentType: 'Full-time',
		benefits: ['Health Insurance', 'Paid Time Off', 'Professional Development', 'Employee Discounts'],
		postedDate: '2026-01-25',
		deadline: '2026-03-01',
		openings: 3,
		applicants: 12,
		status: 'active',
		featured: false
	},
	{
		id: 'j4',
		hospitalId: 'h2',
		hospitalName: 'MediCare Central',
		hospitalLogo: 'https://via.placeholder.com/150/0096C7/FFFFFF?text=MC',
		title: 'Emergency Room Physician',
		positionType: 'Doctor',
		specialty: 'Emergency Medicine',
		description:
			'High-volume ER seeking experienced physician to provide emergency care. Competitive salary and excellent benefits package.',
		requirements: [
			'MD with emergency medicine residency',
			'Board certified or eligible',
			'ATLS and ACLS certified',
			'Minimum 3 years ER experience',
			'Ability to work under pressure'
		],
		responsibilities: [
			'Provide emergency medical care',
			'Triage and assess patients',
			'Perform emergency procedures',
			'Coordinate with specialists',
			'Supervise medical staff'
		],
		salaryMin: 200000,
		salaryMax: 300000,
		salaryPeriod: 'year',
		experienceRequired: 3,
		location: 'Los Angeles, CA',
		shiftType: 'Night',
		employmentType: 'Full-time',
		benefits: [
			'Health Insurance',
			'Malpractice Insurance',
			'CME Allowance',
			'Retirement Plan',
			'Relocation Assistance'
		],
		postedDate: '2026-02-01',
		deadline: '2026-03-31',
		openings: 1,
		applicants: 8,
		status: 'active',
		featured: true
	}
];

export const applications = [
	{
		id: 'a1',
		jobId: 'j1',
		professionalId: 'p1',
		professionalName: 'Dr. Sarah Johnson',
		professionalAvatar: 'https://via.placeholder.com/150/06D6A0/FFFFFF?text=SJ',
		professionalSpecialty: 'Cardiologist',
		professionalExperience: 8,
		jobTitle: 'Senior Cardiologist',
		hospitalName: 'City General Hospital',
		status: 'shortlisted',
		appliedDate: '2026-01-18',
		lastUpdated: '2026-01-25',
		coverLetter:
			'I am excited to apply for the Senior Cardiologist position. With 8 years of experience in interventional cardiology, I am confident in my ability to contribute to your team.',
		interviewDate: '2026-02-10',
		interviewTime: '10:00 AM',
		notes: 'Strong candidate with excellent credentials'
	},
	{
		id: 'a2',
		jobId: 'j2',
		professionalId: 'p2',
		professionalName: 'Emily Davis',
		professionalAvatar: 'https://via.placeholder.com/150/FFB703/FFFFFF?text=ED',
		professionalSpecialty: 'Registered Nurse',
		professionalExperience: 5,
		jobTitle: 'ICU Registered Nurse',
		hospitalName: 'City General Hospital',
		status: 'interview',
		appliedDate: '2026-01-22',
		lastUpdated: '2026-02-02',
		coverLetter: 'As an experienced ICU nurse, I am passionate about providing high-quality critical care to patients.',
		interviewDate: '2026-02-08',
		interviewTime: '2:00 PM',
		notes: 'Scheduled for in-person interview'
	},
	{
		id: 'a3',
		jobId: 'j3',
		professionalId: 'p3',
		professionalName: 'Michael Chen',
		professionalAvatar: 'https://via.placeholder.com/150/118AB2/FFFFFF?text=MC',
		professionalSpecialty: 'Lab Technician',
		professionalExperience: 3,
		jobTitle: 'Medical Lab Technician',
		hospitalName: 'MediCare Central',
		status: 'applied',
		appliedDate: '2026-01-28',
		lastUpdated: '2026-01-28',
		coverLetter: 'I am a detail-oriented lab technician with expertise in diagnostic testing and quality control.',
		interviewDate: null,
		interviewTime: null,
		notes: ''
	}
];

export const messages = [
	{
		id: 'm1',
		conversationId: 'c1',
		senderId: 'h1',
		senderName: 'City General Hospital',
		senderAvatar: 'https://via.placeholder.com/150/00B4D8/FFFFFF?text=CGH',
		receiverId: 'p1',
		receiverName: 'Dr. Sarah Johnson',
		text: 'Hello Dr. Johnson, we would like to schedule an interview with you.',
		timestamp: '2026-01-25T14:30:00',
		read: true
	},
	{
		id: 'm2',
		conversationId: 'c1',
		senderId: 'p1',
		senderName: 'Dr. Sarah Johnson',
		senderAvatar: 'https://via.placeholder.com/150/06D6A0/FFFFFF?text=SJ',
		receiverId: 'h1',
		receiverName: 'City General Hospital',
		text: 'Thank you! I am available next week. What times work best for you?',
		timestamp: '2026-01-25T15:15:00',
		read: true
	},
	{
		id: 'm3',
		conversationId: 'c1',
		senderId: 'h1',
		senderName: 'City General Hospital',
		senderAvatar: 'https://via.placeholder.com/150/00B4D8/FFFFFF?text=CGH',
		receiverId: 'p1',
		receiverName: 'Dr. Sarah Johnson',
		text: 'How about February 10th at 10:00 AM?',
		timestamp: '2026-01-25T16:00:00',
		read: true
	}
];

export const notifications = [
	{
		id: 'n1',
		userId: 'p1',
		type: 'application_update',
		title: 'Application Shortlisted',
		message: 'Your application for Senior Cardiologist has been shortlisted!',
		timestamp: '2026-01-25T12:00:00',
		read: false,
		icon: 'check-circle',
		color: '#06D6A0'
	},
	{
		id: 'n2',
		userId: 'p1',
		type: 'message',
		title: 'New Message',
		message: 'City General Hospital sent you a message',
		timestamp: '2026-01-25T14:30:00',
		read: false,
		icon: 'message-circle',
		color: '#00B4D8'
	},
	{
		id: 'n3',
		userId: 'h1',
		type: 'new_application',
		title: 'New Application',
		message: 'Dr. Sarah Johnson applied for Senior Cardiologist',
		timestamp: '2026-01-18T09:30:00',
		read: true,
		icon: 'file-text',
		color: '#FFB703'
	}
];

export const dashboardStats = {
	hospital: {
		activeJobs: 12,
		totalApplications: 156,
		shortlisted: 24,
		interviewsScheduled: 8,
		hired: 3,
		viewsThisMonth: 1240
	},
	professional: {
		appliedJobs: 5,
		saved: 8,
		shortlisted: 2,
		interviews: 1,
		profileViews: 45,
		profileCompletion: 85
	}
};

export const specialties = [
	'Cardiologist',
	'Neurologist',
	'Pediatrician',
	'Orthopedic Surgeon',
	'General Surgeon',
	'Anesthesiologist',
	'Radiologist',
	'Pathologist',
	'Dermatologist',
	'Psychiatrist',
	'Registered Nurse',
	'Nurse Practitioner',
	'Lab Technician',
	'Pharmacist',
	'Physical Therapist',
	'Respiratory Therapist',
	'Radiologic Technologist',
	'Medical Assistant',
	'Paramedic'
];

export const shiftTypes = ['Day', 'Night', 'Rotating', 'Flexible'];
export const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary'];
export const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Expert'];
