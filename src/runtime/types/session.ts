import type { ComputedRef, Ref } from 'vue'
import type { NitroFetchOptions } from 'nitropack'

export interface User {
}

export interface UserSession {
  user?: User
}

export interface UserSessionRequired extends UserSession {
  user: User
}

export interface UserSessionComposable {
  /**
   * Computed indicating if the auth session is ready
   */
  ready: ComputedRef<boolean>
  /**
   * Computed indicating if the user is logged in.
   */
  loggedIn: ComputedRef<boolean>
  /**
   * The user object if logged in, null otherwise.
   */
  user: ComputedRef<User | null>
  /**
   * The session object.
   */
  session: Ref<UserSession>
  /**
   * Make server request.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  makeRequest: (request: string, opts?: NitroFetchOptions<any>) => Promise<void>
  /**
   * Set requests extra params
   */
  setExtraParams: (params: Record<string, string>) => void
  /**
   * Fetch the user session from the server.
   */
  fetch: () => Promise<void>
  /**
   * Clear the user session and remove the session cookie.
   */
  clear: () => Promise<void>
  /**
   * Clear all sessions.
   */
  clearAllSessions: () => Promise<void>
}
