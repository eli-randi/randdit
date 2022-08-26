import Lottie from 'lottie-react'

import UFOLottie from '../../Assets/UFO_Lottie.json'
import { redirectUri, clientId } from '../../utils/Authorization'

import './LandingPage.css'

const generateRandomString = () => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

function getOauthUrl() {
  const stateId = generateRandomString();
  return `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=${stateId}&redirect_uri=${redirectUri}&duration=permanent&scope=identity,edit,flair,history,modconfig,modflair,modlog,modposts,modwiki,mysubreddits,privatemessages,read,report,save,submit,subscribe,vote`
}

function redirectToReddit() {
  let url = getOauthUrl();
  window.location.replace(url)
}

export const LandingPage = () => {
  return (
    <div className='LandingPage'>
      <div className="IntroBox">
        <div className='Typewriter'>
          <h1>Welcome to Randdit</h1>
        </div>
        <h3>Please log in to continue...</h3>
      </div>
      <div className='LottieImage'>
        <Lottie animationData={UFOLottie} />
        <button onClick={() => { redirectToReddit() }}>Login</button>
      </div>
    </div>
  )
}