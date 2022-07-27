import { Buffer } from "buffer";
import { useEffect, createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "./LocalStorage";

// const generateRandomString = () => {
//   var result = '';
//   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   var charactersLength = characters.length;
//   for (var i = 0; i < 6; i++) {
//     result += characters.charAt(Math.floor(Math.random() *
//       charactersLength));
//   }
//   return result;
// }

const hostUri = 'https://randdit.elisa.codes/'
const clientId = '-2uqyTxo_KQjfc3sxmu3FA'
const clientSecret = 'b8x_7fVHiLxmr_0B0yQQNTkkSdQAvw'

// export function getOauthUrl() {
//   const stateId = generateRandomString();
//   return `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=${stateId}&redirect_uri=${hostUri}&duration=permanent&scope=identity,edit,flair,history,modconfig,modflair,modlog,modposts,modwiki,mysubreddits,privatemessages,read,report,save,submit,subscribe,vote`
// }

// export function redirectToReddit() {
//   let url = getOauthUrl();
//   window.location.replace(url)
// }

export async function getToken(returnCode) {

  const form = `grant_type=authorization_code&code=${returnCode}&redirect_uri=${hostUri}`

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")
  console.log(credentials)

  const res = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': "application/x-www-form-urlencoded"
    },
    body: form
  })
  if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`)
  const JSONResponse = await res.json();
  return JSONResponse

}



export const AuthContext = createContext(null);

export const AuthProvider = (props) => {
  const [bearerToken, setBearerToken] = useLocalStorage('redditBearerToken', null);
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const handleLogin = async () => {
      let redditOneTimeUseCode = params.get('code');

      let auth;
      if (redditOneTimeUseCode) {
        auth = await getToken(redditOneTimeUseCode);
        setBearerToken(auth.access_token);
        if (location.pathname == '/') {
          navigate('/homepage')
        }
      } else if (bearerToken == null){
        console.log('here');
        if (location.pathname !== '/') {
          navigate('/')
        }
        
      }
    }

    if (bearerToken == null) {
      handleLogin();
    }
  }
    , [bearerToken, setBearerToken]
  )

  return <AuthContext.Provider value={{ bearerToken }}>{props.children}</AuthContext.Provider>;
}
