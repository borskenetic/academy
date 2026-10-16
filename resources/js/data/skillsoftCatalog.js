/**
 * Shared Skillsoft catalog data, aligned to
 * docs/Content-Mapping-Courses-Skillsoft.xlsx ("All Domains" sheet, Part B tracks 1-27).
 * Titles match the source file exactly. `outcomes` for tracks with curated
 * site copy keep it; for the remaining tracks the outcomes are the mapped
 * Skillsoft content items from the file itself. Tracks without a published
 * Degree+ page yet use '#' for page/apply and the catalog UI renders a
 * "details coming soon" note instead of dead links.
 */

const rawCourses = [
  {
    slug: 'ai-data-analytics-bi',
    title: 'AI for Data Analytics and BI',
    category: 'Data & Analytics',
    duration: '30 hours, 42 minutes',
    page: 'https://degreeplus.in/skillsoft_latest_new/ai-for-data-analytics-bi/',
    apply: 'https://degreeplus.in/SPPU-Online/skillsoft/?courseId=1',
    overview: 'Introduces AI and generative AI for data analytics and business intelligence, including foundational AI concepts, ethical considerations, prompt engineering, data manipulation, and visualization.',
    outcomes: [
      'Understand machine learning, deep learning, neural networks, generative AI, and GPT models.',
      'Apply responsible and ethical AI practices.',
      'Create prompts for manipulating and analyzing data.',
      'Filter, group, combine, and visualize data effectively.',
      'Use AI-powered features in Power BI and train ML models for business insights.',
      'Build interactive visualizations with tools such as D3.js and generative AI.'
    ]
  },
  {
    slug: 'ai-data-science',
    title: 'AI for Data Science',
    category: 'AI',
    duration: '45 hours, 53 minutes, 22 seconds',
    page: 'https://degreeplus.in/skillsoft_latest/ai-for-data-science/',
    apply: 'https://degreeplus.in/SPPU-Online/skillsoft/?courseId=2',
    overview: 'Covers generative AI, deep learning, large language models, natural language processing, and responsible AI for real-world applications.',
    outcomes: [
      'Build a foundation in generative AI, deep learning, and LLMs.',
      'Implement, fine-tune, and evaluate AI and NLP models with tools such as Hugging Face.',
      'Understand ethical considerations and the environmental impact of AI.',
      'Apply AI to content creation, data generation, customer engagement, and other business functions.'
    ]
  },
  {
    slug: 'ai-devops',
    title: 'AI for DevOps',
    category: 'DevOps & Cloud',
    duration: '30 hours, 23 minutes, 35 seconds',
    page: 'https://degreeplus.in/skillsoft_latest/ai-for-devops/',
    apply: 'https://degreeplus.in/SPPU-Online/skillsoft/?courseId=3',
    overview: 'Introduces AI and generative AI concepts for DevOps, IT automation, and responsible technology adoption.',
    outcomes: [
      'Understand AI and generative AI technologies.',
      'Apply prompt engineering, IT automation, and AI-powered DevOps techniques.',
      'Use AI responsibly in IT and DevOps.',
      'Apply AI solutions through case studies and simulators.',
      'Identify emerging AI and DevOps trends and tools.'
    ]
  },
  {
    slug: 'ai-programmers',
    title: 'AI for Programmers',
    category: 'Development',
    duration: '30 hours, 26 minutes, 41 seconds',
    page: 'https://degreeplus.in/skillsoft_latest/ai-for-programmers/',
    apply: 'https://degreeplus.in/SPPU-Online/skillsoft/?courseId=4',
    overview: 'An introductory AI and generative AI journey for programmers, covering AI concepts, ethical considerations, and programming-oriented applications.',
    outcomes: [
      'Understand the practical use of AI in coding workflows.',
      'Apply AI concepts and prompt engineering for software tasks.',
      'Improve productivity using AI-assisted development processes.',
      'Leverage responsible AI practices in programming.'
    ]
  },
  {
    slug: 'ai-software-engineers',
    title: 'AI for Software Engineers',
    category: 'Development',
    duration: '30 hours, 33 minutes, 13 seconds',
    page: 'https://degreeplus.in/skillsoft_latest/ai-for-software-engineers/',
    apply: 'https://degreeplus.in/SPPU-Online/skillsoft/?courseId=5',
    overview: 'Develops software-engineering skills in generative AI, NLP, LLMs, transformers, prompt engineering, and responsible AI.',
    outcomes: [
      'Explore GPT models, deep learning, and transformers.',
      'Use prompt-engineering techniques for software development tasks.',
      'Evaluate and apply generative AI across the SDLC.',
      'Understand legal, ethical, and professional AI implications.',
      'Work with LLMs, vector databases, RAG models, and AI agents.'
    ]
  },
  {
    slug: 'machine-learning',
    title: 'Machine Learning',
    category: 'AI',
    duration: 'Self-paced',
    page: '#',
    apply: '#',
    overview: 'Core machine learning foundations from the Skillsoft mapped content: supervised and unsupervised learning, recommenders, clustering, and dimensionality reduction.',
    outcomes: [
      'Introduction to Machine Learning',
      'Supervised Learning: Linear/Logistic Regression, Naive Bayes, SVM, KNN, Decision Trees',
      'Recommender Systems',
      'Unsupervised Learning: K-Means Clustering and PCA'
    ]
  },
  {
    slug: 'build-chatbot-python',
    title: 'Build Chatbot with Python',
    category: 'Development',
    duration: 'Self-paced',
    page: '#',
    apply: '#',
    overview: 'A hands-on path from chatbot basics to deep-learning and generative chatbots, including web scraping and retrieval-based designs.',
    outcomes: [
      'Introduction to Chatbots',
      'Web Scraping for Chatbots',
      'Rule-based Chatbots',
      'Language Models and Retrieval-based Chatbots',
      'Deep Learning and Generative Chatbots'
    ]
  },
  {
    slug: 'python',
    title: 'Python',
    category: 'Development',
    duration: 'Self-paced',
    page: '#',
    apply: '#',
    overview: 'Start from computing fundamentals and progress to real Python projects, data structures, and a terminal-game portfolio piece.',
    outcomes: [
      'Introduction to Computer Science Career Path',
      'Fundamentals of Python',
      'Basic Python Data Structures and Objects',
      'Portfolio Project: Python Terminal Game'
    ]
  },
  {
    slug: 'data-analysis-r',
    title: 'Data Analysis with R',
    category: 'Data & Analytics',
    duration: '13 hours, 02 minutes',
    page: 'https://degreeplus.in/skillsoft_latest_new/data-analytics-with-r/',
    apply: 'https://degreeplus.in/SPPU-Online/skillsoft/?courseId=9',
    overview: 'Build essential data-analysis skills with R programming, from syntax and data structures to data manipulation and exploration.',
    outcomes: [
      'Understand key data-analysis concepts.',
      'Write R code using variables, functions, and data frames.',
      'Manipulate data effectively within R.'
    ]
  },
  {
    slug: 'data-analytics-specialist',
    title: 'Data Analytics Specialist',
    category: 'Data & Analytics',
    duration: 'Self-paced',
    page: '#',
    apply: '#',
    overview: 'Become a job-ready analytics specialist with Excel, SQL databases, and Tableau visualisation skills.',
    outcomes: [
      'Exploring and Visualizing Data in Excel',
      'Databases with SQL',
      'Tableau'
    ]
  },
  {
    slug: 'generative-ai',
    title: 'Generative AI',
    category: 'AI',
    duration: 'Self-paced',
    page: '#',
    apply: '#',
    overview: 'From autoencoders to GANs and the OpenAI APIs: a complete generative-AI journey ending with a final exam.',
    outcomes: [
      'An Introduction to Generative AI',
      'Generative AI Models: Autoencoders, VAEs and GANs',
      'Using OpenAI APIs: Playground, Python, image and audio APIs',
      'Fine-tuning Models, the Assistants API and Embeddings',
      'Final Exam'
    ]
  },
  {
    slug: 'mastering-power-bi',
    title: 'Mastering Power BI',
    category: 'Data & Analytics',
    duration: 'Self-paced',
    page: '#',
    apply: '#',
    overview: 'Go from loading data to stunning visualisation, mastering the Power BI service, Power Query, administration, security, and AI features.',
    outcomes: [
      'From Data Loading to Stunning Visualization',
      'Mastering Power BI Service and Power Query',
      'Administration, Security and Performance Strategies',
      'Unleashing AI in Power BI'
    ]
  },
  {
    slug: 'ml-operations',
    title: 'Machine Learning Operations',
    category: 'AI',
    duration: 'Self-paced',
    page: '#',
    apply: '#',
    overview: 'Operationalise machine learning with MLflow, data version control, and the professional skills that keep ML projects on track.',
    outcomes: [
      'Intro to ML Operations',
      'MLflow',
      'Data Version Control',
      'Communication Essentials',
      'Time Management'
    ]
  },
  {
    slug: 'nlp-llms',
    title: 'NLP and LLMs',
    category: 'AI',
    duration: 'Self-paced',
    page: '#',
    apply: '#',
    overview: 'Natural language processing foundations plus how to architect large language models into real technical solutions.',
    outcomes: [
      'Natural Language Processing',
      'Architecting LLMs for your Technical Solutions',
      'Communication Essentials',
      'Time Management'
    ]
  },
  {
    slug: 'low-code-ml',
    title: 'No/Low Code Machine Learning',
    category: 'AI',
    duration: 'Self-paced',
    page: '#',
    apply: '#',
    overview: 'Build ML solutions without heavy coding using KNIME, RapidMiner, BigQuery ML, and practical ChatGPT and GPT-API workflows.',
    outcomes: [
      'Low Code Machine Learning with KNIME and RapidMiner',
      'Machine Learning Using SQL with BigQuery ML',
      'OpenAI GPT API and Practical ChatGPT'
    ]
  },
  {
    slug: 'predictive-analytics',
    title: 'Predictive Analytics',
    category: 'Data & Analytics',
    duration: 'Self-paced',
    page: '#',
    apply: '#',
    overview: 'Forecast outcomes with predictive-analytics techniques, rounded out with communication and time-management skills.',
    outcomes: [
      'Predictive Analytics',
      'Communication Essentials',
      'Time Management'
    ]
  },
  {
    slug: 'prompt-engineering-developers',
    title: 'Prompt Engineering for Developers',
    category: 'AI',
    duration: 'Self-paced',
    page: '#',
    apply: '#',
    overview: 'Developer-focused prompt engineering across data science, programming, statistics, ML, and generative-AI tooling.',
    outcomes: [
      'Prompt Engineering for Data Science and Programmers',
      'Prompt Engineering with Generative AI Tools',
      'Prompt Engineering for Statistics and Machine Learning'
    ]
  },
  {
    slug: 'automated-testing',
    title: 'Automated Testing',
    category: 'Development',
    duration: '16 hours, 38 minutes',
    page: 'https://degreeplus.in/skillsoft_latest_new/automated-testing-with-selenium/',
    apply: 'https://degreeplus.in/SPPU-Online/skillsoft/?courseId=18',
    overview: 'Master automated testing with Selenium, covering test design, frameworks, execution, reporting, and maintenance.',
    outcomes: [
      'Understand the fundamentals of automated testing.',
      'Design effective automated test cases and frameworks.',
      'Implement, execute, and maintain Selenium-based tests.',
      'Generate meaningful test reports for continuous delivery.'
    ]
  },
  {
    slug: 'cybersecurity',
    title: 'CyberSecurity',
    category: 'Cybersecurity',
    duration: '11 hours, 50 minutes',
    page: 'https://degreeplus.in/skillsoft_latest_new/cyber-security/',
    apply: 'https://degreeplus.in/SPPU-Online/skillsoft/?courseId=19',
    overview: 'Develop core cybersecurity skills including networking fundamentals, operating systems, threat landscapes, and ethical hacking.',
    outcomes: [
      'Networking: Standards, LANs, Wireless, WANs, IP Addressing and Protocols',
      'Windows 11 Productivity and File Management',
      'Cybersecurity Standards, Regulations and Frameworks',
      'Cyber Attacks, Threat Actors and Personal Digital Security',
      'Risk Management and Introduction to Ethical Hacking'
    ]
  },
  {
    slug: 'vr-ar-game-development',
    title: 'VR/AR and Game Development',
    category: 'Development',
    duration: 'Self-paced',
    page: '#',
    apply: '#',
    overview: 'Create immersive experiences with Unity VR, HoloLens mixed reality, augmented reality for business, and Phaser.js game development.',
    outcomes: [
      'Exploring Virtual Reality and Creating VR Apps with Unity',
      'Android Cardboard, Google VR and Unreal',
      'HoloLens: Mixed Reality Toolkit, Eye-tracking and Voice Commands',
      'Augmented Reality in Business',
      'Game Development with Phaser.js'
    ]
  },
  {
    slug: 'devops',
    title: 'DevOps',
    category: 'DevOps & Cloud',
    duration: 'Self-paced',
    page: '#',
    apply: '#',
    overview: 'Master the core DevOps skills, tools, platforms, and operations practices behind modern delivery pipelines.',
    outcomes: [
      'Core DevOps Skills',
      'Core DevOps Tools',
      'DevOps Platforms and Operations'
    ]
  },
  {
    slug: 'design-thinking',
    title: 'Design Thinking',
    category: 'Design & Innovation',
    duration: '05 hours, 09 minutes',
    page: 'https://degreeplus.in/skillsoft_latest_new/design-thinking/',
    apply: 'https://degreeplus.in/SPPU-Online/skillsoft/?courseId=22',
    overview: 'Learn design-thinking processes for creative problem solving, covering iteration, UX design, and customer delight.',
    outcomes: [
      'Learn Design Thinking: Iteration',
      'UI and UX Design: Novice to Professional',
      'Delighting Customers with Design Thinking',
      'Communication Essentials'
    ]
  },
  {
    slug: 'business-skills',
    title: 'Business Skills',
    category: 'Business & Finance',
    duration: '08 hours, 21 minutes',
    page: 'https://degreeplus.in/skillsoft_latest_new/business-skills/',
    apply: 'https://degreeplus.in/SPPU-Online/skillsoft/?courseId=23',
    overview: 'Develop workplace-ready business skills spanning Excel, data analysis, design thinking, creativity, problem solving, and communication.',
    outcomes: [
      'Microsoft Excel and Analyzing Data in Excel',
      'Design Thinking for Innovation and Creative Genius',
      'Problem Solving: Defining Problems and Generating Solutions',
      'Accounting, Marketing and Office 365 Essentials',
      'Emotional Intelligence and Project Manager Essentials'
    ]
  },
  {
    slug: 'ai-architect',
    title: 'AI Architect',
    category: 'AI',
    duration: 'Self-paced',
    page: '#',
    apply: '#',
    overview: 'Follow the AI Apprentice to AI Architect journey and grow from AI foundations into solution architecture.',
    outcomes: [
      'AI Apprentice to AI Architect'
    ]
  },
  {
    slug: 'fintech',
    title: 'FinTech',
    category: 'Business & Finance',
    duration: '13 hours, 50 minutes',
    page: 'https://degreeplus.in/skillsoft_latest_new/fintech/',
    apply: 'https://degreeplus.in/SPPU-Online/skillsoft/?courseId=25',
    overview: 'Explore blockchain, digital currency, DevOps automation, and AI/ML as applied to modern financial technology.',
    outcomes: [
      'Exploring Blockchain, Blockchain in Action and IoT',
      'Developing with Blockchain and Transforming Your Business',
      'Ethereum: Transactions, Mining and Smart Contracts',
      'Hyperledger Fabric, Digital Currency and Bitcoin Fundamentals',
      'DevOps, RPA, IT Automation, AI/ML and SRE Essentials'
    ]
  },
  {
    slug: 'banking-and-finance',
    title: 'Banking and Finance',
    category: 'Business & Finance',
    duration: '26 hours, 38 minutes',
    page: 'https://degreeplus.in/skillsoft_latest/banking-and-finance/',
    apply: 'https://degreeplus.in/SPPU-Online/skillsoft/?courseId=26',
    overview: 'Build finance and banking expertise from accounting and budgeting fundamentals to AI applications in finance.',
    outcomes: [
      'Finance Essentials, Finance and Budgeting',
      'Excel Basics, Risk Management and Data Basics',
      'Financial Statements, Recording and Balancing the Books',
      'AI in Finance and AI-Fueled Intelligent Automation'
    ]
  },
  {
    slug: 'genai-cloud-odyssey',
    title: 'The Generative AI Cloud Odyssey',
    category: 'DevOps & Cloud',
    duration: 'Self-paced',
    page: '#',
    apply: '#',
    overview: 'Take generative AI to the cloud: build intelligent and creative solutions across AWS, Azure, and GCP.',
    outcomes: [
      'Demystifying Generative AI',
      'Generative AI on AWS: Building Intelligent and Creative Solutions',
      'Generative AI on Azure: Building Intelligent and Creative Solutions',
      'Generative AI on GCP: Building Intelligent and Creative Solutions'
    ]
  }
]

