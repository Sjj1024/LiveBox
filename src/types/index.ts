export interface LiveInfo {
    room_info: string
    ttwid: string
}

export interface DPlayerImp {
    seek: (t: number) => void
    destroy: () => void
    play: () => void
}
