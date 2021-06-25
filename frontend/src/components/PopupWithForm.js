function PopupWithForm(props) {
    return (
      <section className={`popup popup_type_${props.name} ${props.isOpen && 'popup_display_flex'}`}>
        <div className="popup__container">
          <h2 className="popup__title">{props.title}</h2>
          <form name={props.name} className={`popup__form popup__form_${props.name}`} onSubmit={props.onSubmit} noValidate>
            <fieldset className="popup__fieldset">
              {props.children}
            </fieldset>
            <button type="submit" className={`popup__submit popup__submit_type_${props.name}`}>{props.buttonTitle}</button>
          </form>
          <button type="button" className={`popup__close popup__close_type_${props.name}`} onClick={props.onClose}></button>
        </div>
      </section>
    );
}

export default PopupWithForm;
