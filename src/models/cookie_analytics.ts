/*
  @class: CookieAnalytics
  
  preceding attribute with # makes it private
  
  @attributes:
    readonly epoch           - property which can only be set during creation of object
    private frequencyMap     - hashmap of cookie and its frequency
    private maxFrequencyList - an array of cookies which are the most frequent
    private maxfrequency     - max frequency till now
*/
export class CookieAnalytics {
  readonly epoch: number;
  #frequencyMap: any;
  #maxFrequencyList: Array<String>;
  #maxFrequency: number;

  constructor(epoch: number) {
    this.epoch = epoch;
    this.#frequencyMap = {};
    this.#maxFrequencyList = [];
    this.#maxFrequency = 0;
  }

  getMaxFrequency(): number {
    return this.#maxFrequency;
  }
  getFrequencyMap(): any {
    return this.#frequencyMap;
  }

  getMaxFrequencyList(): Array<String> {
    return this.#maxFrequencyList;
  }

  /**
   * Adds cookie
   * @param cookie
   *
   * Check the cookie frequency and add it to the maxfrequency if it matches
   * If it exceeds replace max frequency list with this cookie
   */
  addCookie(cookie: string): void {
    let newFrequency: number;
    let currentFrequency: number = this.#frequencyMap[cookie] || 0;

    newFrequency = currentFrequency + 1;
    if (newFrequency > this.#maxFrequency) {
      this.#maxFrequencyList = [cookie];
      this.#maxFrequency = newFrequency;
    } else if (newFrequency === this.#maxFrequency) {
      this.#maxFrequencyList.push(cookie);
    }

    this.#frequencyMap[cookie] = newFrequency;
  }

