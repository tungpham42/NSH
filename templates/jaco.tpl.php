<script type="text/javascript">
(function(e, t) {
    function i(e, t) {
        e[t] = function() {
            e.push([ t ].concat(Array.prototype.slice.call(arguments, 0)));
        };
    }
    function s() {
        var e = t.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i), n = e ? e[0] : null, i = "; domain=." + n + "; path=/";
        t.referrer && t.referrer.indexOf(n) === -1 ? t.cookie = "jaco_referer=" + t.referrer + i : t.cookie = "jaco_referer=" + r + i;
    }
    var n = "JacoRecorder", r = "none";
    (function(e, t, r, o) {
        if (!r.__VERSION) {
            e[n] = r;
            var u = [ "init", "identify", "startRecording", "stopRecording", "removeUserTracking", "setUserInfo" ];
            for (var a = 0; a < u.length; a++) i(r, u[a]);
            s(), r.__VERSION = 2.1, r.__INIT_TIME = 1 * new Date;
            var f = t.createElement("script");
            f.async = !0, f.setAttribute("crossorigin", "anonymous"), f.src = o;
            var l = t.getElementsByTagName("head")[0];
            l.appendChild(f);
        }
    })(e, t, e[n] || [], "https://recorder-assets.getjaco.com/recorder_v2.js");
}).call(window, window, document), window.JacoRecorder.push([ "init", "1f5edc45-249d-4356-90cb-1a875a5135bd", {} ]);
</script>