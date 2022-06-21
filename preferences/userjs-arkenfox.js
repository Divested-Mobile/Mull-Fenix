/******
*    name: arkenfox user.js
*    date: 12 June 2022
* version: 101
*     url: https://github.com/arkenfox/user.js
* license: MIT: https://github.com/arkenfox/user.js/blob/master/LICENSE.txt

* README:

  0. Changes made for Brace and Mull are noted with //BRACE and //MULL respectively
       * sed -i 's/pref(/user_pref(/' userjs-arkenfox.js
       * sed -i 's/user_pref(/pref(/' userjs-arkenfox.js
  1. Consider using Tor Browser if it meets your needs or fits your threat model
       * https://2019.www.torproject.org/about/torusers.html
  2. Read the entire wiki
       * https://github.com/arkenfox/user.js/wiki
  3. If you skipped step 2, return to step 2
  4. Make changes in a user-overrides.js
       * There are often trade-offs and conflicts between security vs privacy vs anti-tracking
         and these need to be balanced against functionality & convenience & breakage
       * Some site breakage and unintended consequences will happen. Everyone's experience will differ
         e.g. some user data is erased on exit (section 2800), change this to suit your needs
       * While not 100% definitive, search for "[SETUP" tags
         e.g. third party images/videos not loading on some sites? check 1601
  5. Some tag info
       [SETUP-SECURITY] it's one item, read it
            [SETUP-WEB] can cause some websites to break
         [SETUP-CHROME] changes how Firefox itself behaves (i.e. not directly website related)
  6. Override Recipes: https://github.com/arkenfox/user.js/issues/1080

* RELEASES: https://github.com/arkenfox/user.js/releases

  * It is best to use the arkenfox release that is optimized for and matches your Firefox version
  * EVERYONE: each release
    - run prefsCleaner to reset prefs made inactive, including deprecated (9999s)
    ESR91
    - If you are not using arkenfox v91... (not a definitive list)
      - 9999: switch the appropriate deprecated section(s) back on

* INDEX:

  0100: STARTUP
  0200: GEOLOCATION / LANGUAGE / LOCALE
  0300: QUIETER FOX
  0400: SAFE BROWSING
  0600: BLOCK IMPLICIT OUTBOUND
  0700: DNS / DoH / PROXY / SOCKS / IPv6
  0800: LOCATION BAR / SEARCH BAR / SUGGESTIONS / HISTORY / FORMS
  0900: PASSWORDS
  1000: DISK AVOIDANCE
  1200: HTTPS (SSL/TLS / OCSP / CERTS / HPKP)
  1400: FONTS
  1600: HEADERS / REFERERS
  1700: CONTAINERS
  2000: PLUGINS / MEDIA / WEBRTC
  2400: DOM (DOCUMENT OBJECT MODEL)
  2600: MISCELLANEOUS
  2700: ETP (ENHANCED TRACKING PROTECTION)
  2800: SHUTDOWN & SANITIZING
  4500: RFP (RESIST FINGERPRINTING)
  5000: OPTIONAL OPSEC
  5500: OPTIONAL HARDENING
  6000: DON'T TOUCH
  7000: DON'T BOTHER
  8000: DON'T BOTHER: FINGERPRINTING
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
 * [NOTE] Session Restore is cleared with history (2811, 2812), and not used in Private Browsing mode
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
pref("browser.newtabpage.activity-stream.feeds.snippets", false); // [DEFAULT: false]
pref("browser.newtabpage.activity-stream.feeds.section.topstories", false);
pref("browser.newtabpage.activity-stream.section.highlights.includePocket", false);
pref("browser.newtabpage.activity-stream.showSponsored", false);
pref("browser.newtabpage.activity-stream.feeds.discoverystreamfeed", false); // [FF66+]
pref("browser.newtabpage.activity-stream.showSponsoredTopSites", false); // [FF83+]
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
pref("browser.region.update.enabled", false); // [FF79+]
/* 0204: set search region
 * [NOTE] May not be hidden if Firefox has changed your settings due to your region (0203) ***/
   // pref("browser.search.region", "US"); // [HIDDEN PREF]
/* 0210: set preferred language for displaying pages
 * [SETTING] General>Language and Appearance>Language>Choose your preferred language...
 * [TEST] https://addons.mozilla.org/about ***/
pref("intl.accept_languages", "en-US, en");
/* 0211: use en-US locale regardless of the system or region locale
 * [SETUP-WEB] May break some input methods e.g xim/ibus for CJK languages [1]
 * [TEST] https://arkenfox.github.io/TZP/tests/formatting.html
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=867501,1629630 ***/
pref("javascript.use_us_english_locale", true); // [HIDDEN PREF]

/*** [SECTION 0300]: QUIETER FOX ***/
pref("_user.js.parrot", "0300 syntax error: the parrot's not pinin' for the fjords!");
/** RECOMMENDATIONS ***/
/* 0320: disable recommendation pane in about:addons (uses Google Analytics) ***/
pref("extensions.getAddons.showPane", false); // [HIDDEN PREF]
/* 0321: disable recommendations in about:addons' Extensions and Themes panes [FF68+] ***/
pref("extensions.htmlaboutaddons.recommendations.enabled", false);
/* 0322: disable personalized Extension Recommendations in about:addons and AMO [FF65+]
 * [NOTE] This pref has no effect when Health Reports (0331) are disabled
 * [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to make personalized extension recommendations
 * [1] https://support.mozilla.org/kb/personalized-extension-recommendations ***/
pref("browser.discovery.enabled", false);

/** TELEMETRY ***/
/* 0330: disable new data submission [FF41+]
 * If disabled, no policy is shown or upload takes place, ever
 * [1] https://bugzilla.mozilla.org/1195552 ***/
pref("datareporting.policy.dataSubmissionEnabled", false);
/* 0331: disable Health Reports
 * [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to send technical... data ***/
pref("datareporting.healthreport.uploadEnabled", false);
/* 0332: disable telemetry
 * The "unified" pref affects the behavior of the "enabled" pref
 * - If "unified" is false then "enabled" controls the telemetry module
 * - If "unified" is true then "enabled" only controls whether to record extended data
 * [NOTE] "toolkit.telemetry.enabled" is now LOCKED to reflect prerelease (true) or release builds (false) [2]
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
/* 0333: disable Telemetry Coverage
 * [1] https://blog.mozilla.org/data/2018/08/20/effectively-measuring-search-in-firefox/ ***/
pref("toolkit.telemetry.coverage.opt-out", true); // [HIDDEN PREF]
pref("toolkit.coverage.opt-out", true); // [FF64+] [HIDDEN PREF]
pref("toolkit.coverage.endpoint.base", "");
/* 0334: disable PingCentre telemetry (used in several System Add-ons) [FF57+]
 * Defense-in-depth: currently covered by 0331 ***/
pref("browser.ping-centre.telemetry", false);

/** STUDIES ***/
/* 0340: disable Studies
 * [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to install and run studies ***/
pref("app.shield.optoutstudies.enabled", false);
/* 0341: disable Normandy/Shield [FF60+]
 * Shield is a telemetry system that can push and test "recipes"
 * [1] https://mozilla.github.io/normandy/ ***/
pref("app.normandy.enabled", false);
pref("app.normandy.api_url", "");

/** CRASH REPORTS ***/
/* 0350: disable Crash Reports ***/
pref("breakpad.reportURL", "");
pref("browser.tabs.crashReporting.sendReport", false); // [FF44+]
   // pref("browser.crashReports.unsubmittedCheck.enabled", false); // [FF51+] [DEFAULT: false]
/* 0351: enforce no submission of backlogged Crash Reports [FF58+]
 * [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to send backlogged crash reports  ***/
pref("browser.crashReports.unsubmittedCheck.autoSubmit2", false); // [DEFAULT: false]

/** OTHER ***/
/* 0360: disable Captive Portal detection
 * [1] https://www.eff.org/deeplinks/2017/08/how-captive-portals-interfere-wireless-security-and-privacy ***/
pref("captivedetect.canonicalURL", "");
pref("network.captive-portal-service.enabled", false); // [FF52+]
/* 0361: disable Network Connectivity checks [FF65+]
 * [1] https://bugzilla.mozilla.org/1460537 ***/
pref("network.connectivity-service.enabled", false);

/*** [SECTION 0400]: SAFE BROWSING (SB)
   SB has taken many steps to preserve privacy. If required, a full url is never sent
   to Google, only a part-hash of the prefix, hidden with noise of other real part-hashes.
   Firefox takes measures such as stripping out identifying parameters and since SBv4 (FF57+)
   doesn't even use cookies. (#Turn on browser.safebrowsing.debug to monitor this activity)

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
 * [SETUP-SECURITY] If you do not understand this, or you want this protection, then override this ***/
