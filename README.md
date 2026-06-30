# <font color="#89CFF0">Setup Instruction</font>

## 🚀 Prerequisites

Before you start, make sure you have these installed on your computer:

* **Node.js** (Version 18 or newer)
* **Java Development Kit (JDK)**
* **Android Studio** (with a working Android emulator)
* **Expo CLI**
* **Expo Go** app (Optional: if you want to test on your own phone, download "Expo Go" from the Google Play Store). Expo SDK 54.

## 🛠️ Mobile App Setup (React Native / Expo)
Follow these steps to configure and start the mobile application:

1. Please set this variable inside <font color="orange">**.env**</font> file 
   ```
   EXPO_PUBLIC_API_ENDPOINT=
   ```
   - If using the Android Emulator: Use **10.0.2.2:8000**. (This special IP address lets the emulator connect directly to your computer's local server).
   - If using a Physical Device: Use your computer's local IP address **[YourIpAddress]:8000**, for example: **192.168.8.125:8000**. Make sure both your computer and your phone are on the exact same Wi-Fi network.

2. Open terminal on this project folder and run this command
   - Run `npm install`

## 📱 How to Run the Mobile App
1. **Start the Development Server** <br>
Run the following command in your project root terminal to boot up the Metro Bundler:
   ```
   // You can use one of the commands
   npm start

   npx expo start
   ```

2. **Launch on a Device or Emulator**
- Android Emulator: Press a in your terminal window to open the app inside Android Studio's virtual device.
- Physical Device (Android): Open the Expo Go app and tap "Scan QR Code".

