
//管道工具类
(function () {
    window.Pipe = Class.extend({
        init:function () {
            //方向 0: 口向下, 1:口向上
            this.dir = _.random(0, 1);

            this.width = 148;
            this.height = _.random(80, game.canvas.height * 0.5);
            this.x = game.canvas.width;
            this.y = this.dir == 0 ? 0 : game.canvas.height - 48 - this.height;
            //速度
            this.speed = 4;

        },

        //更新
        update:function () {
            this.x -= this.speed;
            //判断是否超出画面, 优化处理
            if(this.x < -this.width){
                game.pipeArr = _.without(game.pipeArr, this);
            }

            //鸟和管道的碰撞检查
            if((game.bird.x < this.x + this.width) && (game.bird.x > this.x - game.bird.width)){ //x方向碰撞检查
                //根据口的方向,判断y
                if(this.dir == 0){ //口向下
                    if(game.bird.y < this.height){
                        game.gameOver(); //碰撞了
                    }
                }else if (this.dir == 1){ //口向上
                    if(game.bird.y > this.y  - game.bird.height){
                        game.gameOver();//碰撞了
                    }
                }
            }

        },

        //绘制
        render:function () {
            //判断口的方向
            if(this.dir == 0){ //口向下
                game.context.drawImage(game.allImageObj['pipe1'], 0, 1664 - this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            }else if(this.dir == 1){ //口向上
                game.context.drawImage(game.allImageObj['pipe0'], 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
                
            }
        },

        //停止
        pause:function () {
            this.speed = 0;
        }


    });

})();
