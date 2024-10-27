import React, { useEffect, useState } from 'react';
import { Button, ListGroup, Container } from 'react-bootstrap';

function FileList({ onSelectFile }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/files/list')
      .then(response => response.json())
      .then(data => setFiles(data))
      .catch(err => setError('Failed to load files'));
  }, []);

  return (
    <Container>
      <h2>Available Files</h2>
      {error && <p className="text-danger">{error}</p>}
      <ListGroup>
        {files.map((file, index) => (
          <ListGroup.Item key={index} className='d-flex justify-content-around align-items-center'>
            {file}
            <Button
              variant="primary"
              className="float-right"
              onClick={() => onSelectFile(file)}
            >
              View Data
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default FileList;
