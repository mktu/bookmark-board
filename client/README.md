# Bookmark-Board-Client
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
## Site page
Visit : https://bookmark-board.com/
## Requirement
### Firebase
This project uses firebase's Authentication and Cloud Fire Store, Functions, Storage. Please sign up for firebase and enable these services.  
- https://firebase.google.com/docs/auth  
- https://firebase.google.com/docs/firestore  
- https://firebase.google.com/docs/functions  
- https://firebase.google.com/docs/storage

## Getting Started

1.Create the `.env.loal` file and set following environment variables.

```bash:.env

# Firebse client settings
NEXT_PUBLIC_FIREBASE_DATABASE_URL='****'
NEXT_PUBLIC_FIREBASE_API_KEY='****'
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN='****'
NEXT_PUBLIC_FIREBASE_PROJECT_ID='****'
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID='****'
NEXT_PUBLIC_FIRESTORE_STORAGE_BUCKET='****'
NEXT_PUBLIC_FIRESTORE_STORAGE_IMAGE_BUCKET='****'
NEXT_PUBLIC_FIREBASE_APP_ID='****'

# Use for Static site generation
FIREBASE_PRIVATE_KEY='****'
FIREBASE_CLIENT_EMAIL='****'
FIREBASE_PROJECT_ID='****'

# ==== OPTIONAL ENV VARIABLES ====

# Necessary if use Imagekit.io
NEXT_PUBLIC_IMGKIT_ID='****'

# Use for og:url
NEXT_PUBLIC_VERCEL_URL='****'

# Use for Google Analytics
NEXT_PUBLIC_GA_ID='****'

```

2.Installation
```bash
npm install
# or
yarn install
```

3.Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



