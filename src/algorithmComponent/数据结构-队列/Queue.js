// 队列

// 1 数组实现
export class Queue {
    constructor() {
        this.items = []
    }
    // 向对列中插入数据
    enqueue(element) {
        this.items.push(element);
    }
    //取出队列最前面的元素
    dequeue() {
        this.items.shift();
    }
    // 返回队列最前面的元素，且队列长度保持不变
    front() {
        return this.items[0];
    }
    // 判断是否为空队列
    isEmpty() {
        return this.items.length === 0;
    }
    // 队列的长度
    size() {
        return this.items.length;
    }
    // 移除队列的所有元素
    clear() {
        this.items = []
    }
    //转为字符串
    toString() {
        return this.items.join('')
    }
}

import { LinkList } from "../链表/LINKLIST.js"
export class QueueByLink {
    constructor() {
        this.linkList =new LinkList()
    }
    // 向对列中插入数据
    enqueue(element) {
        this.linkList.append(element);
    }
    //取出队列最前面的元素
    dequeue() {
        const firItem = this.linkList.get(0);
        this.linkList.removeAt(0);
        return firItem;
    }
    // 返回队列最前面的元素，且队列长度保持不变
    front() {
        return this.linkList.get(0);
    }
    // 判断是否为空队列
    isEmpty() {
        return this.linkList.size() === 0;
    }
    // 队列的长度
    size() {
        return this.linkList.size();
    }
    // 移除队列的所有元素
    clear() {
        let length = this.linkList.size();
        while (length > 0) {
            this.linkList.removeAt(0);
            length = this.linkList.size()
        }
    }
    //转为字符串
    toString() {
        const length = this.linkLisk.size();
        let str = "";
        for (let i = 0; i < length; i++) {
            str = str + this.linkLisk.get(i);
        }
        return str
    }
}