//

const fs = require('fs');
const path = require('path');

//

const readdirAsync = asyncfy(fs.readdir);
const readFileAsync = asyncfy(fs.readFile);
const writeFileAsync = asyncfy(fs.writeFile);

//

launch(path.resolve(__dirname, './dummy')).catch(console.error);

//

async function launch(dirPath) {
  const jsonFiles = await readdirAsync(dirPath);
  const jsonFilesContent = await Promise.all(
    jsonFiles.map(jsonFile =>
      readFileAsync(path.resolve(dirPath, jsonFile), 'utf8').then(content => ({
        [jsonFile.replace('.json', '')]: JSON.parse(content)
      }))
    )
  );
  const mergeResult = jsonFilesContent.reduce((memo, data) =>
    Object.assign({}, memo, data)
  );
  await writeFileAsync(
    path.resolve(dirPath, '../db.json'),
    JSON.stringify(mergeResult, null, 2)
  );
}

//

function asyncfy(fn) {
  return (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        err ? reject(err) : resolve(data);
      });
    });
}
