// import styles from './index.css';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

function BasicLayout(props) {
  return (
    <ConfigProvider locale={zhCN}>
      {props.children}
    </ConfigProvider>
  );
}

export default BasicLayout;
