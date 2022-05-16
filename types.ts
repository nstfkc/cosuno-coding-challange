import data from "./data.json";

type ItemType<T> = T extends Array<infer R> ? R : unknown;

export type Company = ItemType<typeof data["companies"]>;
export type Filter = ItemType<typeof data["filters"]>;
