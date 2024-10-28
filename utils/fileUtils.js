import csvParser from "csv-parser";
import { stringify } from "csv-stringify";
import fs from "fs";

export const parseCSV = (filePath) => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
};

export const generateCSV = (data) => {
  return new Promise((resolve, reject) => {
    stringify(data, { header: true }, (err, output) => {
      if (err) return reject(err);
      resolve(output);
    });
  });
};
