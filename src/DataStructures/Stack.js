class Stack {
    constructor() {
        this.size = 0;
        this.stack = [];
    }

    push(data) {
        this.size++;
        this.stack[this.size] = data;
    }

    pop() {
        let removedObject = null;
        if (this.size > 0) {
            removedObject = this.stack[this.size];
            delete this.stack[this.size];
            this.size--;
        }
        return removedObject;
    }
}
