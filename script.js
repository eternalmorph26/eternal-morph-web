/* ==========================================================================
   ETERNAL-MORPH ADVANCED MULTIDISCIPLINARY ENGINEERING INTERACTIVE ENGINE
   High-Performance & Buttery Smooth Version (60+ FPS Optimized)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initHeaderScroll();
    initMobileMenu();
    initModeSimulator();
    initStatsCounter();
    initModals();
    initSmoothScroll();
    initScrollSpyAndNavHighlight();
    initTerminalLogStream();
    initArchitectureExplorer();
    initLiveTelemetryTicker();
    initOptimized3DViewer();
});

/* 1. Throttled Header Scroll Effect */
function initHeaderScroll() {
    const header = document.getElementById("header");
    if (!header) return;
    
    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 30) {
                    header.classList.add("scrolled");
                } else {
                    header.classList.remove("scrolled");
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/* 2. Mobile Menu Drawer */
function initMobileMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            const icon = menuToggle.querySelector("i");
            if (icon) {
                if (navMenu.classList.contains("active")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });

        document.querySelectorAll(".em-nav-link").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }
}

/* 3. Real-Time Dynamic ScrollSpy & Nav Highlighting */
function initScrollSpyAndNavHighlight() {
    const currentPath = window.location.pathname.replace(/\/index\.html$/, "/");
    const navLinks = document.querySelectorAll(".em-nav-link");
    
    // If on a subpage (e.g. /information/, /projects/, /contact/), highlight only that page
    if (currentPath !== "/" && currentPath !== "") {
        navLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (href === currentPath || (currentPath.startsWith(href) && href !== "/")) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
        return;
    }

    // On Homepage ("/"), dynamically switch active button based on scroll position
    const linkHome = document.querySelector('.em-nav-link[data-nav="hero"]') || navLinks[0];
    const linkVision = document.querySelector('.em-nav-link[data-nav="vizyon"]') || navLinks[1];
    const linkProjects = document.querySelector('.em-nav-link[data-nav="projeler"]') || navLinks[2];
    const linkContact = document.querySelector('.em-nav-link[data-nav="katil"]') || navLinks[3];

    function updateActiveSection() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        const secHero = document.getElementById("hero");
        const secVision = document.getElementById("vizyon");
        const secProjects = document.getElementById("projeler");
        const secContact = document.getElementById("katil");

        // Calculate positions
        const heroTop = secHero ? secHero.offsetTop : 0;
        const visionTop = secVision ? secVision.offsetTop - 140 : 800;
        const projectsTop = secProjects ? secProjects.offsetTop - 140 : 1600;
        const contactTop = secContact ? secContact.offsetTop - 140 : 2400;

        // Reset all
        navLinks.forEach(l => l.classList.remove("active"));

        // Check if near bottom of page
        if (scrollY + windowHeight >= docHeight - 80) {
            if (linkContact) linkContact.classList.add("active");
        } else if (scrollY >= contactTop) {
            if (linkContact) linkContact.classList.add("active");
        } else if (scrollY >= projectsTop) {
            if (linkProjects) linkProjects.classList.add("active");
        } else if (scrollY >= visionTop) {
            if (linkVision) linkVision.classList.add("active");
        } else {
            if (linkHome) linkHome.classList.add("active");
        }
    }

    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveSection();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    updateActiveSection();
}

/* 4. Morphorobot Mode Simulator */
function initModeSimulator() {
    const simBtns = document.querySelectorAll(".em-sim-btn");
    if (simBtns.length > 0) {
        simBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const mode = btn.getAttribute("data-mode");
                if (window.setRobotMorphMode) {
                    window.setRobotMorphMode(mode);
                }
            });
        });
    }
}

/* 5. Stats Counter Animation */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll(".em-stat-number");
    let animated = false;

    function startCounting() {
        const statsSection = document.querySelector(".em-stats-bar");
        if (!statsSection || animated) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            animated = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute("data-target"), 10);
                const suffix = stat.getAttribute("data-suffix") || "";
                let current = 0;
                const duration = 1000;
                const stepTime = 30;
                const increment = Math.max(1, Math.ceil(target / (duration / stepTime)));

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = current + suffix;
                }, stepTime);
            });
        }
    }

    window.addEventListener("scroll", startCounting, { passive: true });
    startCounting();
}

/* 6. Smooth Scroll with Offset */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = targetEl.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

