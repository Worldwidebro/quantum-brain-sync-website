
import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta
import json

# Page config
st.set_page_config(
    page_title="IZA OS Venture Analytics",
    page_icon="🚀",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
st.markdown("""
<style>
    .main-header {
        font-size: 3rem;
        color: #667eea;
        text-align: center;
        margin-bottom: 2rem;
    }
    .metric-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 1rem;
        border-radius: 10px;
        color: white;
        text-align: center;
    }
    .venture-card {
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 1rem;
        margin: 0.5rem 0;
        background: #f8f9fa;
    }
</style>
""", unsafe_allow_html=True)

# Header
st.markdown('<h1 class="main-header">🚀 IZA OS Venture Studio Analytics</h1>', unsafe_allow_html=True)

# Sidebar
st.sidebar.title("📊 Navigation")
page = st.sidebar.selectbox("Choose Dashboard", [
    "Venture Overview",
    "Financial Analytics", 
    "AI Agent Performance",
    "Platform Integrations",
    "Market Analysis"
])

# Sample data
ventures_data = {
    "FinTech SaaS": {"revenue": 2500000, "growth": 45, "status": "Growth", "team_size": 12},
    "AI Marketing Suite": {"revenue": 1800000, "growth": 78, "status": "Development", "team_size": 8},
    "E-commerce Platform": {"revenue": 3200000, "growth": 32, "status": "Mature", "team_size": 15},
    "Blockchain DeFi": {"revenue": 950000, "growth": 120, "status": "Early", "team_size": 5}
}

if page == "Venture Overview":
    st.header("📈 Venture Portfolio Overview")
    
    # Metrics
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric("Total Ventures", len(ventures_data))
    
    with col2:
        total_revenue = sum(v["revenue"] for v in ventures_data.values())
        st.metric("Total Revenue", f"${total_revenue:,}")
    
    with col3:
        avg_growth = sum(v["growth"] for v in ventures_data.values()) / len(ventures_data)
        st.metric("Avg Growth Rate", f"{avg_growth:.1f}%")
    
    with col4:
        total_team = sum(v["team_size"] for v in ventures_data.values())
        st.metric("Total Team Size", total_team)
    
    # Revenue chart
    st.subheader("💰 Revenue by Venture")
    revenue_df = pd.DataFrame([
        {"Venture": name, "Revenue": data["revenue"]}
        for name, data in ventures_data.items()
    ])
    
    fig = px.bar(revenue_df, x="Venture", y="Revenue", 
                 title="Revenue Distribution",
                 color="Revenue",
                 color_continuous_scale="viridis")
    st.plotly_chart(fig, use_container_width=True)
    
    # Growth chart
    st.subheader("📊 Growth Rate Analysis")
    growth_df = pd.DataFrame([
        {"Venture": name, "Growth": data["growth"], "Status": data["status"]}
        for name, data in ventures_data.items()
    ])
    
    fig = px.scatter(growth_df, x="Growth", y="Revenue", 
                     color="Status", size="Revenue",
                     hover_name="Venture",
                     title="Growth vs Revenue Analysis")
    st.plotly_chart(fig, use_container_width=True)

elif page == "Financial Analytics":
    st.header("💹 Financial Analytics")
    
    # Revenue trends
    st.subheader("📈 Revenue Trends (Last 12 Months)")
    
    # Generate sample time series data
    dates = pd.date_range(start="2023-01-01", end="2024-01-01", freq="M")
    revenue_trends = []
    
    for venture in ventures_data.keys():
        base_revenue = ventures_data[venture]["revenue"]
        trend_data = []
        for i, date in enumerate(dates):
            growth_factor = 1 + (ventures_data[venture]["growth"] / 100) * (i / 12)
            monthly_revenue = base_revenue * growth_factor / 12
            trend_data.append({
                "Date": date,
                "Revenue": monthly_revenue,
                "Venture": venture
            })
        revenue_trends.extend(trend_data)
    
    trends_df = pd.DataFrame(revenue_trends)
    fig = px.line(trends_df, x="Date", y="Revenue", color="Venture",
                  title="Monthly Revenue Trends by Venture")
    st.plotly_chart(fig, use_container_width=True)
    
    # Financial metrics
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("💵 Revenue Breakdown")
        revenue_pie = px.pie(revenue_df, values="Revenue", names="Venture",
                           title="Revenue Distribution")
        st.plotly_chart(revenue_pie, use_container_width=True)
    
    with col2:
        st.subheader("📊 Growth Rate Distribution")
        growth_pie = px.pie(growth_df, values="Growth", names="Venture",
                           title="Growth Rate Distribution")
        st.plotly_chart(growth_pie, use_container_width=True)

elif page == "AI Agent Performance":
    st.header("🤖 AI Agent Performance")
    
    # Agent metrics
    agents_data = {
        "Code Generator": {"tasks_completed": 1250, "success_rate": 94, "avg_time": 2.3},
        "Data Analyst": {"tasks_completed": 890, "success_rate": 97, "avg_time": 1.8},
        "Security Auditor": {"tasks_completed": 450, "success_rate": 99, "avg_time": 4.2},
        "Marketing Bot": {"tasks_completed": 2100, "success_rate": 91, "avg_time": 1.5},
        "HR Assistant": {"tasks_completed": 675, "success_rate": 96, "avg_time": 3.1},
        "Financial Advisor": {"tasks_completed": 320, "success_rate": 98, "avg_time": 2.8}
    }
    
    # Agent performance chart
    agents_df = pd.DataFrame([
        {"Agent": name, "Tasks": data["tasks_completed"], 
         "Success Rate": data["success_rate"], "Avg Time": data["avg_time"]}
        for name, data in agents_data.items()
    ])
    
    fig = px.scatter(agents_df, x="Tasks", y="Success Rate",
                     size="Avg Time", color="Agent",
                     title="AI Agent Performance Matrix",
                     labels={"Tasks": "Tasks Completed", "Success Rate": "Success Rate (%)"})
    st.plotly_chart(fig, use_container_width=True)
    
    # Agent details
    st.subheader("📋 Agent Details")
    st.dataframe(agents_df, use_container_width=True)

elif page == "Platform Integrations":
    st.header("🔗 Platform Integration Status")
    
    integrations = {
        "Notion MCP": {"status": "Connected", "last_sync": "2024-01-15 10:30"},
        "Ollama AI": {"status": "Active", "models": 5},
        "Prisma DB": {"status": "Connected", "tables": 12},
        "Linear Tasks": {"status": "Synced", "active_tasks": 45},
        "Sentry Monitoring": {"status": "Monitoring", "alerts": 0},
        "Vercel Deployments": {"status": "Deployed", "sites": 8},
        "Streamlit Share": {"status": "Live", "apps": 3}
    }
    
    for platform, data in integrations.items():
        with st.expander(f"🔌 {platform}"):
            st.json(data)

elif page == "Market Analysis":
    st.header("📊 Market Analysis")
    
    # Market trends
    st.subheader("🌍 Market Trends")
    
    # Sample market data
    market_data = {
        "SaaS": {"market_size": 150000000000, "growth": 18, "competition": "High"},
        "FinTech": {"market_size": 310000000000, "growth": 25, "competition": "Medium"},
        "AI/ML": {"market_size": 93000000000, "growth": 42, "competition": "Medium"},
        "E-commerce": {"market_size": 5600000000000, "growth": 14, "competition": "High"},
        "Blockchain": {"market_size": 45000000000, "growth": 67, "competition": "Low"}
    }
    
    market_df = pd.DataFrame([
        {"Market": name, "Size": data["market_size"], 
         "Growth": data["growth"], "Competition": data["competition"]}
        for name, data in market_data.items()
    ])
    
    fig = px.bar(market_df, x="Market", y="Size", 
                 color="Growth", title="Market Size by Sector")
    st.plotly_chart(fig, use_container_width=True)

# Footer
st.markdown("---")
st.markdown("**IZA OS Venture Studio** - Autonomous Venture Creation Platform")
st.markdown(f"Last updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
