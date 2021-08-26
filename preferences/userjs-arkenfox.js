/******
* name: arkenfox user.js
* date: 30 July 2021
* version 91-alpha
* url: https://github.com/arkenfox/user.js
* license: MIT: https://github.com/arkenfox/user.js/blob/master/LICENSE.txt

* README:

  1. Consider using Tor Browser if it meets your needs or fits your threat model
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
         e.g. third party images/videos not loading on some sites? check 1601
       * Take the wiki link in step 2 and read the Troubleshooting entry
  5. Some tag info
       [SETUP-SECURITY] it's one item, read it
            [SETUP-WEB] can cause some websites to break
         [SETUP-CHROME] changes how Firefox itself behaves (i.e. not directly website related)
  6. Override Recipes: https://github.com/arkenfox/user.js/issues/1080

* RELEASES: https://github.com/arkenfox/user.js/releases

  * It is best to use the arkenfox release that is optimized for and matches your Firefox version
  * EVERYONE: each release
    - run prefsCleaner to reset prefs made inactive, including deprecated (9999s)
    ESR78
    - If you are not using arkenfox v78... (not a definitive list)
      - 1244: HTTPS-Only mode is enabled
      - 2502: non-native widget theme is enforced
      - 9999: switch the appropriate deprecated section(s) back on

* INDEX:

  0100: STARTUP
  0200: GEOLOCATION / LANGUAGE / LOCALE
  0300: QUIET FOX
  0400: SAFE BROWSING
  0500: SYSTEM ADD-ONS / EXPERIMENTS
  0600: BLOCK IMPLICIT OUTBOUND
  0700: HTTP* / TCP/IP / DNS / PROXY / SOCKS etc
  0800: LOCATION BAR / SEARCH BAR / SUGGESTIONS / HISTORY / FORMS
  0900: PASSWORDS
  1000: DISK AVOIDANCE
  1200: HTTPS (SSL/TLS / OCSP / CERTS / HPKP)
  1400: FONTS
  1600: HEADERS / REFERERS
  1700: CONTAINERS
  2000: PLUGINS / MEDIA / WEBRTC
  2300: WEB WORKERS
  2400: DOM (DOCUMENT OBJECT MODEL)
  2500: FINGERPRINTING
  2600: MISCELLANEOUS
  2700: PERSISTENT STORAGE
  2800: SHUTDOWN
  4000: FPI (FIRST PARTY ISOLATION)
  4500: RFP (RESIST FINGERPRINTING)
  5000: OPTIONAL OPSEC
  5500: OPTIONAL HARDENING
  6000: DON'T TOUCH
  7000: DON'T BOTHER
  8000: DON'T BOTHER: NON-RFP
  9000: PERSONAL
  9999: DEPRECATED / REMOVED / LEGACY / RENAMED

******/

/* START: internal custom pref to test for syntax errors
 * [NOTE] Not all syntax errors cause parsing to abort i.e. reaching the last debug pref
 * no longer necessarily means that all prefs have been applied. Check the console right
 * after startup for any warnings/error messages related to non-applied prefs
 * [1] https://blog.mozilla.org/nnethercote/2018/03/09/a-new-preferences-parser-for-firefox/ ***/
pref("_user.js.parrot", "START: Oh yes, the Norwegian Blue... what's wrong with it?");

/* 0000: disable about:config warning ***/
pref("browser.aboutConfig.showWarning", false);

/*** [SECTION 0100]: STARTUP ***/
pref("_user.js.parrot", "0100 syntax error: the parrot's dead!");
/* 0101: disable default browser check
 * [SETTING] General>Startup>Always check if Firefox is your default browser ***/
pref("browser.shell.checkDefaultBrowser", false);
/* 0102: set startup page [SETUP-CHROME]
 * 0=blank, 1=home, 2=last visited page, 3=resume previous session
 * [NOTE] Session Restore is cleared with history (2803, 2804), and not used in Private Browsing mode
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
/* 0105: disable some Activity Stream items
 * Activity Stream is the default homepage/newtab based on metadata and browsing behavior
 * [SETTING] Home>Firefox Home Content>...  to show/hide what you want ***/
pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
pref("browser.newtabpage.activity-stream.telemetry", false);
pref("browser.newtabpage.activity-stream.feeds.snippets", false); // [DEFAULT: false FF89+]
pref("browser.newtabpage.activity-stream.feeds.section.topstories", false);
pref("browser.newtabpage.activity-stream.section.highlights.includePocket", false);
pref("browser.newtabpage.activity-stream.showSponsored", false);
pref("browser.newtabpage.activity-stream.feeds.discoverystreamfeed", false); // [FF66+]
pref("browser.newtabpage.activity-stream.showSponsoredTopSites", false); // [FF83+]
pref("browser.newtabpage.activity-stream.asrouter.providers.snippets", "{}"); //BRACE-KEEP_FOR_NOW
/* 0106: clear default topsites
 * [NOTE] This does not block you from adding your own ***/
pref("browser.newtabpage.activity-stream.default.sites", "");

/*** [SECTION 0200]: GEOLOCATION / LANGUAGE / LOCALE ***/
pref("_user.js.parrot", "0200 syntax error: the parrot's definitely deceased!");
/* 0201: use Mozilla geolocation service instead of Google if permission is granted [FF74+]
 * Optionally enable logging to the console (defaults to false) ***/
pref("geo.provider.network.url", "https://location.services.mozilla.com/v1/geolocate?key=%MOZILLA_API_KEY%");
   // pref("geo.provider.network.logging.enabled", true); // [HIDDEN PREF]
/* 0202: disable using the OS's geolocation service ***/
pref("geo.provider.ms-windows-location", false); // [WINDOWS]
pref("geo.provider.use_corelocation", false); // [MAC]
pref("geo.provider.use_gpsd", false); // [LINUX]
/* 0203: disable region updates
 * [1] https://firefox-source-docs.mozilla.org/toolkit/modules/toolkit_modules/Region.html ***/
pref("browser.region.network.url", ""); // [FF78+]
pref("browser.region.update.enabled", false); // [[FF79+]
/* 0204: set search region
 * [NOTE] May not be hidden if Firefox has changed your settings due to your region (0203) ***/
   // pref("browser.search.region", "US"); // [HIDDEN PREF]
/* 0210: set preferred language for displaying web pages
 * [TEST] https://addons.mozilla.org/about ***/
pref("intl.accept_languages", "en-US, en");
/* 0211: use US English locale regardless of the system locale
 * [SETUP-WEB] May break some input methods e.g xim/ibus for CJK languages [1]
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=867501,1629630 ***/
pref("javascript.use_us_english_locale", true); // [HIDDEN PREF]

/*** [SECTION 0300]: QUIET FOX ***/
pref("_user.js.parrot", "0300 syntax error: the parrot's not pinin' for the fjords!");
/* 0301: disable auto-INSTALLING Firefox updates [NON-WINDOWS]
 * [NOTE] You will still get prompts to update, and should do so in a timely manner
 * [SETTING] General>Firefox Updates>Check for updates but let you choose to install them ***/
   // pref("app.update.auto", false); //BRACE-COMMENTED
/* 0302: disable auto-INSTALLING Firefox updates via a background service [FF90+] [WINDOWS]
 * [SETTING] General>Firefox Updates>Automatically install updates>When Firefox is not running
 * [1] https://support.mozilla.org/kb/enable-background-updates-firefox-windows ***/
pref("app.update.background.scheduling.enabled", false);
/* 0303: disable auto-CHECKING for extension and theme updates ***/
   // pref("extensions.update.enabled", false);
/* 0304: disable auto-INSTALLING extension and theme updates (after the check in 0303)
 * [SETTING] about:addons>Extensions>[cog-wheel-icon]>Update Add-ons Automatically (toggle) ***/
   // pref("extensions.update.autoUpdateDefault", false);
/* 0306: disable extension metadata
 * used when installing/updating an extension, and in daily background update checks:
 * when false, extension detail tabs will have no description ***/
   // pref("extensions.getAddons.cache.enabled", false);
/* 0308: disable search engine updates (e.g. OpenSearch)
 * [NOTE] This does not affect Mozilla's built-in or Web Extension search engines ***/
pref("browser.search.update", false);
/* 0320: disable about:addons' Recommendations pane (uses Google Analytics) ***/
pref("extensions.getAddons.showPane", false); // [HIDDEN PREF]
/* 0321: disable recommendations in about:addons' Extensions and Themes panes [FF68+] ***/
pref("extensions.htmlaboutaddons.recommendations.enabled", false);
/* 0330: disable telemetry
 * The "unified" pref affects the behaviour of the "enabled" pref
 * - If "unified" is false then "enabled" controls the telemetry module
 * - If "unified" is true then "enabled" only controls whether to record extended data
 * [NOTE] FF58+ "toolkit.telemetry.enabled" is now LOCKED to reflect prerelease
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
/* 0342: disable Studies
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
 * [1] https://www.eff.org/deeplinks/2017/08/how-captive-portals-interfere-wireless-security-and-privacy ***/
pref("captivedetect.canonicalURL", "");
pref("network.captive-portal-service.enabled", false); // [FF52+]
/* 0391: disable Network Connectivity checks [FF65+]
 * [1] https://bugzilla.mozilla.org/1460537 ***/
pref("network.connectivity-service.enabled", false);

