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
        title: '100 in Data Structures',
        description: 'Achieved 100% grade in Data Structures/Algorithms',
        itemType: 'enchanted_book',
        x: 1500,
        y: 200,
        unlocked: true,
        dependencies: ['start']
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
        id: 'modernized_homeowner_systems',
        title: 'Deploy 1st HOA Portal',
        description: 'Deployed first HOA Portal',
        itemType: 'ender_chest',
        x: 1400,
        y: 500,
        unlocked: true,
        dependencies: ['first_internship']
    },
    {
        id: 'lease_renewal_eda',
        title: 'Lease Renewal EDA',
        description: 'Lease Renewal EDA',
        itemType: 'filled_map',
        x: 1700,
        y: 500,
        unlocked: true,
        dependencies: ['modernized_homeowner_systems']
    },
    {
        id: 'major_data_migration',
        title: 'Major Data Migration',
        description: 'Major Data Migration',
        itemType: 'hopper',
        x: 2000,
        y: 500,
        unlocked: true,
        dependencies: ['lease_renewal_eda']
    },
    {
        id: 'deploy_5_hoa_portals',
        title: '5 HOA Portals',
        description: 'Deployed 5 HOA Portals',
        itemType: 'ender_chest',
        x: 1600,
        y: 300,
        unlocked: true,
        dependencies: ['modernized_homeowner_systems']
    },
    {
        id: 'reached_1000_homes',
        title: 'Reached 1000 Homes',
        description: 'Reached 1000 Homes',
        itemType: 'emerald_block',
        x: 1800,
        y: 300,
        unlocked: true,
        dependencies: ['deploy_5_hoa_portals']
    },
    {
        id: 'clinic_website',
        title: 'Second Opportunity',
        description: 'Second opportunity',
        itemType: 'ender_pearl',
        x: 1000,
        y: 700,
        unlocked: true,
        dependencies: ['first_internship']
    },
    {
        id: 'second_opportunity',
        title: 'Redesign Legacy Website',
        description: 'Redesign Legacy Website',
        itemType: 'book',
        x: 1500,
        y: 700,
        unlocked: true,
        dependencies: ['clinic_website']
    },
    {
        id: 'modernized_website_analytics',
        title: 'Enhanced Google Analytics',
        description: 'Enhanced Google Analytics',
        itemType: 'comparator',
        x: 1900,
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
        id: 'optimized_dfs_lineups',
        title: 'Optimized DFS Lineups',
        description: 'Optimized DFS Lineups',
        itemType: 'emerald_block',
        x: 1200,
        y: 900,
        unlocked: true,
        dependencies: ['ursim_cofounder']
    },
    {
        id: 'reach_1000_users',
        title: 'Reach 1000 Users',
        description: 'Grow UrSim to reach 1000 active users',
        itemType: 'emerald_block',
        x: 1400,
        y: 900,
        unlocked: false,
        dependencies: ['optimized_dfs_lineups']
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
