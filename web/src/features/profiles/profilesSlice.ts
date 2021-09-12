import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from '../../app/store';
import { IRandomUserResponse, IUser } from '../../interface/RandomUser.interface';

type Status = 'idle' | 'loading' | 'failed';

export interface ProfilesState {
  allProfiles: IUser[];
  profiles: IUser[];
  page: number;
  perPage: number;
  pages: number;
  status: Status;
}

const initialState: ProfilesState = {
  allProfiles: [],
  profiles: [],
  page: 1,
  perPage: 16,
  pages: 1,
  status: 'idle',
};

export const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setNewProfiles: (state: ProfilesState, action: PayloadAction<IUser[]>) => {
      // Add profiles to one array that will contain all profiles ever fetched
      state.allProfiles = state.allProfiles.concat(action.payload);
      // Switch out current set of profiles, these are the ones we will render
      state.profiles = action.payload;
    },
    setStatus: (state: ProfilesState, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    setPage: (state: ProfilesState, action: PayloadAction<number>) => {
      const page = action.payload;
      state.page = page;
      state.profiles = state.allProfiles.slice(
        (page - 1) * state.perPage,
        page * state.perPage,
      );
    },
    setPerPage: (state: ProfilesState, action: PayloadAction<number>) => {
      state.perPage = action.payload;
    },
    setPages: (state: ProfilesState, action: PayloadAction<number>) => {
      state.pages = action.payload;
    },
  },
});

const fetchProfiles = async (amount: number) => {
  const {
    data: { results },
  } = await axios.get<IRandomUserResponse>(`https://randomuser.me/api/?results=${amount}`);
  return results;
}

export const initProfiles = (): AppThunk => async (
  dispatch: AppDispatch,
  getState,
) => {
  const { profiles: { perPage } } = getState();
  dispatch(setStatus('loading'));
  const profiles = await fetchProfiles(perPage);
  if (profiles) {
    dispatch(setNewProfiles(profiles));
    dispatch(setStatus('idle'));
  } else {
    dispatch(setStatus('failed'));
  }
}

export const changePage = (newPage: number): AppThunk => async (
  dispatch: AppDispatch,
  getState,
) => {
  const { profiles: { allProfiles, perPage } } = getState();
  // First we calculate how many pages we have populated so far
  const populatedPages = allProfiles.length / perPage;

  // Will the new page require us fetching more profiles?
  // Or can we use the cached ones instead?
  if (populatedPages < newPage) {
    // How many addition profiles we need to fetch to populate all pages up to the new page
    const neededProfiles = (newPage - populatedPages) * perPage;
    dispatch(setStatus('loading'));
    const newProfiles = await fetchProfiles(neededProfiles);
    dispatch(setStatus('idle'));
    dispatch(setNewProfiles(newProfiles ?? []));
    dispatch(setPages(newPage));
  }

  dispatch(setPage(newPage));
};

export const { setNewProfiles, setStatus, setPage, setPages } = profilesSlice.actions;

export default profilesSlice.reducer;
