import { parse } from 'csv-parse/sync';
import * as fs from 'fs';

function getCounts() {
  const filesInFolder = fs.readdirSync('files');
  const headers = [
    'organisationId: Descending',
    '@timestamp per 30 minutes',
    'Sum of eventCount',
  ];
  const testArray: Record<string, number> = {};
  filesInFolder.forEach((file) => {
    const arrayBuffer = fs.readFileSync(`files/${file}`, 'utf8');
    const res = parse(arrayBuffer, {
      delimiter: ',',
      columns: headers,
      relax_quotes: true,
    });
    res.shift();
    res.forEach((orIds: any) => {
      const orgId = orIds['organisationId: Descending'];
      testArray[orgId] = testArray.hasOwnProperty(orgId)
        ? parseInt(orIds['Sum of eventCount']) + testArray[orgId]
        : parseInt(orIds['Sum of eventCount']);
    });
    console.log(`${file}`, testArray);
  });
}

getCounts();
