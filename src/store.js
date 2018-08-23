
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';

//import { createStore } from 'redux'
const stateInicial = { tweets: [], tweetAtivo: {}}

//stateInicial só vai para stateDentroDaStore se este ultimo for undefined
function tweetsReducer(stateDentroDaStore = stateInicial, acaoDisparadaPeloDev) {
    if (acaoDisparadaPeloDev.type === 'CARREGA_TWEETS') {
        console.log('Tentando carregar tweets')
        //return acaoDisparadaPeloDev.tweets
        return {
            ...stateDentroDaStore,
            tweets: acaoDisparadaPeloDev.tweets
        }
    }
    if (acaoDisparadaPeloDev.type === 'ADD_TWEET') {
        const tweetsAntigos = stateDentroDaStore.tweets
        const tweetNovo = acaoDisparadaPeloDev.tweet
        return { 
            ...stateDentroDaStore,
            tweets: [tweetNovo, ...tweetsAntigos] }
    }
    if (acaoDisparadaPeloDev.type === 'REMOVE_TWEET') {
        // const tweetsAntigos = stateDentroDaStore
        //const tweetNovo = acaoDisparadaPeloDev.tweet
        //return [tweetNovo , ...tweetsAntigos]

        //varre os tweets do state e tira o que tem o id desejado
        const listaAtualizada = stateDentroDaStore.tweets.filter((tweetAtual) => {
            if (tweetAtual._id !== acaoDisparadaPeloDev.idDoTweet) {
                return true
            } else {
                return false
            }

        })
        return { 
            ...stateDentroDaStore,
            tweets: listaAtualizada
        }
    }

    // Abre modal

    if (acaoDisparadaPeloDev.type === 'ABRE_MODAL') {
        //console.log(acaoDisparadaPeloDev)
        const idDoTweeetQueVaiNoModal = acaoDisparadaPeloDev.idDoTweetQueVaiNoModal
        const tweetQueVaiFicarAtivo = stateDentroDaStore.tweets.find((item)=> {
            return item._id === idDoTweeetQueVaiNoModal
        })
        //console.log('tweetQueVaiFicarAtivo',tweetQueVaiFicarAtivo)
        //console.log('idDoTweeetQueVaiNoModal', idDoTweeetQueVaiNoModal)
        return {
            ...stateDentroDaStore,
            tweetAtivo: tweetQueVaiFicarAtivo
        }
    }

    // fecha modal
    if (acaoDisparadaPeloDev.type === 'FECHA_MODAL') {
    
        return {
            ...stateDentroDaStore, 
            tweetAtivo: {}
        }
    }

    if(acaoDisparadaPeloDev.type === 'LIKE') {
        const idTweetLikeado = acaoDisparadaPeloDev.idDoTweet
        console.log('Dentro do reducer', idTweetLikeado)
        const listaNova = stateDentroDaStore.tweets.map((tweetAtual) => {
            const { likeado, totalLikes, _id  } = tweetAtual
            if(idTweetLikeado === _id) {
                tweetAtual.likeado = !likeado
                tweetAtual.totalLikes = likeado ? totalLikes -1 : totalLikes + 1
            }
            return tweetAtual
        }) 
        return {
            ...stateDentroDaStore,
            tweets: listaNova
        }
    }


    return stateDentroDaStore
}

function notificacaoReducer(state = '', action) {
    if(action.type === 'ADD_NOTIFICACAO') {
        console.log('notificacao nova', action.msg)
        return action.msg
    }
    if (action.type === 'REMOVE_NOTIFICACAO') {
        return ''
    }

    return state 
}

//export default createStore(tweetsReducer)

export default createStore(
    //tweetsReducer,
    //applyMiddleware(thunk)
    combineReducers({
        tweets: tweetsReducer, 
        notificacao: notificacaoReducer
    }), applyMiddleware(thunk)
)


