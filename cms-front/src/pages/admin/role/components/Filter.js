import React from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Input, Button, Popconfirm, message } from 'antd';
import { SearchOutlined, SyncOutlined, PlusOutlined } from '@ant-design/icons';

const Search = Input;
const ENTITY = 'role';

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 6,
  },
}

class Filter extends React.Component {
  formRef = React.createRef();

  save(payload) {
    this.props.dispatch({type: `${ENTITY}/save`, payload});
  }

  getList = async (pageNum, pageSize, where) => {
    this.save({ where });
    await this.props.dispatch({type:`${ENTITY}/query`, payload: {pageNum, pageSize, ...where}}); // 展开传入
  }

  onFilter = () => {
    const values = this.formRef.current.getFieldsValue();
    // 不填查询条件，直接过滤掉
    const where = Object.keys(values).reduce((memo, key) => {
      if(values[key]) {
        memo[key] = values[key];
      }
      return memo
    }, {})
    this.getList(1, this.props.pageSize, where);
  }

  onResetFilter = () => {
    this.formRef.current.resetFields();
    this.getList(1, this.props.pageSize, {});
  }

  onAdd = () => {
    this.save({editVisible: true, isCreate: true, record: {}});
  }

  onMultiDelete = () => {
    this.props.dispatch({type: `${ENTITY}/multiDelete`, payload: this.props.selectedRowKeys})
  }

  onSetPermission = () => {
    if(this.props.selectedRows.length===1) {
      let record = this.props.selectedRows[0];
      let resourceIds = record.resourceIds.map(resourceId => resourceId + ''); // 必须是string[]
      this.save({
        setPermissionVisible: true,
        record,
        checkedKeys: resourceIds
      });
      console.log(resourceIds)
    }else if(this.props.selectedRows.length===0) {
      message.error('请勾选角色');
    }else {
      message.error('只能勾选一个角色');
    }
  }

  render() {
    const { selectedRowKeys } = this.props;

    return (
      // form设置默认值setFieldsValue设置，通过initialValue设置时 resetField会有问题
      <Form ref={this.formRef} preserve={false}>
        <Row gutter={24} align="middle" justify="space-between">
          <Col md={{ span: 14 }}>
            <Row gutter={24}>
              <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }}>
                <Form.Item name="name">
                  <Search placeholder="角色名"/>
                </Form.Item>
              </Col>
              <Button className="margin-right" type="primary" icon={<SearchOutlined/>} onClick={this.onFilter}>查询</Button>
              <Button className="margin-right" icon={<SyncOutlined />} onClick={this.onResetFilter}>重置</Button>
            </Row>
          </Col>
          <Col>
            <Form.Item>
              <Button className="margin-right" icon={<PlusOutlined />} type="primary" onClick={this.onAdd}>新增</Button>
              <Popconfirm title="确定删除选中项？" okText="确定" cancelText="取消" onConfirm={this.onMultiDelete} disabled={selectedRowKeys.length===0}>
                <Button className="margin-right" type="primary" disabled={selectedRowKeys.length===0} danger>批量删除</Button>
              </Popconfirm>
              <Button className="margin-right" onClick={this.onSetPermission}>角色授权</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default connect(
  state => state[ENTITY]
)(Filter);
