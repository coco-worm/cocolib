// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { gamify } from "../../cocowater/core/Decorator";
const {ccclass, property} = cc._decorator;
const {activity} = gamify;

@ccclass
export default class Reel extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    private a:string = 'a_var'
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    @activity
    async intent(){
        return 1;
    }

    // update (dt) {}
}
