export interface Command {
  execute(): void | Promise<void>;
  undo(): void | Promise<void>;
}

