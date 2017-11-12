import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
        <div>
          <form id='upload-form' encType='multipart/form-data' method='post'>
            <input type='file' name='upload-file' id='upload-file'/>
            <input type='submit' name='submit-button' id='submit-button'
                   onClick={this.props.onUpload}/>
          </form>
        </div>
    );
  }
}

export default Home;
