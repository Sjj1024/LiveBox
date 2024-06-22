use crate::command::runner::DouYinReq;

// 自定义函数
#[tauri::command]
pub async fn greet_you(name: &str) -> Result<String, String> {
    println!("调用了greet_you");
    Ok(format!("Hello, {}! You've been greeted from Rust!", name))
}

#[tauri::command]
pub async fn get_live_html(url: &str) -> Result<String, String> {
    // let response = reqwest::get(live_url).await.unwrap();
    println!("调用了get_live_html");
    let mut live_req = DouYinReq::new(url);
    // 获取直播间room_id
    live_req.get_room_id().await.unwrap();
    Ok(format!("Hello, {}! You've been greeted from Rust!", url))
}
