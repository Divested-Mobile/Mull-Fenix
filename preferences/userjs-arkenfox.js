/******
* name: arkenfox user.js
* date: 02 March 2021
* version 87-alpha
* url: https://github.com/arkenfox/user.js
* license: MIT: https://github.com/arkenfox/user.js/blob/master/LICENSE.txt

* README:

  1. Consider using Tor Browser if it meets your needs or fits your threat model better
       * https://www.torproject.org/about/torusers.html.en
  2. Required reading: Overview, Backing Up, Implementing, and Maintenance entries
       * https://github.com/arkenfox/user.js/wiki
  3. If you skipped step 2, return to step 2
  4. Make changes
       * There are often trade-offs and conflicts between security vs privacy vs anti-fingerprinting
         and these need to be balanced against functionality & convenience & breakage
       * Some site breakage and unintended consequences will happen. Everyone's experience will differ
         e.g. some user data is erased on close (section 2800), change this to suit your needs
       * While not 100% definitive, search for "[SETUP" tags
         e.g. third party images/videos not loading on some sites? check 1603
       * Take the wiki link in step 2 and read the Troubleshooting entry
  5. Some tag info
       [SETUP-SECURITY] it's one item, read it
            [SETUP-WEB] can cause some websites to break
         [SETUP-CHROME] changes how Firefox itself behaves (i.e. not directly website related)
           [SETUP-PERF] may impact performance
              [WARNING] used sparingly, heed them
  6. Override Recipes: https://github.com/arkenfox/user.js/issues/1080

* RELEASES: https://github.com/arkenfox/user.js/releases

  * It is best to use the arkenfox release that is optimized for and matches your Firefox version
  * EVERYONE: each release
    - run prefsCleaner or reset deprecated prefs (9999s) and prefs made redundant by RPF (4600s)
    - re-enable section 4600 if you don't use RFP
    ESR78
    - If you are not using arkenfox v78... (not a definitive list)
      - 1244: HTTPS-Only mode is enabled
      - 1401: document fonts is inactive as it is now covered by RFP in FF80+
      - 4600: some prefs may apply even if you use RFP
      - 9999: switch the appropriate deprecated section(s) back on

* INDEX:

  0100: STARTUP
  0200: GEOLOCATION / LANGUAGE / LOCALE
  0300: QUIET FOX
  0400: BLOCKLISTS / SAFE BROWSING
  0500: SYSTEM ADD-ONS / EXPERIMENTS
  0600: BLOCK IMPLICIT OUTBOUND
  0700: HTTP* / TCP/IP / DNS / PROXY / SOCKS etc
  0800: LOCATION BAR / SEARCH BAR / SUGGESTIONS / HISTORY / FORMS
  0900: PASSWORDS
  1000: CACHE / SESSION (RE)STORE / FAVICONS
  1200: HTTPS (SSL/TLS / OCSP / CERTS / HPKP / CIPHERS)
  1400: FONTS
  1600: HEADERS / REFERERS
  1700: CONTAINERS
  1800: PLUGINS
  2000: MEDIA / CAMERA / MIC
  2200: WINDOW MEDDLING & LEAKS / POPUPS
  2300: WEB WORKERS
  2400: DOM (DOCUMENT OBJECT MODEL) & JAVASCRIPT
  2500: HARDWARE FINGERPRINTING
  2600: MISCELLANEOUS
  2700: PERSISTENT STORAGE
  2800: SHUTDOWN
  4000: FPI (FIRST PARTY ISOLATION)
  4500: RFP (RESIST FINGERPRINTING)
  4600: RFP ALTERNATIVES
  4700: RFP ALTERNATIVES (USER AGENT SPOOFING)
  5000: PERSONAL
  9999: DEPRECATED / REMOVED / LEGACY / RENAMED

******/

/* START: internal custom pref to test for syntax errors
 * [NOTE] In FF60+, not all syntax errors cause parsing to abort i.e. reaching the last debug
 * pref no longer necessarily means that all prefs have been applied. Check the console right
 * after startup for any warnings/error messages related to non-applied prefs
 * [1] https://blog.mozilla.org/nnethercote/2018/03/09/a-new-preferences-parser-for-firefox/ ***/
pref("_user.js.parrot", "START: Oh yes, the Norwegian Blue... what's wrong with it?");

/* 0000: disable about:config warning
 * FF73-86: chrome://global/content/config.xhtml ***/
pref("general.warnOnAboutConfig", false); // XHTML version
pref("browser.aboutConfig.showWarning", false); // HTML version [FF71+]

/*** [SECTION 0100]: STARTUP ***/
pref("_user.js.parrot", "0100 syntax error: the parrot's dead!");
/* 0101: disable default browser check
 * [SETTING] General>Startup>Always check if Firefox is your default browser ***/
pref("browser.shell.checkDefaultBrowser", false);
/* 0102: set START page (0=blank, 1=home, 2=last visited page, 3=resume previous session)
 * [NOTE] Session Restore is not used in PB mode (0110) and is cleared with history (2803, 2804)
 * [SETTING] General>Startup>Restore previous session ***/
pref("browser.startup.page", 0);
/* 0103: set HOME+NEWWINDOW page
 * about:home=Activity Stream (default, see 0105), custom URL, about:blank
 * [SETTING] Home>New Windows and Tabs>Homepage and new windows ***/
pref("browser.startup.homepage", "about:blank");
/* 0104: set NEWTAB page
 * true=Activity Stream (default, see 0105), false=blank page
 * [SETTING] Home>New Windows and Tabs>New tabs ***/
pref("browser.newtabpage.enabled", false);
pref("browser.newtab.preload", false);
/* 0105: disable Activity Stream stuff (AS)
 * AS is the default homepage/newtab in FF57+, based on metadata and browsing behavior.
 *    **NOT LISTING ALL OF THESE: USE THE PREFERENCES UI**
 * [SETTING] Home>Firefox Home Content>...  to show/hide what you want ***/
/* 0105a: disable Activity Stream telemetry ***/
pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
pref("browser.newtabpage.activity-stream.telemetry", false);
/* 0105b: disable Activity Stream Snippets
 * Runs code received from a server (aka Remote Code Execution) and sends information back to a metrics server
 * [1] https://abouthome-snippets-service.readthedocs.io/ ***/
pref("browser.newtabpage.activity-stream.feeds.snippets", false);
pref("browser.newtabpage.activity-stream.asrouter.providers.snippets", "{}"); //BRACE-KEEP_FOR_NOW
/* 0105c: disable Activity Stream Top Stories, Pocket-based and/or sponsored content ***/
pref("browser.newtabpage.activity-stream.feeds.section.topstories", false);
pref("browser.newtabpage.activity-stream.section.highlights.includePocket", false);
pref("browser.newtabpage.activity-stream.showSponsored", false);
pref("browser.newtabpage.activity-stream.feeds.discoverystreamfeed", false); // [FF66+]
/* 0105e: clear default topsites
 * [NOTE] This does not block you from adding your own ***/
pref("browser.newtabpage.activity-stream.default.sites", "");
/* 0110: start Firefox in PB (Private Browsing) mode
 * [NOTE] In this mode *all* windows are "private windows" and the PB mode icon is not displayed
 * [WARNING] The P in PB mode is misleading: it means no "persistent" disk storage such as history,
 * caches, searches, cookies, localStorage, IndexedDB etc (which you can achieve in normal mode).
 * In fact, PB mode limits or removes the ability to control some of these, and you need to quit
 * Firefox to clear them. PB is best used as a one off window (File>New Private Window) to provide
 * a temporary self-contained new session. Close all Private Windows to clear the PB mode session.
 * [SETTING] Privacy & Security>History>Custom Settings>Always use private browsing mode
 * [1] https://wiki.mozilla.org/Private_Browsing
 * [2] https://spreadprivacy.com/is-private-browsing-really-private/ ***/
   // pref("browser.privatebrowsing.autostart", true);

/*** [SECTION 0200]: GEOLOCATION / LANGUAGE / LOCALE ***/
pref("_user.js.parrot", "0200 syntax error: the parrot's definitely deceased!");
/** GEOLOCATION ***/
/* 0201: disable Location-Aware Browsing
 * [NOTE] Best left at default "true", fingerprintable, already behind a prompt (see 0202)
 * [1] https://www.mozilla.org/firefox/geolocation/ ***/
pref("geo.enabled", false); //BRACE-UNCOMMENTED
/* 0202: set a default permission for Location (see 0201) [FF58+]
 * 0=always ask (default), 1=allow, 2=block
 * [NOTE] Best left at default "always ask", fingerprintable via Permissions API
 * [SETTING] to add site exceptions: Ctrl+I>Permissions>Access Your Location
 * [SETTING] to manage site exceptions: Options>Privacy & Security>Permissions>Location>Settings ***/
   // pref("permissions.default.geo", 2);
/* 0203: use Mozilla geolocation service instead of Google when geolocation is enabled [FF74+]
 * Optionally enable logging to the console (defaults to false) ***/
pref("geo.provider.network.url", "https://location.services.mozilla.com/v1/geolocate?key=%MOZILLA_API_KEY%");
   // pref("geo.provider.network.logging.enabled", true); // [HIDDEN PREF]
/* 0204: disable using the OS's geolocation service ***/
pref("geo.provider.ms-windows-location", false); // [WINDOWS]
pref("geo.provider.use_corelocation", false); // [MAC]
pref("geo.provider.use_gpsd", false); // [LINUX]
/* 0207: disable region updates
 * [1] https://firefox-source-docs.mozilla.org/toolkit/modules/toolkit_modules/Region.html ***/
pref("browser.region.network.url", ""); // [FF78+]
pref("browser.region.update.enabled", false); // [[FF79+]
/* 0208: set search region
 * [NOTE] May not be hidden if Firefox has changed your settings due to your region (see 0207) ***/
   // pref("browser.search.region", "US"); // [HIDDEN PREF]

/** LANGUAGE / LOCALE ***/
/* 0210: set preferred language for displaying web pages
 * [TEST] https://addons.mozilla.org/about ***/
pref("intl.accept_languages", "data:text/plain,intl.accept_languages=en-US, en"); //BRACE-MODIFIED
/* 0211: enforce US English locale regardless of the system locale
 * [SETUP-WEB] May break some input methods e.g xim/ibus for CJK languages [1]
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=867501,1629630 ***/
pref("javascript.use_us_english_locale", true); // [HIDDEN PREF]

/*** [SECTION 0300]: QUIET FOX
     We only disable the auto-INSTALL of Firefox (app) updates. You still get prompts to update,
     and it only takes one click. We highly discourage disabling auto-CHECKING for updates.

     Legitimate reasons to disable auto-INSTALLS include hijacked/monetized extensions, time
     constraints, legacy issues, dev/testing, and fear of breakage/bugs. It is still important
     to do updates for security reasons, please do so manually if you make changes.
***/
pref("_user.js.parrot", "0300 syntax error: the parrot's not pinin' for the fjords!");
/* 0301b: disable auto-CHECKING for extension and theme updates ***/
   // pref("extensions.update.enabled", false);
/* 0302a: disable auto-INSTALLING Firefox updates [NON-WINDOWS FF65+]
 * [NOTE] In FF65+ on Windows this SETTING (below) is now stored in a file and the pref was removed
 * [SETTING] General>Firefox Updates>Check for updates but let you choose to install them ***/
   // pref("app.update.auto", false); //BRACE-COMMENTED
/* 0302b: disable auto-INSTALLING extension and theme updates (after the check in 0301b)
 * [SETTING] about:addons>Extensions>[cog-wheel-icon]>Update Add-ons Automatically (toggle) ***/
   // pref("extensions.update.autoUpdateDefault", false);
/* 0306: disable extension metadata
 * used when installing/updating an extension, and in daily background update checks:
 * when false, extension detail tabs will have no description ***/
   // pref("extensions.getAddons.cache.enabled", false);
/* 0308: disable search engine updates (e.g. OpenSearch)
 * [NOTE] This does not affect Mozilla's built-in or Web Extension search engines ***/
pref("browser.search.update", false);
/* 0309: disable sending Flash crash reports ***/
pref("dom.ipc.plugins.flash.subprocess.crashreporter.enabled", false);
/* 0310: disable sending the URL of the website where a plugin crashed ***/
pref("dom.ipc.plugins.reportCrashURL", false);
/* 0320: disable about:addons' Recommendations pane (uses Google Analytics) ***/
pref("extensions.getAddons.showPane", false); // [HIDDEN PREF]
/* 0321: disable recommendations in about:addons' Extensions and Themes panes [FF68+] ***/
pref("extensions.htmlaboutaddons.recommendations.enabled", false);
/* 0330: disable telemetry
 * the pref (.unified) affects the behaviour of the pref (.enabled)
 * IF unified=false then .enabled controls the telemetry module
 * IF unified=true then .enabled ONLY controls whether to record extended data
 * so make sure to have both set as false
 * [NOTE] FF58+ 'toolkit.telemetry.enabled' is now LOCKED to reflect prerelease
 * or release builds (true and false respectively) [2]
 * [1] https://firefox-source-docs.mozilla.org/toolkit/components/telemetry/telemetry/internals/preferences.html
 * [2] https://medium.com/georg-fritzsche/data-preference-changes-in-firefox-58-2d5df9c428b5 ***/
pref("toolkit.telemetry.unified", false);
pref("toolkit.telemetry.enabled", false); // see [NOTE]
pref("toolkit.telemetry.server", "data:,");
pref("toolkit.telemetry.archive.enabled", false);
pref("toolkit.telemetry.newProfilePing.enabled", false); // [FF55+]
pref("toolkit.telemetry.shutdownPingSender.enabled", false); // [FF55+]
pref("toolkit.telemetry.updatePing.enabled", false); // [FF56+]
pref("toolkit.telemetry.bhrPing.enabled", false); // [FF57+] Background Hang Reporter
pref("toolkit.telemetry.firstShutdownPing.enabled", false); // [FF57+]
/* 0331: disable Telemetry Coverage
 * [1] https://blog.mozilla.org/data/2018/08/20/effectively-measuring-search-in-firefox/ ***/
