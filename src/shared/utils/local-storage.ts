export function setToLocalStorage<T>(key: string, payload: T): (T | null) {
  try {
    if (!window.localStorage) {
      return null
    }

    window.localStorage.setItem(key, JSON.stringify(payload))
    return payload
  } catch (error) {
    console.error(error)
    throw new Error('[Utils\\LocalStorage]: setToLocalStorage internal error')
  }
}

export function getFromLocalStorage<T>(key: string): T | null {
  try {
    if (!window.localStorage) {
      return null
    }
    const data = window.localStorage.getItem(key)

    if (!data) {
      return null
    }

    return JSON.parse(data) as T
  } catch (error) {
    console.error(error)
    throw new Error('[Utils\\LocalStorage]: getFromLocalStorage internal error')
  }
}
