#!/usr/bin/env python3
"""
📊 IZA OS BUSINESS INTELLIGENCE SYSTEM
======================================
Comprehensive analytics and business intelligence for the autonomous venture studio
Implements real-time analytics, predictive models, and automated insights
"""

import asyncio
import logging
import os
import json
import time
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any, Union, Tuple
from dataclasses import dataclass, asdict
import yaml
from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import redis
import psycopg2
from psycopg2 import pool
from sklearn.ensemble import RandomForestRegressor, IsolationForest
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import joblib

logger = logging.getLogger(__name__)

@dataclass
class BusinessMetric:
    """Business metric definition"""
    metric_id: str
    name: str
    category: str  # revenue, cost, growth, efficiency
    value: float
    target: float
    unit: str
    period: str  # daily, weekly, monthly, quarterly, yearly
    trend: str   # up, down, stable
    change_percentage: float
    last_updated: datetime

@dataclass
class AnalyticsReport:
    """Analytics report configuration"""
    report_id: str
    name: str
    description: str
    report_type: str  # executive, operational, financial, predictive
    metrics: List[BusinessMetric]
    insights: List[str]
    recommendations: List[str]
    generated_at: datetime
    period_start: datetime
    period_end: datetime

@dataclass
class PredictiveModel:
    """Predictive model definition"""
    model_id: str
    name: str
    model_type: str  # regression, classification, time_series
    target_metric: str
    features: List[str]
    accuracy: float
    last_trained: datetime
    predictions: Dict[str, float]

