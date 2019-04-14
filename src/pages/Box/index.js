import React, { Component } from 'react';
import { MdInsertDriveFile } from 'react-icons/md';
import { distanceInWords } from 'date-fns';
import Dropzone from 'react-dropzone';
import pt from 'date-fns/locale/pt';
import socket from 'socket.io-client';
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import './styles.css';

class Box extends Component {
  state = { 
    box: {}
  }

  async componentDidMount() {
    this.subscribeToNewFiles();

    const boxId = this.props.match.params.id;
    const response = await api.get(`boxes/${boxId}`);
    this.setState({ box: response.data });
  }

  handleUpload = (files) => {
    const boxId = this.state.box._id;
    files.forEach(file => {
      const data = new FormData();

      data.append('file', file);

      api.post(`boxes/${boxId}/files`, data);
    });
  }

  subscribeToNewFiles = () => {
    const boxId = this.props.match.params.id;
    const io = socket('https://dropbox-clone-api-node.herokuapp.com');

    io.emit('connectRoom', boxId);

    io.on('file', data => {
      const { box } = this.state
      let { files } = box;
      files = [data, ...files];
      box.files = files;
      this.setState({ box });
    });
  }

  render() {
    return (
      <div id='box-container'>
        <header>
          <img src={logo} alt='logo' />
          <h1>{this.state.box.title}</h1>
        </header>
        <Dropzone
          onDropAccepted={this.handleUpload}
        >
          {({ getRootProps, getInputProps}) => (
            <div className='upload' {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Arraste arquivos ou clique aqui</p>
            </div>
          )}
        </Dropzone>
        <ul>
          {
            this.state.box.files && this.state.box.files.map(file => (
              <li key={file._id}>
                <a className='fileInfo' href={file.url}>
                  <MdInsertDriveFile size={24} color='#a5cfff' />
                  <strong>{file.title}</strong>
                </a>

                <span>há {' '} {distanceInWords(file.createdAt, new Date(), { locale: pt })}</span>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Box;