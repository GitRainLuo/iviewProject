# iviewProject
# vue+vue-router
# scss
  npm install node-sass --sava-dev
  npm install sass-loader --save-dev
  npm install style-loader --sava-dev
  在build文件夹下的webpack.base.conf.js的rules里面添加配置
  {
    test: /\.scss$/,
    loaders: ['style', 'css', 'sass']
  }
# iview组件库
  安装:npm install iview --save
  main.js 引入
  import iView from 'iview'
  Vue.use(iView)
# axios
  安装:npm install axios
  npm install --save axios vue-axios
  引入:import axios from 'axios'
# mockjs实现本地模拟数据
  安装:npm install mockjs --save-dev
  <br/>
  安装axios-mock-adapter: npm install mockjs axios-mock-adapter --save-dev
  import Mock from 'mockjs'
  模拟请求 生成代理api地址
  import MockAdapter from 'axios-mock-adapter'
