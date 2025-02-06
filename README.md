# Kakeiboo

An app build by @alvropena using Expo and React Native.

To run the app in your own backend, you need to create your own database of Supabase.

## Setup
### Clone the repository

```bash
git clone https://github.com/alvropena/kakeiboo.git
```

### Install dependencies

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root of the project and add the following:

### Supabase Configuration

To run the app with your own backend, you need to set up a Supabase database.

1. Go to Supabase and create a new project.

2. Copy the Project URL and Anon Key from the API settings.

3. Create a .env.local file in the root of the project and add the following:

```bash
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

### Run the app

```bash
npm expo start
```