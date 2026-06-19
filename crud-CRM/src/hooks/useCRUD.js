import { useLocalStorage, nextId } from "./useLocalStorage";

/**
 * Generic CRUD hook. Zarządza list of items persisted w localStorage.
 * @param {string} key - localStorage key
 * @param {Array} initialData - initial data if empty
 * @returns {Object} { items, add, update, delete, isEmpty }
 */
export function useCRUD(key, initialData = []) {
  const [items, setItems] = useLocalStorage(key, initialData);

  const add = (item) => {
    const newItem = {
      ...item,
      id: nextId(items),
    };
    setItems((prev) => [...prev, newItem]);
    return newItem;
  };

  const update = (id, updates) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const remove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    items,
    add,
    update,
    delete: remove,
    isEmpty: items.length === 0,
  };
}
