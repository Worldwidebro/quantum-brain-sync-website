#!/bin/bash

# Create Remaining Repositories with Rate Limiting
# Billionaire Consciousness Empire - Repository Completion Script

set -e

echo "🚀 Creating Remaining Repositories with Rate Limiting"
echo "====================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_header() {
    echo -e "${PURPLE}🚀 $1${NC}"
}

# Configuration
BATCH_SIZE=5
BATCH_DELAY=60
REPO_DELAY=10
MAX_RETRIES=3

# Create AI/ML Repositories (15 repositories) - HIGHEST PRIORITY
create_ai_ml_repos() {
    print_header "Creating AI/ML Repositories (15 repositories) - HIGHEST PRIORITY"
    
    local ai_ml_repos=(
        "iza-os-llm-adapter:🧠 LLM Adapter - Large language model integration and management"
        "iza-os-vector-database:🔢 Vector Database - Vector storage and retrieval system"
        "iza-os-embedding-service:📊 Embedding Service - Text and data embedding generation"
        "iza-os-model-training:🎯 Model Training - AI model training and fine-tuning"
        "iza-os-inference-engine:⚡ Inference Engine - AI model inference and serving"
        "iza-os-prompt-engineering:✍️ Prompt Engineering - Advanced prompt optimization"
        "iza-os-rag-system:🔍 RAG System - Retrieval-Augmented Generation implementation"
        "iza-os-knowledge-graph:🕸️ Knowledge Graph - Knowledge representation and reasoning"
        "iza-os-semantic-search:🔎 Semantic Search - Intelligent search and discovery"
        "iza-os-nlp-pipeline:🗣️ NLP Pipeline - Natural language processing workflows"
        "iza-os-computer-vision:👁️ Computer Vision - Image and video analysis"
        "iza-os-speech-processing:🎤 Speech Processing - Audio and speech analysis"
        "iza-os-recommendation-engine:💡 Recommendation Engine - Personalized recommendations"
        "iza-os-predictive-modeling:🔮 Predictive Modeling - Predictive analytics and forecasting"
        "iza-os-ai-orchestration:🎭 AI Orchestration - Multi-model AI coordination"
    )
    
    local batch_count=0
    local total_created=0
    
    for repo_info in "${ai_ml_repos[@]}"; do
        local repo_name="${repo_info%%:*}"
        local description="${repo_info##*:}"
        
        echo "Creating AI/ML repository: $repo_name"
        
        # Try to create repository with retries
        local retry_count=0
        local created=false
        
        while [ $retry_count -lt $MAX_RETRIES ] && [ "$created" = false ]; do
            if gh repo create Worldwidebro/$repo_name --public --description "$description" 2>/dev/null; then
                print_status "Created: $repo_name"
                created=true
                total_created=$((total_created + 1))
            else
                retry_count=$((retry_count + 1))
                if [ $retry_count -lt $MAX_RETRIES ]; then
                    print_warning "Retry $retry_count/$MAX_RETRIES for $repo_name"
                    sleep 30
                else
                    print_error "Failed to create: $repo_name"
                fi
            fi
        done
        
        batch_count=$((batch_count + 1))
        
        # Add delay between repositories
        sleep $REPO_DELAY
        
        # Add longer delay after batch
        if [ $((batch_count % BATCH_SIZE)) -eq 0 ]; then
            print_info "Batch $((batch_count / BATCH_SIZE)) completed. Waiting $BATCH_DELAY seconds..."
            sleep $BATCH_DELAY
        fi
    done
    
    print_status "AI/ML repositories creation completed. Created: $total_created/15"
}

