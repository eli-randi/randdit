const baseUrl = 'https://oauth.reddit.com'

export const getFromApi = async (path, params, token) => {
    const fullUrl = baseUrl + path + '?' + new URLSearchParams(params)
    const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
            'Authorization': `bearer ${token}`,
            'User-Agent': 'Elisa Randisi by elirandi12'
        },
    }).then((resp) => {
        return resp.json()
    })
    return response;
}

export const postToApi = async (path, params, token) => {
    const paramsAsFormData = new URLSearchParams(params).toString();
    const fullUrl = baseUrl + path;
    const response = await fetch(fullUrl, {
        method: 'POST',
        body: paramsAsFormData,
        headers: {
            'Authorization': `bearer ${token}`,
            'Content-Type': "application/x-www-form-urlencoded",
            'User-Agent': 'Elisa Randisi by elirandi12'
        },
    }).then((resp) => {
        return resp.json()
    })
    return response;
}

