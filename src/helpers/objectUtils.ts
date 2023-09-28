export const convertObjectKeysCamelToSnake = async (data: object) => {
  const tempObject = {};

  function camelToUnderscore(key) {
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
  }

  for (const camel in data) {
    tempObject[camelToUnderscore(camel)] = data[camel];
  }

  return tempObject;
};

export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
