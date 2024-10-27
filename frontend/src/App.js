// src/App.js

import React, { useState } from 'react';
import FileList from './components/FileList';
import FileData from './components/FileData';
import { Container } from 'react-bootstrap';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSelectFile = (fileName) => {
    setSelectedFile(fileName);
  };

  const handleBack = () => {
    setSelectedFile(null);
  };

  return (
    <Container className="mt-4">
      <h1>File Viewer</h1>
      {selectedFile ? (
        <FileData fileName={selectedFile} onBack={handleBack} />
      ) : (
        <FileList onSelectFile={handleSelectFile} />
      )}
    </Container>
  );
}

export default App;