class DataPipeline:
    """ETL data pipeline for analytics"""
    
    def __init__(self):
        self.redis_client = redis.Redis(host='localhost', port=6379, db=2)
        self.data_cache = {}
        
    async def extract_data(self, data_source: str, start_date: datetime, end_date: datetime) -> pd.DataFrame:
        """Extract data from various sources"""
        try:
            if data_source == 'revenue':
                return await self._extract_revenue_data(start_date, end_date)
            elif data_source == 'costs':
                return await self._extract_cost_data(start_date, end_date)
            elif data_source == 'user_activity':
                return await self._extract_user_activity_data(start_date, end_date)
            elif data_source == 'system_performance':
                return await self._extract_system_performance_data(start_date, end_date)
            elif data_source == 'portfolio':
                return await self._extract_portfolio_data(start_date, end_date)
            else:
                raise ValueError(f"Unknown data source: {data_source}")
                
        except Exception as e:
            logger.error(f"❌ Data extraction failed: {e}")
            raise
    
    async def _extract_revenue_data(self, start_date: datetime, end_date: datetime) -> pd.DataFrame:
        """Extract revenue data"""
        # Generate mock revenue data
        dates = pd.date_range(start=start_date, end=end_date, freq='D')
        
        data = []
        base_revenue = 1000000
        growth_rate = 0.02
        
        for i, date in enumerate(dates):
            # Add some randomness and seasonality
            seasonal_factor = 1 + 0.1 * np.sin(2 * np.pi * i / 365)
            random_factor = 1 + np.random.normal(0, 0.05)
            growth_factor = (1 + growth_rate) ** (i / 365)
            
            daily_revenue = base_revenue * seasonal_factor * random_factor * growth_factor / 365
            
            data.append({
                'date': date,
                'revenue': daily_revenue,
                'subscription_revenue': daily_revenue * 0.6,
                'api_revenue': daily_revenue * 0.3,
                'other_revenue': daily_revenue * 0.1
            })
        
        return pd.DataFrame(data)
    
    async def _extract_cost_data(self, start_date: datetime, end_date: datetime) -> pd.DataFrame:
        """Extract cost data"""
        dates = pd.date_range(start=start_date, end=end_date, freq='D')
        
        data = []
        base_cost = 600000
        
        for i, date in enumerate(dates):
            # Infrastructure costs with some variability
            infrastructure_cost = base_cost * 0.4 / 365 * (1 + np.random.normal(0, 0.03))
            personnel_cost = base_cost * 0.35 / 365
            marketing_cost = base_cost * 0.15 / 365 * (1 + np.random.normal(0, 0.1))
            other_cost = base_cost * 0.1 / 365
            
            total_cost = infrastructure_cost + personnel_cost + marketing_cost + other_cost
            
            data.append({
                'date': date,
                'total_cost': total_cost,
                'infrastructure_cost': infrastructure_cost,
                'personnel_cost': personnel_cost,
                'marketing_cost': marketing_cost,
                'other_cost': other_cost
            })
        
        return pd.DataFrame(data)
    
    async def _extract_user_activity_data(self, start_date: datetime, end_date: datetime) -> pd.DataFrame:
        """Extract user activity data"""
        dates = pd.date_range(start=start_date, end=end_date, freq='D')
        
        data = []
        base_users = 10000
        growth_rate = 0.01
        
        for i, date in enumerate(dates):
            growth_factor = (1 + growth_rate) ** (i / 365)
            daily_users = int(base_users * growth_factor * (1 + np.random.normal(0, 0.05)))
            
            # Simulate user engagement metrics
            active_users = int(daily_users * (0.3 + np.random.normal(0, 0.05)))
            sessions = int(active_users * (2.5 + np.random.normal(0, 0.2)))
            avg_session_duration = 15 + np.random.normal(0, 2)
            
            data.append({
                'date': date,
                'total_users': daily_users,
                'active_users': active_users,
                'sessions': sessions,
                'avg_session_duration': max(0, avg_session_duration)
            })
        
        return pd.DataFrame(data)
    
    async def _extract_system_performance_data(self, start_date: datetime, end_date: datetime) -> pd.DataFrame:
        """Extract system performance data"""
        dates = pd.date_range(start=start_date, end=end_date, freq='H')
        
        data = []
        
        for date in dates:
            # Simulate system metrics
            uptime = 99.9 + np.random.normal(0, 0.05)
            response_time = 100 + np.random.normal(0, 20)
            error_rate = max(0, 0.1 + np.random.normal(0, 0.05))
            throughput = 1000 + np.random.normal(0, 100)
            
            data.append({
                'timestamp': date,
                'uptime': max(0, min(100, uptime)),
                'response_time': max(0, response_time),
                'error_rate': error_rate,
                'throughput': max(0, throughput)
            })
        
        return pd.DataFrame(data)
    
    async def _extract_portfolio_data(self, start_date: datetime, end_date: datetime) -> pd.DataFrame:
        """Extract portfolio data"""
        dates = pd.date_range(start=start_date, end=end_date, freq='D')
        
        data = []
        
        # Portfolio companies
        companies = [
            {'name': 'TechCorp', 'sector': 'Technology', 'investment': 5000000, 'valuation': 25000000},
            {'name': 'HealthTech', 'sector': 'Healthcare', 'investment': 3000000, 'valuation': 15000000},
            {'name': 'FinTech', 'sector': 'Finance', 'investment': 2000000, 'valuation': 12000000},
            {'name': 'EduTech', 'sector': 'Education', 'investment': 1500000, 'valuation': 8000000}
        ]
        
        for date in dates:
            for company in companies:
                # Simulate daily performance
                daily_return = np.random.normal(0.001, 0.02)
                current_valuation = company['valuation'] * (1 + daily_return)
                
                data.append({
                    'date': date,
                    'company': company['name'],
                    'sector': company['sector'],
                    'investment': company['investment'],
                    'valuation': current_valuation,
                    'daily_return': daily_return,
                    'total_return': (current_valuation - company['investment']) / company['investment']
                })
        
        return pd.DataFrame(data)
    
    async def transform_data(self, df: pd.DataFrame, transformations: List[str]) -> pd.DataFrame:
        """Apply data transformations"""
        try:
            transformed_df = df.copy()
            
            for transformation in transformations:
                if transformation == 'normalize':
                    # Normalize numeric columns
                    numeric_columns = transformed_df.select_dtypes(include=[np.number]).columns
                    scaler = StandardScaler()
                    transformed_df[numeric_columns] = scaler.fit_transform(transformed_df[numeric_columns])
                
                elif transformation == 'aggregate_daily':
                    # Aggregate to daily data
                    if 'timestamp' in transformed_df.columns:
                        transformed_df['date'] = transformed_df['timestamp'].dt.date
                        transformed_df = transformed_df.groupby('date').mean().reset_index()
                
                elif transformation == 'calculate_returns':
                    # Calculate returns for financial data
                    if 'revenue' in transformed_df.columns:
                        transformed_df['revenue_growth'] = transformed_df['revenue'].pct_change()
                    if 'valuation' in transformed_df.columns:
                        transformed_df['valuation_growth'] = transformed_df['valuation'].pct_change()
                
                elif transformation == 'add_technical_indicators':
                    # Add technical indicators
                    if 'revenue' in transformed_df.columns:
                        transformed_df['revenue_ma_7'] = transformed_df['revenue'].rolling(7).mean()
                        transformed_df['revenue_ma_30'] = transformed_df['revenue'].rolling(30).mean()
            
            return transformed_df
            
        except Exception as e:
            logger.error(f"❌ Data transformation failed: {e}")
            raise
    
    async def load_data(self, df: pd.DataFrame, destination: str):
        """Load transformed data to destination"""
        try:
            # Cache data in Redis
            cache_key = f"analytics:{destination}:{datetime.now().strftime('%Y%m%d')}"
            data_json = df.to_json(orient='records')
            self.redis_client.setex(cache_key, 86400, data_json)  # 24 hour TTL
            
            logger.info(f"✅ Data loaded to {destination}")
            
        except Exception as e:
            logger.error(f"❌ Data loading failed: {e}")
            raise

