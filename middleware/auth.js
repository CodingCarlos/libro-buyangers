export default function ({ route, store, redirect }) {
  if (!store.state.auth.isLogged) {
    let loginUri = '/login'
    if (route.path !== '/login') {
      loginUri += `?redirect=${route.fullPath}`
    }
    return redirect(loginUri)
  }
}
