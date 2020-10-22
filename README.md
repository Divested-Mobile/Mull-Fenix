What's this?
------------

This is a fork of Relan's excellent [fennecbuild repository](https://gitlab.com/relan/fennecbuild).
It allows compiling the entirety of Fenix without prebuilts along with removal of the proprietary blobs.

This fork is specifically for compiling Mull.
It enables many features upstreamed by the Tor Uplift project using preferences from the [arkenfox-user.js project](https://github.com/arkenfox/user.js).
It was originally created as builds of the patchset from [bug 1419581](https://bugzilla.mozilla.org/show_bug.cgi?id=1419581).

This is compiled using fdroidserver.
You will need to copy the config files from -fdroiddata/ into their respective folders first.
Then run:
```
fdroid build us.spotco.fennec_dos:VERCODE
```
where VERCODE is a version code number.
VERCODE is currently prepended with 2 as an epoch for upgrade from old Fennec-based Mull.
The second to last number of the VERCODE corresponds to the architecture to compile.
0 = ARMv7, 1 = x86, 2 = AArch64

Updating
--------
- Setup: `git remote add upstream https://gitlab.com/relan/fennecbuild`
- Update:
```
git fetch upstream
git rebase upstream/master
```

Setting up the VM
-----------------
Getting a working fdroidserver is a bit tricky.
Here are some steps to get you in the right direction.
- Setup a VM, you'll want at least 16GB RAM and 64GB of storage
- Fedora 33 and Debian 10 have been tested to work
- `git clone https://gitlab.com/fdroid/fdroidserver.git`
- `git clone https://gitlab.com/fdroid/fdroiddata.git`
- Install JDK 8
- Install Gradle 6.7
- setup Android SDK/NDK:
```
mkdir android android-ndk
wget https://dl.google.com/android/repository/tools_r25.2.3-linux.zip
unzip tools_r*-linux.zip -d android/
android update sdk --no-ui
android update sdk --no-ui --filter build-tools-29.0.3,android-29,build-tools-28.0.3,android-28 --all
wget https://dl.google.com/android/repository/android-ndk-r21d-linux-x86_64.zip
unzip android-ndk-r21d-linux-x86_64.zip -d android-ndk/
wget https://dl.google.com/android/repository/android-ndk-r20b-linux-x86_64.zip
unzip android-ndk-r20b-linux-x86_64.zip -d android-ndk/
echo "ndk_paths = { 'r21d': \"\$ANDROID_NDK\" }" >> fdroiddata/config.py
```
- Add the following to your .bashrc
```
export ANDROID_HOME=~/android
export ANDROID_NDK=~/android-ndk/android-ndk-r21d
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
export PATH=$PATH:~/fdroidserver
```
- `source .bashrc`

Licenses
--------

The scripts are licensed under the GNU Affero General Public License version 3 or later.

Changes in the patch are licensed according to the header in the files this patch adds or modifies (Apache 2.0 or MPL 2.0).

The artwork is licensed under the MPL 2.0.

The userjs-00-arkenfox.js file is licensed under MIT.

Notices
-------

Mozilla Firefox is a trademark of The Mozilla Foundation

Divested Computing Group is not affiliated with Mozilla

Mull is not sponsored or endorsed by Mozilla

Firefox source code is available at https://hg.mozilla.org