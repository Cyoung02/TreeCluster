import React from 'react';

class Threshold extends React.Component {
  render() {
    return (
      <form>
        <div>
          <label>Threshold:</label>
          <input 
            id='slider'
            type='range' 
            min='0' 
            max='1' 
            defaultValue='0.5' 
            step='0.01' 
            onChange={this.props.handleThresholdChangeSlider} 
          />
          <input type='number'
            id='box'
            min='0'
            max='1'
            defaultValue='0.5'
            step='0.01'
            onChange={this.props.handleThresholdChangeBox}
          />
        </div> 
      </form>
    );
  }
}

export default Threshold;
