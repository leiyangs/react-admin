// import styles from './index.css';
import { Redirect } from 'umi';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import User from '../pages/admin/user/index';

function BasicLayout(props) {
  const isLogin = localStorage.getItem('isLogin');
  const token = localStorage.getItem('token');
  const { children, location } = props;
  const Container = (isLogin && token && !location.pathname.includes('/login')) ? <Redirect to="/login" /> : (
    <ConfigProvider locale={zhCN}>
      <User>
       {children}
      </User>
    </ConfigProvider>
  );
  console.log(props) 
  return (
    <ConfigProvider locale={zhCN}>
      {children}
    </ConfigProvider>
  );
}

export default BasicLayout;