pref("browser.safebrowsing.downloads.remote.enabled", false);
   // pref("browser.safebrowsing.downloads.remote.url", ""); // Defense-in-depth
/* 0404: disable SB checks for unwanted software
 * [SETTING] Privacy & Security>Security>... "Warn you about unwanted and uncommon software" ***/
   // pref("browser.safebrowsing.downloads.remote.block_potentially_unwanted", false);
   // pref("browser.safebrowsing.downloads.remote.block_uncommon", false);
/* 0405: disable "ignore this warning" on SB warnings [FF45+]
 * If clicked, it bypasses the block for that session. This is a means for admins to enforce SB
 * [TEST] see https://github.com/arkenfox/user.js/wiki/Appendix-A-Test-Sites#-mozilla
 * [1] https://bugzilla.mozilla.org/1226490 ***/
   // pref("browser.safebrowsing.allowOverride", false);

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
pref("network.predictor.enable-prefetch", false); // [FF48+] [DEFAULT: false]
/* 0604: disable link-mouseover opening connection to linked server
 * [1] https://news.slashdot.org/story/15/08/14/2321202/how-to-quash-firefoxs-silent-requests ***/
pref("network.http.speculative-parallel-limit", 0);
/* 0605: disable mousedown speculative connections on bookmarks and history [FF98+] ***/
pref("browser.places.speculativeConnect.enabled", false);
/* 0610: enforce no "Hyperlink Auditing" (click tracking)
 * [1] https://www.bleepingcomputer.com/news/software/major-browsers-to-prevent-disabling-of-click-tracking-privacy-risk/ ***/
   // pref("browser.send_pings", false); // [DEFAULT: false]

/*** [SECTION 0700]: DNS / DoH / PROXY / SOCKS / IPv6 ***/
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
   // pref("network.dns.disableIPv6", true); //BRACE-COMMENTED: IPv6 is important, Brace and DivestOS both enable IPv6 privacy extensions too
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
 * Gvfs/GIO has a set of supported protocols like obex, network, archive, computer,
 * dav, cdda, gphoto2, trash, etc. By default only sftp is accepted (FF87+)
 * [1] https://bugzilla.mozilla.org/1433507
 * [2] https://en.wikipedia.org/wiki/GVfs
 * [3] https://en.wikipedia.org/wiki/GIO_(software) ***/
pref("network.gio.supported-protocols", ""); // [HIDDEN PREF]
/* 0705: disable proxy direct failover for system requests [FF91+]
 * [WARNING] Default true is a security feature against malicious extensions [1]
 * [SETUP-CHROME] If you use a proxy and you trust your extensions
 * [1] https://blog.mozilla.org/security/2021/10/25/securing-the-proxy-api-for-firefox-add-ons/ ***/
   // pref("network.proxy.failover_direct", false);
/* 0706: disable proxy bypass for system request failures [FF95+]
 * RemoteSettings, UpdateService, Telemetry [1]
 * [WARNING] If false, this will break the fallback for some security features
 * [SETUP-CHROME] If you use a proxy and you understand the security impact
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1732792,1733994,1733481 ***/
   // pref("network.proxy.allow_bypass", false); // [HIDDEN PREF FF95-96]
/* 0710: disable DNS-over-HTTPS (DoH) rollout [FF60+]
 * 0=off by default, 2=TRR (Trusted Recursive Resolver) first, 3=TRR only, 5=explicitly off
 * see "doh-rollout.home-region": USA 2019, Canada 2021, Russia/Ukraine 2022 [3]
 * [1] https://hacks.mozilla.org/2018/05/a-cartoon-intro-to-dns-over-https/
 * [2] https://wiki.mozilla.org/Security/DOH-resolver-policy
 * [3] https://support.mozilla.org/en-US/kb/firefox-dns-over-https
 * [4] https://www.eff.org/deeplinks/2020/12/dns-doh-and-odoh-oh-my-year-review-2020 ***/
   // pref("network.trr.mode", 5);

/*** [SECTION 0800]: LOCATION BAR / SEARCH BAR / SUGGESTIONS / HISTORY / FORMS ***/
pref("_user.js.parrot", "0800 syntax error: the parrot's ceased to be!");
/* 0801: disable location bar using search
 * Don't leak URL typos to a search engine, give an error message instead
 * Examples: "secretplace,com", "secretplace/com", "secretplace com", "secret place.com"
 * [NOTE] This does not affect explicit user action such as using search buttons in the
 * dropdown, or using keyword search shortcuts you configure in options (e.g. "d" for DuckDuckGo)
 * [SETUP-CHROME] Override this if you trust and use a privacy respecting search engine ***/
   // pref("keyword.enabled", false); //BRACE-COMMENTED: usability, second dedicated keyword search bar isn't enabled by default
/* 0802: disable location bar domain guessing
 * domain guessing intercepts DNS "hostname not found errors" and resends a
 * request (e.g. by adding www or .com). This is inconsistent use (e.g. FQDNs), does not work
 * via Proxy Servers (different error), is a flawed use of DNS (TLDs: why treat .com
 * as the 411 for DNS errors?), privacy issues (why connect to sites you didn't
 * intend to), can leak sensitive data (e.g. query strings: e.g. Princeton attack),
 * and is a security risk (e.g. common typos & malicious sites set up to exploit this) ***/
pref("browser.fixup.alternate.enabled", false);
/* 0804: disable live search suggestions
 * [NOTE] Both must be true for the location bar to work
 * [SETUP-CHROME] Override these if you trust and use a privacy respecting search engine
 * [SETTING] Search>Provide search suggestions | Show search suggestions in address bar results ***/
pref("browser.search.suggest.enabled", false);
pref("browser.urlbar.suggest.searches", false);
/* 0805: disable location bar making speculative connections [FF56+]
 * [1] https://bugzilla.mozilla.org/1348275 ***/
pref("browser.urlbar.speculativeConnect.enabled", false);
/* 0806: disable location bar leaking single words to a DNS provider **after searching** [FF78+]
 * 0=never resolve single words, 1=heuristic (default), 2=always resolve
 * [1] https://bugzilla.mozilla.org/1642623 ***/
pref("browser.urlbar.dnsResolveSingleWordsAfterSearch", 0);
/* 0807: disable location bar contextual suggestions [FF92+]
 * [SETTING] Privacy & Security>Address Bar>Suggestions from...
 * [1] https://blog.mozilla.org/data/2021/09/15/data-and-firefox-suggest/ ***/
pref("browser.urlbar.suggest.quicksuggest.nonsponsored", false); // [FF95+]
pref("browser.urlbar.suggest.quicksuggest.sponsored", false);
/* 0808: disable tab-to-search [FF85+]
 * Alternatively, you can exclude on a per-engine basis by unchecking them in Options>Search
 * [SETTING] Privacy & Security>Address Bar>When using the address bar, suggest>Search engines ***/
   // pref("browser.urlbar.suggest.engines", false);
/* 0810: disable search and form history
 * [SETUP-WEB] Be aware that autocomplete form data can be read by third parties [1][2]
 * [NOTE] We also clear formdata on exit (2811)
 * [SETTING] Privacy & Security>History>Custom Settings>Remember search and form history
 * [1] https://blog.mindedsecurity.com/2011/10/autocompleteagain.html
 * [2] https://bugzilla.mozilla.org/381681 ***/
pref("browser.formfill.enable", false);
/* 0811: disable Form Autofill
 * [NOTE] Stored data is NOT secure (uses a JSON file)
 * [NOTE] Heuristics controls Form Autofill on forms without @autocomplete attributes
 * [SETTING] Privacy & Security>Forms and Autofill>Autofill addresses
 * [1] https://wiki.mozilla.org/Firefox/Features/Form_Autofill ***/
pref("extensions.formautofill.addresses.enabled", false); // [FF55+]
pref("extensions.formautofill.available", "off"); // [FF56+]
pref("extensions.formautofill.creditCards.available", false); // [FF57+]
pref("extensions.formautofill.creditCards.enabled", false); // [FF56+]
pref("extensions.formautofill.heuristics.enabled", false); // [FF55+]
/* 0820: disable coloring of visited links
 * [SETUP-HARDEN] Bulk rapid history sniffing was mitigated in 2010 [1][2]. Slower and more expensive
 * redraw timing attacks were largely mitigated in FF77+ [3]. Using RFP (4501) further hampers timing
 * attacks. Don't forget clearing history on exit (2811). However, social engineering [2#limits][4][5]
 * and advanced targeted timing attacks could still produce usable results
 * [1] https://developer.mozilla.org/docs/Web/CSS/Privacy_and_the_:visited_selector
 * [2] https://dbaron.org/mozilla/visited-privacy
 * [3] https://bugzilla.mozilla.org/1632765
 * [4] https://earthlng.github.io/testpages/visited_links.html (see github wiki APPENDIX A on how to use)
 * [5] https://lcamtuf.blogspot.com/2016/08/css-mix-blend-mode-is-bad-for-keeping.html ***/
