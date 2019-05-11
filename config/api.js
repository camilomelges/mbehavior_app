console.log(process.env['REACT_ENV']);
console.log(process.env)
if (process.env['REACT_ENV'] === 'prod') {
    api = {
        url: 'nãotemainda',
        full_metal_app_token: 'NãoTemComoAdivinharEsseTokenÇç'
    }
} else if (process.env['REACT_ENV'] === 'dev') {
    api = {
        url: 'http://10.0.3.2:8765',
        full_metal_app_token: 'NãoTemComoAdivinharEsseTokenÇç'
    }
}

export let api;