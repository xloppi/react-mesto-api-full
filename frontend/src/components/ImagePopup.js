function ImagePopup(props) {
    return (
      <section className={`popup popup_viewing-place-photo ${props.card._id && 'popup_display_flex'}`}>
        <div className="popup__container-photo">
          <figure className="popup__figure">
            <img className="popup__photo-image" src={props.card.link} alt={props.card.name} />
            <figcaption className="popup__photo-caption">{props.card.name}</figcaption>
            </figure>
          <button type="button" className="popup__close popup__close_place-photo" onClick={props.onClose}></button>
        </div>
      </section>
    );
}

export default ImagePopup;