/* 7. Low-Overhead Log Stream */
function initTerminalLogStream() {
    const terminalOutput = document.getElementById("terminal-output");
    if (!terminalOutput) return;

    const logMessages = [
        { type: "t-green", text: "[INFO] ROS2 Humble kinematic nodes synchronized (1000 Hz)" },
        { type: "t-cyan", text: "[SIM] Gazebo physics engine stepping: dt = 0.001s" },
        { type: "t-white", text: "[CAD] URDF mass matrices & inertia tensors loaded" },
        { type: "t-yellow", text: "[MORPHOROBOT] VTOL pitch/roll PID state: Stable" },
        { type: "t-purple", text: "[UR10] MoveIt2 joint trajectory planning completed" },
        { type: "t-green", text: "[CAN-BUS] Virtual transceiver baudrate: 1 Mbps [OK]" }
    ];

    let logIndex = 0;
    setInterval(() => {
        const item = logMessages[logIndex % logMessages.length];
        const p = document.createElement("p");
        p.className = item.type;
        p.textContent = item.text;
        terminalOutput.appendChild(p);

        const pTags = terminalOutput.querySelectorAll("p");
        if (pTags.length > 5) {
            pTags[0].remove();
        }

        logIndex++;
    }, 3500);
}

/* 8. Architecture Explorer */
function initArchitectureExplorer() {
    const tabs = document.querySelectorAll(".em-arch-tab");
    const displayBox = document.getElementById("arch-display-content");
    if (!tabs.length || !displayBox) return;

    const archData = {
        mech: {
            badge: "<i class='fa-solid fa-compass-drafting'></i> 1. Katman: Makine & Aerodinamik Mimarisi",
            title: "SolidWorks & Fusion 360 Parametrik CAD ve CFD",
            desc: "Projelerimizin fiziksel şasisi, kütle merkezleri ve eklem kinematiği CAD ortamında parametrik olarak modellenir. ANSYS ile aerodinamik akış ve gerilme analizleri tamamlandıktan sonra URDF/Xacro formatında simülasyon katmanına aktarılır.",
            highlights: [
                "Parametrik CAD Şasi & Montaj",
                "Aerodinamik CFD & Akış Analizleri",
                "URDF Kütle ve Eylemsizlik Matrisleri"
            ]
        },
        elec: {
            badge: "<i class='fa-solid fa-microchip'></i> 2. Katman: Donanım & Gömülü Sistem Mimarisi",
            title: "STM32 Real-Time Control & CAN-Bus Veri Hattı",
            desc: "Donanım mimarisinde STM32 serisi yüksek performanslı mikrokontrolcüler ve FreeRTOS kullanılmaktadır. Sensör telemetrisi ve motor sürücüleri CAN-Bus / UART protokolleri üzerinden gerçek zamanlı olarak haberleşir.",
            highlights: [
                "STM32 Real-time Motor Kontrolü",
                "Endüstriyel CAN-Bus İletişim Hattı",
                "Özel Güç Dağıtım ve BMS Tasarımı"
            ]
        },
        soft: {
            badge: "<i class='fa-solid fa-code'></i> 3. Katman: Yazılım, Otonomi & Simülasyon",
            title: "ROS 2 Humble, MoveIt2 & Gazebo Digital Twin",
            desc: "Sistem yazılımı mikroservis mimarisine uygun ROS 2 Humble düğümleri üzerinde koşar. Gazebo ve Isaac Sim ortamlarında robotun 6-DOF kinematiği ve yol planlama algoritmaları fiziksel üretim öncesi doğrulanır.",
            highlights: [
                "ROS 2 Humble Düğüm Mimarisi",
                "MoveIt2 Kinematik Yörünge Çözücü",
                "Gazebo & Isaac Sim Fizik Doğrulaması"
            ]
        }
    };

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const archKey = tab.getAttribute("data-arch");
            const data = archData[archKey];
            if (!data) return;

            displayBox.innerHTML = `
                <div class="em-arch-info">
                    <div class="em-arch-badge">${data.badge}</div>
                    <h3>${data.title}</h3>
                    <p>${data.desc}</p>
                    <div class="em-arch-highlights-list">
                        ${data.highlights.map(h => `<span><i class="fa-solid fa-check"></i> ${h}</span>`).join('')}
                    </div>
                </div>
            `;
        });
    });
}

