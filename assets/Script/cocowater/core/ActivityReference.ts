// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Helper from "../utils/Helper";

const {ccclass, property, help} = cc._decorator;

@ccclass
export default class ActivityReference {
    
    
    @property(cc.Node)
    get target():cc.Node{
        return this._target
    }

    set target(node:cc.Node){
        this._target = node;
        this.anatomic(node);
    }
    
    // 
    @property({
        visible:false,
        serializable:true
    })
    private _target:cc.Node = null;

    protected _hierarchy:string
    
    // FEATURE

    /**
     * 
     * @param node 
     */
    private anatomic(node:cc.Node){
        this._hierarchy = Helper.getHierarchyNode(node);
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

    

    // update (dt) {}
}
