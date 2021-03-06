import {Queue} from './Queue';
import {PriorityQueue} from './PriorityQueue';
import {Tree, TreeNode} from './TreeSwift';

export function merge_two_sorted_lists(x,y) { 
  const out = [];
  let i = 0;
  let j = 0;
  while (i < x.length && j < y.length) {
    if (x[i] < y[j]) {
      out.push(x[i]);
      i++;
    } else {
      out.push(y[j]);
      j++;
    }
  }
  while (i < x.length) {
    out.push(x[i]);
    i++;
  }
  while (j < y.length) {
    out.push(y[j]);
    j++;
  }
  return out;
}

export function merge_multi_sorted_lists(lists) {
  const pq = new PriorityQueue();
  for (let l = 0; l < lists.length; l++) {
    if (lists[l].length !== 0) {
      pq.put(lists[l][0], l);
    }
  }
  const inds = Array(lists.length).fill(1);
  const out = [];
  while (!pq.empty()) {
    let curr = pq.get();
    let d = curr.priority;
    let l = curr.value;
    out.push(d);
    if (inds[l] < lists[l].length) {
      pq.put(lists[l][inds[l]],l);
    }
    inds[l] = inds[l] + 1;
  }
  return out;
}

export function median(x) {
  if (x.length % 2 !== 0) {
    return x[parseInt(x.length / 2)];
  } else {
    return (x[x.length / 2] + x[(x.length / 2) - 1]) / 2;
  }
}

export function avg(x) {
  return x.reduce((a,b) => a+b) / x.length;
}

export function p_to_jc(d,seq_type) {
  if (seq_type === 'dna') {
    return -0.75 * Math.log(1 - (d / 0.75));
  } else if (seq_type === 'protein') {
    return -0.95 * Math.log(1 - (d / 0.95));
  }
}

export function cut(node) {
  const cluster = [];
  const descendants = new Queue();
  descendants.put(node);
  while (!descendants.empty()) {
    const descendant = descendants.get();
    if (descendant.DELETED) {
      continue;
    }
    descendant.DELETED = true;
    descendant.left_dist = 0;
    descendant.right_dist = 0;
    descendant.edge_length = 0;
    if (descendant.is_leaf()) {
      cluster.push(descendant.to_string());
    }
    else {
      descendant.children.forEach(element => descendants.put(element));
    }
  }
  return cluster;
}

export function prep(tree, support) {
  tree.resolve_polytomies();
  tree.suppress_unifurcations();
  const leaves = new Set();
  tree.traverse_postorder().forEach(function(node) {
    if (node.edge_length === null) {
      node.edge_length = 0;
    }
    node.DELETED = false;
    if (node.is_leaf()) {
      leaves.add(node.to_string());
    }
    else {
      if (node.to_string() === '') {
        node.confidence = 100;
      }
      else {
        node.confidence = Number(node.to_string());
      }
      if (node.confidence < support) {
        node.edge_length = Infinity;
      }
    }
  });
  return leaves;
}

export function pairwise_dists_below_thresh(tree,threshold) {
  //TODO
}

export function min_clusters_threshold_max(tree, threshold, support) {
  tree = Tree.read_tree_newick(tree);
  const leaves = prep(tree,support);
  const clusters = [];
  tree.traverse_postorder().forEach(function(node) {
    if (node.DELETED) {
      return;
    }
    if (node.is_leaf()) {
      node.left_dist = 0;
      node.right_dist = 0;
    }
    else {
      if (node.children[0].DELETED && node.children[1].DELETED) {
        cut(node);
        return;
      }
      if (node.children[0].DELETED) {
        node.left_dist = 0;
      }
      else {
        node.left_dist = Math.max(node.children[0].left_dist, node.children[0].right_dist) + node.children[0].edge_length;
      }
      if (node.children[1].DELETED) {
        node.right_dist = 0;
      }
      else {
        node.right_dist = Math.max(node.children[1].left_dist, node.children[1].right_dist) + node.children[1].edge_length;
      }

      if (node.left_dist + node.right_dist > threshold) {
        let cluster = [];
        if (node.left_dist > node.right_dist) {
          cluster = cut(node.children[0]);
          node.left_dist = 0;
        }
        else {
          cluster = cut(node.children[1]);
          node.right_dist = 0;
        }

        if (cluster.length !== 0) {
          clusters.push(cluster);
          cluster.forEach(function(leaf) {
            leaves.delete(leaf);
          });
        }
      }
    }
  });
  if (leaves.length !== 0) {
    clusters.push(Array.from(leaves));
  }
  return clusters;
}

export const test = (hi) => {
  const BRACKETS = {
    '[': ']',
    '{': '}',
    "'": "'",
    '"': '"', 
  }
  console.log(BRACKETS['[']);
}

export function run(tree, threshold, method) { 
  if (method === "Max") {
    console.log(min_clusters_threshold_max(tree, threshold, -Infinity));
  }
}