pref("toolkit.telemetry.coverage.opt-out", true); // [HIDDEN PREF]
pref("toolkit.coverage.opt-out", true); // [FF64+] [HIDDEN PREF]
pref("toolkit.coverage.endpoint.base", "");
/* 0340: disable Health Reports
 * [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to send technical... data ***/
pref("datareporting.healthreport.uploadEnabled", false);
/* 0341: disable new data submission, master kill switch [FF41+]
 * If disabled, no policy is shown or upload takes place, ever
 * [1] https://bugzilla.mozilla.org/1195552 ***/
pref("datareporting.policy.dataSubmissionEnabled", false);
/* 0342: disable Studies (see 0503)
 * [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to install and run studies ***/
pref("app.shield.optoutstudies.enabled", false);
/* 0343: disable personalized Extension Recommendations in about:addons and AMO [FF65+]
 * [NOTE] This pref has no effect when Health Reports (0340) are disabled
 * [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to make personalized extension recommendations
 * [1] https://support.mozilla.org/kb/personalized-extension-recommendations ***/
pref("browser.discovery.enabled", false);
/* 0350: disable Crash Reports ***/
pref("breakpad.reportURL", "");
pref("browser.tabs.crashReporting.sendReport", false); // [FF44+]
   // pref("browser.crashReports.unsubmittedCheck.enabled", false); // [FF51+] [DEFAULT: false]
/* 0351: enforce no submission of backlogged Crash Reports [FF58+]
 * [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to send backlogged crash reports  ***/
pref("browser.crashReports.unsubmittedCheck.autoSubmit2", false); // [DEFAULT: false]
/* 0390: disable Captive Portal detection
 * [1] https://www.eff.org/deeplinks/2017/08/how-captive-portals-interfere-wireless-security-and-privacy
 * [2] https://wiki.mozilla.org/Necko/CaptivePortal ***/
pref("captivedetect.canonicalURL", "");
pref("network.captive-portal-service.enabled", false); // [FF52+]
/* 0391: disable Network Connectivity checks [FF65+]
 * [1] https://bugzilla.mozilla.org/1460537 ***/
pref("network.connectivity-service.enabled", false);

/*** [SECTION 0400]: BLOCKLISTS / SAFE BROWSING (SB) ***/
pref("_user.js.parrot", "0400 syntax error: the parrot's passed on!");
/** BLOCKLISTS ***/
/* 0401: enforce Firefox blocklist
 * [NOTE] It includes updates for "revoked certificates"
 * [1] https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/ ***/
pref("extensions.blocklist.enabled", true); // [DEFAULT: true]

/** SAFE BROWSING (SB)
    Safe Browsing has taken many steps to preserve privacy. *IF* required, a full url is never
    sent to Google, only a PART-hash of the prefix, and this is hidden with noise of other real
    PART-hashes. Google also swear it is anonymized and only used to flag malicious sites.
    Firefox also takes measures such as striping out identifying parameters and since SBv4 (FF57+)
    doesn't even use cookies. (#Turn on browser.safebrowsing.debug to monitor this activity)

    #Required reading [#] https://feeding.cloud.geek.nz/posts/how-safe-browsing-works-in-firefox/
    [1] https://wiki.mozilla.org/Security/Safe_Browsing
    [2] https://support.mozilla.org/en-US/kb/how-does-phishing-and-malware-protection-work
***/
/* 0410: disable SB (Safe Browsing)
 * [WARNING] Do this at your own risk! These are the master switches.
 * [SETTING] Privacy & Security>Security>... "Block dangerous and deceptive content" ***/
   // pref("browser.safebrowsing.malware.enabled", false);
   // pref("browser.safebrowsing.phishing.enabled", false);
/* 0411: disable SB checks for downloads (both local lookups + remote)
 * This is the master switch for the safebrowsing.downloads* prefs (0412, 0413)
 * [SETTING] Privacy & Security>Security>... "Block dangerous downloads" ***/
   // pref("browser.safebrowsing.downloads.enabled", false);
/* 0412: disable SB checks for downloads (remote)
 * To verify the safety of certain executable files, Firefox may submit some information about the
 * file, including the name, origin, size and a cryptographic hash of the contents, to the Google
 * Safe Browsing service which helps Firefox determine whether or not the file should be blocked
 * [SETUP-SECURITY] If you do not understand this, or you want this protection, then override it ***/
pref("browser.safebrowsing.downloads.remote.enabled", false);
pref("browser.safebrowsing.downloads.remote.url", "");
/* 0413: disable SB checks for unwanted software
 * [SETTING] Privacy & Security>Security>... "Warn you about unwanted and uncommon software" ***/
   // pref("browser.safebrowsing.downloads.remote.block_potentially_unwanted", false);
   // pref("browser.safebrowsing.downloads.remote.block_uncommon", false);
/* 0419: disable 'ignore this warning' on SB warnings [FF45+]
 * If clicked, it bypasses the block for that session. This is a means for admins to enforce SB
 * [TEST] see github wiki APPENDIX A: Test Sites: Section 5
 * [1] https://bugzilla.mozilla.org/1226490 ***/
   // pref("browser.safebrowsing.allowOverride", false);

/*** [SECTION 0500]: SYSTEM ADD-ONS / EXPERIMENTS
     System Add-ons are a method for shipping extensions, considered to be
     built-in features to Firefox, that are hidden from the about:addons UI.
     To view your System Add-ons go to about:support, they are listed under "Firefox Features"

     Some System Add-ons have no on-off prefs. Instead you can manually remove them. Note that app
     updates will restore them. They may also be updated and possibly restored automatically (see 0505)
     * Portable: "...\App\Firefox64\browser\features\" (or "App\Firefox\etc" for 32bit)
     * Windows: "...\Program Files\Mozilla\browser\features" (or "Program Files (X86)\etc" for 32bit)
     * Mac: "...\Applications\Firefox\Contents\Resources\browser\features\"
            [NOTE] On Mac you can right-click on the application and select "Show Package Contents"
     * Linux: "/usr/lib/firefox/browser/features" (or similar)

     [1] https://firefox-source-docs.mozilla.org/toolkit/mozapps/extensions/addon-manager/SystemAddons.html
     [2] https://dxr.mozilla.org/mozilla-central/source/browser/extensions
***/
pref("_user.js.parrot", "0500 syntax error: the parrot's cashed in 'is chips!");
/* 0503: disable Normandy/Shield [FF60+]
 * Shield is an telemetry system (including Heartbeat) that can also push and test "recipes"
 * [1] https://wiki.mozilla.org/Firefox/Shield
 * [2] https://github.com/mozilla/normandy ***/
pref("app.normandy.enabled", false);
pref("app.normandy.api_url", "");
/* 0505: disable System Add-on updates ***/
pref("extensions.systemAddon.update.enabled", false); // [FF62+]
pref("extensions.systemAddon.update.url", ""); // [FF44+]
/* 0506: disable PingCentre telemetry (used in several System Add-ons) [FF57+]
 * Currently blocked by 'datareporting.healthreport.uploadEnabled' (see 0340) ***/
pref("browser.ping-centre.telemetry", false);
/* 0515: disable Screenshots ***/
pref("extensions.screenshots.disabled", true); // [FF55+] //BRACE-UNCOMMENTED
/* 0517: disable Form Autofill
 * [NOTE] Stored data is NOT secure (uses a JSON file)
 * [NOTE] Heuristics controls Form Autofill on forms without @autocomplete attributes
 * [SETTING] Privacy & Security>Forms and Autofill>Autofill addresses
 * [1] https://wiki.mozilla.org/Firefox/Features/Form_Autofill ***/
pref("extensions.formautofill.addresses.enabled", false); // [FF55+]
pref("extensions.formautofill.available", "off"); // [FF56+]
pref("extensions.formautofill.creditCards.available", false); // [FF57+]
pref("extensions.formautofill.creditCards.enabled", false); // [FF56+]
pref("extensions.formautofill.heuristics.enabled", false); // [FF55+]
/* 0518: enforce disabling of Web Compatibility Reporter [FF56+]
 * Web Compatibility Reporter adds a "Report Site Issue" button to send data to Mozilla ***/
pref("extensions.webcompat-reporter.enabled", false); // [DEFAULT: false]

/*** [SECTION 0600]: BLOCK IMPLICIT OUTBOUND [not explicitly asked for - e.g. clicked on] ***/
pref("_user.js.parrot", "0600 syntax error: the parrot's no more!");
/* 0601: disable link prefetching
 * [1] https://developer.mozilla.org/docs/Web/HTTP/Link_prefetching_FAQ ***/
pref("network.prefetch-next", false);
/* 0602: disable DNS prefetching
 * [1] https://developer.mozilla.org/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control ***/
pref("network.dns.disablePrefetch", true);
pref("network.dns.disablePrefetchFromHTTPS", true); // [DEFAULT: true]
/* 0603: disable predictor / prefetching ***/
pref("network.predictor.enabled", false);
pref("network.predictor.enable-prefetch", false); // [FF48+] [DEFAULT: false]
/* 0605: disable link-mouseover opening connection to linked server
 * [1] https://news.slashdot.org/story/15/08/14/2321202/how-to-quash-firefoxs-silent-requests ***/
pref("network.http.speculative-parallel-limit", 0);
/* 0606: enforce no "Hyperlink Auditing" (click tracking)
 * [1] https://www.bleepingcomputer.com/news/software/major-browsers-to-prevent-disabling-of-click-tracking-privacy-risk/ ***/
pref("browser.send_pings", false); // [DEFAULT: false]
pref("browser.send_pings.require_same_host", true); // defense-in-depth

/*** [SECTION 0700]: HTTP* / TCP/IP / DNS / PROXY / SOCKS etc ***/
pref("_user.js.parrot", "0700 syntax error: the parrot's given up the ghost!");
/* 0701: disable IPv6
 * IPv6 can be abused, especially with MAC addresses, and can leak with VPNs. That's even
 * assuming your ISP and/or router and/or website can handle it. Sites will fall back to IPv4
 * [STATS] Firefox telemetry (Dec 2020) shows ~8% of all connections are IPv6
 * [NOTE] This is just an application level fallback. Disabling IPv6 is best done at an
 * OS/network level, and/or configured properly in VPN setups. If you are not masking your IP,
 * then this won't make much difference. If you are masking your IP, then it can only help.
 * [NOTE] PHP defaults to IPv6 with "localhost". Use "php -S 127.0.0.1:PORT"
 * [TEST] https://ipleak.org/
 * [1] https://www.internetsociety.org/tag/ipv6-security/ (see Myths 2,4,5,6) ***/
   // pref("network.dns.disableIPv6", true); //BRACE-COMMENTED
/* 0702: disable HTTP2
 * HTTP2 raises concerns with "multiplexing" and "server push", does nothing to
 * enhance privacy, and opens up a number of server-side fingerprinting opportunities.
 * [WARNING] Disabling this made sense in the past, and doesn't break anything, but HTTP2 is
 * at 40% (December 2019) and growing [5]. Don't be that one person using HTTP1.1 on HTTP2 sites
 * [1] https://http2.github.io/faq/
 * [2] https://blog.scottlogic.com/2014/11/07/http-2-a-quick-look.html
 * [3] https://http2.github.io/http2-spec/#rfc.section.10.8
 * [4] https://queue.acm.org/detail.cfm?id=2716278
 * [5] https://w3techs.com/technologies/details/ce-http2/all/all ***/
   // pref("network.http.spdy.enabled", false);
   // pref("network.http.spdy.enabled.deps", false);
   // pref("network.http.spdy.enabled.http2", false);
   // pref("network.http.spdy.websockets", false); // [FF65+]
/* 0703: disable HTTP Alternative Services [FF37+]
 * [SETUP-PERF] Relax this if you have FPI enabled (see 4000) *AND* you understand the
 * consequences. FPI isolates these, but it was designed with the Tor protocol in mind,
 * and the Tor Browser has extra protection, including enhanced sanitizing per Identity.
 * [1] https://tools.ietf.org/html/rfc7838#section-9
 * [2] https://www.mnot.net/blog/2016/03/09/alt-svc ***/
pref("network.http.altsvc.enabled", false);
pref("network.http.altsvc.oe", false);
/* 0704: enforce the proxy server to do any DNS lookups when using SOCKS
 * e.g. in Tor, this stops your local DNS server from knowing your Tor destination
 * as a remote Tor node will handle the DNS request
 * [1] https://trac.torproject.org/projects/tor/wiki/doc/TorifyHOWTO/WebBrowsers ***/
pref("network.proxy.socks_remote_dns", true);
/* 0708: disable FTP [FF60+] ***/
   // pref("network.ftp.enabled", false); // [DEFAULT: false FF88+]
/* 0709: disable using UNC (Uniform Naming Convention) paths [FF61+]
 * [SETUP-CHROME] Can break extensions for profiles on network shares
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/26424 ***/
pref("network.file.disable_unc_paths", true); // [HIDDEN PREF]
/* 0710: disable GIO as a potential proxy bypass vector
 * Gvfs/GIO has a set of supported protocols like obex, network, archive, computer, dav, cdda,
 * gphoto2, trash, etc. By default only smb and sftp protocols are accepted so far (as of FF64)
 * [1] https://bugzilla.mozilla.org/1433507
 * [2] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/23044
 * [3] https://en.wikipedia.org/wiki/GVfs
 * [4] https://en.wikipedia.org/wiki/GIO_(software) ***/
pref("network.gio.supported-protocols", ""); // [HIDDEN PREF]

