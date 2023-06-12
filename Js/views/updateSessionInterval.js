export function updateSessionInterval(){
  axios.get("http://localhost:8080/update_session_interval");
  console.log("Session充值成功");
}