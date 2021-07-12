export type Entity<Key, T> = Readonly<T & { id: Key }>;
