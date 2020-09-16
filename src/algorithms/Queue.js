/*
 * queue implemented using a linked list.
 * only has the functionality necessary for this application
 */
class QNode {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

export class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  
  put(element) {
    const n = new QNode(element);
    if (this.size === 0) {
      this.head = n;
      this.tail = n;
    } else {
      this.tail.next = n;
      this.tail = this.tail.next;
    }
    this.size++;
  }

  get() {
    if (this.size === 0) {
      return null;
    } else if (this.size === 1) {
      this.tail = null;
    }
    const n = this.head.element;
    this.head = this.head.next;
    this.size--;
    return n; 
  }

  empty() {
    return this.size === 0;
  }
}