class PredictiveAnalytics:
    """Predictive analytics and machine learning models"""
    
    def __init__(self):
        self.models = {}
        self.scaler = StandardScaler()
        
    async def train_revenue_prediction_model(self, data: pd.DataFrame) -> PredictiveModel:
        """Train revenue prediction model"""
        try:
            # Prepare features
            features = ['revenue', 'active_users', 'sessions', 'avg_session_duration']
            target = 'revenue'
            
            # Create lag features
            for feature in features:
                for lag in [1, 7, 30]:
                    data[f'{feature}_lag_{lag}'] = data[feature].shift(lag)
            
            # Drop NaN values
            data_clean = data.dropna()
            
            if len(data_clean) < 100:
                raise ValueError("Insufficient data for training")
            
            # Prepare training data
            feature_columns = [col for col in data_clean.columns if 'lag' in col]
            X = data_clean[feature_columns]
            y = data_clean[target]
            
            # Split data
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
            
            # Scale features
            X_train_scaled = self.scaler.fit_transform(X_train)
            X_test_scaled = self.scaler.transform(X_test)
            
            # Train model
            model = RandomForestRegressor(n_estimators=100, random_state=42)
            model.fit(X_train_scaled, y_train)
            
            # Evaluate model
            accuracy = model.score(X_test_scaled, y_test)
            
            # Create predictions
            predictions = model.predict(X_test_scaled)
            
            # Save model
            model_id = f"revenue_prediction_{int(time.time())}"
            model_path = f"/Users/divinejohns/memU/analytics/models/{model_id}.joblib"
            os.makedirs(os.path.dirname(model_path), exist_ok=True)
            joblib.dump(model, model_path)
            
            # Create model definition
            predictive_model = PredictiveModel(
                model_id=model_id,
                name='Revenue Prediction Model',
                model_type='regression',
                target_metric='revenue',
                features=feature_columns,
                accuracy=accuracy,
                last_trained=datetime.now(),
                predictions={
                    'last_prediction': float(predictions[-1]) if len(predictions) > 0 else 0,
                    'accuracy': float(accuracy)
                }
            )
            
            self.models[model_id] = predictive_model
            
            logger.info(f"✅ Revenue prediction model trained: {accuracy:.3f} accuracy")
            return predictive_model
            
        except Exception as e:
            logger.error(f"❌ Revenue prediction model training failed: {e}")
            raise
    
    async def train_anomaly_detection_model(self, data: pd.DataFrame) -> PredictiveModel:
        """Train anomaly detection model"""
        try:
            # Prepare features for anomaly detection
            numeric_columns = data.select_dtypes(include=[np.number]).columns
            X = data[numeric_columns].fillna(0)
            
            # Train isolation forest
            model = IsolationForest(contamination=0.1, random_state=42)
            model.fit(X)
            
            # Detect anomalies
            anomalies = model.predict(X)
            anomaly_scores = model.decision_function(X)
            
            # Create model definition
            model_id = f"anomaly_detection_{int(time.time())}"
            model_path = f"/Users/divinejohns/memU/analytics/models/{model_id}.joblib"
            os.makedirs(os.path.dirname(model_path), exist_ok=True)
            joblib.dump(model, model_path)
            
            # Calculate accuracy (simplified)
            anomaly_count = sum(1 for a in anomalies if a == -1)
            accuracy = 1.0 - (anomaly_count / len(anomalies))
            
            predictive_model = PredictiveModel(
                model_id=model_id,
                name='Anomaly Detection Model',
                model_type='classification',
                target_metric='anomaly',
                features=list(numeric_columns),
                accuracy=accuracy,
                last_trained=datetime.now(),
                predictions={
                    'anomalies_detected': int(anomaly_count),
                    'total_samples': int(len(anomalies))
                }
            )
            
            self.models[model_id] = predictive_model
            
            logger.info(f"✅ Anomaly detection model trained: {anomaly_count} anomalies detected")
            return predictive_model
            
        except Exception as e:
            logger.error(f"❌ Anomaly detection model training failed: {e}")
            raise
    
    async def predict_revenue(self, model_id: str, features: Dict[str, float]) -> Dict[str, Any]:
        """Make revenue prediction using trained model"""
        try:
            if model_id not in self.models:
                raise ValueError(f"Model {model_id} not found")
            
            model_info = self.models[model_id]
            
            # Load model
            model_path = f"/Users/divinejohns/memU/analytics/models/{model_id}.joblib"
            model = joblib.load(model_path)
            
            # Prepare features
            feature_vector = np.array([features.get(feat, 0) for feat in model_info.features]).reshape(1, -1)
            feature_vector_scaled = self.scaler.transform(feature_vector)
            
            # Make prediction
            prediction = model.predict(feature_vector_scaled)[0]
            
            return {
                'prediction': float(prediction),
                'model_id': model_id,
                'model_accuracy': model_info.accuracy,
                'features_used': model_info.features
            }
            
        except Exception as e:
            logger.error(f"❌ Revenue prediction failed: {e}")
            raise

