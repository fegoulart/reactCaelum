//Action Creator Async
//export const carregaTweets = (store) => {
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