#!/bin/bash
#
#    Fennec build scripts
#    Copyright (C) 2020-2022  Matías Zúñiga, Andrew Nayenko
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <https://www.gnu.org/licenses/>.
#

set -e

# shellcheck source=paths.sh
source "$(dirname "$0")/paths.sh"

# We publish the artifacts into a local Maven repository instead of using the
# auto-publication workflow because the latter does not work for Gradle
# plugins (Glean).

# Set up Android SDK
if grep -q "Fedora" /etc/os-release; then
	JAVA_HOME="/usr/lib/jvm/java-1.8.0-openjdk" "$ANDROID_HOME/tools/bin/sdkmanager" 'build-tools;31.0.0'
	JAVA_HOME="/usr/lib/jvm/java-1.8.0-openjdk" "$ANDROID_HOME/tools/bin/sdkmanager" 'ndk;25.1.8937393'
else
	sdkmanager 'build-tools;31.0.0'
	sdkmanager 'ndk;25.1.8937393' # for Glean
fi;

# Set up Rust
"$rustup"/rustup-init.sh -y
# shellcheck disable=SC1091
source "$HOME/.cargo/env"
rustup default 1.63.0
rustup target add thumbv7neon-linux-androideabi
rustup target add armv7-linux-androideabi
rustup target add aarch64-linux-android
cargo install --force --vers 0.24.3 cbindgen

# Build WASI SDK
pushd "$wasi"
mkdir -p build/install/wasi
touch build/compiler-rt.BUILT # fool the build system
# BULK_MEMORY_SOURCES= disables -mbulk-memory which is not supported by wasm2c
make \
    BULK_MEMORY_SOURCES= \
    PREFIX=/wasi \
    build/wasi-libc.BUILT \
    build/libcxx.BUILT \
    -j"$(nproc)"
popd

pushd "$mozilla_release"
./mach build
gradle publishWithGeckoBinariesReleasePublicationToMavenLocal
gradle exoplayer2:publishReleasePublicationToMavenLocal
popd

pushd "$glean_as"
export TARGET_CFLAGS=-DNDEBUG
gradle publishToMavenLocal
popd

pushd "$glean"
gradle publishToMavenLocal
popd

pushd "$android_components_as"
gradle publishToMavenLocal
popd

pushd "$application_services"
export ANDROID_NDK_ROOT="$ANDROID_NDK"
export SQLCIPHER_LIB_DIR="$application_services/libs/desktop/linux-x86-64/sqlcipher/lib"
export SQLCIPHER_INCLUDE_DIR="$application_services/libs/desktop/linux-x86-64/sqlcipher/include"
export NSS_DIR="$application_services/libs/desktop/linux-x86-64/nss"
export NSS_STATIC=1
./libs/verify-android-environment.sh
gradle publishToMavenLocal
popd

pushd "$android_components"
gradle publishToMavenLocal
popd

gradle assembleRelease
