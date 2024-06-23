import http from '@/utils/http'
import { ResponseType } from '@tauri-apps/api/http'

export default {
    get_live_html(url: string) {
        return http(url, {
            method: 'get',
            responseType: ResponseType.Text,
        })
    },
}
