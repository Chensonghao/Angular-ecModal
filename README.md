# Angular-ecModal  
## 自定义的一款AngularJS模态窗体组件

## 1.引入样式文件
```
  <link rel="stylesheet" href="css/angular-ecModal.css">
```

## 2.引入脚本
```
  <script src="js/angular-ecModal.js"></script>
```

## 3.使用
##### 3.1 定义模板
```
  <script type="text/ng-template" id="modal-1">
    <div class="md-modal md-effect-1">
        <div class="md-content">
            <div class="md-header">
            </div>
            <div class="md-body">
            </div>
            <div class="md-footer">
            </div>
        </div>
    </div>
  </script>
```

##### 3.2 打开事件
```
  //依赖注入$ecModal后使用
  $ecModal.open({
        templateUrl: 'modal-1',    //模板id
        controller: 'modal-1',     //控制器
        controllerAs: 'md',        //controllerAs写法
        overlayClose:true,         //默认false，设置true后点击模态窗体其它区域关闭
        resolve: {

        }
  });
```

##### 3.3 关闭事件
```
  //依赖注入$ecModalInstance后使用
  $ecModalInstance.close().then(function(){
                    //promise成功回调
  });
```

# 具体参照demo源码

