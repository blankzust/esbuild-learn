import Server from 'react-dom/server';
// import { PATH } from 'env'

let Greet = () => (<div>hello,esbuild3</div>)

console.log(Server.renderToString(<Greet />));
// console.log(`PATH is ${PATH}`)


