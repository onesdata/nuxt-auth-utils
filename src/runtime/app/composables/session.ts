import type { NitroFetchOptions } from 'nitropack'
import { useState, computed, ref, useRequestFetch } from '#imports'
import type { UserSession, UserSessionComposable } from '#auth-utils'

const extraParams = ref({})
const useSessionState = () => useState<UserSession>('nuxt-session', () => ({}))
const useAuthReadyState = () => useState('nuxt-auth-ready', () => false)

/**
 * Composable to get back the user session and utils around it.
 * @see https://github.com/atinux/nuxt-auth-utils
 */
export function useUserSession(): UserSessionComposable {
  const sessionState = useSessionState()
  const authReadyState = useAuthReadyState()

  return {
    ready: computed(() => authReadyState.value),
    loggedIn: computed(() => Boolean(sessionState.value.user)),
    user: computed(() => sessionState.value.user || null),
    session: sessionState,
    setExtraParams: (params: Record<string, string>) => {
      extraParams.value = params
    },
    makeRequest,
    fetch,
    clear,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function makeRequest(request: string, opts?: NitroFetchOptions<any>): Promise<void> {
  const newOpts = opts || {}

  newOpts.params = {
    ...newOpts.params || {},
    ...extraParams.value || {},
  }

  return await $fetch(request, newOpts)
}

async function fetch() {
  const authReadyState = useAuthReadyState()
  useSessionState().value = await useRequestFetch()('/api/_auth/session/', {
    params: {
      ...extraParams.value || {},
    },
    headers: {
      Accept: 'text/json',
    },
    retry: false,
  }).catch(() => ({}))

  if (!authReadyState.value) {
    authReadyState.value = true
  }
}

async function clear() {
  await makeRequest('/api/_auth/session/', {
    method: 'DELETE',
  })

  useSessionState().value = {}
}
