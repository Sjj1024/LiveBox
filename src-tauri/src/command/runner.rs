use crate::command::model::LiveInfo;
use regex::Regex;
use reqwest::Client;

// 定义抖音请求结构体
pub struct DouYinReq {
    request: Client,
    room_url: String,
    room_info: String,
}

// 为抖音请求的结构体添加方法
impl DouYinReq {
    pub fn new(url: &str) -> Self {
        let client = Client::builder().cookie_store(true).build().unwrap();
        DouYinReq {
            request: client,
            room_url: String::from(url),
            room_info: String::from(""),
        }
    }

    pub async fn get_room_info(&mut self) -> Result<LiveInfo, Box<dyn std::error::Error>> {
        println!("获取直播间的room_info: {}", self.room_url);
        let mut headers = reqwest::header::HeaderMap::new();
        headers.insert("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7".parse()?);
        headers.insert("accept-language", "zh-CN,zh;q=0.9,en;q=0.8".parse()?);
        headers.insert("cache-control", "max-age=0".parse()?);
        headers.insert("cookie", "has_avx2=null; device_web_cpu_core=8; device_web_memory_size=8; live_use_vvc=%22false%22; xgplayer_user_id=903249300469; csrf_session_id=e2291ffdef635bf0666cf1a399de55de; webcast_local_quality=sd; SEARCH_RESULT_LIST_TYPE=%22single%22; bd_ticket_guard_client_web_domain=2; passport_csrf_token=644447c8fab148b9d360fdda67a1c4f8; passport_csrf_token_default=644447c8fab148b9d360fdda67a1c4f8; passport_assist_user=Cj2OyRQMJT-e_Yzf449bZPEv0yUeH6BvdNRi_8h6CtjL9f25qppJm9BSLatEfMUCnczMIxVgMYDWHw364CG_GkoKPOLAdamXQxwSIWj12fJ2HNDAzmKpcbYG_dL6XR46fpnifsYZHT0z_Z_o1N8bgNfGp2ung2BIO__buAxCBRCn0s4NGImv1lQgASIBA6XIvQ8%3D; n_mh=nNwOatDm453msvu0tqEj4bZm3NsIprwo6zSkIjLfICk; sso_uid_tt=25ba3d5cf4d058bf184ba57854a3853e; sso_uid_tt_ss=25ba3d5cf4d058bf184ba57854a3853e; toutiao_sso_user=561cc4c4cf742716616ebfd519d93768; toutiao_sso_user_ss=561cc4c4cf742716616ebfd519d93768; sid_ucp_sso_v1=1.0.0-KDUwODgyZmE5YzRjZGYxYjM2ZDE4ZDM5OWY3NDBiZGM4ZmE3YmFiM2MKHwj1jJ219wIQzs7vsAYY7zEgDDD-jcTZBTgGQPQHSAYaAmhsIiA1NjFjYzRjNGNmNzQyNzE2NjE2ZWJmZDUxOWQ5Mzc2OA; ssid_ucp_sso_v1=1.0.0-KDUwODgyZmE5YzRjZGYxYjM2ZDE4ZDM5OWY3NDBiZGM4ZmE3YmFiM2MKHwj1jJ219wIQzs7vsAYY7zEgDDD-jcTZBTgGQPQHSAYaAmhsIiA1NjFjYzRjNGNmNzQyNzE2NjE2ZWJmZDUxOWQ5Mzc2OA; passport_auth_status=854512750fb9b055d3809c2222eba72c%2C; passport_auth_status_ss=854512750fb9b055d3809c2222eba72c%2C; uid_tt=66858707d0775da51ae9674c1c591c27; uid_tt_ss=66858707d0775da51ae9674c1c591c27; sid_tt=c5061d6aae3b61f174b0c0696c6b7418; sessionid=c5061d6aae3b61f174b0c0696c6b7418; sessionid_ss=c5061d6aae3b61f174b0c0696c6b7418; _bd_ticket_crypt_doamin=2; _bd_ticket_crypt_cookie=bfcf62e1ae0bb79801498b683a86f505; __security_server_data_status=1; sid_guard=c5061d6aae3b61f174b0c0696c6b7418%7C1713104723%7C5183998%7CThu%2C+13-Jun-2024+14%3A25%3A21+GMT; sid_ucp_v1=1.0.0-KDY3ZWE2NzI3NDg3NjFjOWFlZjQ1ZmE0ZDE0OGI5NTY5NmYyMmE3MTcKGQj1jJ219wIQ087vsAYY7zEgDDgGQPQHSAQaAmxxIiBjNTA2MWQ2YWFlM2I2MWYxNzRiMGMwNjk2YzZiNzQxOA; ssid_ucp_v1=1.0.0-KDY3ZWE2NzI3NDg3NjFjOWFlZjQ1ZmE0ZDE0OGI5NTY5NmYyMmE3MTcKGQj1jJ219wIQ087vsAYY7zEgDDgGQPQHSAQaAmxxIiBjNTA2MWQ2YWFlM2I2MWYxNzRiMGMwNjk2YzZiNzQxOA; s_v_web_id=verify_luzmbzzg_wsuYknjY_Tc27_468O_9tHB_sKsLLWh3qV2R; ttwid=1%7CngabJA52sDUnYMxFKTFQmYEe2_RYNkefWVWEfuA53Mo%7C1713104743%7C34512c898d125865794d949a2477dda7493530c850da7c59a19c32a46642876c; LOGIN_STATUS=1; store-region=cn-sh; store-region-src=uid; publish_badge_show_info=%220%2C0%2C0%2C1714188960632%22; volume_info=%7B%22isUserMute%22%3Afalse%2C%22isMute%22%3Atrue%2C%22volume%22%3A0.6%7D; stream_recommend_feed_params=%22%7B%5C%22cookie_enabled%5C%22%3Atrue%2C%5C%22screen_width%5C%22%3A1470%2C%5C%22screen_height%5C%22%3A956%2C%5C%22browser_online%5C%22%3Atrue%2C%5C%22cpu_core_num%5C%22%3A8%2C%5C%22device_memory%5C%22%3A8%2C%5C%22downlink%5C%22%3A10%2C%5C%22effective_type%5C%22%3A%5C%224g%5C%22%2C%5C%22round_trip_time%5C%22%3A200%7D%22; strategyABtestKey=%221714189004.807%22; webcast_leading_last_show_time=1714189045348; webcast_leading_total_show_times=6; __live_version__=%221.1.1.9879%22; FOLLOW_LIVE_POINT_INFO=%22MS4wLjABAAAAdWaAD1s4nTXy5AWB9YQOjjVuEBSdF9Ke149hLM64PdY%2F1714233600000%2F0%2F0%2F1714215078555%22; FOLLOW_NUMBER_YELLOW_POINT_INFO=%22MS4wLjABAAAAdWaAD1s4nTXy5AWB9YQOjjVuEBSdF9Ke149hLM64PdY%2F1714233600000%2F0%2F1714214478555%2F0%22; passport_fe_beating_status=true; download_guide=%223%2F20240427%2F0%22; home_can_add_dy_2_desktop=%221%22; pwa2=%220%7C0%7C3%7C0%22; __ac_nonce=0662cd7bb00365383c41; __ac_signature=_02B4Z6wo00f01CXmuJwAAIDDdxmYhyaqaAglxrwAAG9c5BKd035mkv0aWuHT5.B6XgeFC-vvGuX4JgBV0ExZ0N.P5fFlhkfuwOam9askMq120O4j4k80SiSu9eVCx7llvUbc0L38xoSU.Iztae; xg_device_score=7.4571195567119375; live_can_add_dy_2_desktop=%221%22; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCRHpRSzBPc3RkRE5EOEIxVVM2QUhibjFxeGFEK0FCYkljbmMzeWxwMC9ZVE5SVks4cUZQTEtTSFRjbGtZdys2NnlpR1hEdDVsT05XaHd6UDFScWUrbUE9IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoxfQ%3D%3D; msToken=dkS_SWd4Y0gsRB3GqURAf762ahdZlFp8lnIe5X99t-lSKMPg7ly9UIa4MZtcIS6gtJS_GkR2qE_V3WZfqOihnoDO2Td2BZlE0ZTYfHzH3memmRkD256iF9-MJUWi; odin_tt=441e6d35a29801763dc3805e40897a3197ad8eb3dede1b88ebda81998f313f13820db809f050a325915ac1347cb213ba; IsDouyinActive=false; msToken=ckrB5duL8xVXFP110HedaLvZk2iXY6ADOnnYAk3wQiInRW7veHIyuMdqd47VCyM-wNyW6ZpY6f7YqTH4Hwrwne--fd8bLF9qLOWgvIB3MG47BhPkkBNiDL77xuyU; ttwid=1%7CngabJA52sDUnYMxFKTFQmYEe2_RYNkefWVWEfuA53Mo%7C1713104743%7C34512c898d125865794d949a2477dda7493530c850da7c59a19c32a46642876c".parse()?);
        headers.insert("priority", "u=0, i".parse()?);
        headers.insert("referer", "https://live.douyin.com/972176515698?_ct=1714214842847&action_type=click&enter_from_merge=web_search&enter_method=web_video_head&enter_method_temai=web_video_head&group_id=undefined&is_livehead_preview_mini_window_show=&mini_window_show_type=&preview_info_str=eyJ1cmwiOiIiLCJsb3dVcmwiOiIiLCJ1aWQiOiIxMDA3NzQ5MjE4NDUiLCJ1dWlkIjoiNzM0NzE0NTY1MzUwMjAxOTEyNiIsImlzX211bHRpcGxlIjowLCJpc19wYWlkIjowLCJpc19tdWx0aV9jYW1lcmEiOjAsInJlc29sdXRpb25zIjpbXX0%3D&request_id=2024042718421695936492028C53AC640D&room_info=7362491920259713818&search_tab=aweme_general&_ct=1714214842848".parse()?);
        headers.insert(
            "sec-ch-ua",
            "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\""
                .parse()?,
        );
        headers.insert("sec-ch-ua-mobile", "?0".parse()?);
        headers.insert("sec-ch-ua-platform", "\"macOS\"".parse()?);
        headers.insert("sec-fetch-dest", "document".parse()?);
        headers.insert("sec-fetch-mode", "navigate".parse()?);
        headers.insert("sec-fetch-site", "same-origin".parse()?);
        headers.insert("sec-fetch-user", "?1".parse()?);
        headers.insert("upgrade-insecure-requests", "1".parse()?);
        headers.insert("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36".parse()?);
        let request = self.request.get(self.room_url.clone()).headers(headers);
        let response = request.send().await?;
        // 先使用cookie，再使用text
        let cookies = response.cookies();
        let mut ttwid = String::new();
        for c in cookies {
            println!("cookies: {:?} value:{:?}", c.name(), c.value());
            if c.name() == "ttwid" {
                ttwid = c.value().to_string();
            }
        }
        // 获取cookie里面的ttwid
        let body = response.text().await?;
        // println!("获取的直播间HTML内容是：{}", body);
        // 判断是不是已经停播了，是的话仅获取主播头像
        // 使用正则表达式匹配直播间信息
        let re;
        let mut unique_id = "";
        if body.contains(r#"status\":4"#) {
            println!("主播已停播了");
            // 使用正则表达式匹配直播间信息
            re = Regex::new(r#"anchor\\":(.*?),\\"open_id_str"#).unwrap();
        } else {
            // 使用正则表达式匹配直播间信息
            re = Regex::new(r#"roomInfo\\":\{\\"room\\":(.*?),\\"toolbar_data"#).unwrap();
            let unique_re = Regex::new(r#"user_unique_id\\":\\"(.*?)\\"}"#).unwrap();
            unique_id = unique_re.captures(&body).unwrap().get(1).unwrap().as_str();
        }
        let main_info = re.captures(&body).unwrap().get(1).unwrap().as_str();
        // 替换里面的双引号,方便json解析
        let room_info = String::from(main_info) + "}";
        self.room_info = room_info.replace(r#"\""#, r#"""#);
        // println!("直播间信息是：{}", self.room_info);
        Ok(LiveInfo {
            room_info: self.room_info.clone(),
            ttwid,
            unique_id: String::from(unique_id),
        })
    }

    // pub async fn get_rank_info(&self) -> Result<(), Box<dyn std::error::Error>> {
    //     let mut headers = reqwest::header::HeaderMap::new();
    //     headers.insert("accept", "application/json, text/plain, */*".parse()?);
    //     headers.insert("accept-language", "zh-CN,zh;q=0.9,en;q=0.8".parse()?);
    //     headers.insert("cache-control", "no-cache".parse()?);
    //     headers.insert("cookie", "has_avx2=null; device_web_cpu_core=8; device_web_memory_size=8; live_use_vvc=%22false%22; xgplayer_user_id=32142398740; csrf_session_id=b154f2eb3608feb421dd6c9fe24bc2d4; odin_tt=a5b308e92c2f826f447b22425cb49c1faa5a13b64c07a6f7309186819371d4c74fe5dcf480e52fe2931fba91397a83a31c94e2df31a3735b839683d58bf010781b5c5f61c231ab52f5ecfbc03f80ff23; passport_csrf_token=6bc63b63e5fe245d323c824928bc812e; passport_csrf_token_default=6bc63b63e5fe245d323c824928bc812e; bd_ticket_guard_client_web_domain=2; webcast_local_quality=sd; SEARCH_RESULT_LIST_TYPE=%22single%22; ttwid=1%7CUOwlzl-VvV0COewDTk3CsEdp4EMg8CUFA-ICTdsrLQw%7C1712887757%7Cb40c2475ea6f287e8da8722ef9dfcb4b1b9d35e05158a6fc6dbc3282a4caf15a; __ac_nonce=0662a095500344b59f1a0; __ac_signature=_02B4Z6wo00f01OHJxKwAAIDDszbktR5C2nTh6cAAAF5e7JV0RQje.O9NY-t5t6vN9NKbPcnfXMkFfQLkfKLc17gPyPteEs6w5xUu7in-FxDZfmcOuSUKGOIUEeUxSuh0vbz9E.lVYSPp2boo0f; webcast_leading_last_show_time=1714030934972; webcast_leading_total_show_times=4; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCRExvdFozTlZJU3ZpQjZ3YzREeHdSdTYwaVY1eTIwUzM1UytLTllwTUs0Tmxoc3M3Z1ZjdFpYWmhiQ0ZWTzYrNEVsSGd0U25GM1BERWc4UFgvZFFodVE9IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoxfQ%3D%3D; download_guide=%223%2F20240425%2F0%22; pwa2=%220%7C0%7C3%7C0%22; FORCE_LOGIN=%7B%22videoConsumedRemainSeconds%22%3A180%2C%22isForcePopClose%22%3A1%7D; home_can_add_dy_2_desktop=%221%22; __live_version__=%221.1.1.9809%22; xg_device_score=7.541386294591826; live_can_add_dy_2_desktop=%220%22; IsDouyinActive=true; msToken=LrwiNPyulLPWEKS-5jj4OvncuOKQA8y4qFfo1j-JN2Yw3-eg_j-DrE_CKTQmOz44dwG26uOxevFyITDrkPwx82M4k4XvQ8zgm3MjnQDDmtZ89Yikpkve-kRMQSuo; msToken=Qj3DmdHUf10MnlDFyLJeQaF1tLaXa93UwyL2V84tV9u8B0JAp1RuVZC41Lzw066HS7G2rqUkiQB-7DCWhkiEmQlD3KyucfKG5qPdUY3jEo39oRyafq4M2cpXm8Mv; ttwid=1%7CngabJA52sDUnYMxFKTFQmYEe2_RYNkefWVWEfuA53Mo%7C1713104743%7C34512c898d125865794d949a2477dda7493530c850da7c59a19c32a46642876c".parse()?);
    //     headers.insert("pragma", "no-cache".parse()?);
    //     headers.insert("priority", "u=1, i".parse()?);
    //     headers.insert(
    //         "sec-ch-ua",
    //         "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\""
    //             .parse()?,
    //     );
    //     headers.insert("sec-ch-ua-mobile", "?0".parse()?);
    //     headers.insert("sec-ch-ua-platform", "\"macOS\"".parse()?);
    //     headers.insert("sec-fetch-dest", "empty".parse()?);
    //     headers.insert("sec-fetch-mode", "cors".parse()?);
    //     headers.insert("sec-fetch-site", "same-origin".parse()?);
    //     headers.insert("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36".parse()?);
    //     let request = self.request.get(format!("https://live.douyin.com/webcast/ranklist/audience/?aid=6383&app_name=douyin_web&live_id=1&device_platform=web&language=zh-CN&cookie_enabled=true&screen_width=2560&screen_height=1440&browser_language=zh-CN&browser_platform=Win32&browser_name=Chrome&browser_version=117.0.0.0&webcast_sdk_version=2450&room_info={}&rank_type=30", self.room_info)).headers(headers);
    //     let response = request.send().await?;
    //     let json_value = response.text().await?;
    //     println!("rank json value:{json_value:?}");
    //     Ok(())
    // }
}
