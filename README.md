# iviewProject
# vue+vue-router
# scss
  npm install node-sass --sava-dev
  <br/>
  npm install sass-loader --save-dev
  <br/>
  npm install style-loader --sava-dev
  <br/>
  在build文件夹下的webpack.base.conf.js的rules里面添加配置
  {
    test: /\.scss$/,
    loaders: ['style', 'css', 'sass']
  }
# iview组件库
  安装:npm install iview --save
  <br/>
  main.js 引入
  <br/>
  import iView from 'iview'
  <br/>
  Vue.use(iView)
# axios
  安装:npm install axios
  <br/>
  npm install --save axios vue-axios
  <br/>
  引入:import axios from 'axios'
# mockjs实现本地模拟数据
  安装:npm install mockjs --save-dev
  <br/>
  安装axios-mock-adapter: npm install mockjs axios-mock-adapter --save-dev
  <br/>
  import Mock from 'mockjs'
  <br/>
  模拟请求 生成代理api地址
  <br/>
  import MockAdapter from 'axios-mock-adapter'
# 基于iview 封装select全选与取消全选组件
  组件:'<'select-costum>'<'/select-costum>
# iview table 导出excel
  npm install -S file-saver //用来生成文件的web应用程序
 <br/>
　npm install -S xlsx //电子表格格式的解析器
 <br/>
　npm install -D script-loader //将js挂在在全局下
