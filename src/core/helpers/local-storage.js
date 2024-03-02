export const storagePrefix = "$emfy_";

export const setLocalStorage = (key, value) => {
  key = storagePrefix + key;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    throw new Error(`Invalid data. Cannot serialize ${key}`);
  }
};

export const getLocalStorage = (key) => {
  key = storagePrefix + key;

  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (error) {
    throw new Error(`Invalid data. Cannot deserialize ${key}`);
  }
};
