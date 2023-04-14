const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {

  _top = null;

  getUnderlyingList() {
    return this._top;
  }

  enqueue(value) {
    const newNode = this.createListNode(value);
    if(this._top === null){
      this._top = newNode;
    }
    else{
      this._insertToEnd(newNode);
    }
  }

  _insertToEnd(node){
    let tempNode = this._top;
    while(tempNode.next !== null){
      tempNode = tempNode.next;
    }
    tempNode.next = node;
  }

  createListNode(value){
      return new ListNode(value);
  }

  dequeue() {
    const oldTop = this._top;
    this._top = oldTop.next;
    return oldTop.value;
  }
}

module.exports = {
  Queue
};