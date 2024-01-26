to execute the test:

* create release build: `cd android && ./gradlew assembleRelease`
* start emulator and install adb `adb install android/app/build/outputs/apk/release/app-release.apk`
* run maestro: `cd maestro-test && maestro test demo-flow.yaml`