export const SKILLSOFT_COURSES = rawCourses.map((course, i) => ({
  ...course,
  image: `/course-images/IMG${(i % 25) + 1}.jpg`
}))

export const SKILLSOFT_CATEGORIES = [
  'All',
  'AI',
  'Data & Analytics',
  'Development',
  'DevOps & Cloud',
  'Cybersecurity',
  'Business & Finance',
  'Design & Innovation'
]

/** The 38 Part-A domains from the source workbook — content families behind the tracks above. */
export const SKILLSOFT_DOMAINS = [
  'Gen AI Basics',
  'AI & ML Algorithms - I',
  'Applied ML',
  'Blockchain Basics',
  'Blockchain Applications - I',
  'Blockchain Applications - II',
  'Fintech Foundations',
  'Fintech Risk Management',
  'Communication',
  'Negotiation',
  'Business Analytics Foundations',
  'Business Analytics Tools',
  'Visual Analytics and Reporting',
  'Data Science Fundamentals',
  'Data Analysis with Python',
  'Data Visualization with R',
  'Data Science Applications',
  'Design Thinking Overview',
  'User Experience Research and Design',
  'Graphic Design Elements for Non-Designers',
  'Graphic Design',
  'Video Content Development',
  'Multimedia Content Creation',
  'Foundations of Digital Marketing - I',
  'Introduction to Social Media Marketing',
  'Foundations of Digital Marketing - II',
  'Social Media Management',
  'Advertising and Campaign Management',
  'Entrepreneurship Basics',
  'Innovative Businesses',
  'Strategic Innovation',
  'Qualitative Research',
  'Quantitative Research',
  'Programming for Problem Solving',
  'Object-Oriented Programming using C++',
  'Java Programming',
  'Foundations of Project Management',
  'Fundamentals of Psychology'
]

