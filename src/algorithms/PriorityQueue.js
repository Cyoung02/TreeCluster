/*
 * Priority queue implementation based on min heap
 * Essentially taken from https://tinyurl.com/y3phou6v
 */
class Node {
  constructor(priority, value) {
    this.value = value;
    this.priority = priority;
  }
}

export class PriorityQueue {
  constructor() {
    this.heap = [null]
  }
  
  put(priority, value) {
    const newNode = new Node(priority, value);
    this.heap.push(newNode);
    let currentNodeIdx = this.heap.length - 1;
    let currentNodeParentIdx = Math.floor(currentNodeIdx / 2);
    while (
      this.heap[currentNodeParentIdx] &&
      newNode.priority < this.heap[currentNodeParentIdx].priority
    ) {
      const parent = this.heap[currentNodeParentIdx];
      this.heap[currentNodeParentIdx] = newNode;
      this.heap[currentNodeIdx] = parent;
      currentNodeIdx = currentNodeParentIdx;
      currentNodeParentIdx = Math.floor(currentNodeIdx / 2);
    }
  }

  get() {
    if (this.heap.length < 3) {
      const toReturn = this.heap.pop();
      this.heap[0] = null;
      return toReturn;
    }
    const toRemove = this.heap[1];
    this.heap[1] = this.heap.pop();
    let currentIdx = 1;
    let [left, right] = [2*currentIdx, 2*currentIdx + 1];
    let currentChildIdx = this.heap[right] && this.heap[right].priority <= this.heap[left].priority ? right : left;
    while (this.heap[currentChildIdx] && this.heap[currentIdx].priority >= this.heap[currentChildIdx].priority) {
      let currentNode = this.heap[currentIdx]
      let currentChildNode = this.heap[currentChildIdx];
      this.heap[currentChildIdx] = currentNode;
      this.heap[currentIdx] = currentChildNode;
    }
    return toRemove;
  }

  empty() {
    return this.heap.length === 1;
  }
}
