import axios from 'axios';
const api = axios.create({
  baseURL: "https://2531ddf8-f3e5-48a3-a856-0a19af7340eb-00-1zhft004frkyw.sisko.replit.dev",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const registerPatient = async (patientData) => {
  try {
    const response = await api.post(`/register/patient`, patientData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail || 'An error occurred while registering the patient.');
    } else if (error.request) {
      throw new Error('No response from the server. Please try again later.');
    } else {
      throw new Error('An unexpected error occurred: ' + error.message);
    }
  }
};

export const registerDoctor = async (doctorData) => {
  try {
    const response = await api.post(`/register/doctor`, doctorData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail || 'An error occurred while registering the patient.');
    } else if (error.request) {
      throw new Error('No response from the server. Please try again later.');
    } else {
      throw new Error('An unexpected error occurred: ' + error.message);
    }
  }
};

export const registerTimeSlot = async (timeslotData) => {
  try {
    const response = await api.post(`/create/timeslot`, timeslotData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail || 'An error occurred while creating the timeslot.');
    } else if (error.request) {
      throw new Error('No response from the server. Please try again later.');
    } else {
      throw new Error('An unexpected error occurred: ' + error.message);
    }
  }
};

export const createPrescription = async (prescriptionData) => {
  try {
    const response = await api.post(`/prescriptions`, prescriptionData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail || 'An error occurred while creating the prescription.');
    } else if (error.request) {
      throw new Error('No response from the server. Please try again later.');
    } else {
      throw new Error('An unexpected error occurred: ' + error.message);
    }
  }
};


export const sendChatMessage = async (message) => {
  try {
    const response = await api.post(`/chat`, {
      user_message: message
    });
    return response.data.response;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

export const fetchReminders = async () => {
  try {
    const response = await api.get('/chat/reminders');

    if (response.data && response.data.reminders) {
      return response.data.reminders;
    } else {
      throw new Error('No reminders found in the response');
    }
  } catch (error) {
    console.error('Error fetching reminders:', error);
    throw error;
  }
};

export const getDoctors = async (params) => {
  try {
    const response = await api.get('/admin/doctors', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

export const deleteDoctor = async (doctorId) => {
  try {
    const response = await api.delete(`/admin/doctors/${doctorId}`);
    return response.status;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error('Doctor not found.');
      } else {
        throw new Error('An error occurred while deleting the doctor.');
      }
    } else {
      throw new Error(`Failed to delete doctor: ${error.message}`);
    }
  }
};

export const getPatients = async (params) => {
  try {
    const response = await api.get('/admin/patients', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

export const deletePatient = async (patientId) => {
  try {
    const response = await api.delete(`/admin/patients/${patientId}`);
    return response.status;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error('Patient not found.');
      } else {
        throw new Error('An error occurred while deleting the patient.');
      }
    } else {
      throw new Error(`Failed to delete patient: ${error.message}`);
    }
  }
};

export const getAppointments = async (params) => {
  try {
    const response = await api.get('/admin/appointments', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

export const getDoctorAppointments = async (params) => {
  try {
    const response = await api.get('/doctor/appointments', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

export const fetchDoctor = async (doctorId) => {
  const response = await api.get(`/doctors/${doctorId}`);
  return response.data;
};

export const fetchPatient = async (patientId) => {
  const response = await api.get(`/patients/${patientId}`);
  return response.data;
};

export const fetchTimeslot = async (doctor_id) => {
  const response = await api.get(`/timeslots/${doctor_id}`);
  return response.data;
};

export const markAppointmentAsInactive = async (appointment_id) => {
  const response = await api.patch(`/appointments/${appointment_id}/inactive`);
  return response.data;
};


