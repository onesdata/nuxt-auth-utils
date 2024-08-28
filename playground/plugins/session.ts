export default defineNuxtPlugin(() => {
  const { setExtraParams } = useUserSession()

  setExtraParams({
    sessionPassword: window?.location?.hostname,
  })
})
