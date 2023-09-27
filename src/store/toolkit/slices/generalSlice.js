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
export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    LOGIN_USER: (state, action) => {
      const { _id, name, email, role, address, photoUrl, phoneNumber } =
        action.payload;
      return {
        ...state,
        user: { _id, name, email, role, address, photoUrl, phoneNumber },
        status: 'AUTHENTICATED',
        error: '',
      };
    },
    RESET_ERROR: (state) => {
      return {
        ...state,
        error: '',
      };
    },
    ADD_PETS: (state, action) => {
      return {
        ...state,
        pets: action.payload,
      };
    },
    SET_PETS: (state, action) => {
      return {
        ...state,
        pets: action.payload.pets,
        petListInfo: {
          count: action.payload.count,
          page: +action.payload.page,
        },
      };
    },
    DELETE_PET: (state, action) => {
      return {
        ...state,
        pets: state.pets.filter((pet) => pet._id !== action.payload),
      };
    },
    REGISTER_USER: (state, action) => {
      return {
        ...state,
        user: action.payload,
        error: '',
      };
    },
    UPDATE_PROFILE: (state, action) => {
      return {
        ...state,
        user: action.payload,
        error: '',
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
    SELECT_PET: (state, action) => {
      return {
        ...state,
        selectedPet: action.payload,
      };
    },
    LIST_REQUESTS: (state, action) => {
      return {
        ...state,
        adoptionRequests: action.payload,
      };
    },
    LIST_FOUNDATION_REQUESTS: (state, action) => {
      return {
        ...state,
        foundationRequests: action.payload,
      };
    },
    UPDATE_REQUEST: (state, action) => {
      return {
        ...state,
        adoptionRequests: state.adoptionRequests.map((req) =>
          req._id === action.payload._id
            ? { ...req, responseStatus: action.payload.responseStatus }
            : req
        ),
      };
    },
    BULK_REJECT_REQUESTS: (state, action) => {
      return {
        ...state,
        adoptionRequests: state.adoptionRequests.map((req) =>
          req._id !== action.payload
            ? { ...req, responseStatus: 'rejected' }
            : req
        ),
      };
    },
    ERROR: (state, action) => {
      return {
        ...state,
        error: action.payload,
        errStatus: 'FINISHED',
      };
    },
    CREATE_ADOPTION_REQUEST: (state, action) => {
      return {
        ...state,
        adoptionRequests: action.payload,
        error: '',
        errStatus: 'FINISHED',
      };
    },
    LIST_USER_REQUESTS: (state, action) => {
      return {
        ...state,
        userRequests: action.payload,
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
      .addCase(listFoundationRequests.pending, () => {})
      .addCase(listFoundationRequests.fulfilled, (state, { payload }) => {
        state.foundationRequests = payload;
      })
      .addCase(listFoundationRequests.rejected, (state, { error }) => {
        state.error = error.message;
      });
  },
});

export const {
  LOGIN_USER,
  RESET_ERROR,
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
