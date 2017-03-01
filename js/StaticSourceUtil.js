
//加载图片资源工具类
(function () {
    window.StaticSourceUtil = Class.extend({
       init:function () {
            //保存所有的dom对象
           this.allImageObj = {};
           
       },

        //加载图片方法, 返回 所有dom对象, 总的图片个数, 已经加载的图片个数
        loadImage:function (jsonUrl, callBack) {
            //1.备份指针
            var self = this;

            //2.创建请求对象
            var xhr = new XMLHttpRequest();
            
            //3.05.ajax 三步走
            xhr.onreadystatechange = function () {
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        //加载图片个数
                        var  loadImageCount = 0;             
                        //3.1 请求数据
                        var responseText = xhr.responseText;
                        //3.2 解析json
                        var responseJson = JSON.parse(responseText);
                        //3.2 数组
                        var imageArr = responseJson.images;
                        //3.3 遍历数组
                        for(var i = 0;i< imageArr.length; i++ ){
                            
                            //创建image对象
                            var image = new Image();
                            image.src = imageArr[i].src;
                            image.index = i;
                            image.onload = function () {
                                //累加图片个数
                                loadImageCount++;
                                
                                //保存image对象 {name: dom} {"fangzi" : image对象}
                                self.allImageObj[imageArr[this.index].name] = this; //self ->工具类, this -->image对象
                                //回调 返回 所有dom对象, 总的图片个数, 已经加载的图片个数
                                callBack(self.allImageObj, imageArr.length, loadImageCount);
                                
                            }
                            
                        }
                        
                    }
                }
                
            }
            
            xhr.open('get', jsonUrl);
            xhr.send(null);

        }


    });
})();

