import {
  TechnologyIcon,
  DataIcon,
  SecurityIcon,
  CloudIcon,
  LeadershipIcon,
  BusinessIcon,
  DevOpsIcon,
  AIIcon
} from './learningLogos'

export const LEARNING_AREAS = [
  {
    key: 'technology',
    tag: 'Technology',
    label: 'Technology & Development',
    Icon: TechnologyIcon,
    href: '/skillsoft-catalog#python',
    desc: 'Build modern technical skills across software, web, and application development.',
    topics: ['Python', 'Build Chatbot with Python', 'AI for Programmers', 'AI for Software Engineers']
  },
  {
    key: 'data',
    tag: 'Data',
    label: 'Data & Analytics',
    Icon: DataIcon,
    href: '/skillsoft-catalog#data-analytics-specialist',
    desc: 'Turn raw information into insight with analytics, visualisation, and data science.',
    topics: ['Data Analytics Specialist', 'Data Analysis with R', 'Machine Learning', 'Mastering Power BI', 'Predictive Analytics']
  },
  {
    key: 'security',
    tag: 'Security',
    label: 'Cybersecurity',
    Icon: SecurityIcon,
    href: '/skillsoft-catalog#cybersecurity',
    desc: 'Protect systems, data, and networks with industry-recognised security skills.',
    topics: ['CyberSecurity', 'Network Security', 'Ethical Hacking', 'Risk Management']
  },
  {
    key: 'cloud',
    tag: 'Cloud',
    label: 'Cloud Computing',
    Icon: CloudIcon,
    href: '/skillsoft-catalog#genai-cloud-odyssey',
    desc: 'Design, deploy, and manage modern cloud infrastructure and services.',
    topics: ['The Generative AI Cloud Odyssey', 'DevOps', 'Cloud Platforms', 'AI on AWS, Azure & GCP']
  },
  {
    key: 'leadership',
    tag: 'Leadership',
    label: 'Leadership & Management',
    Icon: LeadershipIcon,
    href: '/skillsoft-catalog#business-skills',
    desc: 'Grow your people and process skills to lead teams and projects effectively.',
    topics: ['Business Skills', 'Design Thinking', 'Communication', 'Time Management']
  },
  {
    key: 'business',
    tag: 'Business',
    label: 'Business Skills',
    Icon: BusinessIcon,
    href: '/skillsoft-catalog#business-skills',
    desc: 'Develop the professional, analytical, and communication skills workplaces need.',
    topics: ['Business Skills', 'Banking and Finance', 'FinTech', 'Communication']
  },
  {
    key: 'devops',
    tag: 'DevOps',
    label: 'IT Operations & DevOps',
    Icon: DevOpsIcon,
    href: '/skillsoft-catalog#devops',
    desc: 'Automate, deploy, and operate reliable infrastructure and delivery pipelines.',
    topics: ['DevOps', 'AI for DevOps', 'Machine Learning Operations', 'Automated Testing']
  },
  {
    key: 'ai',
    tag: 'AI',
    label: 'AI & Emerging Technologies',
    Icon: AIIcon,
    href: '/skillsoft-catalog#generative-ai',
    desc: 'Explore artificial intelligence, machine learning, and emerging technologies.',
    topics: ['Generative AI', 'Machine Learning', 'NLP and LLMs', 'Prompt Engineering for Developers', 'AI Architect']
  }
]