/*** [SECTION 0800]: LOCATION BAR / SEARCH BAR / SUGGESTIONS / HISTORY / FORMS
     Change items 0850 and above to suit for privacy vs convenience and functionality. Consider
     your environment (no unwanted eyeballs), your device (restricted access), your device's
     unattended state (locked, encrypted, forensic hardened). Likewise, you may want to check
     the items cleared on shutdown in section 2800.
     [NOTE] The urlbar is also commonly referred to as the location bar and address bar
     #Required reading [#] https://xkcd.com/538/
***/
pref("_user.js.parrot", "0800 syntax error: the parrot's ceased to be!");
/* 0801: disable location bar using search
 * Don't leak URL typos to a search engine, give an error message instead.
 * Examples: "secretplace,com", "secretplace/com", "secretplace com", "secret place.com"
 * [NOTE] This does **not** affect explicit user action such as using search buttons in the
 * dropdown, or using keyword search shortcuts you configure in options (e.g. 'd' for DuckDuckGo)
 * [SETUP-CHROME] If you don't, or rarely, type URLs, or you use a default search
 * engine that respects privacy, then you probably don't need this ***/
   // pref("keyword.enabled", false); //BRACE-COMMENTED
/* 0802: disable location bar domain guessing
 * domain guessing intercepts DNS "hostname not found errors" and resends a
 * request (e.g. by adding www or .com). This is inconsistent use (e.g. FQDNs), does not work
 * via Proxy Servers (different error), is a flawed use of DNS (TLDs: why treat .com
 * as the 411 for DNS errors?), privacy issues (why connect to sites you didn't
 * intend to), can leak sensitive data (e.g. query strings: e.g. Princeton attack),
 * and is a security risk (e.g. common typos & malicious sites set up to exploit this) ***/
pref("browser.fixup.alternate.enabled", false);
/* 0803: display all parts of the url in the location bar ***/
pref("browser.urlbar.trimURLs", false);
/* 0805: disable coloring of visited links - CSS history leak
 * [SETUP-HARDEN] Bulk rapid history sniffing was mitigated in 2010 [1][2]. Slower and more expensive
 * redraw timing attacks were largely mitigated in FF77+ [3]. Using RFP (4501) further hampers timing
 * attacks. Don't forget clearing history on close (2803). However, social engineering [2#limits][4][5]
 * and advanced targeted timing attacks could still produce usable results
 * [1] https://developer.mozilla.org/docs/Web/CSS/Privacy_and_the_:visited_selector
 * [2] https://dbaron.org/mozilla/visited-privacy
 * [3] https://bugzilla.mozilla.org/1632765
 * [4] https://earthlng.github.io/testpages/visited_links.html (see github wiki APPENDIX A on how to use)
 * [5] https://lcamtuf.blogspot.com/2016/08/css-mix-blend-mode-is-bad-for-keeping.html ***/
pref("layout.css.visited_links_enabled", false); //BRACE-ENABLED
/* 0807: disable live search suggestions
/* [NOTE] Both must be true for the location bar to work
 * [SETUP-CHROME] Change these if you trust and use a privacy respecting search engine
 * [SETTING] Search>Provide search suggestions | Show search suggestions in address bar results ***/
pref("browser.search.suggest.enabled", false);
pref("browser.urlbar.suggest.searches", false);
/* 0810: disable location bar making speculative connections [FF56+]
 * [1] https://bugzilla.mozilla.org/1348275 ***/
pref("browser.urlbar.speculativeConnect.enabled", false);
/* 0811: disable location bar leaking single words to a DNS provider **after searching** [FF78+]
 * 0=never resolve single words, 1=heuristic (default), 2=always resolve
 * [NOTE] For FF78 value 1 and 2 are the same and always resolve but that will change in future versions
 * [1] https://bugzilla.mozilla.org/1642623 ***/
pref("browser.urlbar.dnsResolveSingleWordsAfterSearch", 0);
/* 0850a: disable location bar suggestion types
 * [SETTING] Privacy & Security>Address Bar>When using the address bar, suggest ***/
   // pref("browser.urlbar.suggest.history", false);
   // pref("browser.urlbar.suggest.bookmark", false);
   // pref("browser.urlbar.suggest.openpage", false);
   // pref("browser.urlbar.suggest.topsites", false); // [FF78+]
/* 0850b: disable tab-to-search [FF85+]
 * Alternatively, you can exclude on a per-engine basis by unchecking them in Options>Search
 * [SETTING] Privacy & Security>Address Bar>When using the address bar, suggest>Search engines ***/
   // pref("browser.urlbar.suggest.engines", false);
/* 0850c: disable location bar dropdown
 * This value controls the total number of entries to appear in the location bar dropdown ***/
   // pref("browser.urlbar.maxRichResults", 0);
/* 0850d: disable location bar autofill
 * [1] https://support.mozilla.org/en-US/kb/address-bar-autocomplete-firefox#w_url-autocomplete ***/
   // pref("browser.urlbar.autoFill", false);
/* 0860: disable search and form history
 * [SETUP-WEB] Be aware that autocomplete form data can be read by third parties [1][2]
 * [NOTE] We also clear formdata on exit (see 2803)
 * [SETTING] Privacy & Security>History>Custom Settings>Remember search and form history
 * [1] https://blog.mindedsecurity.com/2011/10/autocompleteagain.html
 * [2] https://bugzilla.mozilla.org/381681 ***/
pref("browser.formfill.enable", false);
/* 0862: disable browsing and download history
 * [NOTE] We also clear history and downloads on exiting Firefox (see 2803)
 * [SETTING] Privacy & Security>History>Custom Settings>Remember browsing and download history ***/
   // pref("places.history.enabled", false);
/* 0870: disable Windows jumplist [WINDOWS] ***/
pref("browser.taskbar.lists.enabled", false);
pref("browser.taskbar.lists.frequent.enabled", false);
pref("browser.taskbar.lists.recent.enabled", false);
pref("browser.taskbar.lists.tasks.enabled", false);
/* 0871: disable Windows taskbar preview [WINDOWS] ***/
   // pref("browser.taskbar.previews.enable", false); // [DEFAULT: false]

/*** [SECTION 0900]: PASSWORDS ***/
pref("_user.js.parrot", "0900 syntax error: the parrot's expired!");
/* 0901: disable saving passwords
 * [NOTE] This does not clear any passwords already saved
 * [SETTING] Privacy & Security>Logins and Passwords>Ask to save logins and passwords for websites ***/
   // pref("signon.rememberSignons", false);
/* 0902: use a primary password
 * There are no preferences for this. It is all handled internally.
 * [SETTING] Privacy & Security>Logins and Passwords>Use a Primary Password
 * [1] https://support.mozilla.org/kb/use-primary-password-protect-stored-logins-and-pas ***/
/* 0903: set how often Firefox should ask for the primary password
 * 0=the first time (default), 1=every time it's needed, 2=every n minutes (see 0904) ***/
pref("security.ask_for_password", 2);
/* 0904: set how often in minutes Firefox should ask for the primary password (see 0903)
 * in minutes, default is 30 ***/
pref("security.password_lifetime", 5);
/* 0905: disable auto-filling username & password form fields
 * can leak in cross-site forms *and* be spoofed
 * [NOTE] Username & password is still available when you enter the field
 * [SETTING] Privacy & Security>Logins and Passwords>Autofill logins and passwords
 * [1] https://freedom-to-tinker.com/2017/12/27/no-boundaries-for-user-identities-web-trackers-exploit-browser-login-managers/ ***/
pref("signon.autofillForms", false);
/* 0909: disable formless login capture for Password Manager [FF51+] ***/
pref("signon.formlessCapture.enabled", false);
/* 0912: limit (or disable) HTTP authentication credentials dialogs triggered by sub-resources [FF41+]
 * hardens against potential credentials phishing
 * 0=don't allow sub-resources to open HTTP authentication credentials dialogs
 * 1=don't allow cross-origin sub-resources to open HTTP authentication credentials dialogs
 * 2=allow sub-resources to open HTTP authentication credentials dialogs (default) ***/
pref("network.auth.subresource-http-auth-allow", 1);

/*** [SECTION 1000]: CACHE / SESSION (RE)STORE / FAVICONS
     Cache tracking/fingerprinting techniques [1][2][3] require a cache. Disabling disk (1001)
     *and* memory (1003) caches is one solution; but that's extreme and fingerprintable. A hardened
     Temporary Containers configuration can effectively do the same thing, by isolating every tab [4].

     We consider avoiding disk cache (1001) so cache is session/memory only (like Private Browsing
     mode), and isolating cache to first party (4001) is sufficient and a good balance between
     risk and performance. ETAGs can also be neutralized by modifying response headers [5], and
     you can clear the cache manually or on a regular basis with an extension.

     [1] https://en.wikipedia.org/wiki/HTTP_ETag#Tracking_using_ETags
     [2] https://robertheaton.com/2014/01/20/cookieless-user-tracking-for-douchebags/
     [3] https://www.grepular.com/Preventing_Web_Tracking_via_the_Browser_Cache
     [4] https://medium.com/@stoically/enhance-your-privacy-in-firefox-with-temporary-containers-33925cd6cd21
     [5] https://github.com/arkenfox/user.js/wiki/4.2.4-Header-Editor
***/
pref("_user.js.parrot", "1000 syntax error: the parrot's gone to meet 'is maker!");
/** CACHE ***/
/* 1001: disable disk cache
 * [SETUP-PERF] If you think disk cache may help (heavy tab user, high-res video),
 * or you use a hardened Temporary Containers, then feel free to override this
 * [NOTE] We also clear cache on exiting Firefox (see 2803) ***/
   // pref("browser.cache.disk.enable", false); //BRACE-COMMENTED
/* 1003: disable memory cache
 * capacity: -1=determine dynamically (default), 0=none, n=memory capacity in kibibytes ***/
   // pref("browser.cache.memory.enable", false);
   // pref("browser.cache.memory.capacity", 0);
/* 1006: disable permissions manager from writing to disk [RESTART]
 * [NOTE] This means any permission changes are session only
 * [1] https://bugzilla.mozilla.org/967812 ***/
   // pref("permissions.memory_only", true); // [HIDDEN PREF]
/* 1007: disable media cache from writing to disk in Private Browsing
 * [NOTE] MSE (Media Source Extensions) are already stored in-memory in PB
 * [SETUP-WEB] ESR78: playback might break on subsequent loading (1650281) ***/
pref("browser.privatebrowsing.forceMediaMemoryCache", true); // [FF75+]
pref("media.memory_cache_max_size", 65536);

/** SESSIONS & SESSION RESTORE ***/
/* 1020: exclude "Undo Closed Tabs" in Session Restore ***/
   // pref("browser.sessionstore.max_tabs_undo", 0);
/* 1021: disable storing extra session data [SETUP-CHROME]
 * extra session data contains contents of forms, scrollbar positions, cookies and POST data
 * define on which sites to save extra session data:
 * 0=everywhere, 1=unencrypted sites, 2=nowhere ***/
pref("browser.sessionstore.privacy_level", 2);
/* 1022: disable resuming session from crash ***/
   // pref("browser.sessionstore.resume_from_crash", false);
/* 1023: set the minimum interval between session save operations
 * Increasing this can help on older machines and some websites, as well as reducing writes [1]
 * Default is 15000 (15 secs). Try 30000 (30 secs), 60000 (1 min) etc
 * [SETUP-CHROME] This can also affect entries in the "Recently Closed Tabs" feature:
 * i.e. the longer the interval the more chance a quick tab open/close won't be captured.
 * This longer interval *may* affect history but we cannot replicate any history not recorded
 * [1] https://bugzilla.mozilla.org/1304389 ***/
pref("browser.sessionstore.interval", 30000);
/* 1024: disable automatic Firefox start and session restore after reboot [FF62+] [WINDOWS]
 * [1] https://bugzilla.mozilla.org/603903 ***/
pref("toolkit.winRegisterApplicationRestart", false);

/** FAVICONS ***/
/* 1030: disable favicons in shortcuts
 * URL shortcuts use a cached randomly named .ico file which is stored in your
 * profile/shortcutCache directory. The .ico remains after the shortcut is deleted.
 * If set to false then the shortcuts use a generic Firefox icon ***/
pref("browser.shell.shortcutFavicons", false);
/* 1031: disable favicons in history and bookmarks
 * Stored as data blobs in favicons.sqlite, these don't reveal anything that your
 * actual history (and bookmarks) already do. Your history is more detailed, so
 * control that instead; e.g. disable history, clear history on close, use PB mode
 * [NOTE] favicons.sqlite is sanitized on Firefox close, not in-session ***/
   // pref("browser.chrome.site_icons", false);
/* 1032: disable favicons in web notifications ***/
   // pref("alerts.showFavicons", false); // [DEFAULT: false]

/*** [SECTION 1200]: HTTPS (SSL/TLS / OCSP / CERTS / HPKP / CIPHERS)
   Your cipher and other settings can be used in server side fingerprinting
   [TEST] https://www.ssllabs.com/ssltest/viewMyClient.html
   [TEST] https://browserleaks.com/ssl
   [TEST] https://ja3er.com/
   [1] https://www.securityartwork.es/2017/02/02/tls-client-fingerprinting-with-bro/
***/
pref("_user.js.parrot", "1200 syntax error: the parrot's a stiff!");
/** SSL (Secure Sockets Layer) / TLS (Transport Layer Security) ***/
/* 1201: require safe negotiation
 * Blocks connections (SSL_ERROR_UNSAFE_NEGOTIATION) to servers that don't support RFC 5746 [2]
 * as they're potentially vulnerable to a MiTM attack [3]. A server without RFC 5746 can be
 * safe from the attack if it disables renegotiations but the problem is that the browser can't
 * know that. Setting this pref to true is the only way for the browser to ensure there will be
 * no unsafe renegotiations on the channel between the browser and the server.
 * [STATS] SSL Labs (Dec 2020) reports 99.0% of sites have secure renegotiation [4]
 * [1] https://wiki.mozilla.org/Security:Renegotiation
 * [2] https://tools.ietf.org/html/rfc5746
 * [3] https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2009-3555
 * [4] https://www.ssllabs.com/ssl-pulse/ ***/
