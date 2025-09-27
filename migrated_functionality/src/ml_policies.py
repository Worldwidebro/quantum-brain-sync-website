"""
ML-based decision policies using Claude and OpenAI for intelligent routing.
Follows patterns from integrations/lobe_chat_integration.py
"""

import asyncio
import logging
from typing import Any, Dict, List, Optional, Tuple
from dataclasses import dataclass

import openai
from openai import AsyncOpenAI
import anthropic
from anthropic import AsyncAnthropic

logger = logging.getLogger(__name__)


@dataclass
class MLPrediction:
    """ML model prediction result."""
    target: str
    confidence: float
    reasoning: str
    model_used: str
    metadata: Optional[Dict[str, Any]] = None


@dataclass
class AgentCapability:
    """Agent capability information."""
    agent_id: str
    capabilities: List[str]
    performance_score: float
    availability: bool
    specialization: Optional[str] = None


class MLPolicyEngine:
    """ML-based decision engine using Claude and OpenAI."""
    
    def __init__(self, config: Dict[str, Any]):
        """Initialize ML policy engine with configuration."""
        self.config = config
        
        # AI client configurations
        openai_config = config.get('openai', {})
        anthropic_config = config.get('anthropic', {})
        
        self.openai_client: Optional[AsyncOpenAI] = None
        self.anthropic_client: Optional[AsyncAnthropic] = None
        
        # Model settings
        self.openai_model = openai_config.get('model', 'gpt-4')
        self.claude_model = anthropic_config.get('model', 'claude-3-sonnet-20240229')
        
        # Decision settings
        self.confidence_threshold = config.get('ml_policies', {}).get('confidence_threshold', 0.7)
        self.fallback_to_rules = config.get('ml_policies', {}).get('fallback_to_rules', True)
        self.learning_enabled = config.get('ml_policies', {}).get('learning_enabled', True)
        
        # Performance tracking
        self.decision_history: List[Dict[str, Any]] = []
        self.performance_metrics: Dict[str, float] = {}
        
    async def initialize(self) -> None:
        """Initialize AI clients."""
        try:
            openai_config = self.config.get('openai', {})
            anthropic_config = self.config.get('anthropic', {})
            
            # Initialize OpenAI client
            if openai_config.get('api_key'):
                self.openai_client = AsyncOpenAI(api_key=openai_config['api_key'])
                logger.info("OpenAI client initialized")
            
            # Initialize Anthropic client
            if anthropic_config.get('api_key'):
                self.anthropic_client = AsyncAnthropic(api_key=anthropic_config['api_key'])
                logger.info("Anthropic client initialized")
            
            if not self.openai_client and not self.anthropic_client:
                logger.warning("No AI clients initialized - ML policies will be disabled")
            
        except Exception as e:
            logger.error(f"Failed to initialize ML policy engine: {e}")
            raise
    
    async def evaluate_context(self, 
                              context: Dict[str, Any], 
                              available_agents: List[AgentCapability]) -> MLPrediction:
        """
        Evaluate context using ML models to determine best routing decision.
        
        Args:
            context: Task and system context
            available_agents: List of available agents with capabilities
            
        Returns:
            MLPrediction with recommended target and confidence
        """
        try:
            # Prepare context for AI evaluation
            evaluation_prompt = self._build_evaluation_prompt(context, available_agents)
            
            # Try Claude first, fallback to OpenAI
            prediction = None
            if self.anthropic_client:
                prediction = await self._evaluate_with_claude(evaluation_prompt, context)
            
            if not prediction and self.openai_client:
                prediction = await self._evaluate_with_openai(evaluation_prompt, context)
            
            if not prediction:
                # Fallback to rule-based decision
                prediction = self._create_fallback_prediction(context, available_agents)
            
            # Record decision for learning
            if self.learning_enabled:
                await self._record_decision(context, prediction)
            
            return prediction
            
        except Exception as e:
            logger.error(f"ML evaluation failed: {e}")
            return self._create_fallback_prediction(context, available_agents)
    
    def _build_evaluation_prompt(self, 
                                context: Dict[str, Any], 
                                available_agents: List[AgentCapability]) -> str:
        """Build prompt for AI evaluation."""
        task_info = context.get('task', {})
        system_state = context.get('system', {})
        
        # Format available agents
        agents_info = []
        for agent in available_agents:
            agents_info.append(f"- {agent.agent_id}: {', '.join(agent.capabilities)} (performance: {agent.performance_score:.2f})")
        
        prompt = f"""
You are an intelligent routing system for the IZA OS orchestration platform. Your task is to analyze the given context and determine the best routing decision.

TASK CONTEXT:
- Type: {task_info.get('type', 'unknown')}
- Priority: {task_info.get('priority', 'medium')}
- Category: {task_info.get('category', 'general')}
- Complexity: {task_info.get('complexity', 'medium')}
- Requirements: {task_info.get('requirements', [])}
- Metadata: {task_info.get('metadata', {})}

SYSTEM STATE:
- Available agents: {len(available_agents)}
- System load: {system_state.get('load', 'unknown')}
- Recent performance: {system_state.get('performance', 'unknown')}

AVAILABLE AGENTS:
{chr(10).join(agents_info)}

DECISION OPTIONS:
1. Route to specific agent (provide agent_id)
2. Execute N8N workflow (provide workflow_id)
3. Escalate to human (provide reason)
4. Delegate to swarm (provide swarm_id)

Please provide your decision in the following JSON format:
{{
    "target": "agent_id_or_workflow_id_or_human_or_swarm_id",
    "target_type": "agent|workflow|human|swarm",
    "confidence": 0.0-1.0,
    "reasoning": "Detailed explanation of your decision",
    "alternative_options": ["option1", "option2"],
    "risk_assessment": "low|medium|high"
}}

Consider factors like:
- Agent capabilities vs task requirements
- Agent performance and availability
- Task complexity and priority
- System load and resource constraints
- Risk and compliance requirements
"""
        return prompt
    
    async def _evaluate_with_claude(self, prompt: str, context: Dict[str, Any]) -> Optional[MLPrediction]:
        """Evaluate using Claude model."""
        try:
            response = await self.anthropic_client.messages.create(
                model=self.claude_model,
                max_tokens=1000,
                temperature=0.3,
                messages=[{
                    "role": "user",
                    "content": prompt
                }]
            )
            
            # Parse Claude response
            content = response.content[0].text
            decision_data = self._parse_ai_response(content)
            
            if decision_data:
                return MLPrediction(
                    target=decision_data['target'],
                    confidence=decision_data['confidence'],
                    reasoning=decision_data['reasoning'],
                    model_used='claude',
                    metadata={
                        'target_type': decision_data.get('target_type'),
                        'alternative_options': decision_data.get('alternative_options', []),
                        'risk_assessment': decision_data.get('risk_assessment', 'medium')
                    }
                )
            
        except Exception as e:
            logger.error(f"Claude evaluation failed: {e}")
        
        return None
    
    async def _evaluate_with_openai(self, prompt: str, context: Dict[str, Any]) -> Optional[MLPrediction]:
        """Evaluate using OpenAI model."""
        try:
            response = await self.openai_client.chat.completions.create(
                model=self.openai_model,
                messages=[{
                    "role": "user",
                    "content": prompt
                }],
                temperature=0.3,
                max_tokens=1000
            )
            
            # Parse OpenAI response
            content = response.choices[0].message.content
            decision_data = self._parse_ai_response(content)
            
            if decision_data:
                return MLPrediction(
                    target=decision_data['target'],
                    confidence=decision_data['confidence'],
                    reasoning=decision_data['reasoning'],
                    model_used='openai',
                    metadata={
                        'target_type': decision_data.get('target_type'),
                        'alternative_options': decision_data.get('alternative_options', []),
                        'risk_assessment': decision_data.get('risk_assessment', 'medium')
                    }
                )
            
        except Exception as e:
            logger.error(f"OpenAI evaluation failed: {e}")
        
        return None
    
    def _parse_ai_response(self, content: str) -> Optional[Dict[str, Any]]:
        """Parse AI response JSON."""
        try:
            import json
            
            # Extract JSON from response
            start_idx = content.find('{')
            end_idx = content.rfind('}') + 1
            
            if start_idx >= 0 and end_idx > start_idx:
                json_str = content[start_idx:end_idx]
                return json.loads(json_str)
            
        except Exception as e:
            logger.error(f"Failed to parse AI response: {e}")
        
        return None
    
    def _create_fallback_prediction(self, 
                                  context: Dict[str, Any], 
                                  available_agents: List[AgentCapability]) -> MLPrediction:
        """Create fallback prediction when ML models are unavailable."""
        # Simple heuristic-based fallback
        task_type = context.get('task', {}).get('type', 'general')
        
        # Find best matching agent
        best_agent = None
        best_score = 0
        
        for agent in available_agents:
            if agent.availability:
                # Simple scoring based on capabilities and performance
                capability_match = 1.0 if task_type in agent.capabilities else 0.5
                score = capability_match * agent.performance_score
                
                if score > best_score:
                    best_score = score
                    best_agent = agent
        
        if best_agent:
            target = best_agent.agent_id
            confidence = min(best_score, 0.6)  # Lower confidence for fallback
            reasoning = f"Fallback routing to {best_agent.agent_id} based on capability matching"
        else:
            target = "human_reviewer"
            confidence = 0.3
            reasoning = "No suitable agent found, escalating to human"
        
        return MLPrediction(
            target=target,
            confidence=confidence,
            reasoning=reasoning,
            model_used='fallback',
            metadata={'fallback_reason': 'ml_models_unavailable'}
        )
    
    async def predict_best_agent(self, 
                               task_context: Dict[str, Any], 
                               available_agents: List[AgentCapability]) -> Optional[str]:
        """Predict the best agent for a specific task."""
        prediction = await self.evaluate_context(task_context, available_agents)
        
        if prediction.confidence >= self.confidence_threshold:
            return prediction.target
        
        return None
    
    async def assess_complexity(self, task_context: Dict[str, Any]) -> Tuple[str, float]:
        """
        Assess task complexity using ML models.
        
        Returns:
            Tuple of (complexity_level, confidence_score)
        """
        try:
            complexity_prompt = f"""
Analyze the complexity of this task and provide a complexity assessment.

TASK DETAILS:
{task_context.get('task', {})}

SYSTEM CONTEXT:
{task_context.get('system', {})}

Provide your assessment in JSON format:
{{
    "complexity": "low|medium|high|critical",
    "confidence": 0.0-1.0,
    "factors": ["factor1", "factor2"],
    "recommendations": ["recommendation1", "recommendation2"]
}}
"""
            
            # Try Claude first
            if self.anthropic_client:
                response = await self.anthropic_client.messages.create(
                    model=self.claude_model,
                    max_tokens=500,
                    temperature=0.2,
                    messages=[{
                        "role": "user",
                        "content": complexity_prompt
                    }]
                )
                
                content = response.content[0].text
                assessment = self._parse_ai_response(content)
                
                if assessment:
                    return assessment['complexity'], assessment['confidence']
            
            # Fallback to simple heuristic
            task_requirements = task_context.get('task', {}).get('requirements', [])
            complexity_score = len(task_requirements) * 0.2
            
            if complexity_score < 0.3:
                return "low", 0.6
            elif complexity_score < 0.6:
                return "medium", 0.6
            elif complexity_score < 0.9:
                return "high", 0.6
            else:
                return "critical", 0.6
                
        except Exception as e:
            logger.error(f"Complexity assessment failed: {e}")
            return "medium", 0.3
    
    async def _record_decision(self, context: Dict[str, Any], prediction: MLPrediction) -> None:
        """Record decision for learning and performance tracking."""
        try:
            decision_record = {
                'timestamp': asyncio.get_event_loop().time(),
                'context': context,
                'prediction': {
                    'target': prediction.target,
                    'confidence': prediction.confidence,
                    'model_used': prediction.model_used,
                    'reasoning': prediction.reasoning
                },
                'outcome': None  # Will be updated when task completes
            }
            
            self.decision_history.append(decision_record)
            
            # Keep only recent history (last 1000 decisions)
            if len(self.decision_history) > 1000:
                self.decision_history = self.decision_history[-1000:]
            
        except Exception as e:
            logger.error(f"Failed to record decision: {e}")
    
    async def update_performance(self, 
                               decision_id: str, 
                               outcome: Dict[str, Any]) -> None:
        """Update performance metrics based on decision outcomes."""
        try:
            # Find the decision record
            for record in self.decision_history:
                if record.get('context', {}).get('task', {}).get('id') == decision_id:
                    record['outcome'] = outcome
                    break
            
            # Update performance metrics
            successful_decisions = sum(1 for r in self.decision_history 
                                     if r.get('outcome', {}).get('success', False))
            total_decisions = len([r for r in self.decision_history if r.get('outcome')])
            
            if total_decisions > 0:
                self.performance_metrics['success_rate'] = successful_decisions / total_decisions
            
        except Exception as e:
            logger.error(f"Failed to update performance: {e}")
    
    def get_performance_metrics(self) -> Dict[str, Any]:
        """Get current performance metrics."""
        return {
            'total_decisions': len(self.decision_history),
            'decisions_with_outcomes': len([r for r in self.decision_history if r.get('outcome')]),
            'performance_metrics': self.performance_metrics,
            'model_usage': self._get_model_usage_stats()
        }
    
    def _get_model_usage_stats(self) -> Dict[str, int]:
        """Get statistics about model usage."""
        usage_stats = {}
        for record in self.decision_history:
            model = record.get('prediction', {}).get('model_used', 'unknown')
            usage_stats[model] = usage_stats.get(model, 0) + 1
        return usage_stats
    
    async def health_check(self) -> Dict[str, Any]:
        """Perform health check on ML policy engine."""
        health_status = {
            'status': 'healthy',
            'claude_available': self.anthropic_client is not None,
            'openai_available': self.openai_client is not None,
            'performance_metrics': self.get_performance_metrics()
        }
        
        # Test AI clients if available
        if self.anthropic_client:
            try:
                await self.anthropic_client.messages.create(
                    model=self.claude_model,
                    max_tokens=10,
                    messages=[{"role": "user", "content": "test"}]
                )
                health_status['claude_test'] = 'success'
            except Exception as e:
                health_status['claude_test'] = f'failed: {e}'
        
        if self.openai_client:
            try:
                await self.openai_client.chat.completions.create(
                    model=self.openai_model,
                    messages=[{"role": "user", "content": "test"}],
                    max_tokens=10
                )
                health_status['openai_test'] = 'success'
            except Exception as e:
                health_status['openai_test'] = f'failed: {e}'
        
        return health_status