pref("layout.css.visited_links_enabled", false); //BRACE-UNCOMMENTED: nice to have disabled

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
 * [1] https://freedom-to-tinker.com/2017/12/27/no-boundaries-for-user-identities-web-trackers-exploit-browser-login-managers/
 * [2] https://homes.esat.kuleuven.be/~asenol/leaky-forms/ ***/
pref("signon.autofillForms", false);
/* 0904: disable formless login capture for Password Manager [FF51+] ***/
pref("signon.formlessCapture.enabled", false);
/* 0905: limit (or disable) HTTP authentication credentials dialogs triggered by sub-resources [FF41+]
 * hardens against potential credentials phishing
 * 0 = don't allow sub-resources to open HTTP authentication credentials dialogs
 * 1 = don't allow cross-origin sub-resources to open HTTP authentication credentials dialogs
 * 2 = allow sub-resources to open HTTP authentication credentials dialogs (default) ***/
pref("network.auth.subresource-http-auth-allow", 1);
/* 0906: enforce no automatic authentication on Microsoft sites [FF91+] [WINDOWS 10+]
 * [SETTING] Privacy & Security>Logins and Passwords>Allow Windows single sign-on for...
 * [1] https://support.mozilla.org/kb/windows-sso ***/
pref("network.http.windows-sso.enabled", false); // [DEFAULT: false]

/*** [SECTION 1000]: DISK AVOIDANCE ***/
pref("_user.js.parrot", "1000 syntax error: the parrot's gone to meet 'is maker!");
/* 1001: disable disk cache
 * [SETUP-CHROME] If you think disk cache helps perf, then feel free to override this
 * [NOTE] We also clear cache on exit (2811) ***/
   // pref("browser.cache.disk.enable", false); //BRACE-COMMENTED: caches are important, bandwidth available can be limited (data plans or slow network)
/* 1002: disable media cache from writing to disk in Private Browsing
 * [NOTE] MSE (Media Source Extensions) are already stored in-memory in PB ***/
pref("browser.privatebrowsing.forceMediaMemoryCache", true); // [FF75+]
pref("media.memory_cache_max_size", 65536);
/* 1003: disable storing extra session data [SETUP-CHROME]
 * define on which sites to save extra session data such as form content, cookies and POST data
 * 0=everywhere, 1=unencrypted sites, 2=nowhere ***/
pref("browser.sessionstore.privacy_level", 2);
/* 1004: set the minimum interval between session save operations
 * Increasing this can help on older machines and some websites, as well as reducing writes [1]
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
 * Blocks connections to servers that don't support RFC 5746 [2] as they're potentially vulnerable to a
 * MiTM attack [3]. A server without RFC 5746 can be safe from the attack if it disables renegotiations
 * but the problem is that the browser can't know that. Setting this pref to true is the only way for the
 * browser to ensure there will be no unsafe renegotiations on the channel between the browser and the server
 * [SETUP-WEB] SSL_ERROR_UNSAFE_NEGOTIATION: is it worth overriding this for that one site?
 * [STATS] SSL Labs (July 2021) reports over 99% of top sites have secure renegotiation [4]
 * [1] https://wiki.mozilla.org/Security:Renegotiation
 * [2] https://datatracker.ietf.org/doc/html/rfc5746
 * [3] https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2009-3555
 * [4] https://www.ssllabs.com/ssl-pulse/ ***/
pref("security.ssl.require_safe_negotiation", true);
/* 1206: disable TLS1.3 0-RTT (round-trip time) [FF51+]
 * This data is not forward secret, as it is encrypted solely under keys derived using
 * the offered PSK. There are no guarantees of non-replay between connections
 * [1] https://github.com/tlswg/tls13-spec/issues/1001
 * [2] https://www.rfc-editor.org/rfc/rfc9001.html#name-replay-attacks-with-0-rtt
 * [3] https://blog.cloudflare.com/tls-1-3-overview-and-q-and-a/ ***/
pref("security.tls.enable_0rtt_data", false);

/** OCSP (Online Certificate Status Protocol)
   [1] https://scotthelme.co.uk/revocation-is-broken/
   [2] https://blog.mozilla.org/security/2013/07/29/ocsp-stapling-in-firefox/
***/
/* 1211: enforce OCSP fetching to confirm current validity of certificates
 * 0=disabled, 1=enabled (default), 2=enabled for EV certificates only
 * OCSP (non-stapled) leaks information about the sites you visit to the CA (cert authority)
 * It's a trade-off between security (checking) and privacy (leaking info to the CA)
 * [NOTE] This pref only controls OCSP fetching and does not affect OCSP stapling
 * [SETTING] Privacy & Security>Security>Certificates>Query OCSP responder servers...
 * [1] https://en.wikipedia.org/wiki/Ocsp ***/
pref("security.OCSP.enabled", 1); // [DEFAULT: 1]
/* 1212: set OCSP fetch failures (non-stapled, see 1211) to hard-fail [SETUP-WEB]
 * When a CA cannot be reached to validate a cert, Firefox just continues the connection (=soft-fail)
 * Setting this pref to true tells Firefox to instead terminate the connection (=hard-fail)
 * It is pointless to soft-fail when an OCSP fetch fails: you cannot confirm a cert is still valid (it
 * could have been revoked) and/or you could be under attack (e.g. malicious blocking of OCSP servers)
 * [1] https://blog.mozilla.org/security/2013/07/29/ocsp-stapling-in-firefox/
 * [2] https://www.imperialviolet.org/2014/04/19/revchecking.html ***/
pref("security.OCSP.require", true);

/** CERTS / HPKP (HTTP Public Key Pinning) ***/
/* 1221: disable Windows 8.1's Microsoft Family Safety cert [FF50+] [WINDOWS]
 * 0=disable detecting Family Safety mode and importing the root
 * 1=only attempt to detect Family Safety mode (don't import the root)
 * 2=detect Family Safety mode and import the root
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/21686 ***/
pref("security.family_safety.mode", 0);
/* 1223: enable strict pinning
 * PKP (Public Key Pinning) 0=disabled, 1=allow user MiTM (such as your antivirus), 2=strict
 * [SETUP-WEB] If you rely on an AV (antivirus) to protect your web browsing
 * by inspecting ALL your web traffic, then leave at current default=1
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/16206 ***/
pref("security.cert_pinning.enforcement_level", 2);
/* 1224: enable CRLite [FF73+]
 * 0 = disabled
 * 1 = consult CRLite but only collect telemetry
 * 2 = consult CRLite and enforce both "Revoked" and "Not Revoked" results
 * 3 = consult CRLite and enforce "Not Revoked" results, but defer to OCSP for "Revoked" (FF99+, default FF100+)
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1429800,1670985,1753071
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
pref("dom.security.https_only_mode", true); // [FF76+]
   // pref("dom.security.https_only_mode_pbm", true); // [FF80+]
/* 1245: enable HTTPS-Only mode for local resources [FF77+] ***/
   // pref("dom.security.https_only_mode.upgrade_local", true);
/* 1246: disable HTTP background requests [FF82+]
 * When attempting to upgrade, if the server doesn't respond within 3 seconds, Firefox sends
 * a top-level HTTP request without path in order to check if the server supports HTTPS or not
 * This is done to avoid waiting for a timeout which takes 90 seconds
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1642387,1660945 ***/
   // pref("dom.security.https_only_mode_send_http_background_request", false); //BRACE-COMMENTED: usability, not all sites have HTTPS

/** UI (User Interface) ***/
/* 1270: display warning on the padlock for "broken security" (if 1201 is false)
 * Bug: warning padlock not indicated for subresources on a secure page! [2]
 * [1] https://wiki.mozilla.org/Security:Renegotiation
 * [2] https://bugzilla.mozilla.org/1353705 ***/
pref("security.ssl.treat_unsafe_negotiation_as_broken", true);
/* 1271: control "Add Security Exception" dialog on SSL warnings
 * 0=do neither, 1=pre-populate url, 2=pre-populate url + pre-fetch cert (default)
 * [1] https://github.com/pyllyukko/user.js/issues/210 ***/
