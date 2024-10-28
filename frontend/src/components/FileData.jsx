import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFileData, clearSelectedFile } from '../slices/fileSlice';
import { Table, Container, Button, Spinner, Alert } from 'react-bootstrap';

function FileData() {
  const dispatch = useDispatch();
  const { selectedFile, fileData, loading, error } = useSelector((state) => state.file);

  useEffect(() => {
    if (selectedFile && !fileData) {
      dispatch(fetchFileData(selectedFile));
    }
  }, [dispatch, selectedFile, fileData]);


  return (
    <Container>
      <div className='d-flex justify-content-between align-items-center my-sm-4'>
        <h2>Data for {selectedFile}</h2>
        <Button variant='secondary' onClick={() => dispatch(clearSelectedFile())} className='mb-3'>
          Back to Files
        </Button>
      </div>

      {loading && (
        <div className='text-center my-4'>
          <Spinner animation='border' role='status' className='me-2' />
          <span>Loading data...</span>
        </div>
      )}

      {error && <Alert variant='danger' className='text-center'>{error}</Alert>}

      {!loading && !error && !fileData && (
        <Alert variant='info' className='text-center'>No data available for this file.</Alert>
      )}

      {!loading && !error && fileData && fileData.lines.length > 0 && (
        <Table responsive='md' striped bordered hover className='shadow-sm'>
          <thead className='bg-primary text-white'>
            <tr>
              <th>Text</th>
              <th>Number</th>
              <th>Hex</th>
            </tr>
          </thead>
          <tbody>
            {fileData.lines.map((line, index) => (
              <tr key={index}>
                <td>{line.text}</td>
                <td>{line.number}</td>
                <td className='text-monospace'>{line.hex}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default FileData;
