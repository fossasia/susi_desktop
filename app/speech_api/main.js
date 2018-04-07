const speech = require('@google-cloud/speech');
const fs = require('fs');
const path = require('path');
process.env.GOOGLE_APPLICATION_CREDENTIAL = path.join(__dirname, './api_key', 'Analysis.json');

function recordIt (){
let record = require('node-record-lpcm16');
 
let fileW = fs.createWriteStream('test.wav', { encoding: 'binary' });
 
record.start().pipe(fileW);
console.log("Start speaking"); 

setTimeout(function () {
  record.stop();
  console.log("Analysing ...");
}, 4000);

// Creates a client
setTimeout(function() {


const client = new speech.SpeechClient({
  projectId: 'analysis-1522524411029',
  keyFilename: path.join(__dirname, './api_key', 'Analysis.json'),
});
// const client = new speech.SpeechClient();

// The name of the audio file to transcribe
const fileName = './test.wav';

// Reads a local audio file and converts it to base64
const file = fs.readFileSync(fileName);
const audioBytes = file.toString('base64');

// The audio file's encoding, sample rate in hertz, and BCP-47 language code
const audio = {
  content: audioBytes,
};
const config = {
  encoding: 'LINEAR16',
  sampleRateHertz: 16000,
  languageCode: 'en-US',
};
const request = {
  audio: audio,
  config: config,
};

// Detects speech in the audio file
client
  .recognize(request)
  .then(data => {
    const response = data[0];
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);
  return transcription;
     
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

  },10000);

}

module.exports.recordIt = recordIt; 