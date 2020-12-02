
import { QueueByLink } from './algorithmComponent/数据结构-队列/Queue.js'
const queue = new QueueByLink();

queue.enqueue("闻龙")
queue.enqueue("刘德昱")
queue.enqueue("王文轩")
queue.enqueue("郑鹏")
queue.clear()
console.log(queue);