/* 9. Live Telemetry Ticker */
function initLiveTelemetryTicker() {
    const telemLatency = document.getElementById("telem-latency");
    const telemAngle = document.getElementById("telem-angle");

    if (telemLatency && telemAngle) {
        setInterval(() => {
            const latency = (0.35 + Math.random() * 0.15).toFixed(2);
            telemLatency.textContent = latency + " ms";

            const pitch = (Math.random() * 0.04 - 0.02).toFixed(2);
            const roll = (Math.random() * 0.04 - 0.02).toFixed(2);
            telemAngle.textContent = `${pitch >= 0 ? '+' : ''}${pitch}° / ${roll >= 0 ? '+' : ''}${roll}°`;
        }, 1800);
    }
}

/* 10. Ultra-Optimized 3D WebGL CAD Viewer with URDF & STL Loader */
function initOptimized3DViewer() {
    const container = document.getElementById("3d-canvas-box");
    if (!container || typeof THREE === "undefined") return;

    // Loading indicator element
    const loaderEl = document.createElement("div");
    loaderEl.className = "em-3d-loading";
    loaderEl.innerHTML = `
        <div class="em-3d-spinner"></div>
        <span class="em-loader-text">Morphorobot CAD & URDF Modeli Hazırlanıyor...</span>
    `;
    container.appendChild(loaderEl);
    const loaderText = loaderEl.querySelector(".em-loader-text");

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.05, 50);
    camera.position.set(1.5, 1.2, 1.6);

    // Fast WebGL Renderer with capped pixel ratio (1.5x max)
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    if (THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;
    if (THREE.ACESFilmicToneMapping) renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    let controls;
    if (typeof THREE.OrbitControls !== "undefined") {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.maxPolarAngle = Math.PI / 2 + 0.02;
        controls.enablePan = true;
    }

    const grid = new THREE.GridHelper(4, 20, 0x94a3b8, 0xe2e8f0);
    grid.position.y = 0;
    scene.add(grid);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.1);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x94a3b8, 0.45);
    dirLight2.position.set(-5, -2, -5);
    scene.add(dirLight2);

    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    let robot = null;
    let autoRotate = false;
    let isWireframe = false;
    let isVisibleOnScreen = true;
    let propAngle = 0;

    // Premium PBR Engineering Materials for URDF Components
    const matChassis = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.75,
        roughness: 0.28
    });
    const matMotor = new THREE.MeshStandardMaterial({
        color: 0x090d16,
        metalness: 0.9,
        roughness: 0.2
    });
    const matPropeller = new THREE.MeshStandardMaterial({
        color: 0x0284c7, // Aero Cyan/Blue for spinning rotors
        metalness: 0.55,
        roughness: 0.25
    });
    const matWheel = new THREE.MeshStandardMaterial({
        color: 0x18181b, // Tire Rubber
        metalness: 0.1,
        roughness: 0.85
    });
    const matCamera = new THREE.MeshStandardMaterial({
        color: 0x0ea5e9,
        metalness: 0.85,
        roughness: 0.2
    });
    const matLeg = new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.8,
        roughness: 0.35
    });

    if (typeof URDFLoader !== "undefined" && typeof THREE.STLLoader !== "undefined") {
        const manager = new THREE.LoadingManager();
        let loadedCount = 0;
        const totalMeshes = 22; // expected mesh count

        manager.onProgress = function(url, loaded, total) {
            loadedCount = loaded;
            if (loaderText) {
                const pct = Math.min(100, Math.round((loaded / Math.max(total, totalMeshes)) * 100));
                loaderText.textContent = `CAD Parçaları Yükleniyor... (%${pct})`;
            }
        };

        manager.onLoad = function() {
            if (robot) {
                robot.updateMatrixWorld(true);

                // Calculate bounding box and center accurately once all meshes are fully loaded
                const bbox = new THREE.Box3().setFromObject(robot);
                if (!bbox.isEmpty()) {
                    const center = bbox.getCenter(new THREE.Vector3());
                    const size = bbox.getSize(new THREE.Vector3());

                    // Center on X and Z, place ground-contact point on grid Y = 0
                    robot.position.x = -center.x;
                    robot.position.z = -center.z;
                    robot.position.y = -bbox.min.y;

                    const maxDim = Math.max(size.x, size.y, size.z, 0.4);
                    camera.position.set(maxDim * 1.6, maxDim * 1.2, maxDim * 1.6);
                    if (controls) {
                        controls.target.set(0, size.y * 0.4, 0);
                        controls.update();
                    }
                }
            }

            if (loaderEl) {
                loaderEl.style.opacity = '0';
                setTimeout(() => loaderEl.remove(), 300);
            }
        };

        manager.onError = function(url) {
            console.warn("LoadingManager error on:", url);
        };

        const urdfLoader = new URDFLoader(manager);
        urdfLoader.loadMeshCb = function(path, m, defaultMat, done) {
            const cb = typeof done === 'function' ? done : (typeof defaultMat === 'function' ? defaultMat : null);
            const filename = path.split(/[\\/]/).pop();
            const realPath = 'assets/model/' + filename;
            const stlLoader = new THREE.STLLoader(m);
            stlLoader.load(realPath, function(geom) {
                geom.computeVertexNormals();

                const lower = filename.toLowerCase();
                let mat;
                if (lower.includes('pervane')) {
                    mat = matPropeller.clone();
                } else if (lower.includes('teker') && !lower.includes('eksen')) {
                    mat = matWheel.clone();
                } else if (lower.includes('motor')) {
                    mat = matMotor.clone();
                } else if (lower.includes('camera')) {
                    mat = matCamera.clone();
                } else if (lower.includes('bacak') || lower.includes('ayak') || lower.includes('tutucu') || lower.includes('eksen')) {
                    mat = matLeg.clone();
                } else {
                    mat = matChassis.clone();
                }

                const mesh = new THREE.Mesh(geom, mat);
                if (cb) cb(mesh);
            }, null, function(err) {
                console.warn("STL Loader failed for:", realPath, err);
                if (cb) cb(null, err);
            });
        };

        urdfLoader.load('assets/model/eternalmorph.urdf', function(loadedRobot) {
            robot = loadedRobot;

            // In ROS coordinate system Z is UP, in Three.js Y is UP
            robot.rotation.x = -Math.PI / 2;
            modelGroup.add(robot);
        }, null, function(err) {
            console.error("URDF Loading Error:", err);
            if (loaderText) {
                loaderText.textContent = "Model yüklenemedi. URDF dosyası kontrol ediliyor.";
            }
        });
    } else {
        if (loaderText) {
            loaderText.textContent = "Three.js URDF Loader kütüphanesi bulunamadı.";
        }
    }

    // INTERSECTION OBSERVER: Pause 3D render loop when user scrolls away!
    // This completely eliminates scroll lag and saves 100% GPU when not looking at 3D!
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisibleOnScreen = entry.isIntersecting;
            });
        }, { rootMargin: "100px" });
        observer.observe(container);
    }

    const btnSolid = document.getElementById("btn-3d-solid");
    const btnWireframe = document.getElementById("btn-3d-wireframe");
    const btnRotate = document.getElementById("btn-3d-rotate");
    const btnModeDefault = document.getElementById("btn-mode-default");
    const btnModeGround = document.getElementById("btn-mode-ground");
    const btnModeAir = document.getElementById("btn-mode-air");

    if (btnModeDefault) {
        btnModeDefault.addEventListener("click", () => window.setRobotMorphMode("default_mode"));
    }
    if (btnModeGround) {
        btnModeGround.addEventListener("click", () => window.setRobotMorphMode("ground_mode"));
    }
    if (btnModeAir) {
        btnModeAir.addEventListener("click", () => window.setRobotMorphMode("air_mode"));
    }

    if (btnSolid && btnWireframe && btnRotate) {
        btnSolid.addEventListener("click", () => {
            isWireframe = false;
            btnSolid.classList.add("active");
            btnWireframe.classList.remove("active");
            setWireframeMode(false);
        });

        btnWireframe.addEventListener("click", () => {
            isWireframe = true;
            btnWireframe.classList.add("active");
            btnSolid.classList.remove("active");
            setWireframeMode(true);
        });

        btnRotate.addEventListener("click", () => {
            autoRotate = !autoRotate;
            btnRotate.classList.toggle("active", autoRotate);
        });
    }

    function setWireframeMode(wire) {
        modelGroup.traverse(child => {
            if (child.isMesh && child.material) {
                child.material.wireframe = wire;
            }
        });
    }

    // Exact ROS/Python kinematic mode dictionary from user
    const MODE_TARGETS = {
        default_mode: {
            sol_on_ground_mode: 0.0,
            sol_on_air_mode: 0.0,
            sag_on_ground_mode: 0.0,
            sag_on_air_mode: 0.0,
            sol_arka_ground_mode: 0.0,
            sol_arka_air_mode: 0.0,
            sag_arka_ground_mode: 0.0,
            sag_arka_air_mode: 0.0
        },
        ground_mode: {
            sol_on_ground_mode: 1.5708,
            sol_on_air_mode: 0.0,
            sag_on_ground_mode: -1.5708,
            sag_on_air_mode: 0.0,
            sol_arka_ground_mode: -1.5708,
            sol_arka_air_mode: 0.0,
            sag_arka_ground_mode: 1.5708,
            sag_arka_air_mode: 0.0
        },
        air_mode: {
            sol_on_ground_mode: 1.5708,
            sol_on_air_mode: -1.5708,
            sag_on_ground_mode: -1.5708,
            sag_on_air_mode: 1.5708,
            sol_arka_ground_mode: -1.5708,
            sol_arka_air_mode: 1.5708,
            sag_arka_ground_mode: 1.5708,
            sag_arka_air_mode: -1.5708
        }
    };

    const currentJoints = {
        sol_on_ground_mode: 0.0,
        sol_on_air_mode: 0.0,
        sag_on_ground_mode: 0.0,
        sag_on_air_mode: 0.0,
        sol_arka_ground_mode: 0.0,
        sol_arka_air_mode: 0.0,
        sag_arka_ground_mode: 0.0,
        sag_arka_air_mode: 0.0
    };

    let currentMode = "default_mode";
    let stepTargetMode = "default_mode";
    let pendingSteps = [];
    let currentPropSpeed = 0.0;
    let targetPropSpeed = 0.0;
    let startPropSpeed = 0.0;

    // Transition timing (2.0 seconds per stage with smooth robotic cubic easing)
    const STEP_DURATION = 2000; // 2.0 seconds per step
    let transitionStartTime = 0;
    let isTransitioning = false;
    let startJoints = { ...currentJoints };
    let targetJoints = { ...MODE_TARGETS.default_mode };

    function startNextTransitionStep() {
        if (pendingSteps.length === 0) {
            isTransitioning = false;
            return;
        }

        stepTargetMode = pendingSteps.shift();
        transitionStartTime = performance.now();
        isTransitioning = true;
        startJoints = { ...currentJoints };
        targetJoints = { ...MODE_TARGETS[stepTargetMode] };
        startPropSpeed = currentPropSpeed;

        if (stepTargetMode === "air_mode") {
            targetPropSpeed = 0.35; // flight rpm
        } else {
            targetPropSpeed = 0.0;  // rotors off in ground/park mode
        }

        // Update mode description in simulator panel to show current active phase
        const modeTitle = document.getElementById("mode-title");
        const modeDesc = document.getElementById("mode-desc");
        if (modeTitle && modeDesc) {
            if (stepTargetMode === "default_mode") {
                modeTitle.textContent = "DEFAULT / PARK MODU (SIM)";
                modeDesc.textContent = "Sistem nominal bekleme durumunda. Tüm eklem açıları 0.0 radyan nominal referans pozisyonunda kilitli.";
            } else if (stepTargetMode === "ground_mode") {
                modeTitle.textContent = "KARA SÜRÜŞ DİNAMİĞİ (SIM)";
                modeDesc.textContent = "Tekerlek bacakları 90° (±1.5708 rad) sürüş geometrisine açıldı. 4 tekerlek diferansiyel zemin çekişi simüle edilmektedir.";
            } else if (stepTargetMode === "air_mode") {
                modeTitle.textContent = "VTOL UÇUŞ DİNAMİĞİ (SIM)";
                modeDesc.textContent = "Kollar aerodinamik VTOL uçuş açısına (±1.5708 rad) kilitlendi. 4 rotor dikey itki üretmek üzere tam devirde.";
            }
        }
    }

    window.setRobotMorphMode = function(mode) {
        // Alias handling
        if (mode === "land") mode = "ground_mode";
        if (mode === "air") mode = "air_mode";
        if (mode === "default") mode = "default_mode";

        if (!MODE_TARGETS[mode]) return;
        const requestedMode = mode;

        // Synchronize 3D viewer toggle buttons immediately to target requested mode
        if (btnModeDefault) btnModeDefault.classList.toggle("active", requestedMode === "default_mode");
        if (btnModeGround) btnModeGround.classList.toggle("active", requestedMode === "ground_mode");
        if (btnModeAir) btnModeAir.classList.toggle("active", requestedMode === "air_mode");

        // Synchronize simulator buttons below card if present
        document.querySelectorAll(".em-sim-btn").forEach(btn => {
            let bMode = btn.getAttribute("data-mode");
            if (bMode === "land") bMode = "ground_mode";
            if (bMode === "air") bMode = "air_mode";
            btn.classList.toggle("active", bMode === requestedMode);
        });

        // Current base mode (where the robot is or where it was heading)
        const fromMode = isTransitioning ? stepTargetMode : currentMode;
        if (fromMode === requestedMode && !isTransitioning) return;

        // Build sequential queue: Default <-> Ground <-> Air
        let sequence = [];
        if (fromMode === "default_mode" && requestedMode === "air_mode") {
            // Must transition through ground_mode first!
            sequence = ["ground_mode", "air_mode"];
        } else if (fromMode === "air_mode" && requestedMode === "default_mode") {
            // Must transition through ground_mode first!
            sequence = ["ground_mode", "default_mode"];
        } else {
            // Direct 1-step transition (default <-> ground or ground <-> air)
            sequence = [requestedMode];
        }

        pendingSteps = sequence;
        startNextTransitionStep();
    };

    // High performance render loop
    function animate() {
        requestAnimationFrame(animate);

        // Only do work if visible on screen
        if (!isVisibleOnScreen) return;

        // Smoothly interpolate all 8 joints over 2 seconds per stage using cubic ease-in-out
        if (isTransitioning) {
            const elapsed = performance.now() - transitionStartTime;
            const progress = Math.min(1.0, elapsed / STEP_DURATION);

            // Smooth cubic ease-in-out curve
            const ease = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            if (robot && robot.setJointValue) {
                for (const jName in targetJoints) {
                    const s = startJoints[jName] !== undefined ? startJoints[jName] : 0;
                    const e = targetJoints[jName] !== undefined ? targetJoints[jName] : 0;
                    currentJoints[jName] = s + (e - s) * ease;
                    robot.setJointValue(jName, currentJoints[jName]);
                }
            }

            // Smoothly ramp propeller speed
            currentPropSpeed = startPropSpeed + (targetPropSpeed - startPropSpeed) * ease;

            if (progress >= 1.0) {
                // Settle exact target angles
                for (const jName in targetJoints) {
                    currentJoints[jName] = targetJoints[jName];
                    if (robot && robot.setJointValue) {
                        robot.setJointValue(jName, currentJoints[jName]);
                    }
                }
                currentPropSpeed = targetPropSpeed;
                currentMode = stepTargetMode;

                // If another step is queued (e.g. Ground -> Air), execute it!
                if (pendingSteps.length > 0) {
                    startNextTransitionStep();
                } else {
                    isTransitioning = false;
                }
            }
        }

        // Spin URDF quadcopter propellers in opposite directions
        if (robot && robot.setJointValue && currentPropSpeed > 0.0001) {
            propAngle += currentPropSpeed;
            robot.setJointValue('sol_on_pervane_joint', propAngle);
            robot.setJointValue('sol_arka_pervane_joint', -propAngle);
            robot.setJointValue('sag_on_pervane_joint', -propAngle);
            robot.setJointValue('sag_arka_pervane_joint', propAngle);
        }

        if (autoRotate) {
            modelGroup.rotation.y += 0.004;
        }

        if (controls) controls.update();
        renderer.render(scene, camera);
    }
    animate();

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }, 100);
    }, { passive: true });
}

