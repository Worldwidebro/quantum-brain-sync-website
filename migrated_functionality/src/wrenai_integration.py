#!/usr/bin/env python3
import requests
import json
import os

class WrenAIIntegration:
    def __init__(self, api_key=None):
        self.api_key = api_key or os.getenv("WRENAI_API_KEY")
        self.base_url = "https://api.wren.ai"
        
    def test_connection(self):
        if not self.api_key:
            return False, "API key not found"
        
        headers = {"Authorization": f"Bearer {self.api_key}"}
        try:
            response = requests.get(f"{self.base_url}/health", headers=headers)
            return response.status_code == 200, response.text
        except Exception as e:
            return False, str(e)
    
    def create_analytics_workflow(self, workflow_name, data_source):
        headers = {"Authorization": f"Bearer {self.api_key}"}
        data = {
            "name": workflow_name,
            "data_source": data_source,
            "type": "analytics"
        }
        
        try:
            response = requests.post(f"{self.base_url}/workflows", 
                                   headers=headers, json=data)
            return response.status_code == 201, response.json()
        except Exception as e:
            return False, str(e)

if __name__ == "__main__":
    wrenai = WrenAIIntegration()
    success, message = wrenai.test_connection()
    print(f"WrenAI Connection: {'✅ Success' if success else '❌ Failed'}")
    print(f"Message: {message}")
