/**
 * @typedef {{
 *   created: number;
 *  id: number;
 *  name: string;
 *  price: number;
 *  responsibleName: string;
 *  customFields: {
 *     name: string;
 *    value: string;
 * }[];
 *}[]} AdaptedList
 */

/**
 *
 * @param {AdaptedList} list
 *
 * @param {{key: string; type:string; direction: 'asc' | 'desc';}} param1
 *
 */
export function sortingList(list, { key, type, direction }) {
  //
  if (direction == null) {
    return sortNumbers(list, "created", "asc");
  }
  if (type === "string") {
    return sortStrings(list, key, direction);
  }
  if (type === "number") {
    return sortNumbers(list, key, direction);
  }
}

/**
 *
 * @param {AdaptedList} array
 * @param {string} key
 * @param {'asc' | 'desc'} direction
 *
 */
function sortStrings(array, key, direction) {
  const result = array.sort((a, b) => {
    const strA = a[key].toUpperCase();
    const strB = b[key].toUpperCase();
    if (strA < strB) {
      return direction === "asc" ? -1 : 1;
    }
    if (strA > strB) {
      return direction === "asc" ? 1 : -1;
    }
    return 0;
  });
  return result;
}

/**
 *
 * @param {AdaptedList} array
 * @param {string} key
 * @param {'asc' | 'desc'} direction
 *
 */
function sortNumbers(array, key, direction) {
  const result = array.sort((a, b) => {
    const A = a[key];
    const B = b[key];
    if (A < B) {
      return direction === "asc" ? -1 : 1;
    }
    if (A > B) {
      return direction === "asc" ? 1 : -1;
    }
    return 0;
  });
  return result;
}
