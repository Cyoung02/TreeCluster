function merge_two_sorted_lists(x,y) { 
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

function merge_multi_sorted_lists(lists) {
  pq = new PriorityQueue();
  for (l = 0; l < lists.length; l++) {
    if (lists[l].length != 0) {
      pq.put(lists[l][0], l);
    }
  }
  inds = Array(lists.length).fill(1);
  out = [];
  while (!pq.empty()) {
    curr = pq.get();
    d = curr.priority;
    l = curr.value;
    out.push(d);
    if (inds[l] < lists[l].length) {
      pq.put(lists[l][inds[l]],l);
    }
    inds[l] = inds[l] + 1;
  }
  return out;
}

function median(x) {
  if (x.length % 2 != 0) {
    return x[parseInt(x.length / 2)];
  }
  else {
    return (x[x.length / 2] + x[(x.length / 2) - 1]) / 2;
  }
}

function avg(x) {
  return x.reduce((a,b) => a+b) / x.length;
}

function p_to_jc(d,seq_type) {
  if (seq_type === 'dna') {
    return -0.75 * Math.log(1 - (d / 0.75));
  } else if (seq_type === 'protein') {
    return -0.95 * Math.log(1 - (d / 0.95));
  }
}

//TODO understand treeswift and implement queue
function cut(node) {
  cluster = [];
}

function prep(tree, support){
  //TODO
}

function test(){
  x=[1,4,7]
  y=[2,5,8]
  z=[3,6,9]
  a=[x,y,z]
  console.log(merge_multi_sorted_lists(a));
}
