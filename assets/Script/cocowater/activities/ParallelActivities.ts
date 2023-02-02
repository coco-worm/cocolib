// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Activity, { ActivityHandler } from "../core/Activity";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ParallelActivities extends Activity implements IActivity {
        
    @property({
        override:true,
        visible:false
    })
    activity:ActivityHandler = null


    async intent(){

        
    }
    // update (dt) {}
}
