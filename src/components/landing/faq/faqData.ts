export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const faqsEn: FAQItem[] = [
  {
    id: "what-is-claw",
    category: "general",
    question: "How do I get started with Credenza?",
    answer: "Getting started is easy! Simply create an account, follow our quick setup guide to configure your workspace, and you will be ready to deploy in minutes."
  },
  {
    id: "training-resources",
    category: "general",
    question: "Are there training resources available for new users?",
    answer: "Absolutely! We provide a range of training resources including webinars, video tutorials, and documentation to help new users get up to speed."
  },
  {
    id: "business-benefits",
    category: "general",
    question: "What types of businesses can benefit from your services?",
    answer: "Any company looking to build modern, stable architectures without devops bottlenecks can benefit, from early-stage startups to established enterprises."
  },
  {
    id: "hidden-fees",
    category: "general",
    question: "Are there any hidden fees?",
    answer: "No. Our pricing plans are fully transparent and scale with your resource consumption. You can view all metrics on the billing dashboard."
  },
  {
    id: "data-protection",
    category: "general",
    question: "What measures are in place to protect customer data?",
    answer: "We encrypt data in transit and at rest using AES-256 standards, maintain continuous security monitoring, and enforce strict access control levels."
  },
  {
    id: "payment-methods",
    category: "general",
    question: "What types of payment methods do you support?",
    answer: "We support all major credit cards, debit cards, PayPal, and bank transfers. Enterprise customers can request invoice-based billing."
  },
  {
    id: "perf-1",
    category: "features",
    question: "What makes Credenza's scaffolding engine faster?",
    answer: "The engine is written in pure Go without virtual machines, resolving dependencies and assembling templates concurrently in under a second."
  },
  {
    id: "perf-2",
    category: "features",
    question: "Is there built-in state management?",
    answer: "Yes, our systems include reactivity models and state persistence configurations optimized for high-density transactional platforms."
  },
  {
    id: "integration-1",
    category: "integration",
    question: "How do I integrate this into an existing CI/CD pipeline?",
    answer: "Our CLI compiles into single binaries that fit seamlessly inside GitHub Actions, GitLab CI, or local Docker environments."
  },
  {
    id: "security-1",
    category: "security",
    question: "Is multi-tenant security isolated?",
    answer: "Absolutely. Tenant separation is enforced natively at the database connection layer and token signature authentication levels."
  }
];

export const faqsEs: FAQItem[] = [
  {
    id: "what-is-claw",
    category: "general",
    question: "¿Cómo empiezo con Credenza?",
    answer: "¡Comenzar es fácil! Simplemente crea una cuenta, sigue nuestra guía rápida de configuración para preparar tu espacio de trabajo y estarás listo para desplegar en minutos."
  },
  {
    id: "training-resources",
    category: "general",
    question: "¿Hay recursos de capacitación disponibles para nuevos usuarios?",
    answer: "¡Absolutamente! Ofrecemos una variedad de recursos de capacitación que incluyen seminarios web, tutoriales en video y documentación para ayudar a los nuevos usuarios a familiarizarse rápidamente."
  },
  {
    id: "business-benefits",
    category: "general",
    question: "¿Qué tipos de empresas pueden beneficiarse de sus servicios?",
    answer: "Cualquier empresa que busque construir arquitecturas modernas y estables sin cuellos de botella de devops puede beneficiarse, desde startups en etapas iniciales hasta empresas consolidadas."
  },
  {
    id: "hidden-fees",
    category: "general",
    question: "¿Hay cargos ocultos?",
    answer: "No. Nuestros planes de precios son completamente transparentes y escalan con el consumo de recursos. Puedes ver todas las métricas en tu panel de facturación."
  },
  {
    id: "data-protection",
    category: "general",
    question: "¿Qué medidas existen para proteger los datos del cliente?",
    answer: "Encriptamos los datos en tránsito y en reposo utilizando estándares AES-256, mantenemos monitoreo continuo de seguridad y aplicamos niveles estrictos de control de acceso."
  },
  {
    id: "payment-methods",
    category: "general",
    question: "¿Qué tipo de métodos de pago aceptan?",
    answer: "Aceptamos todas las principales tarjetas de crédito, débito, PayPal y transferencias bancarias. Los clientes corporativos pueden solicitar facturación directa."
  },
  {
    id: "perf-1",
    category: "features",
    question: "¿Qué hace que el motor de Credenza sea más rápido?",
    answer: "El motor está escrito en Go puro sin máquinas virtuales, resolviendo dependencias y ensamblando plantillas de manera concurrente en menos de un segundo."
  },
  {
    id: "perf-2",
    category: "features",
    question: "¿Incluye gestor de estado nativo?",
    answer: "Sí, nuestros sistemas incluyen modelos de reactividad y configuraciones de persistencia de estado optimizados para plataformas transaccionales de alta densidad."
  },
  {
    id: "integration-1",
    category: "integration",
    question: "¿Cómo integro esto en mi flujo de trabajo de CI/CD existente?",
    answer: "Nuestro CLI se compila en binarios únicos que se integran perfectamente dentro de GitHub Actions, GitLab CI o entornos locales de Docker."
  },
  {
    id: "security-1",
    category: "security",
    question: "¿Está aislado el esquema de seguridad multi-inquilino?",
    answer: "Absolutamente. La separación de inquilinos se aplica nativamente a nivel de conexión de base de datos y firmas de autenticación de tokens."
  }
];