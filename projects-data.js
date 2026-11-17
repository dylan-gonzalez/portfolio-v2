/**
 * Technical Projects & Companies Dataset
 * Dylan Gonzalez — Software Engineer
 * 
 * Adding or removing projects here automatically updates the count on index.html
 * ("See X more projects →") and populates projects.html.
 */

const COMPANIES_DATA = {
  'monash-nova-rover': {
    id: 'monash-nova-rover',
    name: 'Monash Nova Rover',
    shortName: 'Nova Rover',
    tagline: 'Planetary Rover Robotics Team • Monash University',
    logo: 'assets/logos/monash-nova-rover.png',
    description: 'Monash Nova Rover is a student-led robotics team at Monash University that designs, manufactures, and deploys next-generation autonomous Mars and lunar rovers.',
    locationSummary: 'Clayton, Victoria • Adelaide (ARC) • Utah (URC)',
    locations: [
      {
        id: 'clayton',
        name: 'Clayton, Victoria',
        tag: 'Team HQ & Robotics Lab',
        description: 'Monash University Clayton Campus — Rover design, assembly, and autonomous software development.',
        lat: -37.9105,
        lng: 145.1362,
        zoom: 14
      },
      {
        id: 'adelaide',
        name: 'Adelaide, South Australia',
        tag: 'Australian Rover Challenge (ARC)',
        description: 'University of Adelaide — Lunar mission simulations, autonomous obstacle navigation, and sample retrieval.',
        lat: -34.9197,
        lng: 138.6053,
        zoom: 13
      },
      {
        id: 'utah',
        name: 'Hanksville, Utah, USA',
        tag: 'University Rover Challenge (URC)',
        description: 'Mars Desert Research Station (MDRS) — Extreme Martian analog terrain competition against top world teams.',
        lat: 38.4064,
        lng: -110.7924,
        zoom: 11
      }
    ]
  },

  'relativity-engineering': {
    id: 'relativity-engineering',
    name: 'Relativity Engineering',
    shortName: 'Relativity Engineering',
    tagline: 'Automotive Electronics & Safety-Critical Firmware',
    logo: 'assets/logos/relativity-engineering.svg',
    description: 'Relativity Engineering is a high-performance automotive electronics and embedded systems consultancy located in Drysdale on the Bellarine Peninsula, Victoria.',
    locationSummary: 'Drysdale, Victoria',
    locations: [
      {
        id: 'drysdale',
        name: 'Drysdale, Victoria',
        tag: 'Headquarters & Engineering Lab',
        description: 'Drysdale, Bellarine Peninsula, Victoria — Automotive ECU design, CAN reverse-engineering, and vehicle staging facility.',
        lat: -38.1670,
        lng: 144.5730,
        zoom: 13
      }
    ]
  },

  'mcav': {
    id: 'mcav',
    name: 'Monash Connected Autonomous Vehicle (MCAV)',
    shortName: 'MCAV',
    tagline: 'Autonomous Vehicle Engineering Team • Monash University',
    logo: 'assets/logos/mcav.png',
    description: 'Monash Connected Autonomous Vehicle (MCAV) is Monash University\'s premier student engineering team developing full-scale self-driving electric vehicle platforms.',
    locationSummary: 'Clayton, Victoria',
    locations: [
      {
        id: 'clayton',
        name: 'Clayton, Victoria',
        tag: 'Team Workshop & Campus Lab',
        description: 'Monash University Clayton Campus — Drive-by-wire electric vehicle testing and autonomous driving R&D.',
        lat: -37.9105,
        lng: 145.1362,
        zoom: 14
      }
    ]
  },

  'bams': {
    id: 'bams',
    name: 'Bosch Australia Manufacturing Solutions',
    shortName: 'Bosch Australia (BAMS)',
    tagline: 'Industrial Automation & Precision Machinery',
    logo: 'assets/logos/bams.svg',
    description: 'Bosch Australia Manufacturing Solutions (BAMS), headquartered in Clayton, Victoria, is one of Australia\'s largest and most advanced special-purpose machine and factory automation builders.',
    locationSummary: 'Clayton, Victoria',
    locations: [
      {
        id: 'clayton',
        name: 'Clayton, Victoria',
        tag: 'Bosch Australia Headquarters',
        description: 'Robert Bosch Australia, Centre Road, Clayton, Victoria — Turnkey automation engineering & special-purpose machine assembly.',
        lat: -37.9250,
        lng: 145.1280,
        zoom: 14
      }
    ]
  },

  'bosch-rexroth': {
    id: 'bosch-rexroth',
    name: 'Bosch Rexroth',
    shortName: 'Bosch Rexroth Germany',
    tagline: 'Drive & Control Company • Industrial Automation',
    logo: 'assets/logos/bosch-rexroth.svg',
    description: 'Bosch Rexroth is a global pioneer in drive and control technologies and intelligent factory automation.',
    locationSummary: 'Ludwigsburg, Germany',
    locations: [
      {
        id: 'ludwigsburg',
        name: 'Ludwigsburg, Germany',
        tag: 'Customer & Innovation Center',
        description: 'Ludwigsburg, Baden-Württemberg, Germany — Factory Automation, ctrlX OS engineering, and industrial robotics lab.',
        lat: 48.8974,
        lng: 9.1919,
        zoom: 13
      }
    ]
  },

  'monash-uas': {
    id: 'monash-uas',
    name: 'Monash UAS',
    shortName: 'Monash UAS',
    tagline: 'Autonomous Unmanned Aerial Systems • Monash University',
    logo: 'assets/logos/monash-uas.png',
    description: 'Monash UAS (Unmanned Aerial Systems) is an elite autonomous aerial robotics student team at Monash University dedicated to autonomous flight.',
    locationSummary: 'Clayton, Victoria',
    locations: [
      {
        id: 'clayton',
        name: 'Clayton, Victoria',
        tag: 'Team Avionics & Flight Lab',
        description: 'Monash University Clayton Campus — Autonomous drone avionics, ground station development, and maker space.',
        lat: -37.9105,
        lng: 145.1362,
        zoom: 14
      }
    ]
  }
};

