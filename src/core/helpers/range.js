/**
 *
 * @param {number} start
 * @param {number} end
 * @returns {number[]}
 */
export const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};
