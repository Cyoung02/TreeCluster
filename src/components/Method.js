import React from 'react';

class Method extends React.Component {
  render() {
    return (
      <form>
        <div>
          <label>Clustering Method:</label>
          <select onChange={this.props.handleMethodChange}>
            <option>Maximum Clade</option>
            <option>Average Clade</option>
            <option>Median Clade</option>
            <option>Length</option>
            <option>Length Clade</option>
            <option>Max</option>
            <option>Root Distance</option>
            <option>Single Linkage Clade</option>
          </select>
        </div> 
      </form>
    );
  }
}

export default Method;