pref("browser.ssl_override_behavior", 1);
/* 1272: display advanced information on Insecure Connection warning pages
 * only works when it's possible to add an exception
 * i.e. it doesn't work for HSTS discrepancies (https://subdomain.preloaded-hsts.badssl.com/)
 * [TEST] https://expired.badssl.com/ ***/
pref("browser.xul.error_pages.expert_bad_cert", true);

/*** [SECTION 1400]: FONTS ***/
pref("_user.js.parrot", "1400 syntax error: the parrot's bereft of life!");
/* 1401: disable rendering of SVG OpenType fonts ***/
pref("gfx.font_rendering.opentype_svg.enabled", false);
/* 1402: limit font visibility (Windows, Mac, some Linux) [FF94+]
 * Uses hardcoded lists with two parts: kBaseFonts + kLangPackFonts [1], bundled fonts are auto-allowed
 * In normal windows: uses the first applicable: RFP (4506) over TP over Standard
 * In Private Browsing windows: uses the most restrictive between normal and private
 * 1=only base system fonts, 2=also fonts from optional language packs, 3=also user-installed fonts
 * [1] https://searchfox.org/mozilla-central/search?path=StandardFonts*.inc ***/
   // pref("layout.css.font-visibility.private", 1);
   // pref("layout.css.font-visibility.standard", 1);
   // pref("layout.css.font-visibility.trackingprotection", 1);

/*** [SECTION 1600]: HEADERS / REFERERS
                  full URI: https://example.com:8888/foo/bar.html?id=1234
     scheme+host+port+path: https://example.com:8888/foo/bar.html
          scheme+host+port: https://example.com:8888
   [1] https://feeding.cloud.geek.nz/posts/tweaking-referrer-for-privacy-in-firefox/
***/
pref("_user.js.parrot", "1600 syntax error: the parrot rests in peace!");
/* 1601: control when to send a cross-origin referer
 * 0=always (default), 1=only if base domains match, 2=only if hosts match
 * [SETUP-WEB] Breakage: older modems/routers and some sites e.g banks, vimeo, icloud, instagram
 * If "2" is too strict, then override to "0" and use Smart Referer extension (Strict mode + add exceptions) ***/
pref("network.http.referer.XOriginPolicy", 2);
/* 1602: control the amount of cross-origin information to send [FF52+]
 * 0=send full URI (default), 1=scheme+host+port+path, 2=scheme+host+port ***/
pref("network.http.referer.XOriginTrimmingPolicy", 2);

/*** [SECTION 1700]: CONTAINERS ***/
pref("_user.js.parrot", "1700 syntax error: the parrot's bit the dust!");
/* 1701: enable Container Tabs and its UI setting [FF50+]
 * [SETTING] General>Tabs>Enable Container Tabs
 * https://wiki.mozilla.org/Security/Contextual_Identity_Project/Containers ***/
pref("privacy.userContext.enabled", true);
pref("privacy.userContext.ui.enabled", true);
/* 1702: set behavior on "+ Tab" button to display container menu on left click [FF74+]
 * [NOTE] The menu is always shown on long press and right click
 * [SETTING] General>Tabs>Enable Container Tabs>Settings>Select a container for each new tab ***/
   // pref("privacy.userContext.newTabContainerOnLeftClick.enabled", true);

/*** [SECTION 2000]: PLUGINS / MEDIA / WEBRTC ***/
pref("_user.js.parrot", "2000 syntax error: the parrot's snuffed it!");
/* 2001: disable WebRTC (Web Real-Time Communication)
 * Firefox uses mDNS hostname obfuscation on desktop (except Windows7/8) and the
 * private IP is NEVER exposed, except if required in TRUSTED scenarios; i.e. after
 * you grant device (microphone or camera) access
 * [SETUP-HARDEN] Test first. Windows7/8 users only: behind a proxy who never use WebRTC
 * [TEST] https://browserleaks.com/webrtc
 * [1] https://groups.google.com/g/discuss-webrtc/c/6stQXi72BEU/m/2FwZd24UAQAJ
 * [2] https://datatracker.ietf.org/doc/html/draft-ietf-mmusic-mdns-ice-candidates#section-3.1.1 ***/
pref("media.peerconnection.enabled", false); //MULL-UNCOMMENTED: Fenix doesn't protect local IP addreses like desktop does
/* 2002: force WebRTC inside the proxy [FF70+] ***/
pref("media.peerconnection.ice.proxy_only_if_behind_proxy", true);
/* 2003: force a single network interface for ICE candidates generation [FF42+]
 * When using a system-wide proxy, it uses the proxy interface
 * [1] https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidate
 * [2] https://wiki.mozilla.org/Media/WebRTC/Privacy ***/
pref("media.peerconnection.ice.default_address_only", true);
/* 2004: force exclusion of private IPs from ICE candidates [FF51+]
 * [SETUP-HARDEN] This will protect your private IP even in TRUSTED scenarios after you
 * grant device access, but often results in breakage on video-conferencing platforms ***/
   // pref("media.peerconnection.ice.no_host", true);
/* 2020: disable GMP (Gecko Media Plugins)
 * [1] https://wiki.mozilla.org/GeckoMediaPlugins ***/
   // pref("media.gmp-provider.enabled", false);
/* 2021: disable widevine CDM (Content Decryption Module)
 * [NOTE] This is covered by the EME master switch (2022) ***/
pref("media.gmp-widevinecdm.enabled", false); //BRACE-UNCOMMENTED: proprietary
/* 2022: disable all DRM content (EME: Encryption Media Extension)
 * Optionally hide the setting which also disables the DRM prompt
 * [SETUP-WEB] e.g. Netflix, Amazon Prime, Hulu, HBO, Disney+, Showtime, Starz, DirectTV
 * [SETTING] General>DRM Content>Play DRM-controlled content
 * [TEST] https://bitmovin.com/demos/drm
 * [1] https://www.eff.org/deeplinks/2017/10/drms-dead-canary-how-we-just-lost-web-what-we-learned-it-and-what-we-need-do-next ***/
pref("media.eme.enabled", false);
pref("browser.eme.ui.enabled", false); //BRACE-UNCOMMENTED: proprietary
/* 2030: disable autoplay of HTML5 media [FF63+]
 * 0=Allow all, 1=Block non-muted media (default), 5=Block all
 * [NOTE] You can set exceptions under site permissions
 * [SETTING] Privacy & Security>Permissions>Autoplay>Settings>Default for all websites ***/
   // pref("media.autoplay.default", 5);
/* 2031: disable autoplay of HTML5 media if you interacted with the site [FF78+]
 * 0=sticky (default), 1=transient, 2=user
 * Firefox's Autoplay Policy Documentation (PDF) is linked below via SUMO
 * [NOTE] If you have trouble with some video sites, then add an exception (2030)
 * [1] https://support.mozilla.org/questions/1293231 ***/
pref("media.autoplay.blocking_policy", 2);

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

/*** [SECTION 2600]: MISCELLANEOUS ***/
pref("_user.js.parrot", "2600 syntax error: the parrot's run down the curtain!");
/* 2601: prevent accessibility services from accessing your browser [RESTART]
 * [1] https://support.mozilla.org/kb/accessibility-services ***/
   // pref("accessibility.force_disabled", 1); //MULL-COMMENTED
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
 * [3] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=punycode+firefox
 * [4] https://www.xudongz.com/blog/2017/idn-phishing/ ***/
pref("network.IDN_show_punycode", true);
/* 2620: enforce PDFJS, disable PDFJS scripting [SETUP-CHROME]
 * This setting controls if the option "Display in Firefox" is available in the setting below
 *   and by effect controls whether PDFs are handled in-browser or externally ("Ask" or "Open With")
 * PROS: pdfjs is lightweight, open source, and more secure/vetted than most
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

/** DOWNLOADS ***/
/* 2651: enable user interaction for security by always asking where to download
 * [SETUP-CHROME] On Android this blocks longtapping and saving images
 * [SETTING] General>Downloads>Always ask you where to save files ***/
   // pref("browser.download.useDownloadDir", false); //MULL-COMMENTED: breakage, see note above
/* 2652: disable downloads panel opening on every download [FF96+] ***/
pref("browser.download.alwaysOpenPanel", false);
/* 2653: disable adding downloads to the system's "recent documents" list ***/
pref("browser.download.manager.addToRecentDocs", false);
/* 2654: enable user interaction for security by always asking how to handle new mimetypes [FF101+]
 * [SETTING] General>Files and Applications>What should Firefox do with other files ***/
