// import styles from './index.css';
import { Redirect } from 'umi';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

function BasicLayout(props) {
  const isLogin = localStorage.getItem('isLogin');
  return (
    // <Redirect to="/login" />
    <ConfigProvider locale={zhCN}>
      {props.children}
    </ConfigProvider>
  );
}

export default BasicLayout;
