import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'; 
import Cabecalho from './components/Cabecalho'
import NavMenu from './components/NavMenu'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'
import TrendsArea from './components/TrendsArea'
//import Tweet from './components/Tweet'
import Tweet from './containers/TweetContainer'
import Modal from './components/Modal'
import * as TweetsActions from './actions/TweetsActions'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            novoTweet: '',
            tweets: [],
            tweetAtivo: {}
        }
    }

    static contextTypes = {   
        store: PropTypes.object  
    }

    componentDidMount() {
        //console.log('didMount')
        //console.log(this)

        this.context.store.subscribe(()=>{
            //console.log('dentro do subscribe')

            this.setState({
                tweets: this.context.store.getState()
            })
        })

        //TweetsActions.carregaTweets(this.context.store)
        //esta chamada de dispatch nao chama o subscribe pois recebe um metodo como parametro
        this.context.store.dispatch(TweetsActions.carregaTweets())

    }

    adicionaTweet = (event) => {
        event.preventDefault()
        console.log(this.state.novoTweet)
        //valida o conteudo
        if (this.state.novoTweet) {

            this.context.store.dispatch(TweetsActions.adicionaTweet(this.state.novoTweet))

            this.setState({
                novoTweet: ''
            })    
        }
    }



    abreModal = (idDoTweetQueVaiNoModal) => {
        console.log('Abre modal', idDoTweetQueVaiNoModal)
        const tweetQueVaiFicarAtivo = this.state.tweets.find((tweetAtual) => {
            return tweetAtual._id === idDoTweetQueVaiNoModal
        })
        this.setState({
            tweetAtivo: tweetQueVaiFicarAtivo
        })
    }

    fechaModal = (evento) => {
        const elementoAlvo = evento.target
        const isModal = elementoAlvo.classList.contains('modal')

        if (isModal) {
            this.setState({
                tweetAtivo: {}
            })
        }
    }

    render() {
        //console.log('tweets', this.state.tweets)
        return (

            <Fragment>
                <Cabecalho>
                    <NavMenu usuario="@omariosouto" />
                </Cabecalho>
                <div className="container">
                    <Dashboard>
                        <Widget>
                            <form onSubmit={this.adicionaTweet} className="novoTweet">
                                <div className="novoTweet__editorArea">
                                    <span className={`novoTweet__status ${this.state.novoTweet.length > 140 ? "novoTweet__status--invalido" : ''}`} >{this.state.novoTweet.length}/140</span>
                                    <textarea
                                        onChange={(event) => { this.setState({ novoTweet: event.target.value }) }}
                                        className="novoTweet__editor"
                                        placeholder="O que está acontecendo?"
                                        value={this.state.novoTweet}
                                    ></textarea>
                                </div>
                                <button disabled={this.state.novoTweet.length > 140} type="submit" className="novoTweet__envia">Tweetar</button>
                            </form>
                        </Widget>
                        <Widget>
                            <TrendsArea />
                        </Widget>
                    </Dashboard>
                    <Dashboard posicao="centro">
                        <Widget>
                            <div className="tweetsArea">
                                {
                                    this.state.tweets.length ? '' : 'Carregando'
                                }

                                {
                                    this.state.tweets.map((tweetAtual, indice) => {
                                        //return <Tweet key={indice} texto={tweetAtual} />
                                        return <Tweet
                                            //key={indice}
                                            key={tweetAtual._id}
                                            texto={tweetAtual.conteudo}
                                            usuario={tweetAtual.usuario}
                                            likeado={tweetAtual.likeado}
                                            totalLikes={tweetAtual.totalLikes}
                                            id={tweetAtual._id}
                                            removivel={tweetAtual.removivel}
                                            //removeHandler={() => { this.removeOTweet(tweetAtual._id) }}
                                            abreModalHandler={() => { this.abreModal(tweetAtual._id) }}

                                        />
                                    })
                                }


                            </div>
                        </Widget>
                    </Dashboard>
                </div>
                <Modal isAberto={Boolean(this.state.tweetAtivo._id)}
                fechaModal={this.fechaModal}>
                    {
                        Boolean(this.state.tweetAtivo._id) &&

                        <Widget>
                            <Tweet 
                            id={this.state.tweetAtivo._id}
                            texto={this.state.tweetAtivo.conteudo}
                            usuario={this.state.tweetAtivo.usuario}
                            totalLikes={this.state.tweetAtivo.totalLikes}
                            likeado={this.state.tweetAtivo.likeado}
                            />
                    </Widget>
                    }
                </Modal>
            </Fragment>
        );
    }
}

Tweet.propTypes = {
    texto: PropTypes.string.isRequired,   
    usuario: PropTypes.object.isRequired,
    likeado: PropTypes.bool,
    totalLikes: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    removivel: PropTypes.bool,
    removeHandler: PropTypes.func,
    abreModalHandler: PropTypes.func
}

export default Home;
