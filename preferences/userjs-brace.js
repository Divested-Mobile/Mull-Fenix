//Look
pref("browser.ctrlTab.recentlyUsedOrder", false);
pref("browser.privatebrowsing.vpnpromourl", "");
pref("browser.tabs.drawInTitlebar", true);
pref("devtools.netmonitor.persistlog", true);
pref("devtools.webconsole.persistlog", true);
pref("dom.vibrator.enabled", false);
pref("general.smoothScroll", false);
pref("widget.allow-client-side-decoration", true);
pref("mailnews.start_page.enabled", false);
pref("browser.newtabpage.activity-stream.asrouter.providers.snippets", "{}"); //BRACE-KEEP_FOR_NOW
pref("browser.library.activity-stream.enabled", false); //BRACE-UNCOMMENTED

//Privacy
pref("browser.snippets.enabled", false);
pref("browser.snippets.firstrunHomepage.enabled", false);
pref("browser.snippets.syncPromo.enabled", false);
pref("browser.snippets.updateUrl", "");
pref("dom.battery.enabled", false);
pref("general.useragent.updates.enabled", false);
pref("network.negotiate-auth.trusted-uris", "");
pref("network.trr.custom_uri", "https://dns.quad9.net/dns-query");
pref("plugin.expose_full_path", false);
pref("extensions.enigmail.autoWkdLookup", 0);
pref("messenger.status.reportIdle", false);
pref("media.gmp-widevinecdm.visible", false); //BRACE-KEEP_FOR_NOW: proprietary
pref("network.manage-offline-status", false);

//Security
pref("browser.gnome-search-provider.enabled", false);
pref("fission.autostart", false);
pref("fission.autostart.session", false);
pref("mail.phishing.detection.enabled", true);
pref("mailnews.message_display.disable_remote_image", true);

//Disable Pocket
pref("browser.newtabpage.activity-stream.feeds.section.topstories", false);
pref("browser.newtabpage.activity-stream.section.highlights.includePocket", false);
pref("extensions.pocket.enabled", false);

//Disable Sync
pref("identity.fxaccounts.enabled", false);
