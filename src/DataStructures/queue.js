class Queue {
  constructor() {
    this.firstIndex = 1
    this.lastIndex  = 1
    this.queue      = {}
  }

  clear() {
    this.firstIndex = 1
    this.lastIndex  = 1
    this.queue      = {}
  }

  enqueue(data){
    this.queue[this.lastIndex] = data
    this.lastIndex++
  }

  dequeue(){
    let ret = null
    if(this.firstIndex !== this.lastIndex){
      ret = this.queue[this.firstIndex]
      delete this.queue[this.firstIndex]
      this.firstIndex++

    }
    return ret
  }

  size() {
    return this.lastIndex - this.firstIndex
  }
}