export type Entity<T, Key = number> = Readonly<T & { id: Key }>;