/* 11. Realistic Engineering Modals & Contact Form */
function initModals() {
    const projectModal = document.getElementById("project-modal");
    const modalBody = document.getElementById("modal-body");
    const modalCloseBtn = document.getElementById("modal-close-btn");

    if (modalCloseBtn && projectModal) {
        modalCloseBtn.addEventListener("click", () => {
            projectModal.classList.remove("open");
        });

        projectModal.addEventListener("click", (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove("open");
            }
        });
    }

    window.openProjectModal = function(projectId) {
        if (!projectModal || !modalBody) return;

        if (projectId === "morphorobot") {
            modalBody.innerHTML = `
                <div style="font-family: var(--em-font-body);">
                    <div style="display:inline-flex; align-items:center; gap:8px; font-family:var(--em-font-mono); font-size:0.75rem; color:var(--em-accent); font-weight:700; background:var(--em-accent-subtle); border:1px solid var(--em-accent-border); padding:4px 10px; border-radius:9999px; margin-bottom:12px;">
                        <i class="fa-solid fa-cube"></i> SİSTEM SİMÜLASYONU & AR-GE RAPORU
                    </div>
                    <h2 style="font-family:var(--em-font-display); font-size:1.625rem; color:var(--em-primary); font-weight:800; margin-bottom:14px; letter-spacing:-0.02em; line-height:1.25;">
                        Morphorobot Hibrit İHA/İKA Sistem ve Simülasyon Raporu
                    </h2>
                    <p style="color:var(--em-text-secondary); margin-bottom:20px; font-size:0.9375rem; line-height:1.65;">
                        Morphorobot; karada 4 tekerlekten bağımsız tahrikli diferansiyel sürüş sağlarken, aktüatör kontrollü kollarını konumlandırarak dikey kalkış (VTOL) ve uçuş dinamiğine geçiş yapabilen çok modlu hibrit bir robot platformudur.
                    </p>

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:20px;">
                        <div style="background:var(--em-bg-subtle); padding:14px; border-radius:8px; border:1px solid var(--em-border);">
                            <div style="font-size:0.6875rem; color:var(--em-text-muted); font-family:var(--em-font-mono); font-weight:700; margin-bottom:4px;">CAD & FİZİKSEL MODELLEME</div>
                            <div style="font-size:0.875rem; font-weight:700; color:var(--em-primary);">SolidWorks & Fusion 360 Parametrik URDF</div>
                        </div>
                        <div style="background:var(--em-bg-subtle); padding:14px; border-radius:8px; border:1px solid var(--em-border);">
                            <div style="font-size:0.6875rem; color:var(--em-text-muted); font-family:var(--em-font-mono); font-weight:700; margin-bottom:4px;">SİMÜLASYON MOTORU</div>
                            <div style="font-size:0.875rem; font-weight:700; color:#059669;">ROS 2 Humble + Gazebo (ODE / Bullet)</div>
                        </div>
                        <div style="background:var(--em-bg-subtle); padding:14px; border-radius:8px; border:1px solid var(--em-border);">
                            <div style="font-size:0.6875rem; color:var(--em-text-muted); font-family:var(--em-font-mono); font-weight:700; margin-bottom:4px;">GÖMÜLÜ KONTROL ÜNİTESİ</div>
                            <div style="font-size:0.875rem; font-weight:700; color:var(--em-primary);">STM32H7 Serisi ARM Cortex-M7 & CAN-Bus</div>
                        </div>
                        <div style="background:var(--em-bg-subtle); padding:14px; border-radius:8px; border:1px solid var(--em-border);">
                            <div style="font-size:0.6875rem; color:var(--em-text-muted); font-family:var(--em-font-mono); font-weight:700; margin-bottom:4px;">KONTROL & STABİLİZASYON</div>
                            <div style="font-size:0.875rem; font-weight:700; color:#059669;">Kaskad PID Açı / İtki & 6-DOF EKF Füzyon</div>
                        </div>
                    </div>

                    <div style="background:var(--em-bg-subtle); padding:14px; border-radius:8px; border:1px solid var(--em-border); margin-bottom:20px; font-size:0.8125rem; color:var(--em-text-secondary); line-height:1.6;">
                        <strong style="color:var(--em-primary); display:block; margin-bottom:4px;"><i class="fa-solid fa-list-check"></i> Doğrulama Kapsamı:</strong>
                        • Gazebo fizik motorunda zemin sürtünme katsayıları ve eğim tırmanma kararlılığı.<br>
                        • ANSYS CFD akış analizlerinden elde edilen kaldırma/sürüklenme (L/D) polar katsayıları.<br>
                        • VTOL modundan kara moduna geçişte kolların servo konum geri beslemeli eşzamanlı kilit mekanizması.
                    </div>

                    <a href="https://github.com/Eternal-Morph" target="_blank" rel="noopener" class="em-btn em-btn-primary em-btn-block">
                        <i class="fa-brands fa-github"></i> Morphorobot GitHub Reposunu İncele
                    </a>
                </div>
            `;
        } else if (projectId === "robothand") {
            modalBody.innerHTML = `
                <div style="font-family: var(--em-font-body);">
                    <div style="display:inline-flex; align-items:center; gap:8px; font-family:var(--em-font-mono); font-size:0.75rem; color:var(--em-accent); font-weight:700; background:var(--em-accent-subtle); border:1px solid var(--em-accent-border); padding:4px 10px; border-radius:9999px; margin-bottom:12px;">
                        <i class="fa-solid fa-hand"></i> KİNEMATİK DOĞRULAMA RAPORU
                    </div>
                    <h2 style="font-family:var(--em-font-display); font-size:1.625rem; color:var(--em-primary); font-weight:800; margin-bottom:14px; letter-spacing:-0.02em; line-height:1.25;">
                        UR10 Entegre Biyonik Robot El Kinematik Raporu
                    </h2>
                    <p style="color:var(--em-text-secondary); margin-bottom:20px; font-size:0.9375rem; line-height:1.65;">
                        Universal Robots UR10/UR10e endüstriyel kollarıyla tam uyumlu, insan eli anatomisine sadık 5 parmaklı biyonik robotik el; hassas nesne manipülasyonu ve tendon tahrikli eklem mekaniği için tasarlanmıştır.
                    </p>

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:20px;">
                        <div style="background:var(--em-bg-subtle); padding:14px; border-radius:8px; border:1px solid var(--em-border);">
                            <div style="font-size:0.6875rem; color:var(--em-text-muted); font-family:var(--em-font-mono); font-weight:700; margin-bottom:4px;">MEKANİK ARAYÜZ</div>
                            <div style="font-size:0.875rem; font-weight:700; color:var(--em-primary);">ISO 9409-1-50-4-M6 Standart Flanş</div>
                        </div>
                        <div style="background:var(--em-bg-subtle); padding:14px; border-radius:8px; border:1px solid var(--em-border);">
                            <div style="font-size:0.6875rem; color:var(--em-text-muted); font-family:var(--em-font-mono); font-weight:700; margin-bottom:4px;">TERS KİNEMATİK (IK)</div>
                            <div style="font-size:0.875rem; font-weight:700; color:#059669;">ROS 2 MoveIt 2 (KDL / IKFast)</div>
                        </div>
                        <div style="background:var(--em-bg-subtle); padding:14px; border-radius:8px; border:1px solid var(--em-border);">
                            <div style="font-size:0.6875rem; color:var(--em-text-muted); font-family:var(--em-font-mono); font-weight:700; margin-bottom:4px;">TAHRİK MEKANİZMASI</div>
                            <div style="font-size:0.875rem; font-weight:700; color:var(--em-primary);">Tendon Tahrikli (Tendon-Driven) Biyonik Mafsal</div>
                        </div>
                        <div style="background:var(--em-bg-subtle); padding:14px; border-radius:8px; border:1px solid var(--em-border);">
                            <div style="font-size:0.6875rem; color:var(--em-text-muted); font-family:var(--em-font-mono); font-weight:700; margin-bottom:4px;">HABERLEŞME & KONTROL</div>
                            <div style="font-size:0.875rem; font-weight:700; color:#059669;">RS-485 / CAN-Bus & URScript Entegrasyonu</div>
                        </div>
                    </div>

                    <div style="background:var(--em-bg-subtle); padding:14px; border-radius:8px; border:1px solid var(--em-border); margin-bottom:20px; font-size:0.8125rem; color:var(--em-text-secondary); line-height:1.6;">
                        <strong style="color:var(--em-primary); display:block; margin-bottom:4px;"><i class="fa-solid fa-list-check"></i> Kinematik & Simülasyon Kapsamı:</strong>
                        • MoveIt 2 ve RViz ortamında çarpışma kontrolü (Collision Matrix) ve manipülatör koordinasyonu.<br>
                        • Hassas kavrama (Pinch Grasp) ve kaba güç kavraması (Power Grasp) eklem açı limit testleri.<br>
                        • STM32 motor sürücüsü üzerinden tork/akım geri beslemeli sanal yük testleri.
                    </div>

                    <a href="https://github.com/Eternal-Morph" target="_blank" rel="noopener" class="em-btn em-btn-primary em-btn-block">
                        <i class="fa-brands fa-github"></i> Robot El GitHub Reposunu İncele
                    </a>
                </div>
            `;
        }

        projectModal.classList.add("open");
    };
}

window.handleContactSubmit = function(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('[name="name"]').value;
    const department = form.querySelector('[name="department"]').value;
    const email = form.querySelector('[name="email"]').value;
    const subject = form.querySelector('[name="subject"]').value;
    const message = form.querySelector('[name="message"]').value;

    const mailtoBody = `Ad Soyad / Kurum: ${name}%0D%0ABölüm: ${department}%0D%0AE-posta: ${email}%0D%0A%0D%0AMesaj:%0D%0A${encodeURIComponent(message)}`;
    window.location.href = `mailto:eternalmorph26@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;
};