/*** [SECTION 0400]: SAFE BROWSING (SB)
   SB has taken many steps to preserve privacy. If required, a full url is never sent
   to Google, only a part-hash of the prefix, hidden with noise of other real part-hashes.
   Firefox takes measures such as striping out identifying parameters and since SBv4 (FF57+)
   doesn't even use cookies. (#Turn on browser.safebrowsing.debug to monitor this activity)
   FWIW, Google also swear it is anonymized and only used to flag malicious sites.

   [1] https://feeding.cloud.geek.nz/posts/how-safe-browsing-works-in-firefox/
   [2] https://wiki.mozilla.org/Security/Safe_Browsing
   [3] https://support.mozilla.org/kb/how-does-phishing-and-malware-protection-work
***/
pref("_user.js.parrot", "0400 syntax error: the parrot's passed on!");
/* 0401: disable SB (Safe Browsing)
 * [WARNING] Do this at your own risk! These are the master switches
 * [SETTING] Privacy & Security>Security>... Block dangerous and deceptive content ***/
   // pref("browser.safebrowsing.malware.enabled", false);
   // pref("browser.safebrowsing.phishing.enabled", false);
/* 0402: disable SB checks for downloads (both local lookups + remote)
 * This is the master switch for the safebrowsing.downloads* prefs (0403, 0404)
 * [SETTING] Privacy & Security>Security>... "Block dangerous downloads" ***/
   // pref("browser.safebrowsing.downloads.enabled", false);
/* 0403: disable SB checks for downloads (remote)
 * To verify the safety of certain executable files, Firefox may submit some information about the
 * file, including the name, origin, size and a cryptographic hash of the contents, to the Google
 * Safe Browsing service which helps Firefox determine whether or not the file should be blocked
 * [SETUP-SECURITY] If you do not understand this, or you want this protection, then override it ***/
pref("browser.safebrowsing.downloads.remote.enabled", false);
pref("browser.safebrowsing.downloads.remote.url", "");
/* 0404: disable SB checks for unwanted software
 * [SETTING] Privacy & Security>Security>... "Warn you about unwanted and uncommon software" ***/
   // pref("browser.safebrowsing.downloads.remote.block_potentially_unwanted", false);
   // pref("browser.safebrowsing.downloads.remote.block_uncommon", false);
/* 0405: disable "ignore this warning" on SB warnings [FF45+]
 * If clicked, it bypasses the block for that session. This is a means for admins to enforce SB
 * [TEST] see github wiki APPENDIX A: Test Sites: Section 5
 * [1] https://bugzilla.mozilla.org/1226490 ***/
   // pref("browser.safebrowsing.allowOverride", false);

/*** [SECTION 0500]: SYSTEM ADD-ONS / EXPERIMENTS
   System Add-ons are a method for shipping extensions, considered to be
   built-in features to Firefox, that are hidden from the about:addons UI.
   To view your System Add-ons go to about:support, they are listed under "Firefox Features"

   * Portable: "...\App\Firefox64\browser\features\" (or "App\Firefox\etc" for 32bit)
   * Windows: "...\Program Files\Mozilla\browser\features" (or "Program Files (X86)\etc" for 32bit)
   * Mac: "...\Applications\Firefox\Contents\Resources\browser\features\"
       [NOTE] On Mac you can right-click on the application and select "Show Package Contents"
   * Linux: "/usr/lib/firefox/browser/features" (or similar)

   [1] https://firefox-source-docs.mozilla.org/toolkit/mozapps/extensions/addon-manager/SystemAddons.html
   [2] https://searchfox.org/mozilla-central/source/browser/extensions
***/
pref("_user.js.parrot", "0500 syntax error: the parrot's cashed in 'is chips!");
/* 0503: disable Normandy/Shield [FF60+]
 * Shield is a telemetry system that can push and test "recipes"
 * [1] https://mozilla.github.io/normandy/ ***/
pref("app.normandy.enabled", false);
pref("app.normandy.api_url", "");
/* 0505: disable System Add-on updates ***/
pref("extensions.systemAddon.update.enabled", false); // [FF62+]
pref("extensions.systemAddon.update.url", ""); // [FF44+]
/* 0506: disable PingCentre telemetry (used in several System Add-ons) [FF57+]
 * Defense-in-depth: currently covered by 0340 ***/
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
   // pref("network.dns.disablePrefetchFromHTTPS", true); // [DEFAULT: true]
/* 0603: disable predictor / prefetching ***/
pref("network.predictor.enabled", false);
   // pref("network.predictor.enable-prefetch", false); // [FF48+] [DEFAULT: false]
/* 0604: disable link-mouseover opening connection to linked server
 * [1] https://news.slashdot.org/story/15/08/14/2321202/how-to-quash-firefoxs-silent-requests ***/
pref("network.http.speculative-parallel-limit", 0);
/* 0605: enforce no "Hyperlink Auditing" (click tracking)
 * [1] https://www.bleepingcomputer.com/news/software/major-browsers-to-prevent-disabling-of-click-tracking-privacy-risk/ ***/
   // pref("browser.send_pings", false); // [DEFAULT: false]

/*** [SECTION 0700]: HTTP* / TCP/IP / DNS / PROXY / SOCKS etc ***/
pref("_user.js.parrot", "0700 syntax error: the parrot's given up the ghost!");
/* 0701: disable IPv6
 * IPv6 can be abused, especially with MAC addresses, and can leak with VPNs: assuming
 * your ISP and/or router and/or website is IPv6 capable. Most sites will fall back to IPv4
 * [STATS] Firefox telemetry (July 2021) shows ~10% of all connections are IPv6
 * [NOTE] This is an application level fallback. Disabling IPv6 is best done at an
 * OS/network level, and/or configured properly in VPN setups. If you are not masking your IP,
 * then this won't make much difference. If you are masking your IP, then it can only help.
 * [NOTE] PHP defaults to IPv6 with "localhost". Use "php -S 127.0.0.1:PORT"
 * [TEST] https://ipleak.org/
 * [1] https://www.internetsociety.org/tag/ipv6-security/ (Myths 2,4,5,6) ***/
   // pref("network.dns.disableIPv6", true); //BRACE-COMMENTED
/* 0702: set the proxy server to do any DNS lookups when using SOCKS
 * e.g. in Tor, this stops your local DNS server from knowing your Tor destination
 * as a remote Tor node will handle the DNS request
 * [1] https://trac.torproject.org/projects/tor/wiki/doc/TorifyHOWTO/WebBrowsers ***/
pref("network.proxy.socks_remote_dns", true);
/* 0703: disable using UNC (Uniform Naming Convention) paths [FF61+]
 * [SETUP-CHROME] Can break extensions for profiles on network shares
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/26424 ***/
pref("network.file.disable_unc_paths", true); // [HIDDEN PREF]
/* 0704: disable GIO as a potential proxy bypass vector
 * Gvfs/GIO has a set of supported protocols like obex, network, archive, computer, dav, cdda,
 * gphoto2, trash, etc. By default only smb and sftp protocols are accepted so far (as of FF64)
 * [1] https://bugzilla.mozilla.org/1433507
 * [2] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/23044
 * [3] https://en.wikipedia.org/wiki/GVfs
 * [4] https://en.wikipedia.org/wiki/GIO_(software) ***/
pref("network.gio.supported-protocols", ""); // [HIDDEN PREF]

/*** [SECTION 0800]: LOCATION BAR / SEARCH BAR / SUGGESTIONS / HISTORY / FORMS ***/
pref("_user.js.parrot", "0800 syntax error: the parrot's ceased to be!");
/* 0801: disable location bar using search
 * Don't leak URL typos to a search engine, give an error message instead
 * Examples: "secretplace,com", "secretplace/com", "secretplace com", "secret place.com"
 * [NOTE] This does not affect explicit user action such as using search buttons in the
 * dropdown, or using keyword search shortcuts you configure in options (e.g. "d" for DuckDuckGo)
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
/* 0804: disable live search suggestions
 * [NOTE] Both must be true for the location bar to work
 * [SETUP-CHROME] Change these if you trust and use a privacy respecting search engine
 * [SETTING] Search>Provide search suggestions | Show search suggestions in address bar results ***/
pref("browser.search.suggest.enabled", false);
pref("browser.urlbar.suggest.searches", false);
/* 0805: disable location bar making speculative connections [FF56+]
 * [1] https://bugzilla.mozilla.org/1348275 ***/
pref("browser.urlbar.speculativeConnect.enabled", false);
/* 0806: disable location bar leaking single words to a DNS provider **after searching** [FF78+]
 * 0=never resolve single words, 1=heuristic (default), 2=always resolve
 * [NOTE] For FF78 value 1 and 2 are the same and always resolve but that will change in future versions
 * [1] https://bugzilla.mozilla.org/1642623 ***/
pref("browser.urlbar.dnsResolveSingleWordsAfterSearch", 0);
/* 0807: disable tab-to-search [FF85+]
 * Alternatively, you can exclude on a per-engine basis by unchecking them in Options>Search
 * [SETTING] Privacy & Security>Address Bar>When using the address bar, suggest>Search engines ***/
   // pref("browser.urlbar.suggest.engines", false);
/* 0808: disable search and form history
 * [SETUP-WEB] Be aware that autocomplete form data can be read by third parties [1][2]
 * [NOTE] We also clear formdata on exit (2803)
 * [SETTING] Privacy & Security>History>Custom Settings>Remember search and form history
 * [1] https://blog.mindedsecurity.com/2011/10/autocompleteagain.html
 * [2] https://bugzilla.mozilla.org/381681 ***/
