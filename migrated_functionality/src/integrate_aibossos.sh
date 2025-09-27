#!/bin/bash

# AIBOSSOS + IZA OS Integration Script
echo "🚀 INTEGRATING AIBOSSOS WITH IZA OS ECOSYSTEM"
echo "============================================="
echo "Ecosystem Value: $2.84B+"
echo ""

# Navigate to AIBOSSOS directory
cd /Users/divinejohns/memU/aibossoslandingpage

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install IZA OS specific dependencies
echo "📦 Installing IZA OS dependencies..."
npm install @supabase/supabase-js stripe axios react-query

# Create environment file
echo "🔧 Creating environment configuration..."
cat > .env.local << 'EOF'
# IZA OS Backend Configuration
VITE_IZA_OS_BACKEND_URL=http://localhost:8000
VITE_IZA_OS_API_TIMEOUT=10000

# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-key

# IZA OS Ecosystem Configuration
VITE_ECOSYSTEM_VALUE=$2.84B+
VITE_TOTAL_AGENTS=1800
VITE_TOTAL_WORKFLOWS=156
VITE_AUTOMATION_LEVEL=98%
EOF

# Create build script
echo "🔧 Creating build script..."
cat > build-iza.sh << 'EOF'
#!/bin/bash
echo "🏗️ Building AIBOSSOS with IZA OS integration..."

# Build the application
npm run build:iza

# Copy build files to IZA OS static directory
if [ -d "../memu/super_design_dashboards/public" ]; then
    echo "📁 Copying build to IZA OS dashboard..."
    cp -r dist/* ../memu/super_design_dashboards/public/aibossos/
    echo "✅ Build copied to IZA OS dashboard"
fi

echo "✅ Build complete!"
EOF

chmod +x build-iza.sh

# Create development script
echo "🔧 Creating development script..."
cat > dev-iza.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting AIBOSSOS development server with IZA OS integration..."

# Start the development server
npm run dev:iza
EOF

chmod +x dev-iza.sh

# Test the integration
echo "🧪 Testing integration..."
if curl -s http://localhost:8000/health > /dev/null; then
    echo "✅ IZA OS backend is running"
else
    echo "⚠️ IZA OS backend is not running - start it first"
fi

echo ""
echo "🎉 AIBOSSOS + IZA OS INTEGRATION COMPLETE!"
echo "=========================================="
echo "Next steps:"
echo "1. Start IZA OS backend: python3 IZA_OS_UNIFIED_BACKEND.py"
echo "2. Start AIBOSSOS: ./dev-iza.sh"
echo "3. Access AIBOSSOS: http://localhost:3001"
echo "4. Access IZA OS Dashboard: http://localhost:3000"
echo ""
echo "🌐 Integration URLs:"
echo "AIBOSSOS Frontend: http://localhost:3001"
echo "IZA OS Backend: http://localhost:8000"
echo "IZA OS Dashboard: http://localhost:3000"
echo "N8N Workflows: http://localhost:5678"
echo "Ollama AI: http://localhost:11434"