pref("browser.download.always_ask_before_handling_new_types", true);

/** EXTENSIONS ***/
/* 2660: lock down allowed extension directories
 * [SETUP-CHROME] This will break extensions, language packs, themes and any other
 * XPI files which are installed outside of profile and application directories
 * [1] https://mike.kaply.com/2012/02/21/understanding-add-on-scopes/
 * [1] https://archive.is/DYjAM (archived) ***/
   // pref("extensions.enabledScopes", 5); // [HIDDEN PREF] //BRACE-COMMENTED: brace-installer-base adds system packages for add-ons (uBlock Origin)
   // pref("extensions.autoDisableScopes", 15); // [DEFAULT: 15] //BRACE-COMMENTED
/* 2661: disable bypassing 3rd party extension install prompts [FF82+]
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1659530,1681331 ***/
pref("extensions.postDownloadThirdPartyPrompt", false);
/* 2662: disable webextension restrictions on certain mozilla domains (you also need 4503) [FF60+]
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1384330,1406795,1415644,1453988 ***/
   // pref("extensions.webextensions.restrictedDomains", "");

/*** [SECTION 2700]: ETP (ENHANCED TRACKING PROTECTION) ***/
pref("_user.js.parrot", "2700 syntax error: the parrot's joined the bleedin' choir invisible!");
/* 2701: enable ETP Strict Mode [FF86+]
 * ETP Strict Mode enables Total Cookie Protection (TCP)
 * [NOTE] Adding site exceptions disables all ETP protections for that site and increases the risk of
 * cross-site state tracking e.g. exceptions for SiteA and SiteB means PartyC on both sites is shared
 * [1] https://blog.mozilla.org/security/2021/02/23/total-cookie-protection/
 * [SETTING] to add site exceptions: Urlbar>ETP Shield
 * [SETTING] to manage site exceptions: Options>Privacy & Security>Enhanced Tracking Protection>Manage Exceptions ***/
pref("browser.contentblocking.category", "strict");
/* 2702: disable ETP web compat features [FF93+]
 * [SETUP-HARDEN] Includes skip lists, heuristics (SmartBlock) and automatic grants
 * Opener Heuristics are granted for 30 days and Redirect Heuristics for 15 minutes, see [3]
 * [1] https://blog.mozilla.org/security/2021/07/13/smartblock-v2/
 * [2] https://hg.mozilla.org/mozilla-central/rev/e5483fd469ab#l4.12
 * [3] https://developer.mozilla.org/en-US/docs/Web/Privacy/State_Partitioning#storage_access_heuristics ***/
   // pref("privacy.antitracking.enableWebcompat", false);
/* 2710: enable state partitioning of service workers [FF96+] ***/
pref("privacy.partition.serviceWorkers", true);

/*** [SECTION 2800]: SHUTDOWN & SANITIZING ***/
pref("_user.js.parrot", "2800 syntax error: the parrot's bleedin' demised!");
/** COOKIES + SITE DATA : ALLOWS EXCEPTIONS ***/
/* 2801: delete cookies and site data on exit
 * 0=keep until they expire (default), 2=keep until you close Firefox
 * [NOTE] A "cookie" block permission also controls localStorage/sessionStorage, indexedDB,
 * sharedWorkers and serviceWorkers. serviceWorkers require an "Allow" permission
 * [SETTING] Privacy & Security>Cookies and Site Data>Delete cookies and site data when Firefox is closed
 * [SETTING] to add site exceptions: Ctrl+I>Permissions>Cookies>Allow
 * [SETTING] to manage site exceptions: Options>Privacy & Security>Permissions>Settings ***/
   // pref("network.cookie.lifetimePolicy", 2); //BRACE-COMMENTED: usability, no thanks
/* 2802: delete cache on exit [FF96+]
 * [NOTE] We already disable disk cache (1001) and clear on exit (2811) which is more robust
 * [1] https://bugzilla.mozilla.org/1671182 ***/
   // pref("privacy.clearsitedata.cache.enabled", true);

/** SANITIZE ON SHUTDOWN : ALL OR NOTHING ***/
/* 2810: enable Firefox to clear items on shutdown (2811)
 * [SETTING] Privacy & Security>History>Custom Settings>Clear history when Firefox closes ***/
pref("privacy.sanitize.sanitizeOnShutdown", false); //BRACE-DISABLED: usability, this ain't Tor Browser
/* 2811: set/enforce what items to clear on shutdown (if 2810 is true) [SETUP-CHROME]
 * These items do not use exceptions, it is all or nothing (1681701)
 * [NOTE] If "history" is true, downloads will also be cleared
 * [NOTE] "sessions": Active Logins: refers to HTTP Basic Authentication [1], not logins via cookies
 * [NOTE] "offlineApps": Offline Website Data: localStorage, service worker cache, QuotaManager (IndexedDB, asm-cache)
 * [SETTING] Privacy & Security>History>Custom Settings>Clear history when Firefox closes>Settings
 * [1] https://en.wikipedia.org/wiki/Basic_access_authentication ***/
pref("privacy.clearOnShutdown.cache", true);     // [DEFAULT: true]
pref("privacy.clearOnShutdown.downloads", true); // [DEFAULT: true]
pref("privacy.clearOnShutdown.formdata", true);  // [DEFAULT: true]
pref("privacy.clearOnShutdown.history", true);   // [DEFAULT: true]
pref("privacy.clearOnShutdown.sessions", true);  // [DEFAULT: true]
pref("privacy.clearOnShutdown.offlineApps", false); // [DEFAULT: false]
pref("privacy.clearOnShutdown.cookies", false);
   // pref("privacy.clearOnShutdown.siteSettings", false); // [DEFAULT: false]
/* 2812: reset default items to clear with Ctrl-Shift-Del (to match 2811) [SETUP-CHROME]
 * This dialog can also be accessed from the menu History>Clear Recent History
 * Firefox remembers your last choices. This will reset them when you start Firefox
 * [NOTE] Regardless of what you set "downloads" to, as soon as the dialog
 * for "Clear Recent History" is opened, it is synced to the same as "history" ***/
pref("privacy.cpd.cache", true);    // [DEFAULT: true]
pref("privacy.cpd.formdata", true); // [DEFAULT: true]
pref("privacy.cpd.history", true);  // [DEFAULT: true]
pref("privacy.cpd.sessions", true); // [DEFAULT: true]
pref("privacy.cpd.offlineApps", false); // [DEFAULT: false]
pref("privacy.cpd.cookies", false);
   // pref("privacy.cpd.downloads", true); // not used, see note above
   // pref("privacy.cpd.passwords", false); // [DEFAULT: false] not listed
   // pref("privacy.cpd.siteSettings", false); // [DEFAULT: false]
/* 2813: clear Session Restore data when sanitizing on shutdown or manually [FF34+]
 * [NOTE] Not needed if Session Restore is not used (0102) or it is already cleared with history (2811)
 * [NOTE] privacy.clearOnShutdown.openWindows prevents resuming from crashes (also see 5008)
 * [NOTE] privacy.cpd.openWindows has a bug that causes an additional window to open ***/
   // pref("privacy.clearOnShutdown.openWindows", true);
   // pref("privacy.cpd.openWindows", true);
/* 2814: reset default "Time range to clear" for "Clear Recent History" (2812)
 * Firefox remembers your last choice. This will reset the value when you start Firefox
 * 0=everything, 1=last hour, 2=last two hours, 3=last four hours, 4=today
 * [NOTE] Values 5 (last 5 minutes) and 6 (last 24 hours) are not listed in the dropdown,
 * which will display a blank value, and are not guaranteed to work ***/
pref("privacy.sanitize.timeSpan", 0);

