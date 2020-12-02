
// 哈希函数的一个实现做一个映射 比如要存储 一个人的姓名
// str:输入的名字， max：数组的最大长度
// function hashFunc(str, max) {
//     // 1 定义一个hashCode
//     let hashCode = 0;

//     // 2 霍纳法则获得取余的hashCode
//     for (let i = 0; i < str.length; i++) {
//         hashCode = 31 * hashCode + str.charCodeAt(i)
//     }
//     hashCode = hashCode % max;

//     return hashCode   // 返回数组对应的下标值
// }

// 封装hashmap类 在hashmap中的键是不能重复的

const MAX_LOAD_FACTOR = 0.75;
const MIN_LOAD_FACTOR = 0.25
class haspMap {
    constructor() {
        this.storage = []; // 存储数组元素
        this.count = 0;    // 记录元素的个数
        this.limit = 7      //记录元素的总个数
    }

    // 哈希函数 获取存放的下标值
    hashFunc(str, max) {
        // 1 定义一个hashCode
        let hashCode = 0;
        // 2 霍纳法则获得取余的hashCode
        for (let i = 0; i < str.length; i++) {
            hashCode = 31 * hashCode + str.charCodeAt(i)
        }
        hashCode = hashCode % max;

        return hashCode   // 返回数组对应的下标值
    }

    // 放入/修改元素（存放的不同键）
    put(key, value) {
        //  1 根据key映射到index
        const index = this.hashFunc(key, this.limit);

        // 取出数组  bucket存放在hash表数组中的桶（其本质也是一个数组）
        let bucket = this.storage[index];
        if (bucket === undefined) {
            bucket = [];
            this.storage[index] = bucket;
        }

        let flag = false; // 是否是插入还是修改
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i] = [key, value];
                flag = true;
                break;
            }
        }
        if (!flag) {
            bucket.push([key, value])
            this.count++
            if (this.count > this.limit * LOAD_FACTOR) {
                let newLimit = this.limit * 2;
                newLimit = this.getPrime(newLimit)
                this.resize(newLimit) // 这里最好是个质数
            }
        }
    }

    // 获取元素
    get(key) {
        // 1 根据key获取下标值
        const index = this.hashFunc(key, this.limit);

        // 那个该下标值对应的桶
        const bucket = this.storage[index];
        if (bucket === undefined) {
            return null;
        }

        // 遍历我们的桶
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1]
            }
        }

        // 要判断这种情况，应为可能存在不同的键有相同的下标值
        return null;
    }

    // 移除元素
    remove(key) {
        const index = this.hashFunc(key, this.limit);
        const bucket = this.storage[index];
        if (bucket === undefined) {
            return null;
        }
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.count--;
                if (this.limit > 8 && this.count < this.limit * MIN_LOAD_FACTOR) {
                    let newLimit = Math.floor(this.limit / 2);
                    newLimit = this.getPrime(newLimit);
                    this.resize(newLimit);
                }
                return bucket[i][1]
            }
        }
        return null;
    }
    // 判断是否为空
    isEmpty() {
        return this.count === 0;
    }

    // 返回个数
    size() {
        return this.count;
    }

    //扩容函数/还有可能缩小容量 这里最好使用质数
    resize(newLimit) {
        // 1 保存旧的数组中的内容
        let oldStorage = this.storage;

        // 2 重置元素
        this.limit = newLimit;
        this.storage = [];
        this.count = 0;

        // 将旧的元素插入到新的hasp中（再次hash化）
        oldStorage.forEach(bucket => {
            if (bucket === null) {
                return;  // 这里的return相当于for循环中的continue；
            }
            for (let i = 0; i < bucket.length; i++) {
                this.put(bucket[i][0], bucket[i][1]);
            }
        })
    }

    // 判断一个数是否为质数
    isPrime(num) {
        //     for (let i = 2; i < num; i++) {
        //         if (num % i === 0) {
        //             return false
        //         }
        //     }
        //     return true
        // }

        // 更高效的方法
        let temp = Math.ceil(Math.sqrt(num));
        for (let i = 0; i < temp; i++) {
            if (temp % i === 0) {
                return false
            }
        }
        return true
    }

    // 获取质数
    getPrime(num) {
        while (!this.isPrime(num)) {
            num++
        }
        return num
    }

}