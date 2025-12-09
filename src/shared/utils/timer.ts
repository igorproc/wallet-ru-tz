export async function awaitTimer(seconds: number) {
  const timerMs = seconds * 1000

  return await new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(true)
      clearTimeout(timer)
    }, timerMs)
  })
}
