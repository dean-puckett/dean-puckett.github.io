/*
  Site content lives in this file.
  To add a project: copy one object in PROJECTS, give it a unique `slug`,
  put its images in assets/img/ (a large .webp and a -sm.webp thumbnail),
  and fill in the fields. Order in this list = order on the home page.
  See CLAUDE.md for the full field reference.
*/

window.SITE = {
  name: "Dean Puckett",
  // Pick the color scheme: "forest", "xenon", "plume" or "blueprint".
  theme: "forest",
  // Shows the scheme picker in the corner. Turn off once you've chosen.
  showThemePicker: true,

  headline: "Mechanical engineering student at ASU who designs, analyzes, and builds hardware.",
  intro:
    "I'm a senior at Arizona State University in the accelerated B.S.E./M.S. program. My work spans fluid systems analysis for a student Hall Effect thruster, assistive devices built for real users, and research that puts CFD data into virtual reality.",

  facts: [
    { label: "GPA", value: "4.0" },
    { label: "B.S.E. Mechanical Engineering", value: "May 2027" },
    { label: "Accelerated M.S. Mechanical Engineering", value: "May 2028" },
    { label: "Work authorization", value: "U.S. citizen, ITAR eligible" }
  ],

  about: [
    "I grew up in the South Bay around helicopters, air shows, and family members who fly, so aerospace has been the goal for a long time. Right now that means propulsion: I run the fluids analysis for the Xenon feed system on ASU's student Hall Effect thruster.",
    "I like being the one holding the parts, not just drawing them. I learned CNC machining and the metal shop at ASU's Chandler Innovation Center, and I own a Bambu Lab 3D printer that I use constantly at home. Outside of engineering I play guitar, golf, hike, and play beach volleyball."
  ],

  skills: [
    { group: "Analysis and software", items: ["SOLIDWORKS", "ANSYS", "MATLAB", "Python", "C++", "C#", "Unity Game Engine", "VisIt - CFD Visualization Software", "Geometric Dimensioning and Tolerancing (GD&T)", "Excel"] },
    { group: "Fabrication", items: ["CNC machining", "Metal shop", "Carbon fiber 3D printing", "Rapid prototyping", "DFM", "Laser cutting"] }
  ],

  awards: [
    { title: "Innovation Team Award", detail: "ASU EPICS Generator Awards, Adaptive Snowboard", date: "May 2026" },
    { title: "Excellence Award", detail: "ASU EPICS Generator Awards, Wheels2Africa", date: "December 2024" },
    { title: "FURI Scholar", detail: "Fulton Undergraduate Research Initiative", date: "Spring 2025" },
    { title: "Dean's List", detail: "Every semester", date: "Fall 2023 to Spring 2026" }
  ],

  contactLine: "Open to networking and engineering opportunities.",

  contact: {
    email: "deanopuckett@gmail.com",
    phone: "(424) 744-1543",
    resume: "assets/docs/Dean_Puckett_Resume.pdf",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/deanpuckett/" },
      { label: "Instagram", href: "https://www.instagram.com/dean.puckett/" },
      { label: "FURI Research | ASU", href: "https://forge.engineering.asu.edu/participant/puckett-dean/" }
    ]
  }
};

// Filter buttons on the home page. Each project's `category` must match one `id`.
window.CATEGORIES = [
  { id: "team", label: "Teams" },
  { id: "research", label: "Research" },
  { id: "course", label: "Coursework" },
  { id: "startup", label: "Startup" },
  { id: "highschool", label: "High school" }
];

