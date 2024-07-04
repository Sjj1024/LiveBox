export interface LiveInfoImp {
    room_info: string
    ttwid: string
    unique_id: string
}

export interface DPlayerImp {
    seek: (t: number) => void
    destroy: () => void
    play: () => void
}

export interface MessageImp {
    id: string
    name: string
    msg: string
}
