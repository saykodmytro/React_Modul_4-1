import css from './Modal.module.css';
import React, { Component } from 'react';

export default class Modal extends Component {
  state = {
    counter: 1,
  };

  handleIncrementProduct = () => {
    this.setState(prevState => ({ counter: prevState.counter + 1 }));
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleOverlayClick = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.closeModal();
    }
  };

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div onClick={this.handleOverlayClick} className={css.modalContainer}>
        <div className={css.modalWindow}>
          <button onClick={this.props.closeModal} className={css.closeBtn}>
            &times;
          </button>
          <h2>Product Details</h2>
          <div>
            <h3>Title: {this.props.modalData.title}</h3>
            <p>Discount: {this.props.modalData.discount}$</p>
            <p>Price: {this.props.modalData.price}$</p>
          </div>
          <button onClick={this.handleIncrementProduct}>
            Add Product: {this.state.counter}
          </button>
        </div>
      </div>
    );
  }
}
