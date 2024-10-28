const express = require('express')
const { getFileList, downloadFile, parseCSV } = require('./utils/externalApi')

const app = express()
const PORT = 3001

app.use(express.json())

/**
 * Root endpoint to check API status.
 * @route GET /
 * @returns {string} - Confirmation message that the API is running.
 */
app.get('/', (req, res) => {
  res.send('Servidor API en funcionamiento')
})

/**
 * Endpoint to retrieve a list of files available from the external API.
 * @route GET /files/list
 * @returns {string[]} - JSON array of file names.
 */
app.get('/files/list', async (req, res) => {
  try {
    const fileList = await getFileList()
    res.status(200).json(fileList)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de archivos' })
  }
})

/**
 * Endpoint to retrieve and format data from available files.
 * @route GET /files/data
 * @param {string} [fileName] - Optional query parameter to filter by specific file.
 * @returns {Array<object>} - JSON array of objects, each representing a file with its parsed content.
 */
app.get('/files/data', async (req, res) => {
  try {
    const { fileName } = req.query
    const fileList = await getFileList()
    const results = []

    const filesToProcess = fileName ? fileList.filter(f => f === fileName) : fileList

    for (const file of filesToProcess) {
      const csvData = await downloadFile(file)
      if (csvData) {
        const parsedData = parseCSV(file, csvData)
        if (parsedData.lines.length > 0) results.push(parsedData)
      }
    }

    res.status(200).json(results)
  } catch (error) {
    res.status(500).json({ error: 'Error procesando archivos' })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor API corriendo en el puerto ${PORT}`)
})

module.exports = app
