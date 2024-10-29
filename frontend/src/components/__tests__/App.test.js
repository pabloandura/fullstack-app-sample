import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import fileReducer from '../../slices/fileSlice'
import App from '../../App'

function renderWithProviders (ui, { store = configureStore({ reducer: { file: fileReducer } }) } = {}) {
  return render(<Provider store={store}>{ui}</Provider>)
}

describe('App Component', () => {
  it('renders the File Viewer title', async () => {
    renderWithProviders(<App />)
    await waitFor(() => {
      expect(screen.getByText(/File Viewer/i)).toBeInTheDocument()
    })
  })

  it('displays "Select a file to view its data" when no file is selected', async () => {
    renderWithProviders(<App />)
    await waitFor(() => {
      expect(screen.getByText(/Select a file to view its data/i)).toBeInTheDocument()
    })
  })
})
