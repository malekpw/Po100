const fs = require('fs');

// Function to generate GUID (a simple implementation)
function generateGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Function to hash the GUID
function hashGuid(guid, playerId) {
  const str = guid + playerId;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }
  return hash;
}

// Read the IDs from the ids.json file
const idsJSON = JSON.parse(fs.readFileSync('ids.json', 'utf8'));
const playerIds = idsJSON.ids;

// Store the console log output in a variable
let consoleOutput = '';

// Example: Inserting player IDs with different GUIDs into the table
for (const playerId of playerIds) {
  for (let i = 0; i < 200; i++) {
    const guid = generateGuid();
    const cs = hashGuid(guid, playerId);
    const cardId = playerId;

    consoleOutput += `(${cardId}, '${guid}', ${cs}, 0, 0, NULL),\n`;
  }
}

// Write the console log output to a file
fs.writeFileSync('output.txt', consoleOutput);

console.log('Output file "output.txt" created.');