import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFileList = createAsyncThunk('file/fetchFileList', async () => {
  const response = await fetch('/files/list');
  return response.json();
});

export const fetchFileData = createAsyncThunk('file/fetchFileData', async (fileName) => {
  const response = await fetch(`/files/data?fileName=${fileName}`);
  const data = await response.json();
  return data[0];
});

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    fileList: [],
    selectedFile: null,
    fileData: null,
    loading: false,
    error: null,
  },
  reducers: {
    selectFile: (state, action) => {
      state.selectedFile = action.payload;
      state.fileData = null;
    },
    clearSelectedFile: (state) => {
      state.selectedFile = null;
      state.fileData = null;
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
      .addCase(fetchFileData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFileData.fulfilled, (state, action) => {
        state.loading = false;
        state.fileData = action.payload;
      })
      .addCase(fetchFileData.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load file data';
      });
  },
});

export const { selectFile, clearSelectedFile } = fileSlice.actions;

export default fileSlice.reducer;
