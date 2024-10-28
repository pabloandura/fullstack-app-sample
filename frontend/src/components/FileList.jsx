import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFileList, selectFile } from '../slices/fileSlice';
import { Button, ListGroup, Container, Spinner } from 'react-bootstrap';

function FileList() {
  const dispatch = useDispatch();
  const { fileList, error } = useSelector((state) => state.file);
  const [loadingFile, setLoadingFile] = useState(null);

  useEffect(() => {
    dispatch(fetchFileList());
  }, [dispatch]);

  const handleSelectFile = (file) => {
    setLoadingFile(file);
    dispatch(selectFile(file));
    setTimeout(() => setLoadingFile(null), 500);
  };

  return (
    <Container>
      <h2>Available Files</h2>
      {error && <p className='text-danger'>{error}</p>}
      <ListGroup>
        {fileList.map((file, index) => (
          <ListGroup.Item key={index} className='d-flex justify-content-between align-items-center'>
            {file}
            <Button
              variant='transparent'
              className='float-right'
              title='Show rows for this file'
              onClick={() => handleSelectFile(file)}
            >
              {loadingFile === file ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <i className='bi bi-folder2-open' />
              )}
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default FileList;