pref("security.ssl.require_safe_negotiation", true);
/* 1202: control TLS versions with min and max
 * 1=TLS 1.0, 2=TLS 1.1, 3=TLS 1.2, 4=TLS 1.3
 * [WARNING] Leave these at default, otherwise you alter your TLS fingerprint.
 * [1] https://www.ssllabs.com/ssl-pulse/ ***/
   // pref("security.tls.version.min", 3); // [DEFAULT: 3]
   // pref("security.tls.version.max", 4);
/* 1203: enforce TLS 1.0 and 1.1 downgrades as session only ***/
pref("security.tls.version.enable-deprecated", false);
/* 1204: disable SSL session tracking [FF36+]
 * SSL Session IDs are unique and last up to 24hrs in Firefox (or longer with prolongation attacks)
 * [NOTE] These are not used in PB mode. In normal windows they are isolated when using FPI (4001)
 * and/or containers. In FF85+ they are isolated by default (privacy.partition.network_state)
 * [WARNING] There are perf and passive fingerprinting costs, for little to no gain. Preventing
 * tracking via this method does not address IPs, nor handle any sanitizing of current identifiers
 * [1] https://tools.ietf.org/html/rfc5077
 * [2] https://bugzilla.mozilla.org/967977
 * [3] https://arxiv.org/abs/1810.07304 ***/
   // pref("security.ssl.disable_session_identifiers", true); // [HIDDEN PREF]
/* 1206: disable TLS1.3 0-RTT (round-trip time) [FF51+]
 * [1] https://github.com/tlswg/tls13-spec/issues/1001
 * [2] https://blog.cloudflare.com/tls-1-3-overview-and-q-and-a/ ***/
pref("security.tls.enable_0rtt_data", false);

/** OCSP (Online Certificate Status Protocol)
    #Required reading [#] https://scotthelme.co.uk/revocation-is-broken/ ***/
/* 1210: enable OCSP Stapling
 * [1] https://blog.mozilla.org/security/2013/07/29/ocsp-stapling-in-firefox/ ***/
pref("security.ssl.enable_ocsp_stapling", true);
/* 1211: control when to use OCSP fetching (to confirm current validity of certificates)
 * 0=disabled, 1=enabled (default), 2=enabled for EV certificates only
 * OCSP (non-stapled) leaks information about the sites you visit to the CA (cert authority)
 * It's a trade-off between security (checking) and privacy (leaking info to the CA)
 * [NOTE] This pref only controls OCSP fetching and does not affect OCSP stapling
 * [1] https://en.wikipedia.org/wiki/Ocsp ***/
pref("security.OCSP.enabled", 1);
/* 1212: set OCSP fetch failures (non-stapled, see 1211) to hard-fail [SETUP-WEB]
 * When a CA cannot be reached to validate a cert, Firefox just continues the connection (=soft-fail)
 * Setting this pref to true tells Firefox to instead terminate the connection (=hard-fail)
 * It is pointless to soft-fail when an OCSP fetch fails: you cannot confirm a cert is still valid (it
 * could have been revoked) and/or you could be under attack (e.g. malicious blocking of OCSP servers)
 * [1] https://blog.mozilla.org/security/2013/07/29/ocsp-stapling-in-firefox/
 * [2] https://www.imperialviolet.org/2014/04/19/revchecking.html ***/
pref("security.OCSP.require", true);

/** CERTS / HPKP (HTTP Public Key Pinning) ***/
/* 1220: disable or limit SHA-1 certificates
 * 0=all SHA1 certs are allowed
 * 1=all SHA1 certs are blocked
 * 2=deprecated option that now maps to 1
 * 3=only allowed for locally-added roots (e.g. anti-virus)
 * 4=only allowed for locally-added roots or for certs in 2015 and earlier
 * [SETUP-CHROME] When disabled, some man-in-the-middle devices (e.g. security scanners and
 * antivirus products, may fail to connect to HTTPS sites. SHA-1 is *almost* obsolete.
 * [1] https://blog.mozilla.org/security/2016/10/18/phasing-out-sha-1-on-the-public-web/ ***/
pref("security.pki.sha1_enforcement_level", 1);
/* 1221: disable Windows 8.1's Microsoft Family Safety cert [FF50+] [WINDOWS]
 * 0=disable detecting Family Safety mode and importing the root
 * 1=only attempt to detect Family Safety mode (don't import the root)
 * 2=detect Family Safety mode and import the root
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/21686 ***/
pref("security.family_safety.mode", 0);
/* 1222: disable intermediate certificate caching (fingerprinting attack vector) [FF41+] [RESTART]
 * [NOTE] This affects login/cert/key dbs. The effect is all credentials are session-only.
 * Saved logins and passwords are not available. Reset the pref and restart to return them.
 * [1] https://shiftordie.de/blog/2017/02/21/fingerprinting-firefox-users-with-cached-intermediate-ca-certificates-fiprinca/ ***/
   // pref("security.nocertdb", true); // [HIDDEN PREF]
/* 1223: enforce strict pinning
 * PKP (Public Key Pinning) 0=disabled 1=allow user MiTM (such as your antivirus), 2=strict
 * [SETUP-WEB] If you rely on an AV (antivirus) to protect your web browsing
 * by inspecting ALL your web traffic, then leave at current default=1
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/16206 ***/
pref("security.cert_pinning.enforcement_level", 2);
/* 1224: enforce CRLite [FF73+]
 * In FF84+ it covers valid certs and in mode 2 doesn't fall back to OCSP
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1429800,1670985
 * [2] https://blog.mozilla.org/security/tag/crlite/ ***/
pref("security.remote_settings.crlite_filters.enabled", true);
pref("security.pki.crlite_mode", 2);

/** MIXED CONTENT ***/
/* 1240: enforce no insecure active content on https pages
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/21323 ***/
pref("security.mixed_content.block_active_content", true); // [DEFAULT: true]
/* 1241: disable insecure passive content (such as images) on https pages [SETUP-WEB] ***/
pref("security.mixed_content.block_display_content", true);
/* 1243: block unencrypted requests from Flash on encrypted pages to mitigate MitM attacks [FF59+]
 * [1] https://bugzilla.mozilla.org/1190623 ***/
pref("security.mixed_content.block_object_subrequest", true);
/* 1244: enable HTTPS-Only mode [FF76+]
 * When "https_only_mode" (all windows) is true, "https_only_mode_pbm" (private windows only) is ignored
 * [SETTING] to add site exceptions: Padlock>HTTPS-Only mode>On/Off/Off temporarily
 * [SETTING] Privacy & Security>HTTPS-Only Mode
 * [TEST] http://example.com [upgrade]
 * [TEST] http://neverssl.org/ [no upgrade]
 * [1] https://bugzilla.mozilla.org/1613063 [META] ***/
   // pref("dom.security.https_only_mode", true); // [FF76+] //MULL-COMMENTED
   // pref("dom.security.https_only_mode_pbm", true); // [FF80+]
/* 1245: enable HTTPS-Only mode for local resources [FF77+] ***/
   // pref("dom.security.https_only_mode.upgrade_local", true);
/* 1246: disable HTTP background requests [FF82+]
 * When attempting to upgrade, if the server doesn't respond within 3 seconds, firefox
 * sends HTTP requests in order to check if the server supports HTTPS or not.
 * This is done to avoid waiting for a timeout which takes 90 seconds
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1642387,1660945 ***/
   // pref("dom.security.https_only_mode_send_http_background_request", false); //BRACE-COMMENTED

/** CIPHERS [WARNING: do not meddle with your cipher suite: see the section 1200 intro]
 * These are all the ciphers still using SHA-1 and CBC which are weaker than the available alternatives. (see "Cipher Suites" in [1])
 * Additionally some have other weaknesses like key sizes of 128 (or lower) [2] and/or no Perfect Forward Secrecy [3].
 * [1] https://browserleaks.com/ssl
 * [2] https://en.wikipedia.org/wiki/Key_size
 * [3] https://en.wikipedia.org/wiki/Forward_secrecy
 ***/
/* 1261: disable 3DES (effective key size < 128 and no PFS)
 * [1] https://en.wikipedia.org/wiki/3des#Security
 * [2] https://en.wikipedia.org/wiki/Meet-in-the-middle_attack
 * [3] https://www-archive.mozilla.org/projects/security/pki/nss/ssl/fips-ssl-ciphersuites.html ***/
   // pref("security.ssl3.rsa_des_ede3_sha", false);
/* 1264: disable the remaining non-modern cipher suites as of FF78 (in order of preferred by FF) ***/
   // pref("security.ssl3.ecdhe_ecdsa_aes_256_sha", false);
   // pref("security.ssl3.ecdhe_ecdsa_aes_128_sha", false);
   // pref("security.ssl3.ecdhe_rsa_aes_128_sha", false);
   // pref("security.ssl3.ecdhe_rsa_aes_256_sha", false);
   // pref("security.ssl3.rsa_aes_128_sha", false); // no PFS
   // pref("security.ssl3.rsa_aes_256_sha", false); // no PFS

/** UI (User Interface) ***/
/* 1270: display warning on the padlock for "broken security" (if 1201 is false)
 * Bug: warning padlock not indicated for subresources on a secure page! [2]
 * [1] https://wiki.mozilla.org/Security:Renegotiation
 * [2] https://bugzilla.mozilla.org/1353705 ***/
pref("security.ssl.treat_unsafe_negotiation_as_broken", true);
/* 1271: control "Add Security Exception" dialog on SSL warnings
 * 0=do neither 1=pre-populate url 2=pre-populate url + pre-fetch cert (default)
 * [1] https://github.com/pyllyukko/user.js/issues/210 ***/
pref("browser.ssl_override_behavior", 1);
/* 1272: display advanced information on Insecure Connection warning pages
 * only works when it's possible to add an exception
 * i.e. it doesn't work for HSTS discrepancies (https://subdomain.preloaded-hsts.badssl.com/)
 * [TEST] https://expired.badssl.com/ ***/
pref("browser.xul.error_pages.expert_bad_cert", true);
/* 1273: display "insecure" icon and "Not Secure" text on HTTP sites ***/
   // pref("security.insecure_connection_icon.enabled", true); // [FF59+] [DEFAULT: true]
pref("security.insecure_connection_text.enabled", true); // [FF60+]

/*** [SECTION 1400]: FONTS ***/
pref("_user.js.parrot", "1400 syntax error: the parrot's bereft of life!");
/* 1401: disable websites choosing fonts (0=block, 1=allow)
 * This can limit most (but not all) JS font enumeration which is a high entropy fingerprinting vector
 * [WARNING] **DO NOT USE**: in FF80+ RFP covers this, and non-RFP users should use font vis (4618)
 * [SETTING] General>Language and Appearance>Fonts & Colors>Advanced>Allow pages to choose... ***/
   // pref("browser.display.use_document_fonts", 0);
/* 1403: disable icon fonts (glyphs) and local fallback rendering
 * [1] https://bugzilla.mozilla.org/789788
 * [2] https://gitlab.torproject.org/legacy/trac/-/issues/8455 ***/
   // pref("gfx.downloadable_fonts.enabled", false); // [FF41+]
   // pref("gfx.downloadable_fonts.fallback_delay", -1);
/* 1404: disable rendering of SVG OpenType fonts
 * [1] https://wiki.mozilla.org/SVGOpenTypeFonts - iSECPartnersReport recommends to disable this ***/
pref("gfx.font_rendering.opentype_svg.enabled", false);
/* 1408: disable graphite
 * Graphite has had many critical security issues in the past [1]
 * [1] https://www.mozilla.org/security/advisories/mfsa2017-15/#CVE-2017-7778
 * [2] https://en.wikipedia.org/wiki/Graphite_(SIL) ***/
pref("gfx.font_rendering.graphite.enabled", false);
/* 1409: limit system font exposure to a whitelist [FF52+] [RESTART]
 * If the whitelist is empty, then whitelisting is considered disabled and all fonts are allowed
 * [NOTE] In FF81+ the whitelist **overrides** RFP's font visibility (see 4618)
 * [WARNING] **DO NOT USE**: in FF80+ RFP covers this, and non-RFP users should use font vis (4618)
 * [1] https://bugzilla.mozilla.org/1121643 ***/
   // pref("font.system.whitelist", ""); // [HIDDEN PREF]

/*** [SECTION 1600]: HEADERS / REFERERS
     Only *cross domain* referers need controlling: leave 1601, 1602, 1605 and 1606 alone
     ---
     Expect some breakage: Use an extension if you need precise control
     ---
                    full URI: https://example.com:8888/foo/bar.html?id=1234
       scheme+host+port+path: https://example.com:8888/foo/bar.html
            scheme+host+port: https://example.com:8888
     ---
     #Required reading [#] https://feeding.cloud.geek.nz/posts/tweaking-referrer-for-privacy-in-firefox/
***/
pref("_user.js.parrot", "1600 syntax error: the parrot rests in peace!");
/* 1601: ALL: control when images/links send a referer
 * 0=never, 1=send only when links are clicked, 2=for links and images (default) ***/
   // pref("network.http.sendRefererHeader", 2);
/* 1602: ALL: control the amount of information to send
 * 0=send full URI (default), 1=scheme+host+port+path, 2=scheme+host+port ***/
   // pref("network.http.referer.trimmingPolicy", 0);
/* 1603: CROSS ORIGIN: control when to send a referer
 * 0=always (default), 1=only if base domains match, 2=only if hosts match
 * [SETUP-WEB] Known to cause issues with older modems/routers and some sites e.g vimeo, icloud ***/
pref("network.http.referer.XOriginPolicy", 2);
/* 1604: CROSS ORIGIN: control the amount of information to send [FF52+]
 * 0=send full URI (default), 1=scheme+host+port+path, 2=scheme+host+port ***/
pref("network.http.referer.XOriginTrimmingPolicy", 2);
/* 1605: ALL: disable spoofing a referer
 * [WARNING] Do not set this to true, as spoofing effectively disables the anti-CSRF
 * (Cross-Site Request Forgery) protections that some sites may rely on ***/
   // pref("network.http.referer.spoofSource", false); // [DEFAULT: false]
