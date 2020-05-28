export const HttpJsonResponseHelper=(response)=>{
    if(!response.ok)
    {
        return Promise.reject(response.statusText)
    }
    return response.json();
}

export const HttpTextResponseHelper=(response)=>{
    if(!response.ok)
    {
        return Promise.reject(response.statusText)
    }
    return response.text();
}