const PROJECTS_DATA = [
  // --- ROBOTICS ---
  {
    id: 'nova-rover',
    title: 'Mars & Lunar Rover Autonomous Navigation Stack',
    category: 'robotics',
    company: 'monash-nova-rover',
    companyName: 'Monash Nova Rover',
    categoryLabel: 'Robotics • Monash Nova Rover',
    description: 'Autonomous driving software for international competitions (URC Utah and ARC Adelaide). Migrated motor control to ros2_control to decouple control logic from specific motor drivers, built the Nav2 navigation stack, and engineered custom URDF Gazebo simulations.',
    metric1Label: 'Competitions:',
    metric1Value: 'University Rover Challenge (USA) & ARC',
    metric2Label: 'Architecture:',
    metric2Value: 'ros2_control hardware abstraction',
    tags: ['ROS 2', 'Nav2', 'ros2_control', 'C++', 'Gazebo', 'Nix'],
    githubUrl: 'https://github.com/dylan-gonzalez',
    detailsUrl: 'https://github.com/dylan-gonzalez'
  },
  {
    id: 'honours-delivery-robot',
    title: 'Infrastructure-Guided Autonomous Delivery Robot',
    category: 'robotics',
    company: 'mcav',
    companyName: 'Monash Connected Autonomous Vehicle (MCAV)',
    categoryLabel: 'Robotics • MCAV / Honours Thesis',
    description: 'Autonomous delivery robot navigated entirely by roadside infrastructure cameras rather than onboard perception. Owned full software stack: trained YOLOv8 keypoint models for external localization and built distributed Raspberry Pi GStreamer video pipelines.',
    metric1Label: 'Perception strategy:',
    metric1Value: 'Zero onboard perception (roadside vision)',
    metric2Label: 'Vision pipeline:',
    metric2Value: 'YOLOv8 + GStreamer + ZED 2i',
    tags: ['ROS 2', 'Nav2', 'YOLOv8', 'Isaac ROS', 'ODrive', 'GStreamer'],
    githubUrl: 'https://github.com/dylan-gonzalez',
    detailsUrl: 'https://github.com/dylan-gonzalez'
  },
  {
    id: 'bosch-bin-picking',
    title: 'Robotic Bin-Picking & Grasp Point Tool',
    category: 'robotics',
    company: 'bosch-rexroth',
    companyName: 'Bosch Rexroth',
    categoryLabel: 'Robotics • Bosch Rexroth Germany',
    description: 'Built a Python and RoboDK tool computing every feasible grasp point for objects inside bins. Accounted for 6-DOF robot arm reachability limits, end-effector collision envelopes, and complex bin geometry in industrial automation cells.',
    metric1Label: 'Location:',
    metric1Value: 'Ludwigsburg, Germany',
    metric2Label: 'Kinematics:',
    metric2Value: 'RoboDK 6-DOF reachability analysis',
    tags: ['Python', 'RoboDK', 'Kinematics', 'ctrlX OS'],
    githubUrl: 'https://github.com/dylan-gonzalez',
    detailsUrl: 'https://github.com/dylan-gonzalez'
  },
  {
    id: 'bosch-micro-robot',
    title: 'Vision-Guided Micro-Manipulation Robot',
    category: 'robotics',
    company: 'bams',
    companyName: 'Bosch Australia Manufacturing Solutions',
    categoryLabel: 'Robotics • Bosch Australia (BAMS)',
    description: 'Engineered the motion control and visual servoing pipeline for a Mecademic Meca500 robot arm performing high-precision procedures on microscopic components. Implemented Python, OpenCV, and YOLOv8 on Basler industrial cameras.',
    metric1Label: 'Precision:',
    metric1Value: 'Micron-level manipulation',
    metric2Label: 'Hardware:',
    metric2Value: 'Meca500 arm • Basler camera',
    tags: ['Python', 'OpenCV', 'YOLOv8', 'Meca500', 'Basler'],
    githubUrl: 'https://github.com/dylan-gonzalez',
    detailsUrl: 'https://github.com/dylan-gonzalez'
  },

  // --- INDUSTRIAL AUTOMATION ---
  {
    id: 'bosch-assembly-line',
    title: 'Production Assembly Line PLC System',
    category: 'industrial-automation',
    company: 'bams',
    companyName: 'Bosch Australia Manufacturing Solutions',
    categoryLabel: 'Industrial Automation • Bosch Australia (BAMS)',
    description: 'Wrote the complete PLC program for a commercial customer assembly line on Bosch Rexroth ctrlX. Integrated Cognex DataMan vision cameras, Datalogic barcode scanners, and Rexroth Nexo smart nutrunners, with on-site customer commissioning in Sydney.',
    metric1Label: 'Customer site:',
    metric1Value: 'Sydney, Australia',
    metric2Label: 'Integrations:',
    metric2Value: 'Cognex DataMan • Nexo nutrunners',
    tags: ['ctrlX PLC', 'Structured Text', 'Cognex', 'Datalogic', 'Modbus TCP'],
    githubUrl: 'https://github.com/dylan-gonzalez',
    detailsUrl: 'https://github.com/dylan-gonzalez'
  },
  {
    id: 'ctrlx-shared-memory',
    title: 'Real-Time ctrlX PLC Shared Memory IPC & Socket Bridge',
    category: 'industrial-automation',
    company: 'bosch-rexroth',
    companyName: 'Bosch Rexroth',
    categoryLabel: 'Industrial Automation • Bosch Rexroth Germany',
    description: 'Implemented real-time cyclic data exchange between the ctrlX PLC runtime and Data Layer using shared memory IPC in C++ and Structured Text. Built an optimized socket bridge snap service utilizing FlatBuffers serialization on Ubuntu Core.',
    metric1Label: 'IPC Mechanism:',
    metric1Value: 'Cyclic Shared Memory (C++)',
    metric2Label: 'Serialization:',
    metric2Value: 'FlatBuffers • Ubuntu Core Snaps',
    tags: ['C++', 'Structured Text', 'FlatBuffers', 'Shared Memory', 'Ubuntu Core'],
    githubUrl: 'https://github.com/dylan-gonzalez',
    detailsUrl: 'https://github.com/dylan-gonzalez'
  },

  // --- EMBEDDED ---
  {
    id: 'relativity-emergency-ecu',
    title: 'Emergency Service Fleet Custom ECU Firmware',
    category: 'embedded',
    company: 'relativity-engineering',
    companyName: 'Relativity Engineering',
    categoryLabel: 'Embedded • Relativity Engineering',
    description: 'Designed, built, and deployed C++ firmware (FreeRTOS, ESP-IDF) for custom automotive electronic control units currently operating in ~70 emergency service vehicles across Victoria. Performed extensive CAN-bus reverse engineering to control auxiliary vehicle systems.',
    metric1Label: 'Fleet deployment:',
    metric1Value: '~70 active emergency vehicles in Victoria',
    metric2Label: 'Platform:',
    metric2Value: 'FreeRTOS • ESP-IDF • CAN bus',
    tags: ['C++', 'FreeRTOS', 'ESP-IDF', 'CAN bus', 'Automotive'],
    githubUrl: 'https://github.com/dylan-gonzalez',
    detailsUrl: 'https://github.com/dylan-gonzalez'
  },
  {
    id: 'relativity-v2x-imx8',
    title: 'NXP i.MX8 V2X / DSRC Vehicle Connectivity Platform',
    category: 'embedded',
    company: 'relativity-engineering',
    companyName: 'Relativity Engineering',
    categoryLabel: 'Embedded • Relativity Engineering',
    description: 'Engineered an embedded Linux test product on NXP i.MX8 hardware to evaluate V2X (Vehicle-to-Everything) and DSRC communication performance between vehicles in dynamic testing scenarios, using high-precision GNSS and dedicated DSRC antennae.',
    metric1Label: 'SoC Architecture:',
    metric1Value: 'Embedded Linux on NXP i.MX8',
    metric2Label: 'Wireless Protocol:',
    metric2Value: 'DSRC • GNSS RF Antennas',
    tags: ['Embedded Linux', 'NXP i.MX8', 'V2X', 'DSRC', 'GNSS'],
    githubUrl: 'https://github.com/dylan-gonzalez',
    detailsUrl: 'https://github.com/dylan-gonzalez'
  },
  {
    id: 'mcav-drive-by-wire',
    title: 'Drive-by-Wire Autonomous Vehicle Stacks & CARLA HIL',
    category: 'embedded',
    company: 'mcav',
    companyName: 'Monash Connected Autonomous Vehicle (MCAV)',
    categoryLabel: 'Embedded • MCAV',
    description: 'Maintained sensor stacks on two drive-by-wire electric vehicles (StreetDrone Renault Twizy and Nissan e-NV200). Executed hardware-in-the-loop (HIL) demonstrations linking the physical Twizy to the CARLA autonomous driving simulator.',
    metric1Label: 'Research vehicles:',
    metric1Value: 'StreetDrone Twizy & Nissan e-NV200',
    metric2Label: 'Simulation:',
    metric2Value: 'CARLA Simulator HIL Integration',
    tags: ['Drive-by-Wire', 'CARLA', 'HIL', 'Docker', 'CAN bus'],
    githubUrl: 'https://github.com/dylan-gonzalez',
    detailsUrl: 'https://github.com/dylan-gonzalez'
  },

  // --- WEB ---
  {
    id: 'drone-swarm-visualizer',
    title: 'Drone Swarm Multi-Agent Pathfinding Visualizer',
    category: 'web',
    company: 'monash-uas',
    companyName: 'Monash UAS',
    categoryLabel: 'Web • Monash UAS',
    description: 'Developed a pathfinding visualizer web application using C# and ASP.NET for an autonomous indoor swarm of drones. Implemented multi-agent pathfinding (MAPF) utilizing A* and Conflict-Based Search (CBS) to compute and resolve conflict-free 3D drone routes.',
    metric1Label: 'Algorithm:',
    metric1Value: 'A* • Conflict-Based Search (CBS)',
    metric2Label: 'Web Stack:',
    metric2Value: 'C# • ASP.NET Web App',
    tags: ['C#', 'ASP.NET', 'A* Search', 'CBS', 'Swarm Robotics'],
    githubUrl: 'https://github.com/dylan-gonzalez',
    detailsUrl: 'https://github.com/dylan-gonzalez'
  },
  {
    id: 'kamylla-inventory',
    title: 'Kamylla: Workshop Inventory Web Application',
    category: 'web',
    company: 'monash-uas',
    companyName: 'Monash UAS',
    categoryLabel: 'Web • Monash UAS',
    description: 'Engineered an inventory management web application in Vue.js for tracking component and tooling movement inside the Monash maker space. Connected to the BOMIST API and interfaced directly with tablet-connected hardware barcode scanners.',
    metric1Label: 'Deployment:',
    metric1Value: 'Workshop Tablet / Local Server',
    metric2Label: 'Integration:',
    metric2Value: 'BOMIST API • Barcode Scanner',
    tags: ['Vue.js', 'BOMIST API', 'JavaScript', 'REST'],
    githubUrl: 'https://github.com/dylan-gonzalez',
    detailsUrl: 'https://github.com/dylan-gonzalez'
  },
  {
    id: 'relativity-qt6-datalogger',
    title: 'Qt6 Emergency Vehicle Telemetry & Datalogging Suite',
    category: 'web',
    company: 'relativity-engineering',
    companyName: 'Relativity Engineering',
    categoryLabel: 'Tooling • Relativity Engineering',
    description: 'Designed, built, and packaged a Qt6 Python frontend datalogging application complementary to ECU firmware. Visualizes real-time CAN bus telemetry, parses sensor packets, and automated signal evaluation against ANCAP vehicle safety criteria.',
    metric1Label: 'Evaluation criteria:',
    metric1Value: 'ANCAP vehicle safety standards',
    metric2Label: 'Data pipeline:',
    metric2Value: 'Real-time CAN stream • Cloud export',
    tags: ['Python', 'Qt6 / PySide', 'CAN bus', 'Datalogging'],
    githubUrl: 'https://github.com/dylan-gonzalez',
    detailsUrl: 'https://github.com/dylan-gonzalez'
  }
];

if (typeof window !== 'undefined') {
  window.COMPANIES_DATA = COMPANIES_DATA;
  window.PROJECTS_DATA = PROJECTS_DATA;
}
