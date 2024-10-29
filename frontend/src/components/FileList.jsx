import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFileList, fetchFileData } from '../slices/fileSlice';
import { Button, ListGroup, Container, Spinner } from 'react-bootstrap';

function FileList() {
  const dispatch = useDispatch();
  const { fileList, loadingFile } = useSelector((state) => state.file);

  useEffect(() => {
    dispatch(fetchFileList());
  }, [dispatch]);

  const handleSelectFile = (file) => {
    dispatch(fetchFileData(file));
  };

  return (
    <Container>
      <h2>Available Files</h2>
      <ListGroup>
        {fileList.map((file, index) => (
          <ListGroup.Item key={index} className='d-flex justify-content-between align-items-center'>
            {file}
            <Button
              variant='transparent'
              className='float-right'
              title={`Show rows for file ${file}`}
              onClick={() => handleSelectFile(file)}
            >
              {loadingFile === file ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <i className='bi bi-arrow-bar-right' />
              )}
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default FileList;
