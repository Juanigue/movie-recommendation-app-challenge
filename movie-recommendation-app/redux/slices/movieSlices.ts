import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tmdbApi from '../../src/app/lib/apiDB';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
}

interface MovieState {
  movies: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  status: 'idle',
  error: null,
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ query, genre }: { query: string; genre: string }) => {
    try {
      const url = genre
        ? `/search/movie?query=${query}&with_genres=${genre}`
        : `/search/movie?query=${query}`;
      const response = await tmdbApi.get(url);
      return response.data.results;
    } catch (error) {
      throw new Error('Failed to fetch movies');
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch movies';
      });
  },
});

export default movieSlice.reducer;
