// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ActivityData extends cc.Component implements IActivityData {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    pull(){

    }

    commit(){

    }

    merge(){
        
    }

    // update (dt) {}
    getHierarchyNode(node:cc.Node):string{
        if(node.parent){

        }
        return
    }
    
    _getHierarchyNode(node:cc.Node, nodePath:string = ''):string{
        if(node.parent){

        }
        return
    }

}