/*** [SECTION 4500]: RFP (RESIST FINGERPRINTING)
   RFP covers a wide range of ongoing fingerprinting solutions.
   It is an all-or-nothing buy in: you cannot pick and choose what parts you want

   [WARNING] DO NOT USE extensions to alter RFP protected metrics

    418986 - limit window.screen & CSS media queries (FF41)
      [TEST] https://arkenfox.github.io/TZP/tzp.html#screen
   1281949 - spoof screen orientation (FF50)
   1281963 - hide the contents of navigator.plugins and navigator.mimeTypes (FF50-99)
      FF53: fixes GetSupportedNames in nsMimeTypeArray and nsPluginArray (1324044)
   1330890 - spoof timezone as UTC0 (FF55)
   1360039 - spoof navigator.hardwareConcurrency as 2 (FF55)
   1217238 - reduce precision of time exposed by javascript (FF55)
 FF56
   1369303 - spoof/disable performance API
   1333651 - spoof User Agent & Navigator API
      version: spoofed as ESR (FF102+ this is limited to Android)
      OS: JS spoofed as Windows 10, OS 10.15, Android 10, or Linux | HTTP Headers spoofed as Windows or Android
   1369319 - disable device sensor API
   1369357 - disable site specific zoom
   1337161 - hide gamepads from content
   1372072 - spoof network information API as "unknown" when dom.netinfo.enabled = true
   1333641 - reduce fingerprinting in WebSpeech API
 FF57
   1369309 - spoof media statistics
   1382499 - reduce screen co-ordinate fingerprinting in Touch API
   1217290 & 1409677 - enable some fingerprinting resistance for WebGL
   1382545 - reduce fingerprinting in Animation API
   1354633 - limit MediaError.message to a whitelist
 FF58-90
    967895 - spoof canvas and enable site permission prompt (FF58)
   1372073 - spoof/block fingerprinting in MediaDevices API (FF59)
      Spoof: enumerate devices as one "Internal Camera" and one "Internal Microphone"
      Block: suppresses the ondevicechange event
   1039069 - warn when language prefs are not set to "en*" (also see 0210, 0211) (FF59)
   1222285 & 1433592 - spoof keyboard events and suppress keyboard modifier events (FF59)
      Spoofing mimics the content language of the document. Currently it only supports en-US.
      Modifier events suppressed are SHIFT and both ALT keys. Chrome is not affected.
   1337157 - disable WebGL debug renderer info (FF60)
   1459089 - disable OS locale in HTTP Accept-Language headers (ANDROID) (FF62)
   1479239 - return "no-preference" with prefers-reduced-motion (FF63)
   1363508 - spoof/suppress Pointer Events (FF64)
   1492766 - spoof pointerEvent.pointerid (FF65)
   1485266 - disable exposure of system colors to CSS or canvas (FF67)
   1494034 - return "light" with prefers-color-scheme (FF67)
   1564422 - spoof audioContext outputLatency (FF70)
   1595823 - return audioContext sampleRate as 44100 (FF72)
   1607316 - spoof pointer as coarse and hover as none (ANDROID) (FF74)
   1621433 - randomize canvas (previously FF58+ returned an all-white canvas) (FF78)
   1653987 - limit font visibility to bundled and "Base Fonts" (Windows, Mac, some Linux) (FF80)
   1461454 - spoof smooth=true and powerEfficient=false for supported media in MediaCapabilities (FF82)
 FF91+
    531915 - use fdlibm's sin, cos and tan in jsmath (FF93, ESR91.1)
   1756280 - enforce navigator.pdfViewerEnabled as true and plugins/mimeTypes as hard-coded values (FF100)
***/
pref("_user.js.parrot", "4500 syntax error: the parrot's popped 'is clogs");
/* 4501: enable privacy.resistFingerprinting [FF41+]
 * [SETUP-WEB] RFP can cause some website breakage: mainly canvas, use a site exception via the urlbar
 * RFP also has a few side effects: mainly timezone is UTC0, and websites will prefer light theme
 * [1] https://bugzilla.mozilla.org/418986 ***/
pref("privacy.resistFingerprinting", true);
/* 4502: set new window size rounding max values [FF55+]
 * [SETUP-CHROME] sizes round down in hundreds: width to 200s and height to 100s, to fit your screen
 * [1] https://bugzilla.mozilla.org/1330882 ***/
pref("privacy.window.maxInnerWidth", 1600);
pref("privacy.window.maxInnerHeight", 900);
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
/* 4506: set RFP's font visibility level (1402) [FF94+] ***/
   // pref("layout.css.font-visibility.resistFingerprinting", 1); // [DEFAULT: 1]
/* 4507: disable showing about:blank as soon as possible during startup [FF60+]
 * When default true this no longer masks the RFP chrome resizing activity
 * [1] https://bugzilla.mozilla.org/1448423 ***/
pref("browser.startup.blankWindow", false);
/* 4510: disable using system colors
 * [SETTING] General>Language and Appearance>Fonts and Colors>Colors>Use system colors ***/
pref("browser.display.use_system_colors", false); // [DEFAULT false NON-WINDOWS]
/* 4511: enforce non-native widget theme
 * Security: removes/reduces system API calls, e.g. win32k API [1]
 * Fingerprinting: provides a uniform look and feel across platforms [2]
 * [1] https://bugzilla.mozilla.org/1381938
 * [2] https://bugzilla.mozilla.org/1411425 ***/
pref("widget.non-native-theme.enabled", true); // [DEFAULT: true]
/* 4512: enforce links targeting new windows to open in a new tab instead
 * 1=most recent window or tab, 2=new window, 3=new tab
 * Stops malicious window sizes and some screen resolution leaks.
 * You can still right-click a link and open in a new window
 * [SETTING] General>Tabs>Open links in tabs instead of new windows
 * [TEST] https://arkenfox.github.io/TZP/tzp.html#screen
 * [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/9881 ***/
pref("browser.link.open_newwindow", 3); // [DEFAULT: 3]
/* 4513: set all open window methods to abide by "browser.link.open_newwindow" (4512)
 * [1] https://searchfox.org/mozilla-central/source/dom/tests/browser/browser_test_new_window_from_content.js ***/
pref("browser.link.open_newwindow.restriction", 0);
/* 4520: disable WebGL (Web Graphics Library)
 * [SETUP-WEB] If you need it then override it. RFP still randomizes canvas for naive scripts ***/
pref("webgl.disabled", true);

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
 * control that instead; e.g. disable history, clear history on exit, use PB mode
 * [NOTE] favicons.sqlite is sanitized on Firefox close ***/
   // pref("browser.chrome.site_icons", false);
/* 5007: exclude "Undo Closed Tabs" in Session Restore ***/
   // pref("browser.sessionstore.max_tabs_undo", 0);
/* 5008: disable resuming session from crash ***/
   // pref("browser.sessionstore.resume_from_crash", false);
/* 5009: disable "open with" in download dialog [FF50+]
 * Application data isolation [1]
 * [1] https://bugzilla.mozilla.org/1281959 ***/
pref("browser.download.forbid_open_with", true); //BRACE-UNCOMMENTED: brace-installer-base installs firejail, without this would cause confusion
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
 * [NOTE] We also clear history and downloads on exit (2811)
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
   Not recommended. Overriding these can cause breakage and performance issues,
   they are mostly fingerprintable, and the threat model is practically nonexistent
***/
pref("_user.js.parrot", "5500 syntax error: this is an ex-parrot!");
/* 5501: disable MathML (Mathematical Markup Language) [FF51+]
 * [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=mathml ***/
pref("mathml.disabled", true); // 1173199 //BRACE-UNCOMMENTED: attack surface reduction
/* 5502: disable in-content SVG (Scalable Vector Graphics) [FF53+]
 * [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=firefox+svg ***/
   // pref("svg.disabled", true); // 1216893
/* 5503: disable graphite
 * [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=firefox+graphite
 * [2] https://en.wikipedia.org/wiki/Graphite_(SIL) ***/
pref("gfx.font_rendering.graphite.enabled", false); //BRACE-UNCOMMENTED: attack surface reduction
/* 5504: disable asm.js [FF22+]
 * [1] http://asmjs.org/
 * [2] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=asm.js
 * [3] https://rh0dev.github.io/blog/2017/the-return-of-the-jit/ ***/
pref("javascript.options.asmjs", false); //BRACE-UNCOMMENTED: attack surface reduction
/* 5505: disable Ion and baseline JIT to harden against JS exploits
 * [NOTE] When both Ion and JIT are disabled, and trustedprincipals
 * is enabled, then Ion can still be used by extensions (1599226)
 * [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=firefox+jit
 * [2] https://microsoftedge.github.io/edgevr/posts/Super-Duper-Secure-Mode/ ***/
pref("javascript.options.ion", false); //BRACE-UNCOMMENTED: attack surface reduction
pref("javascript.options.baselinejit", false); //BRACE-UNCOMMENTED: attack surface reduction
pref("javascript.options.jit_trustedprincipals", true); // [FF75+] [HIDDEN PREF] //BRACE-UNCOMMENTED: allow for extensions
/* 5506: disable WebAssembly [FF52+]
 * Vulnerabilities [1] have increasingly been found, including those known and fixed
 * in native programs years ago [2]. WASM has powerful low-level access, making
 * certain attacks (brute-force) and vulnerabilities more possible
 * [STATS] ~0.2% of websites, about half of which are for crytopmining / malvertising [2][3]
 * [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=wasm
 * [2] https://spectrum.ieee.org/tech-talk/telecom/security/more-worries-over-the-security-of-web-assembly
 * [3] https://www.zdnet.com/article/half-of-the-websites-using-webassembly-use-it-for-malicious-purposes ***/
