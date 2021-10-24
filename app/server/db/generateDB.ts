import fs from 'fs-extra';
import path from 'path';

import { IDB } from 'server/types/db';

const DB_PATH = path.resolve(__dirname, '../../../db.json');

(async () => {
  await fs.ensureFile(DB_PATH);

  const newDB: IDB = {
    users: [],
  };

  await fs.writeJSON(DB_PATH, newDB);
})();
