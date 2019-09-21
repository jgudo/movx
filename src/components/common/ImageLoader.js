import React, { Component } from 'react';

const _loaded = {};

class ImageLoader extends Component {
  static defaultProps = {
    className: '',
    loadingClassName: 'img-loading',
    loadedClassName: 'img-loaded'
  };

  state = {
    loaded: _loaded[this.props.src]
  };

  onLoad = () => {
    _loaded[this.props.src] = true;
    this.setState(() => ({ loaded: true }));
  };

  render() {
    const { 
      className, 
      loadedClassName, 
      loadingClassName, 
      ...props 
    } = this.props;

    return (
      <img 
          className={`${className} ${this.state.loaded ? loadedClassName : loadingClassName}`} 
          data-key={this.props.imgId}
          onLoad={this.onLoad} 
          src={this.props.src} 
      />   
    );
  }
}

export default ImageLoader;