pref("browser.formfill.enable", false);
/* 0808: disable coloring of visited links
 * [SETUP-HARDEN] Bulk rapid history sniffing was mitigated in 2010 [1][2]. Slower and more expensive
 * redraw timing attacks were largely mitigated in FF77+ [3]. Using RFP (4501) further hampers timing
 * attacks. Don't forget clearing history on close (2803). However, social engineering [2#limits][4][5]
 * and advanced targeted timing attacks could still produce usable results
 * [1] https://developer.mozilla.org/docs/Web/CSS/Privacy_and_the_:visited_selector
 * [2] https://dbaron.org/mozilla/visited-privacy
 * [3] https://bugzilla.mozilla.org/1632765
 * [4] https://earthlng.github.io/testpages/visited_links.html (see github wiki APPENDIX A on how to use)
 * [5] https://lcamtuf.blogspot.com/2016/08/css-mix-blend-mode-is-bad-for-keeping.html ***/
pref("layout.css.visited_links_enabled", false); //BRACE-UNCOMMENTED

/*** [SECTION 0900]: PASSWORDS
   [1] https://support.mozilla.org/kb/use-primary-password-protect-stored-logins-and-pas
***/
pref("_user.js.parrot", "0900 syntax error: the parrot's expired!");
/* 0901: set when Firefox should prompt for the primary password
 * 0=once per session (default), 1=every time it's needed, 2=after n minutes (0902) ***/
pref("security.ask_for_password", 2);
/* 0902: set how long in minutes Firefox should remember the primary password (0901) ***/
pref("security.password_lifetime", 5); // [DEFAULT: 30]
/* 0903: disable auto-filling username & password form fields
 * can leak in cross-site forms *and* be spoofed
 * [NOTE] Username & password is still available when you enter the field
 * [SETTING] Privacy & Security>Logins and Passwords>Autofill logins and passwords
 * [1] https://freedom-to-tinker.com/2017/12/27/no-boundaries-for-user-identities-web-trackers-exploit-browser-login-managers/ ***/
pref("signon.autofillForms", false);
/* 0904: disable formless login capture for Password Manager [FF51+] ***/
pref("signon.formlessCapture.enabled", false);
/* 0905: limit (or disable) HTTP authentication credentials dialogs triggered by sub-resources [FF41+]
 * hardens against potential credentials phishing
 * 0 = don't allow sub-resources to open HTTP authentication credentials dialogs
 * 1 = don't allow cross-origin sub-resources to open HTTP authentication credentials dialogs
 * 2 = allow sub-resources to open HTTP authentication credentials dialogs (default) ***/
pref("network.auth.subresource-http-auth-allow", 1);
/* 0906: disable automatic authentication on Microsoft sites [FF91+] [WINDOWS 10+]
 * [SETTING] Privacy & Security>Logins and Passwords>Allow Windows single sign-on for...
 * [1] https://support.mozilla.org/kb/windows-sso ***/
pref("network.http.windows-sso.enabled", false);

/*** [SECTION 1000]: DISK AVOIDANCE
   [NOTE] Cache is isolated with network partitioning (FF85+) or FPI
***/
pref("_user.js.parrot", "1000 syntax error: the parrot's gone to meet 'is maker!");
/* 1001: disable disk cache
 * [SETUP-CHROME] If you think disk cache helps perf, then feel free to override this
 * [NOTE] We also clear cache on exit (2803) ***/
   // pref("browser.cache.disk.enable", false); //BRACE-COMMENTED
/* 1002: disable media cache from writing to disk in Private Browsing
 * [NOTE] MSE (Media Source Extensions) are already stored in-memory in PB
 * [SETUP-WEB] ESR78: playback might break on subsequent loading (1650281) ***/
pref("browser.privatebrowsing.forceMediaMemoryCache", true); // [FF75+]
pref("media.memory_cache_max_size", 65536);
/* 1003: disable storing extra session data [SETUP-CHROME]
 * define on which sites to save extra session data such as form content, cookies and POST data
 * 0=everywhere, 1=unencrypted sites, 2=nowhere ***/
pref("browser.sessionstore.privacy_level", 2);
/* 1004: set the minimum interval between session save operations
 * Increasing this can help on older machines and some websites, as well as reducing writes [1]
 * [SETUP-CHROME] This can affect entries in "Recently Closed Tabs": i.e. the
 * longer the interval the more chance a quick tab open/close won't be captured
 * [1] https://bugzilla.mozilla.org/1304389 ***/
pref("browser.sessionstore.interval", 30000); // [DEFAULT: 15000]
/* 1005: disable automatic Firefox start and session restore after reboot [FF62+] [WINDOWS]
 * [1] https://bugzilla.mozilla.org/603903 ***/
pref("toolkit.winRegisterApplicationRestart", false);
/* 1006: disable favicons in shortcuts
 * URL shortcuts use a cached randomly named .ico file which is stored in your
 * profile/shortcutCache directory. The .ico remains after the shortcut is deleted
 * If set to false then the shortcuts use a generic Firefox icon ***/
pref("browser.shell.shortcutFavicons", false);

/*** [SECTION 1200]: HTTPS (SSL/TLS / OCSP / CERTS / HPKP)
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
 * [STATS] SSL Labs (July 2021) reports over 99% of sites have secure renegotiation [4]
 * [1] https://wiki.mozilla.org/Security:Renegotiation
 * [2] https://tools.ietf.org/html/rfc5746
 * [3] https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2009-3555
 * [4] https://www.ssllabs.com/ssl-pulse/ ***/
pref("security.ssl.require_safe_negotiation", true);
/* 1203: reset TLS 1.0 and 1.1 downgrades i.e. session only ***/
pref("security.tls.version.enable-deprecated", false); // [DEFAULT: false]
/* 1206: disable TLS1.3 0-RTT (round-trip time) [FF51+]
 * [1] https://github.com/tlswg/tls13-spec/issues/1001
 * [2] https://blog.cloudflare.com/tls-1-3-overview-and-q-and-a/ ***/
pref("security.tls.enable_0rtt_data", false);

/** OCSP (Online Certificate Status Protocol)
   [1] https://scotthelme.co.uk/revocation-is-broken/
   [2] https://blog.mozilla.org/security/2013/07/29/ocsp-stapling-in-firefox/
***/
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
 * 0 = allow all
 * 1 = block all
 * 3 = only allow locally-added roots (e.g. anti-virus) (default)
 * 4 = only allow locally-added roots or for certs in 2015 and earlier
 * [SETUP-CHROME] If you have problems, update your software: SHA-1 is obsolete
 * [1] https://blog.mozilla.org/security/2016/10/18/phasing-out-sha-1-on-the-public-web/ ***/
pref("security.pki.sha1_enforcement_level", 1);
/* 1221: disable Windows 8.1's Microsoft Family Safety cert [FF50+] [WINDOWS]
 * 0=disable detecting Family Safety mode and importing the root
 * 1=only attempt to detect Family Safety mode (don't import the root)
 * 2=detect Family Safety mode and import the root
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/21686 ***/
pref("security.family_safety.mode", 0);
/* 1223: enable strict pinning
 * PKP (Public Key Pinning) 0=disabled 1=allow user MiTM (such as your antivirus), 2=strict
 * [SETUP-WEB] If you rely on an AV (antivirus) to protect your web browsing
 * by inspecting ALL your web traffic, then leave at current default=1
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/16206 ***/
pref("security.cert_pinning.enforcement_level", 2);
/* 1224: enable CRLite [FF73+]
 * In FF84+ it covers valid certs and in mode 2 doesn't fall back to OCSP
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1429800,1670985
 * [2] https://blog.mozilla.org/security/tag/crlite/ ***/
pref("security.remote_settings.crlite_filters.enabled", true);
pref("security.pki.crlite_mode", 2);

/** MIXED CONTENT ***/
/* 1241: disable insecure passive content (such as images) on https pages [SETUP-WEB] ***/
pref("security.mixed_content.block_display_content", true);
/* 1244: enable HTTPS-Only mode in all windows [FF76+]
 * When the top-level is HTTPS, insecure subresources are also upgraded (silent fail)
 * [SETTING] to add site exceptions: Padlock>HTTPS-Only mode>On (after "Continue to HTTP Site")
 * [SETTING] Privacy & Security>HTTPS-Only Mode (and manage exceptions)
 * [TEST] http://example.com [upgrade]
 * [TEST] http://neverssl.com/ [no upgrade] ***/
   //pref("dom.security.https_only_mode", true); // [FF76+] //MULL-COMMENTED
   // pref("dom.security.https_only_mode_pbm", true); // [FF80+]
/* 1245: enable HTTPS-Only mode for local resources [FF77+] ***/
   // pref("dom.security.https_only_mode.upgrade_local", true);
/* 1246: disable HTTP background requests [FF82+]
 * When attempting to upgrade, if the server doesn't respond within 3 seconds,
 * Firefox sends HTTP requests in order to check if the server supports HTTPS or not
 * This is done to avoid waiting for a timeout which takes 90 seconds
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1642387,1660945 ***/
   // pref("dom.security.https_only_mode_send_http_background_request", false); //BRACE-COMMENTED

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
/* 1401: disable rendering of SVG OpenType fonts ***/
pref("gfx.font_rendering.opentype_svg.enabled", false);
/* 1402: limit font visibility (Windows, Mac, some Linux) [FF79+]
 * [NOTE] In FF80+ RFP ignores the pref and uses value 1
 * Uses hardcoded lists with two parts: kBaseFonts + kLangPackFonts [1], bundled fonts are auto-allowed
 * 1=only base system fonts, 2=also fonts from optional language packs, 3=also user-installed fonts
 * [1] https://searchfox.org/mozilla-central/search?path=StandardFonts*.inc ***/
   // pref("layout.css.font-visibility.level", 1);

