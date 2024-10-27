const axios = require('axios');

const EXTERNAL_API_BASE_URL = 'https://echo-serv.tbxnet.com/v1/secret';
const API_KEY = 'Bearer aSuperSecretKey';

/**
 * Fetches the list of file names from the external API.
 * @returns {Promise<string[]>} - Array of file names.
 */
async function getFileList() {
  try {
    const response = await axios.get(`${EXTERNAL_API_BASE_URL}/files`, {
      headers: {
        Authorization: API_KEY,
      },
    });
    return response.data.files;
  } catch (error) {
    console.error('Error al obtener la lista de archivos:', error.message);
    return [];
  }
}

/**
 * Downloads a CSV file from the external API.
 * @param {string} fileName - Name of the file to download.
 * @returns {Promise<string|null>} - CSV data as a string, or null if download fails.
 */
async function downloadFile(fileName) {
  try {
    const response = await axios.get(`${EXTERNAL_API_BASE_URL}/file/${fileName}`, {
      headers: { Authorization: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al descargar el archivo ${fileName}:`, error.message);
    return null;
  }
}

/**
 * Parses CSV data and converts it into JSON format.
 * Filters out rows with missing fields or invalid data.
 * @param {string} fileName - Name of the file being processed.
 * @param {string} csvData - Raw CSV data to be parsed.
 * @returns {object} - JSON object containing file name and parsed lines.
 */
function parseCSV(fileName, csvData) {
  const lines = csvData.trim().split('\n').slice(1);
  const formattedData = [];

  lines.forEach(line => {
    const [file, text, number, hex] = line.split(',');
    if (file && text && number && hex && hex.length === 32) {
      formattedData.push({ text, number: Number(number), hex });
    }
  });

  return { file: fileName, lines: formattedData };
}

module.exports = { getFileList, downloadFile, parseCSV };
