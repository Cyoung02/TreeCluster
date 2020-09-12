import React from 'react';

class TreeSelect extends React.Component {
  render() {
    return (
      <form>
        <div>
          <label>Select a TreeFile:</label>
          <input type="file" onChange={this.props.handleFileSelect} />
        </div> 
      </form>
    );
  }
}

export default TreeSelect;
