//const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  _root = null;

  root() {
    return this._root;
  }

  add(data) {
    const newNode = this.createNode(data);
    (!this._root) ? this._root = newNode : this.insertRecursive(newNode, this._root);
  }

  createNode(data){
    return new Node(data);
  }

  insertRecursive(newNode, node){
    newNode.data < node.data
      ? (node.left)
          ? this.insertRecursive(newNode, node.left)
          : node.left = newNode
      : (node.right)
          ? this.insertRecursive(newNode, node.right)
          : node.right = newNode
  }

  has(data) {
    const node = this.find(data);
    return node === null ? false : true;
  }

  find(data) {
    let tempNode = this._root;
    while(tempNode && tempNode.data != data){
      tempNode = tempNode.data > data ? tempNode.left : tempNode.right;
    }
    return tempNode;
  }

  remove(data) {
    if(!this._root)
      return;
    this._root = this.deleteNodeRecursive(this._root, data);
  }

  deleteNodeRecursive(node, data){
    if(node === null)
      return null;

    if(node.data === data)
    {
      return (node.right && node.left)
        ? this.deleteNodeWithTwoChildren(node)
        : this.isLeaf(node)
          ? null
          : (node.left || node.right);
    }

    return data < node.data
             ? this.deleteByRLeft(node, data)
              : this.deleteByRight(node, data);
  }

  deleteByRight(node, data){
    node.right = this.deleteNodeRecursive(node.right, data);
    return node;
  }

  deleteByRLeft(node, data){
    node.left = this.deleteNodeRecursive(node.left, data);
    return node;
  }

  deleteNodeWithTwoChildren(node){
    const minRightNode = this.findMinRecursive(node.right);
    node.data = minRightNode.data;
    node.right = this.deleteNodeRecursive(node.right, minRightNode.data);
    return node;
  }

  isLeaf(node){
    return node.left && node.right;
  }

  min() {
    return this.findMinRecursive(this._root).data;
  }

  findMinRecursive(node){
    return node.left === null ? node : this.findMinRecursive(node.left);
  }

  max() {
    return this.findMaxRecursive(this._root).data;
  }

  findMaxRecursive(node){
    return node.right === null ? node: this.findMaxRecursive(node.right);
  }
}

module.exports = {
  BinarySearchTree
};