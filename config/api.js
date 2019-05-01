if (process.env['REACT_ENV'] === 'prod') {
    api = {
        url: 'nãotemainda'
    }
} else if (process.env['REACT_ENV'] === 'dev') {
    api = {
        url: 'http://10.0.3.2:8765'
    }
}

export let api;