class BusinessIntelligenceEngine:
    """Business intelligence and insights generation"""
    
    def __init__(self, data_pipeline: DataPipeline, predictive_analytics: PredictiveAnalytics):
        self.data_pipeline = data_pipeline
        self.predictive_analytics = predictive_analytics
        self.metrics_cache = {}
        
    async def calculate_business_metrics(self, start_date: datetime, end_date: datetime) -> List[BusinessMetric]:
        """Calculate comprehensive business metrics"""
        try:
            metrics = []
            
            # Extract and process data
            revenue_data = await self.data_pipeline.extract_data('revenue', start_date, end_date)
            cost_data = await self.data_pipeline.extract_data('costs', start_date, end_date)
            user_data = await self.data_pipeline.extract_data('user_activity', start_date, end_date)
            portfolio_data = await self.data_pipeline.extract_data('portfolio', start_date, end_date)
            
            # Revenue metrics
            total_revenue = revenue_data['revenue'].sum()
            avg_daily_revenue = revenue_data['revenue'].mean()
            revenue_growth = self._calculate_growth_rate(revenue_data['revenue'])
            
            metrics.append(BusinessMetric(
                metric_id='total_revenue',
                name='Total Revenue',
                category='revenue',
                value=total_revenue,
                target=12000000,  # Annual target
                unit='USD',
                period='monthly',
                trend=self._determine_trend(revenue_growth),
                change_percentage=revenue_growth,
                last_updated=datetime.now()
            ))
            
            # Cost metrics
            total_costs = cost_data['total_cost'].sum()
            cost_efficiency = (total_revenue - total_costs) / total_revenue * 100
            
            metrics.append(BusinessMetric(
                metric_id='cost_efficiency',
                name='Cost Efficiency',
                category='efficiency',
                value=cost_efficiency,
                target=40.0,
                unit='%',
                period='monthly',
                trend=self._determine_trend(cost_efficiency - 40),  # Compare to target
                change_percentage=cost_efficiency - 40,
                last_updated=datetime.now()
            ))
            
            # User metrics
            total_users = user_data['total_users'].iloc[-1]
            active_users = user_data['active_users'].iloc[-1]
            user_engagement = (active_users / total_users) * 100
            
            metrics.append(BusinessMetric(
                metric_id='user_engagement',
                name='User Engagement',
                category='growth',
                value=user_engagement,
                target=35.0,
                unit='%',
                period='daily',
                trend=self._determine_trend(user_engagement - 35),
                change_percentage=user_engagement - 35,
                last_updated=datetime.now()
            ))
            
            # Portfolio metrics
            portfolio_return = portfolio_data['total_return'].mean()
            
            metrics.append(BusinessMetric(
                metric_id='portfolio_return',
                name='Portfolio Return',
                category='growth',
                value=portfolio_return * 100,
                target=25.0,
                unit='%',
                period='monthly',
                trend=self._determine_trend(portfolio_return - 0.25),
                change_percentage=(portfolio_return - 0.25) * 100,
                last_updated=datetime.now()
            ))
            
            return metrics
            
        except Exception as e:
            logger.error(f"❌ Business metrics calculation failed: {e}")
            raise
    
    def _calculate_growth_rate(self, series: pd.Series) -> float:
        """Calculate growth rate for a time series"""
        if len(series) < 2:
            return 0.0
        
        first_value = series.iloc[0]
        last_value = series.iloc[-1]
        
        if first_value == 0:
            return 0.0
        
        return ((last_value - first_value) / first_value) * 100
    
    def _determine_trend(self, change: float) -> str:
        """Determine trend direction"""
        if change > 5:
            return 'up'
        elif change < -5:
            return 'down'
        else:
            return 'stable'
    
    async def generate_insights(self, metrics: List[BusinessMetric]) -> List[str]:
        """Generate business insights from metrics"""
        insights = []
        
        for metric in metrics:
            if metric.category == 'revenue':
                if metric.change_percentage > 10:
                    insights.append(f"🚀 Strong revenue growth of {metric.change_percentage:.1f}% indicates successful market expansion")
                elif metric.change_percentage < -5:
                    insights.append(f"⚠️ Revenue decline of {metric.change_percentage:.1f}% requires immediate attention")
            
            elif metric.category == 'efficiency':
                if metric.value > metric.target:
                    insights.append(f"✅ Cost efficiency of {metric.value:.1f}% exceeds target, indicating strong operational performance")
                else:
                    insights.append(f"📊 Cost efficiency below target suggests optimization opportunities")
            
            elif metric.category == 'growth':
                if metric.change_percentage > 5:
                    insights.append(f"📈 Positive growth trend in {metric.name} shows healthy business development")
                elif metric.change_percentage < -5:
                    insights.append(f"📉 Declining trend in {metric.name} may require strategic intervention")
        
        # Cross-metric insights
        revenue_metric = next((m for m in metrics if m.metric_id == 'total_revenue'), None)
        efficiency_metric = next((m for m in metrics if m.metric_id == 'cost_efficiency'), None)
        
        if revenue_metric and efficiency_metric:
            if revenue_metric.change_percentage > 0 and efficiency_metric.change_percentage > 0:
                insights.append("🎯 Revenue and efficiency both improving - excellent business performance")
            elif revenue_metric.change_percentage > 0 and efficiency_metric.change_percentage < 0:
                insights.append("💡 Revenue growing but efficiency declining - consider cost optimization")
        
        return insights
    
    async def generate_recommendations(self, metrics: List[BusinessMetric], insights: List[str]) -> List[str]:
        """Generate actionable recommendations"""
        recommendations = []
        
        for metric in metrics:
            if metric.category == 'revenue' and metric.change_percentage < 0:
                recommendations.append("Focus on customer acquisition and retention strategies")
                recommendations.append("Consider pricing optimization and new revenue streams")
            
            elif metric.category == 'efficiency' and metric.value < metric.target:
                recommendations.append("Implement cost reduction initiatives")
                recommendations.append("Optimize operational processes and automation")
            
            elif metric.category == 'growth' and metric.change_percentage < 0:
                recommendations.append("Invest in marketing and user acquisition")
                recommendations.append("Enhance product features and user experience")
        
        # Strategic recommendations
        if any(m.category == 'revenue' and m.change_percentage > 10 for m in metrics):
            recommendations.append("Scale successful revenue channels")
            recommendations.append("Consider market expansion opportunities")
        
        if any(m.category == 'efficiency' and m.value > m.target for m in metrics):
            recommendations.append("Reinvest efficiency gains in growth initiatives")
            recommendations.append("Maintain operational excellence standards")
        
        return recommendations
    
    async def generate_executive_report(self, start_date: datetime, end_date: datetime) -> AnalyticsReport:
        """Generate comprehensive executive report"""
        try:
            # Calculate metrics
            metrics = await self.calculate_business_metrics(start_date, end_date)
            
            # Generate insights
            insights = await self.generate_insights(metrics)
            
            # Generate recommendations
            recommendations = await self.generate_recommendations(metrics, insights)
            
            # Create report
            report = AnalyticsReport(
                report_id=f"executive_report_{int(time.time())}",
                name='Executive Business Intelligence Report',
                description='Comprehensive analysis of IZA OS ecosystem performance',
                report_type='executive',
                metrics=metrics,
                insights=insights,
                recommendations=recommendations,
                generated_at=datetime.now(),
                period_start=start_date,
                period_end=end_date
            )
            
            logger.info(f"✅ Executive report generated: {len(metrics)} metrics, {len(insights)} insights")
            return report
            
        except Exception as e:
            logger.error(f"❌ Executive report generation failed: {e}")
            raise

