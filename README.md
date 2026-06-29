# <font color="#89CFF0">Setup Instruction</font>

## 🚀 Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/downloads/) (v17 recommended)
- [Android Studio](https://developer.android.com/studio) with an Android emulator configured
- [Expo Go](https://expo.dev/go) on your physical device (optional)

## 🛠️ React Native Setup
1. Please set this variable inside <font color="orange">**.env**</font> file 
```
API_ENDPOINT=
```
2. Open terminal on this project folder and run this command
   - Run `npm install`

## 📱 How to Run the Mobile App
1. **Start the Development Server** <br>
Run the following command in your project root terminal to boot up the Metro Bundler:
```
npm start
```
2. **Launch on a Device or Emulator** <br>
- 🤖 Android Emulator: Press a in your terminal window to open the app inside Android Studio's virtual device.
- 📲 Physical Device: Android: Open the Expo Go app and tap "Scan QR Code".

php artisan serve --host=0.0.0.0 --port=8000
The Fix for Android Emulators: Replace localhost with 10.0.2.2 (e.g., http://10.0.2.2:3000/movies).
The Fix for Physical Devices: Use your computer's actual local IP address (e.g., http://192.168.1.XX:3000), making sure both your computer and your phone are on the exact same Wi-Fi network.
