import React from 'react';
import { history } from "umi"; // 之前的router变成了history。。。

export default class Profile extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => history.push('/')}>回首页</button>
        <div>个人中心</div>
      </div>
    )
  }
}