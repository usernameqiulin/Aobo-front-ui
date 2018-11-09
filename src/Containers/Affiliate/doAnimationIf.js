const Emitter =  require('events').EventEmitter;

class DomAnimation extends Emitter{  //执行动画的dom元素， 继承Emitter
    constructor(ele){
        super();
        this.ele = ele;
        this.height = ele.offsetHeight;  //元素高度
        this.eleTop = ele.offsetTop;   //元素距离顶部的值，页面布局不变化的前提下，是固定值
        this.on = this.on.bind(this);
        this.removeListener = this.removeListener.bind(this);
        this.monitor = this.monitor.bind(this);
    }
    monitor(){  //监听滚动条
        let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;   //浏览器可见区域高度
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;    //获取滚动条高度，兼容浏览器
        let top = this.ele.offsetTop - scrollTop;   //元素距离浏览器顶部的距离，随滚动条滚动改变
        // console.log(this.ele);
        // console.log('top' + top);
        // console.log('scrollTop' + scrollTop);
        // console.log('height' + this.height);
        if(top < clientHeight - 100 && top > -this.ele.offsetHeight + 100){   //到这个点时执行动画
            // console.log(this.ele);
            this.emit('doAnimationIf');  //触发动画
        }
    }
    once(type, carryOut){  //重写once方法
        super.once(type, carryOut);  //当执行emitter.emit('doAnimationIf')时，触发carryOut
        if(type === 'doAnimationIf'){
            window.addEventListener('scroll', this.monitor);  //监听滚动条
            
            setTimeout(()=>{  //在拉到底部时，如果立刻获取scrollTop，会显示0
                this.monitor();  //先判断一次是否执行动画，防止出现首次加载不执行动画，必须滚动才执行动画的情况
            },100);
        }  
    }
    removeListener(type, carryOut){  //重写removeListener方法
        if(type === 'doAnimationIf'){
            window.removeEventListener('scroll', this.monitor);  //取消监听滚动条
        }
        super.removeListener(type, carryOut);  //解除绑定
    }
}

export {DomAnimation};

/*
    readme
    const dom = new DomAnimation(dom);
    dom.once('doAnimationIf', ()=>{执行动画});
*/
