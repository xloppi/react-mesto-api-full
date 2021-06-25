import React from 'react';
import PopupWithForm from './PopupWithForm';
import {useRef, useEffect} from 'react';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm name="update-avatar" title="Обновить аватар" buttonTitle="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input
        type="url"
        name="link"
        id="link-avatar-input"
        className="popup__input popup__input_type_link"
        required
        placeholder="Ссылка на аватар"
        ref={inputRef}
        />
      <span className="popup__input-error link-avatar-input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
