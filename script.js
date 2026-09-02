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
    const modeTitle = document.getElementById("mode-title");
    const modeDesc = document.getElementById("mode-desc");

    if (simBtns.length > 0 && modeTitle && modeDesc) {
        simBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                simBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const mode = btn.getAttribute("data-mode");
                if (mode === "land") {
                    modeTitle.textContent = "KARA SÜRÜŞ DİNAMİĞİ (SIM)";
                    modeDesc.textContent = "Gazebo tekerlek fizik motoru aktif. 1. Aşama simülasyon ortamında şasi dengesi ve zemin çekiş benzetimi yürütülmektedir.";
                } else if (mode === "air") {
                    modeTitle.textContent = "VTOL UÇUŞ DİNAMİĞİ (SIM)";
                    modeDesc.textContent = "Gazebo aerodinamik itki simülatörü aktif. 4 rotorlu kollar dikey kalkış (VTOL) ve geçiş aerodinamiğini sanal ortamda icra etmektedir.";
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

/* 10. Ultra-Optimized 3D WebGL CAD Viewer (Pause when off-screen) */
function initOptimized3DViewer() {
    const container = document.getElementById("3d-canvas-box");
    if (!container || typeof THREE === "undefined") return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(4.5, 3.5, 5.5);

    // Fast WebGL Renderer with capped pixel ratio (1.5x max)
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    let controls;
    if (typeof THREE.OrbitControls !== "undefined") {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.maxPolarAngle = Math.PI / 2 + 0.05;
        controls.enablePan = true;
    }

    const grid = new THREE.GridHelper(10, 20, 0x94a3b8, 0xe2e8f0);
    grid.position.y = -1;
    scene.add(grid);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const modelGroup = new THREE.Group();

    const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.6,
        roughness: 0.3
    });

    const accentMat = new THREE.MeshStandardMaterial({
        color: 0x090d16,
        metalness: 0.8,
        roughness: 0.2
    });

    const rotorMat = new THREE.MeshStandardMaterial({
        color: 0x64748b,
        metalness: 0.5,
        roughness: 0.3,
        transparent: true,
        opacity: 0.9
    });

    // Central Chassis
    const mainBody = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.9, 0.35, 8), bodyMat);
    modelGroup.add(mainBody);

    const topCanopy = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.8, 0.25, 8), accentMat);
    topCanopy.position.y = 0.3;
    modelGroup.add(topCanopy);

    // Arms
    const armGeo = new THREE.BoxGeometry(0.12, 0.08, 1.8);
    const arm1 = new THREE.Mesh(armGeo, bodyMat);
    arm1.rotation.y = Math.PI / 4;
    modelGroup.add(arm1);

    const arm2 = new THREE.Mesh(armGeo, bodyMat);
    arm2.rotation.y = -Math.PI / 4;
    modelGroup.add(arm2);

    const rotors = [];
    const rotorOffsets = [
        [1.27, 0.15, 1.27],
        [-1.27, 0.15, 1.27],
        [1.27, 0.15, -1.27],
        [-1.27, 0.15, -1.27]
    ];

    rotorOffsets.forEach(pos => {
        const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.2, 12), accentMat);
        motor.position.set(pos[0], pos[1], pos[2]);
        modelGroup.add(motor);

        const rotor = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.02, 0.1), rotorMat);
        rotor.position.set(pos[0], pos[1] + 0.12, pos[2]);
        modelGroup.add(rotor);
        rotors.push(rotor);
    });

    scene.add(modelGroup);

    let autoRotate = true;
    let isWireframe = false;
    let isVisibleOnScreen = true;

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

    // High performance render loop
    function animate() {
        requestAnimationFrame(animate);

        // Only do work if visible on screen
        if (!isVisibleOnScreen) return;

        rotors.forEach(r => {
            r.rotation.y += 0.22;
        });

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