/* 1606: ALL: set the default Referrer Policy [FF59+]
 * 0=no-referer, 1=same-origin, 2=strict-origin-when-cross-origin, 3=no-referrer-when-downgrade
 * [NOTE] This is only a default, it can be overridden by a site-controlled Referrer Policy
 * [1] https://www.w3.org/TR/referrer-policy/
 * [2] https://developer.mozilla.org/docs/Web/HTTP/Headers/Referrer-Policy
 * [3] https://blog.mozilla.org/security/2018/01/31/preventing-data-leaks-by-stripping-path-information-in-http-referrers/
 * [4] https://blog.mozilla.org/security/2021/03/22/firefox-87-trims-http-referrers-by-default-to-protect-user-privacy/ ***/
   // pref("network.http.referer.defaultPolicy", 2); // [DEFAULT: 2 FF87+]
   // pref("network.http.referer.defaultPolicy.pbmode", 2); // [DEFAULT: 2]
/* 1607: TOR: hide (not spoof) referrer when leaving a .onion domain [FF54+]
 * [NOTE] Firefox cannot access .onion sites by default. We recommend you use
 * the Tor Browser which is specifically designed for hidden services
 * [1] https://bugzilla.mozilla.org/1305144 ***/
pref("network.http.referer.hideOnionSource", true); //BRACE-UNCOMMENTED
/* 1610: ALL: enable the DNT (Do Not Track) HTTP header
 * [NOTE] DNT is enforced with Enhanced Tracking Protection regardless of this pref
 * [SETTING] Privacy & Security>Enhanced Tracking Protection>Send websites a "Do Not Track" signal... ***/
pref("privacy.donottrackheader.enabled", true);

/*** [SECTION 1700]: CONTAINERS
     If you want to *really* leverage containers, we highly recommend Temporary Containers [2].
     Read the article by the extension author [3], and check out the github wiki/repo [4].
     [1] https://wiki.mozilla.org/Security/Contextual_Identity_Project/Containers
     [2] https://addons.mozilla.org/firefox/addon/temporary-containers/
     [3] https://medium.com/@stoically/enhance-your-privacy-in-firefox-with-temporary-containers-33925cd6cd21
     [4] https://github.com/stoically/temporary-containers/wiki
***/
pref("_user.js.parrot", "1700 syntax error: the parrot's bit the dust!");
/* 1701: enable Container Tabs setting in preferences (see 1702) [FF50+]
 * [1] https://bugzilla.mozilla.org/1279029 ***/
pref("privacy.userContext.ui.enabled", true);
/* 1702: enable Container Tabs [FF50+]
 * [SETTING] General>Tabs>Enable Container Tabs ***/
pref("privacy.userContext.enabled", true);
/* 1703: set behaviour on "+ Tab" button to display container menu on left click [FF74+]
 * [NOTE] The menu is always shown on long press and right click
 * [SETTING] General>Tabs>Enable Container Tabs>Settings>Select a container for each new tab ***/
   // pref("privacy.userContext.newTabContainerOnLeftClick.enabled", true);

/*** [SECTION 1800]: PLUGINS ***/
pref("_user.js.parrot", "1800 syntax error: the parrot's pushing up daisies!");
/* 1803: disable Flash plugin
 * 0=deactivated, 1=ask, 2=enabled
 * ESR52.x is the last branch to *fully* support NPAPI, FF52+ stable only supports Flash
 * [NOTE] You can still override individual sites via site permissions ***/
pref("plugin.state.flash", 0);
/* 1820: disable GMP (Gecko Media Plugins)
 * [1] https://wiki.mozilla.org/GeckoMediaPlugins ***/
   // pref("media.gmp-provider.enabled", false);
/* 1825: disable widevine CDM (Content Decryption Module)
 * [NOTE] This is covered by the EME master switch (1830) ***/
pref("media.gmp-widevinecdm.visible", false); //BRACE-KEEP_FOR_NOW
pref("media.gmp-widevinecdm.enabled", false);
/* 1830: disable all DRM content (EME: Encryption Media Extension)
 * [SETUP-WEB] e.g. Netflix, Amazon Prime, Hulu, HBO, Disney+, Showtime, Starz, DirectTV
 * [SETTING] General>DRM Content>Play DRM-controlled content
 * [1] https://www.eff.org/deeplinks/2017/10/drms-dead-canary-how-we-just-lost-web-what-we-learned-it-and-what-we-need-do-next ***/
pref("media.eme.enabled", false);

/*** [SECTION 2000]: MEDIA / CAMERA / MIC ***/
pref("_user.js.parrot", "2000 syntax error: the parrot's snuffed it!");
/* 2001: disable WebRTC (Web Real-Time Communication)
 * [SETUP-WEB] WebRTC can leak your IP address from behind your VPN, but if this is not
 * in your threat model, and you want Real-Time Communication, this is the pref for you
 * [1] https://www.privacytools.io/#webrtc ***/
pref("media.peerconnection.enabled", false);
/* 2002: limit WebRTC IP leaks if using WebRTC
 * In FF70+ these settings match Mode 4 (Mode 3 in older versions) [3]
 * [TEST] https://browserleaks.com/webrtc
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1189041,1297416,1452713
 * [2] https://wiki.mozilla.org/Media/WebRTC/Privacy
 * [3] https://tools.ietf.org/html/draft-ietf-rtcweb-ip-handling-12#section-5.2 ***/
pref("media.peerconnection.ice.default_address_only", true);
pref("media.peerconnection.ice.no_host", true); // [FF51+]
pref("media.peerconnection.ice.proxy_only_if_behind_proxy", true); // [FF70+]
/* 2010: disable WebGL (Web Graphics Library)
 * [SETUP-WEB] When disabled, may break some websites. When enabled, provides high entropy,
 * especially with readPixels(). Some of the other entropy is lessened with RFP (see 4501)
 * [1] https://www.contextis.com/resources/blog/webgl-new-dimension-browser-exploitation/
 * [2] https://security.stackexchange.com/questions/13799/is-webgl-a-security-concern ***/
pref("webgl.disabled", true);
pref("webgl.enable-webgl2", false);
/* 2012: limit WebGL ***/
   // pref("webgl.min_capability_mode", true);
pref("webgl.disable-fail-if-major-performance-caveat", true); // [DEFAULT: true FF86+]
/* 2022: disable screensharing ***/
pref("media.getusermedia.screensharing.enabled", false);
pref("media.getusermedia.browser.enabled", false);
pref("media.getusermedia.audiocapture.enabled", false);
/* 2024: set a default permission for Camera/Microphone [FF58+]
 * 0=always ask (default), 1=allow, 2=block
 * [SETTING] to add site exceptions: Ctrl+I>Permissions>Use the Camera/Microphone
 * [SETTING] to manage site exceptions: Options>Privacy & Security>Permissions>Camera/Microphone>Settings ***/
   // pref("permissions.default.camera", 2);
   // pref("permissions.default.microphone", 2);
/* 2030: disable autoplay of HTML5 media [FF63+]
 * 0=Allow all, 1=Block non-muted media (default in FF67+), 2=Prompt (removed in FF66), 5=Block all (FF69+)
 * [NOTE] You can set exceptions under site permissions
 * [SETTING] Privacy & Security>Permissions>Autoplay>Settings>Default for all websites ***/
   // pref("media.autoplay.default", 5);
/* 2031: disable autoplay of HTML5 media if you interacted with the site [FF78+]
 * 0=sticky (default), 1=transient, 2=user
 * Firefox's Autoplay Policy Documentation [PDF] is linked below via SUMO
 * [NOTE] If you have trouble with some video sites, then add an exception (see 2030)
 * [1] https://support.mozilla.org/questions/1293231 ***/
pref("media.autoplay.blocking_policy", 2);

/*** [SECTION 2200]: WINDOW MEDDLING & LEAKS / POPUPS ***/
pref("_user.js.parrot", "2200 syntax error: the parrot's 'istory!");
/* 2202: prevent scripts from moving and resizing open windows ***/
pref("dom.disable_window_move_resize", true);
/* 2203: open links targeting new windows in a new tab instead
 * This stops malicious window sizes and some screen resolution leaks.
 * You can still right-click a link and open in a new window.
 * [TEST] https://arkenfox.github.io/TZP/tzp.html#screen
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/9881 ***/
pref("browser.link.open_newwindow", 3); // 1=most recent window or tab 2=new window, 3=new tab
pref("browser.link.open_newwindow.restriction", 0);
/* 2204: disable Fullscreen API (requires user interaction) to prevent screen-resolution leaks
 * [NOTE] You can still manually toggle the browser's fullscreen state (F11),
 * but this pref will disable embedded video/game fullscreen controls, e.g. youtube
 * [TEST] https://arkenfox.github.io/TZP/tzp.html#screen ***/
   // pref("full-screen-api.enabled", false);
/* 2210: block popup windows
 * [SETTING] Privacy & Security>Permissions>Block pop-up windows ***/
pref("dom.disable_open_during_load", true);
/* 2212: limit events that can cause a popup [SETUP-WEB]
 * default FF86+: "change click dblclick auxclick mousedown mouseup pointerdown pointerup notificationclick reset submit touchend contextmenu ***/
pref("dom.popup_allowed_events", "click dblclick mousedown pointerdown");

/*** [SECTION 2300]: WEB WORKERS
     A worker is a JS "background task" running in a global context, i.e. it is different from
     the current window. Workers can spawn new workers (must be the same origin & scheme),
     including service and shared workers. Shared workers can be utilized by multiple scripts and
     communicate between browsing contexts (windows/tabs/iframes) and can even control your cache.

     [1]    Web Workers: https://developer.mozilla.org/docs/Web/API/Web_Workers_API
     [2]         Worker: https://developer.mozilla.org/docs/Web/API/Worker
     [3] Service Worker: https://developer.mozilla.org/docs/Web/API/Service_Worker_API
     [4]   SharedWorker: https://developer.mozilla.org/docs/Web/API/SharedWorker
     [5]   ChromeWorker: https://developer.mozilla.org/docs/Web/API/ChromeWorker
     [6]  Notifications: https://support.mozilla.org/questions/1165867#answer-981820
***/
pref("_user.js.parrot", "2300 syntax error: the parrot's off the twig!");
/* 2302: disable service workers [FF32, FF44-compat]
 * Service workers essentially act as proxy servers that sit between web apps, and the
 * browser and network, are event driven, and can control the web page/site it is associated
 * with, intercepting and modifying navigation and resource requests, and caching resources.
 * [NOTE] Service worker APIs are hidden (in Firefox) and cannot be used when in PB mode.
 * [NOTE] Service workers only run over HTTPS. Service workers have no DOM access.
 * [SETUP-WEB] Disabling service workers will break some sites. This pref is required true for
 * service worker notifications (2304), push notifications (disabled, 2305) and service worker
 * cache (2740). If you enable this pref, then check those settings as well ***/
pref("dom.serviceWorkers.enabled", false);
/* 2304: disable Web Notifications
 * [NOTE] Web Notifications can also use service workers (2302) and are behind a prompt (2306)
 * [1] https://developer.mozilla.org/docs/Web/API/Notifications_API ***/
   // pref("dom.webnotifications.enabled", false); // [FF22+]
   // pref("dom.webnotifications.serviceworker.enabled", false); // [FF44+]
/* 2305: disable Push Notifications [FF44+]
 * Push is an API that allows websites to send you (subscribed) messages even when the site
 * isn't loaded, by pushing messages to your userAgentID through Mozilla's Push Server.
 * [NOTE] Push requires service workers (2302) to subscribe to and display, and is behind
 * a prompt (2306). Disabling service workers alone doesn't stop Firefox polling the
 * Mozilla Push Server. To remove all subscriptions, reset your userAgentID (in about:config
 * or on start), and you will get a new one within a few seconds.
 * [1] https://support.mozilla.org/en-US/kb/push-notifications-firefox
 * [2] https://developer.mozilla.org/en-US/docs/Web/API/Push_API ***/
pref("dom.push.enabled", false);
   // pref("dom.push.userAgentID", "");
/* 2306: set a default permission for Notifications (both 2304 and 2305) [FF58+]
 * 0=always ask (default), 1=allow, 2=block
 * [NOTE] Best left at default "always ask", fingerprintable via Permissions API
 * [SETTING] to add site exceptions: Ctrl+I>Permissions>Receive Notifications
 * [SETTING] to manage site exceptions: Options>Privacy & Security>Permissions>Notifications>Settings ***/
   // pref("permissions.default.desktop-notification", 2);

/*** [SECTION 2400]: DOM (DOCUMENT OBJECT MODEL) & JAVASCRIPT ***/
pref("_user.js.parrot", "2400 syntax error: the parrot's kicked the bucket!");
/* 2401: disable website control over browser right-click context menu
 * [NOTE] Shift-Right-Click will always bring up the browser right-click context menu ***/
   // pref("dom.event.contextmenu.enabled", false);
/* 2402: disable website access to clipboard events/content [SETUP-HARDEN]
 * [NOTE] This will break some sites' functionality e.g. Outlook, Twitter, Facebook, Wordpress
 * This applies to onCut/onCopy/onPaste events - i.e. it requires interaction with the website
 * [WARNING] If both 'middlemouse.paste' and 'general.autoScroll' are true (at least one
 * is default false) then enabling this pref can leak clipboard content [1]
 * [1] https://bugzilla.mozilla.org/1528289 ***/
pref("dom.event.clipboardevents.enabled", false); //BRACE-UNCOMMENTED
/* 2404: disable clipboard commands (cut/copy) from "non-privileged" content [FF41+]
 * this disables document.execCommand("cut"/"copy") to protect your clipboard
 * [1] https://bugzilla.mozilla.org/1170911 ***/
pref("dom.allow_cut_copy", false);
/* 2405: disable "Confirm you want to leave" dialog on page close
 * Does not prevent JS leaks of the page close event.
 * [1] https://developer.mozilla.org/docs/Web/Events/beforeunload
 * [2] https://support.mozilla.org/questions/1043508 ***/
