
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';


//import { createStore } from 'redux'
const stateInicial = []

function tweetsReducer(stateDentroDaStore = stateInicial, acaoDisparadaPeloDev) {
    if (acaoDisparadaPeloDev.type === 'CARREGA_TWEETS') {
        console.log('Tentando carregar tweets')
        return acaoDisparadaPeloDev.tweets
    }
    if (acaoDisparadaPeloDev.type === 'ADD_TWEET') {
        const tweetsAntigos = stateDentroDaStore
        const tweetNovo = acaoDisparadaPeloDev.tweet
        return [tweetNovo, ...tweetsAntigos]
    }
    if (acaoDisparadaPeloDev.type === 'REMOVE_TWEET') {
        // const tweetsAntigos = stateDentroDaStore
        //const tweetNovo = acaoDisparadaPeloDev.tweet
        //return [tweetNovo , ...tweetsAntigos]

        //varre os tweets do state e tira o que tem o id desejado
        const listaAtualizada = stateDentroDaStore.filter((tweetAtual) => {
            if (tweetAtual._id !== acaoDisparadaPeloDev.idDoTweet) {
                return true
            } else {
                return false
            }

        })
        return listaAtualizada
    }

    return stateDentroDaStore
}


//export default createStore(tweetsReducer)

export default createStore(
    tweetsReducer,
    applyMiddleware(thunk)
)