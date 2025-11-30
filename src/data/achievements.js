export const achievements = [
    // START - Root achievement (centered at top)
    {
        id: 'start',
        title: 'Get Into College',
        description: 'Started your journey at college',
        itemType: 'diploma',
        x: 1000,
        y: 200,
        unlocked: true,
        dependencies: [] // Root achievement
    },
    
    // ========== CLUBS/FUN ACHIEVEMENTS PATH (LEFT SIDE) ==========
    {
        id: 'move_atlanta',
        title: 'Move to Atlanta',
        description: 'Moved from Powder Springs to Atlanta',
        itemType: 'rocket',
        x: 200,
        y: 450,
        unlocked: true,
        dependencies: ['start']
    },
    {
        id: 'join_programming_club',
        title: 'Join Programming Club',
        description: 'Joined PROGGSU Programming Club',
        itemType: 'star',
        x: 0,
        y: 650,
        unlocked: true,
        dependencies: ['move_atlanta']
    },
    {
        id: 'join_barbell_club',
        title: 'Join Barbell Club',
        description: 'Joined GSU Barbell Club',
        itemType: 'weight',
        x: 300,
        y: 650,
        unlocked: true,
        dependencies: ['move_atlanta']
    },
    {
        id: 'win_ga_states_usapl',
        title: 'Winning GA States USAPL Championship',
        description: 'Won the Georgia State USAPL Powerlifting Championship',
        itemType: 'trophy',
        x: 600,
        y: 650,
        unlocked: true,
        dependencies: ['join_barbell_club']
    },
    {
        id: 'deadlift_650',
        title: 'Deadlift 650 lbs',
        description: 'Achieved a 650 lb deadlift',
        itemType: 'weight',
        x: 600,
        y: 850,
        unlocked: true,
        dependencies: ['win_ga_states_usapl']
    },
    {
        id: 'bench_405',
        title: 'Benching 405',
        description: 'Achieved a 405 lb bench press',
        itemType: 'weight',
        x: 600,
        y: 1050,
        unlocked: false,
        dependencies: ['deadlift_650']
    },
    // Programming Club branch
    {
        id: 'industry_events',
        title: 'Industry Events',
        description: 'Organized events for Industry professionals',
        itemType: 'beacon',
        x: 150,
        y: 850,
        unlocked: true,
        dependencies: ['join_programming_club']
    },
    {
        id: 'plan_hackathon',
        title: 'Plan Hackathon',
        description: 'Planning a hackathon with PROGGSU',
        itemType: 'lightbulb',
        x: 0,
        y: 1050,
        unlocked: false,
        dependencies: ['industry_events']
    },
    // Barbell Club branch
    {
        id: 'barbell_president',
        title: 'Barbell Club President',
        description: 'Achieved President of GSU Barbell Club',
        itemType: 'trophy',
        x: 400,
        y: 850,
        unlocked: true,
        dependencies: ['join_barbell_club']
    },
    {
        id: 'plan_weightlift_off',
        title: 'Plan Weightlift Off',
        description: 'Planning a Weightlift Off competition',
        itemType: 'weight',
        x: 400,
        y: 1050,
        unlocked: false,
        dependencies: ['barbell_president']
    },
    
    // ========== SCHOOL WORK & PROJECTS PATH (RIGHT SIDE) ==========
    {
        id: 'data_structures_98',
        title: '98 in Data Structures',
        description: 'Achieved 98% grade in Data Structures/Algorithms',
        itemType: 'enchanted_book',
        x: 1500,
        y: 450,
        unlocked: true,
        dependencies: ['start']
    },
    
    // Horizontal branch from Data Structures (left to right)
    {
        id: 'git_master',
        title: 'Git Master',
        description: 'Mastered Git version control',
        itemType: 'sword',
        x: 2000,
        y: 450,
        unlocked: true,
        dependencies: ['data_structures_98']
    },
    {
        id: 'python_foundation',
        title: 'Python Foundation',
        description: 'Mastered foundations in Python',
        itemType: 'book',
        x: 2500,
        y: 450,
        unlocked: true,
        dependencies: ['data_structures_98']
    },
    {
        id: 'java_foundation',
        title: 'Java Foundation',
        description: 'Mastered foundations in Java',
        itemType: 'book',
        x: 3000,
        y: 450,
        unlocked: true,
        dependencies: ['data_structures_98']
    },
    {
        id: 'sql_database',
        title: 'SQL/Database',
        description: 'Mastered SQL and database fundamentals',
        itemType: 'chest',
        x: 3500,
        y: 450,
        unlocked: true,
        dependencies: ['data_structures_98']
    },
    {
        id: 'cpp_foundation',
        title: 'C/C++ Foundation',
        description: 'Mastered foundations in C/C++',
        itemType: 'book',
        x: 4000,
        y: 450,
        unlocked: true,
        dependencies: ['data_structures_98']
    },
    {
        id: 'cloud_deployment_foundations',
        title: 'Cloud/Deployment Foundations',
        description: 'Mastered cloud computing and deployment fundamentals',
        itemType: 'beacon',
        x: 4500,
        y: 450,
        unlocked: true,
        dependencies: ['data_structures_98']
    },
    {
        id: 'containerization',
        title: 'Containerization',
        description: 'Mastered containerization fundamentals',
        itemType: 'shulker_box',
        x: 5000,
        y: 450,
        unlocked: true,
        dependencies: ['data_structures_98']
    },
    
    // Below Python Foundation (going down)
    {
        id: 'django_quizlet_app',
        title: 'Django GenAI Quizlet App',
        description: 'Built Django Quizlet app with GenAI capabilities',
        itemType: 'enchanted_book',
        x: 2500,
        y: 650,
        unlocked: true,
        dependencies: ['python_foundation']
    },
    {
        id: 'flask_fastapi_mastery',
        title: 'Flask/FastAPI Mastery',
        description: 'Mastered Flask and FastAPI frameworks',
        itemType: 'brewing_stand',
        x: 2500,
        y: 850,
        unlocked: true,
        dependencies: ['django_quizlet_app']
    },
    {
        id: 'ml_dl_master',
        title: 'Machine/Deep Learning Master',
        description: 'Mastered machine learning with TensorFlow, PyTorch, and scikit-learn',
        itemType: 'redstone_lamp',
        x: 2500,
        y: 1050,
        unlocked: true,
        dependencies: ['flask_fastapi_mastery']
    },
    {
        id: 'python_mastery',
        title: 'Python Mastery',
        description: 'Achieved mastery in Python programming',
        itemType: 'diamond',
        x: 2500,
        y: 1250,
        unlocked: true,
        dependencies: ['ml_dl_master']
    },
    
    // Below Java Foundation (going down)
    {
        id: 'html_css',
        title: 'HTML/CSS',
        description: 'Mastered HTML and CSS',
        itemType: 'diploma',
        x: 3000,
        y: 650,
        unlocked: true,
        dependencies: ['java_foundation']
    },
    {
        id: 'typescript_master',
        title: 'TypeScript Master',
        description: 'Mastered TypeScript programming language',
        itemType: 'enchanted_book',
        x: 3200,
        y: 650,
        unlocked: true,
        dependencies: ['html_css']
    },
    {
        id: 'react_express',
        title: 'React.JS/Express.JS',
        description: 'Mastered React.js and Express.js frameworks',
        itemType: 'lightbulb',
        x: 3000,
        y: 850,
        unlocked: true,
        dependencies: ['html_css']
    },
    {
        id: 'restful_api',
        title: 'RestfulAPI',
        description: 'Mastered RESTful API design and development',
        itemType: 'comparator',
        x: 3000,
        y: 1050,
        unlocked: true,
        dependencies: ['react_express']
    },
    {
        id: 'spring_framework',
        title: 'Spring Framework',
        description: 'Mastered Spring Framework',
        itemType: 'poppy',
        x: 3000,
        y: 1250,
        unlocked: true,
        dependencies: ['restful_api']
    },
    {
        id: 'java_javascript_master',
        title: 'Java/JavaScript Master',
        description: 'Achieved mastery in both Java and JavaScript',
        itemType: 'diamond_sword',
        x: 3000,
        y: 1450,
        unlocked: true,
        dependencies: ['spring_framework']
    },
    
    // Below C/C++ (going down)
    {
        id: 'linux_unix_foundations',
        title: 'Linux/Unix Foundations',
        description: 'Mastered Linux and Unix system foundations',
        itemType: 'command_block',
        x: 4000,
        y: 650,
        unlocked: true,
        dependencies: ['cpp_foundation']
    },
    {
        id: 'oop',
        title: 'OOP',
        description: 'Mastered Object-Oriented Programming principles',
        itemType: 'enchanted_book',
        x: 4000,
        y: 850,
        unlocked: true,
        dependencies: ['linux_unix_foundations']
    },
    {
        id: 'build_3d_game_cpp',
        title: 'Build a Deployable 3D Game using C/C++',
        description: 'Built and deployed a 3D game using C/C++',
        itemType: 'command_block',
        x: 4000,
        y: 1050,
        unlocked: false,
        dependencies: ['oop']
    },
    
    // Below Cloud/Deployment Foundations (going down)
    {
        id: 'dart_flutter_firebase',
        title: 'Dart/Flutter Firebase Fundamentals',
        description: 'Mastered Dart, Flutter, and Firebase fundamentals',
        itemType: 'blaze_powder',
        x: 4500,
        y: 650,
        unlocked: true,
        dependencies: ['cloud_deployment_foundations']
    },
    {
        id: 'firebase',
        title: 'Firebase',
        description: 'Mastered Firebase platform',
        itemType: 'blaze_rod',
        x: 4500,
        y: 850,
        unlocked: true,
        dependencies: ['dart_flutter_firebase']
    },
    {
        id: 'gcs_google_deployment',
        title: 'GCS/Google Deployment',
        description: 'Mastered Google Cloud Storage and deployment',
        itemType: 'end_crystal',
        x: 4500,
        y: 1050,
        unlocked: true,
        dependencies: ['firebase']
    },
    {
        id: 'aws_mastery',
        title: 'AWS (EC2, Lambda, Redshift)',
        description: 'Mastered AWS services including EC2, Lambda, and Redshift',
        itemType: 'beacon',
        x: 4500,
        y: 1250,
        unlocked: true,
        dependencies: ['gcs_google_deployment']
    },
    {
        id: 'deploy_ursim_aws',
        title: 'Deploying UrSim With AWS',
        description: 'Deployed UrSim application using AWS',
        itemType: 'end_crystal',
        x: 4500,
        y: 1450,
        unlocked: false,
        dependencies: ['aws_mastery']
    },
    
    // Below Containerization (going down)
    {
        id: 'docker',
        title: 'Docker',
        description: 'Mastered Docker containerization',
        itemType: 'shulker_box',
        x: 5000,
        y: 650,
        unlocked: true,
        dependencies: ['containerization']
    },
    {
        id: 'kubernetes',
        title: 'Kubernetes',
        description: 'Mastered Kubernetes orchestration',
        itemType: 'end_crystal',
        x: 5000,
        y: 850,
        unlocked: true,
        dependencies: ['docker']
    },
    
    // Below SQL/Database (going down)
    {
        id: 'data_visualization_master',
        title: 'Data Visualization Master',
        description: 'Mastered data visualization techniques',
        itemType: 'filled_map',
        x: 3500,
        y: 650,
        unlocked: true,
        dependencies: ['sql_database']
    },
    {
        id: 'postgresql',
        title: 'PostgreSQL',
        description: 'Mastered PostgreSQL database',
        itemType: 'ender_chest',
        x: 3500,
        y: 850,
        unlocked: true,
        dependencies: ['data_visualization_master']
    },
    {
        id: 'etl_pipelines',
        title: 'ETL Pipelines',
        description: 'Mastered ETL pipeline design and implementation',
        itemType: 'hopper',
        x: 3500,
        y: 1050,
        unlocked: true,
        dependencies: ['postgresql']
    },
    {
        id: 'big_data_warehousing',
        title: 'Big Data/Data Warehousing',
        description: 'Mastered big data processing and data warehousing',
        itemType: 'ender_chest',
        x: 3500,
        y: 1250,
        unlocked: true,
        dependencies: ['etl_pipelines']
    },
    {
        id: 'apache_spark_kafka',
        title: 'Apache Spark/Kafka',
        description: 'Mastered Apache Spark and Kafka',
        itemType: 'repeater',
        x: 3500,
        y: 1450,
        unlocked: true,
        dependencies: ['big_data_warehousing']
    },
    {
        id: 'ml_researcher',
        title: 'Machine Learning Researcher',
        description: 'Became a machine learning researcher',
        itemType: 'nether_star',
        x: 3500,
        y: 1650,
        unlocked: true,
        dependencies: ['apache_spark_kafka']
    },
    
    // ========== INTERNSHIPS/EXPERIENCE PATH (CENTER/DOWN) ==========
    {
        id: 'first_internship',
        title: 'First Internship',
        description: 'Landing my first internship through a connection made at a restaurant',
        itemType: 'leather',
        x: 1000,
        y: 500,
        unlocked: true,
        dependencies: ['start']
    },
    {
        id: 'clinic_website',
        title: 'Random Connect',
        description: 'Met a random person and within 24 hours started building profit-oriented software',
        itemType: 'ender_pearl',
        x: 1000,
        y: 700,
        unlocked: true,
        dependencies: ['first_internship']
    },
    {
        id: 'modernized_website_analytics',
        title: 'Modernized Website and Data Analytics',
        description: 'Modernized website and implemented data analytics solutions',
        itemType: 'redstone_lamp',
        x: 1500,
        y: 700,
        unlocked: true,
        dependencies: ['clinic_website']
    },
    {
        id: 'ursim_cofounder',
        title: 'Co-Found UrSim',
        description: 'Made a friend who liked sports as much as I did - now cofounding UrSim DFS sports optimizer web app',
        itemType: 'ender_eye',
        x: 1000,
        y: 900,
        unlocked: true,
        dependencies: ['clinic_website']
    },
    {
        id: 'reach_1000_users',
        title: 'Reach 1000 Users',
        description: 'Grow UrSim to reach 1000 active users',
        itemType: 'emerald_block',
        x: 1200,
        y: 900,
        unlocked: false,
        dependencies: ['ursim_cofounder']
    },
    {
        id: 'winning_emory_hacks',
        title: 'Winning Emory Hacks',
        description: 'Won the Emory Hackathon competition',
        itemType: 'trophy',
        x: 1000,
        y: 1100,
        unlocked: true,
        dependencies: ['ursim_cofounder']
    },
    {
        id: 'incoming_teaching_assistant',
        title: 'Incoming Teaching Assistant',
        description: 'Became a teaching assistant for computer science courses',
        itemType: 'book',
        x: 1000,
        y: 1300,
        unlocked: true,
        dependencies: ['winning_emory_hacks']
    },
    {
        id: 'teach_1000_students',
        title: 'Teach 1000 Students',
        description: 'Teach over 1000 students through TA positions',
        itemType: 'experience_bottle',
        x: 1000,
        y: 1500,
        unlocked: false,
        dependencies: ['incoming_teaching_assistant']
    },
    {
        id: 'win_3_hackathons',
        title: 'Win 3 Hackathons',
        description: 'Win three different hackathon competitions',
        itemType: 'trophy',
        x: 1300,
        y: 1100,
        unlocked: false,
        dependencies: ['winning_emory_hacks']
    },
    {
        id: 'win_faang_hackathon',
        title: 'Win an Online FAANG Hackathon',
        description: 'Win a hackathon hosted by a FAANG company',
        itemType: 'nether_star',
        x: 1300,
        y: 1300,
        unlocked: false,
        dependencies: ['win_3_hackathons']
    }
];
