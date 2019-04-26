console.log('aqui', process.env['REACT_ENV']);
if (process.env['REACT_ENV'] === 'prod') {
    api = {
        url: 'nãotemainda'
    }
} else if (process.env['REACT_ENV'] === 'dev') {
    console.log('entrou')
    api = {
        url: 'localhost:8765'
    }
}

export let api;