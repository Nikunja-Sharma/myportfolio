import { Project } from './types';

export const PORTFOLIO_OWNER = "Nikunja Sarma";
export const POSITIONING = "Cloud-Native Full-Stack Engineer focused on scalable distributed systems and production-grade architecture";
export const HEADLINE = "I Architect Scalable Cloud Systems That Survive Production.";
export const SUBHEADLINE = "Specializing in event-driven microservices, high-throughput message queues, and secure enterprise integrations.";

export const PROJECTS: Project[] = [
  {
    id: "marketplace",
    title: "Multivendor Marketplace Architecture",
    description: "A high-scale e-commerce backend decomposing monolithic logic into event-driven microservices. Designed to handle flash-sale traffic spikes with zero downtime.",
    techStack: ["Node.js", "Express", "Redis", "PostgreSQL", "RabbitMQ"],
    features: [
      "Microservice separation strategy for Product, Order, and User domains",
      "Event-driven order processing preventing blocking operations",
      "Redis caching layer reducing DB load by 40%",
      "Database indexing strategies for <50ms query latency"
    ],
    metrics: [
      { name: "Throughput", value: 1200, unit: "req/s" },
      { name: "Avg Latency", value: 45, unit: "ms" },
      { name: "Uptime", value: 99.99, unit: "%" }
    ],
    codeSnippet: `// Event-driven order consumer
channel.consume('order_created', async (msg) => {
  const order = JSON.parse(msg.content.toString());
  
  // Idempotency check using Redis
  const processed = await redis.set(
    \`processed:\${order.id}\`, 
    '1', 
    'EX', 
    86400, 
    'NX'
  );
  
  if (!processed) {
    logger.info('Duplicate order ignored', { id: order.id });
    return channel.ack(msg);
  }

  try {
    await inventoryService.reserve(order.items);
    await emailService.sendConfirmation(order.userId);
    channel.ack(msg);
  } catch (err) {
    // Send to Dead Letter Exchange
    channel.nack(msg, false, false); 
  }
});`,
    diagramType: 'marketplace'
  },
  {
    id: "oms",
    title: "OMS Platform — Distributed Pattern",
    description: "Distributed Order Management System capable of orchestrating complex fulfillment workflows with eventual consistency guarantees.",
    techStack: ["NestJS", "Kafka", "BullMQ", "MongoDB"],
    features: [
      "Kafka stream processing for real-time inventory updates",
      "BullMQ worker orchestration for asynchronous fulfillment tasks",
      "Idempotency design at API gateway and worker levels",
      "Exponential backoff retry and Dead Letter Queue (DLQ) handling"
    ],
    metrics: [
      { name: "Job Processing", value: "50k+", unit: "daily" },
      { name: "Error Rate", value: "<0.1", unit: "%" }
    ],
    diagramType: 'oms'
  },
  {
    id: "auth",
    title: "Secure Multi-Service Authentication",
    description: "Centralized identity management system implementing OIDC standards for seamless and secure access across internal tools and public APIs.",
    techStack: ["OIDC", "OAuth2", "JWT", "Keycloak"],
    features: [
      "OIDC authorization code flow with PKCE",
      "RBAC hierarchy model for granular permission control",
      "Stateless JWT lifecycle management with rotation",
      "Inter-service token validation middleware"
    ],
    diagramType: 'auth'
  },
  {
    id: "ai",
    title: "AI/GenAI Integration Layer",
    description: "Enterprise-grade RAG (Retrieval Augmented Generation) gateway connecting internal knowledge bases with LLMs, featuring cost and rate controls.",
    techStack: ["LangChain", "OpenAI", "Pinecone", "Rate-Limiter-Flexible"],
    features: [
      "LangChain orchestration for multi-step reasoning agents",
      "Semantic caching to reduce API costs by 30%",
      "Token-bucket rate limiting per tenant",
      "PII redaction middleware before LLM calls"
    ],
    codeSnippet: `const chain = RunnableSequence.from([
  {
    context: async (input) => {
      const docs = await vectorStore.similaritySearch(input.question, 3);
      return formatDocumentsAsString(docs);
    },
    question: (input) => input.question
  },
  promptTemplate,
  model,
  new StringOutputParser()
]);

const result = await chain.invoke({ question: "How to reset API key?" });`,
    diagramType: 'ai'
  },
  {
    id: "cicd",
    title: "Deployment & CI/CD Pipelines",
    description: "Fully automated GitOps pipeline ensuring code quality, security scanning, and seamless blue/green deployments to AWS ECS.",
    techStack: ["GitHub Actions", "Docker", "AWS ECS", "Terraform"],
    features: [
      "GitHub Actions workflow for lint, test, and build",
      "Multi-stage Docker builds reducing image size by 60%",
      "Infrastructure as Code (IaC) using Terraform",
      "Automated canary deployments with rollback triggers"
    ],
    diagramType: 'cicd'
  }
];
