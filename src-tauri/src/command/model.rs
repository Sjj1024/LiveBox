// 自定义返回的消息
#[derive(serde::Serialize)]
pub struct LiveInfo {
    pub room_info: String,
    pub ttwid: String,
    pub unique_id: String,
}
