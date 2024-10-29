import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFileList = createAsyncThunk('file/fetchFileList', async () => {
  const response = await fetch('/files/list');
  return response.json();
});

export const fetchFileData = createAsyncThunk('file/fetchFileData', async (fileName, { rejectWithValue }) => {
  try {
    const response = await fetch(`/files/data?fileName=${fileName}`);
    if (!response.ok) {
      if (response.status === 404) {
        return rejectWithValue({ error: 'File not found. Although it appears on the file list, we have no records under this name.' });
      }
      if (response.status === 500) {
        return rejectWithValue({ error: 'Server error while downloading file' });
      }
      throw new Error('Failed to fetch file data');
    }

    const data = await response.json();
    return { fileName, data: data[0] };
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      return rejectWithValue({ error: 'Network error. Please try again.' });
    }
    return rejectWithValue({ error: error.message });
  }
});

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    fileList: [],
    selectedFile: null,
    fileData: null,
    loading: false,
    loadingFile: null,
    error: null,
  },
  reducers: {
    selectFile: (state, action) => {
      state.selectedFile = action.payload;
      state.fileData = null;
      state.error = null;
    },
    clearSelectedFile: (state) => {
      state.selectedFile = null;
      state.fileData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFileList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFileList.fulfilled, (state, action) => {
        state.loading = false;
        state.fileList = action.payload;
      })
      .addCase(fetchFileList.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load files';
      })
      .addCase(fetchFileData.pending, (state, action) => {
        state.loading = true;
        state.loadingFile = action.meta.arg;
        state.error = null;
      })
      .addCase(fetchFileData.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingFile = null;
        state.fileData = action.payload.data;
        state.selectedFile = action.payload.fileName;
        state.error = null;
      })
      .addCase(fetchFileData.rejected, (state, action) => {
        state.loading = false;
        state.loadingFile = null;
        state.fileData = null;
        state.selectedFile = action.meta.arg;
        state.error = action.payload?.error || 'An unexpected error occurred';
      });
  },
});

export const { selectFile, clearSelectedFile } = fileSlice.actions;

export default fileSlice.reducer;