pref("javascript.options.wasm", false); //BRACE-UNCOMMENTED: attack surface reduction

/*** [SECTION 6000]: DON'T TOUCH ***/
pref("_user.js.parrot", "6000 syntax error: the parrot's 'istory!");
/* 6001: enforce Firefox blocklist
 * [WHY] It includes updates for "revoked certificates"
 * [1] https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/ ***/
pref("extensions.blocklist.enabled", true); // [DEFAULT: true]
/* 6002: enforce no referer spoofing
 * [WHY] Spoofing can affect CSRF (Cross-Site Request Forgery) protections ***/
pref("network.http.referer.spoofSource", false); // [DEFAULT: false]
/* 6004: enforce a security delay on some confirmation dialogs such as install, open/save
 * [1] https://www.squarefree.com/2004/07/01/race-conditions-in-security-dialogs/ ***/
pref("security.dialog_enable_delay", 1000); // [DEFAULT: 1000]
/* 6007: enforce Local Storage Next Generation (LSNG) [FF65+] ***/
pref("dom.storage.next_gen", true); // [DEFAULT: true FF92+]
/* 6008: enforce no First Party Isolation [FF51+]
 * [WARNING] Replaced with network partitioning (FF85+) and TCP (2701),
 * and enabling FPI disables those. FPI is no longer maintained ***/
pref("privacy.firstparty.isolate", true); // [DEFAULT: false] //MULL-ENABLED: dFPI doesn't seem to be implemented the same in Fenix?
/* 6009: enforce SmartBlock shims [FF81+]
 * In FF96+ these are listed in about:compat
 * [1] https://blog.mozilla.org/security/2021/03/23/introducing-smartblock/ ***/
pref("extensions.webcompat.enable_shims", true); // [DEFAULT: true]
/* 6010: enforce/reset TLS 1.0/1.1 downgrades to session only
 * [NOTE] In FF97+ the TLS 1.0/1.1 downgrade UX was removed
 * [TEST] https://tls-v1-1.badssl.com:1010/ ***/
pref("security.tls.version.enable-deprecated", false); // [DEFAULT: false]
/* 6011: enforce disabling of Web Compatibility Reporter [FF56+]
 * Web Compatibility Reporter adds a "Report Site Issue" button to send data to Mozilla
 * [WHY] To prevent wasting Mozilla's time with a custom setup ***/
pref("extensions.webcompat-reporter.enabled", false); // [DEFAULT: false]
/* 6012: disable SHA-1 certificates ***/
pref("security.pki.sha1_enforcement_level", 1); // [DEFAULT: 1 FF102+]
/* 6050: prefsCleaner: reset items removed from arkenfox FF92+ ***/
   // pref("browser.urlbar.trimURLs", "");
   // pref("dom.caches.enabled", "");
   // pref("dom.storageManager.enabled", "");
   // pref("dom.storage_access.enabled", "");
   // pref("dom.targetBlankNoOpener.enabled", "");
   // pref("network.cookie.thirdparty.sessionOnly", "");
   // pref("network.cookie.thirdparty.nonsecureSessionOnly", "");
   // pref("privacy.firstparty.isolate.block_post_message", "");
   // pref("privacy.firstparty.isolate.restrict_opener_access", "");
   // pref("privacy.firstparty.isolate.use_site", "");
   // pref("privacy.window.name.update.enabled", "");
   // pref("security.insecure_connection_text.enabled", "");

/*** [SECTION 7000]: DON'T BOTHER ***/
pref("_user.js.parrot", "7000 syntax error: the parrot's pushing up daisies!");
/* 7001: disable APIs
 * Location-Aware Browsing, Full Screen, offline cache (appCache), Virtual Reality
 * [WHY] The API state is easily fingerprintable. Geo and VR are behind prompts (7002).
 * appCache storage capability was removed in FF90. Full screen requires user interaction ***/
   // pref("geo.enabled", false);
   // pref("full-screen-api.enabled", false);
   // pref("browser.cache.offline.enable", false);
   // pref("dom.vr.enabled", false); // [DEFAULT: false FF97+]
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
/* 7004: control TLS versions
 * [WHY] Passive fingerprinting and security ***/
   // pref("security.tls.version.min", 3); // [DEFAULT: 3]
   // pref("security.tls.version.max", 4);
/* 7005: disable SSL session IDs [FF36+]
 * [WHY] Passive fingerprinting and perf costs. These are session-only
 * and isolated with network partitioning (FF85+) and/or containers ***/
   // pref("security.ssl.disable_session_identifiers", true); // [HIDDEN PREF]
/* 7006: onions
 * [WHY] Firefox doesn't support hidden services. Use Tor Browser ***/
   // pref("dom.securecontext.allowlist_onions", true); // [FF97+] 1382359/1744006
   // pref("network.http.referer.hideOnionSource", true); // 1305144
/* 7007: referers
 * [WHY] Only cross-origin referers (1600s) need control ***/
   // pref("network.http.sendRefererHeader", 2);
   // pref("network.http.referer.trimmingPolicy", 0);
/* 7008: set the default Referrer Policy [FF59+]
 * 0=no-referer, 1=same-origin, 2=strict-origin-when-cross-origin, 3=no-referrer-when-downgrade
 * [WHY] Defaults are fine. They can be overridden by a site-controlled Referrer Policy ***/
   // pref("network.http.referer.defaultPolicy", 2); // [DEFAULT: 2]
   // pref("network.http.referer.defaultPolicy.pbmode", 2); // [DEFAULT: 2]
/* 7010: disable HTTP Alternative Services [FF37+]
 * [WHY] Already isolated with network partitioning (FF85+) ***/
   // pref("network.http.altsvc.enabled", false);
   // pref("network.http.altsvc.oe", false); // [DEFAULT: false FF94+]
/* 7011: disable website control over browser right-click context menu
 * [WHY] Just use Shift-Right-Click ***/
   // pref("dom.event.contextmenu.enabled", false);
/* 7012: disable icon fonts (glyphs) and local fallback rendering
 * [WHY] Breakage, font fallback is equivalency, also RFP
 * [1] https://bugzilla.mozilla.org/789788
 * [2] https://gitlab.torproject.org/legacy/trac/-/issues/8455 ***/
   // pref("gfx.downloadable_fonts.enabled", false); // [FF41+]
   // pref("gfx.downloadable_fonts.fallback_delay", -1);
/* 7013: disable Clipboard API
 * [WHY] Fingerprintable. Breakage. Cut/copy/paste require user
 * interaction, and paste is limited to focused editable fields ***/
   // pref("dom.event.clipboardevents.enabled", false);
/* 7014: disable System Add-on updates
 * [WHY] It can compromise security. System addons ship with prefs, use those ***/
   // pref("extensions.systemAddon.update.enabled", false); // [FF62+]
   // pref("extensions.systemAddon.update.url", ""); // [FF44+]
/* 7015: enable the DNT (Do Not Track) HTTP header
 * [WHY] DNT is enforced with Tracking Protection which is used in ETP Strict (2701) ***/
   // pref("privacy.donottrackheader.enabled", true);
/* 7016: customize ETP settings
 * [WHY] Arkenfox only supports strict (2701) which sets these at runtime ***/
pref("network.cookie.cookieBehavior", 1); //BRACE-UNCOMMENTED: strict cannot be set on first launch, use custom + enterprise policy instead //MULL-MODIFIED: set to 1 for FPI
pref("network.http.referer.disallowCrossSiteRelaxingDefault", true);
pref("network.http.referer.disallowCrossSiteRelaxingDefault.top_navigation", true); // [FF100+]
pref("privacy.partition.network_state.ocsp_cache", true);
pref("privacy.query_stripping.enabled", true); // [FF101+] [ETP FF102+]
pref("privacy.trackingprotection.enabled", true);
pref("privacy.trackingprotection.socialtracking.enabled", true);
pref("privacy.trackingprotection.cryptomining.enabled", true); // [DEFAULT: true]
pref("privacy.trackingprotection.fingerprinting.enabled", true); // [DEFAULT: true]
/* 7017: disable service workers
 * [WHY] Already isolated (FF96+) with TCP (2701) behind a pref (2710)
 * or blocked with TCP in 3rd parties (FF95 or lower) ***/