window.PROJECTS = [
  {
    slug: "experimental-propulsion-club",
    title: "Xenon Feed System for a Hall Effect Thruster",
    shortTitle: "Experimental Propulsion Club",
    blurb: "A student team building a Hall Effect thruster for a NASA vacuum chamber test. On the propulsion team, I run the fluids analysis for the Xenon feed system, and my MATLAB results led the team to resize the injector manifold holes.",
    category: "team",
    org: "Experimental Propulsion Club, ASU",
    role: "Propulsion Team Member",
    dates: "January 2026 to present",
    location: "Tempe, Arizona",
    type: "Student electric propulsion development",
    tags: ["Fluid systems", "MATLAB", "Excel", "SOLIDWORKS", "Tolerancing"],
    cover: { src: "assets/img/epc-thruster-print", pos: "50% 45%" },
    keyFigure: { value: "202.828 Pa", label: "Feed pressure the system has to hold at the injector manifold" },
    summary:
      "ASU's Experimental Propulsion Club is a student team designing and building a Hall Effect thruster, the kind of electric thruster deep-space satellites use for efficient, low-thrust maneuvering. The club works in propulsion, structures, electrical, thermal, and manufacturing sub-teams, and we're building toward a test in a NASA vacuum chamber.",
    did: [
      "Own the fluids analysis for the Xenon feed system: getting high-pressure Xenon from the storage tank, through a PRAXAIR 2010 high-purity pressure regulator and the plumbing, into the injector manifold.",
      "The system has to hold a calculated 202.828 Pa with a low, constant flow. I worked mass flow rate, pressure, and temperature through each segment of the line by hand and in Excel, then checked the hand numbers with a MATLAB model of the full line.",
      "I also model feed-system parts in SOLIDWORKS, help with tolerancing and design iteration, and work with the manufacturing and structures sub-teams on integration. I 3D printed thruster prototypes and support fabrication of parts for propulsion testing."
    ],
    outcome:
      "My results changed the hardware. The team resized the inlet holes on the injector manifold ahead of the vacuum chamber test.",
    learned:
      "Small numbers drive big decisions. A few holes in a manifold decide whether the thruster sees the flow it was designed for. The schedule was set by the test date, so I had to make sound assumptions, write them down, and check results quickly instead of waiting for perfect information.",
    media: [
      { type: "image", src: "assets/img/epc-thruster-print", caption: "3D printed prototype of the team's Hall Effect thruster design" },
      { type: "image", src: "assets/img/epc-regulator", caption: "PRAXAIR 2010 high-purity pressure regulator that sets the Xenon inlet pressure (manufacturer image)" },
      { type: "image", src: "assets/img/epc-logo", caption: "Experimental Propulsion Club logo" }
    ],
    galleries: [
      {
        title: "Injector manifold",
        text: "The three parts of the injector manifold, modeled in SOLIDWORKS. My MATLAB flow calculations changed the size of the holes in the manifold before the vacuum chamber test.",
        media: [
          { type: "image", src: "assets/img/epc-injector-1", caption: "Injector manifold, part 1 of 3" },
          { type: "image", src: "assets/img/epc-injector-2", caption: "Injector manifold, part 2 of 3" },
          { type: "image", src: "assets/img/epc-injector-3", caption: "Injector manifold, part 3 of 3" }
        ]
      }
    ],
    docs: []
  },
  {
    slug: "adaptive-snowboard",
    title: "Adaptive Snowboard Shock System",
    shortTitle: "Adaptive Snowboard",
    blurb: "An attachable shock system that takes landing loads off the hips and back of Zach Sherman, a bilateral above-the-knee amputee. As prototyping lead, I turned the design into hardware and led fabrication and testing.",
    category: "team",
    org: "EPICS, ASU",
    role: "Prototyping Lead",
    dates: "January 2026 to May 2026",
    location: "Tempe, Arizona",
    type: "Assistive technology design project",
    tags: ["Prototyping", "CNC machining", "Carbon fiber 3D printing", "SOLIDWORKS"],
    cover: { src: "assets/img/snowboard-shock-mount", pos: "50% 55%" },
    keyFigure: { value: "1 of 10", label: "Teams picked for the 2026 EPICS Prototype Showcase, where we won the Innovation Team Award" },
    summary:
      "An attachable shock system for the snowboard of our community partner, Zach Sherman, a bilateral above-the-knee amputee whose hips and back take the impact on every landing. The goal was a mechanical system that takes that load off his body and lets him ride with more stability.",
    did: [
      "Owned turning the team's design into hardware and led fabrication, assembly, and testing.",
      "3D printed the upper shock mounting assemblies in carbon fiber reinforced filament, and designed the bottom mounts to bolt into the board's existing binding screw holes, so nothing on the board changed permanently.",
      "Learned CNC machining, milling, and the metal shop at ASU's Chandler Innovation Center to build the rest: linear rods, bike shocks, an upper platform, and bearing assemblies.",
      "Ran build-test cycles in cold, wet conditions and fed every failure back into the next SOLIDWORKS revision. The May 2026 revision added a stiffer upper platform, custom mounting holes for better edge control, and updated lower mounts."
    ],
    outcome:
      "We presented to industry professionals and ASU faculty at the Spring 2026 Design Review. The team was one of ten selected for the 2026 EPICS Generator Awards Prototype Showcase, where we won the Innovation Team Award.",
    learned:
      "A design isn't finished until it can be built, and the shop teaches you things the CAD model won't. The hardest part was balancing strength, safety, and comfort for a real user, which meant changing parts I thought were done.",
    media: [
      { type: "image", src: "assets/img/snowboard-may-prototype", caption: "May 2026 final prototype: stiffer upper platform, custom mounting holes for edge control, updated lower mounts", wide: true },
      { type: "image", src: "assets/img/snowboard-shock-mount", caption: "Carbon fiber reinforced shock mount assembly bolted to the board" },
      { type: "image", src: "assets/img/snowboard-zach", caption: "Zach Sherman, our community partner" },
      { type: "image", src: "assets/img/snowboard-binding", caption: "Zach's original binding setup" },
      { type: "image", src: "assets/img/snowboard-design-review", caption: "The team after presenting at the Spring 2026 Design Review" },
      { type: "image", src: "assets/img/snowboard-award", caption: "Innovation Team Award, 2026 EPICS Generator Awards" }
    ],
    docs: [
      { label: "Project report (PDF)", href: "https://cc536514-0fd3-421d-ac86-4e877caa6aa5.filesusr.com/ugd/7c8256_a230ae0d2bc4466295e987b0ac269655.pdf" }
    ]
  },
  {
    slug: "wheels2africa",
    title: "Wheels2Africa Motorized Wheelchair Attachment",
    shortTitle: "Wheels2Africa",
    blurb: "A low-cost electric wheel that lets children with cerebral palsy in Johannesburg drive their own wheelchairs. As mechanical research lead, I designed the wheel frame and mount and presented the prototype in South Africa.",
    category: "team",
    org: "EPICS, ASU",
    role: "Mechanical Research Lead",
    dates: "January 2024 to December 2024",
    location: "Tempe, Arizona and Johannesburg, South Africa",
    type: "Humanitarian engineering",
    tags: ["Mechanical design", "Load path analysis", "Material selection", "Field testing"],
    cover: { src: "assets/img/w2a-prototype", pos: "50% 50%" },
    keyFigure: null,
    summary:
      "A rugged, low-cost electric wheel that attaches to a manual wheelchair, so children with cerebral palsy at The Con Amore School in Johannesburg, South Africa can move around on their own with a joystick, without needing someone to push them.",
    did: [
      "Led the mechanical design of the wheel frame and the mounting system, using load path analysis and material selection while keeping it simple to build with locally available materials.",
      "Designed the mount around a bar with welded male-to-female couplers that screw into the chair's existing axles and bolts. It tightens at both ends, fits a range of chair sizes, and needs no permanent changes to the chair.",
      "Worked with the electrical team on integration. We switched the bevel-gear steering from a BLDC motor to a stepper because its position was easier to track with our dual VESC controllers.",
      "Coordinated with our partner across a 9-hour time difference, often on 3 or 4 a.m. calls."
    ],
    outcome:
      "I traveled to Johannesburg and presented the working prototype at The Con Amore School and the University of Johannesburg, and gathered feedback from the people it was built for. The team won the Excellence Award at ASU's 2024 EPICS Generator Awards.",
    learned:
      "Designing for a real end user and their local environment changes every decision, from materials to how a part gets repaired. The project also pushed my communication and leadership across teams and across a 9-hour time difference.",
    media: [
      { type: "video", src: "assets/video/w2a-turning-test.mp4", poster: "assets/video/w2a-turning-test.jpg", caption: "Turning test with the prototype mounted on a manual wheelchair" },
      { type: "video", src: "assets/video/w2a-joystick-test.mp4", poster: "assets/video/w2a-joystick-test.jpg", caption: "Joystick control test, forward and backward" },
      { type: "image", src: "assets/img/w2a-con-amore", caption: "Presenting the prototype at The Con Amore School", wide: true },
      { type: "image", src: "assets/img/w2a-joburg-student", caption: "With a student at a grade school in Johannesburg" },
      { type: "image", src: "assets/img/w2a-award", caption: "Excellence Award, ASU 2024 EPICS Generator Awards" },
      { type: "image", src: "assets/img/w2a-team-fall24", caption: "Fall 2024 team after our design review" }
    ],
    docs: []
  },
  {
    slug: "furi-vr-cfd",
    title: "Virtual Reality Visualization of CFD Data",
    shortTitle: "FURI Research",
    blurb: "Research that puts layered CFD velocity data into virtual reality so 3D flow is easier to read. I automated the VisIt runs in Python and built the VR scene in Unity.",
    category: "research",
    org: "Fulton Undergraduate Research Initiative, ASU",
    role: "Undergraduate Researcher, mentor Dr. Mohamed Kasbaoui (SEMTE)",
    dates: "January 2025 to May 2025",
    location: "Tempe, Arizona",
    type: "Undergraduate research",
    tags: ["CFD", "Python", "VisIt", "Unity", "VR"],
    cover: { src: "assets/img/furi-vr", pos: "55% 40%" },
    keyFigure: null,
    summary:
      "CFD results usually live on 2D screens, which makes 3D flow structures hard to read. This project put layered CFD velocity data into an immersive VR environment to see if it makes flow behavior easier to understand.",
    did: [
      "Simulated fluid flow in VisIt to generate velocity contour data.",
      "Wrote Python scripts to automate the VisIt runs and extract the data.",
      "Imported the layered 3D data into Unity, mapping color, opacity, and position, and added VR viewing."
    ],
    outcome:
      "Layered 3D velocity contours ran in VR, linking simulation software with a game engine. I presented the poster at the Fulton Forge symposium to industry professionals and faculty.",
    learned:
      "Seeing the flow from the inside made abstract behavior click in a way 2D plots don't, with uses in aerospace design and engineering education.",
    media: [
      { type: "image", src: "assets/img/furi-vr", caption: "Testing layered CFD velocity data in VR", wide: true },
      { type: "image", src: "assets/img/furi-forge", caption: "Presenting at the Fulton Forge symposium" },
      { type: "image", src: "assets/img/furi-poster", caption: "Research poster presented at Fulton Forge", wide: true }
    ],
    docs: [
      { label: "Fulton Forge research page (ASU)", href: "https://forge.engineering.asu.edu/participant/puckett-dean/" }
    ]
  },
  {
    slug: "swing-arm-desk-lamp",
    title: "Swing Arm Desk Lamp",
    shortTitle: "Team Light Work",
    blurb: "A counterbalanced desk lamp on a spring-loaded parallelogram linkage. I modeled and simulated the linkage and springs in SOLIDWORKS and showed a factor of safety above 5.",
    category: "team",
    org: "MEE 342, Principles of Mechanical Design, ASU",
    role: "Team member (Team Light Work)",
    dates: "January 2026 to May 2026",
    location: "Tempe, Arizona",
    type: "Semester design project",
    tags: ["Linkage design", "Spring sizing", "SOLIDWORKS simulation", "Prototyping"],
    cover: { src: "assets/img/lamp-prototype", pos: "35% 50%" },
    keyFigure: { value: "FoS > 5", label: "Factor of safety on the critical parts, including the lower swing arm" },
    summary:
      "A counterbalanced desk lamp built on a parallelogram linkage of square hollow beams with double-shear joints. Tension springs offset the weight of the arms and head so the lamp moves easily and holds any position.",
    did: [
      "Modeled and simulated linkage lengths, spring constants (spring design k = 500 N/m), and component masses in SOLIDWORKS, designing for 6061 aluminum.",
      "Ran stress analysis on the critical parts, including the lower swing arm, and showed a factor of safety above 5.",
      "The prototype was 3D printed PLA and laser-cut MDF. The springs were too strong for the lighter parts and bowed the arms past 180 degrees, so we reduced the spring-peg spacing and thickened the MDF arms.",
      "The lighter base tipped at full extension, so we widened it and added counterweights."
    ],
    outcome:
      "A working lamp that holds position. Next iteration: adjustable spring pegs and a ball-and-socket head joint with a tightening screw.",
    learned:
      "The analysis has to match the materials you actually build with.",
    media: [
      { type: "image", src: "assets/img/lamp-prototype", caption: "The finished prototype next to the team poster" },
      { type: "image", src: "assets/img/lamp-poster", caption: "Team Light Work project poster", wide: true }
    ],
    docs: [
      { label: "Project report (PDF)", href: "https://cc536514-0fd3-421d-ac86-4e877caa6aa5.filesusr.com/ugd/7c8256_421e81f3a8db4a9aa5160cc84823ad8e.pdf" }
    ]
  },
  {
    slug: "c-class-shock-absorber",
    title: "C-Class Shock Absorber Assembly",
    shortTitle: "C-Class Shock Absorber",
    blurb: "A full SOLIDWORKS shock absorber assembly for a Mercedes C-Class. I modeled the core parts, cleared every interference, and produced the drawings and BOM.",
    category: "course",
    org: "MAE 214 (SOLIDWORKS), ASU",
    role: "Student Design Engineer (hypothetical client: Mercedes-Benz USA)",
    dates: "November 2024 to December 2024",
    location: "Tempe, Arizona",
    type: "CAD modeling and engineering drafting",
    tags: ["SOLIDWORKS", "Drawings", "BOM", "Assemblies"],
    cover: { src: "assets/img/shock-exploded", pos: "30% 50%" },
    keyFigure: null,
    summary:
      "A full shock absorber assembly for a Mercedes C-Class, from part models to a complete drawing package.",
    did: [
      "Modeled the core components from engineering specs and sourced off-the-shelf fasteners from McMaster-Carr.",
      "Built the assembly with mates for realistic movement and cleared every interference.",
      "Learned variable-pitch sweeps so the main spring flattens at both ends and seats correctly.",
      "Produced drawings for every custom part, plus the BOM, exploded views, cover sheets, and appendices."
    ],
    outcome: "A complete, interference-free assembly and documentation package.",
    learned: "Variable-pitch springs, interference detection, and advanced assembly mates, most of it through my own research and troubleshooting.",
    media: [
      { type: "image", src: "assets/img/shock-exploded", caption: "Exploded view and bill of materials", wide: true },
      { type: "image", src: "assets/img/shock-mcmaster", caption: "McMaster-Carr fasteners used in the assembly", wide: true }
    ],
    docs: [
      { label: "Drawing package (PDF)", href: "https://cc536514-0fd3-421d-ac86-4e877caa6aa5.filesusr.com/ugd/7c8256_1ad427fce24c4d6fb87248534aa5e150.pdf" }
    ]
  },
  {
    slug: "mechanical-accelerometer",
    title: "Mechanical Accelerometer",
    shortTitle: "Mechanical Accelerometer",
    blurb: "A purely mechanical accelerometer that reads -1.2g to +1.2g. As team lead, I took it from the physics to the build and calibrated it by testing.",
    category: "course",
    org: "Arizona State University",
    role: "Team Lead",
    dates: "January 2025 to March 2025",
    location: "Tempe, Arizona",
    type: "Applied mechanics and sensor design",
    tags: ["Dynamics", "Calibration", "Fabrication"],
    cover: { src: "assets/img/accel-top", pos: "50% 50%" },
    keyFigure: { value: "49.377 N/m", label: "Measured equivalent spring constant of the rubber band suspension" },
    summary:
      "A purely mechanical accelerometer that reads -1.2g to +1.2g inside a 1 cubic foot envelope.",
    did: [
      "Led the project from the physics to the build. A 151 g mass rides on a carriage with eight bearings, suspended by rubber bands.",
      "Measured the bands' equivalent spring constant at 49.377 N/m by hanging a known mass and applying k = F/x, then calibrated the gauge empirically.",
      "Built the wooden chassis by hand with a scroll saw, glue, and clamps, holding tight tolerances so the carriage rolls without binding."
    ],
    outcome: "A working instrument that reads 1.0g when held vertical.",
    learned: "Rubber bands aren't ideal springs, so calibration had to come from testing, not the formula.",
    media: [
      { type: "video", src: "assets/video/accel-demo.mp4", poster: "assets/video/accel-demo.jpg", caption: "Final prototype in action" },
      { type: "image", src: "assets/img/accel-top", caption: "Top view: the four top bearings and the front gauge" },
      { type: "image", src: "assets/img/accel-sketch", caption: "Inner and front views of the design", wide: true }
    ],
    docs: [
      { label: "Project report (PDF)", href: "https://cc536514-0fd3-421d-ac86-4e877caa6aa5.filesusr.com/ugd/7c8256_315b05a744a24a1295abf0ee38a5a39a.pdf" }
    ]
  },
  {
    slug: "tram-buggy",
    title: "T.R.A.M. Buggy: Autonomous Rescue Rover",
    shortTitle: "Robot Rescue: T.R.A.M. Buggy",
    blurb: "An autonomous four-wheel-drive buggy that maps simulated Martian terrain and signals for help if it flips. As team lead, I ran integration, wiring, and control logic on a $63 budget.",
    category: "course",
    org: "Arizona State University",
    role: "Team Lead",
    dates: "August 2023 to December 2023",
    location: "Tempe, Arizona",
    type: "Mechatronics and systems integration",
    tags: ["Arduino", "Mechatronics", "Systems integration", "AHP"],
    cover: { src: "assets/img/tram-prototype", pos: "50% 50%" },
    keyFigure: { value: "$63", label: "Total build budget" },
    summary:
      "An autonomous four-wheel-drive buggy that maps simulated Martian terrain and signals for help if it flips.",
    did: [
      "Chose the concept with an Analytic Hierarchy Process matrix across four options, weighting weather resistance and safety the most.",
      "Led integration, wiring, and control logic: Arduino Uno with an L293D motor driver, four DC gear motors, an IR sensor, and a tilt switch that triggers an LED distress signal.",
      "When the Bluetooth modules were delayed in shipping, we swapped the planned coordinate transmission for the tilt switch, which added rollover detection.",
      "Switched to dual 9V power when a single battery couldn't drive the motors and the Arduino together, and kept the build on budget."
    ],
    outcome: "A working prototype and a full technical report.",
    learned: "",
    media: [
      { type: "image", src: "assets/img/tram-prototype", caption: "Final prototype" },
      { type: "image", src: "assets/img/tram-sketch-screen", caption: "Initial design concept" },
      { type: "image", src: "assets/img/tram-sketch-chassis", caption: "Concept sketch of the chassis layout" },
      { type: "image", src: "assets/img/tram-budget", caption: "Final budget and materials list" }
    ],
    docs: [
      { label: "Technical report (PDF)", href: "https://cc536514-0fd3-421d-ac86-4e877caa6aa5.filesusr.com/ugd/7c8256_385c353dfd79494fa6cb3c99ffe3e7b8.pdf" }
    ]
  },
  {
    slug: "squeezedocs",
    title: "SqueezeDocs, Inc.",
    shortTitle: "SqueezeDocs",
    blurb: "An AI document-automation startup I co-founded. I write the product requirements and validate the AI workflows behind a HIPAA-compliant document pipeline.",
    category: "startup",
    org: "SqueezeDocs, Inc.",
    role: "Co-Founder",
    dates: "June 2026 to present",
    location: "",
    type: "AI document-automation startup",
    tags: ["Product requirements", "Test procedures", "AI workflows"],
    cover: { logo: "assets/img/squeezedocs-logo", label: "SqueezeDocs" },
    keyFigure: null,
    summary:
      "An AI document-automation startup I co-founded.",
    did: [
      "Write the feature scopes, product briefs, and engineering requirements that drive our development partner's build roadmap.",
      "Developed and validated AI workflows for document classification, extraction, and routing, defining test procedures and iterating on accuracy for a HIPAA-compliant pipeline."
    ],
    outcome: "",
    learned: "",
    media: [],
    docs: []
  },
  {
    slug: "wearable-tech",
    title: "The Future of Wearable Tech",
    shortTitle: "The Future of Wearable Tech",
    blurb: "A research concept for a sensor shirt and brain chip aimed at depression. As project lead, I guided the team's research and presented the poster.",
    category: "research",
    org: "Grand Challenges Scholars Program, ASU",
    role: "Project Lead",
    dates: "August 2023 to December 2023",
    location: "Tempe, Arizona",
    type: "Engineering research concept",
    tags: ["Research", "Biomedical concepts", "Poster presentation"],
    cover: { src: "assets/img/wearable-poster-event", pos: "50% 35%" },
    keyFigure: null,
    summary:
      "A research concept for wearable and neural technology aimed at depression: a nanosensor shirt powered by thermoelectric generators that records vital signs, sends them over Bluetooth to an emotion-regulating brain chip, which uses cloud computing and AI to help adjust dopamine levels.",
    did: [
      "Led the team through research across biomedical engineering, neuroscience, and human-computer interaction.",
      "Worked through cost and accessibility with production planning and affordable materials.",
      "Weighed the ethical issues, including digital security and the line between self and machine."
    ],
    outcome: "Presented the final poster to industry professionals, ASU faculty, and engineering peers.",
    learned: "",
    media: [
      { type: "image", src: "assets/img/wearable-poster", caption: "Final research poster", wide: true },
      { type: "image", src: "assets/img/wearable-poster-event", caption: "Poster presentation" }
    ],
    docs: []
  },
  {
    slug: "vex-robotics",
    title: "VEX Robotics, Team 62019S",
    shortTitle: "VEX Robotics",
    blurb: "A competition robot for the 2021-2022 Tipping Point game. As team lead and project manager, I ran the engineering cycle and designed a 4-bar linkage that lifts Mobile Goals.",
    category: "highschool",
    org: "Palos Verdes Institute of Technology",
    role: "Team Lead and Project Manager",
    dates: "August 2021 to May 2022",
    location: "Palos Verdes Peninsula, California",
    type: "Competitive robotics",
    tags: ["Linkage design", "Project management", "CAD"],
    cover: { src: "assets/img/vex-field", pos: "50% 50%" },
    keyFigure: null,
    summary:
      "Our team designed, built, and programmed a robot for the 2021-2022 Tipping Point game: collect and score rings on a 12 by 12 foot field, carry heavy Mobile Goals, and balance on a seesaw platform in the endgame.",
    did: [
      "Ran the full engineering cycle, coordinating students on CAD, fabrication, and autonomous programming, and kept the build on schedule for each event.",
      "Designed a 4-bar linkage that clamps and lifts Mobile Goals.",
      "Worked on chassis and mechanism placement to keep the robot from tipping while carrying goals, since each goal shifted the center of mass.",
      "Led quick fixes and rebuilds in the pit when designs failed during matches."
    ],
    outcome: "Led the team to state-wide competitions.",
    learned: "Clear communication, modular design, and a team that trusts each other matter most when things break between matches.",
    media: [
      { type: "image", src: "assets/img/vex-field", caption: "The Tipping Point field: Mobile Goals, rings, and the balancing platforms", wide: true }
    ],
    docs: []
  }
];
