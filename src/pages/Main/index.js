import React, { Component } from 'react'
import logo from '../../assets/logo.svg';
import './styles.css';

class Main extends Component {
  render() {
    return (
      <div id='main-container'>
        <form>
          <img src={logo} alt='logo' />
          <input
            placeholder='Criar um box'
          />
          <button type='submit'>Criar</button>
        </form>
      </div>
    )
  }
}

export default Main;