  /**
   * getTopCookiesByFrequency
   * @returns list of max frequency and top cookies list
   */
  getTopCookiesByFrequency(): any[] {
    return [this.#maxFrequency, this.#maxFrequencyList];
  }
}

/*
  
  Experimental 

  Fetch Top K frequent Cookies using Heap Tree 
  Logic -> Maintain K length Min Heap with nodes containing Frequency and cookieSet

  Each Addition and removal 

  */

// export class TopKFrequentCookies {
//   readonly date: string;
//   cookieFrequencyMap: any;
//   cookieTopFrequentHeap: MinHeap;
//   cookieTopFrequentMap: any;
//   maxUniqueFrequencyToBeCounted: number;

//   constructor(date: string, maxUniqueFrequencyToBeCounted: number) {
//     this.date = date;
//     this.cookieFrequencyMap = {};
//     this.cookieTopFrequentHeap = new MinHeap();
//     this.cookieTopFrequentMap = {};
//     this.maxUniqueFrequencyToBeCounted = maxUniqueFrequencyToBeCounted;
//   }

//   addCookie(cookie: string) {
//     let newFrequency: number;
//     let currentFrequency: number = this.cookieFrequencyMap[cookie] || 0;
//     newFrequency = currentFrequency + 1;
//     if (this.cookieTopFrequentHeap.getLength() > 1) {
//       let minimumFrequentNodeInHeap = this.cookieTopFrequentHeap.getMin();
//       this.cookieFrequencyMap[cookie] = newFrequency;

//       if (currentFrequency >= minimumFrequentNodeInHeap.frequency) {
//         let currentFrequencyNode: HeapNode | null | undefined =
//           this.cookieTopFrequentMap[currentFrequency];
//         if (currentFrequencyNode) {
//           currentFrequencyNode.removeCookieFromNode(cookie);
//           if (currentFrequencyNode.cookieList.size == 0) {
//           }
//         } else {
//           // not possible
//         }
//       }

//       if (newFrequency >= minimumFrequentNodeInHeap.frequency) {
//         let newFrequencyNodeinHeap: HeapNode | null | undefined =
//           this.cookieTopFrequentMap[newFrequency];
//         if (newFrequencyNodeinHeap) {
//           newFrequencyNodeinHeap.cookieList.add(cookie);
//         } else {
//           if (
//             this.cookieTopFrequentHeap.getLength() ===
//             this.maxUniqueFrequencyToBeCounted
//           ) {
//             let minNode: HeapNode = this.cookieTopFrequentHeap.remove();
//             delete this.cookieTopFrequentMap[minNode.frequency];
//           }
//           let newNode = new HeapNode(newFrequency);
//           newNode.addCookieToNode(cookie);
//           this.cookieTopFrequentHeap.insert(newNode);
//         }
//       }
//     } else {
//       let newNode = new HeapNode(newFrequency);
//       newNode.addCookieToNode(cookie);
//       this.cookieTopFrequentHeap.insert(newNode);
//       this.cookieFrequencyMap[newFrequency] = newNode;
//     }
//     /*
//       if newFrequency < minimum of Heap just update cookieFrequencyMap
//       else if newFrequency = min just add cookie to newFrequencyNode
//       if newFrequency > min if node exists just add it frequencyNode
//       if newFrequency > min but node doesn't exist pop min and add newFrequency node

//     */
//   }

//   getTopKFrequentCookies(): any {
//     let frequentCookiesList = [];
//     while (this.cookieTopFrequentHeap.getLength() > 1) {
//       let currentMinNode = this.cookieTopFrequentHeap.getMin();
//       frequentCookiesList.push([
//         currentMinNode.frequency,
//         currentMinNode.cookieList,
//       ]);
//       this.cookieTopFrequentHeap.remove();
//     }
//     return frequentCookiesList;
//   }
// }

// class HeapNode {
//   frequency: number;
//   cookieList: Set<String>;

//   constructor(frequency: number) {
//     this.frequency = frequency;
//     this.cookieList = new Set([]);
//   }

//   addCookieToNode(cookie: string) {
//     this.cookieList.add[cookie];
//   }

//   removeCookieFromNode(cookie: string) {
//     this.cookieList.delete(cookie);
//   }
// }

// class MinHeap {
//   heap: Array<HeapNode>;

//   constructor() {
//     /* Initialing the array heap and adding a dummy element at index 0 */
//     this.heap = [null];
//   }

//   getLength() {
//     return this.heap.length;
//   }

//   getMin() {
//     /* Accessing the min element at index 1 in the heap array */
//     return this.heap[1];
//   }

//   insert(node: HeapNode) {
//     /* Inserting the new node at the end of the heap array */
//     this.heap.push(node);

//     /* Finding the correct position for the new node */

//     if (this.heap.length > 1) {
//       let current = this.heap.length - 1;

//       /* Traversing up the parent node until the current node (current) is greater than the parent (current/2)*/
//       while (
//         current > 1 &&
//         this.heap[Math.floor(current / 2)].frequency >
//           this.heap[current].frequency
//       ) {
//         /* Swapping the two nodes by using the ES6 destructuring syntax*/
//         [this.heap[Math.floor(current / 2)], this.heap[current]] = [
//           this.heap[current],
//           this.heap[Math.floor(current / 2)],
//         ];
//         current = Math.floor(current / 2);
//       }
//     }
//   }

//   remove() {
//     /* Smallest element is at the index 1 in the heap array */
//     let smallest = this.heap[1];

//     /* When there are more than two elements in the array, we put the right most element at the first position
//           and start comparing nodes with the child nodes
//       */
//     if (this.heap.length > 2) {
//       this.heap[1] = this.heap[this.heap.length - 1];
//       this.heap.splice(this.heap.length - 1);

//       if (this.heap.length === 3) {
//         if (this.heap[1].frequency > this.heap[2].frequency) {
//           [this.heap[1], this.heap[2]] = [this.heap[2], this.heap[1]];
//         }
//         return smallest;
//       }

//       let current = 1;
//       let leftChildIndex = current * 2;
//       let rightChildIndex = current * 2 + 1;

//       while (
//         this.heap[leftChildIndex] &&
//         this.heap[rightChildIndex] &&
//         (this.heap[current].frequency > this.heap[leftChildIndex].frequency ||
//           this.heap[current].frequency > this.heap[rightChildIndex].frequency)
//       ) {
//         if (
//           this.heap[leftChildIndex].frequency <
//           this.heap[rightChildIndex].frequency
//         ) {
//           [this.heap[current], this.heap[leftChildIndex]] = [
//             this.heap[leftChildIndex],
//             this.heap[current],
//           ];
//           current = leftChildIndex;
//         } else {
//           [this.heap[current], this.heap[rightChildIndex]] = [
//             this.heap[rightChildIndex],
//             this.heap[current],
//           ];
//           current = rightChildIndex;
//         }

//         leftChildIndex = current * 2;
//         rightChildIndex = current * 2 + 1;
//       }
//     } else if (this.heap.length === 2) {
//       /* If there are only two elements in the array, we directly splice out the first element */
//       this.heap.splice(1, 1);
//     } else {
//       return null;
//     }

//     return smallest;
//   }
// }
