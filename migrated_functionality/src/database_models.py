"""
Database Models for memu Ecosystem
SQLAlchemy models for persistent storage of agent data, metrics, logs, and system state.
"""

from datetime import datetime
from typing import Any, Dict, List, Optional
from enum import Enum

from sqlalchemy import (
    Column, Integer, String, Text, DateTime, Boolean, Float, JSON,
    ForeignKey, Index, UniqueConstraint, CheckConstraint
)
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.sql import func
import uuid

Base = declarative_base()

class AgentStatus(str, Enum):
    """Agent status enumeration"""
    ACTIVE = "active"
    INACTIVE = "inactive"
    BUSY = "busy"
    ERROR = "error"
    MAINTENANCE = "maintenance"
    STARTING = "starting"
    STOPPING = "stopping"

class AgentRole(str, Enum):
    """Agent role enumeration"""
    WORKFLOW_EXECUTOR = "workflow_executor"
    DATA_PROCESSOR = "data_processor"
    MONITORING = "monitoring"
    SECURITY = "security"
    INTEGRATION = "integration"
    ANALYTICS = "analytics"
    COMMUNICATION = "communication"

class SystemHealthStatus(str, Enum):
    """System health status enumeration"""
    HEALTHY = "healthy"
    WARNING = "warning"
    CRITICAL = "critical"
    UNKNOWN = "unknown"

class WorkflowStatus(str, Enum):
    """Workflow execution status enumeration"""
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"

class AIModelProvider(str, Enum):
    """AI Model Provider enumeration"""
    ANTHROPIC = "anthropic"
    XAI = "xai"
    HUGGINGFACE = "huggingface"
    OPENAI = "openai"
    QWEN = "qwen"
    TIMEOUT = "timeout"

class Agent(Base):
    """
    Agent model for storing agent information and configuration
    """
    __tablename__ = 'agents'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False, unique=True)
    role = Column(String(50), nullable=False)
    status = Column(String(20), nullable=False, default=AgentStatus.INACTIVE)
    capabilities = Column(ARRAY(String), nullable=True)
    configuration = Column(JSON, nullable=True)
    metadata = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    last_heartbeat = Column(DateTime(timezone=True), nullable=True)
    version = Column(String(50), nullable=True)
    host = Column(String(255), nullable=True)
    port = Column(Integer, nullable=True)
    is_active = Column(Boolean, default=True)
    
    # Relationships
    metrics = relationship("AgentMetrics", back_populates="agent", cascade="all, delete-orphan")
    workflow_executions = relationship("WorkflowExecution", back_populates="agent")
    
    # Indexes
    __table_args__ = (
        Index('idx_agent_status', 'status'),
        Index('idx_agent_role', 'role'),
        Index('idx_agent_created_at', 'created_at'),
        Index('idx_agent_last_heartbeat', 'last_heartbeat'),
    )
    
    def __repr__(self):
        return f"<Agent(id={self.id}, name='{self.name}', role='{self.role}', status='{self.status}')>"
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert agent to dictionary"""
        return {
            'id': str(self.id),
            'name': self.name,
            'role': self.role,
            'status': self.status,
            'capabilities': self.capabilities or [],
            'configuration': self.configuration or {},
            'metadata': self.metadata or {},
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'last_heartbeat': self.last_heartbeat.isoformat() if self.last_heartbeat else None,
            'version': self.version,
            'host': self.host,
            'port': self.port,
            'is_active': self.is_active
        }

class AgentMetrics(Base):
    """
    Agent metrics model for storing performance and operational metrics
    """
    __tablename__ = 'agent_metrics'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    agent_id = Column(UUID(as_uuid=True), ForeignKey('agents.id'), nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    
    # Performance metrics
    tasks_completed = Column(Integer, default=0)
    tasks_failed = Column(Integer, default=0)
    success_rate = Column(Float, default=0.0)
    average_response_time = Column(Float, default=0.0)
    cpu_usage = Column(Float, default=0.0)
    memory_usage = Column(Float, default=0.0)
    disk_usage = Column(Float, default=0.0)
    network_io = Column(Float, default=0.0)
    
    # Business metrics
    revenue_generated = Column(Float, default=0.0)
    cost_incurred = Column(Float, default=0.0)
    efficiency_score = Column(Float, default=0.0)
    
    # Custom metrics
    custom_metrics = Column(JSON, nullable=True)
    
    # Relationships
    agent = relationship("Agent", back_populates="metrics")
    
    # Indexes
    __table_args__ = (
        Index('idx_agent_metrics_agent_id', 'agent_id'),
        Index('idx_agent_metrics_timestamp', 'timestamp'),
        Index('idx_agent_metrics_success_rate', 'success_rate'),
        Index('idx_agent_metrics_revenue', 'revenue_generated'),
    )
    
    def __repr__(self):
        return f"<AgentMetrics(id={self.id}, agent_id={self.agent_id}, success_rate={self.success_rate})>"
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert metrics to dictionary"""
        return {
            'id': str(self.id),
            'agent_id': str(self.agent_id),
            'timestamp': self.timestamp.isoformat() if self.timestamp else None,
            'tasks_completed': self.tasks_completed,
            'tasks_failed': self.tasks_failed,
            'success_rate': self.success_rate,
            'average_response_time': self.average_response_time,
            'cpu_usage': self.cpu_usage,
            'memory_usage': self.memory_usage,
            'disk_usage': self.disk_usage,
            'network_io': self.network_io,
            'revenue_generated': self.revenue_generated,
            'cost_incurred': self.cost_incurred,
            'efficiency_score': self.efficiency_score,
            'custom_metrics': self.custom_metrics or {}
        }

