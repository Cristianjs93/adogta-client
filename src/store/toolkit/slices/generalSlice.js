import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import history from '../../../history';
import withReactContent from 'sweetalert2-react-content';
import i18n from '../../../i18n';
import Swal from 'sweetalert2';
import axios from '../../../axios';

const MySwal = withReactContent(Swal);

const initialState = {
  user: null,
  foundations: [],
  pets: [],
  petListInfo: {},
  adoptionRequests: [],
  foundationRequests: [],
  userRequests: [],
  selectedPet: {},
  error: '',
  status: 'LOADING',
  errStatus: 'INITIALIZED',
  foundation: {},
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (name, email, password, role) => {
    try {
      const response = await axios.post('/signup', {
        name: name,
        email: email,
        password: password,
        role: role,
      });

      MySwal.fire({
        title: <strong>{i18n.t('verify.email')}</strong>,
        html: <i>{i18n.t('verify.inbox')}</i>,
        icon: 'success',
      });

      history.push('/');

      return response.data;
    } catch (e) {
      if (e.response.data.error === 'Email is already taken') {
        return MySwal.fire({
          title: <strong>{i18n.t('registerPage.create.error.email')}</strong>,
          icon: 'error',
        });
      }
      return MySwal.fire({
        title: <strong>{e.response.data.error}</strong>,
        icon: 'error',
      });
    }
  }
);

export const verifiedEmail = createAsyncThunk(
  'user/verifiedEmail',
  async (token) => {
    try {
      const response = await axios.get(`/verified/${token}`);

      localStorage.setItem('AUTHORIZATION', response.data.token);

      axios.defaults.headers.common['Authorization'] =
        localStorage.getItem('AUTHORIZATION');

      return response.data;
    } catch (e) {
      return MySwal.fire({
        title: <strong>{e.response.data.error}</strong>,
        icon: 'error',
      });
    }
  }
);

export const authUser = createAsyncThunk(
  'user/authUser',
  async ({ email, password }) => {
    try {
      const response = await axios.post('/login', {
        email: email,
        password: password,
      });

      localStorage.setItem('AUTHORIZATION', response.data.token);

      axios.defaults.headers.common['Authorization'] =
        localStorage.getItem('AUTHORIZATION');

      history.push('/');

      return response.data;
    } catch (e) {
      if (e.response.data.error === 'User does not exist') {
        return MySwal.fire({
          title: <strong>{i18n.t('login.invalid.user')}</strong>,
          icon: 'error',
        });
      }

      if (e.response.data.error === 'Please verify your email') {
        return MySwal.fire({
          title: <strong>{i18n.t('login.invalid.verify')}</strong>,
          icon: 'error',
        });
      }

      if (e.response.data.error === 'Invalid password') {
        return MySwal.fire({
          title: <strong>{i18n.t('login.invalid.password')}</strong>,
          icon: 'error',
        });
      }

      return MySwal.fire({
        title: <strong>{e.response.data.error}</strong>,
        icon: 'error',
      });
    }
  }
);

export const loadUser = createAsyncThunk('user/loadUser', async () => {
  try {
    axios.defaults.headers.common['Authorization'] =
      localStorage.getItem('AUTHORIZATION');

    const response = await axios.get('/me');

    return response.data;
  } catch (e) {
    localStorage.removeItem('AUTHORIZATION');
    return MySwal.fire({
      title: <strong>{e.response.data.error}</strong>,
      icon: 'error',
    });
  }
});

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async ({
    _id,
    name,
    role,
    address,
    email,
    phoneNumber,
    photoUrl,
    imageFile,
  }) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('_id', _id);
      formData.append('name', name);
      formData.append('role', role);
      address && formData.append('address', address);
      formData.append('email', email);
      phoneNumber && formData.append('phoneNumber', phoneNumber);
      formData.append('photoUrl', photoUrl);

      const response = await axios.put(`/${_id}/profile`, formData);

      return response.data;
    } catch (e) {
      return MySwal.fire({
        title: <strong>{e.response.data.error}</strong>,
        icon: 'error',
      });
    }
  }
);

