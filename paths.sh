#!/bin/bash
#
#    Fennec build scripts
#    Copyright (C) 2020-2022  Andrew Nayenko
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

readonly patches=$(dirname "$(realpath "$0")")
readonly android_components_as=$(realpath ../srclib/MozAndroidComponentsAS)
readonly android_components=$(realpath ../srclib/FirefoxAndroid/android-components)
readonly application_services=$(realpath ../srclib/MozAppServices)
readonly glean_as=$(realpath ../srclib/MozGleanAS)
readonly glean=$(realpath ../srclib/MozGlean)
readonly mozilla_release=$(realpath ../srclib/MozFennec)
readonly rustup=$(realpath ../srclib/rustup)
readonly wasi=$(realpath ../srclib/wasi-sdk)
