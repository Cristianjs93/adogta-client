import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../axios';

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
      return e.message;
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

      return response.data;
    } catch (e) {
      return e.message;
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
    return e.message;
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
      return e.message;
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
      return e.message;
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
      return e.message;
    }
  }
);

export const deletePet = createAsyncThunk('pets/seletePet', async (petId) => {
  try {
    const response = await axios.delete(`/pets/${petId}`);
    return response.data;
  } catch (e) {
    return e.message;
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
    return e.message;
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
      return e.message;
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
      return e.message;
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
      return e.message;
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
      return e.response.data.error;
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
      return e.message;
    }
  }
);

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    // LOGIN_USER: (state, action) => {
    //   const { _id, name, email, role, address, photoUrl, phoneNumber } =
    //     action.payload;
    //   return {
    //     ...state,
    //     user: { _id, name, email, role, address, photoUrl, phoneNumber },
    //     status: 'AUTHENTICATED',
    //     error: '',
    //   };
    // },
    resetError: (state) => {
      return {
        ...state,
        error: '',
        errStatus: 'INITIALIZED',
      };
    },
    // ADD_PETS: (state, action) => {
    //   return {
    //     ...state,
    //     pets: action.payload,
    //   };
    // },
    // SET_PETS: (state, action) => {
    //   return {
    //     ...state,
    //     pets: action.payload.pets,
    //     petListInfo: {
    //       count: action.payload.count,
    //       page: +action.payload.page,
    //     },
    //   };
    // },
    // DELETE_PET: (state, action) => {
    //   return {
    //     ...state,
    //     pets: state.pets.filter((pet) => pet._id !== action.payload),
    //   };
    // },
    REGISTER_USER: (state, action) => {
      return {
        ...state,
        user: action.payload,
        error: '',
      };
    },
    // UPDATE_PROFILE: (state, action) => {
    //   return {
    //     ...state,
    //     user: action.payload,
    //     error: '',
    //   };
    // },
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
    // SELECT_PET: (state, action) => {
    //   return {
    //     ...state,
    //     selectedPet: action.payload,
    //   };
    // },
    // LIST_REQUESTS: (state, action) => {
    //   return {
    //     ...state,
    //     adoptionRequests: action.payload,
    //   };
    // },
    // LIST_FOUNDATION_REQUESTS: (state, action) => {
    //   return {
    //     ...state,
    //     foundationRequests: action.payload,
    //   };
    // },
    // UPDATE_REQUEST: (state, action) => {
    //   return {
    //     ...state,
    //     adoptionRequests: state.adoptionRequests.map((req) =>
    //       req._id === action.payload._id
    //         ? { ...req, responseStatus: action.payload.responseStatus }
    //         : req
    //     ),
    //   };
    // },
    // BULK_REJECT_REQUESTS: (state, action) => {
    //   return {
    //     ...state,
    //     adoptionRequests: state.adoptionRequests.map((req) =>
    //       req._id !== action.payload
    //         ? { ...req, responseStatus: 'rejected' }
    //         : req
    //     ),
    //   };
    // },
    ERROR: (state, action) => {
      return {
        ...state,
        error: action.payload,
        errStatus: 'INITIALIZED',
      };
    },
    // CREATE_ADOPTION_REQUEST: (state, action) => {
    //   return {
    //     ...state,
    //     adoptionRequests: action.payload,
    //     error: '',
    //     errStatus: 'FINISHED',
    //   };
    // },
    // LIST_USER_REQUESTS: (state, action) => {
    //   return {
    //     ...state,
    //     userRequests: action.payload,
    //   };
    // },
    setFoundation: (state, action) => {
      return {
        ...state,
        foundation: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
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
        state.status = 'AUTHENTICATED';
        const { _id, name, email, role, address, photoUrl, phoneNumber } =
          payload;
        state.user = { _id, name, email, role, address, photoUrl, phoneNumber };
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

export const {
  LOGIN_USER,
  resetError,
  ADD_PETS,
  SET_PETS,
  DELETE_PET,
  REGISTER_USER,
  UPDATE_PROFILE,
  logOut,
  SELECT_PET,
  LIST_REQUESTS,
  LIST_FOUNDATION_REQUESTS,
  UPDATE_REQUEST,
  BULK_REJECT_REQUESTS,
  ERROR,
  CREATE_ADOPTION_REQUEST,
  LIST_USER_REQUESTS,
  setFoundation,
} = generalSlice.actions;

export const selectGeneral = (state) => state.general;

export default generalSlice.reducer;
