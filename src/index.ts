import { Database } from './database/Database';
import { Interface } from './ui/Interface';


const main = async () => {
  try {
    await Database.getInstance().initTables();
    const library = Interface.app();
  } catch (err) {
    console.error(err);
  }
};

void main();
