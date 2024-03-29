/* eslint-disable */

import React from "react";
import PropTypes from "prop-types";

export default class DressMessage extends React.Component {
  constructor(props) {
    super(props);
    let customization = null;

    if (this.props.dress.customizations) {
      customization = this.props.dress.customizations.presentation;
    }

    this.state = {
      customization: customization,
    };

    this.renderCustomizations = this.renderCustomizations.bind(this);
  }

  renderCustomizations() {
    if (this.state.customization && this.state.customization != "") {
      return (
        <div>
          <div className="row">
            <div className={"col-xs-4"}>Customizations:</div>
          </div>
          <div className="row">
            <div className="col-xs-12">{this.state.customization}</div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }

  generateBackgroundValueFromColor({ image, patternUrl, hexValue }) {
    if (patternUrl) {
      return `url(${patternUrl})`;
    }

    if (image) {
      return `url(${image})`;
    }

    return hexValue;
  }

  generateColorSelectionNode({ hexValue, image, patternUrl }) {
    const background = this.generateBackgroundValueFromColor({
      hexValue: hexValue,
      image,
      patternUrl,
    });

    return (
      <span style={{ background }} className="dress-message-color-selection" />
    );
  }

  render() {
    const sameOwner = this.props.sameOwnerAsLastMessage;
    let name = "";
    if (!sameOwner) {
      name = (
        <div className="row equal">
          <div className="message-name col-xs-push-2 col-xs-10">
            {this.props.name}
          </div>
        </div>
      );
    }

    return (
      <li className="dress-message">
        {name}
        <div className="row equal">
          <div
            className={
              "avatar col-xs-2 " +
              (this.props.sameOwnerAsLastMessage
                ? ""
                : "avatar-" + this.props.iconNumber)
            }
          />
          <div className="dress-card col-xs-5">
            <div className="dress-card-content">
              <div className="row">
                <div className="dress-card-image col-xs-12">
                  <img
                    alt={this.props.dress.name}
                    src={this.props.dress.image}
                  />
                </div>
              </div>
              <div className="row dress-card-headline">
                <div className="col-xs-8">{this.props.dress.name}</div>
                <div className="dress-price col-xs-4">
                  ${parseInt(this.props.dress.price)}
                </div>
              </div>
              {/* <div className="row">
                      <div className="col-xs-6">
                        Color&nbsp;{this.props.dress.color.presentation}&nbsp;
                        {this.generateColorSelectionNode(this.props.dress.color)}
                      </div>
                    </div>
                    { this.renderCustomizations() } */}
              <div className="row add-to-spree-btn">
                <div className="col-xs-12">
                  <a
                    onClick={() =>
                      this.props.showAddToCartModal(this.props.dress)}
                    className="center-block btn btn-shopping-spree-blue btn-tiny"
                  >
                    Add to my cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

DressMessage.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  sameOwnerAsLastMessage: PropTypes.bool.isRequired,
  iconNumber: PropTypes.number.isRequired,
  dress: PropTypes.object.isRequired,
  showAddToCartModal: PropTypes.func.isRequired,
};
