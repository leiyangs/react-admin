import React from 'react';
import { router } from 'umi/router';

export default class Profile extends React.Component {
  render() {
    console.log(router)
    return (
      <div>
        <button onClick={() => router.push('/')}>回首页</button>
        <div>个人中心</div>
      </div>
    )
  }
}