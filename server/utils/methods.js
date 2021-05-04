export const arrayToObject = (array, key) => {
    const initialValue = {};

    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item
      };
    }, initialValue);
};