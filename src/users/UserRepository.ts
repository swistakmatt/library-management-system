import { Repository } from '../media/repositories/Repository';
import { Database } from '../database/Database';
import { User, UserConstructor } from './User';


export class UserRepository extends Repository<User> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async getById(id: number) {
    const db = Database.getConnection();

    const statement = await db.get('SELECT * FROM User WHERE id = $id', { $id: id });

    return this.statementToInstance(statement);
  }

  public async getByUsername(username: string): Promise<User> {
    const db = Database.getConnection();

    const statement = await db.get('SELECT * FROM User WHERE username = $username', { $username: username });

    return this.statementToInstance(statement);
  }

  public async set(instance: User): Promise<number> {
    const db = Database.getConnection();

    const statement = await db.run(
      `UPDATE User SET
        username = $username,
        password = $password,
        displayName = $displayName,
        admin = $admin`,
      {
        $username: instance.getUsername(),
        $password: instance.getPassword(),
        $displayName: instance.getDisplayName(),
        $admin: instance.isAdmin(),
      }
    );

    if (this.statementContainsId(statement)) {
      return statement.id;
    } else {
      throw new Error('Could not set user');
    }
  }

  public async create(obj: UserConstructor): Promise<User> {
    const db = Database.getConnection();

    if (!User.isUserConstructor(obj)) throw new Error('Invalid user parameters');
    const user = new User(obj.username, obj.password, obj.displayName, obj.admin);

    const statement = await db.get(
      `INSERT INTO User 
       (username, password, displayName, admin)
       VALUES
       ($username, $password, $displayName, $admin)
       returning id`,
      {
        $username: user.getUsername(),
        $password: user.getPassword(),
        $displayName: user.getDisplayName(),
        $admin: user.isAdmin(),
      }
    );


    if (this.statementContainsId(statement)) {
      user.setId(statement.id);
      return user;
    } else {
      throw new Error('Could not create user');
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async update(instance: User) {
    const db = Database.getConnection();

    if (instance.getId() === null) throw new Error('User id is null');

    await db.run(
      `UPDATE User SET

       username = $username,
       password = $password,
       displayName = $displayName,
       admin = $admin
       
       WHERE id = $id`,
      {
        $username: instance.getUsername(),
        $password: instance.getPassword(),
        $displayName: instance.getDisplayName(),
        $admin: instance.isAdmin(),
      });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected statementToInstance(statement: unknown) {
    if (statement === undefined) throw new Error('User not found');

    // dirty fix to translate admin<int> into admin<bool>
    // dirty fix to parse json in cast
    if (
      statement !== null && typeof statement === 'object' &&
      'admin' in statement && typeof statement.admin === 'number'
    ) {
      statement = {
        ...statement,
        ...{
          _public: statement.admin === 1,
        },
      };
    }


    if (User.isUserConstructor(statement) && this.statementContainsId(statement)) {
      const user = new User(statement.username, statement.password, statement.displayName, statement.admin);
      user.setId(statement.id);

      return user;
    } else {
      throw new Error('User constructor is invalid');
    }
  }
}
