// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Helper extends cc.Component {

    static getHierarchyNode(node:cc.Node):string{
        return this._findHierarchyPath(node, '');
    }

    private static _findHierarchyPath(node:cc.Node, path:string = ''):string|null{
        if(node || (node instanceof cc.Canvas)){
            // path = (node ? node.name : null) + '.' + path;            
            return node.parent ? this._findHierarchyPath(node.parent, path) + '/' + (node ? node.name : null) : path
        }
        return path;
    }

    // update (dt) {}
}