/*** [SECTION 1600]: HEADERS / REFERERS
   Expect some breakage e.g. banks: use an extension if you need precise control
                  full URI: https://example.com:8888/foo/bar.html?id=1234
     scheme+host+port+path: https://example.com:8888/foo/bar.html
          scheme+host+port: https://example.com:8888
   [1] https://feeding.cloud.geek.nz/posts/tweaking-referrer-for-privacy-in-firefox/
***/
pref("_user.js.parrot", "1600 syntax error: the parrot rests in peace!");
/* 1601: control when to send a cross origin referer
 * 0=always (default), 1=only if base domains match, 2=only if hosts match
 * [SETUP-WEB] Known to cause issues with older modems/routers and some sites e.g vimeo, icloud, instagram ***/
pref("network.http.referer.XOriginPolicy", 2);
/* 1602: control the amount of cross origin information to send [FF52+]
 * 0=send full URI (default), 1=scheme+host+port+path, 2=scheme+host+port ***/
pref("network.http.referer.XOriginTrimmingPolicy", 2);
/* 1603: enable the DNT (Do Not Track) HTTP header
 * [NOTE] DNT is enforced with Enhanced Tracking Protection (2710)
 * [SETTING] Privacy & Security>Enhanced Tracking Protection>Send websites a "Do Not Track" signal... ***/
   // pref("privacy.donottrackheader.enabled", true);

/*** [SECTION 1700]: CONTAINERS
   Check out Temporary Containers [2], read the article [3], and visit the wiki/repo [4]
   [1] https://wiki.mozilla.org/Security/Contextual_Identity_Project/Containers
   [2] https://addons.mozilla.org/firefox/addon/temporary-containers/
   [3] https://medium.com/@stoically/enhance-your-privacy-in-firefox-with-temporary-containers-33925cd6cd21
   [4] https://github.com/stoically/temporary-containers/wiki
***/
pref("_user.js.parrot", "1700 syntax error: the parrot's bit the dust!");
/* 1701: enable Container Tabs and it's UI setting [FF50+]
 * [SETTING] General>Tabs>Enable Container Tabs ***/
pref("privacy.userContext.enabled", true);
pref("privacy.userContext.ui.enabled", true);
/* 1702: set behaviour on "+ Tab" button to display container menu on left click [FF74+]
 * [NOTE] The menu is always shown on long press and right click
 * [SETTING] General>Tabs>Enable Container Tabs>Settings>Select a container for each new tab ***/
   // pref("privacy.userContext.newTabContainerOnLeftClick.enabled", true);

/*** [SECTION 2000]: PLUGINS / MEDIA / WEBRTC ***/
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
/* 2003: disable screensharing ***/
pref("media.getusermedia.screensharing.enabled", false);
pref("media.getusermedia.browser.enabled", false);
pref("media.getusermedia.audiocapture.enabled", false);
/* 2020: disable GMP (Gecko Media Plugins)
 * [1] https://wiki.mozilla.org/GeckoMediaPlugins ***/
   // pref("media.gmp-provider.enabled", false);
/* 2021: disable widevine CDM (Content Decryption Module)
 * [NOTE] This is covered by the EME master switch (2022) ***/
pref("media.gmp-widevinecdm.enabled", false); //BRACE-UNCOMMENTED
pref("media.gmp-widevinecdm.visible", false); //BRACE-KEEP_FOR_NOW
/* 2022: disable all DRM content (EME: Encryption Media Extension)
 * [SETUP-WEB] e.g. Netflix, Amazon Prime, Hulu, HBO, Disney+, Showtime, Starz, DirectTV
 * [SETTING] General>DRM Content>Play DRM-controlled content
 * [TEST] https://bitmovin.com/demos/drm
 * [1] https://www.eff.org/deeplinks/2017/10/drms-dead-canary-how-we-just-lost-web-what-we-learned-it-and-what-we-need-do-next ***/
pref("media.eme.enabled", false);
/* 2030: disable autoplay of HTML5 media [FF63+]
 * 0=Allow all, 1=Block non-muted media (default), 5=Block all
 * [NOTE] You can set exceptions under site permissions
 * [SETTING] Privacy & Security>Permissions>Autoplay>Settings>Default for all websites ***/
   // pref("media.autoplay.default", 5);
/* 2031: disable autoplay of HTML5 media if you interacted with the site [FF78+]
 * 0=sticky (default), 1=transient, 2=user
 * Firefox's Autoplay Policy Documentation [PDF] is linked below via SUMO
 * [NOTE] If you have trouble with some video sites, then add an exception (2030)
 * [1] https://support.mozilla.org/questions/1293231 ***/
