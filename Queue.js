class Queue {
    constructor() {
        // Head remains empty
        this.head = undefined;
        this.tail = undefined;

        this.length = 0;
    }

    enqueue(data) {
        if(data === undefined) return console.log('No data');

        // Create node
        const newNode = { data };
        
        // New tail
        const oldTail = this.tail;
        this.tail = newNode;

        if(this.isEmpty()) this.head = this.tail;
        else oldTail.next = newNode;
                
        this.length++;
    }

    dequeue() {
        if(this.isEmpty()) return;

        // Store prev tail
        const oldHead = this.head;
    
        // Replace head
        this.head = this.head.next;
        this.length--;

        // Remove tail
        if(this.isEmpty()) this.head = this.tail = undefined;
        
        return oldHead.data;
    }

    peek() {
        return this.head.data;
    }

    isEmpty() {
        return this.head === undefined;
    }
}

module.exports = Queue;