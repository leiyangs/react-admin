import React, {Fragment} from 'react';
import { connect } from 'dva';
import styled from 'styled-components';
import { Table, Card, Button, Popconfirm } from 'antd';
import { PAGE_SIZE } from './constants'; // constants是umi中规定的名称，会忽略不处理为route
import Filter from './components/Filter';
import ResourceModal from './components/ResourceModal';

// 使用变量通用组件
const ENTITY = 'resource';

export default
@connect(state => ({...state[ENTITY], loading: state.loading.models[ENTITY]})) // 装饰器 和connect()()一样，把class传入
class Role extends React.Component {
  save(payload) {
    this.props.dispatch({type: `${ENTITY}/save`, payload});
  }

  getList = async (pageNum, pageSize, where) => {
    await this.props.dispatch({type:`${ENTITY}/query`, payload: {pageNum, pageSize, ...where}}); // 展开传入
  }

  onPageNumChange = (pageNum, pageSize) => {
    this.getList(pageNum, pageSize, this.props.where);
  }

  onShowSizeChange = (pageNum, pageSize) => {
    console.log(pageNum, pageSize)
  }

  onEdit = (e, record) => {
    e.stopPropagation();
    this.save({editVisible: true, isCreate: false, record});
  }

  onDelete = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    this.props.dispatch({type: `${ENTITY}/delete`, payload: id})
  }

  render() {
    const { list, total, pageNum, loading, selectedRowKeys, isCreate, editVisible, record } = this.props;
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
        this.save({selectedRowKeys, selectedRows});
      },
    }

    const columns = [
      {
        title: '角色名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        key: 'operation',
        render: (val, record) => {
          return (
            <Fragment>
              <Button className="margin-right" onClick={(e) => this.onEdit(e,record)}>编辑</Button>
              <Popconfirm 
                title="确定删除吗？"
                okText="确定"
                cancelText="取消"
                onCancel={e=>e.stopPropagation()}
                onConfirm={(e)=>this.onDelete(e, record.id)}
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
                  let selectedRows = this.props.selectedRows;
                  const index = selectedRowKeys.indexOf(record.id);
                  if(index === -1) { // 如果此行没选中，就选中
                    selectedRowKeys = [...selectedRowKeys, record.id]; // id数组
                    selectedRows = [...selectedRows, record]; // row数组
                  }else { // 如果选中。就过滤掉此条
                    selectedRowKeys = selectedRowKeys.filter(id => id !== record.id);
                    selectedRows = selectedRows.filter(row => row.id !== record.id);
                  }
                  this.save({selectedRowKeys, selectedRows});
                }
              }
            }}
          />
          <ResourceModal
          wrappedComponentRef = {inst => this.form = inst}
          isCreate={isCreate}
          visible={editVisible}
          record={record}
        />  
        </Card>
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
