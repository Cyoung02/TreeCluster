import React from 'react';

class Cluster extends React.Component {
  render() {
    return (
      <button onClick={this.props.performClustering}>
        Perform Clustering
      </button>
    );
  }
}

export default Cluster;
