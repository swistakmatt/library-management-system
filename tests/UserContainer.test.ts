import { Database } from '../src/database/Database';
import { User } from '../src/users/User';
import { UserContainer } from '../src/users/UserContainer';


beforeAll(async () => {
  await Database.getConnection().run('DROP TABLE IF EXISTS User');
  await Database.getInstance().initTables();
});

beforeEach(async () => {
  const db = Database.getConnection();
  await db.run('DELETE FROM User');
});

test('adds a new user to the repository', async () => {
  const container = new UserContainer();
  await container.addUser('testuser', 'password', 'Test User', false);
  const user = await container.getUser('testuser', 'password');

  expect(user.getUsername()).toBe('testuser');
  expect(user.getDisplayName()).toBe('Test User');
  expect(user.isAdmin()).toBe(false);
  expect(user.getPassword()).toBe('password');
});

test('throws an error if a user with the same username already exists', async () => {
  const container = new UserContainer();
  await container.addUser('testUser', 'password', 'Test User', false);

  await expect(async () => container.addUser('testUser', 'password', 'Test User 2', false))
    .rejects.toThrow();
});

test('returns a user object for a valid username and password', async () => {
  const container = new UserContainer();
  await container.addUser('testuser', 'password', 'Test User', false);
  const user = await container.getUser('testuser', 'password');

  expect(user.getUsername()).toBe('testuser');
  expect(user.getDisplayName()).toBe('Test User');
  expect(user.isAdmin()).toBe(false);
});

test('throws an error for an incorrect password', async () => {
  const container = new UserContainer();
  await container.addUser('testuser', 'password', 'Test User', false);

  await expect(async () => container.getUser('testuser', 'wrongpassword'))
    .rejects.toThrow('Incorrect password!');
});

test('removes a user from the repository', async () => {
  const container = new UserContainer();
  await container.addUser('testuser', 'password', 'Test User', false);
  const admin = new User('admin', 'password', 'Admin User', true);
  await container.removeUser(admin, 'testuser');

  await expect(async () => container.getUser('testuser', 'password'))
    .rejects.toThrow('User not found');
});

test('throws an error if user is an admin', async () => {
  const container = new UserContainer();
  await container.addUser('testuser', 'password', 'Test User', true);
  const admin = new User('testuser', 'password', 'Admin User', true);

  await expect(async () => container.removeUser(admin, 'testuser'))
    .rejects.toThrow('Cannot delete active user!');
});
