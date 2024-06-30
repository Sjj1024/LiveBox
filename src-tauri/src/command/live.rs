use crate::command::model::LiveInfo;
use crate::command::runner::DouYinReq;

// 自定义函数
#[tauri::command]
pub async fn greet_you(name: &str) -> Result<String, String> {
    println!("调用了greet_you");
    Ok(format!("Hello, {}! You've been greeted from Rust!", name))
}

#[tauri::command]
pub async fn get_live_html(url: &str) -> Result<LiveInfo, String> {
    // let response = reqwest::get(live_url).await.unwrap();
    // println!("调用了get_live_html");
    let mut live_req = DouYinReq::new(url);
    // 获取直播间room_id和主播信息
    let result = live_req.get_room_info().await;
    match result {
        Ok(info) => Ok(info),
        Err(_) => Err("This failed!".into()),
    }
}
