import React, { Component } from 'react';

class BaseApp extends Component {
  onUpload = (e) => {
    const form = new FormData(document.forms.namedItem('upload-form'));
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/upload/upload', true);
    xhr.send(form);
    e.preventDefault();
  };

  render() {
    return (
        <div>
          <form id='upload-form' encType='multipart/form-data' method='post'>
            <input type='file' name='upload-file' id='upload-file'/>
            <input type='submit' name='submit-button' id='submit-button'
                   onClick={this.onUpload}/>
          </form>
        </div>
    );
  }
}

export default BaseApp;
