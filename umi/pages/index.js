// home组件
import React, { Component } from 'react'
import { Link } from 'umi';

export default class Home extends Component {
  render() {
    return (
     <div>
        <Link to="/profile">跳转到个人中心</Link>
        <div>首页</div>
     </div>
    )
  }
}
