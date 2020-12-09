import React from 'react';
import { connect, routerRedux } from 'dva';
import { Table, Form } from 'antd';
import { PAGE_SIZE } from './constants'; // constants是umi中规定的名称，会忽略不处理为route

const FormItem = Form.Item;

export default
@connect(state => state.user) // 装饰器 和connect()()一样，把class传入
class User extends React.Component {
  render() {
    return (
      <Table/>
    )
  }
}
