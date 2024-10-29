import { configureStore } from '@reduxjs/toolkit'
import fileReducer, { fetchFileList, fetchFileData, selectFile, clearSelectedFile } from '../../slices/fileSlice'
import fetchMock from 'jest-fetch-mock'

fetchMock.enableMocks()

describe('fileSlice', () => {
  let store

  beforeEach(() => {
    store = configureStore({
      reducer: { file: fileReducer }
    })
    fetchMock.resetMocks()
  })

  describe('fetchFileList', () => {
    it('should handle fetchFileList fulfilled', async () => {
      const mockFileList = ['file1.csv', 'file2.csv']
      fetchMock.mockResponseOnce(JSON.stringify(mockFileList))

      await store.dispatch(fetchFileList())
      const state = store.getState().file

      expect(state.loading).toBe(false)
      expect(state.fileList).toEqual(mockFileList)
      expect(state.error).toBeNull()
    })

    it('should handle fetchFileList rejected', async () => {
      fetchMock.mockRejectOnce(new Error('Failed to fetch'))

      await store.dispatch(fetchFileList())
      const state = store.getState().file

      expect(state.loading).toBe(false)
      expect(state.fileList).toEqual([])
      expect(state.error).toBe('Failed to load files')
    })
  })

  describe('fetchFileData', () => {
    it('should handle fetchFileData fulfilled', async () => {
      const mockData = [{ key: 'value' }]
      fetchMock.mockResponseOnce(JSON.stringify(mockData))

      await store.dispatch(fetchFileData('file1.csv'))
      const state = store.getState().file

      expect(state.loading).toBe(false)
      expect(state.loadingFile).toBeNull()
      expect(state.fileData).toEqual(mockData[0])
      expect(state.selectedFile).toBe('file1.csv')
      expect(state.error).toBeNull()
    })

    it('should handle fetchFileData with a 404 error', async () => {
      fetchMock.mockResponseOnce('', { status: 404 })

      await store.dispatch(fetchFileData('file1.csv'))
      const state = store.getState().file

      expect(state.loading).toBe(false)
      expect(state.loadingFile).toBeNull()
      expect(state.fileData).toBeNull()
      expect(state.selectedFile).toBe('file1.csv')
      expect(state.error).toBe('File not found. Although it appears on the file list, we have no records under this name.')
    })

    it('should handle fetchFileData with a network error', async () => {
      fetchMock.mockRejectOnce(new Error('Failed to fetch'))

      await store.dispatch(fetchFileData('file1.csv'))
      const state = store.getState().file

      expect(state.loading).toBe(false)
      expect(state.loadingFile).toBeNull()
      expect(state.fileData).toBeNull()
      expect(state.selectedFile).toBe('file1.csv')
      expect(state.error).toBe('Network error. Please try again.')
    })
  })

  describe('Reducers', () => {
    it('should handle selectFile', () => {
      store.dispatch(selectFile('file1.csv'))
      const state = store.getState().file

      expect(state.selectedFile).toBe('file1.csv')
      expect(state.fileData).toBeNull()
      expect(state.error).toBeNull()
    })

    it('should handle clearSelectedFile', () => {
      store.dispatch(selectFile('file1.csv'))
      store.dispatch(clearSelectedFile())
      const state = store.getState().file

      expect(state.selectedFile).toBeNull()
      expect(state.fileData).toBeNull()
      expect(state.error).toBeNull()
    })
  })
})
