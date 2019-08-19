class Queue {
    constructor() {
        // Head remains empty
        this.head = this.tail = {};

        this.length = 0;
    }

    enqueue(data) {
        if(data === undefined) return console.log('No data');

        const newNode = { data };

        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;
    }

    dequeue() {
        if(this.isEmpty()) return;

        // Store prev tail
        const oldHead = this.head;
    
        // Replace head
        this.head = this.head.next;
        this.length--;
        
        return oldHead.data;
    }

    peek() {
        return this.head.data;
    }

    isEmpty() {
        return this.peek() === undefined;
    }
}

module.exports = Queue;