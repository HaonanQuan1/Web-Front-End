class Node {

    constructor(tagName, children, parent) {
  
        this.parent = parent;
    
        this.tagName = tagName;
    
        //children is an array of node objects.
    
        this.children = children;
  
    }
  
    /**
  
    Implement below method.  Returns an array of all descendant nodes matching the selector.

    The selector could be a simple CSS selector or descendant CSS selector.
  
    Examples    selector = "p" |  selector = "p div a h"

    return [node1, node2, ...]
  
    */


    querySelectorAll(selector) {
        var list = [];
        // list.push(html);
        var sel = selector.split(/\s+/);
        // var length=0;
            let target=sel[0];
            this.dfs(target,list,html,0,sel);
        // }
        // let root = this.findRoot(selector);
        
        //var res = dfs(root, list);
        return list;
    }   
    /**
     * 
     * @param {*} tag_name the target name which is one of the element in selector. 
     * @param {*} list the list which the answer resides.
     * @param {*} cur_node the node which I'm gonna dfs
     * @param {*} count count to identify which target-name I'm on.
     * @param {*} sel the array contains every targetname, in other word selector.
     *
     * 
     * If I find the node satisfy the first target, count plus one, and the
    tag_name is the next element of selector, the we continue our dfs, if the node's
    tag name equals tag_name, and count equals to the length of selector. This node
    is the answer, we simply need to do is add the node into list.
     */
    dfs(tag_name,list,cur_node,count,sel) {
        // console.log(tag_name);
        // console.log(count);
        // console.log(cur_node);
      // var name = tag_name;
        if(cur_node.tagName == tag_name){
            count++;
            if(count==sel.length){
                list.push(cur_node);
                return ;
            }
            /*This will not throw ArrayIndexOut of bounds, because 
            when count equals selector.length, this dfs will be terminated        
            */
            tag_name=sel[count];
        }
        for(let i in cur_node.children) {
          this.dfs(tag_name,list,cur_node.children[i],count,sel);
        }
    
    }
    /**
  
    Implement below method.  Add the node to the current node's parent. 
  
    This method does not return any value.
  
    */
  

    /**
     * 
     * @param {*} node the node needs to be added to become the sibling of the node who calls this function
     * 
     * This function is quite simple, I just need to instantiate a Node node1, and another Node node2
      will call this function, pass the node1 I just created, set the node1's parent equals to node2,
      and the push this node1 into node2's parent's children array
     */
    addSibling(node) {
        if(this.parent===null){
            return ;
        }
        if(node.parent!=null&&node.parent!=this.parent){
            let lo=0;
            for(let i in node.parent.children){
                if(node.parent.children[i]===node){
                    lo=i;
                }
            }
            node.parent.children.splice(i,1);
        }
        node.parent = this.parent;
        this.parent.children.push(node);
      
    }
  
  }


/**
 *This part is to build html tree,
 */
var html = new Node("html", [], null);
var div1 = new Node("div", [], html);
var div2 = new Node("div", [], html);
var p = new Node("p", [], html);
var h1_1 = new Node("h1",[], div1);
var h1_2 = new Node("h1", [], p);
var p1=new Node("p",[],html);
var div3=new Node("div",[],p1);
var a1=new Node("a",[],div3);
// var a2=new Node("a",[],a1);
var p2=new Node("p",[],a1);

html.children.push(div1);
html.children.push(div2);
html.children.push(p);
html.children.push(p1);
div1.children.push(h1_1);
p.children.push(h1_2);
p1.children.push(div3);
div3.children.push(a1);
a1.children.push(p2)


// This is the tree I build

/* <html>
    <div>
        <h1></h1>
    </div>   

    <div>
    </div> 

    <p>
        <h1></h1>
    </p > 
    <p>
        <div>
            <a>
              <p>
              </p>
            </a>
        </div>
    </p>
</html> */


var sibiling=new Node("table",[],null);
div3.addSibling(sibiling);
console.log(p1);
html.querySelectorAll("p div p");

// This is the tree When I call addsibiling

/* <html>
    <div>
        <h1></h1>
    </div>   

    <div>
    
    </div> 

    <p>
        <h1></h1>
    </p > 
    <p>
        <div>
            <a>
              <p>
              </p>
            </a>
        </div>
        
        <table>
          <div>
            <a>
            </a>
          </div>
        </table>
    </p>
</html> */