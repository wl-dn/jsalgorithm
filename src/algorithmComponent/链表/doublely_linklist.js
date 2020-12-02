
import { LinkList, Node } from './LINKLIST.js'

// 通过继承的方式，提高代码的复用率。super关键字相当于父类的构造函数在子类走一遍
class doubleNode extends Node {
    constructor(element) {
        super(element);
        this.prev = null;
    }
}

export class doubleLinkList extends LinkList {
    constructor() {
        super();
        this.tail = null
    }

    // append 方法，向双向链表添加一个新的项
    append(element) {
        const node = new doubleNode(element);
        if (this.length === 0) {
            this.head = node;
            this.tail = node;

        } else {
            // let currentNode = this.head;
            // while (currentNode.next) {
            //     currentNode = currentNode.next
            // }
            // currentNode.next = node;
            // node.prev = currentNode;
            // this.tail = node;

            // 可以通过tail来简化操作
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.length++
    }
    // 插入方法
    insert(position, element) {
        if (position < 0 || position > this.length) return false;
        const node = new doubleNode(element);
        // 判断多种插入的情况
        if (position === 0) {
            if (this.head === null) {
                this.head = node;
                this.tail = node;
            } else {
                node.next = this.head;
                this.head.prev = node;
                this.head = node;
            }
        } else if (position === this.length) {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        } else {
            let currentNode = this.head;
            let currentIndex = 0;
            while (currentIndex < position) {
                currentNode = currentNode.next;
                currentIndex++;
            }
            currentNode.prev.next = node;
            node.prev = currentNode.prev
            node.next = currentNode;
            currentNode.prev = node;
        }
        this.length++
    }
    //get(position) 不需要重新父类的方法，直接使用父类的方法


    // indexOf(element) // 返会该元素所在的索引，如果没有改元素，则返回-1 直接使用父类的方法

    //removeAt(position)//移除某个位置元素，要重写
    removeAt(position) {
        // debugger 浏览器会直接跳到断点的地方
        if (position < 0 || position > this.length - 1) return false
        if (position === 0) {
            if (this.length === 1) {
                this.head = null;
                this.tail = null;
            } else {
                this.head = this.head.next;
                this.head.prev = null;
            }
        } else if (position === this.length - 1) {
            this.tail = this.tail.prev;
            this.tail.next = null;
            // this.tail.prev.next = null;
            // this.tail = this.tail.prev
        } else {
            let currentIndex = 0;
            let currentNode = null;
            let previous = null;
            while (currentIndex < position) {
                previous = currentNode
                currentNode = currentNode.next;
                currentIndex++;
            }
            previous.next = currentNode.next;
            currentNode.next.prev = previous;
        }
        this.length--
        return true
    }


    //update(position,element)  不需重写
    update(position,element) {
        const result = this.removeAt(position); //这里的this会直接调用本类的方法
        this.insert(position,element);
        return result;
    }

    // remove() // 不需要重写
    remove(element) {
        const index = this.indexOf(element);
        if(index === -1) return;
        this.removeAt(index);
        return index
    }
    //isEmpty()// 不需重写
    //size() // 不需重写

} 