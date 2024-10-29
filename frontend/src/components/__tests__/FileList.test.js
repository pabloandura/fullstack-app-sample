import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import FileList from '../FileList'
import { fetchFileList, fetchFileData } from '../../slices/fileSlice'

const mockStore = configureStore([thunk])

jest.mock('../../slices/fileSlice', () => ({
  fetchFileList: jest.fn(),
  fetchFileData: jest.fn()
}))

describe('FileList Component', () => {
  let store

  beforeEach(() => {
    store = mockStore({
      file: {
        fileList: ['file1.csv', 'file2.csv'],
        loadingFile: null,
        error: null
      }
    })
    store.dispatch = jest.fn()
  })

  it('renders the component with title and file list', () => {
    render(
      <Provider store={store}>
        <FileList />
      </Provider>
    )

    expect(screen.getByText(/Available Files/i)).toBeInTheDocument()

    expect(screen.getByText('file1.csv')).toBeInTheDocument()
    expect(screen.getByText('file2.csv')).toBeInTheDocument()
  })

  it('dispatches fetchFileList on mount', () => {
    render(
      <Provider store={store}>
        <FileList />
      </Provider>
    )

    expect(fetchFileList).toHaveBeenCalled()
  })
})
