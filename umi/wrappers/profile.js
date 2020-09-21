import { Redirect } from 'umi'

export default (props) => {
  return localStorage.getItem('login') ? <>{props.children}</> : <Redirect to="/login"></Redirect>
}
