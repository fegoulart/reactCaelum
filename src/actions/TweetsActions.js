//Action Creator Async
//export const carregaTweets = (store) => {

export const removeOTweet = (idDoTweet) => {
    return function (dispatch) {

        //console.log('dispatch', dispatch)

      

        fetch(`http://twitelum-api.herokuapp.com/tweets/${idDoTweet}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'DELETE'
        })
            .then((resposta) => {
                console.log('flg status', resposta.status)
                if (resposta.status !== 201) {
                    throw Error
                }

                return resposta.json()
            })
            .then((respostaConvertidaEmObjeto) => {
                //console.log(respostaConvertidaEmObjeto) 
                dispatch({ type: 'REMOVE_TWEET', idDoTweet: idDoTweet })
                
                //this.setState({
                //    tweets: listaAtualizada
                //})
            })

            .catch((error) => {
                console.log('deu erro')
            })



    }
}


export const adicionaTweet = (novoTweet) => {
    return function (dispatch) {

        //console.log('dispatch', dispatch)

        fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'POST',
            body: JSON.stringify({ conteudo: novoTweet })
        })
            .then((respostaDoServidor) => {
                console.log('Resposta do Servidor', respostaDoServidor.status)
                if (respostaDoServidor.status !== 201) {
                    //erro
                    throw Error
                }

                return respostaDoServidor.json()
            })
            .then((respostaConvertidaEmObjeto) => {
                //console.log('Que danada que aconteceu', respostaConvertidaEmObjeto)
                /*this.setState({
                    tweets: [respostaConvertidaEmObjeto, ...this.state.tweets],
                    novoTweet: ''
                })*/
                //this.context.store.dispatch({type: 'ADD_TWEET', tweet: respostaConvertidaEmObjeto})
                dispatch({ type: 'ADD_TWEET', tweet: respostaConvertidaEmObjeto })
            })

            .catch((erro) => {
                console.log('deu erro');
            })
    }
}


export const carregaTweets = () => {
    return function (dispatch) {
        fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)

            //fetch('http://twitelum-api.herokuapp.com/tweets')
            .then((respostaDoServidor) => {

                return respostaDoServidor.json()

            })

            .then((tweetsVindosDoServidor) => {
                /*this.setState({
                    tweets: tweetsVindosDoServidor
                })*/

                dispatch({ type: 'CARREGA_TWEETS', tweets: tweetsVindosDoServidor })
            })
    }
}