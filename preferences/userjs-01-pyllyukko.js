//
/******************************************************************************
 * user.js                                                                    *
 * https://github.com/pyllyukko/user.js                                       *
 ******************************************************************************/

// PREF: Disable WebRTC getUserMedia, screen sharing, audio capture, video capture
// https://wiki.mozilla.org/Media/getUserMedia
// https://blog.mozilla.org/futurereleases/2013/01/12/capture-local-camera-and-microphone-streams-with-getusermedia-now-enabled-in-firefox/
// https://developer.mozilla.org/en-US/docs/Web/API/Navigator
pref("media.navigator.video.enabled",			false);

// PREF: Disable speech recognition
// https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
// https://wiki.mozilla.org/HTML5_Speech_API
pref("media.webspeech.recognition.enable",			false);

// PREF: Set File URI Origin Policy
// http://kb.mozillazine.org/Security.fileuri.strict_origin_policy
// CIS Mozilla Firefox 24 ESR v1.0.0 - 3.8
pref("security.fileuri.strict_origin_policy",		true);

// PREF: Enable only whitelisted URL protocol handlers
// http://kb.mozillazine.org/Network.protocol-handler.external-default
// http://kb.mozillazine.org/Network.protocol-handler.warn-external-default
// http://kb.mozillazine.org/Network.protocol-handler.expose.%28protocol%29
// https://news.ycombinator.com/item?id=13047883
// https://bugzilla.mozilla.org/show_bug.cgi?id=167475
// https://github.com/pyllyukko/user.js/pull/285#issuecomment-298124005
// NOTICE: Disabling nonessential protocols breaks all interaction with custom protocols such as mailto:, irc:, magnet: ... and breaks opening third-party mail/messaging/torrent/... clients when clicking on links with these protocols
// TODO: Add externally-handled protocols from Windows 8.1 and Windows 10 (currently contains protocols only from Linux and Windows 7) that might pose a similar threat (see e.g. https://news.ycombinator.com/item?id=13044991)
// TODO: Add externally-handled protocols from Mac OS X that might pose a similar threat (see e.g. https://news.ycombinator.com/item?id=13044991)
// If you want to enable a protocol, set network.protocol-handler.expose.(protocol) to true and network.protocol-handler.external.(protocol) to:
//   * true, if the protocol should be handled by an external application
//   * false, if the protocol should be handled internally by Firefox
pref("network.protocol-handler.warn-external-default",	true);
pref("network.protocol-handler.external.http",		false);
pref("network.protocol-handler.external.https",		false);
pref("network.protocol-handler.external.javascript",	false);
pref("network.protocol-handler.external.moz-extension",	false);
pref("network.protocol-handler.external.ftp",		false);
pref("network.protocol-handler.external.file",		false);
pref("network.protocol-handler.external.about",		false);
pref("network.protocol-handler.external.chrome",		false);
pref("network.protocol-handler.external.blob",		false);
pref("network.protocol-handler.external.data",		false);
pref("network.protocol-handler.expose-all",		false);
pref("network.protocol-handler.expose.http",		true);
pref("network.protocol-handler.expose.https",		true);
pref("network.protocol-handler.expose.javascript",		true);
pref("network.protocol-handler.expose.moz-extension",	true);
pref("network.protocol-handler.expose.ftp",		true);
pref("network.protocol-handler.expose.file",		true);
pref("network.protocol-handler.expose.about",		true);
pref("network.protocol-handler.expose.chrome",		true);
pref("network.protocol-handler.expose.blob",		true);
pref("network.protocol-handler.expose.data",		true);

// PREF: Disable Shumway (Mozilla Flash renderer)
// https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Shumway
pref("shumway.disabled", true);

// PREF: Reject .onion hostnames before passing the to DNS
// https://bugzilla.mozilla.org/show_bug.cgi?id=1228457
// RFC 7686
pref("network.dns.blockDotOnion",				true);

// PREF: Enable Subresource Integrity
// https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
// https://wiki.mozilla.org/Security/Subresource_Integrity
pref("security.sri.enable",				true);

// PREF: Display a notification bar when websites offer data for offline use
// http://kb.mozillazine.org/Browser.offline-apps.notify
pref("browser.offline-apps.notify",			true);
