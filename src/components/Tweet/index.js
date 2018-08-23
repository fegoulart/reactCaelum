import React, { Component } from 'react'
import './tweet.css'
//import * as TweetsActions from '../../actions/TweetsActions'
import PropTypes from 'prop-types';


class Tweet extends Component {
    //console.log(this)

    constructor(props) {
        super(props)
        this.state = {
            likeado: props.likeado,
            totalLikes: props.totalLikes

        }
    }

    static contextTypes = {
        store: PropTypes.object
    }

    // removeHandler = () => {

    //   const idDoTweet = this.props.id 
    // console.log('estou dentro do tweet', idDoTweet)
    //this.context.store.dispatch(TweetsActions.removeOTweet(idDoTweet))

    /*
    //varre os tweets do state e tira o que tem o id desejado
    const listaAtualizada = this.state.tweets.filter((tweetAtual) => {
        if (tweetAtual._id !== idDoTweet) {
            return true
        } else {
            return false
        }
    })

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
            this.setState({
                tweets: listaAtualizada
            })
        })

        .catch((error) => {
            console.log('deu erro')
        })


    this.setState({
        tweets: listaAtualizada
    })
    */
    // }

    likeHandler = () => {
        //const { likeado, totalLikes } = this.state


        //this.setState({
        //   likeado: !likeado,
        //   totalLikes: likeado ? totalLikes - 1 : totalLikes + 1
        //})

        // Mandar para API
        //console.log("este tweet", `http://twitelum-api.herokuapp.com/tweets/${this.props.id}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
        fetch(`http://twitelum-api.herokuapp.com/tweets/${this.props.id}/like?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'POST'
        })
            .then((respostaDoServidor) => {
                console.log('Resposta do Servidor', respostaDoServidor.status)
                if (respostaDoServidor.status !== 201) {
                    //erro
                    throw Error
                }

                //return respostaDoServidor.json()
            })
            .then((respostaConvertidaEmObjeto) => {
                this.context.store.dispatch({ type: 'LIKE', idDoTweet: this.props.id })

                //console.log('Que danada que aconteceu', respostaConvertidaEmObjeto)
                /*this.setState({
                    //tweets: [this.state.novoTweet, ...this.state.tweets],
                    tweets: [respostaConvertidaEmObjeto, ...this.state.tweets],
                    novoTweet: ''
                })*/
            })





    }


    render() {
        //console.log(tis.props)
        //const { usuario, texto } = this.props
        //const { likeado, totalLikes } = this.state
        //console.log(this.props)
        const { usuario, texto, likeado, totalLikes } = this.props


        return (
            <article className="tweet">
                <div className="tweet__cabecalho" onClick={this.props.abreModalHandler}>
                    <img className="tweet__fotoUsuario" src={usuario.foto} alt="" />
                    <span className="tweet__nomeUsuario">Fulano de Tal</span>
                    <a href=""><span className="tweet__userName">@{this.props.usuario.login}</span></a>
                </div>
                <p className="tweet__conteudo" onClick={this.props.abreModalHandler}><span>{texto}</span></p>
                <footer className="tweet__footer">
                    {
                        this.props.removivel && <button className="btn btn--blue btn--remove" onClick={this.props.removeHandler}>X</button>
                    }

                    <button className="btn btn--clean" onClick={this.likeHandler} >
                        <svg className={`icon icon--small iconHeart ${likeado ? 'iconHeart--active' : ''}  `} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 47.5">
                            <defs>
                                <clipPath id="a">
                                    <path d="M0 38h38V0H0v38z"></path>
                                </clipPath>
                            </defs>
                            <g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
                                <path d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.632-8.018-4.128-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.773.098-1.52.266-2.242C2.75 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.47.268 2.241"></path>
                            </g>
                        </svg>
                        {totalLikes}
                    </button>
                </footer>
            </article>
        )
    }
}

export default Tweet