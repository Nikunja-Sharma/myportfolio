import React from 'react';

// Common styles
const strokeColor = "#30363D";
const activeStrokeColor = "#00E5FF";
const textColor = "#E6EDF3";
const boxFill = "#0B0F14";

const ServiceBox = ({ x, y, width, height, label, active = false }: any) => (
  <g>
    <rect 
      x={x} y={y} width={width} height={height} 
      rx="4" fill={boxFill} 
      stroke={active ? activeStrokeColor : strokeColor} 
      strokeWidth="2" 
    />
    <text 
      x={x + width / 2} y={y + height / 2} 
      dy=".3em" textAnchor="middle" 
      fill={active ? activeStrokeColor : textColor} 
      fontSize="12" fontFamily="monospace"
      className="select-none"
    >
      {label}
    </text>
  </g>
);

export const MarketplaceDiagram = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full">
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L9,3 z" fill={activeStrokeColor} />
      </marker>
    </defs>
    
    {/* Services */}
    <ServiceBox x={20} y={20} width={100} height={40} label="Product Svc" />
    <ServiceBox x={20} y={80} width={100} height={40} label="Order Svc" active />
    <ServiceBox x={20} y={140} width={100} height={40} label="User Svc" />

    {/* Event Bus */}
    <rect x={180} y={10} width={40} height={180} rx="4" fill="#161B22" stroke={activeStrokeColor} strokeWidth="2" />
    <text x={200} y={100} dy=".3em" textAnchor="middle" fill={textColor} fontSize="12" transform="rotate(-90, 200, 100)" className="font-mono">Event Bus</text>

    {/* Connections */}
    <path d="M120 40 L180 40" stroke={strokeColor} strokeWidth="2" />
    <path d="M120 100 L180 100" stroke={activeStrokeColor} strokeWidth="2" markerEnd="url(#arrow)">
        <animate attributeName="stroke-dasharray" from="0,100" to="100,0" dur="1s" fill="freeze" />
    </path>
    <path d="M120 160 L180 160" stroke={strokeColor} strokeWidth="2" />

    {/* Consumers */}
    <ServiceBox x={280} y={50} width={100} height={40} label="Email Wkr" />
    <ServiceBox x={280} y={110} width={100} height={40} label="Inventory Wkr" />
    
    <path d="M220 70 L280 70" stroke={strokeColor} strokeWidth="2" />
    <path d="M220 130 L280 130" stroke={activeStrokeColor} strokeWidth="2" markerEnd="url(#arrow)" />
  </svg>
);

export const OMSDiagram = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full">
    {/* Kafka Stream */}
    <path d="M20 100 L120 100" stroke={activeStrokeColor} strokeWidth="4" strokeDasharray="5,5">
       <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
    </path>
    <text x={70} y={90} textAnchor="middle" fill={textColor} fontSize="10" fontFamily="monospace">Kafka Stream</text>

    {/* Consumer */}
    <ServiceBox x={120} y={70} width={80} height={60} label="Consumer" active />

    {/* Queue */}
    <rect x={220} y={80} width={60} height={40} fill="none" stroke={strokeColor} strokeWidth="2" />
    <line x1="230" y1="80" x2="230" y2="120" stroke={strokeColor} />
    <line x1="240" y1="80" x2="240" y2="120" stroke={strokeColor} />
    <line x1="250" y1="80" x2="250" y2="120" stroke={strokeColor} />
    <text x={250} y={70} textAnchor="middle" fill={textColor} fontSize="10" fontFamily="monospace">BullMQ</text>

    <path d="M200 100 L220 100" stroke={activeStrokeColor} strokeWidth="2" />
    
    {/* Worker */}
    <ServiceBox x={300} y={70} width={80} height={60} label="Worker" />
    <path d="M280 100 L300 100" stroke={activeStrokeColor} strokeWidth="2" />
    
    {/* Retry Loop */}
    <path d="M340 130 Q 340 160 250 160 Q 160 160 160 130" fill="none" stroke="#FF6B00" strokeWidth="2" strokeDasharray="4,4" opacity="0.6" />
    <text x={250} y={175} textAnchor="middle" fill="#FF6B00" fontSize="10" fontFamily="monospace">Retry / DLQ</text>
  </svg>
);

export const AuthDiagram = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full">
    <ServiceBox x={20} y={80} width={80} height={40} label="Client" />
    <ServiceBox x={160} y={20} width={80} height={40} label="Auth Svc" active />
    <ServiceBox x={300} y={80} width={80} height={40} label="API" />

    {/* Flow 1 */}
    <path d="M60 80 L60 40 L160 40" fill="none" stroke={activeStrokeColor} strokeWidth="2">
      <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
    </path>
    <text x={110} y={30} textAnchor="middle" fill={activeStrokeColor} fontSize="10">1. Auth Code</text>

    {/* Flow 2 */}
    <path d="M240 40 L340 40 L340 80" fill="none" stroke={strokeColor} strokeWidth="2" />
    <text x={290} y={30} textAnchor="middle" fill={strokeColor} fontSize="10">2. Issue JWT</text>

    {/* Flow 3 */}
    <path d="M100 100 L300 100" fill="none" stroke="#7C4DFF" strokeWidth="2" strokeDasharray="4,4" />
    <text x={200} y={120} textAnchor="middle" fill="#7C4DFF" fontSize="10">3. Bearer Token Request</text>
  </svg>
);

export const AiDiagram = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full">
    <ServiceBox x={20} y={80} width={80} height={40} label="User" />
    <ServiceBox x={150} y={80} width={100} height={40} label="LangChain" active />
    <ServiceBox x={300} y={30} width={80} height={40} label="Vector DB" />
    <ServiceBox x={300} y={130} width={80} height={40} label="LLM (AI)" />

    <path d="M100 100 L150 100" stroke={strokeColor} strokeWidth="2" />
    
    {/* RAG Loop */}
    <path d="M200 80 L200 50 L300 50" fill="none" stroke={activeStrokeColor} strokeWidth="2" />
    <path d="M300 150 L200 150 L200 120" fill="none" stroke="#7C4DFF" strokeWidth="2" />
    
    <circle cx="200" cy="100" r="4" fill={activeStrokeColor}>
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
    </circle>
  </svg>
);

export const CicdDiagram = () => (
  <svg viewBox="0 0 400 200" className="w-full h-full">
    <circle cx="40" cy="100" r="15" fill={boxFill} stroke={strokeColor} strokeWidth="2" />
    <text x={40} y={105} textAnchor="middle" fill={textColor} fontSize="10">Git</text>

    <line x1="55" y1="100" x2="100" y2="100" stroke={strokeColor} strokeWidth="2" />

    <ServiceBox x={100} y={80} width={60} height={40} label="Build" active />
    <line x1="160" y1="100" x2="200" y2="100" stroke={strokeColor} strokeWidth="2" />
    
    <ServiceBox x={200} y={80} width={60} height={40} label="Test" />
    <line x1="260" y1="100" x2="300" y2="100" stroke={strokeColor} strokeWidth="2" />

    <ServiceBox x={300} y={80} width={60} height={40} label="Deploy" />
    
    {/* Status Indicators */}
    <circle cx="130" cy="70" r="4" fill="#00E5FF" />
    <circle cx="230" cy="70" r="4" fill="#00E5FF" />
    <circle cx="330" cy="70" r="4" fill="#30363D" />
  </svg>
);
