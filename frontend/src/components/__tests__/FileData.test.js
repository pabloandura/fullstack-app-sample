import React from 'react';
import { render, screen } from '@testing-library/react';
import FileData from '../FileData';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { thunk } from "redux-thunk";

const mockStore = configureStore([thunk]);

describe('FileData Component', () => {
  let store;
  const fileName = 'test-file.csv';

  beforeEach(() => {
    store = mockStore({
      file: {
        selectedFile: fileName,
        fileData: null,
        loading: false,
        error: null,
      },
    });
    store.dispatch = jest.fn();
  });

  it('renders the component with title and back button', () => {
    render(
      <Provider store={store}>
        <FileData fileName={fileName} onBack={() => {}} />
      </Provider>
    );

    expect(screen.getByText(`Data for ${fileName}`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /unselect file/i })).toBeInTheDocument();
  });

  it('displays loading spinner when loading', () => {
    store = mockStore({
      file: {
        selectedFile: fileName,
        fileData: null,
        loading: true,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <FileData fileName={fileName} onBack={() => {}} />
      </Provider>
    );

    expect(screen.getByText(/loading data/i)).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    store = mockStore({
      file: {
        selectedFile: fileName,
        fileData: null,
        loading: false,
        error: 'Failed to load file data',
      },
    });

    render(
      <Provider store={store}>
        <FileData fileName={fileName} onBack={() => {}} />
      </Provider>
    );

    expect(screen.getByText(/failed to load file data/i)).toBeInTheDocument();
  });

  it('displays table data when fileData is loaded', () => {
    const fileDataMock = {
      file: fileName,
      lines: [
        { text: 'Sample text', number: 123, hex: 'abcdef1234567890abcdef1234567890' },
      ],
    };

    store = mockStore({
      file: {
        selectedFile: fileName,
        fileData: fileDataMock,
        loading: false,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <FileData fileName={fileName} onBack={() => {}} />
      </Provider>
    );

    expect(screen.getByText('Sample text')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('abcdef1234567890abcdef1234567890')).toBeInTheDocument();
  });
});
