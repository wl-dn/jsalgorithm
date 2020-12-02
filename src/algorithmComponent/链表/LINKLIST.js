export class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}
export class LinkList {
    constructor() {
        this.head = null;
        this.length = 0;
    }
    // 1、向末尾添加元素---尾插法
    append(element) {
        const node = new Node(element);
        if (this.length === 0) {
            this.head = node
        } else {
            let currentNode = this.head;
            while (currentNode.next) {
                currentNode = currentNode.next
            }
            currentNode.next = node;
        }
        this.length++
    }
    // 2、insert(position,element) 向列表的特定位置插入一个新的值
    insert(position, element) {
        if (position < 0 || position > this.length) return false
        let node = new Node(element);
        let currentNode = this.head;
        if (position === 0) {
            node.next = this.head;
            this.head = node;
        } else {
            for (let i = 0; i < this.length; i++) {
                if (i === position - 1) {
                    node.next = currentNode.next;
                    currentNode.next = node;
                    break
                } else {
                    currentNode = currentNode.next
                }
            }
        }
        this.length++
    }

    // get(position) :获取对应位置的元素
    get(position) {
        if (position < 0 || position > this.length - 1) return false
        if (!this.head) {
            return -1
        } else {
            let currentNode = this.head;
            let currentIndex = 0;
            while (currentIndex < position) {
                currentNode = currentNode.next;
                currentIndex++;
            }
            return currentNode.element;
        }
    }
    //indexOf(element) :返回元素在列表中的索引，如果列表中没有改数据返回-1
    indexOf(element) {
        let currentNode = this.head;
        let currentIndex = 0;
        while (currentNode) {
            if (currentNode.element === element) {
                return currentIndex
            }
            currentNode = currentNode.next;
            currentIndex++
        }
        return -1
    }
    //update(position,element):修改某个位置的元素
    update(position, element) {

        // 注：可以利用上述写好的来进行拓展
        // this.removeAt(position);
        // this.insert(position,element);
        if (position < 0 || position > this.length - 1) {
            return false
        }
        let currentNode = this.head;
        let currentIndex = 0;
        while (currentIndex < position) {
            currentNode = currentNode.next;
            currentIndex++
        }
        currentNode.element = element
        return true
    }
    // removeAt(position) 从列表的特定位置移除一项
    removeAt(position) {
        if (position < 0 || position > this.length - 1) return false
        let currentNode = this.head;
        let currentIndex = 0;
        let priviewNode = null;
        if (position === 0) {
            this.head = currentNode.next
        } else {
            while (currentIndex < position) {
                priviewNode = currentNode;
                currentNode = currentNode.next;
                currentIndex++
            }
            priviewNode.next = currentNode.next
        }
        this.length--;
        return true
    }
    //remove(element) 从列表中移除一项，若没有返回false
    remove(element) {
        //const index = this.indexOf(element);
        // if (index === -1) return;
        // this.removeAt(index)
        let currentNode = this.head;
        let priviewNode = null;
        let currentIndex = 0;
        while (currentNode) {
            if (currentNode.element === element) {
                if (currentIndex === 0) {
                    this.head = currentNode.next
                    this.length--
                    return true
                } else {
                    priviewNode.next = currentNode.next;
                    this.length--
                    return true
                }

            }
            priviewNode = currentNode;
            currentNode = currentNode.next
            currentIndex++
        }
        return false
    }
    // isEmpty 如果链表中不包含任何元素，返回true，如果链表长度大于0则放回false
    isEmpty() {
        return this.length === 0
    }
    size() {
        return this.length
    }
}