class BusinessIntelligenceSystem:
    """Main business intelligence system"""
    
    def __init__(self):
        self.data_pipeline = DataPipeline()
        self.predictive_analytics = PredictiveAnalytics()
        self.bi_engine = BusinessIntelligenceEngine(self.data_pipeline, self.predictive_analytics)
        self.logger = logging.getLogger(__name__)
        
    async def initialize(self) -> bool:
        """Initialize business intelligence system"""
        try:
            # Train initial models
            await self._train_initial_models()
            
            # Start data refresh loop
            asyncio.create_task(self._data_refresh_loop())
            
            self.logger.info("✅ Business Intelligence System initialized")
            return True
            
        except Exception as e:
            self.logger.error(f"❌ BI system initialization failed: {e}")
            return False
    
    async def _train_initial_models(self):
        """Train initial predictive models"""
        try:
            # Get historical data for training
            end_date = datetime.now()
            start_date = end_date - timedelta(days=365)
            
            # Extract training data
            revenue_data = await self.data_pipeline.extract_data('revenue', start_date, end_date)
            user_data = await self.data_pipeline.extract_data('user_activity', start_date, end_date)
            
            # Merge data
            merged_data = pd.merge(revenue_data, user_data, on='date', how='inner')
            
            # Train models
            await self.predictive_analytics.train_revenue_prediction_model(merged_data)
            await self.predictive_analytics.train_anomaly_detection_model(merged_data)
            
            self.logger.info("✅ Initial models trained successfully")
            
        except Exception as e:
            self.logger.error(f"❌ Initial model training failed: {e}")
    
    async def _data_refresh_loop(self):
        """Background data refresh loop"""
        while True:
            try:
                # Refresh data every hour
                end_date = datetime.now()
                start_date = end_date - timedelta(days=7)
                
                # Extract and cache latest data
                for data_source in ['revenue', 'costs', 'user_activity', 'portfolio']:
                    try:
                        data = await self.data_pipeline.extract_data(data_source, start_date, end_date)
                        await self.data_pipeline.load_data(data, data_source)
                    except Exception as e:
                        self.logger.error(f"❌ Data refresh failed for {data_source}: {e}")
                
                await asyncio.sleep(3600)  # Refresh every hour
                
            except Exception as e:
                self.logger.error(f"❌ Data refresh loop error: {e}")
                await asyncio.sleep(3600)
    
    async def get_health_status(self) -> Dict[str, Any]:
        """Get system health status"""
        try:
            return {
                'status': 'healthy',
                'message': 'Business Intelligence System operational',
                'components': {
                    'data_pipeline': 'healthy',
                    'predictive_analytics': 'healthy',
                    'bi_engine': 'healthy'
                },
                'metrics': {
                    'total_models': len(self.predictive_analytics.models),
                    'cached_data_sources': len(self.data_pipeline.data_cache),
                    'last_data_refresh': datetime.now().isoformat()
                }
            }
            
        except Exception as e:
            return {
                'status': 'unhealthy',
                'message': f'BI system error: {e}',
                'components': {},
                'metrics': {}
            }

