export const decodeStringFromReddit = (redditString) => {
    return redditString.replace('&amp;', '&').replace('&lt;', '<').replace('&gt', '>')

}