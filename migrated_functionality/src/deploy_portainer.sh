#!/bin/bash
echo "🚀 IZA OS - Portainer Deployment Script"
echo "======================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

echo "✅ Docker is running"

# Deploy Portainer
echo "🚀 Deploying Portainer..."
docker-compose -f docker-compose-portainer.yml up -d

echo ""
echo "✅ Portainer deployed successfully!"
echo "🌐 Access Portainer at: http://localhost:9000"
echo "🔒 SSL Access at: https://localhost:9443"
echo ""
echo "📋 Initial Setup:"
echo "1. Open http://localhost:9000"
echo "2. Create admin account"
echo "3. Connect to Docker environment"
echo "4. Start managing your containers!"