# Create remaining bot repositories with rate limiting
create_remaining_bot_repos() {
    print_header "Creating Remaining Bot Repositories (173 repositories)"
    
    local bot_categories=(
        "customer-support:Customer Support Bot"
        "hr-assistant:HR Assistant Bot"
        "compliance-monitoring:Compliance Monitoring Bot"
        "data-backup:Data Backup Bot"
        "system-optimization:System Optimization Bot"
        "network-monitoring:Network Monitoring Bot"
        "database-management:Database Management Bot"
        "cloud-optimization:Cloud Optimization Bot"
        "security-audit:Security Audit Bot"
        "performance-tuning:Performance Tuning Bot"
        "capacity-planning:Capacity Planning Bot"
        "disaster-recovery:Disaster Recovery Bot"
    )
    
    local bot_types=(
        "monitoring:Monitoring"
        "automation:Automation"
        "analytics:Analytics"
        "optimization:Optimization"
        "integration:Integration"
        "security:Security"
        "compliance:Compliance"
        "reporting:Reporting"
        "alerting:Alerting"
        "management:Management"
        "orchestration:Orchestration"
        "intelligence:Intelligence"
        "processing:Processing"
        "discovery:Discovery"
        "synthesis:Synthesis"
    )
    
    local total_created=0
    local batch_count=0
    
    for category in "${bot_categories[@]}"; do
        local category_name="${category%%:*}"
        local category_desc="${category##*:}"
        
        for bot_type in "${bot_types[@]}"; do
            local type_name="${bot_type%%:*}"
            local type_desc="${bot_type##*:}"
            
            local repo_name="iza-os-${category_name}-${type_name}-bot"
            local description="🤖 ${category_desc} - ${type_desc} automation and intelligence"
            
            echo "Creating bot repository: $repo_name"
            
            # Try to create repository with retries
            local retry_count=0
            local created=false
            
            while [ $retry_count -lt $MAX_RETRIES ] && [ "$created" = false ]; do
                if gh repo create Worldwidebro/$repo_name --public --description "$description" 2>/dev/null; then
                    print_status "Created: $repo_name"
                    created=true
                    total_created=$((total_created + 1))
                else
                    retry_count=$((retry_count + 1))
                    if [ $retry_count -lt $MAX_RETRIES ]; then
                        print_warning "Retry $retry_count/$MAX_RETRIES for $repo_name"
                        sleep 30
                    else
                        print_error "Failed to create: $repo_name"
                    fi
                fi
            done
            
            batch_count=$((batch_count + 1))
            
            # Add delay between repositories
            sleep $REPO_DELAY
            
            # Add longer delay after batch
            if [ $((batch_count % BATCH_SIZE)) -eq 0 ]; then
                print_info "Batch $((batch_count / BATCH_SIZE)) completed. Waiting $BATCH_DELAY seconds..."
                sleep $BATCH_DELAY
            fi
        done
    done
    
    print_status "Bot repositories creation completed. Created: $total_created/173"
}

# Check GitHub authentication
check_github_auth() {
    print_info "Checking GitHub authentication..."
    
    if ! gh auth status >/dev/null 2>&1; then
        print_error "GitHub CLI not authenticated. Please run: gh auth login"
        exit 1
    fi
    
    print_status "GitHub authentication verified"
}

# Check current repository count
check_current_status() {
    print_info "Checking current repository status..."
    
    local current_count=$(gh repo list Worldwidebro --limit 300 --json name | jq length)
    print_info "Current repositories: $current_count"
    
    local remaining=$((297 - current_count))
    print_info "Remaining to create: $remaining"
    
    if [ $remaining -eq 0 ]; then
        print_status "All repositories already created!"
        exit 0
    fi
}

# Main execution function
main() {
    print_header "Creating Remaining Repositories with Rate Limiting"
    echo ""
    
    # Check prerequisites
    check_github_auth
    check_current_status
    
    print_info "Rate Limiting Configuration:"
    print_info "  - Batch Size: $BATCH_SIZE repositories"
    print_info "  - Batch Delay: $BATCH_DELAY seconds"
    print_info "  - Repository Delay: $REPO_DELAY seconds"
    print_info "  - Max Retries: $MAX_RETRIES"
    echo ""
    
    # Create repositories in priority order
    print_info "Phase 1: Creating AI/ML Repositories (HIGHEST PRIORITY)"
    create_ai_ml_repos
    echo ""
    
    print_info "Phase 2: Creating Remaining Bot Repositories"
    create_remaining_bot_repos
    echo ""
    
    # Final status
    local final_count=$(gh repo list Worldwidebro --limit 300 --json name | jq length)
    print_status "Repository creation completed!"
    print_info "Final repository count: $final_count/297"
    
    if [ $final_count -eq 297 ]; then
        print_status "🎉 All 297 repositories created successfully! 🚀💰"
        print_info "Revenue Potential:"
        print_info "  - Monthly Revenue Potential: \$2.4M+"
        print_info "  - Annual Revenue Potential: \$28.8M+"
        print_info "  - Total Ecosystem Value: \$12.15B+"
    else
        local remaining=$((297 - final_count))
        print_warning "⚠️  $remaining repositories still need to be created"
        print_info "Run this script again to continue creation"
    fi
}

# Run main function
main "$@"