pref("dom.disable_beforeunload", true);
/* 2414: disable shaking the screen ***/
pref("dom.vibrator.enabled", false);
/* 2420: disable asm.js [FF22+] [SETUP-PERF]
 * [1] http://asmjs.org/
 * [2] https://www.mozilla.org/security/advisories/mfsa2015-29/
 * [3] https://www.mozilla.org/security/advisories/mfsa2015-50/
 * [4] https://www.mozilla.org/security/advisories/mfsa2017-01/#CVE-2017-5375
 * [5] https://www.mozilla.org/security/advisories/mfsa2017-05/#CVE-2017-5400
 * [6] https://rh0dev.github.io/blog/2017/the-return-of-the-jit/ ***/
pref("javascript.options.asmjs", false);
/* 2421: disable Ion and baseline JIT to harden against JS exploits [SETUP-HARDEN]
 * [NOTE] In FF75+, when **both** Ion and JIT are disabled, **and** the new
 * hidden pref is enabled, then Ion can still be used by extensions (1599226)
 * [WARNING] Disabling Ion/JIT can cause some site issues and performance loss
 * [1] https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-0817 ***/
   // pref("javascript.options.ion", false);
   // pref("javascript.options.baselinejit", false);
   // pref("javascript.options.jit_trustedprincipals", true); // [FF75+] [HIDDEN PREF]
/* 2422: disable WebAssembly [FF52+]
 * Vulnerabilities have increasingly been found, including those known and fixed
 * in native programs years ago [2]. WASM has powerful low-level access, making
 * certain attacks (brute-force) and vulnerabilities more possible
 * [STATS] ~0.2% of websites, about half of which are for crytopmining / malvertising [2][3]
 * [1] https://developer.mozilla.org/docs/WebAssembly
 * [2] https://spectrum.ieee.org/tech-talk/telecom/security/more-worries-over-the-security-of-web-assembly
 * [3] https://www.zdnet.com/article/half-of-the-websites-using-webassembly-use-it-for-malicious-purposes ***/
pref("javascript.options.wasm", false);
/* 2429: enable (limited but sufficient) window.opener protection [FF65+]
 * Makes rel=noopener implicit for target=_blank in anchor and area elements when no rel attribute is set ***/
pref("dom.targetBlankNoOpener.enabled", true); // [DEFAULT: true FF79+]

/*** [SECTION 2500]: HARDWARE FINGERPRINTING ***/
pref("_user.js.parrot", "2500 syntax error: the parrot's shuffled off 'is mortal coil!");
/* 2502: disable Battery Status API
 * Initially a Linux issue (high precision readout) that was fixed.
 * However, it is still another metric for fingerprinting, used to raise entropy.
 * e.g. do you have a battery or not, current charging status, charge level, times remaining etc
 * [NOTE] From FF52+ Battery Status API is only available in chrome/privileged code [1]
 * [1] https://bugzilla.mozilla.org/1313580 ***/
pref("dom.battery.enabled", false); //BRACE-UNCOMMENTED
/* 2505: disable media device enumeration [FF29+]
 * [NOTE] media.peerconnection.enabled should also be set to false (see 2001)
 * [1] https://wiki.mozilla.org/Media/getUserMedia
 * [2] https://developer.mozilla.org/docs/Web/API/MediaDevices/enumerateDevices ***/
pref("media.navigator.enabled", false);
/* 2508: disable hardware acceleration to reduce graphics fingerprinting [SETUP-HARDEN]
 * [WARNING] Affects text rendering (fonts will look different), impacts video performance,
 * and parts of Quantum that utilize the GPU will also be affected as they are rolled out
 * [SETTING] General>Performance>Custom>Use hardware acceleration when available
 * [1] https://wiki.mozilla.org/Platform/GFX/HardwareAcceleration ***/
   // pref("gfx.direct2d.disabled", true); // [WINDOWS]
   // pref("layers.acceleration.disabled", true);
/* 2510: disable Web Audio API [FF51+]
 * [1] https://bugzilla.mozilla.org/1288359 ***/
pref("dom.webaudio.enabled", false);
/* 2517: disable Media Capabilities API [FF63+]
 * [WARNING] This *may* affect media performance if disabled, no one is sure
 * [1] https://github.com/WICG/media-capabilities
 * [2] https://wicg.github.io/media-capabilities/#security-privacy-considerations ***/
   // pref("media.media-capabilities.enabled", false);
/* 2520: disable virtual reality devices
 * Optional protection depending on your connected devices
 * [1] https://developer.mozilla.org/docs/Web/API/WebVR_API ***/
pref("dom.vr.enabled", false); //BRACE-UNCOMMENTED
/* 2521: set a default permission for Virtual Reality (see 2520) [FF73+]
 * 0=always ask (default), 1=allow, 2=block
 * [SETTING] to add site exceptions: Ctrl+I>Permissions>Access Virtual Reality Devices
 * [SETTING] to manage site exceptions: Options>Privacy & Security>Permissions>Virtual Reality>Settings ***/
   // pref("permissions.default.xr", 2);

/*** [SECTION 2600]: MISCELLANEOUS ***/
pref("_user.js.parrot", "2600 syntax error: the parrot's run down the curtain!");
/* 2601: prevent accessibility services from accessing your browser [RESTART]
 * [SETTING] Privacy & Security>Permissions>Prevent accessibility services from accessing your browser (FF80 or lower)
 * [1] https://support.mozilla.org/kb/accessibility-services ***/
pref("accessibility.force_disabled", 1);
/* 2602: disable sending additional analytics to web servers
 * [1] https://developer.mozilla.org/docs/Web/API/Navigator/sendBeacon ***/
pref("beacon.enabled", false);
/* 2603: remove temp files opened with an external application
 * [1] https://bugzilla.mozilla.org/302433 ***/
pref("browser.helperApps.deleteTempFileOnExit", true);
/* 2604: disable page thumbnail collection ***/
pref("browser.pagethumbnails.capturing_disabled", true); // [HIDDEN PREF]
/* 2606: disable UITour backend so there is no chance that a remote page can use it ***/
pref("browser.uitour.enabled", false);
pref("browser.uitour.url", "");
/* 2607: disable various developer tools in browser context
 * [SETTING] Devtools>Advanced Settings>Enable browser chrome and add-on debugging toolboxes
 * [1] https://github.com/pyllyukko/user.js/issues/179#issuecomment-246468676 ***/
pref("devtools.chrome.enabled", false);
/* 2608: reset remote debugging to disabled
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/16222 ***/
pref("devtools.debugger.remote-enabled", false); // [DEFAULT: false]
/* 2609: disable MathML (Mathematical Markup Language) [FF51+] [SETUP-HARDEN]
 * [TEST] https://arkenfox.github.io/TZP/tzp.html#misc
 * [1] https://bugzilla.mozilla.org/1173199 ***/
pref("mathml.disabled", true); //BRACE-UNCOMMENTED
/* 2610: disable in-content SVG (Scalable Vector Graphics) [FF53+]
 * [WARNING] Expect breakage incl. youtube player controls. Best left for a "hardened" profile.
 * [1] https://bugzilla.mozilla.org/1216893 ***/
   // pref("svg.disabled", true);
/* 2611: disable middle mouse click opening links from clipboard
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/10089 ***/
pref("middlemouse.contentLoadURL", false);
/* 2615: disable websites overriding Firefox's keyboard shortcuts [FF58+]
 * 0 (default) or 1=allow, 2=block
 * [SETTING] to add site exceptions: Ctrl+I>Permissions>Override Keyboard Shortcuts ***/
   // pref("permissions.default.shortcuts", 2);
/* 2616: remove special permissions for certain mozilla domains [FF35+]
 * [1] resource://app/defaults/permissions ***/
pref("permissions.manager.defaultsUrl", "");
/* 2617: remove webchannel whitelist ***/
pref("webchannel.allowObject.urlWhitelist", "");
/* 2619: enforce Punycode for Internationalized Domain Names to eliminate possible spoofing
 * Firefox has *some* protections, but it is better to be safe than sorry
 * [SETUP-WEB] Might be undesirable for non-latin alphabet users since legitimate IDN's are also punycoded
 * [TEST] https://www.xn--80ak6aa92e.com/ (www.apple.com)
 * [1] https://wiki.mozilla.org/IDN_Display_Algorithm
 * [2] https://en.wikipedia.org/wiki/IDN_homograph_attack
 * [3] CVE-2017-5383: https://www.mozilla.org/security/advisories/mfsa2017-02/
 * [4] https://www.xudongz.com/blog/2017/idn-phishing/ ***/
pref("network.IDN_show_punycode", true);
/* 2620: enforce Firefox's built-in PDF reader [SETUP-CHROME]
 * This setting controls if the option "Display in Firefox" is available in the setting below
 *   and by effect controls whether PDFs are handled in-browser or externally ("Ask" or "Open With")
 * PROS: pdfjs is lightweight, open source, and as secure/vetted as any pdf reader out there (more than most)
 *   Exploits are rare (1 serious case in 4 yrs), treated seriously and patched quickly.
 *   It doesn't break "state separation" of browser content (by not sharing with OS, independent apps).
 *   It maintains disk avoidance and application data isolation. It's convenient. You can still save to disk.
 * CONS: You may prefer a different pdf reader for security reasons
 * CAVEAT: JS can still force a pdf to open in-browser by bundling its own code (rare)
 * [SETTING] General>Applications>Portable Document Format (PDF) ***/
pref("pdfjs.disabled", false); // [DEFAULT: false]
/* 2621: disable links launching Windows Store on Windows 8/8.1/10 [WINDOWS] ***/
pref("network.protocol-handler.external.ms-windows-store", false);
/* 2622: enforce no system colors; they can be fingerprinted
 * [SETTING] General>Language and Appearance>Fonts and Colors>Colors>Use system colors ***/
pref("browser.display.use_system_colors", false); // [DEFAULT: false]
/* 2623: disable permissions delegation [FF73+]
 * Currently applies to cross-origin geolocation, camera, mic and screen-sharing
 * permissions, and fullscreen requests. Disabling delegation means any prompts
 * for these will show/use their correct 3rd party origin
 * [1] https://groups.google.com/forum/#!topic/mozilla.dev.platform/BdFOMAuCGW8/discussion ***/
pref("permissions.delegation.enabled", false);
/* 2624: enable "window.name" protection [FF82+]
 * If a new page from another domain is loaded into a tab, then window.name is set to an empty string. The original
 * string is restored if the tab reverts back to the original page. This change prevents some cross-site attacks
 * [TEST] https://arkenfox.github.io/TZP/tests/windownamea.html ***/
pref("privacy.window.name.update.enabled", true); // [DEFAULT: true FF86+]
/* 2625: disable bypassing 3rd party extension install prompts [FF82+]
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1659530,1681331 ***/
pref("extensions.postDownloadThirdPartyPrompt", false);

/** DOWNLOADS ***/
/* 2650: discourage downloading to desktop
 * 0=desktop, 1=downloads (default), 2=last used
 * [SETTING] To set your default "downloads": General>Downloads>Save files to ***/
   // pref("browser.download.folderList", 2);
/* 2651: enforce user interaction for security by always asking where to download
 * [SETUP-CHROME] On Android this blocks longtapping and saving images
 * [SETTING] General>Downloads>Always ask you where to save files ***/
pref("browser.download.useDownloadDir", false);
/* 2652: disable adding downloads to the system's "recent documents" list ***/
pref("browser.download.manager.addToRecentDocs", false);
/* 2654: disable "open with" in download dialog [FF50+] [SETUP-HARDEN]
 * This is very useful to enable when the browser is sandboxed (e.g. via AppArmor)
 * in such a way that it is forbidden to run external applications.
 * [WARNING] This may interfere with some users' workflow or methods
 * [1] https://bugzilla.mozilla.org/1281959 ***/
pref("browser.download.forbid_open_with", true); //BRACE-UNCOMMENTED

/** EXTENSIONS ***/
/* 2660: lock down allowed extension directories
 * [SETUP-CHROME] This will break extensions, language packs, themes and any other
 * XPI files which are installed outside of profile and application directories
 * [1] https://mike.kaply.com/2012/02/21/understanding-add-on-scopes/
 * [1] archived: https://archive.is/DYjAM ***/
   // pref("extensions.enabledScopes", 5); // [HIDDEN PREF] //BRACE-COMMENTED
   // pref("extensions.autoDisableScopes", 15); // [DEFAULT: 15] //BRACE-COMMENTED
/* 2662: disable webextension restrictions on certain mozilla domains (you also need 4503) [FF60+]
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1384330,1406795,1415644,1453988 ***/
   // pref("extensions.webextensions.restrictedDomains", "");

/** SECURITY ***/
/* 2680: enforce CSP (Content Security Policy)
 * [WARNING] CSP is a very important and widespread security feature. Don't disable it!
 * [1] https://developer.mozilla.org/docs/Web/HTTP/CSP ***/
pref("security.csp.enable", true); // [DEFAULT: true]
/* 2684: enforce a security delay on some confirmation dialogs such as install, open/save
 * [1] https://www.squarefree.com/2004/07/01/race-conditions-in-security-dialogs/ ***/
pref("security.dialog_enable_delay", 700);

