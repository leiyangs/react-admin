import React from 'react';
import dva, { connect } from 'dva';
import keymaster from 'keymaster';

const delay = ms => new Promise(resolve => setTimeout(() => {
  resolve();
}, ms))

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
  },
  effects: { // 副作用
    // 在effects中每个属性都是一个generator
    *asyncAdd(action, { put }) {
      yield delay(1000);
      yield put({type:'add'});
    }
  },
  subscriptions: {
    // 可以在subscribe中定义多个属性和值，值是一个函数，函数会在初始化的时候执行一次
    keyboard({dispatch}) {
      keymaster('space', () => {
        dispatch({type: 'add'});
      })
      
    },
    key({dispatch}) {
      keymaster('enter', () => {
        dispatch({type: 'effects/asyncadd'})
      })
    }
  }
})

const Counter = props => (
  <>
    <p>{props.number}</p>
    <button onClick={()=>props.dispatch({type:'counter/add'})}>+</button>
    <button onClick={()=>props.dispatch({type:'counter/asyncAdd'})}>掉接口+</button>
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
