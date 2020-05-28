const HttpResponseHelper=require('../helper/HttpResponseHelper');
const getHymn=(url)=>{
    return fetch(url)
}

const getBooks=(url,model)=>{
    return fetch(url,{
        
        method:'POST',
        headers:{'Content-Type':'application/json',
                 'Accept':'application/json'},
                 body:JSON.stringify({References:model})
        })
    }
export {
    getHymn,
    getBooks
}