pref("dom.serviceWorkers.enabled", false); //MULL-UNCOMMENTED: disable for FPI
/* 7018: disable Web Notifications
 * [WHY] Web Notifications are behind a prompt (7002)
 * [1] https://blog.mozilla.org/en/products/firefox/block-notification-requests/ ***/
   // pref("dom.webnotifications.enabled", false); // [FF22+]
   // pref("dom.webnotifications.serviceworker.enabled", false); // [FF44+]
/* 7019: disable Push Notifications [FF44+]
 * [WHY] Push requires subscription
 * [NOTE] To remove all subscriptions, reset "dom.push.userAgentID"
 * [1] https://support.mozilla.org/kb/push-notifications-firefox ***/
pref("dom.push.enabled", false); //BRACE-UNCOMMENTED: unwanted, also broken on Mull due to proprietary GMS dependency

/*** [SECTION 8000]: DON'T BOTHER: FINGERPRINTING
   [WHY] They are insufficient to help anti-fingerprinting and do more harm than good
   [WARNING] DO NOT USE with RFP. RFP already covers these and they can interfere
***/
pref("_user.js.parrot", "8000 syntax error: the parrot's crossed the Jordan");
/* 8001: disable APIs ***/
   // pref("device.sensors.enabled", false);
   // pref("dom.enable_performance", false);
   // pref("dom.enable_resource_timing", false);
   // pref("dom.gamepad.enabled", false);
   // pref("dom.netinfo.enabled", false); // [DEFAULT: false NON-ANDROID: false ANDROID FF99+]
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
pref("_user.js.parrot", "9000 syntax error: the parrot's cashed in 'is chips!");
/* WELCOME & WHAT'S NEW NOTICES ***/
pref("browser.startup.homepage_override.mstone", "ignore"); // master switch
   // pref("startup.homepage_welcome_url", "");
   // pref("startup.homepage_welcome_url.additional", "");
   // pref("startup.homepage_override_url", ""); // What's New page after updates
/* WARNINGS ***/
   // pref("browser.tabs.warnOnClose", false); // [DEFAULT false FF94+]
   // pref("browser.tabs.warnOnCloseOtherTabs", false);
   // pref("browser.tabs.warnOnOpen", false);
   // pref("browser.warnOnQuitShortcut", false); // [FF94+]
   // pref("full-screen-api.warning.delay", 0);
   // pref("full-screen-api.warning.timeout", 0);
/* UPDATES ***/
   // pref("app.update.auto", false); // [NON-WINDOWS] disable auto app updates
      // [NOTE] You will still get prompts to update, and should do so in a timely manner
      // [SETTING] General>Firefox Updates>Check for updates but let you choose to install them
   // pref("browser.search.update", false); // disable search engine updates (e.g. OpenSearch)
      // [NOTE] This does not affect Mozilla's built-in or Web Extension search engines
   // pref("extensions.update.enabled", false); // disable extension and theme update checks
   // pref("extensions.update.autoUpdateDefault", false); // disable installing extension and theme updates
      // [SETTING] about:addons>Extensions>[cog-wheel-icon]>Update Add-ons Automatically (toggle)
   // pref("extensions.getAddons.cache.enabled", false); // disable extension metadata (extension detail tab)
/* APPEARANCE ***/
   // pref("browser.download.autohideButton", false); // [FF57+]
   // pref("toolkit.legacyUserProfileCustomizations.stylesheets", true); // [FF68+] allow userChrome/userContent
   // pref("ui.prefersReducedMotion", 1); // disable chrome animations [FF77+] [RESTART] [HIDDEN PREF]
      // 0=no-preference, 1=reduce: with RFP this only affects chrome
   // pref("ui.systemUsesDarkTheme", 1); // [FF67+] [HIDDEN PREF]
      // 0=light, 1=dark: with RFP this only affects chrome
/* CONTENT BEHAVIOR ***/
   // pref("accessibility.typeaheadfind", true); // enable "Find As You Type"
   // pref("clipboard.autocopy", false); // disable autocopy default [LINUX]
   // pref("layout.spellcheckDefault", 2); // 0=none, 1-multi-line, 2=multi-line & single-line
/* UX BEHAVIOR ***/
   // pref("browser.backspace_action", 2); // 0=previous page, 1=scroll up, 2=do nothing
   // pref("browser.quitShortcut.disabled", true); // disable Ctrl-Q quit shortcut [LINUX] [MAC] [FF87+]
   // pref("browser.tabs.closeWindowWithLastTab", false);
   // pref("browser.tabs.loadBookmarksInTabs", true); // open bookmarks in a new tab [FF57+]
   // pref("browser.urlbar.decodeURLsOnCopy", true); // see bugzilla 1320061 [FF53+]
   // pref("general.autoScroll", false); // middle-click enabling auto-scrolling [DEFAULT: false on Linux]
   // pref("ui.key.menuAccessKey", 0); // disable alt key toggling the menu bar [RESTART]
   // pref("view_source.tab", false); // view "page/selection source" in a new window [FF68+]
/* UX FEATURES ***/
pref("browser.messaging-system.whatsNewPanel.enabled", false); // What's New toolbar icon [FF69+]
pref("extensions.pocket.enabled", false); // Pocket Account [FF46+] //BRACE-UNCOMMENTED: unwanted
   // pref("extensions.screenshots.disabled", true); // [FF55+]
pref("identity.fxaccounts.enabled", false); // Firefox Accounts & Sync [FF60+] [RESTART] //BRACE-UNCOMMENTED: unwanted
   // pref("reader.parse-on-load.enabled", false); // Reader View
/* OTHER ***/
   // pref("browser.bookmarks.max_backups", 2);
pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons", false); // disable CFR [FF67+]
      // [SETTING] General>Browsing>Recommend extensions as you browse
pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features", false); // disable CFR [FF67+]
      // [SETTING] General>Browsing>Recommend features as you browse
pref("network.manage-offline-status", false); // see bugzilla 620472 //BRACE-UNCOMMENTED: unnecessary
   // pref("xpinstall.signatures.required", false); // enforced extension signing (Nightly/ESR)

/*** [SECTION 9999]: DEPRECATED / REMOVED / LEGACY / RENAMED
   Documentation denoted as [-]. Items deprecated prior to FF91 have been archived at [1]
   [1] https://github.com/arkenfox/user.js/issues/123
***/
pref("_user.js.parrot", "9999 syntax error: the parrot's shuffled off 'is mortal coil!");
// ESR91.x still uses all the following prefs
// [NOTE] replace the * with a slash in the line above to re-enable them
// FF93
// 7003: disable non-modern cipher suites
   // [-] https://bugzilla.mozilla.org/1724072
   // pref("security.ssl3.rsa_des_ede3_sha", false); // 3DES
// FF94
// 1402: limit font visibility (Windows, Mac, some Linux) [FF79+] - replaced by new 1402
   // [-] https://bugzilla.mozilla.org/1715507
   // pref("layout.css.font-visibility.level", 1);
// FF95
// 0807: disable location bar contextual suggestions [FF92+] - replaced by new 0807
   // [-] https://bugzilla.mozilla.org/1735976
pref("browser.urlbar.suggest.quicksuggest", false);
// FF96
// 0302: disable auto-INSTALLING Firefox updates via a background service + hide the setting [FF90+] [WINDOWS]
   // [SETTING] General>Firefox Updates>Automatically install updates>When Firefox is not running
   // [1] https://support.mozilla.org/kb/enable-background-updates-firefox-windows
   // [-] https://bugzilla.mozilla.org/1738983
pref("app.update.background.scheduling.enabled", false);
// FF97
// 7006: onions - replaced by new 7006 "allowlist"
   // [-] https://bugzilla.mozilla.org/1744006
   // pref("dom.securecontext.whitelist_onions", true); // 1382359
// FF99
// 6003: enforce CSP (Content Security Policy)
   // [1] https://developer.mozilla.org/docs/Web/HTTP/CSP
   // [-] https://bugzilla.mozilla.org/1754301
pref("security.csp.enable", true); // [DEFAULT: true]
// FF100
// 7009: disable HTTP2 - replaced by network.http.http2* prefs
   // [WHY] Passive fingerprinting. ~50% of sites use HTTP2 [1]
   // [1] https://w3techs.com/technologies/details/ce-http2/all/all
   // [-] https://bugzilla.mozilla.org/1752621
   // pref("network.http.spdy.enabled", false);
   // pref("network.http.spdy.enabled.deps", false);
   // pref("network.http.spdy.enabled.http2", false);
   // pref("network.http.spdy.websockets", false); // [FF65+]
// ***/

/* END: internal custom pref to test for syntax errors ***/
pref("_user.js.parrot", "SUCCESS: No no he's not dead, he's, he's restin'!");
