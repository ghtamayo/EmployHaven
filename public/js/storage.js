//===============================
// Store
//===============================
export const getItemFromStore = (key, defaultValue, store = localStorage) => {
  return JSON.parse(store.getItem(key)) || defaultValue;
};
export const setItemToStore = (key, payload, store = localStorage) =>
  store.setItem(key, JSON.stringify(payload));
export const getStoreSpace = (store = localStorage) =>
  parseFloat(
    (
      escape(encodeURIComponent(JSON.stringify(store))).length /
      (1024 * 1024)
    ).toFixed(2)
  );
