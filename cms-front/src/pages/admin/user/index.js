import React from 'react';
import { connect } from 'dva';
import { Table, Form } from 'antd';
import { PAGE_SIZE } from './constants'; // constants是umi中规定的名称，会忽略不处理为route

const FormItem = Form.Item;

export default
@connect(state => state.user) // 装饰器 和connect()()一样，把class传入
class User extends React.Component {
  state = {
    loading: false
  }
  
  onPageNumChange = async (pageNum, pageSize) => {
    this.setState({ loading: true });
    await this.props.dispatch({type:'user/getUserList', payload: {pageNum, pageSize}});
    this.setState({ loading: false });
    // this.props.dispatch(routerRedux.push(`/admin/user?pageNum=${pageNum}`))
  }
  onShowSizeChange = (pageNum, pageSize) => {
    // this.props.dispatch({type:'user/getUserList', payload: {pageNum, pageSize}});
  }
  render() {
    const { loading } = this.state;
    const { list, total, pageNum } = this.props;
    const pagination = {
      current: pageNum,
      total,
      pageSize: PAGE_SIZE,
      defaultPageSize: 3,
      defaultCurrent: 1,
      showSizeChanger: true, // 每页显示几条快捷
      showQuickJumper: true, // 快速跳转到哪页
      showTotal: (total, range) => {
        return `共 ${total} 条`
      },
      onChange: this.onPageNumChange,
      onShowSizeChange: this.onShowSizeChange
    }
    
    const columns = [
      {
        title: '姓名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        key: 'birthday',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        render: gender => {
          return gender === 0 ? '男' : '女'
        }
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ];
    return (
      // 使用 rowKey 来指定 dataSource 的主键。若没有指定，控制台会出现报错的提示 `Each child in a list should have a unique "key" prop`
      <Table rowKey="id" loading={loading} dataSource={list} columns={columns} pagination={pagination} />
    )
  }
}
