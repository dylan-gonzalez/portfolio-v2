/**
 * Technical Projects Dataset
 * Dylan Gonzalez — Software Engineer
 * 
 * Adding or removing projects here automatically updates the count on index.html
 * ("See X more projects →") and populates projects.html.
 */

const PROJECTS_DATA = [
  // --- ROBOTICS ---
  {
    id: 'nova-rover',
    title: 'Mars & Lunar Rover Autonomous Navigation Stack',
    category: 'robotics',
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
    categoryLabel: 'Robotics • Honours Thesis',
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
    categoryLabel: 'Robotics • Bosch Australia',
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
    categoryLabel: 'Industrial Automation • Bosch Australia',
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
