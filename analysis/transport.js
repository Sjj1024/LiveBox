'use strict'
;(self.webpackChunkdouyin_live_v2 = self.webpackChunkdouyin_live_v2 || []).push(
    [
        [2986],
        {
            69949: function (e, t, r) {
                r.r(t),
                    r.d(t, {
                        default: function () {
                            return i
                        },
                        webcast: function () {
                            return y
                        },
                    }),
                    r(6339)
                var n = r(72735),
                    s = n.Reader,
                    a = n.Writer,
                    o = n.util,
                    i = n.roots.transport || (n.roots.transport = {})
                function l(e, t) {
                    for (let r in t) e.prototype[r] = t[r]
                }
                function u(e, t, r, n) {
                    var s = e[r[0]],
                        a = 1 & r[2],
                        o = (r[2] >> 1) & 1,
                        i = (r[2] >> 2) & 1
                    if (o) {
                        if (
                            ((s && s.length) || (e[r[0]] = []),
                            i && (7 & n) == 2)
                        )
                            for (var l = t.uint32() + t.pos; t.pos < l; )
                                e[r[0]].push(r[1].call(t))
                        else e[r[0]].push(r[1].call(t, t, a && t.uint32()))
                    } else e[r[0]] = r[1].call(t, t, a && t.uint32())
                }
                var c = o.zeroLong || o.Long.fromBits(0, 0, !1),
                    p = o.zeroULong || o.Long.fromBits(0, 0, !0),
                    y = (i.webcast = (() => {
                        let e = {}
                        return (
                            (e.im = (function () {
                                let e = {}
                                return (
                                    (e.PushHeader = (function () {
                                        function e(e) {
                                            if (e)
                                                for (
                                                    var t = Object.keys(e),
                                                        r = 0;
                                                    r < t.length;
                                                    ++r
                                                )
                                                    null != e[t[r]] &&
                                                        (this[t[r]] = e[t[r]])
                                        }
                                        return (
                                            l(e, {
                                                key: '',
                                                value: '',
                                            }),
                                            (e.encode = function (e, t) {
                                                return (
                                                    t || (t = a.create()),
                                                    null != e.key &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'key'
                                                        ) &&
                                                        t
                                                            .uint32(10)
                                                            .string(e.key),
                                                    null != e.value &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'value'
                                                        ) &&
                                                        t
                                                            .uint32(18)
                                                            .string(e.value),
                                                    t
                                                )
                                            }),
                                            (e.decode = function (e, t) {
                                                e instanceof s ||
                                                    (e = s.create(e))
                                                for (
                                                    var r =
                                                            void 0 === t
                                                                ? e.len
                                                                : e.pos + t,
                                                        n =
                                                            new i.webcast.im.PushHeader(
                                                                i.webcast.im.PushHeader.prototype
                                                            ),
                                                        a = {
                                                            1: [
                                                                'key',
                                                                e.string,
                                                                0,
                                                            ],
                                                            2: [
                                                                'value',
                                                                e.string,
                                                                0,
                                                            ],
                                                        };
                                                    e.pos < r;

                                                ) {
                                                    var o = e.uint32(),
                                                        l = o >>> 3
                                                    if (a[l]) {
                                                        u(n, e, a[l], o)
                                                        continue
                                                    }
                                                    e.skipType(7 & o)
                                                }
                                                return n
                                            }),
                                            (e.getTypeUrl = function (e) {
                                                return (
                                                    void 0 === e &&
                                                        (e =
                                                            'type.googleapis.com'),
                                                    e + '/webcast.im.PushHeader'
                                                )
                                            }),
                                            e
                                        )
                                    })()),
                                    (e.PushFrame = (function () {
                                        function e(e) {
                                            if (((this.headers = []), e))
                                                for (
                                                    var t = Object.keys(e),
                                                        r = 0;
                                                    r < t.length;
                                                    ++r
                                                )
                                                    null != e[t[r]] &&
                                                        (this[t[r]] = e[t[r]])
                                        }
                                        return (
                                            l(e, {
                                                SeqID: c,
                                                LogID: c,
                                                service: 0,
                                                method: 0,
                                                headers: o.emptyArray,
                                                payload_encoding: '',
                                                payload_type: '',
                                                payload: o.newBuffer([]),
                                                LodIDNew: '',
                                            }),
                                            (e.encode = function (e, t) {
                                                if (
                                                    (t || (t = a.create()),
                                                    null != e.SeqID &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'SeqID'
                                                        ) &&
                                                        t
                                                            .uint32(8)
                                                            .uint64(e.SeqID),
                                                    null != e.LogID &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'LogID'
                                                        ) &&
                                                        t
                                                            .uint32(16)
                                                            .uint64(e.LogID),
                                                    null != e.service &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'service'
                                                        ) &&
                                                        t
                                                            .uint32(24)
                                                            .int32(e.service),
                                                    null != e.method &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'method'
                                                        ) &&
                                                        t
                                                            .uint32(32)
                                                            .int32(e.method),
                                                    null != e.headers &&
                                                        e.headers.length)
                                                )
                                                    for (
                                                        var r = 0;
                                                        r < e.headers.length;
                                                        ++r
                                                    )
                                                        i.webcast.im.PushHeader.encode(
                                                            e.headers[r],
                                                            t.uint32(42).fork()
                                                        ).ldelim()
                                                return (
                                                    null !=
                                                        e.payload_encoding &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'payload_encoding'
                                                        ) &&
                                                        t
                                                            .uint32(50)
                                                            .string(
                                                                e.payload_encoding
                                                            ),
                                                    null != e.payload_type &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'payload_type'
                                                        ) &&
                                                        t
                                                            .uint32(58)
                                                            .string(
                                                                e.payload_type
                                                            ),
                                                    null != e.payload &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'payload'
                                                        ) &&
                                                        t
                                                            .uint32(66)
                                                            .bytes(e.payload),
                                                    null != e.LodIDNew &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'LodIDNew'
                                                        ) &&
                                                        t
                                                            .uint32(74)
                                                            .string(e.LodIDNew),
                                                    t
                                                )
                                            }),
                                            (e.decode = function (e, t) {
                                                e instanceof s ||
                                                    (e = s.create(e))
                                                for (
                                                    var r =
                                                            void 0 === t
                                                                ? e.len
                                                                : e.pos + t,
                                                        n =
                                                            new i.webcast.im.PushFrame(
                                                                i.webcast.im.PushFrame.prototype
                                                            ),
                                                        a = {
                                                            1: [
                                                                'SeqID',
                                                                e.uint64String,
                                                                0,
                                                            ],
                                                            2: [
                                                                'LogID',
                                                                e.uint64String,
                                                                0,
                                                            ],
                                                            3: [
                                                                'service',
                                                                e.int32,
                                                                0,
                                                            ],
                                                            4: [
                                                                'method',
                                                                e.int32,
                                                                0,
                                                            ],
                                                            5: [
                                                                'headers',
                                                                i.webcast.im
                                                                    .PushHeader
                                                                    .decode,
                                                                3,
                                                            ],
                                                            6: [
                                                                'payload_encoding',
                                                                e.string,
                                                                0,
                                                            ],
                                                            7: [
                                                                'payload_type',
                                                                e.string,
                                                                0,
                                                            ],
                                                            8: [
                                                                'payload',
                                                                e.bytes,
                                                                0,
                                                            ],
                                                            9: [
                                                                'LodIDNew',
                                                                e.string,
                                                                0,
                                                            ],
                                                        };
                                                    e.pos < r;

                                                ) {
                                                    var o = e.uint32(),
                                                        l = o >>> 3
                                                    if (a[l]) {
                                                        u(n, e, a[l], o)
                                                        continue
                                                    }
                                                    e.skipType(7 & o)
                                                }
                                                return n
                                            }),
                                            (e.getTypeUrl = function (e) {
                                                return (
                                                    void 0 === e &&
                                                        (e =
                                                            'type.googleapis.com'),
                                                    e + '/webcast.im.PushFrame'
                                                )
                                            }),
                                            e
                                        )
                                    })()),
                                    (e.PayloadInIm = (function () {
                                        function e(e) {
                                            if (((this.Payloads = {}), e))
                                                for (
                                                    var t = Object.keys(e),
                                                        r = 0;
                                                    r < t.length;
                                                    ++r
                                                )
                                                    null != e[t[r]] &&
                                                        (this[t[r]] = e[t[r]])
                                        }
                                        return (
                                            l(e, {
                                                Payloads: o.emptyObject,
                                                CompressType: 0,
                                            }),
                                            (e.encode = function (e, t) {
                                                if (
                                                    (t || (t = a.create()),
                                                    null != e.Payloads &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'Payloads'
                                                        ))
                                                )
                                                    for (
                                                        var r = Object.keys(
                                                                e.Payloads
                                                            ),
                                                            n = 0;
                                                        n < r.length;
                                                        ++n
                                                    )
                                                        t.uint32(10)
                                                            .fork()
                                                            .uint32(10)
                                                            .string(r[n])
                                                            .uint32(18)
                                                            .bytes(
                                                                e.Payloads[r[n]]
                                                            )
                                                            .ldelim()
                                                return (
                                                    null != e.CompressType &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'CompressType'
                                                        ) &&
                                                        t
                                                            .uint32(16)
                                                            .int32(
                                                                e.CompressType
                                                            ),
                                                    t
                                                )
                                            }),
                                            (e.decode = function (e, t) {
                                                e instanceof s ||
                                                    (e = s.create(e))
                                                for (
                                                    var r,
                                                        n,
                                                        a =
                                                            void 0 === t
                                                                ? e.len
                                                                : e.pos + t,
                                                        l =
                                                            new i.webcast.im.PayloadInIm(
                                                                i.webcast.im.PayloadInIm.prototype
                                                            ),
                                                        c = {
                                                            2: [
                                                                'CompressType',
                                                                e.int32,
                                                                0,
                                                            ],
                                                        };
                                                    e.pos < a;

                                                ) {
                                                    var p = e.uint32(),
                                                        y = p >>> 3
                                                    if (c[y]) {
                                                        u(l, e, c[y], p)
                                                        continue
                                                    }
                                                    if (1 === y) {
                                                        l.Payloads ===
                                                            o.emptyObject &&
                                                            (l.Payloads = {})
                                                        var d =
                                                            e.uint32() + e.pos
                                                        for (
                                                            r = '', n = [];
                                                            e.pos < d;

                                                        ) {
                                                            var _ = e.uint32()
                                                            switch (_ >>> 3) {
                                                                case 1:
                                                                    r =
                                                                        e.string()
                                                                    break
                                                                case 2:
                                                                    n =
                                                                        e.bytes()
                                                                    break
                                                                default:
                                                                    e.skipType(
                                                                        7 & _
                                                                    )
                                                            }
                                                        }
                                                        l.Payloads[r] = n
                                                    } else e.skipType(7 & p)
                                                }
                                                return l
                                            }),
                                            (e.getTypeUrl = function (e) {
                                                return (
                                                    void 0 === e &&
                                                        (e =
                                                            'type.googleapis.com'),
                                                    e +
                                                        '/webcast.im.PayloadInIm'
                                                )
                                            }),
                                            (e.CompressTypeEnum = (function () {
                                                let e = {},
                                                    t = Object.create(e)
                                                return (
                                                    (t[(e[0] = 'NONE')] = 0),
                                                    (t[(e[1] = 'ZLIB')] = 1),
                                                    (t[(e[2] = 'ZSTD')] = 2),
                                                    t
                                                )
                                            })()),
                                            e
                                        )
                                    })()),
                                    (e.Response = (function () {
                                        function e(e) {
                                            if (
                                                ((this.messages = []),
                                                (this.route_params = {}),
                                                e)
                                            )
                                                for (
                                                    var t = Object.keys(e),
                                                        r = 0;
                                                    r < t.length;
                                                    ++r
                                                )
                                                    null != e[t[r]] &&
                                                        (this[t[r]] = e[t[r]])
                                        }
                                        return (
                                            l(e, {
                                                messages: o.emptyArray,
                                                cursor: '',
                                                fetch_interval: p,
                                                now: p,
                                                internal_ext: '',
                                                fetch_type: 0,
                                                route_params: o.emptyObject,
                                                heartbeat_duration: p,
                                                need_ack: !1,
                                                push_server: '',
                                                live_cursor: '',
                                                history_no_more: !1,
                                                proxy_server: '',
                                            }),
                                            (e.encode = function (e, t) {
                                                if (
                                                    (t || (t = a.create()),
                                                    null != e.messages &&
                                                        e.messages.length)
                                                )
                                                    for (
                                                        var r = 0;
                                                        r < e.messages.length;
                                                        ++r
                                                    )
                                                        i.webcast.im.Message.encode(
                                                            e.messages[r],
                                                            t.uint32(10).fork()
                                                        ).ldelim()
                                                if (
                                                    (null != e.cursor &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'cursor'
                                                        ) &&
                                                        t
                                                            .uint32(18)
                                                            .string(e.cursor),
                                                    null != e.fetch_interval &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'fetch_interval'
                                                        ) &&
                                                        t
                                                            .uint32(24)
                                                            .int64(
                                                                e.fetch_interval
                                                            ),
                                                    null != e.now &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'now'
                                                        ) &&
                                                        t
                                                            .uint32(32)
                                                            .int64(e.now),
                                                    null != e.internal_ext &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'internal_ext'
                                                        ) &&
                                                        t
                                                            .uint32(42)
                                                            .string(
                                                                e.internal_ext
                                                            ),
                                                    null != e.fetch_type &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'fetch_type'
                                                        ) &&
                                                        t
                                                            .uint32(48)
                                                            .int32(
                                                                e.fetch_type
                                                            ),
                                                    null != e.route_params &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'route_params'
                                                        ))
                                                )
                                                    for (
                                                        var n = Object.keys(
                                                                e.route_params
                                                            ),
                                                            r = 0;
                                                        r < n.length;
                                                        ++r
                                                    )
                                                        t.uint32(58)
                                                            .fork()
                                                            .uint32(10)
                                                            .string(n[r])
                                                            .uint32(18)
                                                            .string(
                                                                e.route_params[
                                                                    n[r]
                                                                ]
                                                            )
                                                            .ldelim()
                                                return (
                                                    null !=
                                                        e.heartbeat_duration &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'heartbeat_duration'
                                                        ) &&
                                                        t
                                                            .uint32(64)
                                                            .int64(
                                                                e.heartbeat_duration
                                                            ),
                                                    null != e.need_ack &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'need_ack'
                                                        ) &&
                                                        t
                                                            .uint32(72)
                                                            .bool(e.need_ack),
                                                    null != e.push_server &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'push_server'
                                                        ) &&
                                                        t
                                                            .uint32(82)
                                                            .string(
                                                                e.push_server
                                                            ),
                                                    null != e.live_cursor &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'live_cursor'
                                                        ) &&
                                                        t
                                                            .uint32(90)
                                                            .string(
                                                                e.live_cursor
                                                            ),
                                                    null != e.history_no_more &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'history_no_more'
                                                        ) &&
                                                        t
                                                            .uint32(96)
                                                            .bool(
                                                                e.history_no_more
                                                            ),
                                                    null != e.proxy_server &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'proxy_server'
                                                        ) &&
                                                        t
                                                            .uint32(106)
                                                            .string(
                                                                e.proxy_server
                                                            ),
                                                    t
                                                )
                                            }),
                                            (e.decode = function (e, t) {
                                                e instanceof s ||
                                                    (e = s.create(e))
                                                for (
                                                    var r,
                                                        n,
                                                        a =
                                                            void 0 === t
                                                                ? e.len
                                                                : e.pos + t,
                                                        l =
                                                            new i.webcast.im.Response(
                                                                i.webcast.im.Response.prototype
                                                            ),
                                                        c = {
                                                            1: [
                                                                'messages',
                                                                i.webcast.im
                                                                    .Message
                                                                    .decode,
                                                                3,
                                                            ],
                                                            2: [
                                                                'cursor',
                                                                e.string,
                                                                0,
                                                            ],
                                                            3: [
                                                                'fetch_interval',
                                                                e.int64String,
                                                                0,
                                                            ],
                                                            4: [
                                                                'now',
                                                                e.int64String,
                                                                0,
                                                            ],
                                                            5: [
                                                                'internal_ext',
                                                                e.string,
                                                                0,
                                                            ],
                                                            6: [
                                                                'fetch_type',
                                                                e.int32,
                                                                0,
                                                            ],
                                                            8: [
                                                                'heartbeat_duration',
                                                                e.int64String,
                                                                0,
                                                            ],
                                                            9: [
                                                                'need_ack',
                                                                e.bool,
                                                                0,
                                                            ],
                                                            10: [
                                                                'push_server',
                                                                e.string,
                                                                0,
                                                            ],
                                                            11: [
                                                                'live_cursor',
                                                                e.string,
                                                                0,
                                                            ],
                                                            12: [
                                                                'history_no_more',
                                                                e.bool,
                                                                0,
                                                            ],
                                                            13: [
                                                                'proxy_server',
                                                                e.string,
                                                                0,
                                                            ],
                                                        };
                                                    e.pos < a;

                                                ) {
                                                    var p = e.uint32(),
                                                        y = p >>> 3
                                                    if (c[y]) {
                                                        u(l, e, c[y], p)
                                                        continue
                                                    }
                                                    if (7 === y) {
                                                        l.route_params ===
                                                            o.emptyObject &&
                                                            (l.route_params =
                                                                {})
                                                        var d =
                                                            e.uint32() + e.pos
                                                        for (
                                                            r = '', n = '';
                                                            e.pos < d;

                                                        ) {
                                                            var _ = e.uint32()
                                                            switch (_ >>> 3) {
                                                                case 1:
                                                                    r =
                                                                        e.string()
                                                                    break
                                                                case 2:
                                                                    n =
                                                                        e.string()
                                                                    break
                                                                default:
                                                                    e.skipType(
                                                                        7 & _
                                                                    )
                                                            }
                                                        }
                                                        l.route_params[r] = n
                                                    } else e.skipType(7 & p)
                                                }
                                                return l
                                            }),
                                            (e.getTypeUrl = function (e) {
                                                return (
                                                    void 0 === e &&
                                                        (e =
                                                            'type.googleapis.com'),
                                                    e + '/webcast.im.Response'
                                                )
                                            }),
                                            e
                                        )
                                    })()),
                                    (e.Message = (function () {
                                        function e(e) {
                                            if (((this.message_extra = {}), e))
                                                for (
                                                    var t = Object.keys(e),
                                                        r = 0;
                                                    r < t.length;
                                                    ++r
                                                )
                                                    null != e[t[r]] &&
                                                        (this[t[r]] = e[t[r]])
                                        }
                                        return (
                                            l(e, {
                                                method: '',
                                                payload: o.newBuffer([]),
                                                msg_id: p,
                                                msg_type: 0,
                                                offset: p,
                                                need_wrds_store: !1,
                                                wrds_version: p,
                                                wrds_sub_key: '',
                                                message_extra: o.emptyObject,
                                            }),
                                            (e.encode = function (e, t) {
                                                if (
                                                    (t || (t = a.create()),
                                                    null != e.method &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'method'
                                                        ) &&
                                                        t
                                                            .uint32(10)
                                                            .string(e.method),
                                                    null != e.payload &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'payload'
                                                        ) &&
                                                        t
                                                            .uint32(18)
                                                            .bytes(e.payload),
                                                    null != e.msg_id &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'msg_id'
                                                        ) &&
                                                        t
                                                            .uint32(24)
                                                            .int64(e.msg_id),
                                                    null != e.msg_type &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'msg_type'
                                                        ) &&
                                                        t
                                                            .uint32(32)
                                                            .int32(e.msg_type),
                                                    null != e.offset &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'offset'
                                                        ) &&
                                                        t
                                                            .uint32(40)
                                                            .int64(e.offset),
                                                    null != e.need_wrds_store &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'need_wrds_store'
                                                        ) &&
                                                        t
                                                            .uint32(48)
                                                            .bool(
                                                                e.need_wrds_store
                                                            ),
                                                    null != e.wrds_version &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'wrds_version'
                                                        ) &&
                                                        t
                                                            .uint32(56)
                                                            .int64(
                                                                e.wrds_version
                                                            ),
                                                    null != e.wrds_sub_key &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'wrds_sub_key'
                                                        ) &&
                                                        t
                                                            .uint32(66)
                                                            .string(
                                                                e.wrds_sub_key
                                                            ),
                                                    null != e.message_extra &&
                                                        Object.hasOwnProperty.call(
                                                            e,
                                                            'message_extra'
                                                        ))
                                                )
                                                    for (
                                                        var r = Object.keys(
                                                                e.message_extra
                                                            ),
                                                            n = 0;
                                                        n < r.length;
                                                        ++n
                                                    )
                                                        t.uint32(74)
                                                            .fork()
                                                            .uint32(10)
                                                            .string(r[n])
                                                            .uint32(18)
                                                            .string(
                                                                e.message_extra[
                                                                    r[n]
                                                                ]
                                                            )
                                                            .ldelim()
                                                return t
                                            }),
                                            (e.decode = function (e, t) {
                                                e instanceof s ||
                                                    (e = s.create(e))
                                                for (
                                                    var r,
                                                        n,
                                                        a =
                                                            void 0 === t
                                                                ? e.len
                                                                : e.pos + t,
                                                        l =
                                                            new i.webcast.im.Message(
                                                                i.webcast.im.Message.prototype
                                                            ),
                                                        c = {
                                                            1: [
                                                                'method',
                                                                e.string,
                                                                0,
                                                            ],
                                                            2: [
                                                                'payload',
                                                                e.bytes,
                                                                0,
                                                            ],
                                                            3: [
                                                                'msg_id',
                                                                e.int64String,
                                                                0,
                                                            ],
                                                            4: [
                                                                'msg_type',
                                                                e.int32,
                                                                0,
                                                            ],
                                                            5: [
                                                                'offset',
                                                                e.int64String,
                                                                0,
                                                            ],
                                                            6: [
                                                                'need_wrds_store',
                                                                e.bool,
                                                                0,
                                                            ],
                                                            7: [
                                                                'wrds_version',
                                                                e.int64String,
                                                                0,
                                                            ],
                                                            8: [
                                                                'wrds_sub_key',
                                                                e.string,
                                                                0,
                                                            ],
                                                        };
                                                    e.pos < a;

                                                ) {
                                                    var p = e.uint32(),
                                                        y = p >>> 3
                                                    if (c[y]) {
                                                        u(l, e, c[y], p)
                                                        continue
                                                    }
                                                    if (9 === y) {
                                                        l.message_extra ===
                                                            o.emptyObject &&
                                                            (l.message_extra =
                                                                {})
                                                        var d =
                                                            e.uint32() + e.pos
                                                        for (
                                                            r = '', n = '';
                                                            e.pos < d;

                                                        ) {
                                                            var _ = e.uint32()
                                                            switch (_ >>> 3) {
                                                                case 1:
                                                                    r =
                                                                        e.string()
                                                                    break
                                                                case 2:
                                                                    n =
                                                                        e.string()
                                                                    break
                                                                default:
                                                                    e.skipType(
                                                                        7 & _
                                                                    )
                                                            }
                                                        }
                                                        l.message_extra[r] = n
                                                    } else e.skipType(7 & p)
                                                }
                                                return l
                                            }),
                                            (e.getTypeUrl = function (e) {
                                                return (
                                                    void 0 === e &&
                                                        (e =
                                                            'type.googleapis.com'),
                                                    e + '/webcast.im.Message'
                                                )
                                            }),
                                            e
                                        )
                                    })()),
                                    e
                                )
                            })()),
                            e
                        )
                    })())
            },
        },
    ]
)
