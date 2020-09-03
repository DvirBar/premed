import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLike } from '../../redux/actions/topics';
import IconObj from './IconsMap';

function Item({ topicId, item }) {
    const dispatch = useDispatch();
    const [hasLiked, setHasLiked] = useState(false);
    const likes = item.likes
    const auth = useSelector(state => state.auth);
    const userId = auth.user._id; 

    useEffect(() => {
        if(likes) {
            if(likes.users.find(user => user === userId))
                setHasLiked(true)

            else
                setHasLiked(false)
        }
    }, [likes])

    const dispatchTogLike = () => {
        dispatch(toggleLike(topicId, item._id))
    }

    return (
        <p className="material-item">
            <a 
            href={item.link}
            target="_blank"
            rel="noopener noreferrer">
                <span className="item-title">{item.name}</span>
                <span className="item-icon">
                    <img src={IconObj[item.icon]} />
                </span>
            </a>
            <span 
            className="item-footer">
                <span className="item-likes">
                    <span className="item-likes-count">
                        {likes.count}
                    </span>
                    <span onClick={() => dispatchTogLike()}>
                        {hasLiked 
                            ? <i className="material-icons">favorite</i>
                            : <i className="material-icons">favorite_border</i>
                        }
                    </span>
                </span>
            </span>
        </p>
    )
}

Item.propTypes = {
    topicId: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired
}

export default Item
