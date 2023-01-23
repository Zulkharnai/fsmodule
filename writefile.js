const fs = require('fs').promises;

async function openFile() {
  try {
    const csvHeaders = 'name,quantity,price'
    await fs.writeFile('greetings.txt', csvHeaders);
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}

async function uploadimage(image_name) {
  try {
    const csvLine = `\n${name},${quantity},${price}`
    await fs.writeFile('groceries.txt', csvLine, { flag: 'a' });
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}

(async function () {
  await openFile();
  await uploadimage('eggs', 12, 1.50);
  await uploadimage('nutella', 1, 4);
})();