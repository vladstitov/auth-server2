import * as fs from 'fs-extra'



export async function moveFiles(files :{path: string, newPath: string}[]) {
  return await files.map(function (item) {
    return moveFile(item.path, item.newPath);
  });
}

export async function moveFile (oldPath :string, newPath: string) {
  return new Promise(function (resolve, reject) {
    fs.move( oldPath,  newPath, err => {
      if (err) {
        reject(err)
      } else resolve(newPath)
    });

  })
}
