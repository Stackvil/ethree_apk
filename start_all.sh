#!/bin/bash
# Start backend
cd backend
node src/server.js > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Start Expo
CI=1 npx --yes expo start > expo.log 2>&1 &
EXPO_PID=$!

echo "Backend started with PID $BACKEND_PID"
echo "Expo started with PID $EXPO_PID"