class SystemHealth(Base):
    """
    System health model for monitoring system components
    """
    __tablename__ = 'system_health'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    component = Column(String(100), nullable=False)
    status = Column(String(20), nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    
    # Health metrics
    response_time = Column(Float, nullable=True)
    error_rate = Column(Float, nullable=True)
    availability = Column(Float, nullable=True)
    throughput = Column(Float, nullable=True)
    
    # System metrics
    cpu_usage = Column(Float, nullable=True)
    memory_usage = Column(Float, nullable=True)
    disk_usage = Column(Float, nullable=True)
    network_usage = Column(Float, nullable=True)
    
    # Additional data
    metrics = Column(JSON, nullable=True)
    alerts = Column(ARRAY(String), nullable=True)
    metadata = Column(JSON, nullable=True)
    
    # Indexes
    __table_args__ = (
        Index('idx_system_health_component', 'component'),
        Index('idx_system_health_status', 'status'),
        Index('idx_system_health_timestamp', 'timestamp'),
        UniqueConstraint('component', 'timestamp', name='uq_component_timestamp'),
    )
    
    def __repr__(self):
        return f"<SystemHealth(id={self.id}, component='{self.component}', status='{self.status}')>"
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert system health to dictionary"""
        return {
            'id': str(self.id),
            'component': self.component,
            'status': self.status,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None,
            'response_time': self.response_time,
            'error_rate': self.error_rate,
            'availability': self.availability,
            'throughput': self.throughput,
            'cpu_usage': self.cpu_usage,
            'memory_usage': self.memory_usage,
            'disk_usage': self.disk_usage,
            'network_usage': self.network_usage,
            'metrics': self.metrics or {},
            'alerts': self.alerts or [],
            'metadata': self.metadata or {}
        }

class AuditLog(Base):
    """
    Audit log model for tracking system actions and compliance
    """
    __tablename__ = 'audit_logs'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(String(255), nullable=True)
    session_id = Column(String(255), nullable=True)
    action = Column(String(100), nullable=False)
    resource = Column(String(255), nullable=False)
    result = Column(String(50), nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    correlation_id = Column(String(255), nullable=True)
    
    # Request details
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(Text, nullable=True)
    request_method = Column(String(10), nullable=True)
    request_url = Column(Text, nullable=True)
    
    # Additional data
    metadata = Column(JSON, nullable=True)
    error_message = Column(Text, nullable=True)
    
    # Indexes
    __table_args__ = (
        Index('idx_audit_log_user_id', 'user_id'),
        Index('idx_audit_log_action', 'action'),
        Index('idx_audit_log_resource', 'resource'),
        Index('idx_audit_log_timestamp', 'timestamp'),
        Index('idx_audit_log_correlation_id', 'correlation_id'),
        Index('idx_audit_log_ip_address', 'ip_address'),
    )
    
    def __repr__(self):
        return f"<AuditLog(id={self.id}, user_id='{self.user_id}', action='{self.action}')>"
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert audit log to dictionary"""
        return {
            'id': str(self.id),
            'user_id': self.user_id,
            'session_id': self.session_id,
            'action': self.action,
            'resource': self.resource,
            'result': self.result,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None,
            'correlation_id': self.correlation_id,
            'ip_address': self.ip_address,
            'user_agent': self.user_agent,
            'request_method': self.request_method,
            'request_url': self.request_url,
            'metadata': self.metadata or {},
            'error_message': self.error_message
        }

class ContextLog(Base):
    """
    Context log model for tracking data flow and context correlation
    """
    __tablename__ = 'context_logs'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    layer = Column(String(50), nullable=False)
    operation = Column(String(100), nullable=False)
    data = Column(JSON, nullable=False)
    correlation_id = Column(String(255), nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    
    # Additional context
    user_id = Column(String(255), nullable=True)
    session_id = Column(String(255), nullable=True)
    request_id = Column(String(255), nullable=True)
    metadata = Column(JSON, nullable=True)
    
    # Indexes
    __table_args__ = (
        Index('idx_context_log_layer', 'layer'),
        Index('idx_context_log_operation', 'operation'),
        Index('idx_context_log_correlation_id', 'correlation_id'),
        Index('idx_context_log_timestamp', 'timestamp'),
        Index('idx_context_log_user_id', 'user_id'),
    )
    
    def __repr__(self):
        return f"<ContextLog(id={self.id}, layer='{self.layer}', operation='{self.operation}')>"
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert context log to dictionary"""
        return {
            'id': str(self.id),
            'layer': self.layer,
            'operation': self.operation,
            'data': self.data or {},
            'correlation_id': self.correlation_id,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None,
            'user_id': self.user_id,
            'session_id': self.session_id,
            'request_id': self.request_id,
            'metadata': self.metadata or {}
        }

class WorkflowExecution(Base):
    """
    Workflow execution model for tracking workflow runs and results
    """
    __tablename__ = 'workflow_executions'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    workflow_id = Column(String(255), nullable=False)
    agent_id = Column(UUID(as_uuid=True), ForeignKey('agents.id'), nullable=True)
    status = Column(String(20), nullable=False, default=WorkflowStatus.PENDING)
    
    # Execution details
    started_at = Column(DateTime(timezone=True), nullable=True)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    duration = Column(Float, nullable=True)  # Duration in seconds
    
    # Input and output
    input_data = Column(JSON, nullable=True)
    output_data = Column(JSON, nullable=True)
    error_message = Column(Text, nullable=True)
    
    # Performance metrics
    cpu_time = Column(Float, nullable=True)
    memory_peak = Column(Float, nullable=True)
    network_io = Column(Float, nullable=True)
    
    # Additional data
    metadata = Column(JSON, nullable=True)
    correlation_id = Column(String(255), nullable=True)
    
    # Relationships
    agent = relationship("Agent", back_populates="workflow_executions")
    
    # Indexes
    __table_args__ = (
        Index('idx_workflow_execution_workflow_id', 'workflow_id'),
        Index('idx_workflow_execution_agent_id', 'agent_id'),
        Index('idx_workflow_execution_status', 'status'),
        Index('idx_workflow_execution_started_at', 'started_at'),
        Index('idx_workflow_execution_correlation_id', 'correlation_id'),
    )
    
    def __repr__(self):
        return f"<WorkflowExecution(id={self.id}, workflow_id='{self.workflow_id}', status='{self.status}')>"
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert workflow execution to dictionary"""
        return {
            'id': str(self.id),
            'workflow_id': self.workflow_id,
            'agent_id': str(self.agent_id) if self.agent_id else None,
            'status': self.status,
            'started_at': self.started_at.isoformat() if self.started_at else None,
            'completed_at': self.completed_at.isoformat() if self.completed_at else None,
            'duration': self.duration,
            'input_data': self.input_data or {},
            'output_data': self.output_data or {},
            'error_message': self.error_message,
            'cpu_time': self.cpu_time,
            'memory_peak': self.memory_peak,
            'network_io': self.network_io,
            'metadata': self.metadata or {},
            'correlation_id': self.correlation_id
        }

class WebSocketConnection(Base):
    """
    WebSocket connection model for tracking active connections
    """
    __tablename__ = 'websocket_connections'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    connection_id = Column(String(255), nullable=False, unique=True)
    user_id = Column(String(255), nullable=True)
    session_id = Column(String(255), nullable=True)
    
    # Connection details
    connected_at = Column(DateTime(timezone=True), server_default=func.now())
    disconnected_at = Column(DateTime(timezone=True), nullable=True)
    last_activity = Column(DateTime(timezone=True), server_default=func.now())
    
    # Connection info
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(Text, nullable=True)
    subscriptions = Column(ARRAY(String), nullable=True)
    
    # Additional data
    metadata = Column(JSON, nullable=True)
    is_active = Column(Boolean, default=True)
    
    # Indexes
    __table_args__ = (
        Index('idx_websocket_connection_id', 'connection_id'),
        Index('idx_websocket_user_id', 'user_id'),
        Index('idx_websocket_session_id', 'session_id'),
        Index('idx_websocket_connected_at', 'connected_at'),
        Index('idx_websocket_is_active', 'is_active'),
    )
    
    def __repr__(self):
        return f"<WebSocketConnection(id={self.id}, connection_id='{self.connection_id}', user_id='{self.user_id}')>"
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert WebSocket connection to dictionary"""
        return {
            'id': str(self.id),
            'connection_id': self.connection_id,
            'user_id': self.user_id,
            'session_id': self.session_id,
            'connected_at': self.connected_at.isoformat() if self.connected_at else None,
            'disconnected_at': self.disconnected_at.isoformat() if self.disconnected_at else None,
            'last_activity': self.last_activity.isoformat() if self.last_activity else None,
            'ip_address': self.ip_address,
            'user_agent': self.user_agent,
            'subscriptions': self.subscriptions or [],
            'metadata': self.metadata or {},
            'is_active': self.is_active
        }

class Configuration(Base):
    """
    Configuration model for storing system configuration
    """
    __tablename__ = 'configurations'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    key = Column(String(255), nullable=False, unique=True)
    value = Column(JSON, nullable=False)
    environment = Column(String(50), nullable=False, default='development')
    
    # Metadata
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    created_by = Column(String(255), nullable=True)
    updated_by = Column(String(255), nullable=True)
    
    # Indexes
    __table_args__ = (
        Index('idx_configuration_key', 'key'),
        Index('idx_configuration_environment', 'environment'),
        UniqueConstraint('key', 'environment', name='uq_key_environment'),
    )
    
    def __repr__(self):
        return f"<Configuration(id={self.id}, key='{self.key}', environment='{self.environment}')>"
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert configuration to dictionary"""
        return {
            'id': str(self.id),
            'key': self.key,
            'value': self.value,
            'environment': self.environment,
            'description': self.description,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'created_by': self.created_by,
            'updated_by': self.updated_by
        }

class AIModelUsage(Base):
    """Track AI model usage and performance"""
    __tablename__ = "ai_model_usage"
    
    id = Column(Integer, primary_key=True, index=True)
    model_name = Column(String(255), nullable=False, index=True)
    provider = Column(String(50), nullable=False, index=True)
    agent_id = Column(String(255), ForeignKey("agents.id"), nullable=True, index=True)
    request_type = Column(String(100), nullable=False)  # chat, code_generation, analysis, etc.
    input_tokens = Column(Integer, default=0)
    output_tokens = Column(Integer, default=0)
    response_time_ms = Column(Float, default=0.0)
    success = Column(Boolean, default=True)
    error_message = Column(Text, nullable=True)
    cost_usd = Column(Float, default=0.0)
    metadata = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=func.now(), index=True)
    
    __table_args__ = (
        Index('idx_ai_model_provider', 'model_name', 'provider'),
        Index('idx_ai_model_agent', 'agent_id', 'created_at'),
        Index('idx_ai_model_usage', 'created_at', 'provider'),
    )

class AIModelConfiguration(Base):
    """Store AI model configurations and settings"""
    __tablename__ = "ai_model_configurations"
    
    id = Column(Integer, primary_key=True, index=True)
    model_name = Column(String(255), nullable=False, index=True)
    provider = Column(String(50), nullable=False, index=True)
    is_active = Column(Boolean, default=True)
    max_tokens = Column(Integer, default=4000)
    temperature = Column(Float, default=0.7)
    timeout_seconds = Column(Integer, default=30)
    retry_attempts = Column(Integer, default=3)
    cost_per_token = Column(Float, default=0.0)
    capabilities = Column(ARRAY(String), nullable=True)
    configuration = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    __table_args__ = (
        UniqueConstraint('model_name', 'provider', name='uq_ai_model_provider'),
        Index('idx_ai_config_active', 'is_active', 'provider'),
    )

# Database utility functions
def create_tables(engine):
    """Create all database tables"""
    Base.metadata.create_all(bind=engine)

def drop_tables(engine):
    """Drop all database tables"""
    Base.metadata.drop_all(bind=engine)

def get_session_factory(engine):
    """Get SQLAlchemy session factory"""
    return sessionmaker(bind=engine)

# Migration utilities
def get_migration_sql() -> str:
    """Get SQL for database migration"""
    return """
    -- Create indexes for better performance
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_agent_status_active 
    ON agents (status) WHERE is_active = true;
    
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_agent_metrics_recent 
    ON agent_metrics (timestamp DESC) WHERE timestamp > NOW() - INTERVAL '7 days';
    
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_audit_log_recent 
    ON audit_logs (timestamp DESC) WHERE timestamp > NOW() - INTERVAL '30 days';
    
    -- Create partial indexes for active connections
    CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_websocket_active 
    ON websocket_connections (last_activity) WHERE is_active = true;
    
    -- Add constraints for data integrity
    ALTER TABLE agents ADD CONSTRAINT chk_agent_status 
    CHECK (status IN ('active', 'inactive', 'busy', 'error', 'maintenance', 'starting', 'stopping'));
    
    ALTER TABLE agent_metrics ADD CONSTRAINT chk_success_rate 
    CHECK (success_rate >= 0 AND success_rate <= 100);
    
    ALTER TABLE system_health ADD CONSTRAINT chk_health_status 
    CHECK (status IN ('healthy', 'warning', 'critical', 'unknown'));
    
    ALTER TABLE workflow_executions ADD CONSTRAINT chk_workflow_status 
    CHECK (status IN ('pending', 'running', 'completed', 'failed', 'cancelled', 'timeout'));
    """

def get_initial_data_sql() -> str:
    """Get SQL for initial data population"""
    return """
    -- Insert default system health monitoring
    INSERT INTO system_health (component, status, metrics) VALUES
    ('database', 'healthy', '{"connection_pool": 10, "active_connections": 5}'),
    ('redis', 'healthy', '{"memory_usage": 45.2, "connected_clients": 3}'),
    ('api_server', 'healthy', '{"response_time": 0.15, "requests_per_second": 25}'),
    ('websocket_server', 'healthy', '{"active_connections": 12, "messages_per_second": 8}')
    ON CONFLICT (component, timestamp) DO NOTHING;
    
    -- Insert default configurations
    INSERT INTO configurations (key, value, environment, description) VALUES
    ('logging.level', '"INFO"', 'development', 'Default logging level'),
    ('cache.ttl', '3600', 'development', 'Default cache TTL in seconds'),
    ('security.jwt_secret', '"your-secret-key"', 'development', 'JWT secret key'),
    ('database.pool_size', '10', 'development', 'Database connection pool size')
    ON CONFLICT (key, environment) DO NOTHING;
    """
