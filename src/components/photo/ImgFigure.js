import React from 'react';

/**
 * 相框组件
 */
class ImgFigure extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {

    if (this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }


    e.stopPropagation();
    e.preventDefault();
  }

  render() {
    var styleObj = {};

    //if props assigns the position of pic, use it
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }
    //if props assigns the rotation degree of pic, use it
    if (this.props.arrange.rotate) {
      (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function(value) {
        styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
      }.bind(this));
    }

    if (this.props.arrange.isCenter) {
      styleObj.zIndex = 11;
    }

    var imgFigureClassName = 'img-figure';
    imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

    return (
      <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
        <img src={this.props.data.imageURL}
             alt={this.props.data.title}
        />
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handleClick}>
            <p>
              {this.props.data.desc}
            </p>
          </div>
        </figcaption>
      </figure>
    );
  }
}

export default ImgFigure;
