import React from 'react';
import { connect } from 'dva';
import { parseTime } from '@/utils';
import styled from 'styled-components';
import { Table, Form, Card, Button, Row, Col, Input } from 'antd';
import { SearchOutlined, SyncOutlined, PlusOutlined } from '@ant-design/icons';
import { PAGE_SIZE } from './constants'; // constants是umi中规定的名称，会忽略不处理为route
import UserModal from './components/UserModal';

const Search = Input;

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 6,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

export default
@connect(state => state.user) // 装饰器 和connect()()一样，把class传入
class User extends React.Component {
  state = {
    loading: false,
  }
  save(payload) {
    this.props.dispatch({type: 'user/save', payload});
  }
  onFilter = () => {
    this.getList(1, this.props.pageSize);
  }
  onResetFilter = () => {

  }
  getList = async (pageNum, pageSize) => {
    this.setState({ loading: true });
    await this.props.dispatch({type:'user/getUserList', payload: {pageNum, pageSize}});
    this.setState({ loading: false });
  }
  onPageNumChange = (pageNum, pageSize) => {
    this.getList(pageNum, pageSize);
  }
  onShowSizeChange = (pageNum, pageSize) => {
    console.log(pageNum, pageSize)
  }
  onAdd = () => {
    this.save({visible: true, isCreate: true});
  }
  render() {
    const { loading } = this.state;
    const { list, total, pageNum, isCreate, visible, record } = this.props;
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
    ];
    return (
      // 使用 rowKey 来指定 dataSource 的主键。若没有指定，控制台会出现报错的提示 `Each child in a list should have a unique "key" prop`
      <FormWrapper>
        <Card>
          <Form>
            <Row gutter={24}>
              <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
                <Form.Item name="name">
                  <Search/>
                </Form.Item>
              </Col>
              <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
                <Form.Item name="name">
                  <Search/>
                </Form.Item>
              </Col>
              <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
                <Form.Item name="name">
                  <Search/>
                </Form.Item>
              </Col>
              <Col {...TwoColProps}
                xl={{ span: 10 }}
                md={{ span: 24 }}
                sm={{ span: 24 }}
              >
                <Row align="middle" justify="space-between">
                  <div>
                    <Button className="margin-right" type="primary" icon={<SearchOutlined/>} onClick={this.onFilter}>查询</Button>
                    <Button className="margin-right" icon={<SyncOutlined />} onClick={this.onResetFilter}>重置</Button>
                  </div>
                  <div>
                    <Button className="margin-right" icon={<PlusOutlined />} type="primary" onClick={this.onAdd}>新增</Button>
                  </div>
                </Row>
              </Col>
            </Row>
          </Form>
          <Table rowKey="id" loading={loading} dataSource={list} columns={columns} pagination={pagination} />
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
