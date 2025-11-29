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
    
    // ========== FOUNDATION BRANCH (LEFT SIDE) ==========
    {
        id: 'data_structures_98',
        title: '98 in Data Structures',
        description: 'Achieved 98% grade in Data Structures/Algorithms',
        itemType: 'book',
        x: 200,
        y: 450,
        unlocked: true,
        dependencies: ['start']
    },
    {
        id: 'foundations_python',
        title: 'Python Foundation',
        description: 'Mastered foundations in Python',
        itemType: 'sword',
        x: 200,
        y: 650,
        unlocked: true,
        dependencies: ['data_structures_98']
    },
    {
        id: 'foundations_java',
        title: 'Java Foundation',
        description: 'Mastered foundations in Java',
        itemType: 'sword',
        x: 0,
        y: 650,
        unlocked: true,
        dependencies: ['data_structures_98']
    },
    {
        id: 'foundations_c',
        title: 'C Foundation',
        description: 'Mastered foundations in C',
        itemType: 'sword',
        x: 400,
        y: 650,
        unlocked: true,
        dependencies: ['data_structures_98']
    },
    {
        id: 'first_python_project',
        title: 'First Python Project',
        description: 'Completed first Python project for analyzing code security vulnerabilities',
        itemType: 'star',
        x: 200,
        y: 850,
        unlocked: true,
        dependencies: ['foundations_python']
    },
    {
        id: 'move_atlanta',
        title: 'Move to Atlanta',
        description: 'Moved from Powder Springs to Atlanta',
        itemType: 'rocket',
        x: 400,
        y: 850,
        unlocked: true,
        dependencies: ['foundations_python']
    },
    {
        id: 'git_mastery',
        title: 'Git Mastery',
        description: 'Mastered Git/Version Control through various group projects',
        itemType: 'sword',
        x: 0,
        y: 850,
        unlocked: true,
        dependencies: ['foundations_java']
    },
    {
        id: 'join_programming_club',
        title: 'Join Programming Club',
        description: 'Joined PROGGSU Programming Club',
        itemType: 'star',
        x: 200,
        y: 1050,
        unlocked: true,
        dependencies: ['first_python_project']
    },
    {
        id: 'join_barbell_club',
        title: 'Join Barbell Club',
        description: 'Joined GSU Barbell Club',
        itemType: 'weight',
        x: 0,
        y: 1050,
        unlocked: true,
        dependencies: ['git_mastery']
    },
    // Programming Club branch
    {
        id: 'gsu_coders_meetings',
        title: 'GSU Coders Meetings',
        description: 'Holding meetings for GSU coders',
        itemType: 'book',
        x: 100,
        y: 1250,
        unlocked: true,
        dependencies: ['join_programming_club']
    },
    {
        id: 'industry_events',
        title: 'Industry Events',
        description: 'Organized events for Industry professionals',
        itemType: 'trophy',
        x: 300,
        y: 1250,
        unlocked: true,
        dependencies: ['join_programming_club']
    },
    {
        id: 'plan_hackathon',
        title: 'Plan Hackathon',
        description: 'Planning a hackathon with PROGGSU',
        itemType: 'lightbulb',
        x: 200,
        y: 1450,
        unlocked: false,
        dependencies: ['gsu_coders_meetings', 'industry_events']
    },
    // Barbell Club branch
    {
        id: 'barbell_president',
        title: 'Barbell Club President',
        description: 'Achieved President of GSU Barbell Club',
        itemType: 'trophy',
        x: 0,
        y: 1250,
        unlocked: true,
        dependencies: ['join_barbell_club']
    },
    {
        id: 'plan_weightlift_off',
        title: 'Plan Weightlift Off',
        description: 'Planning a Weightlift Off competition',
        itemType: 'weight',
        x: 0,
        y: 1450,
        unlocked: false,
        dependencies: ['barbell_president']
    },
    
    // ========== TECH DEPTH BRANCH (RIGHT SIDE) ==========
    {
        id: 'flutter_mobile_app',
        title: 'First Mobile App',
        description: 'Developed first mobile app with Flutter/Dart',
        itemType: 'star',
        x: 1800,
        y: 450,
        unlocked: true,
        dependencies: ['start']
    },
    {
        id: 'quizlet_clone',
        title: 'Full Stack Web App',
        description: 'Engineered full stack deployed web app - Quizlet clone with GenAI capabilities for flashcard creation',
        itemType: 'rocket',
        x: 1800,
        y: 650,
        unlocked: true,
        dependencies: ['flutter_mobile_app']
    },
    {
        id: 'docker_aws_deploy',
        title: 'Containerized Deployment',
        description: 'Containerized a web app using Docker and deployed through AWS EC2',
        itemType: 'star',
        x: 1800,
        y: 850,
        unlocked: true,
        dependencies: ['quizlet_clone']
    },
    {
        id: 'database_system',
        title: 'Database Management System',
        description: 'Designed full stack database management system',
        itemType: 'book',
        x: 1800,
        y: 1050,
        unlocked: true,
        dependencies: ['docker_aws_deploy']
    },
    // Data Engineering achievements stemming from database system
    {
        id: 'data_engineering_1',
        title: 'Data Pipeline Design',
        description: 'Designed efficient data pipelines',
        itemType: 'rocket',
        x: 1600,
        y: 1250,
        unlocked: true,
        dependencies: ['database_system']
    },
    {
        id: 'data_engineering_2',
        title: 'Data Processing Optimization',
        description: 'Optimized large-scale data processing',
        itemType: 'star',
        x: 1800,
        y: 1250,
        unlocked: true,
        dependencies: ['database_system']
    },
    {
        id: 'data_engineering_3',
        title: 'Data Architecture',
        description: 'Architected scalable data solutions',
        itemType: 'sword',
        x: 2000,
        y: 1250,
        unlocked: true,
        dependencies: ['database_system']
    },
    
    // ========== INTERNSHIPS/WORK BRANCH (CENTER/DOWN) ==========
    {
        id: 'first_internship',
        title: 'First Internship',
        description: 'Landing my first internship through a connection made at a restaurant',
        itemType: 'briefcase',
        x: 1000,
        y: 650,
        unlocked: true,
        dependencies: ['data_structures_98']
    },
    {
        id: 'clinic_website',
        title: 'Clinic Website Redesign',
        description: 'Made connection with clinic owner that needed website redesign',
        itemType: 'sword',
        x: 1000,
        y: 850,
        unlocked: true,
        dependencies: ['first_internship']
    },
    {
        id: 'ursim_cofounder',
        title: 'Co-Found UrSim',
        description: 'Made a friend who liked sports as much as I did - now cofounding UrSim DFS sports optimizer web app',
        itemType: 'rocket',
        x: 1000,
        y: 1050,
        unlocked: true,
        dependencies: ['clinic_website']
    }
];
