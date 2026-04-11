export const save = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
export const load = key => JSON.parse(localStorage.getItem(key)) || [];

export const isInStorage = (key, id) => load(key).includes(id);
