import Dexie from 'dexie';

export interface Todo {
  id?: number;
  text: string;
  completed: boolean;
}

class TodoDatabase extends Dexie {
  todos: Dexie.Table<Todo,number>;

  constructor() {
    super('TodoDatabase');
    this.version(1).stores({
      todos: '++id,text,completed',
    });
    this.todos = this.table('todos');
  }
}

const db = new TodoDatabase();

export default db;
