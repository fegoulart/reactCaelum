import Tweet from '../components/Tweet'
import * as TweetActions from '../actions/TweetsActions'
import { connect } from 'react-redux'

const mapStateToProps = (state) => { return {}}
const mapDispatchToProps = (dispatch, propsRecebidas) => {
    return {
        removeHandler: function() {
            dispatch(TweetActions.removeOTweet(propsRecebidas.id))
        }
    }
}

const TweetPadraoContainer = connect(mapStateToProps, mapDispatchToProps)(Tweet)
export default TweetPadraoContainer