export const listPets = createAsyncThunk(
  'pets/listPets',
  async ({ initPage, foundationId }) => {
    const params = {
      page: initPage,
    };

    try {
      const response = await axios.get(`/foundations/${foundationId}/pets`, {
        params,
      });
      return response.data;
    } catch (e) {
      return MySwal.fire({
        title: <strong>{e.response.data.error}</strong>,
        icon: 'error',
      });
    }
  }
);

export const addPets = createAsyncThunk(
  'pets/addPets',
  async ({ foundationId, photoUrl, petName, petAge, petDescription }) => {
    try {
      const formData = new FormData();
      formData.append('name', petName);
      formData.append('age', petAge);
      formData.append('description', petDescription);
      photoUrl.forEach((image, index) => {
        formData.append(`photoUrl_${index}`, image);
      });
      const response = await axios.post(
        `/foundations/${foundationId}/pets`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      return response.data;
    } catch (e) {
      return MySwal.fire({
        title: <strong>{e.response.data.error}</strong>,
        icon: 'error',
      });
    }
  }
);

export const deletePet = createAsyncThunk('pets/seletePet', async (petId) => {
  try {
    const response = await axios.delete(`/pets/${petId}`);
    return response.data;
  } catch (e) {
    return MySwal.fire({
      title: <strong>{e.response.data.error}</strong>,
      icon: 'error',
    });
  }
});

export const selectPet = createAsyncThunk('pets/selectPet', async (petId) => {
  try {
    const [petResponse, requestsResponse] = await Promise.all([
      axios.get(`/pets/${petId}`),
      axios.get(`/pets/${petId}/requests`),
    ]);

    return { pet: petResponse.data, adoptionRequests: requestsResponse.data };
  } catch (e) {
    return MySwal.fire({
      title: <strong>{e.response.data.error}</strong>,
      icon: 'error',
    });
  }
});

export const updateRequest = createAsyncThunk(
  'pets/updateRequest',
  async ({ petId, requestId, status }) => {
    try {
      const response = await axios.put(`/pets/${petId}/requests/${requestId}`, {
        responseStatus: status,
      });
      return response.data;
    } catch (e) {
      return MySwal.fire({
        title: <strong>{e.response.data.error}</strong>,
        icon: 'error',
      });
    }
  }
);

export const bulkReject = createAsyncThunk(
  'pets/bulkReject',
  async ({ petId, requestId }) => {
    try {
      const response = await axios.put(`/pets/${petId}/requests`, {
        requestId,
      });
      return response.data;
    } catch (e) {
      return MySwal.fire({
        title: <strong>{e.response.data.error}</strong>,
        icon: 'error',
      });
    }
  }
);

export const listFoundationRequests = createAsyncThunk(
  'foundations/listFoundationRequests',
  async (foundationId) => {
    try {
      let response = await axios.get(`/foundations/${foundationId}/requests`);

      return response.data;
    } catch (e) {
      return MySwal.fire({
        title: <strong>{e.response.data.error}</strong>,
        icon: 'error',
      });
    }
  }
);

export const createAdoption = createAsyncThunk(
  'pets/createAdoption',
  async ({ petId, userId, description, phoneNumber, address }) => {
    try {
      const response = await axios.post(`/pets/${petId}/request`, {
        petId: petId,
        userId: userId,
        description: description,
        phoneNumber: phoneNumber,
        address: address,
      });

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

export const listUserRequests = createAsyncThunk(
  'user/listuserRequests',
  async (userId) => {
    try {
      let response = await axios.get(`${userId}/requests`);
      return response.data;
    } catch (e) {
      return MySwal.fire({
        title: <strong>{e.response.data.error}</strong>,
        icon: 'error',
      });
    }
  }
);

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    resetError: (state) => {
      return {
        ...state,
        error: '',
        errStatus: 'INITIALIZED',
      };
    },
    logOut: (state) => {
      localStorage.removeItem('AUTHORIZATION');
      return {
        ...state,
        user: null,
        status: 'NOT_AUTHENTICATED',
        error: '',
        pets: [],
        petListInfo: {},
        foundationRequests: [],
      };
    },
    setFoundation: (state, action) => {
      return {
        ...state,
        foundation: action.payload,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, () => {})
      .addCase(registerUser.fulfilled, (state) => {
        state.error = '';
      })
      .addCase(registerUser.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(verifiedEmail.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(verifiedEmail.fulfilled, (state, { payload }) => {
        state.status = 'AUTHENTICATED';
        const { _id, name, email, role, address, photoUrl, phoneNumber } =
          payload;
        state.user = { _id, name, email, role, address, photoUrl, phoneNumber };
      })
      .addCase(verifiedEmail.rejected, (state, { error }) => {
        state.status = 'NOT_AUTHENTICATED';
        state.error = error.message;
      })
      .addCase(authUser.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(authUser.fulfilled, (state, { payload }) => {
        const { _id, name, email, role, address, photoUrl, phoneNumber } =
          payload;
        if (_id) {
          state.status = 'AUTHENTICATED';
          state.user = {
            _id,
            name,
            email,
            role,
            address,
            photoUrl,
            phoneNumber,
          };
        }
      })
      .addCase(authUser.rejected, (state, { error }) => {
        state.status = 'NOT_AUTHENTICATED';
        state.error = error.message;
      })
      .addCase(loadUser.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(loadUser.fulfilled, (state, { payload }) => {
        state.status = 'AUTHENTICATED';
        const { _id, name, email, role, address, photoUrl, phoneNumber } =
          payload;
        state.user = { _id, name, email, role, address, photoUrl, phoneNumber };
      })
      .addCase(loadUser.rejected, (state, { error }) => {
        state.status = 'NOT_AUTHENTICATED';
        state.error = error.message;
      })

      .addCase(updateUserProfile.pending, () => {})
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(updateUserProfile.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(listPets.pending, () => {})
      .addCase(listPets.fulfilled, (state, { payload }) => {
        state.pets = payload.pets;
        state.petListInfo = {
          count: payload.count,
          page: +payload.page,
        };
      })
      .addCase(listPets.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(addPets.pending, () => {})
      .addCase(addPets.fulfilled, (state, { payload }) => {
        state.pets = payload;
      })
      .addCase(addPets.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(deletePet.pending, () => {})
      .addCase(deletePet.fulfilled, (state, { payload }) => {
        state.pets = state.pets.filter((pet) => pet._id !== payload);
      })
      .addCase(deletePet.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(selectPet.pending, () => {})
      .addCase(selectPet.fulfilled, (state, { payload }) => {
        state.selectedPet = payload.pet;
        state.adoptionRequests = payload.adoptionRequests;
      })
      .addCase(selectPet.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(updateRequest.pending, () => {})
      .addCase(updateRequest.fulfilled, (state, { payload }) => {
        state.adoptionRequests = state.adoptionRequests.map((req) =>
          req._id === payload._id
            ? { ...req, responseStatus: payload.responseStatus }
            : req
        );
      })
      .addCase(updateRequest.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(bulkReject.pending, () => {})
      .addCase(bulkReject.fulfilled, (state, { payload }) => {
        state.adoptionRequests = state.adoptionRequests.map((req) =>
          req._id !== payload ? { ...req, responseStatus: 'rejected' } : req
        );
      })
      .addCase(bulkReject.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(listFoundationRequests.pending, () => {})
      .addCase(listFoundationRequests.fulfilled, (state, { payload }) => {
        state.foundationRequests = payload;
      })
      .addCase(listFoundationRequests.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(createAdoption.pending, () => {})
      .addCase(createAdoption.fulfilled, (state, { payload }) => {
        if (typeof payload === 'string') {
          state.error = payload;
          state.errStatus = 'FINISHED';
        } else {
          state.adoptionRequests = payload;
          state.error = '';
          state.errStatus = 'FINISHED';
        }
      })
      .addCase(createAdoption.rejected, (state, { error }) => {
        state.error = error.message;
      })
      .addCase(listUserRequests.pending, () => {})
      .addCase(listUserRequests.fulfilled, (state, { payload }) => {
        state.userRequests = payload;
      })
      .addCase(listUserRequests.rejected, (state, { error }) => {
        state.error = error.message;
      });
  },
});

export const { resetError, logOut, setFoundation } = generalSlice.actions;

export const selectGeneral = (state) => state.general;

export default generalSlice.reducer;