/*** [SECTION 2700]: PERSISTENT STORAGE
     Data SET by websites including
            cookies : profile\cookies.sqlite
       localStorage : profile\webappsstore.sqlite
          indexedDB : profile\storage\default
           appCache : profile\OfflineCache
     serviceWorkers :

     [NOTE] indexedDB and serviceWorkers are not available in Private Browsing Mode
     [NOTE] Blocking cookies also blocks websites access to: localStorage (incl. sessionStorage),
     indexedDB, sharedWorker, and serviceWorker (and therefore service worker cache and notifications)
     If you set a site exception for cookies (either "Allow" or "Allow for Session") then they become
     accessible to websites except shared/service workers where the cookie setting *must* be "Allow"
***/
pref("_user.js.parrot", "2700 syntax error: the parrot's joined the bleedin' choir invisible!");
/* 2701: disable 3rd-party cookies and site-data [SETUP-WEB]
 * 0=Accept cookies and site data, 1=(Block) All third-party cookies, 2=(Block) All cookies,
 * 3=(Block) Cookies from unvisited websites, 4=(Block) Cross-site and social media trackers (default)
 * [NOTE] You can set exceptions under site permissions or use an extension
 * [NOTE] Enforcing category to custom ensures ETP related prefs are always honored
 * [SETTING] Privacy & Security>Enhanced Tracking Protection>Custom>Cookies ***/
pref("network.cookie.cookieBehavior", 1);
pref("browser.contentblocking.category", "custom");
/* 2702: set third-party cookies (if enabled, see 2701) to session-only
   [NOTE] .sessionOnly overrides .nonsecureSessionOnly except when .sessionOnly=false and
   .nonsecureSessionOnly=true. This allows you to keep HTTPS cookies, but session-only HTTP ones
 * [1] https://feeding.cloud.geek.nz/posts/tweaking-cookies-for-privacy-in-firefox/ ***/
pref("network.cookie.thirdparty.sessionOnly", true);
pref("network.cookie.thirdparty.nonsecureSessionOnly", true); // [FF58+]
/* 2703: delete cookies and site data on close
 * 0=keep until they expire (default), 2=keep until you close Firefox
 * [NOTE] The setting below is disabled (but not changed) if you block all cookies (2701 = 2)
 * [SETTING] Privacy & Security>Cookies and Site Data>Delete cookies and site data when Firefox is closed ***/
   // pref("network.cookie.lifetimePolicy", 2);
/* 2710: disable DOM (Document Object Model) Storage
 * [WARNING] This will break a LOT of sites' functionality AND extensions!
 * You are better off using an extension for more granular control ***/
   // pref("dom.storage.enabled", false);
/* 2730: enforce no offline cache storage (appCache)
 * The API is easily fingerprinted, use the "storage" pref instead ***/
   // pref("browser.cache.offline.enable", false);
   // pref("browser.cache.offline.storage.enable", false); // [FF71+] [DEFAULT: false FF84+] //BRACE-COMMENTED
/* 2740: disable service worker cache and cache storage
 * [NOTE] We clear service worker cache on exiting Firefox (see 2803)
 * [1] https://w3c.github.io/ServiceWorker/#privacy ***/
   // pref("dom.caches.enabled", false);
/* 2750: disable Storage API [FF51+]
 * The API gives sites the ability to find out how much space they can use, how much
 * they are already using, and even control whether or not they need to be alerted
 * before the user agent disposes of site data in order to make room for other things.
 * [1] https://developer.mozilla.org/docs/Web/API/StorageManager
 * [2] https://developer.mozilla.org/docs/Web/API/Storage_API
 * [3] https://blog.mozilla.org/l10n/2017/03/07/firefox-l10n-report-aurora-54/ ***/
   // pref("dom.storageManager.enabled", false);
/* 2755: disable Storage Access API [FF65+]
 * [1] https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API ***/
   // pref("dom.storage_access.enabled", false);
/* 2760: enable Local Storage Next Generation (LSNG) [FF65+] ***/
   // pref("dom.storage.next_gen", true); //BRACE-COMMENTED

/*** [SECTION 2800]: SHUTDOWN
     You should set the values to what suits you best.
     - "Offline Website Data" includes appCache (2730), localStorage (2710),
       service worker cache (2740), and QuotaManager (IndexedDB (2720), asm-cache)
     - In both 2803 + 2804, the 'download' and 'history' prefs are combined in the
       Firefox interface as "Browsing & Download History" and their values will be synced
***/
pref("_user.js.parrot", "2800 syntax error: the parrot's bleedin' demised!");
/* 2802: enable Firefox to clear items on shutdown (see 2803)
 * [SETTING] Privacy & Security>History>Custom Settings>Clear history when Firefox closes ***/
pref("privacy.sanitize.sanitizeOnShutdown", false); //BRACE-DISABLED
/* 2803: set what items to clear on shutdown (if 2802 is true) [SETUP-CHROME]
 * [NOTE] If 'history' is true, downloads will also be cleared regardless of the value
 * but if 'history' is false, downloads can still be cleared independently
 * However, this may not always be the case. The interface combines and syncs these
 * prefs when set from there, and the sanitize code may change at any time
 * [SETTING] Privacy & Security>History>Custom Settings>Clear history when Firefox closes>Settings ***/
pref("privacy.clearOnShutdown.cache", true);
pref("privacy.clearOnShutdown.cookies", true);
pref("privacy.clearOnShutdown.downloads", true); // see note above
pref("privacy.clearOnShutdown.formdata", true); // Form & Search History
pref("privacy.clearOnShutdown.history", true); // Browsing & Download History
pref("privacy.clearOnShutdown.offlineApps", true); // Offline Website Data
pref("privacy.clearOnShutdown.sessions", true); // Active Logins
pref("privacy.clearOnShutdown.siteSettings", false); // Site Preferences
/* 2804: reset default items to clear with Ctrl-Shift-Del (to match 2803) [SETUP-CHROME]
 * This dialog can also be accessed from the menu History>Clear Recent History
 * Firefox remembers your last choices. This will reset them when you start Firefox.
 * [NOTE] Regardless of what you set privacy.cpd.downloads to, as soon as the dialog
 * for "Clear Recent History" is opened, it is synced to the same as 'history' ***/
pref("privacy.cpd.cache", true);
pref("privacy.cpd.cookies", true);
   // pref("privacy.cpd.downloads", true); // not used, see note above
pref("privacy.cpd.formdata", true); // Form & Search History
pref("privacy.cpd.history", true); // Browsing & Download History
pref("privacy.cpd.offlineApps", true); // Offline Website Data
pref("privacy.cpd.passwords", false); // this is not listed
pref("privacy.cpd.sessions", true); // Active Logins
pref("privacy.cpd.siteSettings", false); // Site Preferences
/* 2805: clear Session Restore data when sanitizing on shutdown or manually [FF34+]
 * [NOTE] Not needed if Session Restore is not used (see 0102) or is already cleared with history (see 2803)
 * [NOTE] privacy.clearOnShutdown.openWindows prevents resuming from crashes (see 1022)
 * [NOTE] privacy.cpd.openWindows has a bug that causes an additional window to open ***/
   // pref("privacy.clearOnShutdown.openWindows", true);
   // pref("privacy.cpd.openWindows", true);
/* 2806: reset default 'Time range to clear' for 'Clear Recent History' (see 2804)
 * Firefox remembers your last choice. This will reset the value when you start Firefox.
 * 0=everything, 1=last hour, 2=last two hours, 3=last four hours,
 * 4=today, 5=last five minutes, 6=last twenty-four hours
 * [NOTE] The values 5 + 6 are not listed in the dropdown, which will display a
 * blank value if they are used, but they do work as advertised ***/
pref("privacy.sanitize.timeSpan", 0);

/*** [SECTION 4000]: FPI (FIRST PARTY ISOLATION)
   1278037 - indexedDB (FF51+)
   1277803 - favicons (FF52+)
   1264562 - OCSP cache (FF52+)
   1268726 - Shared Workers (FF52+)
   1316283 - SSL session cache (FF52+)
   1317927 - media cache (FF53+)
   1323644 - HSTS and HPKP (FF54+)
   1334690 - HTTP Alternative Services (FF54+)
   1334693 - SPDY/HTTP2 (FF55+)
   1337893 - DNS cache (FF55+)
   1344170 - blob: URI (FF55+)
   1300671 - data:, about: URLs (FF55+)
   1473247 - IP addresses (FF63+)
   1492607 - postMessage with targetOrigin "*" (requires 4002) (FF65+)
   1542309 - top-level domain URLs when host is in the public suffix list (FF68+)
   1506693 - pdfjs range-based requests (FF68+)
   1330467 - site permissions (FF69+)
   1534339 - IPv6 (FF73+)
***/
pref("_user.js.parrot", "4000 syntax error: the parrot's pegged out");
/* 4001: enable First Party Isolation [FF51+]
 * [SETUP-WEB] May break cross-domain logins and site functionality until perfected
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1260931,1299996 ***/
pref("privacy.firstparty.isolate", true);
/* 4002: enforce FPI restriction for window.opener [FF54+]
 * [NOTE] Setting this to false may reduce the breakage in 4001
 * FF65+ blocks postMessage with targetOrigin "*" if originAttributes don't match. But
 * to reduce breakage it ignores the 1st-party domain (FPD) originAttribute [2][3]
 * The 2nd pref removes that limitation and will only allow communication if FPDs also match.
 * [1] https://bugzilla.mozilla.org/1319773#c22
 * [2] https://bugzilla.mozilla.org/1492607
 * [3] https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage ***/
   // pref("privacy.firstparty.isolate.restrict_opener_access", true); // [DEFAULT: true]
   // pref("privacy.firstparty.isolate.block_post_message", true);
/* 4003: enable scheme with FPI [FF78+]
 * [NOTE] Experimental: existing data and site permissions are incompatible
 * and some site exceptions may not work e.g. HTTPS-only mode (see 1244) ***/
   // pref("privacy.firstparty.isolate.use_site", true);

/*** [SECTION 4500]: RFP (RESIST FINGERPRINTING)
   RFP covers a wide range of ongoing fingerprinting solutions.
   It is an all-or-nothing buy in: you cannot pick and choose what parts you want

   [WARNING] Do NOT use extensions to alter RFP protected metrics
   [WARNING] Do NOT use prefs in section 4600 with RFP as they can interfere

 FF41+
    418986 - limit window.screen & CSS media queries leaking identifiable info
      [TEST] https://arkenfox.github.io/TZP/tzp.html#screen
 FF50+
   1281949 - spoof screen orientation
   1281963 - hide the contents of navigator.plugins and navigator.mimeTypes (FF50+)
 FF55+
   1330890 - spoof timezone as UTC 0
   1360039 - spoof navigator.hardwareConcurrency as 2 (see 4601)
   1217238 - reduce precision of time exposed by javascript
 FF56+
   1369303 - spoof/disable performance API (see 4602, 4603)
   1333651 - spoof User Agent & Navigator API (see section 4700)
      JS: FF78+ the version is spoofed as 78, and the OS as Windows 10, OS 10.15, Android 9, or Linux
      HTTP Headers: spoofed as Windows or Android
   1369319 - disable device sensor API (see 4604)
   1369357 - disable site specific zoom (see 4605)
   1337161 - hide gamepads from content (see 4606)
   1372072 - spoof network information API as "unknown" when dom.netinfo.enabled = true (see 4607)
   1333641 - reduce fingerprinting in WebSpeech API (see 4608)
 FF57+
   1369309 - spoof media statistics (see 4610)
   1382499 - reduce screen co-ordinate fingerprinting in Touch API (see 4611)
   1217290 & 1409677 - enable fingerprinting resistance for WebGL (see 2010-12)
   1382545 - reduce fingerprinting in Animation API
   1354633 - limit MediaError.message to a whitelist
   1382533 - enable fingerprinting resistance for Presentation API
      This blocks exposure of local IP Addresses via mDNS (Multicast DNS)
 FF58+
    967895 - spoof canvas and enable site permission prompt before allowing canvas data extraction
 FF59+
   1372073 - spoof/block fingerprinting in MediaDevices API
      Spoof: enumerate devices reports one "Internal Camera" and one "Internal Microphone" if
             media.navigator.enabled is true (see 2505 which we chose to keep disabled)
      Block: suppresses the ondevicechange event (see 4612)
   1039069 - warn when language prefs are set to non en-US (see 0210, 0211)
   1222285 & 1433592 - spoof keyboard events and suppress keyboard modifier events
      Spoofing mimics the content language of the document. Currently it only supports en-US.
      Modifier events suppressed are SHIFT and both ALT keys. Chrome is not affected.
 FF60-67
   1337157 - disable WebGL debug renderer info (see 4613) (FF60+)
   1459089 - disable OS locale in HTTP Accept-Language headers (ANDROID) (FF62+)
   1479239 - return "no-preference" with prefers-reduced-motion (see 4614) (FF63+)
   1363508 - spoof/suppress Pointer Events (see 4615) (FF64+)
      FF65: pointerEvent.pointerid (1492766)
   1485266 - disable exposure of system colors to CSS or canvas (see 4616) (FF67+)
   1407366 - enable inner window letterboxing (see 4504) (FF67+)
   1494034 - return "light" with prefers-color-scheme (see 4617) (FF67+)
 FF68-77
   1564422 - spoof audioContext outputLatency (FF70+)
   1595823 - spoof audioContext sampleRate (FF72+)
   1607316 - spoof pointer as coarse and hover as none (ANDROID) (FF74+)
 FF78+
   1621433 - randomize canvas (previously FF58+ returned an all-white canvas) (FF78+)
   1653987 - limit font visibility to bundled and "Base Fonts" (see 4618) (non-ANDROID) (FF80+)
   1461454 - spoof smooth=true and powerEfficient=false for supported media in MediaCapabilities (FF82+)
***/
pref("_user.js.parrot", "4500 syntax error: the parrot's popped 'is clogs");
/* 4501: enable privacy.resistFingerprinting [FF41+]
 * This pref is the master switch for all other privacy.resist* prefs unless stated
 * [SETUP-WEB] RFP can cause the odd website to break in strange ways, and has a few side affects,
 * but is largely robust nowadays. Give it a try. Your choice. Also see 4504 (letterboxing).
 * [1] https://bugzilla.mozilla.org/418986 ***/
pref("privacy.resistFingerprinting", true);
/* 4502: set new window sizes to round to hundreds [FF55+] [SETUP-CHROME]
 * Width will round down to multiples of 200s and height to 100s, to fit your screen.
 * The override values are a starting point to round from if you want some control
 * [1] https://bugzilla.mozilla.org/1330882 ***/
   // pref("privacy.window.maxInnerWidth", 1000);
   // pref("privacy.window.maxInnerHeight", 1000);
