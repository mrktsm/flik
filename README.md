# Flik

An interactive reels app - like TikTok but for CodePen-style interactive content instead of videos.

## Features

- 🏠 **Home Feed**: Vertical scrolling feed for interactive content
- 🔍 **Discover**: Search and explore new content
- ➕ **Create**: Upload your interactive experiences
- 💬 **Inbox**: Messages and notifications
- 👤 **Profile**: User profile and settings

## Tech Stack

- React Native (Expo SDK 54)
- TypeScript
- React Navigation
- Styled Components

## Getting Started

### Prerequisites

- Node.js
- Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Installation

```bash
npm install
```

### Running the App

```bash
npx expo start
```

Then scan the QR code with Expo Go on your phone.

## Project Structure

```
app/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Screen components
│   │   ├── Home/
│   │   ├── Discover/
│   │   ├── Create/
│   │   ├── Inbox/
│   │   └── Profile/
│   └── routes/         # Navigation configuration
├── App.tsx             # App entry point
└── package.json
```

## License

MIT

