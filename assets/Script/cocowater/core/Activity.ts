// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Helper from "../utils/Helper";

const {ccclass, property, inspector, executeInEditMode} = cc._decorator;


@ccclass
// @inspector('packages://gamify/inspector.js')
export default class Activity extends cc.Component implements IActivities {

    // @property(cc.Component.EventHandler)
    // activity:ActivityHandler = null

    // @property    
    // test:ActivityHandler = null
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    }

    start () {
        const url:string = Helper.getHierarchyNode(this.node);
        cc.log('>>> URL:: ' + url)
        const node:cc.Node =  cc.find(url);
        cc.log( '>> [' + url + '] :: ' + node ? node.name : ' not found');
    }

    // update (dt) {}
    async intent(){
        
    }
}