/* 4503: disable mozAddonManager Web API [FF57+]
 * [NOTE] To allow extensions to work on AMO, you also need 2662
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1384330,1406795,1415644,1453988 ***/
pref("privacy.resistFingerprinting.block_mozAddonManager", true); // [HIDDEN PREF]
/* 4504: enable RFP letterboxing [FF67+]
 * Dynamically resizes the inner window by applying margins in stepped ranges [2]
 * If you use the dimension pref, then it will only apply those resolutions. The format is
 * "width1xheight1, width2xheight2, ..." (e.g. "800x600, 1000x1000, 1600x900")
 * [SETUP-WEB] This does NOT require RFP (see 4501) **for now**, so if you're not using 4501, or you are but
 * dislike margins being applied, then flip this pref, keeping in mind that it is effectively fingerprintable
 * [WARNING] The dimension pref is only meant for testing, and we recommend you DO NOT USE it
 * [1] https://bugzilla.mozilla.org/1407366
 * [2] https://hg.mozilla.org/mozilla-central/rev/6d2d7856e468#l2.32 ***/
pref("privacy.resistFingerprinting.letterboxing", true); // [HIDDEN PREF]
   // pref("privacy.resistFingerprinting.letterboxing.dimensions", ""); // [HIDDEN PREF]
/* 4510: disable showing about:blank as soon as possible during startup [FF60+]
 * When default true this no longer masks the RFP chrome resizing activity
 * [1] https://bugzilla.mozilla.org/1448423 ***/
pref("browser.startup.blankWindow", false);
/* 4520: disable chrome animations [FF77+] [RESTART]
 * [NOTE] pref added in FF63, but applied to chrome in FF77. RFP spoofs this for web content ***/
pref("ui.prefersReducedMotion", 1); // [HIDDEN PREF]

/*** [SECTION 4600]: RFP ALTERNATIVES
     [WARNING] Do NOT use prefs in this section with RFP as they can interfere
***/
pref("_user.js.parrot", "4600 syntax error: the parrot's crossed the Jordan");
/* [SETUP-non-RFP] Non-RFP users replace the * with a slash on this line to enable these
// FF55+
// 4601: [2514] spoof (or limit?) number of CPU cores [FF48+]
   // [NOTE] *may* affect core chrome/Firefox performance, will affect content.
   // [1] https://bugzilla.mozilla.org/1008453
   // [2] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/21675
   // [3] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/22127
   // [4] https://html.spec.whatwg.org/multipage/workers.html#navigator.hardwareconcurrency
   // pref("dom.maxHardwareConcurrency", 2);
// * * * /
// FF56+
// 4602: [2411] disable resource/navigation timing
pref("dom.enable_resource_timing", false);
// 4603: [2412] disable timing attacks
   // [1] https://wiki.mozilla.org/Security/Reviews/Firefox/NavigationTimingAPI
pref("dom.enable_performance", false);
// 4604: [2512] disable device sensor API
   // Optional protection depending on your device
   // [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/15758
   // [2] https://blog.lukaszolejnik.com/stealing-sensitive-browser-data-with-the-w3c-ambient-light-sensor-api/
   // [3] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1357733,1292751
   // pref("device.sensors.enabled", false);
// 4605: [2515] disable site specific zoom
   // Zoom levels affect screen res and are highly fingerprintable. This does not stop you using
   // zoom, it will just not use/remember any site specific settings. Zoom levels on new tabs
   // and new windows are reset to default and only the current tab retains the current zoom
pref("browser.zoom.siteSpecific", false);
// 4606: [2501] disable gamepad API - USB device ID enumeration
   // Optional protection depending on your connected devices
   // [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/13023
   // pref("dom.gamepad.enabled", false);
// 4607: [2503] disable giving away network info [FF31+]
   // e.g. bluetooth, cellular, ethernet, wifi, wimax, other, mixed, unknown, none
   // [1] https://developer.mozilla.org/docs/Web/API/Network_Information_API
   // [2] https://wicg.github.io/netinfo/
   // [3] https://bugzilla.mozilla.org/960426
pref("dom.netinfo.enabled", false); // [DEFAULT: true on Android]
// 4608: [2021] disable the SpeechSynthesis (Text-to-Speech) part of the Web Speech API
   // [1] https://developer.mozilla.org/docs/Web/API/Web_Speech_API
   // [2] https://developer.mozilla.org/docs/Web/API/SpeechSynthesis
   // [3] https://wiki.mozilla.org/HTML5_Speech_API
pref("media.webspeech.synth.enabled", false);
// * * * /
// FF57+
// 4610: [2506] disable video statistics - JS performance fingerprinting [FF25+]
   // [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/15757
   // [2] https://bugzilla.mozilla.org/654550
pref("media.video_stats.enabled", false);
// 4611: [2509] disable touch events
   // fingerprinting attack vector - leaks screen res & actual screen coordinates
   // 0=disabled, 1=enabled, 2=autodetect
   // Optional protection depending on your device
   // [1] https://developer.mozilla.org/docs/Web/API/Touch_events
   // [2] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/10286
   // pref("dom.w3c_touch_events.enabled", 0);
// * * * /
// FF59+
// 4612: [2511] disable MediaDevices change detection [FF51+]
   // [1] https://developer.mozilla.org/docs/Web/Events/devicechange
   // [2] https://developer.mozilla.org/docs/Web/API/MediaDevices/ondevicechange
pref("media.ondevicechange.enabled", false);
// * * * /
// FF60+
// 4613: [2011] disable WebGL debug info being available to websites
   // [1] https://bugzilla.mozilla.org/1171228
   // [2] https://developer.mozilla.org/docs/Web/API/WEBGL_debug_renderer_info
pref("webgl.enable-debug-renderer-info", false);
// * * * /
// FF63+
// 4614: enforce prefers-reduced-motion as no-preference [FF63+] [RESTART]
   // 0=no-preference, 1=reduce
pref("ui.prefersReducedMotion", 0); // [HIDDEN PREF]
// FF64+
// 4615: [2516] disable PointerEvents [FF86 or lower]
   // [1] https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent
   // [-] https://bugzilla.mozilla.org/1688105
pref("dom.w3c_pointer_events.enabled", false);
// * * * /
// FF67+
// 4616: [2618] disable exposure of system colors to CSS or canvas [FF44+]
   // [NOTE] See second listed bug: may cause black on black for elements with undefined colors
   // [SETUP-CHROME] Might affect CSS in themes and extensions
   // [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=232227,1330876
pref("ui.use_standins_for_native_colors", true);
// 4617: enforce prefers-color-scheme as light [FF67+]
   // 0=light, 1=dark : This overrides your OS value
pref("ui.systemUsesDarkTheme", 0); // [HIDDEN PREF]
// FF80+
// 4618: limit font visibility (non-ANDROID) [FF79+]
   // Uses hardcoded lists with two parts: kBaseFonts + kLangPackFonts [1]
   // 1=only base system fonts, 2=also fonts from optional language packs, 3=also user-installed fonts
   // [NOTE] Bundled fonts are auto-allowed
   // [1] https://searchfox.org/mozilla-central/search?path=StandardFonts*.inc
pref("layout.css.font-visibility.level", 1);
// * * * /
// ***/

/*** [SECTION 4700]: RFP ALTERNATIVES (USER AGENT SPOOFING)
     These prefs are insufficient and leak. Use RFP and **nothing else**
     - Many of the user agent components can be derived by other means. When those
       values differ, you provide more bits and raise entropy. Examples include
       workers, iframes, headers, tcp/ip attributes, feature detection, and many more
     - Web extensions also lack APIs to fully protect spoofing
***/
pref("_user.js.parrot", "4700 syntax error: the parrot's taken 'is last bow");
/* 4701: navigator DOM object overrides
 * [WARNING] DO NOT USE ***/
   // pref("general.appname.override", ""); // [HIDDEN PREF]
   // pref("general.appversion.override", ""); // [HIDDEN PREF]
   // pref("general.buildID.override", ""); // [HIDDEN PREF]
   // pref("general.oscpu.override", ""); // [HIDDEN PREF]
   // pref("general.platform.override", ""); // [HIDDEN PREF]
   // pref("general.useragent.override", ""); // [HIDDEN PREF]

/*** [SECTION 5000]: PERSONAL
     Non-project related but useful. If any of these interest you, add them to your overrides ***/
pref("_user.js.parrot", "5000 syntax error: this is an ex-parrot!");
/* WELCOME & WHAT's NEW NOTICES ***/
   // pref("browser.startup.homepage_override.mstone", "ignore"); // master switch
   // pref("startup.homepage_welcome_url", "");
   // pref("startup.homepage_welcome_url.additional", "");
   // pref("startup.homepage_override_url", ""); // What's New page after updates
/* WARNINGS ***/
   // pref("browser.tabs.warnOnClose", false);
   // pref("browser.tabs.warnOnCloseOtherTabs", false);
   // pref("browser.tabs.warnOnOpen", false);
   // pref("full-screen-api.warning.delay", 0);
   // pref("full-screen-api.warning.timeout", 0);
/* APPEARANCE ***/
   // pref("browser.download.autohideButton", false); // [FF57+]
   // pref("toolkit.legacyUserProfileCustomizations.stylesheets", true); // [FF68+] allow userChrome/userContent
/* CONTENT BEHAVIOR ***/
   // pref("accessibility.typeaheadfind", true); // enable "Find As You Type"
pref("clipboard.autocopy", false); // disable autocopy default [LINUX] //BRACE-UNCOMMENTED
   // pref("layout.spellcheckDefault", 2); // 0=none, 1-multi-line, 2=multi-line & single-line
/* UX BEHAVIOR ***/
   // pref("browser.backspace_action", 2); // 0=previous page, 1=scroll up, 2=do nothing
   // pref("browser.quitShortcut.disabled", true); // disable Ctrl-Q quit shortcut [LINUX] [MAC] [FF87+]
   // pref("browser.tabs.closeWindowWithLastTab", false);
   // pref("browser.tabs.loadBookmarksInTabs", true); // open bookmarks in a new tab [FF57+]
   // pref("browser.urlbar.decodeURLsOnCopy", true); // see bugzilla 1320061 [FF53+]
   // pref("general.autoScroll", false); // middle-click enabling auto-scrolling [DEFAULT: false on Linux]
   // pref("ui.key.menuAccessKey", 0); // disable alt key toggling the menu bar [RESTART]
   // pref("view_source.tab", false); // view "page/selection source" in a new window [FF68+, FF59 and under]
/* UX FEATURES: disable and hide the icons and menus ***/
   // pref("browser.messaging-system.whatsNewPanel.enabled", false); // What's New [FF69+]
pref("extensions.pocket.enabled", false); // Pocket Account [FF46+] //BRACE-UNCOMMENTED
pref("identity.fxaccounts.enabled", false); // Firefox Accounts & Sync [FF60+] [RESTART] //BRACE-UNCOMMENTED
   // pref("reader.parse-on-load.enabled", false); // Reader View
/* OTHER ***/
pref("browser.bookmarks.max_backups", 2); //BRACE-UNCOMMENTED
pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons", false); // disable CFR [FF67+] //BRACE-UNCOMMENTED
      // [SETTING] General>Browsing>Recommend extensions as you browse
pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features", false); // disable CFR [FF67+] //BRACE-UNCOMMENTED
      // [SETTING] General>Browsing>Recommend features as you browse
pref("network.manage-offline-status", false); // see bugzilla 620472 //BRACE-UNCOMMENTED
   // pref("xpinstall.signatures.required", false); // enforced extension signing (Nightly/ESR)

/*** [SECTION 9999]: DEPRECATED / REMOVED / LEGACY / RENAMED
     Documentation denoted as [-]. Items deprecated in FF78 or earlier have been archived at [1],
     which also provides a link-clickable, viewer-friendly version of the deprecated bugzilla tickets
     [1] https://github.com/arkenfox/user.js/issues/123
***/
pref("_user.js.parrot", "9999 syntax error: the parrot's deprecated!");
// ESR78.x still uses all the following prefs
// [NOTE] replace the * with a slash in the line above to re-enable them
// FF79
// 0212: enforce fallback text encoding to match en-US
   // When the content or server doesn't declare a charset the browser will
   // fallback to the "Current locale" based on your application language
   // [TEST] https://hsivonen.com/test/moz/check-charset.htm
   // [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/20025
   // [-] https://bugzilla.mozilla.org/1603712
pref("intl.charset.fallback.override", "windows-1252");
// FF82
// 0206: disable geographically specific results/search engines e.g. "browser.search.*.US"
   // i.e. ignore all of Mozilla's various search engines in multiple locales
   // [-] https://bugzilla.mozilla.org/1619926
pref("browser.search.geoSpecificDefaults", false);
pref("browser.search.geoSpecificDefaults.url", "");
// FF86
// 1205: disable SSL Error Reporting
   // [1] https://firefox-source-docs.mozilla.org/browser/base/sslerrorreport/preferences.html
   // [-] https://bugzilla.mozilla.org/1681839
pref("security.ssl.errorReporting.automatic", false);
pref("security.ssl.errorReporting.enabled", false);
pref("security.ssl.errorReporting.url", "");
// 2653: disable hiding mime types (Options>General>Applications) not associated with a plugin
   // [-] https://bugzilla.mozilla.org/1581678
pref("browser.download.hide_plugins_without_extensions", false);
// FF87
// 0105d: disable Activity Stream recent Highlights in the Library [FF57+]
   // [-] https://bugzilla.mozilla.org/1689405
pref("browser.library.activity-stream.enabled", false); //BRACE-UNCOMMENTED
// ***/

/* END: internal custom pref to test for syntax errors ***/
pref("_user.js.parrot", "SUCCESS: No no he's not dead, he's, he's restin'!");
