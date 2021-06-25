import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardDeleteButtonClassName = (
    `elements__card-delete-button ${isOwn && 'elements__card-delete-button_visible'}`
  );
  const cardLikeButtonClassName = (
    `elements__card-like-button ${isLiked && 'elements__card-like-button_active'}`
  );

  const handleClick = () => {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  return (
    <li className="elements__card">
      <img className="elements__card-image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="elements__card-description">
        <h2 className="elements__card-title">{card.name}</h2>
        <div className="elements__card-like-section">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="elements__card-like-counter">{card.likes.length}</p>
        </div>
      </div>
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
    </li>
  );
}

export default Card;
