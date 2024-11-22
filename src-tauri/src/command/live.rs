use crate::command::model::LiveInfo;
use crate::command::runner::DouYinReq;
use std::io::Read;
use std::time::Instant;
use tauri::AppHandle;

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

#[tauri::command]
pub async fn open_window(
    handle: AppHandle,
    app_url: String,
    app_name: String,
    platform: String,
    user_agent: String,
    resize: bool,
    width: f64,
    height: f64,
    js_content: String,
) {
    let window_label = "previewWeb";
    // if let Some(existing_window) = handle.get_window(window_label) {
    //     if resize {
    //         let new_size = LogicalSize::new(width, height);
    //         match existing_window.set_size(new_size) {
    //             Ok(_) => println!("Window resized to {}x{}", width, height),
    //             Err(e) => eprintln!("Failed to resize window: {}", e),
    //         }
    //     } else {
    //         existing_window.close().unwrap();
    //         println!("Existing window closed.");
    //         let start = Instant::now();
    //         while handle.get_window(window_label).is_some() {
    //             if start.elapsed().as_secs() > 2 {
    //                 println!("Window close took too long. Aborting.");
    //                 return;
    //             }
    //             std::thread::yield_now();
    //         }
    //     }
    // }
    println!("Opening docs in external window: {}, {}", app_url, platform);
    // println!("js_content: {}", js_content);
    // let resource_path = handle
    //     .path_resolver()
    //     .resolve_resource("data/custom.js")
    //     .expect("failed to resolve resource");
    // let mut custom_js = std::fs::File::open(&resource_path).unwrap();
    // let mut contents = String::new();
    // custom_js.read_to_string(&mut contents).unwrap();
    // contents += js_content.as_str();
    // println!("js file contents: {}", contents);
    if !resize {
        let _window = tauri::WindowBuilder::new(
            &handle,
            app_name.clone(), /* the unique window label */
            tauri::WindowUrl::External(app_url.parse().unwrap()),
        )
        .title(app_name.clone())
        .inner_size(width, height)
        .user_agent(user_agent.as_str())
        .initialization_script(include_str!("../inject/websocket.js"))
        .center()
        .build()
        .unwrap();
    }
}
