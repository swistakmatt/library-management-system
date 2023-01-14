import { Database } from './database/Database.js';
import { Interface } from './ui/Interface.js';


const main = async () => {
  try {
    await Database.getInstance().initTables();
    const library = Interface.app();
  } catch (err) {
    console.error(err);
  }
};

void main();