pref("media.autoplay.blocking_policy", 2);

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
 * [NOTE] Service workers require HTTPS, have no DOM access, and are not supported in PB mode [1]
 * [SETUP-WEB] Disabling service workers will break some sites. This pref is required true for
 * service worker notifications (2304), push notifications (disabled, 2305) and service worker
 * cache (2740). If you enable this pref, then check those settings as well
 * [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1320796#c7 ***/
pref("dom.serviceWorkers.enabled", false);
/* 2304: disable Web Notifications
 * [NOTE] Web Notifications can also use service workers (2302) and are behind a prompt (7002)
 * [1] https://developer.mozilla.org/docs/Web/API/Notifications_API ***/
   // pref("dom.webnotifications.enabled", false); // [FF22+]
   // pref("dom.webnotifications.serviceworker.enabled", false); // [FF44+]
/* 2305: disable Push Notifications [FF44+]
 * Push is an API that allows websites to send you (subscribed) messages even when the site
 * isn't loaded, by pushing messages to your userAgentID through Mozilla's Push Server
 * [NOTE] Push requires service workers (2302) to subscribe to and display, and is behind
 * a prompt (7002). Disabling service workers alone doesn't stop Firefox polling the
 * Mozilla Push Server. To remove all subscriptions, reset your userAgentID.
 * [1] https://support.mozilla.org/kb/push-notifications-firefox
 * [2] https://developer.mozilla.org/docs/Web/API/Push_API ***/
pref("dom.push.enabled", false);
   // pref("dom.push.userAgentID", "");

/*** [SECTION 2400]: DOM (DOCUMENT OBJECT MODEL) ***/
pref("_user.js.parrot", "2400 syntax error: the parrot's kicked the bucket!");
/* 2401: disable "Confirm you want to leave" dialog on page close
 * Does not prevent JS leaks of the page close event
 * [1] https://developer.mozilla.org/docs/Web/Events/beforeunload ***/
pref("dom.disable_beforeunload", true);
/* 2402: prevent scripts from moving and resizing open windows ***/
pref("dom.disable_window_move_resize", true);
/* 2403: block popup windows
 * [SETTING] Privacy & Security>Permissions>Block pop-up windows ***/
pref("dom.disable_open_during_load", true);
/* 2404: limit events that can cause a popup [SETUP-WEB] ***/
pref("dom.popup_allowed_events", "click dblclick mousedown pointerdown");
/* 2405: disable website access to clipboard events/content
 * Requires user interaction. Applies to onCut/onCopy/onPaste events
 * [SETUP-HARDEN] Will break some sites' functionality e.g. Outlook, Twitter, Facebook, Wordpress ***/
pref("dom.event.clipboardevents.enabled", false); //BRACE-UNCOMMENTED
/* 2406: disable clipboard commands (cut/copy) from "non-privileged" content [FF41+]
 * this disables document.execCommand("cut"/"copy") to protect your clipboard
 * [1] https://bugzilla.mozilla.org/1170911 ***/
pref("dom.allow_cut_copy", false);

/*** [SECTION 2500]: FINGERPRINTING ***/
pref("_user.js.parrot", "2500 syntax error: the parrot's shuffled off 'is mortal coil!");
/* 2501: enforce no system colors
 * [SETTING] General>Language and Appearance>Fonts and Colors>Colors>Use system colors ***/
pref("browser.display.use_system_colors", false); // [DEFAULT: false]
/* 2502: enforce non-native widget theme
 * Security: removes/reduces system API calls, e.g. win32k API [1]
 * Fingerprinting: provides a uniform look and feel across platforms [2]
 * [1] https://bugzilla.mozilla.org/1381938
 * [2] https://bugzilla.mozilla.org/1411425 ***/
pref("widget.non-native-theme.enabled", true); // [DEFAULT: true FF89+]
/* 2503: open links targeting new windows in a new tab instead
 * Stops malicious window sizes and some screen resolution leaks.
 * You can still right-click a link and open in a new window
 * [TEST] https://arkenfox.github.io/TZP/tzp.html#screen
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/9881 ***/
pref("browser.link.open_newwindow", 3); // 1=most recent window or tab 2=new window, 3=new tab
pref("browser.link.open_newwindow.restriction", 0);
/* 2504: disable WebGL (Web Graphics Library)
 * [SETUP-WEB] If you need it then enable it. RFP still randomizes canvas for naive scripts ***/
pref("webgl.disabled", true);
   // pref("webgl.enable-webgl2", false);
   // pref("webgl.disable-fail-if-major-performance-caveat", true); // [DEFAULT: true FF86+]

/*** [SECTION 2600]: MISCELLANEOUS ***/
pref("_user.js.parrot", "2600 syntax error: the parrot's run down the curtain!");
/* 2601: prevent accessibility services from accessing your browser [RESTART]
 * [SETTING] Privacy & Security>Permissions>Prevent accessibility services from accessing your browser (FF80 or lower)
 * [1] https://support.mozilla.org/kb/accessibility-services ***/
pref("accessibility.force_disabled", 1); //BRACE-SHOULD_COMMENT
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
/* 2619: use Punycode in Internationalized Domain Names to eliminate possible spoofing
 * [SETUP-WEB] Might be undesirable for non-latin alphabet users since legitimate IDN's are also punycoded
 * [TEST] https://www.xn--80ak6aa92e.com/ (www.apple.com)
 * [1] https://wiki.mozilla.org/IDN_Display_Algorithm
 * [2] https://en.wikipedia.org/wiki/IDN_homograph_attack
 * [3] CVE-2017-5383: https://www.mozilla.org/security/advisories/mfsa2017-02/
 * [4] https://www.xudongz.com/blog/2017/idn-phishing/ ***/
pref("network.IDN_show_punycode", true);
/* 2620: enforce PDFJS, disable PDFJS scripting [SETUP-CHROME]
 * This setting controls if the option "Display in Firefox" is available in the setting below
 *   and by effect controls whether PDFs are handled in-browser or externally ("Ask" or "Open With")
 * PROS: pdfjs is lightweight, open source, and as secure/vetted more than most
 *   Exploits are rare (one serious case in seven years), treated seriously and patched quickly.
 *   It doesn't break "state separation" of browser content (by not sharing with OS, independent apps).
 *   It maintains disk avoidance and application data isolation. It's convenient. You can still save to disk.
 * CONS: You may prefer a different pdf reader for security reasons
 * CAVEAT: JS can still force a pdf to open in-browser by bundling its own code
 * [SETTING] General>Applications>Portable Document Format (PDF) ***/
pref("pdfjs.disabled", false); // [DEFAULT: false]
pref("pdfjs.enableScripting", false); // [FF86+]
/* 2621: disable links launching Windows Store on Windows 8/8.1/10 [WINDOWS] ***/
pref("network.protocol-handler.external.ms-windows-store", false);
/* 2623: disable permissions delegation [FF73+]
 * Currently applies to cross-origin geolocation, camera, mic and screen-sharing
 * permissions, and fullscreen requests. Disabling delegation means any prompts
 * for these will show/use their correct 3rd party origin
 * [1] https://groups.google.com/forum/#!topic/mozilla.dev.platform/BdFOMAuCGW8/discussion ***/
pref("permissions.delegation.enabled", false);
/* 2625: disable bypassing 3rd party extension install prompts [FF82+]
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1659530,1681331 ***/
pref("extensions.postDownloadThirdPartyPrompt", false);

/** DOWNLOADS ***/
/* 2651: enable user interaction for security by always asking where to download
 * [SETUP-CHROME] On Android this blocks longtapping and saving images
 * [SETTING] General>Downloads>Always ask you where to save files ***/
   // pref("browser.download.useDownloadDir", false); //MULL-COMMENTED
/* 2652: disable adding downloads to the system's "recent documents" list ***/
pref("browser.download.manager.addToRecentDocs", false);

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

/*** [SECTION 2700]: PERSISTENT STORAGE
   Data SET by websites including
          cookies : profile\cookies.sqlite
     localStorage : profile\webappsstore.sqlite
        indexedDB : profile\storage\default
   serviceWorkers :

   [NOTE] indexedDB and serviceWorkers are not available in Private Browsing Mode
   [NOTE] Blocking cookies also blocks websites access to: localStorage (incl. sessionStorage),
   indexedDB, sharedWorker, and serviceWorker (and therefore service worker cache and notifications)
   If you set a site exception for cookies (either "Allow" or "Allow for Session") then they become
   accessible to websites except shared/service workers where the cookie setting must be "Allow"
***/
pref("_user.js.parrot", "2700 syntax error: the parrot's joined the bleedin' choir invisible!");
/* 2701: disable or isolate 3rd-party cookies and site-data [SETUP-WEB]
 * 0 = Accept cookies and site data
 * 1 = (Block) All third-party cookies
 * 2 = (Block) All cookies
 * 3 = (Block) Cookies from unvisited websites
 * 4 = (Block) Cross-site tracking cookies (default)
 * 5 = (Isolate All) Cross-site cookies (TCP: Total Cookie Protection / dFPI: dynamic FPI) [1] (FF86+)
 * Option 5 with FPI enabled (4001) is ignored and not shown, and option 4 used instead
 * [NOTE] You can set cookie exceptions under site permissions or use an extension
 * [NOTE] Enforcing category to custom ensures ETP related prefs are always honored
 * [SETTING] Privacy & Security>Enhanced Tracking Protection>Custom>Cookies
 * [1] https://blog.mozilla.org/security/2021/02/23/total-cookie-protection/ ***/
pref("network.cookie.cookieBehavior", 1);
pref("browser.contentblocking.category", "custom");
/* 2702: set third-party cookies (if enabled, see 2701) to session-only
 * [NOTE] .sessionOnly overrides .nonsecureSessionOnly except when .sessionOnly=false and
 * .nonsecureSessionOnly=true. This allows you to keep HTTPS cookies, but session-only HTTP ones
 * [1] https://feeding.cloud.geek.nz/posts/tweaking-cookies-for-privacy-in-firefox/ ***/
pref("network.cookie.thirdparty.sessionOnly", true);
pref("network.cookie.thirdparty.nonsecureSessionOnly", true); // [FF58+]
/* 2703: delete cookies and site data on close
 * 0=keep until they expire (default), 2=keep until you close Firefox
 * [NOTE] The setting below is disabled (but not changed) if you block all cookies (2701 = 2)
 * [SETTING] Privacy & Security>Cookies and Site Data>Delete cookies and site data when Firefox is closed ***/
   // pref("network.cookie.lifetimePolicy", 2);
/* 2710: enable Enhanced Tracking Protection (ETP) in all windows
 * [SETTING] Privacy & Security>Enhanced Tracking Protection>Custom>Tracking content
 * [SETTING] to add site exceptions: Urlbar>ETP Shield
 * [SETTING] to manage site exceptions: Options>Privacy & Security>Enhanced Tracking Protection>Manage Exceptions ***/
pref("privacy.trackingprotection.enabled", true);
/* 2711: enable various ETP lists ***/
pref("privacy.trackingprotection.socialtracking.enabled", true);
pref("privacy.trackingprotection.cryptomining.enabled", true); // [DEFAULT: true] //BRACE-UNCOMMENTED
pref("privacy.trackingprotection.fingerprinting.enabled", true); // [DEFAULT: true] //BRACE-UNCOMMENTED
/* 2740: disable service worker cache and cache storage
 * [NOTE] We clear service worker cache on exit (2803)
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
 * [1] https://developer.mozilla.org/docs/Web/API/Storage_Access_API ***/
   // pref("dom.storage_access.enabled", false);
/* 2760: enable Local Storage Next Generation (LSNG) [FF65+] ***/
   // pref("dom.storage.next_gen", true); // [DEFAULT: true FF92+] //BRACE-COMMENTED

/*** [SECTION 2800]: SHUTDOWN
   * Sanitizing on shutdown is all or nothing. It does not use Managed Exceptions under
     Privacy & Security>Delete cookies and site data when Firefox is closed (1681701)
   * If you want to keep some sites' cookies (exception as "Allow") and optionally other site
     data but clear all the rest on close, then you need to set the "cookie" and optionally the
     "offlineApps" prefs below to false, and to set the cookie lifetime pref to 2 (2703)
***/
pref("_user.js.parrot", "2800 syntax error: the parrot's bleedin' demised!");
/* 2802: enable Firefox to clear items on shutdown (2803)
 * [SETTING] Privacy & Security>History>Custom Settings>Clear history when Firefox closes ***/
pref("privacy.sanitize.sanitizeOnShutdown", false); //BRACE-DISABLED
/* 2803: set what items to clear on shutdown (if 2802 is true) [SETUP-CHROME]
 * [NOTE] If "history" is true, downloads will also be cleared
 * [NOTE] Active Logins: does not refer to logins via cookies, but rather HTTP Basic Authentication [1]
 * [NOTE] Offline Website Data: localStorage, service worker cache, QuotaManager (IndexedDB, asm-cache)
 * [SETTING] Privacy & Security>History>Custom Settings>Clear history when Firefox closes>Settings
 * [1] https://en.wikipedia.org/wiki/Basic_access_authentication ***/
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
 * Firefox remembers your last choices. This will reset them when you start Firefox
 * [NOTE] Regardless of what you set "downloads" to, as soon as the dialog
 * for "Clear Recent History" is opened, it is synced to the same as "history" ***/
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
 * [NOTE] Not needed if Session Restore is not used (0102) or is already cleared with history (2803)
 * [NOTE] privacy.clearOnShutdown.openWindows prevents resuming from crashes (1022)
 * [NOTE] privacy.cpd.openWindows has a bug that causes an additional window to open ***/
   // pref("privacy.clearOnShutdown.openWindows", true);
   // pref("privacy.cpd.openWindows", true);
/* 2806: reset default "Time range to clear" for "Clear Recent History" (2804)
 * Firefox remembers your last choice. This will reset the value when you start Firefox
 * 0=everything, 1=last hour, 2=last two hours, 3=last four hours, 4=today
 * [NOTE] Values 5 (last 5 minutes) and 6 (last 24 hours) are not listed in the dropdown,
 * which will display a blank value, and are not guaranteed to work ***/
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
   1542309 - top-level domain URLs when host is in the public suffix list (FF68+)
   1506693 - pdfjs range-based requests (FF68+)
   1330467 - site permissions (FF69+)
   1534339 - IPv6 (FF73+)
   1721858 - WebSocket (FF92+)
***/
pref("_user.js.parrot", "4000 syntax error: the parrot's pegged out");
/* 4001: enable First Party Isolation [FF51+]
 * [SETUP-WEB] Will break most cross-domain logins
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1260931,1299996 ***/
pref("privacy.firstparty.isolate", true);
/* 4002: enforce FPI restriction for window.opener [FF54+]
 * [NOTE] Setting this to false may reduce the breakage in 4001
 * FF65+ blocks postMessage with targetOrigin "*" if originAttributes don't match. But
 * to reduce breakage it ignores the 1st-party domain (FPD) originAttribute [2][3]
 * The 2nd pref removes that limitation and will only allow communication if FPDs also match
 * [1] https://bugzilla.mozilla.org/1319773#c22
 * [2] https://bugzilla.mozilla.org/1492607
 * [3] https://developer.mozilla.org/docs/Web/API/Window/postMessage ***/
   // pref("privacy.firstparty.isolate.restrict_opener_access", true); // [DEFAULT: true]
   // pref("privacy.firstparty.isolate.block_post_message", true);
/* 4003: enable scheme with FPI [FF78+]
 * [NOTE] Experimental: existing data and site permissions are incompatible
 * and some site exceptions may not work e.g. HTTPS-only mode (1244) ***/
   // pref("privacy.firstparty.isolate.use_site", true);

/*** [SECTION 4500]: RFP (RESIST FINGERPRINTING)
   RFP covers a wide range of ongoing fingerprinting solutions.
   It is an all-or-nothing buy in: you cannot pick and choose what parts you want

   [WARNING] DO NOT USE extensions to alter RFP protected metrics

 FF41+
    418986 - limit window.screen & CSS media queries leaking identifiable info
      [TEST] https://arkenfox.github.io/TZP/tzp.html#screen
 FF50+
   1281949 - spoof screen orientation
   1281963 - hide contents of navigator.plugins and navigator.mimeTypes
 FF55+
   1330890 - spoof timezone as UTC0
   1360039 - spoof navigator.hardwareConcurrency as 2
   1217238 - reduce precision of time exposed by javascript
 FF56+
   1369303 - spoof/disable performance API
   1333651 - spoof User Agent & Navigator API
      JS: FF91+ the version is spoofed as ESR, and the OS as Windows 10, OS 10.15, Android 10, or Linux
      HTTP Headers: spoofed as Windows or Android
   1369319 - disable device sensor API
   1369357 - disable site specific zoom
   1337161 - hide gamepads from content
   1372072 - spoof network information API as "unknown" when dom.netinfo.enabled = true
   1333641 - reduce fingerprinting in WebSpeech API
 FF57+
   1369309 - spoof media statistics
   1382499 - reduce screen co-ordinate fingerprinting in Touch API
   1217290 & 1409677 - enable some fingerprinting resistance for WebGL
   1382545 - reduce fingerprinting in Animation API
   1354633 - limit MediaError.message to a whitelist
   1382533 & 1697680 - enable fingerprinting resistance for Presentation API (FF57-87)
      Blocks exposure of local IP Addresses via mDNS (Multicast DNS)
 FF58+
    967895 - spoof canvas and enable site permission prompt before allowing canvas data extraction
 FF59+
   1372073 - spoof/block fingerprinting in MediaDevices API
      Spoof: enumerate devices as one "Internal Camera" and one "Internal Microphone"
      Block: suppresses the ondevicechange event
   1039069 - warn when language prefs are not set to "en*" (also see 0210, 0211)
   1222285 & 1433592 - spoof keyboard events and suppress keyboard modifier events
      Spoofing mimics the content language of the document. Currently it only supports en-US.
      Modifier events suppressed are SHIFT and both ALT keys. Chrome is not affected.
 FF60-67
   1337157 - disable WebGL debug renderer info (FF60+)
   1459089 - disable OS locale in HTTP Accept-Language headers (ANDROID) (FF62+)
   1479239 - return "no-preference" with prefers-reduced-motion (FF63+)
   1363508 - spoof/suppress Pointer Events (FF64+)
   1492766 - spoof pointerEvent.pointerid (FF65+)
   1485266 - disable exposure of system colors to CSS or canvas (FF67+)
   1494034 - return "light" with prefers-color-scheme (FF67+)
 FF68-77
   1564422 - spoof audioContext outputLatency (FF70+)
   1595823 - return audioContext sampleRate as 44100 (FF72+)
   1607316 - spoof pointer as coarse and hover as none (ANDROID) (FF74+)
 FF78-90
   1621433 - randomize canvas (previously FF58+ returned an all-white canvas) (FF78+)
   1653987 - limit font visibility to bundled and "Base Fonts" (Windows, Mac, some Linux) (FF80+)
   1461454 - spoof smooth=true and powerEfficient=false for supported media in MediaCapabilities (FF82+)
 FF91+
    531915 - use fdlibm's sin, cos and tan in jsmath (FF93+, ESR91.1+)
***/
pref("_user.js.parrot", "4500 syntax error: the parrot's popped 'is clogs");
/* 4501: enable privacy.resistFingerprinting [FF41+]
 * [SETUP-WEB] RFP can cause some website breakage: mainly canvas, use a site exception via the urlbar
 * RFP also has a few side effects: mainly timezone is UTC0, and websites will prefer light theme
 * [1] https://bugzilla.mozilla.org/418986 ***/
pref("privacy.resistFingerprinting", true);
/* 4502: set new window sizes to round to hundreds [FF55+] [SETUP-CHROME]
 * Width will round down to multiples of 200s and height to 100s, to fit your screen.
 * The max values are a starting point to round from if you want some control
 * [1] https://bugzilla.mozilla.org/1330882 ***/
   // pref("privacy.window.maxInnerWidth", 1000);
   // pref("privacy.window.maxInnerHeight", 1000);
/* 4503: disable mozAddonManager Web API [FF57+]
 * [NOTE] To allow extensions to work on AMO, you also need 2662
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1384330,1406795,1415644,1453988 ***/
pref("privacy.resistFingerprinting.block_mozAddonManager", true); // [HIDDEN PREF]
/* 4504: enable RFP letterboxing [FF67+]
 * Dynamically resizes the inner window by applying margins in stepped ranges [2]
 * If you use the dimension pref, then it will only apply those resolutions.
 * The format is "width1xheight1, width2xheight2, ..." (e.g. "800x600, 1000x1000")
 * [SETUP-WEB] This is independent of RFP (4501). If you're not using RFP, or you are but
 * dislike the margins, then flip this pref, keeping in mind that it is effectively fingerprintable
 * [WARNING] DO NOT USE: the dimension pref is only meant for testing
 * [1] https://bugzilla.mozilla.org/1407366
 * [2] https://hg.mozilla.org/mozilla-central/rev/6d2d7856e468#l2.32 ***/
pref("privacy.resistFingerprinting.letterboxing", true); // [HIDDEN PREF]
   // pref("privacy.resistFingerprinting.letterboxing.dimensions", ""); // [HIDDEN PREF]
/* 4505: experimental RFP [FF91+]
 * [WARNING] DO NOT USE unless testing, see [1] comment 12
 * [1] https://bugzilla.mozilla.org/1635603 ***/
   // pref("privacy.resistFingerprinting.exemptedDomains", "*.example.invalid");
   // pref("privacy.resistFingerprinting.testGranularityMask", 0);
/* 4510: disable showing about:blank as soon as possible during startup [FF60+]
 * When default true this no longer masks the RFP chrome resizing activity
 * [1] https://bugzilla.mozilla.org/1448423 ***/
pref("browser.startup.blankWindow", false);

/*** [SECTION 5000]: OPTIONAL OPSEC
   Disk avoidance, application data isolation, eyeballs...
***/
pref("_user.js.parrot", "5000 syntax error: the parrot's taken 'is last bow");
/* 5001: start Firefox in PB (Private Browsing) mode
 * [NOTE] In this mode all windows are "private windows" and the PB mode icon is not displayed
 * [NOTE] The P in PB mode can be misleading: it means no "persistent" disk state such as history,
 * caches, searches, cookies, localStorage, IndexedDB etc (which you can achieve in normal mode).
 * In fact, PB mode limits or removes the ability to control some of these, and you need to quit
 * Firefox to clear them. PB is best used as a one off window (Menu>New Private Window) to provide
 * a temporary self-contained new session. Close all Private Windows to clear the PB mode session.
 * [SETTING] Privacy & Security>History>Custom Settings>Always use private browsing mode
 * [1] https://wiki.mozilla.org/Private_Browsing
 * [2] https://support.mozilla.org/kb/common-myths-about-private-browsing ***/
   // pref("browser.privatebrowsing.autostart", true);
/* 5002: disable memory cache
 * capacity: -1=determine dynamically (default), 0=none, n=memory capacity in kibibytes ***/
   // pref("browser.cache.memory.enable", false);
   // pref("browser.cache.memory.capacity", 0);
/* 5003: disable saving passwords
 * [NOTE] This does not clear any passwords already saved
 * [SETTING] Privacy & Security>Logins and Passwords>Ask to save logins and passwords for websites ***/
   // pref("signon.rememberSignons", false);
/* 5004: disable permissions manager from writing to disk [FF41+] [RESTART]
 * [NOTE] This means any permission changes are session only
 * [1] https://bugzilla.mozilla.org/967812 ***/
   // pref("permissions.memory_only", true); // [HIDDEN PREF]
/* 5005: disable intermediate certificate caching [FF41+] [RESTART]
 * [NOTE] This affects login/cert/key dbs. The effect is all credentials are session-only.
 * Saved logins and passwords are not available. Reset the pref and restart to return them ***/
   // pref("security.nocertdb", true); // [HIDDEN PREF]
/* 5006: disable favicons in history and bookmarks
 * [NOTE] Stored as data blobs in favicons.sqlite, these don't reveal anything that your
 * actual history (and bookmarks) already do. Your history is more detailed, so
 * control that instead; e.g. disable history, clear history on close, use PB mode
 * [NOTE] favicons.sqlite is sanitized on Firefox close ***/
   // pref("browser.chrome.site_icons", false);
/* 5007: exclude "Undo Closed Tabs" in Session Restore ***/
   // pref("browser.sessionstore.max_tabs_undo", 0);
/* 5008: disable resuming session from crash ***/
   // pref("browser.sessionstore.resume_from_crash", false);
/* 5009: disable "open with" in download dialog [FF50+]
 * Application data isolation [1]
 * [1] https://bugzilla.mozilla.org/1281959 ***/
pref("browser.download.forbid_open_with", true); //BRACE-UNCOMMENTED
/* 5010: disable location bar suggestion types
 * [SETTING] Privacy & Security>Address Bar>When using the address bar, suggest ***/
   // pref("browser.urlbar.suggest.history", false);
   // pref("browser.urlbar.suggest.bookmark", false);
   // pref("browser.urlbar.suggest.openpage", false);
   // pref("browser.urlbar.suggest.topsites", false); // [FF78+]
/* 5011: disable location bar dropdown
 * This value controls the total number of entries to appear in the location bar dropdown ***/
   // pref("browser.urlbar.maxRichResults", 0);
/* 5012: disable location bar autofill
 * [1] https://support.mozilla.org/kb/address-bar-autocomplete-firefox#w_url-autocomplete ***/
   // pref("browser.urlbar.autoFill", false);
/* 5013: disable browsing and download history
 * [NOTE] We also clear history and downloads on exit (2803)
 * [SETTING] Privacy & Security>History>Custom Settings>Remember browsing and download history ***/
   // pref("places.history.enabled", false);
/* 5014: disable Windows jumplist [WINDOWS] ***/
   // pref("browser.taskbar.lists.enabled", false);
   // pref("browser.taskbar.lists.frequent.enabled", false);
   // pref("browser.taskbar.lists.recent.enabled", false);
   // pref("browser.taskbar.lists.tasks.enabled", false);
/* 5015: disable Windows taskbar preview [WINDOWS] ***/
   // pref("browser.taskbar.previews.enable", false); // [DEFAULT: false]
/* 5016: discourage downloading to desktop
 * 0=desktop, 1=downloads (default), 2=last used
 * [SETTING] To set your default "downloads": General>Downloads>Save files to ***/
   // pref("browser.download.folderList", 2);

/*** [SECTION 5500]: OPTIONAL HARDENING
   Not recommended. Keep in mind that these can cause breakage, performance
   issues, are mostly fingerpintable, and the threat model is practically zero
***/
pref("_user.js.parrot", "5500 syntax error: this is an ex-parrot!");
/* 5501: disable MathML (Mathematical Markup Language) [FF51+]
 * [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=mathml ***/
pref("mathml.disabled", true); // 1173199 //BRACE-UNCOMMENTED
/* 5502: disable in-content SVG (Scalable Vector Graphics) [FF53+]
 * [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=firefox+svg ***/
   // pref("svg.disabled", true); // 1216893
/* 5503: disable graphite
 * [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=firefox+graphite
 * [2] https://en.wikipedia.org/wiki/Graphite_(SIL) ***/
pref("gfx.font_rendering.graphite.enabled", false); //BRACE-UNCOMMENTED
/* 5504: disable asm.js [FF22+]
 * [1] http://asmjs.org/
 * [2] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=asm.js
 * [3] https://rh0dev.github.io/blog/2017/the-return-of-the-jit/ ***/
pref("javascript.options.asmjs", false); //BRACE-UNCOMMENTED
/* 5505: disable Ion and baseline JIT to harden against JS exploits
 * [NOTE] In FF75+, when **both** Ion and JIT are disabled, **and** the new
 * hidden pref is enabled, then Ion can still be used by extensions (1599226)
 * [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=firefox+jit ***/
pref("javascript.options.ion", false); //BRACE-UNCOMMENTED
pref("javascript.options.baselinejit", false); //BRACE-UNCOMMENTED
pref("javascript.options.jit_trustedprincipals", true); // [FF75+] [HIDDEN PREF] //BRACE-UNCOMMENTED
/* 5506: disable WebAssembly [FF52+]
 * Vulnerabilities [1] have increasingly been found, including those known and fixed
 * in native programs years ago [2]. WASM has powerful low-level access, making
 * certain attacks (brute-force) and vulnerabilities more possible
 * [STATS] ~0.2% of websites, about half of which are for crytopmining / malvertising [2][3]
 * [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=wasm
 * [2] https://spectrum.ieee.org/tech-talk/telecom/security/more-worries-over-the-security-of-web-assembly
 * [3] https://www.zdnet.com/article/half-of-the-websites-using-webassembly-use-it-for-malicious-purposes ***/
pref("javascript.options.wasm", false); //BRACE-UNCOMMENTED

/*** [SECTION 6000]: DON'T TOUCH ***/
pref("_user.js.parrot", "6000 syntax error: the parrot's 'istory!");
/* 6001: enforce Firefox blocklist
 * [WHY] It includes updates for "revoked certificates"
 * [1] https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/ ***/
pref("extensions.blocklist.enabled", true); // [DEFAULT: true]
/* 6002: enforce no referer spoofing
 * [WHY] Spoofing can affect CSRF (Cross-Site Request Forgery) protections ***/
pref("network.http.referer.spoofSource", false); // [DEFAULT: false]
/* 6003: enforce CSP (Content Security Policy)
 * [1] https://developer.mozilla.org/docs/Web/HTTP/CSP ***/
pref("security.csp.enable", true); // [DEFAULT: true]
/* 6004: enforce a security delay on some confirmation dialogs such as install, open/save
 * [1] https://www.squarefree.com/2004/07/01/race-conditions-in-security-dialogs/ ***/
pref("security.dialog_enable_delay", 1000); // [DEFAULT: 1000]
/* 6005: enforce no insecure active content on https pages ***/
pref("security.mixed_content.block_active_content", true); // [DEFAULT: true]
/* 6006: enforce "window.name" protection [FF82+]
 * If a new page from another domain is loaded into a tab, then window.name is set to an empty string. The original
 * string is restored if the tab reverts back to the original page. This change prevents some cross-site attacks
 * [TEST] https://arkenfox.github.io/TZP/tests/windownamea.html ***/
pref("privacy.window.name.update.enabled", true); // [DEFAULT: true FF86+]
/* 6007: enforce window.opener protection [FF65+]
 * Makes rel=noopener implicit for target=_blank in anchor and area elements when no rel attribute is set ***/
pref("dom.targetBlankNoOpener.enabled", true); // [DEFAULT: true FF79+]

/*** [SECTION 7000]: DON'T BOTHER ***/
pref("_user.js.parrot", "7000 syntax error: the parrot's pushing up daisies!");
/* 7001: disable APIs
 * Location-Aware Browsing, Full Screen, offline cache (appCache), Virtual Reality
 * [WHY] The API state is easily fingerprintable. Geo and VR are behind prompts (7002).
 * appCache storage capability was removed in FF90. Full screen requires user interaction ***/
   // pref("geo.enabled", false);
   // pref("full-screen-api.enabled", false);
   // pref("browser.cache.offline.enable", false);
   // pref("dom.vr.enabled", false);
/* 7002: set default permissions
 * Location, Camera, Microphone, Notifications [FF58+] Virtual Reality [FF73+]
 * 0=always ask (default), 1=allow, 2=block
 * [WHY] These are fingerprintable via Permissions API, except VR. Just add site
 * exceptions as allow/block for frequently visited/annoying sites: i.e. not global
 * [SETTING] to add site exceptions: Ctrl+I>Permissions>
 * [SETTING] to manage site exceptions: Options>Privacy & Security>Permissions>Settings ***/
   // pref("permissions.default.geo", 0);
   // pref("permissions.default.camera", 0);
   // pref("permissions.default.microphone", 0);
   // pref("permissions.default.desktop-notification", 0);
   // pref("permissions.default.xr", 0); // Virtual Reality
/* 7003: disable non-modern cipher suites [1]
 * [WHY] Passive fingerprinting. Minimal/non-existent threat of downgrade attacks
 * [1] https://browserleaks.com/ssl ***/
   // pref("security.ssl3.ecdhe_ecdsa_aes_256_sha", false);
   // pref("security.ssl3.ecdhe_ecdsa_aes_128_sha", false);
   // pref("security.ssl3.ecdhe_rsa_aes_128_sha", false);
   // pref("security.ssl3.ecdhe_rsa_aes_256_sha", false);
   // pref("security.ssl3.rsa_aes_128_gcm_sha256", false); // no PFS
   // pref("security.ssl3.rsa_aes_256_gcm_sha384", false); // no PFS
   // pref("security.ssl3.rsa_aes_128_sha", false); // no PFS
   // pref("security.ssl3.rsa_aes_256_sha", false); // no PFS
   // pref("security.ssl3.rsa_des_ede3_sha", false); // 3DES
/* 7004: control TLS versions
 * [WHY] Passive fingerprinting. Downgrades are still possible: behind user interaction ***/
   // pref("security.tls.version.min", 3); // [DEFAULT: 3]
   // pref("security.tls.version.max", 4);
/* 7005: disable SSL session IDs [FF36+]
 * [WHY] Passive fingerprinting and perf costs. These are session-only and isolated
 * with network partitioning (FF85+) or when using FPI and/or containers ***/
   // pref("security.ssl.disable_session_identifiers", true); // [HIDDEN PREF]
/* 7006: onions
 * [WHY] Firefox doesn't support hidden services. Use Tor Browser ***/
   // pref("dom.securecontext.whitelist_onions", true); // 1382359
   // pref("network.http.referer.hideOnionSource", true); // 1305144
/* 7007: referers
 * [WHY] Only cross origin referers (1600s) need control ***/
   // pref("network.http.sendRefererHeader", 2);
   // pref("network.http.referer.trimmingPolicy", 0);
/* 7008: set the default Referrer Policy [FF59+]
 * 0=no-referer, 1=same-origin, 2=strict-origin-when-cross-origin, 3=no-referrer-when-downgrade
 * [WHY] Defaults are fine. They can be overridden by a site-controlled Referrer Policy ***/
   // pref("network.http.referer.defaultPolicy", 2); // [DEFAULT: 2 FF87+]
   // pref("network.http.referer.defaultPolicy.pbmode", 2); // [DEFAULT: 2]
/* 7009: disable HTTP2
 * [WHY] Passive fingerprinting. ~50% of sites use HTTP2 [1]
 * [1] https://w3techs.com/technologies/details/ce-http2/all/all ***/
   // pref("network.http.spdy.enabled", false);
   // pref("network.http.spdy.enabled.deps", false);
   // pref("network.http.spdy.enabled.http2", false);
   // pref("network.http.spdy.websockets", false); // [FF65+]
/* 7010: disable HTTP Alternative Services [FF37+]
 * [WHY] Already isolated by network partitioning (FF85+) or FPI ***/
   // pref("network.http.altsvc.enabled", false);
   // pref("network.http.altsvc.oe", false);
/* 7011: disable website control over browser right-click context menu
 * [WHY] Just use Shift-Right-Click ***/
   // pref("dom.event.contextmenu.enabled", false);
/* 7012: disable icon fonts (glyphs) and local fallback rendering
 * [WHY] Breakage, font fallback is equivalency, also RFP
 * [1] https://bugzilla.mozilla.org/789788
 * [2] https://gitlab.torproject.org/legacy/trac/-/issues/8455 ***/
   // pref("gfx.downloadable_fonts.enabled", false); // [FF41+]
   // pref("gfx.downloadable_fonts.fallback_delay", -1);

/*** [SECTION 8000]: DON'T BOTHER: NON-RFP
   [WHY] They are insufficient to help anti-fingerprinting and do more harm than good
   [WARNING] DO NOT USE with RFP. RFP already covers these and they can interfere
***/
pref("_user.js.parrot", "8000 syntax error: the parrot's crossed the Jordan");
/* 8001: disable APIs ***/
   // pref("device.sensors.enabled", false);
   // pref("dom.enable_performance", false);
   // pref("dom.enable_resource_timing", false);
   // pref("dom.gamepad.enabled", false);
   // pref("dom.netinfo.enabled", false);
   // pref("dom.webaudio.enabled", false);
/* 8002: disable other ***/
   // pref("browser.display.use_document_fonts", 0);
   // pref("browser.zoom.siteSpecific", false);
   // pref("dom.w3c_touch_events.enabled", 0);
   // pref("media.navigator.enabled", false);
   // pref("media.ondevicechange.enabled", false);
   // pref("media.video_stats.enabled", false);
   // pref("media.webspeech.synth.enabled", false);
   // pref("webgl.enable-debug-renderer-info", false);
/* 8003: spoof ***/
   // pref("dom.maxHardwareConcurrency", 2);
   // pref("font.system.whitelist", ""); // [HIDDEN PREF]
   // pref("general.appname.override", ""); // [HIDDEN PREF]
   // pref("general.appversion.override", ""); // [HIDDEN PREF]
   // pref("general.buildID.override", ""); // [HIDDEN PREF]
   // pref("general.oscpu.override", ""); // [HIDDEN PREF]
   // pref("general.platform.override", ""); // [HIDDEN PREF]
   // pref("general.useragent.override", ""); // [HIDDEN PREF]
   // pref("ui.use_standins_for_native_colors", true);

/*** [SECTION 9000]: PERSONAL
   Non-project related but useful. If any interest you, add them to your overrides
***/
pref("_user.js.parrot", "9000 syntax error: I ran out of parrots");
/* WELCOME & WHAT'S NEW NOTICES ***/
pref("browser.startup.homepage_override.mstone", "ignore"); // master switch
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
   // pref("ui.systemUsesDarkTheme", 1); // [FF67+] [HIDDEN PREF]
      // 0=light, 1=dark: with RFP this only affects chrome
   // pref("toolkit.legacyUserProfileCustomizations.stylesheets", true); // [FF68+] allow userChrome/userContent
   // pref("ui.prefersReducedMotion", 1); // disable chrome animations [FF77+] [RESTART] [HIDDEN PREF]
      // 0=no-preference, 1=reduce: with RFP this only affects chrome
/* CONTENT BEHAVIOR ***/
   // pref("accessibility.typeaheadfind", true); // enable "Find As You Type"
user_pref("clipboard.autocopy", false); // disable autocopy default [LINUX] //BRACE-UNCOMMENTED
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
pref("browser.messaging-system.whatsNewPanel.enabled", false); // What's New toolbar icon [FF69+]
pref("extensions.pocket.enabled", false); // Pocket Account [FF46+] //BRACE-UNCOMMENTED
pref("identity.fxaccounts.enabled", false); // Firefox Accounts & Sync [FF60+] [RESTART] //BRACE-UNCOMMENTED
   // pref("reader.parse-on-load.enabled", false); // Reader View
/* OTHER ***/
   // pref("browser.bookmarks.max_backups", 2);
pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons", false); // disable CFR [FF67+]
      // [SETTING] General>Browsing>Recommend extensions as you browse
pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features", false); // disable CFR [FF67+]
      // [SETTING] General>Browsing>Recommend features as you browse
pref("network.manage-offline-status", false); // see bugzilla 620472 //BRACE-UNCOMMENTED
   // pref("xpinstall.signatures.required", false); // enforced extension signing (Nightly/ESR)

/*** [SECTION 9999]: DEPRECATED / REMOVED / LEGACY / RENAMED
   Documentation denoted as [-]. Items deprecated in FF78 or earlier have been archived at [1]
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
   // [1] https://firefox-source-docs.mozilla.org/main/65.0/browser/base/sslerrorreport/preferences.html
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
// 8002: disable PointerEvents
   // [1] https://developer.mozilla.org/docs/Web/API/PointerEvent
   // [-] https://bugzilla.mozilla.org/1688105
   // pref("dom.w3c_pointer_events.enabled", false);
// FF89
// 0309: disable sending Flash crash reports
   // [-] https://bugzilla.mozilla.org/1682030 [underlying NPAPI code removed]
pref("dom.ipc.plugins.flash.subprocess.crashreporter.enabled", false);
// 0310: disable sending the URL of the website where a plugin crashed
   // [-] https://bugzilla.mozilla.org/1682030 [underlying NPAPI code removed]
pref("dom.ipc.plugins.reportCrashURL", false);
// 1243: block unencrypted requests from Flash on encrypted pages to mitigate MitM attacks [FF59+]
   // [1] https://bugzilla.mozilla.org/1190623
   // [-] https://bugzilla.mozilla.org/1682030 [underlying NPAPI code removed]
pref("security.mixed_content.block_object_subrequest", true);
// 1803: disable Flash plugin
   // 0=deactivated, 1=ask, 2=enabled
   // ESR52.x is the last branch to fully support NPAPI, FF52+ stable only supports Flash
   // [NOTE] You can still override individual sites via site permissions
   // [-] https://bugzilla.mozilla.org/1682030 [underlying NPAPI code removed]
pref("plugin.state.flash", 0); // [DEFAULT: 1]
// FF90
// 0708: disable FTP [FF60+]
   // [-] https://bugzilla.mozilla.org/1574475
   // pref("network.ftp.enabled", false); // [DEFAULT: false FF88+]
// 7001: enforce no offline cache storage (appCache) [FF71+]
   // [-] https://bugzilla.mozilla.org/1694662
pref("browser.cache.offline.storage.enable", false); // [DEFAULT: false FF84+]
// ***/

/* END: internal custom pref to test for syntax errors ***/
pref("_user.js.parrot", "SUCCESS: No no he's not dead, he's, he's restin'!");
