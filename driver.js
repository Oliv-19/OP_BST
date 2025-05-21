import Tree from "./BST.js";


function randomArray(maxNum){
    let arr= []
    for (let i = 0; i < 20; i++) {
        let randomNum=Math.floor(Math.random()*maxNum)
        arr.push(randomNum)
    }
    return arr
}
let arr=[]
let tree = new Tree()
tree.buildTree(randomArray(100))
tree.prettyPrint(tree.root)
console.log(tree.isBalanced())
tree.levelOrder((v)=>arr.push(v.data))
console.log(arr)
arr=[]
tree.preOrder((v)=>arr.push(v.data))
console.log(arr)
arr=[]
tree.inOrder((v)=>arr.push(v.data))
console.log(arr)
arr=[]
tree.postOrder((v)=>arr.push(v.data))
console.log(arr)
arr=[]

tree.insert(115)
tree.insert(112)
tree.insert(126)
tree.insert(100)
tree.insert(150)

console.log(tree.isBalanced())
console.log(tree.rebalance())
console.log(tree.isBalanced())

tree.levelOrder((v)=>arr.push(v.data))
console.log(arr)
arr=[]
tree.preOrder((v)=>arr.push(v.data))
console.log(arr)
arr=[]
tree.inOrder((v)=>arr.push(v.data))
console.log(arr)
arr=[]
tree.postOrder((v)=>arr.push(v.data))
console.log(arr)
arr=[]
tree.prettyPrint(tree.root)