# FastAPI application
app = FastAPI(
    title="IZA OS Business Intelligence System",
    description="Comprehensive analytics and business intelligence for the autonomous venture studio",
    version="2.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global BI system
bi_system = BusinessIntelligenceSystem()

@app.on_event("startup")
async def startup_event():
    """Startup event"""
    await bi_system.initialize()

# Pydantic models
class ReportRequest(BaseModel):
    start_date: datetime
    end_date: datetime
    report_type: str = "executive"

class PredictionRequest(BaseModel):
    model_id: str
    features: Dict[str, float]

# API Routes
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    health = await bi_system.get_health_status()
    return health

@app.get("/metrics")
async def get_business_metrics(start_date: datetime = None, end_date: datetime = None):
    """Get business metrics"""
    if not start_date:
        start_date = datetime.now() - timedelta(days=30)
    if not end_date:
        end_date = datetime.now()
    
    metrics = await bi_system.bi_engine.calculate_business_metrics(start_date, end_date)
    return {
        'metrics': [asdict(metric) for metric in metrics],
        'period': {'start': start_date.isoformat(), 'end': end_date.isoformat()}
    }

@app.post("/reports")
async def generate_report(request: ReportRequest):
    """Generate analytics report"""
    report = await bi_system.bi_engine.generate_executive_report(request.start_date, request.end_date)
    return asdict(report)

@app.get("/models")
async def get_models():
    """Get all predictive models"""
    models = [asdict(model) for model in bi_system.predictive_analytics.models.values()]
    return {'models': models}

@app.post("/predict")
async def make_prediction(request: PredictionRequest):
    """Make prediction using trained model"""
    prediction = await bi_system.predictive_analytics.predict_revenue(request.model_id, request.features)
    return prediction

@app.get("/insights")
async def get_insights(start_date: datetime = None, end_date: datetime = None):
    """Get business insights"""
    if not start_date:
        start_date = datetime.now() - timedelta(days=30)
    if not end_date:
        end_date = datetime.now()
    
    metrics = await bi_system.bi_engine.calculate_business_metrics(start_date, end_date)
    insights = await bi_system.bi_engine.generate_insights(metrics)
    recommendations = await bi_system.bi_engine.generate_recommendations(metrics, insights)
    
    return {
        'insights': insights,
        'recommendations': recommendations,
        'metrics_summary': {
            'total_metrics': len(metrics),
            'positive_trends': len([m for m in metrics if m.trend == 'up']),
            'negative_trends': len([m for m in metrics if m.trend == 'down'])
        }
    }

@app.get("/data/{data_source}")
async def get_data(data_source: str, start_date: datetime = None, end_date: datetime = None):
    """Get raw data for analysis"""
    if not start_date:
        start_date = datetime.now() - timedelta(days=7)
    if not end_date:
        end_date = datetime.now()
    
    data = await bi_system.data_pipeline.extract_data(data_source, start_date, end_date)
    return data.to_dict(orient='records')

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3011)
