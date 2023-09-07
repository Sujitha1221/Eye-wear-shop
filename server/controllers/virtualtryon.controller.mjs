import { spawn } from "child_process"

const virtualTryOnController =  (req, res) => {
    const imageFilename = req.query.imageFilename; // Get the image filename from the query parameter
  
    if (!imageFilename) {
      return res.status(400).send('Image filename is missing in the query parameter.');
    }
  
    const pythonProcess = spawn('python', ['./python/script.py', imageFilename]);
  
    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python Script Output: ${data.toString()}`);
    });
  
    pythonProcess.on('close', (code) => {
      console.log(`Python Script Closed with Code: ${code}`);
      res.send(`Python Script Closed with Code: ${code}`);
    });
  
    pythonProcess.on('error', (err) => {
      console.error(`Error executing Python Script: ${err.message}`);
      res.status(500).send(`Error executing Python Script: ${err.message}`);
    });
  };

  export default virtualTryOnController;