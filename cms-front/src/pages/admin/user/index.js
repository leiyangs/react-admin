import React from 'react';
import { connect, routerRedux } from 'dva';
import { Table, Form } from 'antd';
import { PAGE_SIZE } from './constants'; // constants是umi中规定的名称，会忽略不处理为route

const FormItem = Form.Item;

export default
@connect(state => state.user) // 装饰器 和connect()()一样，把class传入
class User extends React.Component {
  render() {
    console.log(this.props.list)
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ];
    
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ];
    return (
      <Table dataSource={dataSource} columns={columns} />
    )
  }
}
