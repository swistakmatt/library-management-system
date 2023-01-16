import { DatabaseElement } from '../../database/DatabaseElement.js';
import { Repository, RepositoryInterface } from './Repository.js';


export class MediaRepositoryProxy<T extends DatabaseElement> implements RepositoryInterface<T> {
  private readCache: Map<number, T>;
  private ready = false;

  constructor(private repository: Repository<T>) {
    this.readCache = new Map();

    void this.syncReadCache();
  }

  private async syncReadCache(): Promise<void> {
    const elements = await this.repository.getAll();
    this.readCache.clear();
    this.ready = false;

    for (const element of elements) {
      if (element.getId() === null) continue;
      this.readCache.set(element.getId() as number, element);
    }

    this.ready = true;
  }

  public async getById(id: number): Promise<T> {
    if (!this.ready) await this.syncReadCache();

    let element = this.readCache.get(id);

    if (element === undefined) {
      element = await this.repository.getById(id);
      this.readCache.set(id, element);
    }

    return element;
  }

  public async getAll(): Promise<T[]> {
    if (!this.ready) await this.syncReadCache();

    return Array.from(this.readCache.values());
  }

  public async hasId(id: number): Promise<boolean> {
    if (!this.ready) await this.syncReadCache();

    return this.readCache.has(id);
  }

  public async set(instance: T): Promise<number> {
    const id = await this.repository.set(instance);
    this.readCache.set(id, instance);

    return id;
  }

  public async update(element: T): Promise<void> {
    await this.repository.update(element);

    if (element.getId() === null) return;
    this.readCache.set(element.getId() as number, element);
  }

  public async delete(element: T): Promise<void> {
    await this.repository.delete(element);

    if (element.getId() === null) return;
    this.readCache.delete(element.getId() as number);
  }

  public async *[Symbol.asyncIterator](): AsyncIterableIterator<T> {
    if (!this.ready) await this.syncReadCache();

    yield* this.readCache.values();
  }
}
