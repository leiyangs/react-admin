import React, {Fragment} from 'react';
import { connect } from 'dva';
import { parseTime } from '@/utils';
import styled from 'styled-components';
import { Table, Card, Button, Popconfirm } from 'antd';
import { PAGE_SIZE } from './constants'; // constants是umi中规定的名称，会忽略不处理为route
import UserModal from './components/UserModal';
import Filter from './components/Filter';

export default
@connect(state => ({...state.user, loading: state.loading.models.user})) // 装饰器 和connect()()一样，把class传入
class User extends React.Component {
  save(payload) {
    this.props.dispatch({type: 'user/save', payload});
  }

  getList = async (pageNum, pageSize, where) => {
    await this.props.dispatch({type:'user/query', payload: {pageNum, pageSize, ...where}}); // 展开传入
  }

  onPageNumChange = (pageNum, pageSize) => {
    this.getList(pageNum, pageSize, this.props.where);
  }

  onShowSizeChange = (pageNum, pageSize) => {
    console.log(pageNum, pageSize)
  }

  onEdit = (e, record) => {
    e.stopPropagation();
    this.save({visible: true, isCreate: false, record});
  }

  onDelete = (e, id) => {
    e.stopPropagation();
    this.props.dispatch({type: 'user/delete', payload: id})
  }

  render() {
    const { list, total, pageNum, loading, isCreate, visible, record, selectedRowKeys } = this.props;
    const pagination = {
      total,
      current: pageNum,
      defaultPageSize: PAGE_SIZE, // 默认每页条数
      defaultCurrent: 1, // 默认当前页数
      pageSizeOptions: [3, 5, 10, 20, 50, 100], // 指定每页多少条
      showSizeChanger: true, // 每页显示几条快捷
      showQuickJumper: true, // 快速跳转到哪页
      showTotal: (total, range) => {
        return `共 ${total} 条`
      },
      onChange: this.onPageNumChange,
      onShowSizeChange: this.onShowSizeChange
    }
    
    const rowSelection = {
      type: 'checkbox',
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.save({selectedRowKeys});
      },
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
        render: birth => {
          return parseTime(birth, '{y}-{m}-{d}');
        }
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
      {
        title: '操作',
        key: 'operation',
        render: (val, record) => {
          return (
            <Fragment>
              <Button className="margin-right" onClick={e => this.onEdit(e, record)}>编辑</Button>
              <Popconfirm 
                title="确定删除吗？"
                okText="确定"
                cancelText="取消"
                onCancel={e => e.stopPropagation()}
                onConfirm={e=>this.onDelete(e, record.id)}
              >
                <Button type="primary" onClick={e => e.stopPropagation()} danger>删除</Button>
              </Popconfirm>
            </Fragment>
          )
        }
      }
    ];

    return (
      // 使用 rowKey 来指定 dataSource 的主键。若没有指定，控制台会出现报错的提示 `Each child in a list should have a unique "key" prop`
      // loading 可以使用dva中的loading
      <FormWrapper>
        <Card>
          <Filter/>
          <Table 
            rowKey="id"
            loading={loading}
            rowSelection={rowSelection}
            dataSource={list}
            columns={columns}
            pagination={pagination}
            onRow={(record) => {
              return {
                onClick: () => { // 单击行勾选
                  let selectedRowKeys = this.props.selectedRowKeys;
                  let index = selectedRowKeys.indexOf(record.id);
                  if(index === -1) { // 如果此行没选中，就选中
                    selectedRowKeys = [...selectedRowKeys, record.id];
                  }else { // 如果选中。就过滤掉此条
                    selectedRowKeys = selectedRowKeys.filter(id => id !== record.id);
                  }
                  this.save({selectedRowKeys});
                }
              }
            }}
          />
        </Card>
        <UserModal
          wrappedComponentRef = {inst => this.form = inst}
          isCreate={isCreate}
          visible={visible}
          record={record}
        />
      </FormWrapper>
    )
  }
}

const FormWrapper = styled.div`
  .ant-table {
    // height: calc(100vh - 250px) !important;
    // overflow-y: scroll;
  }
  .ant-empty-normal {
    margin: calc(100vh - 250px) !important;
  }
`
