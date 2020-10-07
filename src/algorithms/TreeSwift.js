import {Queue} from './Queue.js';

export class TreeNode {
  constructor(label = null, edge_length = null) {
    this.children = [];
    this.parent = null;
    this.label = label;
    this.edge_length = edge_length;
    this.DELETED = false;
    this.confidence = null;
    this.left_dist = null;
    this.right_dist = null;
    this.edge_params = null
  }

  to_string() {
    if (this.label === null) {
      return '';
    }
    else {
      return this.label
    }
  }

  add_child(child) {
    if (!(child instanceof TreeNode)) {
      throw new TypeError("child must be a node");
    }
    this.children.push(child);
    child.parent=this;
  }

  is_root() {
    return (this.parent === null);
  }

  is_leaf() {
    return (this.children.length === 0);
  }

  remove_child(child) {
    if (!(child instanceof TreeNode)) {
      throw new TypeError("child must be a node");
    }
    try {
      this.children.pop(this.children.indexOf(child));
      child.parent = null;
    }
    catch(e) {
      throw new Error("Attempting to remove non-existent child");
    }
  }
}

export class Tree {
  constructor(is_rooted = true) {
    if (!(typeof(is_rooted) === "boolean")) {
      throw new TypeError("is_rooted must be bool");
    }
    this.root = new TreeNode();
    this.is_rooted = is_rooted;
  }

  resolve_polytomies() {
    const q = new Queue();
    q.put(this.root); 
    while (!q.empty()) {
      let node = q.get();
      while (node.children.length > 2) {
        let c1 = node.children.pop();
        let c2 = node.children.pop();
        let nn = new TreeNode(null, 0);
        node.add_child(nn);
        nn.add_child(c1);
        nn.add_child(c2);
      }
      node.children.forEach(element => q.put(element));
    }
  }

  suppress_unifurcations() {
    const q = new Queue();
    q.put(this.root);
    while (!q.empty()) {
      let node = q.get();
      if (node.children.length !== 1) {
        node.children.forEach(element => q.put(element));
        continue;
      }
      let child = node.children.pop();
      if (node.is_root()) {
        this.root = child;
        child.parent = null;
      }
      else {
        let parent = node.parent;
        parent.remove_child(node);
        parent.add_child(child);
      }
      if (!(node.edge_length === null)) {
        if (child.edge_length === null) {
          child.edge_length = 0;
        }
        child.edge_length += node.edge_length;
      }
      if ((child.label === null) && (node.label !== null)) {
        child.label = node.label;
      }
      q.put(child);
    }
  }

  traverse_postorder(leaves = true, internal = true) {
    const res = [];
    const s1 = [];
    const s2 = [];
    s1.push(this.root);
    while (s1.length !== 0) {
      let n = s1.pop();
      s2.push(n);
      n.children.forEach(element => s1.push(element));
    }
    while (s2.length !== 0) {
      let n = s2.pop()
      if ((leaves && n.is_leaf()) || (internal && !n.is_leaf())){
        res.push(n);
      }
    }
    return res;
  }

  traverse_preorder(leaves = true, internal = true) {
    const res = [];
    const s = [];
    s.push(this.root);
    while (!(s.length === 0)) {
      let n = s.pop();
      if ((leaves && n.is_leaf()) || (internal && !n.is_leaf())){
        res.push(n);
      }
      n.children.forEach(element => s.push(element));
    }
    return res;
  }

  static read_tree_newick(newick) {
    const BRACKET = {
      '[': ']',
      '{': '}',
      "'": "'",
      '"': '"', 
    }

    if (typeof newick != "string") {
      throw new TypeError("Tree not a string!");
    }
    
    let ts = newick.trim();
    const t = new Tree();
    //try {
      t.is_rooted = newick.startsWith('[&R]');
      if (ts[0] === '[') {
        let temp = ts.split(']')
        ts = temp.splice(1, temp.length).join(']').trim();
        ts = ts.replace(', ',',');
      }
      let n = t.root; 
      let i = 0;
      while (i < ts.length) {
        if (ts[i] === ';') {
          if (i != ts.length - 1 || n != t.root) {
            throw new Error("Tree not valid Newick Tree");
          }
        }
        else if (ts[i] === '(') {
          let c = new TreeNode();
          n.add_child(c);
          n = c;
        }
        else if (ts[i] === ')') {
          n = n.parent;
        }
        else if (ts[i] === ',') {
          n = n.parent;
          let c = new TreeNode();
          n.add_child(c);
          n = c;
        }
        else if (ts[i] === ':') {
          i++;
          let ls = '';
          while (ts[i] !== 'c' && ts[i] !== ')' && ts[i] != ';') {
            ls += ts[i];
            i++;
          }
          if (ls[0] === '[') {
            let temp = ls.split(']');
            n.edge_params = temp.splice(0, temp.length - 1).join(']');
            ls = temp[temp.length - 1];
          }
          n.edge_length = parseFloat(ls);
          i--;
        }
        else {
          let label = '';
          let bracket = null;
          while (bracket != null || ts[i] in BRACKET || (ts[i] !== ':' && ts[i] !== ',' && ts[i] !== ';' && ts[i] !== ')')) {
            if (ts[i] in BRACKET && bracket === null) {
              bracket = ts[i];
            }
            else if (bracket !== null && ts[i] === BRACKET[bracket]) {
              bracket = null;
            }
            label += ts[i];
            i++;
          }
          i--;
          n.label = label;
        }
        i++;
      }
    //}
    //catch(e) {
    //  throw new Error("Failed to parse string as Newick");
    //}
    return t;
  }
}
