import { SimpleSpeakerData } from './data/objSpeakerData'
import Speakers from './components/Speakers'

// Log all speakers data, structured as objects.
console.log(SimpleSpeakerData)

/**
 * Object.keys()
 */
// Log root keys.
console.log(Object.keys(SimpleSpeakerData))

// Log keys inside root object.
console.log(Object.keys(SimpleSpeakerData.Africa))

// Retrieve the values of the key.
for (const key in SimpleSpeakerData.Africa) {
  console.log(`${key}: ${SimpleSpeakerData.Africa[key]}`)
}

/**
 * Object.values()
 */
// Return the values for all members of the root object.
console.log(Object.values(SimpleSpeakerData))

// Return values (no keys) for all members of the Africa object.
console.log(Object.values(SimpleSpeakerData.Africa))

/**
 * Object.entries()
 */
// Returns keys and values for all members of the Afria object.
for (const key of Object.entries(SimpleSpeakerData.Africa)) {
  console.log(`${key[0]} : ${key[1]}`)
}

function App() {
  return (
    <div>
      <Speakers />
    </div>
  );
}

export default App;
