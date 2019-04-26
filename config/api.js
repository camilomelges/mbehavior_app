export let api;

console.log('aqui', process.env);

if (process.env.REACT_ENV === 'prod') {
    api = {
        url: 'nãotemainda'
    }
} else if (process.env.REACT_ENV === 'dev') {
    api = {
        url: 'localhost:8765'
    }
}