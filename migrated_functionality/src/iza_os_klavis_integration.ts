// IZA OS - Klavis AI TypeScript SDK Integration
import { KlavisClient, McpServerName } from 'klavis';

class IZAOSKlavisIntegration {
    private klavis: KlavisClient;
    private userId: string;
    private strataServer: any = null;

    constructor(apiKey: string, userId: string) {
        this.klavis = new KlavisClient({ apiKey });
        this.userId = userId;
    }

    async createStrataServer(): Promise<boolean> {
        try {
            this.strataServer = await this.klavis.mcpServer.createStrataServer({
                userId: this.userId,
                servers: [
                    McpServerName.GITHUB,
                    McpServerName.NOTION,
                    McpServerName.LINEAR,
                    McpServerName.SENTRY,
                    McpServerName.VERCEL,
                    McpServerName.STRIPE,
                    McpServerName.SUPABASE,
                    McpServerName.DISCORD
                ]
            });
            console.log('✅ Strata server created successfully');
            return true;
        } catch (error) {
            console.error('❌ Failed to create Strata server:', error);
            return false;
        }
    }

    async createIndividualServers(): Promise<any[]> {
        const servers = [
            McpServerName.GITHUB,
            McpServerName.NOTION,
            McpServerName.LINEAR,
            McpServerName.SENTRY,
            McpServerName.VERCEL,
            McpServerName.STRIPE,
            McpServerName.SUPABASE,
            McpServerName.DISCORD
        ];

        const createdServers = [];
        for (const server of servers) {
            try {
                const serverInstance = await this.klavis.mcpServer.createServerInstance({
                    serverName: server,
                    userId: this.userId
                });
                createdServers.push(serverInstance);
                console.log(`✅ Created ${server} server`);
            } catch (error) {
                console.error(`❌ Failed to create ${server} server:`, error);
            }
        }

        return createdServers;
    }

    integrateWithMASAgents(): any {
        const integrationConfig = {
            research_agent: {
                servers: ['NOTION', 'GMAIL', 'YOUTUBE'],
                capabilities: ['content_research', 'market_analysis']
            },
            planning_agent: {
                servers: ['LINEAR', 'NOTION', 'GITHUB'],
                capabilities: ['project_planning', 'roadmap_creation']
            },
            execution_agent: {
                servers: ['GITHUB', 'VERCEL', 'DOCKER'],
                capabilities: ['code_deployment', 'infrastructure_management']
            },
            rag_agent: {
                servers: ['NOTION', 'SUPABASE', 'POSTGRESQL'],
                capabilities: ['knowledge_retrieval', 'context_management']
            },
            critic_agent: {
                servers: ['SENTRY', 'GITHUB', 'SLACK'],
                capabilities: ['quality_assurance', 'error_monitoring']
            },
            monitoring_agent: {
                servers: ['SENTRY', 'VERCEL', 'DISCORD'],
                capabilities: ['system_monitoring', 'alerting']
            }
        };

        console.log('✅ MAS agent integration configuration created');
        return integrationConfig;
    }
}

// Usage example
async function main() {
    const apiKey = process.env.KLAVIS_API_KEY;
    const userId = process.env.IZA_OS_USER_ID || 'iza_os_user';

    if (!apiKey) {
        console.error('❌ KLAVIS_API_KEY environment variable not set');
        return;
    }

    const integration = new IZAOSKlavisIntegration(apiKey, userId);

    // Create Strata server
    if (await integration.createStrataServer()) {
        console.log('🎯 Strata server ready for IZA OS');
    }

    // Create individual servers
    const servers = await integration.createIndividualServers();
    console.log(`🛠️ Created ${servers.length} individual servers`);

    // Integrate with MAS agents
    const masConfig = integration.integrateWithMASAgents();
    console.log('🤖 MAS agent integration configured');
}

export { IZAOSKlavisIntegration };
