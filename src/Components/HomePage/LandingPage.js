import './LandingPage.css'
import UFOLottie from './UFO_Lottie.json'
import Lottie from 'lottie-react'

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

const hostUri = 'https://randdit.elisa.codes/'
const clientId = '-2uqyTxo_KQjfc3sxmu3FA'

function getOauthUrl() {
    const stateId = generateRandomString();
    return `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=${stateId}&redirect_uri=${hostUri}&duration=permanent&scope=identity,edit,flair,history,modconfig,modflair,modlog,modposts,modwiki,mysubreddits,privatemessages,read,report,save,submit,subscribe,vote`
}


function redirectToReddit() {
    let url = getOauthUrl();
    window.location.replace(url)
}

export const LandingPage = () => {

    return (
        <div className='LandingPage'>
            <div className="IntroBox">
                <div className='typewriter'>
                    <h1>Welcome to Randdit</h1>
                </div>
                <h3>Please log in to continue...</h3>

            </div>
            <div className='LottieImage'>
                <Lottie animationData={UFOLottie} />
                <button onClick={() => { redirectToReddit() }}>Login </button>
            </div>
        </div>


    )

}