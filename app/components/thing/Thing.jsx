'use strict';

import React from 'react';
import Button from '../common/Button.jsx';
import Input from '../common/Input.jsx';
import ThingActions from './ThingActions';

export default React.createClass({
  displayName: 'Thing',
  propTypes: {
    _modify: React.PropTypes.func.isRequired,
    item: React.PropTypes.object.isRequired
  },
  componentDidUpdate: function () {
    componentHandler.upgradeDom();
  },
  getInitialState() {
    return {editing: false};
  },
  _delete(e) {
    e.preventDefault();
    ThingActions.del(this.props.item.id);
  },
  _enableEditMode() {
    this.setState({editing: true});
  },
  _modify(e) {
    e.preventDefault();
    this.props._modify(this.props.item.id, {name: this.state.name});
    this.setState({editing: false});
  },
  _setChangedText(event) {
    this.setState({name: event.target.value});
  },
  render() {
    if (this.state.editing) {
      return (
          <tr>
            <td>
              <form ref="updateForm" action="/API/thing?_method=PUT" method="post" onSubmit={this._modify}>
                <Input name="name" type="text" onChange={this._setChangedText} />
              </form>
            </td>
            <td>
              <a onClick={this._modify}>
                <Button text="Update" />
              </a>
            </td>
          </tr>
      );
    }
    return (
        <tr>
          <td ref="thingSpan" onContextMenu={this._enableEditMode}>
            {this.props.item.name}
          </td>
          <td>
            <a onClick={this._delete} href={'/API/thing/' + this.props.item.id + '?_method=DELETE'}>
              <Button text="Delete" />
            </a>
          </td>
        </tr>
    );
  }
});
