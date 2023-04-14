export default function ({ store, redirect }) {
    // If the user is not authenticated
    console.log(store.state);
    return false;
    // if(process.browser){
    const token = localStorage.getItem('token')
    // if (!store.state.auth.loggedIn) {
    if (!token) {
       redirect('/login');
    }
    else if (!store.state.token) {
        store.commit('SET_TOKEN', token)
      }
    // }
  }