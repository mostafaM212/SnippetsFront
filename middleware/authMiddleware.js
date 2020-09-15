

export default function (context){
  if (!context.store.$auth.loggedIn){

    context.redirect('/auth/login')
  }
}
