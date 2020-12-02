class TreeNode {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

// 封装一个二叉搜索树的类
export class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // 向树中间插入元素
    insert(key) {
        // 1 创建一个node节点
        const newNode = new TreeNode(key);

        // 2 如果原来的树是一颗空树
        if (this.root === null) {
            this.root = newNode;
        } else {
            // 用递归来实现循环遍历插入，每一个节点都是一个二叉树
            this.insertNode(this.root, newNode)
        }

    }
    // 参数1：向哪个节点插入，参数2：插入的新节点
    insertNode(node, newNode) {
        if (newNode.key > node.key) {
            if (node.right === null) {
                node.right = newNode; // 这个其实也想关于终止条件
            } else {
                this.insertNode(node.right, newNode)
            }
        } else {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        }
    }


    // 遍历二叉树  遍历的顺序是不变的，重点是访问的顺序
    // 1、先序遍历所有节点
    preOrderTraverse() {
        this.preOrderTraverseNode(this.root)
    }
    preOrderTraverseNode(node) {
        if (node === null) return;
        console.log(node.key);  // 访问当前节点
        this.preOrderTraverseNode(node.left); // 递归调用左节点  感觉这里的递归调用有点难懂，就是每个递归都包含了两个函数，只有当这两个函数都执行完了这个节点才算结束，一层一层的
        //相当于我想调用根节点的两个函数，首先现调用完根左节点的函数，依次类推
        this.preOrderTraverseNode(node.right); // 递归调用右节点
    }

    // 2 中序遍历所有节点  // 按照我们的顺序拿到我们的结果 访问的过程放在中间。

    inOrderTraverse() {
        this.inOrderTraverseNode(this.root)
    }
    inOrderTraverseNode(node) {
        if (node === null) return;
        this.inOrderTraverseNode(node.left);
        console.log(node.key);
        this.inOrderTraverseNode(node.right);
    }


    // 后序遍历所有节点  // 访问的过程放在后面
    postOrderTraverse() {
        this.postOrderTraverseNode(this.root)
    }
    postOrderTraverseNode(node) {
        if (node === null) return;
        this.postOrderTraverseNode(node.left);
        this.postOrderTraverseNode(node.right);
        console.log(node.key);
    }

    // 获取最大值
    getMax() {
        let node = this.root;
        while (node.right) {
            node = node.right;
        }
        return node.key;
    }
    // 获取最小值
    getMin() {
        let node = this.root;
        while (node.left) {
            node = node.left;
        }
        return node.key;
    }

    // 获取特定的值 （递归实现）
    search(key) {
        return this.searchNode(this.root, key);
    }
    searchNode(node, key) {
        // 1、判断node有没有值
        if (node === null) return false;

        // 2、判断搜索的key和节点值的关系
        if (key < node.key) {
            return this.searchNode(node.left, key)
        } else if (key > node.key) {
            return this.searchNode(node.right, key)
        } else {
            return true;
        }
    }

    // 2 非递归实现
    serach2(key) {
        while (node !== null) {
            if (key > node.key) {
                node = node.left
            } else if (key < node.key) {
                node = node.right
            } else {
                return true
            }
        }
        return false;
    }

    // 删除操作
    remove(key) {
        //1 找到要删除的节点
        let current = this.root;
        let parent = null;
        let isLeftChild = true;  // 记录要删除的节点是父节点的左节点还右节点

        // 2、开始查找要删除的节点
        while (current.key !== key) {
            parent = current;
            if (key < current.key) {
                isLeftChild = true;
                current = current.left
            } else {
                isLeftChild = false;
                current = current.right;
            }
            if (current === null) return false  // 已经找到最后一个但是还没有找到
        }

        // 2 判断情况进行删除 此时已经找到父节点
        //  2.1 删除的情况是叶子节点
        if (current.left === null && current.right === null) {
            if (current === this.root) {
                this.root = null;
            } else if (isLeftChild) {
                parent.left = null;
            } else if (!isLeftChild) {
                parent.right = null;
            }
        }

        // 2.2 删除的节点只有一个叶子节点
        else if (current.right === null) {  // 只有左子节点
            if (current === this.root) {
                this.root = current.left
            } else if (isLeftChild) {
                parent.left = current.left;
            } else {
                parent.right = current.left;
            }
        } else if (current.left === null) {  // 只有右子节点
            if (current === this.root) {
                this.root = current.right
            } else if (isLeftChild) {
                parent.left = current.right;
            } else {
                parent.right = current.right;
            }
        }

        // 2.3 删除的节点有两个叶子节点  （通过找后继的方法进行删除）
        else {
            // 1 、获取后继节点   
            let successor = this.getSuccessor(current);

            // 2、 是否为根节点
            if (this.root === current) {
                this.root = successor;
            } else if (isLeftChild) {
                parent.left = successor;
            } else {
                parent.right = successor;
            }
            successor.left = current.left
        }
        return true;

    }

    // 获取前驱或者后继节点  根据要删除的节点
    getSuccessor(delNode) {
        // 1、定义变量，来存储临时的节点
        let successorParent = delNode;
        let successor = delNode;
        let current = delNode.right;

        // 2 寻找节点
        while (current != null) {
            successorParent = successor;
            successor = current;
            current = successor.left;
        }


        // 如果后继节点不是删除节点的有节点
        if (successor !== delNode.right) {
            successorParent.left = successor.right;
            successor.right = delNode.right;
        }
        return successor;
    }

}