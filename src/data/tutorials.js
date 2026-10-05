export const tutorials = [
  {
    id: 'tut-1',
    title: 'Build Your First Drone',
    description: 'Learn the fundamentals of drone assembly from scratch. Perfect for complete beginners.',
    difficulty: 'Beginner',
    duration: '45 min',
    icon: '🚁',
    color: 'from-blue-500 to-cyan-500',
    steps: [
      { title: 'Introduction to Drones', content: 'Drones, also called UAVs (Unmanned Aerial Vehicles), are aircraft that can fly without a human pilot on board. Modern drones use multiple rotors to generate lift and maneuverability. In this tutorial, you\'ll learn how to assemble a basic quadcopter — a drone with 4 motors.' },
      { title: 'Choosing Your Frame', content: 'The frame is the skeleton of your drone. It holds all components together. For your first build, we recommend the X250 Racing Frame — it\'s lightweight (150g), made from carbon fiber, and has 4 arms arranged in an X pattern. Open the Components panel and drag the X250 frame into the workspace.' },
      { title: 'Installing the Motors', content: 'Motors are attached to the ends of each arm. You\'ll need 4 motors — 2 spinning clockwise (CW) and 2 spinning counter-clockwise (CCW). The 2206 2300KV motor is perfect for the X250 frame. Drag 4 motors from the Components panel. The KV rating (2300KV) means it spins 2300 times per minute per volt.' },
      { title: 'Adding Propellers', content: 'Propellers convert motor rotation into thrust. The 5045 tri-blade propeller works great with 2206 motors. Match CW propellers to CW motors and CCW propellers to CCW motors. This is critical — mixed up props will cause your drone to be uncontrollable!' },
      { title: 'Connecting Electronics', content: 'Now add the Flight Controller (FC) to the center of the frame. The FC is the brain of the drone — it reads sensors and adjusts motor speeds thousands of times per second to keep the drone stable. Connect it using the Assembly Diagram in the toolbar.' },
      { title: 'Final Assembly & Test', content: 'Add the battery and ESC to complete your build. Review the full assembly in the Assembly Diagram to make sure all connections are correct. Once happy, click "Simulate Flight" to test your drone virtually!' },
    ]
  },
  {
    id: 'tut-2',
    title: 'Understand Drone Components',
    description: 'Deep dive into every component of a drone — what it does and how to choose the right one.',
    difficulty: 'Beginner',
    duration: '30 min',
    icon: '🔩',
    color: 'from-purple-500 to-pink-500',
    steps: [
      { title: 'The Frame', content: 'The frame determines the size, shape, and strength of your drone. Frame size is measured in millimeters (mm) — the diagonal distance between motors. A 250mm frame is compact and agile, while a 680mm frame is large and stable. Material matters: carbon fiber is lightweight and stiff, while aluminum is cheaper but heavier.' },
      { title: 'Motors & KV Rating', content: 'KV rating is the most confusing spec for beginners. KV stands for RPM per Volt — not kilovolts. A 2300KV motor running on 14.8V (4S LiPo) will spin at 2300 × 14.8 = 34,040 RPM (unloaded). High KV motors are fast but less powerful; low KV motors are slower but generate more torque for large propellers.' },
      { title: 'ESC (Electronic Speed Controller)', content: 'The ESC converts battery power into the 3-phase AC current that BLDC motors need. Each motor has its own ESC (or you can use a 4-in-1 ESC). The current rating (e.g., 35A) must match or exceed the motor\'s peak draw. Modern ESCs use digital protocols like DShot for precise, interference-free control.' },
      { title: 'Flight Controller Explained', content: 'The flight controller contains: an IMU (gyroscope + accelerometer), a barometer for altitude, and a processor running firmware. Popular firmware includes Betaflight (racing), ArduCopter (autonomous), and PX4 (professional). The FC receives stick inputs, reads sensors, and adjusts motor speeds 8000 times per second.' },
      { title: 'Battery Guide', content: 'LiPo batteries are rated by cell count (S), capacity (mAh), and C-rating. A 4S 1300mAh 75C battery: 4 cells × 3.7V = 14.8V nominal; 1300mAh capacity; 1300 × 75 = 97.5A maximum continuous discharge. Never discharge below 3.5V per cell — you\'ll permanently damage the battery.' },
      { title: 'GPS & Sensors', content: 'GPS enables position hold, return-to-home, and autonomous waypoint navigation. The u-blox M8N receives signals from GPS and GLONASS satellites. Lidar sensors detect obstacles. Optical flow sensors provide indoor positioning without GPS. Together, these make your drone smart and safe.' },
    ]
  },
  {
    id: 'tut-3',
    title: 'Connect a Flight Controller',
    description: 'Step-by-step guide to wiring and configuring your flight controller.',
    difficulty: 'Intermediate',
    duration: '35 min',
    icon: '🖥️',
    color: 'from-emerald-500 to-teal-500',
    steps: [
      { title: 'FC Mounting', content: 'Mount the flight controller in the center of your frame with anti-vibration standoffs (rubber grommets). Vibration is the enemy of flight controller performance — even small vibrations can saturate the gyroscope. Orient the FC so the arrow points toward the front of the drone.' },
      { title: 'Connecting ESCs', content: 'Connect each ESC\'s signal wire (white/yellow) to the motor output pins on the FC. Motor 1 = front-right, Motor 2 = rear-left, Motor 3 = front-left, Motor 4 = rear-right (for Betaflight X configuration). Double-check the motor order — it\'s critical for stability!' },
      { title: 'Power Distribution', content: 'Connect the battery to the Power Distribution Board (PDB). The PDB distributes power to all 4 ESCs and the FC. Solder XT60 connectors for the battery connection. Use 10-12 AWG wire for the main power leads to handle high current without heating.' },
      { title: 'Receiver Connection', content: 'Connect your RC receiver to the FC using SBUS or CRSF protocol (single wire, more reliable than PWM). Bind the receiver to your transmitter before connecting. The FC needs to know your stick inputs to control motor outputs correctly.' },
      { title: 'Sensor Calibration', content: 'After assembly, you need to calibrate: the accelerometer (level calibration), the magnetometer/compass (if present), and the ESC endpoints. Open your configurator software (Betaflight Configurator or Mission Planner) and follow the calibration wizard.' },
      { title: 'First Power-On', content: 'With props removed, connect the battery and power on. Check that all 4 motors spin in the correct direction when you advance the throttle. In Betaflight, use the Motors tab to test each motor individually. If a motor spins the wrong way, swap any 2 of its 3 wires.' },
    ]
  },
  {
    id: 'tut-4',
    title: 'Configure Motors',
    description: 'Learn motor direction, timing, ESC calibration, and performance tuning.',
    difficulty: 'Intermediate',
    duration: '25 min',
    icon: '⚙️',
    color: 'from-orange-500 to-red-500',
    steps: [
      { title: 'Motor Direction', content: 'A quadcopter needs specific motor rotation directions: Front-Right → CCW, Rear-Left → CCW, Front-Left → CW, Rear-Right → CW. This creates a balanced torque reaction. If all motors spun the same direction, the drone would spin uncontrollably.' },
      { title: 'ESC Calibration', content: 'ESC calibration tells each ESC the full-throttle and zero-throttle signal range. To calibrate: set throttle to maximum, connect battery, wait for calibration beeps, lower throttle to zero, wait for confirmation beeps. Now all ESCs respond identically to the same signal.' },
      { title: 'Motor Timing', content: 'Motor timing affects efficiency and performance. Low timing (8°) is more efficient but less snappy. High timing (24°) increases performance but generates more heat. For racing use 16-24°. For photography, 8-16° for longer flights. Set timing in your ESC configurator.' },
      { title: 'PID Tuning Basics', content: 'PID (Proportional-Integral-Derivative) is the algorithm that keeps your drone stable. P controls how hard the FC responds to errors. I corrects for steady-state errors (wind). D dampens oscillations. Start with defaults and increase P until you see oscillations, then back off 20%.' },
      { title: 'RPM Filtering', content: 'RPM-based filtering (Betaflight 4.0+) uses the motor RPM telemetry to place notch filters exactly at motor noise frequencies. This dramatically reduces vibration noise getting into the PID loop. Enable bidirectional DShot in your ESC and FC settings to unlock this feature.' },
      { title: 'Motor Efficiency Testing', content: 'Use a motor thrust stand to measure actual thrust and efficiency. Target at least 4:1 thrust-to-weight ratio for sport flying and 2:1 minimum for stable flight. g/W (grams per watt) measures motor efficiency — higher is better for longer flight times.' },
    ]
  },
  {
    id: 'tut-5',
    title: 'Plan a Flight',
    description: 'Master the Flight Path Planner to create safe, efficient autonomous missions.',
    difficulty: 'Beginner',
    duration: '20 min',
    icon: '🗺️',
    color: 'from-sky-500 to-blue-500',
    steps: [
      { title: 'Opening the Planner', content: 'Navigate to the Flight Planner from the top navigation bar. You\'ll see a map view centered on your location. The colored zones show airspace classification: green is safe, yellow requires caution, and red is restricted. Always plan your route in green zones.' },
      { title: 'Setting Your Takeoff Point', content: 'Click on the map to set your takeoff location. A blue marker will appear. Choose an open area away from trees, buildings, and power lines. For best GPS signal, pick a location with clear sky view — avoid valleys or areas with tall buildings on multiple sides.' },
      { title: 'Adding Waypoints', content: 'Click additional points on the map to add waypoints. The drone will fly to each waypoint in sequence. For each waypoint, you can set the altitude (10-120m recommended for beginners) and speed (3-10 m/s for smooth footage). The mission path will draw as a blue line on the map.' },
      { title: 'Altitude Planning', content: 'Set different altitudes for different legs of your mission. Fly higher over obstacles, lower for inspection shots. A common profile: take off to 30m, cruise to survey area, descend to 15m for detailed inspection, ascend and return home. Always maintain line-of-sight!' },
      { title: 'Airspace Checking', content: 'Before flying, always check the airspace overlay. If your route passes through yellow zones, extra care is needed — check for NOTAMs and notify air traffic control if required. Never fly through red zones without proper authorization from aviation authorities.' },
      { title: 'Mission Review', content: 'Review the mission summary: total distance, estimated flight time, and battery usage. A good rule: plan to use only 80% of battery capacity to leave reserves for return and emergencies. If the mission is too long, break it into segments.' },
    ]
  },
  {
    id: 'tut-6',
    title: 'Run Your First Simulation',
    description: 'Learn to use the flight simulator to safely test your drone before real-world flights.',
    difficulty: 'Beginner',
    duration: '15 min',
    icon: '🎮',
    color: 'from-violet-500 to-purple-500',
    steps: [
      { title: 'Opening the Simulator', content: 'Click "Simulate Flight" from the 3D Designer or navigate to the Simulator page. The view switches to a 3D flight environment with a sky dome and terrain. Your drone appears on the ground, ready for takeoff. The HUD (Heads-Up Display) shows all flight data.' },
      { title: 'Understanding the HUD', content: 'The HUD displays: Altitude (meters above ground), Speed (m/s), Battery percentage, GPS coordinates (latitude/longitude), Distance from home, Flight time, Motor RPM status, and Drone orientation (pitch/roll/yaw). Monitor these throughout your flight.' },
      { title: 'Taking Off', content: 'Click the green "Take Off" button. The drone will spool up motors (watch the Motor Status panel) and climb to a hover altitude of 10m automatically. Once hovering, the drone holds position — you\'re ready to fly!' },
      { title: 'Flying Controls', content: 'Use the Flight Controls panel to navigate: Forward/Backward moves the drone in its facing direction; Left/Right strafes sideways; Rotate CW/CCW turns the drone; Altitude Up/Down changes height. Hold a button for continuous movement, or click for incremental moves.' },
      { title: 'Monitoring Battery', content: 'Watch the battery percentage in the HUD. At 30%, the drone will warn you to land. At 15%, it may auto-land. In real life, always land with >20% battery remaining. Practice good battery management in the simulator to build good habits for real flying.' },
      { title: 'Emergency Procedures', content: 'The red "Emergency Stop" button instantly cuts all motors — use this only in real emergencies as the drone will fall. In a real situation, if the drone becomes uncontrollable, activate Return-to-Home (RTH) which will automatically fly the drone back to its takeoff point.' },
    ]
  },
];
