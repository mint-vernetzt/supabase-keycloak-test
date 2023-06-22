import { useOutletContext } from "@remix-run/react"
import { type SupabaseClient } from "@supabase/auth-helpers-remix"

export default function Login() {
    const { supabase } = useOutletContext<{ supabase: SupabaseClient }>()
  
    const handleKeycloakLogin = async () => {
      await supabase.auth.signInWithOAuth({
        provider: 'keycloak',
        options: {
            scopes: 'openid',
            redirectTo: 'http://localhost:3000/auth/callback',
          },
      })
    }
  
    const handleLogout = async () => {
      console.log("logout");
      await supabase.auth.signOut()
    }
  
    return (
      <>
        <button onClick={handleKeycloakLogin}>Keycloak Login</button>
        <button onClick={handleLogout}>Logout</button>
      </>
    )
  }