import React from 'react';
import dva, { connect } from 'dva';

// 执行dva函数可以得到一个app对象，代表dva的应用对象
const app = dva();

// 定义模型
// redux dva应用会定义很多命名空间，为了让各个模型之间进行解耦和独立，划分多个命名空间
// 类似combinreducer状态树 {counter: {number:0}}
app.model({
  namespace: 'counter', // 命名空间
  state: { number: 0 }, // 状态对象
  reducers: { // 处理器
    add(state) {
      return { number:state.number + 1 }
    }
  }
})

const Counter = props => (
  <>
    <p>{props.number}</p>
    <button onClick={()=>props.dispatch({type:'counter/add'})}>+</button>
  </>
)

const ConnectedCounter = connect(
  state=>state.counter
)(Counter)

// 定义路由
app.router(({app, router}) => (
  <ConnectedCounter/>
));

// 启动应用 React.render(<ConnectedCounter/>, document.querySelector('#root'));
app.start('#root');
