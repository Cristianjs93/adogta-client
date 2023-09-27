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
    // try {
    const response = await axios.post('/login', {
      email: email,
      password: password,
    });
    localStorage.setItem('AUTHORIZATION', response.data.token);
    axios.defaults.headers.common['Authorization'] =
      localStorage.getItem('AUTHORIZATION');
    // dispatch({ type: LOGIN_USER, payload: response.data });
    // } catch (e) {
    //   dispatch({ type: ERROR, payload: e.response.data.error });
    // }

    return response.data;
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
    LOGOUT: (state) => {
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
    SET_FOUNDATION: (state, action) => {
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
        state.status = 'UNAUTHENTICATED';
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
  LOGOUT,
  SELECT_PET,
  LIST_REQUESTS,
  LIST_FOUNDATION_REQUESTS,
  UPDATE_REQUEST,
  BULK_REJECT_REQUESTS,
  ERROR,
  CREATE_ADOPTION_REQUEST,
  LIST_USER_REQUESTS,
  SET_FOUNDATION,
  //   AUTHENTICATED,
  //   NOT_AUTHENTICATED,
  //   FINISHED,
} = generalSlice.actions;

export const selectGeneral = (state) => state.general;

export default generalSlice.reducer;
