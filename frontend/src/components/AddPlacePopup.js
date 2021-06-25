import React from 'react';
import PopupWithForm from './PopupWithForm';
import {useEffect, useState} from 'react';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen])

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm name="add-place" title="Новое место" buttonTitle="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleNameChange}
        id="name-mesto-input"
        className="popup__input popup__input_type_place"
        placeholder="Название"
        required
        minLength="2"
        maxLength="20"
      />
      <span className="popup__input-error name-mesto-input-error"></span>
      <input
        type="url"
        name="link"
        value={link}
        onChange={handleLinkChange}
        id="link-mesto-input"
        className="popup__input popup__input_type_link"
        required
        placeholder="Ссылка на картинку"
      />
      <span className="popup__input-error link-mesto-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
