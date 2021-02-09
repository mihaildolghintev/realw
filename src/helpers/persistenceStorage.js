export const getItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (e) {
    throw {
      message: "Error getting data from localStorage",
      error: e
    }
  }
}

export const setItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    throw {
      message: "Error saving data to localStorage",
      error: e
    }
  }
}
