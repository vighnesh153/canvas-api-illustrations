class Node<T> {
    next: Node<T> | null;
    constructor(public data: T) {
        this.next = null;
    }
}

export class Queue<T> {
    head: Node<T> | null;
    tail: Node<T> | null;

    constructor() {
        this.head = this.tail = null;
    }

    enqueue(data: T): void {
        const node = new Node(data);

        if (this.isEmpty()) {
            this.head = this.tail = node;
            return;
        }

        (this.tail as Node<T>).next = node;
        this.tail = node;
    }

    dequeue(): T | null {
        if (this.isEmpty()) {
            return null;
        }

        const data = (this.head as Node<T>).data;

        if (this.tail === this.head) {
            this.head = this.tail = null;
        } else {
            this.head =  (this.head as Node<T>).next;
        }

        return data;
    }

    isEmpty() {
        return this.head === null;
    }
}
