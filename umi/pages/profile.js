// 通过指定高阶组件 wrappers 达成效果。

import React from 'react';
import { history } from "umi"; // 之前的router变成了history。。。

class Profile extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => history.push('/')}>回首页</button>
        <div>个人中心</div>
      </div>
    )
  }
}

Profile.wrappers = ['@/wrappers/profile'];

export default Profile;