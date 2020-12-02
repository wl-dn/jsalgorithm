// 实现栈结构的封装

// 1 数组实现
export class Stack {
    constructor() {
        this.items = []
    }
    // 向栈中存入数据
    push(element) {
        this.items.push(element);
    }
    //取出栈顶元素(修改原数组)
    pop() {
        return this.items.pop();
    }
    // 返回栈顶元素，原数组未做修改
    peek() {
        return this.items[this.items.length - 1];
    }
    // 判断栈是否为空栈
    isEmpty() {
        return this.items.length === 0;
    }
    //移除栈中所有元素
    clear() {
        this.items = [];
    }
    // 栈的长度
    size() {
        return this.items.length;
    }

    // 返回字符串格式
    toString() {
        return this.items.join('');
    }
}


//2 链表实现
import { LinkList } from "../链表/LINKLIST.js"
export class StackByLink {
    constructor() {
        this.linkLisk = new LinkList();
    }
    push(element) {
        this.linkLisk.append(element);
    }
    pop() {
        const length = this.linkLisk.size();
        const item = this.linkLisk.get(length - 1);
        this.linkLisk.removeAt(length - 1);
        return item;
    }
    peek() {
        return this.linkLisk.get(this.linkLisk.size() - 1);
    }
    isEmpty() {
        return this.linkLisk.size() === 0;
    }
    clear() {
        let length = this.linkLisk.size();
        while(length > 0) {
            this.linkLisk.removeAt(0);
            length = this.linkLisk.size()
        }
    }
    toString() {
        const length = this.linkLisk.size();
        let str = "";
        for (let i = 0; i < length; i++) {
            str = str + this.linkLisk.get(i);
        }
        return str
    }
}