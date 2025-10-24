#!/bin/bash

# Startup script for Ditch Rider Academy integration
# This script starts both the main React app and the Angular academy

echo "🤠 Starting Rango's Desert Outpost with Ditch Rider Academy..."
echo ""

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $1 is already in use"
        return 1
    else
        echo "✅ Port $1 is available"
        return 0
    fi
}

# Check if ports are available
echo "🔍 Checking ports..."
check_port 5173
check_port 4200

echo ""
echo "🚀 Starting applications..."

# Start Angular app in background
echo "📚 Starting Ditch Rider Academy (Angular) on port 4200..."
cd src/apps/ditch-rider-academy
npm start &
ANGULAR_PID=$!

# Wait a moment for Angular to start
sleep 5

# Start main React app
echo "🏜️  Starting main Desert Outpost (React) on port 5173..."
cd ../../..
npm run dev &
REACT_PID=$!

echo ""
echo "🎉 Both applications are starting!"
echo ""
echo "📱 Main Outpost: http://localhost:5173"
echo "📚 Ditch Rider Academy: http://localhost:4200"
echo ""
echo "💡 The Angular app will be embedded in the main outpost"
echo "   Navigate to 'Ditch Rider Academy' in the main app"
echo ""
echo "🛑 Press Ctrl+C to stop both applications"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping applications..."
    kill $ANGULAR_PID 2>/dev/null
    kill $REACT_PID 2>/dev/null
    echo "✅ Applications stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for processes
wait
