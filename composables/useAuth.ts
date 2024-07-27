export const useAuth = () => {
  const state = useAuthState()
  const actions = useAuthActions()

  return { ...state, ...actions }
}
