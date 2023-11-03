import css from './Modal.module.css';
import { useEffect, useState } from 'react';

//            ******************** useState **********************

// useState - Виклик хука useState створює стан і метод, який змінюватиме його значення. У якості параметра хук приймає початковий стан, в нашому випадку число 1. У стані може зберігатися будь-який тип даних.

// Хук useState повертає масив із двох елементів: перший - поточне значення стану, другий - функцію для його зміни, яку можна використовувати де завгодно, наприклад, в обробнику подій. React буде зберігати цей стан між рендерами. Використовуючи деструктуризацію, можна задати будь-які імена змінних.

//           ******************** useEffect **********************

// useEffect - запускається кожний раз, коли компонент видалився і народився

// useEffect(callback, deps) приймає два аргументи:

// callback - функція, усередині якої виконується вся логіка ефекту. Наприклад, запити на сервер, завдання обробників подій на документ і т.п.
// (deps) залежності - масив змінних, при зміні будь-якого з яких, буде запускатися ефект і виконуватися callback. Це може бути стан, пропси або будь-яке локальне значення всередині компонента.

// Якщо не передати масив залежностей, ефект виконуватиметься на кожному рендері компонента. Саме завдяки масиву залежностей ми можемо імітувати методи життєвого циклу.

const Modal = ({ modalData, closeModal }) => {
  // state = {
  //   counter: 1,
  // };

  const [counter, setCounter] = useState(1);

  const handleIncrementProduct = () => {
    setCounter(prevState => prevState + 1);
  };

  useEffect(() => {
    console.log('***** useEffect *****');

    //  ************    Emulation componentDidMount(){} ************
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    //  ************  End Emulation componentDidMount(){} ************

    //  ************    Emulation componentWillUnmount(){} ************

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [closeModal]);
  //  ************   End Emulation componentWillUnmount(){} ************

  //  ************    Emulation componentDidUpdate(){} ************

  useEffect(() => {
    console.log('Product counter: ' + counter);
  }, [counter]);
  //  ************   End Emulation componentDidUpdate(){} ************

  const handleOverlayClick = evt => {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  };

  console.log('Test Dima');

  return (
    <div onClick={handleOverlayClick} className={css.modalContainer}>
      <div className={css.modalWindow}>
        <button onClick={closeModal} className={css.closeBtn}>
          &times;
        </button>
        <h2>Product Details</h2>
        <div>
          <h3>Title: {modalData.title}</h3>
          <p>Discount: {modalData.discount}$</p>
          <p>Price: {modalData.price}$</p>
        </div>
        <button onClick={handleIncrementProduct}>
          Add Product:
          {counter}
        </button>
      </div>
    </div>
  );
};

export default Modal;
