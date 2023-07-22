const fs = require("fs");
const stream = require("stream");

function sortChildren(array) {
  array.sort((a, b) => {
    const partsA = a.code.split(".").map(Number);
    const partsB = b.code.split(".").map(Number);

    for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
      if (partsA[i] !== partsB[i]) {
        return partsA[i] - partsB[i];
      }
    }

    return 0;
  });

  array.forEach(item => {
    if (item.children && item.children.length) {
      sortChildren(item.children);
    }
  });
}

async function saveResultsToJSON(data) {
  const readable = new stream.Readable({
    read() {
      this.push(JSON.stringify(data, null, 2)); // Преобразование данных в форматированную JSON-строку
      this.push(null); // Сигнал о завершении чтения данных
    },
  });

  const writeStream = fs.createWriteStream("./public/results.json");

  readable.pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });
}

module.exports = {
  sortChildren,
  saveResultsToJSON,
};
