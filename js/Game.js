/**
 * Created by xmg on 2017/2/6.
 */
//中介者类 
(function () {
    window.Game = Class.extend({
       //初始化方法
        init:function (option) {
            option = option || {};

            //备份指针
            var self = this;

            //1.fps
            this.fps = option.fps || 50;

            //2.实例化帧工具类
            this.frameUtil = new FrameUtil();
            //3.获取上下文
            this.canvas = document.getElementById(option.canvasId);
            this.context = this.canvas.getContext('2d');

            //4.保存所有的dom对象
            this.allImageObj = {};
            
            //5.实例化加载图片工具类
            this.staticSourceUtil = new StaticSourceUtil();
            //6.加载图片 返回 所有dom对象, 总的图片个数, 已经加载的图片个数
            this.staticSourceUtil.loadImage("r.json", function (allImageObj, allImageCount, loadImageCount) {
               // console.log(allImageObj, allImageCount, loadImageCount) ;
               if(allImageCount == loadImageCount){
                   self.allImageObj = allImageObj;
                   self.run();
               }
            });

            //7.记录游戏是否结束
            this.isGameOver = false;

        },

        //游戏运行
        run:function () {
            //1.备份指针
            var self = this;
            //2.定时器
            this.timer = setInterval(function () {
                self.runloop();
            }, 1000 / this.fps); //每一帧所用时间

            //3.初始化房子
            this.fangzi = new Background({
                img:this.allImageObj['fangzi'],
                y:this.canvas.height - 256 -100,
                width:300,
                height:256,
                speed:2
            });

            //4.初始化树
            this.shu = new Background({
                img:this.allImageObj['shu'],
                y:this.canvas.height - 216 -48,
                width:300,
                height:216,
                speed:3
            });

            //5.初始化地板
            this.diban = new Background({
                img:this.allImageObj['diban'],
                y:this.canvas.height -48,
                width:48,
                height:48,
                speed:4
            });

            //6.实例化管道数组
            // this.pipe = new Pipe();
            this.pipeArr = [new Pipe()];
            
            //7.实例化鸟
            this.bird = new Bird();

        },

        //游戏循环
        runloop:function () {
            // console.log(Math.random());
            //1.执行帧工具类方法
            this.frameUtil.render();
            //2.清屏
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            //3.绘制文本
            this.context.fillText('FPS / '+ this.frameUtil.realFps, 15, 15);
            this.context.fillText('FNO / '+ this.frameUtil.currentFrame, 15, 30);
            
            // this.context.drawImage(this.allImageObj["fangzi"], 200, 200);
            //4.更新和绘制房子
            this.fangzi.update();
            this.fangzi.render();

            //5.更新和绘制树
            this.shu.update();
            this.shu.render();

            //4.更新和绘制地板
            this.diban.update();
            this.diban.render();

            //5.实例化管道
            if( !this.isGameOver && (this.frameUtil.currentFrame % 100 == 0)){ //每隔100帧,生成一个管道
                this.pipeArr.push(new Pipe());
            }
            
            //6.更新和绘制管道
            for(var i = 0;i< this.pipeArr.length; i++ ){
                this.pipeArr[i].update();
                this.pipeArr[i].render();
            }
            
            //7.更新和绘制鸟
            this.bird.update();
            this.bird.render();

        },
        
        //游戏停止
        pause:function () {
            clearInterval(this.timer);
        },
        
        //游戏结束
        gameOver:function () {
            // console.log('游戏结束');
            //所有背景都停止
            this.fangzi.pause();
            this.shu.pause();
            this.diban.pause();
            
            //停止管道
            this.pipeArr.forEach(function (item, index) {
                item.pause();
            })
            
            //通知鸟,死了
            this.bird.die = true;

            //更改游戏是否结束属性
            this.isGameOver = true;
            
        }


    });

})();
