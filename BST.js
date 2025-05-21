class Node{
    constructor(data, left= null, right= null){
        this.data= data
        this.left= left
        this.right = right
    }
}
function Queue(){
    return {
        queue:[],
        enqueue:function(item){
            this.queue.push(item)
        },
        dequeue:function(){
            this.queue.shift()
        },
        peek:function(){
            return this.queue[0]
        },
        isEmpty:function(){
            if(this.queue.length == 0)return true
            else return false
        },
        size:function(){
            return this.queue.length
        },
        clear:function(){
            this.queue=[]
            
        },
        print:function(){
            this.queue.forEach((elem)=> console.log(elem))
        },
    }
}

export default class Tree{
    constructor(){
        this.root
    }
    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };
    buildTree(array){
        if(!array ||array.length == 0)return null
        array.sort((a,b)=>a-b)
        array= array.filter((num, i)=>num!=array[i-1]??num)

        let mid= Math.floor((array.length-1)/2)
        let leftSide= this.buildTree(array.slice(0, mid))
        let rightSide= this.buildTree(array.slice(mid+1))
        
        this.root= new Node(array[mid], leftSide, rightSide)
        return this.root
    }
    insert(value, root= this.root){
        
        if(this.root == null){
            this.root= new Node(value)
            return
        }else if(root.left== null && value <= root.data){
            root.left= new Node(value)
            return 
        }else if(root.right== null && value >= root.data){
            root.right= new Node(value)
            return 
        }

        if(value < root.data){
            root= root.left
        }else if(value > root.data){
            root= root.right
        }
        if(value == root.data)throw new Error('value already in Tree')
        this.insert(value, root)
         
        return 
        
    }
    deleteItem(value){
        if(this.root == null)throw new Error('cannot delete from empty tree')
        let root= this.root
        let prevNode=root
        let prevSide=null
        
        while(value != root.data){
             if(value < root.data){
                prevNode= root
                prevSide= 'left'
                root= root.left
            }else if(value > root.data){
                prevNode= root
                prevSide= 'right'
                root=root.right
            }

            if(root== null)throw new Error('value not found')
        }
        if(root.left==null && root.right== null){
            if(this.root != root)prevNode[prevSide]= null
            else this.root= null
          }else if(root.left==null || root.right== null){
            if(this.root != root){
                root= root.left==null?root.right:root.left
                prevNode[prevSide]= root
            }else{
                this.root= root.left==null?root.right:root.left
                prevNode= this.root
            }
        }else if(root.left!=null && root.right!= null){
            let min=root.right
            if(!min.left){
                root.data= min.data
                root.right = min.right
            }else{
                let minPrev
                while(min.left){
                    minPrev= min
                    min= min.left
                }
                root.data= min.data
                minPrev.left = min.right
            }
        }
        return true

    }
    find(value){
        let root = this.root
        while(value != root.data){
            if(root.left==null && root.right== null){
                return null
            }
            if(value < root.data){
                root= root.left
            }else if(value > root.data){
                root=root.right
            }
        
        }
        return root
    }
    levelOrder(callback){
        if(  typeof callback != "function")throw new Error('a callback is required')
        const queue = Queue()
        let array=[]
        queue.enqueue(this.root)
        while(!queue.isEmpty()){
            if(queue.peek() != null){
                array.push(queue.peek())
            }
            if( queue.peek().left != null){
                queue.enqueue(queue.peek().left)
            }
            if( queue.peek().right != null){  
                queue.enqueue(queue.peek().right)
            }
            callback(queue.peek())
            queue.dequeue()
        }
       
    }
    inOrder(callback, root = this.root){
        if(  typeof callback != "function")throw new Error('a callback is required')
        if(root== null)return
        this.inOrder(callback,root.left)
        callback(root)
        this.inOrder(callback,root.right)
        return
    }
    preOrder(callback, root = this.root){
        if(  typeof callback != "function")throw new Error('a callback is required')
        if(root== null)return
        callback(root)
        this.preOrder(callback,root.left)
        this.preOrder(callback,root.right)
        return
    }
    postOrder(callback, root = this.root){
        if(  typeof callback != "function")throw new Error('a callback is required')
        if(root== null)return
        this.postOrder(callback,root.left)
        this.postOrder(callback,root.right)
        callback(root)
        return
    }
    height(value){
        if(typeof value != 'object'){
            value = this.find(value)
            if(value == null)return null
        }
        if(value.left == null && value.right==null)return 0
        else if(value.left==null || value.right== null){

            value= value.left==null?value.right:value.left
            return this.height(value) +1
            
        }else if(value.left!=null || value.right != null){
            let leftST = this.height(value.left)
            let rightST = this.height(value.right)
            if(leftST>rightST)return leftST+1
            else return rightST+1
        }
    }
    depth(value, root = this.root){
        if(typeof value != 'object'){
            value= this.find(value)
            if(value == null)return null
        }
        if(value.data == root.data)return 0
        if( value.data > root.data){
            return this.depth(value, root.right)+1
        }else if( value.data < root.data){
            return this.depth(value, root.left)+1
        }
        
    }
    isBalanced (){
        let leftST= this.height(this.root.left)
        let rightST= this.height(this.root.right)
        if(Math.abs(leftST-rightST) > 1){
            return false
        }else return true
    }
    rebalance(){
        let arr =[]
        this.inOrder((v)=>arr.push(v.data))
        this.buildTree(arr) 
        
    }
}