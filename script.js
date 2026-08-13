/* ==========================================================================
   ETERNAL-MORPH ADVANCED MULTIDISCIPLINARY ENGINEERING INTERACTIVE ENGINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initHeaderScroll();
    initMobileMenu();
    initModeSimulator();
    initStatsCounter();
    initModals();
    initSmoothScroll();
    initScrollSpy();
    initTerminalLogStream();
    initArchitectureExplorer();
    initLiveTelemetryTicker();
    init3DViewer();
});

/* 1. Header Scroll Efekti */
function initHeaderScroll() {
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

/* 2. Mobil Menü Toggle */
function initMobileMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            const icon = menuToggle.querySelector("i");
            if (navMenu.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });

        // Linke tıklayınca mobil menüyü kapat
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

/* 3. Morphorobot Digital Twin Mod Simülatörü */
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
                    modeTitle.textContent = "KARA SÜRÜŞ MODU SIM";
                    modeDesc.textContent = "Gazebo tekerlek fizik motoru aktif. 1. Aşama simülasyon ortamında şasi dengesi ve aerodinamik sürüklenme benzetimi yürütülmektedir.";
                } else if (mode === "air") {
                    modeTitle.textContent = "HAVADA UÇUŞ MODU SIM";
                    modeDesc.textContent = "Gazebo aerodinamik itki simülatörü aktif. Pervane kolları 0.8s dikey kalkış (VTOL) benzetim komutunu sanal ortamda yürütmektedir.";
                }
            });
        });
    }
}

/* 4. İstatistik Sayaç Animasyonu */
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
                const isPercent = stat.textContent.includes("%");
                let current = 0;
                const increment = Math.max(1, Math.ceil(target / 40));

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    if (isPercent) {
                        stat.textContent = `%${current}${suffix}`;
                    } else {
                        stat.textContent = `${current}${suffix}`;
                    }
                }, 40);
            });
        }
    }

    window.addEventListener("scroll", startCounting);
    startCounting();
}

/* 5. Proje ve İletişim Modal Kontrolü */
function initModals() {
    const projectModal = document.getElementById("project-modal");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const contactModal = document.getElementById("contact-modal");
    const contactCloseBtn = document.getElementById("contact-modal-close-btn");

    if (modalCloseBtn && projectModal) {
        modalCloseBtn.addEventListener("click", () => {
            projectModal.classList.remove("active");
        });
        projectModal.addEventListener("click", (e) => {
            if (e.target === projectModal) projectModal.classList.remove("active");
        });
    }

    if (contactCloseBtn && contactModal) {
        contactCloseBtn.addEventListener("click", () => {
            contactModal.classList.remove("active");
        });
        contactModal.addEventListener("click", (e) => {
            if (e.target === contactModal) contactModal.classList.remove("active");
        });
    }
}

/* Özel Konu ile İletişim Modalı Açıcı */
function openContactModalWithSubject(subjectText) {
    const contactModal = document.getElementById("contact-modal");
    const subjectInput = document.getElementById("c-subject");
    const titleElem = document.getElementById("contact-modal-title");

    if (subjectInput) subjectInput.value = subjectText;
    if (titleElem) {
        if (subjectText.includes("Başvur")) {
            titleElem.innerHTML = `<i class="fa-solid fa-user-check"></i> Öğrenci Ekibine Başvuru`;
        } else if (subjectText.includes("Fikr")) {
            titleElem.innerHTML = `<i class="fa-solid fa-lightbulb"></i> Proje Fikri Önerisi`;
        } else if (subjectText.includes("Sponsor")) {
            titleElem.innerHTML = `<i class="fa-solid fa-handshake"></i> Sponsorluk & İş Birliği`;
        } else {
            titleElem.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Eternal-Morph İletişim`;
        }
    }

    if (contactModal) contactModal.classList.add("active");
}

/* Modal İçerik Açıcı (1. Aşama Simülasyon Raporu) */
function openProjectModal(projectKey) {
    const projectModal = document.getElementById("project-modal");
    const modalBody = document.getElementById("modal-body");

    if (!projectModal || !modalBody) return;

    if (projectKey === "morphorobot") {
        modalBody.innerHTML = `
            <div class="em-modal-header">
                <span class="em-status-tag"><i class="fa-solid fa-cube"></i> Gazebo / Isaac Sim (1. Aşama Simülasyon)</span>
                <h2 class="em-modal-title" style="margin-top:10px;">MORPHOROBOT - SİMÜLASYON RAPORU</h2>
            </div>
            <div style="margin:20px 0;">
                <img src="/assets/morphorobot.jpg" alt="Morphorobot Render" style="width:100%; border-radius:12px; border:1px solid var(--em-border-color);">
            </div>
            <h3 style="color:var(--em-cyan-bright); margin-bottom:10px;"><i class="fa-solid fa-cube"></i> 1. Aşama: Sanal İkiz & Simülasyon Metodolojisi</h3>
            <p style="color:var(--em-text-muted); margin-bottom:15px;">
                Morphorobot projemiz şu anda **1. Aşama Sanal İkiz ve Simülasyon evresindedir**. SolidWorks / Fusion 360 CAD modelleri URDF ortamına aktarılmış ve Gazebo fiziki simülasyon ortamında aerodinamik sürüklenme ile hava-kara mod değişim kinematiği sınanmaktadır. Bir sonraki 2. Aşamada HIL co-simulation entegrasyonu planlanmaktadır.
            </p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:20px; background:rgba(7,9,14,0.6); padding:15px; border-radius:8px; border:1px solid var(--em-border-color);">
                <div>
                    <strong style="color:white; display:block;"><i class="fa-solid fa-cube"></i> CAD Tasarım Araçları</strong>
                    <span style="color:var(--em-text-muted); font-size:0.9rem;">SolidWorks / Fusion 360.</span>
                </div>
                <div>
                    <strong style="color:white; display:block;"><i class="fa-solid fa-sliders"></i> Mevcut Evre</strong>
                    <span style="color:var(--em-cyan-bright); font-size:0.9rem; font-weight:700;">1. Aşama: URDF & Sanal İkiz Testi.</span>
                </div>
                <div>
                    <strong style="color:white; display:block;"><i class="fa-solid fa-code-branch"></i> GitHub Deposu</strong>
                    <span style="color:var(--em-text-muted); font-size:0.9rem;">Tüm URDF ve ROS2 düğüm kodları açık kaynak.</span>
                </div>
                <div>
                    <strong style="color:white; display:block;"><i class="fa-solid fa-arrow-right"></i> Hedeflenen 2. Aşama</strong>
                    <span style="color:var(--em-text-muted); font-size:0.9rem;">STM32 HIL Co-Simulation Entegrasyonu.</span>
                </div>
            </div>
            <div style="text-align:right;">
                <a href="https://github.com/Eternal-Morph" target="_blank" rel="noopener" class="em-btn em-btn-primary">
                    <i class="fa-brands fa-github"></i> GitHub Reposunu Aç
                </a>
            </div>
        `;
    } else if (projectKey === "robothand") {
        modalBody.innerHTML = `
            <div class="em-modal-header">
                <span class="em-status-tag em-tag-cyan"><i class="fa-solid fa-cube"></i> MoveIt2 (1. Aşama Kinematik Simülasyon)</span>
                <h2 class="em-modal-title" style="margin-top:10px;">UR10 ROBOT EL - SİMÜLASYON RAPORU</h2>
            </div>
            <div style="margin:20px 0;">
                <img src="/assets/robot_hand.jpg" alt="UR10 Robot El Render" style="width:100%; border-radius:12px; border:1px solid var(--em-border-color);">
            </div>
            <h3 style="color:var(--em-cyan-bright); margin-bottom:10px;"><i class="fa-solid fa-hand-holding"></i> 1. Aşama Biyonik Kinematik & UR10 Simülasyonu</h3>
            <p style="color:var(--em-text-muted); margin-bottom:15px;">
                Universal Robots UR10 cobot kolu için geliştirdiğimiz biyonik robot el, SolidWorks / Fusion 360 modelleri üzerinden MoveIt2 ortamında **1. Aşama sanal kinematik model** olarak test edilmektedir. Parmak boğum kinematiği ve yörünge takibi simülasyonda doğrulandıktan sonra 2. Aşamada HIL dokunsal tork kartlarıyla birleştirilecektir.
            </p>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:20px; background:rgba(7,9,14,0.6); padding:15px; border-radius:8px; border:1px solid var(--em-border-color);">
                <div>
                    <strong style="color:white; display:block;"><i class="fa-solid fa-hand"></i> CAD Modelleme</strong>
                    <span style="color:var(--em-text-muted); font-size:0.9rem;">SolidWorks / Fusion 360 Parametrik.</span>
                </div>
                <div>
                    <strong style="color:white; display:block;"><i class="fa-solid fa-network-wired"></i> MoveIt2 IK Solver</strong>
                    <span style="color:var(--em-text-muted); font-size:0.9rem;">Çakışmasız yörünge planlaması.</span>
                </div>
                <div>
                    <strong style="color:white; display:block;"><i class="fa-solid fa-code-branch"></i> GitHub Deposu</strong>
                    <span style="color:var(--em-text-muted); font-size:0.9rem;">URScript ve ROS2 paket kodları.</span>
                </div>
                <div>
                    <strong style="color:white; display:block;"><i class="fa-solid fa-sliders"></i> Mevcut Evre</strong>
                    <span style="color:var(--em-cyan-bright); font-size:0.9rem; font-weight:700;">1. Aşama Kinematik Benzetim.</span>
                </div>
            </div>
            <div style="text-align:right;">
                <a href="https://github.com/Eternal-Morph" target="_blank" rel="noopener" class="em-btn em-btn-primary">
                    <i class="fa-brands fa-github"></i> GitHub Reposunu Aç
                </a>
            </div>
        `;
    }

    projectModal.classList.add("active");
}

/* 6. İletişim Form Gönderimi (eternalmorph26@gmail.com Entegrasyonu) */
async function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> İletiliyor...';
    submitBtn.disabled = true;

    const formData = new FormData(form);
    const targetEmail = "eternalmorph26@gmail.com";

    try {
        formData.append("access_key", "0693a107-1b07-4e5a-a38f-a9dbf727c0aa");
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            alert(`Teşekkürler!\nMesajınız ${targetEmail} e-posta adresine başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğiz.`);
            const contactModal = document.getElementById("contact-modal");
            if (contactModal) contactModal.classList.remove("active");
            form.reset();
        } else {
            triggerMailtoFallback(formData, targetEmail);
        }
    } catch (error) {
        triggerMailtoFallback(formData, targetEmail);
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

/* Mailto Fallback Yardımcısı */
function triggerMailtoFallback(formData, targetEmail) {
    const name = formData.get("name") || "";
    const dept = formData.get("department") || "";
    const email = formData.get("email") || "";
    const subject = formData.get("subject") || "Eternal-Morph İletişim";
    const message = formData.get("message") || "";

    const body = `Gönderen: ${name}\nBölüm/Meslek: ${dept}\nE-posta: ${email}\n\nMesaj:\n${message}`;
    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    alert(`Mesajınız hazırlanmıştır. E-posta uygulamanız açılarak ${targetEmail} adresine gönderilecektir.`);
    window.location.href = mailtoUrl;

    const contactModal = document.getElementById("contact-modal");
    if (contactModal) contactModal.classList.remove("active");
}

/* 7. Smooth Scroll Kontrolü */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (targetId && targetId.startsWith("#") && targetId.length > 1) {
                e.preventDefault();
                const targetElem = document.querySelector(targetId);
                if (targetElem) {
                    const offset = 80;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elemRect = targetElem.getBoundingClientRect().top;
                    const elemPosition = elemRect - bodyRect;
                    const offsetPosition = elemPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
}

/* 8. ScrollSpy - Dinamik Sayfa Kaydıkça Mavi Yanma Efekti */
function initScrollSpy() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".em-nav-link");

    if (!sections.length || !navLinks.length) return;

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 250;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                let activeNavKey = "hero";

                if (sectionId === "hero") {
                    activeNavKey = "hero";
                } else if (sectionId === "vizyon" || sectionId === "mimari" || sectionId === "metodoloji") {
                    activeNavKey = "vizyon";
                } else if (sectionId === "projeler") {
                    activeNavKey = "projeler";
                } else if (sectionId === "katil" || sectionId === "departmanlar") {
                    activeNavKey = "katil";
                }

                navLinks.forEach(link => {
                    const dataNav = link.getAttribute("data-nav");
                    if (dataNav === activeNavKey) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();
}

/* 9. Dynamic Terminal Log Stream Effect */
function initTerminalLogStream() {
    const terminal = document.getElementById("terminal-output");
    if (!terminal) return;

    const logs = [
        { text: "[CAD EXPORT] SolidWorks / Fusion 360 URDF Mesh Loaded", type: "t-cyan" },
        { text: "[ROS2 TOPIC] /morpho/cmd_vel simulation updated", type: "t-white" },
        { text: "[UR10_IK] MoveIt2 Joint Trajectory Execution: Passed [1ms]", type: "t-purple" },
        { text: "[GAZEBO] Virtual Twin Physics Step Complete (1000 Hz)", type: "t-green" },
        { text: "[STATUS] Phase 1 Simulation & Digital Twin: ACTIVE", type: "t-yellow" }
    ];

    let logIndex = 0;
    setInterval(() => {
        const log = logs[logIndex];
        const p = document.createElement("p");
        p.className = log.type;
        p.textContent = log.text;

        const cursorLine = terminal.querySelector(".t-cursor");
        if (cursorLine) {
            terminal.insertBefore(p, cursorLine);
        } else {
            terminal.appendChild(p);
        }

        terminal.scrollTop = terminal.scrollHeight;
        logIndex = (logIndex + 1) % logs.length;
    }, 3500);
}

/* 10. Interaktiv Sistem Mimarisi Sekme Kontrolü */
function initArchitectureExplorer() {
    const archTabs = document.querySelectorAll(".em-arch-tab");
    const displayBox = document.getElementById("arch-display-content");

    if (!archTabs.length || !displayBox) return;

    const archData = {
        mech: {
            badge: '<i class="fa-solid fa-cube"></i> Mekanik & Aerodinamik Mimarisi',
            title: 'SolidWorks / Fusion 360 CAD & Aerodinamik Şasi',
            desc: 'Projelerimizin fiziksel yapısı, kütle merkezleri me eklem kinematiği SolidWorks / Fusion 360 ortamında parametrik olarak modellenir. ANSYS ile gerilme ve akış analizleri yapıldıktan sonra URDF/Xacro formatında simülasyon katmanına aktarılır.',
            chips: ['Parametrik CAD Montajı', 'Aerodinamik CFD Testleri', 'URDF Kütle & Eylemsizlik Aktarımı']
        },
        elec: {
            badge: '<i class="fa-solid fa-microchip"></i> Elektrik-Elektronik & Donanım Mimarisi',
            title: 'Özel PCB Tasarımı, STM32 & CAN-Bus Veri Yolu',
            desc: 'Altium Designer ile tasarladığımız özel motor sürücüler, akıllı güç dağıtım kartları (BMS) ve STM32 mikrodenetleyici sistemleri HIL donanım hattı üzerinden simülasyon sunucularıyla gecikmesiz (CAN-Bus / RS485) haberleşecek şekilde mimarilendirilir.',
            chips: ['Altium PCB Tasarımı', 'STM32 FreeRTOS Mimarı', 'CAN-Bus / UART Veri Yolu']
        },
        soft: {
            badge: '<i class="fa-solid fa-code"></i> Yazılım & Otonomi Mimarisi',
            title: 'ROS 2 Humble, MoveIt2 & Sanal İkiz (Digital Twin)',
            desc: 'Modüler ROS 2 düğüm mimarisi, MoveIt2 yörünge planlayıcıları ve Gazebo / Isaac Sim fiziki simülatörleri ile projelerimizin tüm kontrol algoritmaları ve kinematik çözücüleri sanal ikiz üzerinde milisaniyelik hassasiyetle doğrulanır.',
            chips: ['ROS 2 Humble Düğümleri', 'MoveIt2 Kinematik Solver', 'Gazebo Co-Simulation']
        }
    };

    archTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            archTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const key = tab.getAttribute("data-arch");
            const data = archData[key];
            if (data) {
                displayBox.innerHTML = `
                    <div class="em-arch-info">
                        <div class="em-arch-badge">${data.badge}</div>
                        <h3>${data.title}</h3>
                        <p>${data.desc}</p>
                        <div class="em-arch-highlights-list">
                            ${data.chips.map(chip => `<span><i class="fa-solid fa-check"></i> ${chip}</span>`).join('')}
                        </div>
                    </div>
                `;
            }
        });
    });
}

/* 11. Live Telemetry Dashboard Canlı Değer Güncelleyici */
function initLiveTelemetryTicker() {
    const latencyElem = document.getElementById("telem-latency");
    const angleElem = document.getElementById("telem-angle");

    if (!latencyElem || !angleElem) return;

    setInterval(() => {
        const randomLatency = (0.35 + Math.random() * 0.15).toFixed(2);
        const pitch = (0.01 + Math.random() * 0.03).toFixed(2);
        const roll = (-0.01 - Math.random() * 0.02).toFixed(2);

        latencyElem.textContent = `${randomLatency} ms`;
        angleElem.textContent = `${pitch}° / ${roll}°`;
    }, 2000);
}

/* 12. THREE.JS 3D WEBGL CAD MODEL VIEWER (NEW FEATURE) */
function init3DViewer() {
    const container = document.getElementById("3d-canvas-box");
    if (!container || typeof THREE === "undefined") return;

    // Sahne, Kamera ve Renderer Kurulumu
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x04060A);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(5, 4, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Orbit Controls (Fare ile 360 Derece Döndürme & Zoom)
    let controls;
    if (typeof THREE.OrbitControls !== "undefined") {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.2;
    }

    // Işıklandırma (Neon Siber Işıklar)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00D8FF, 2, 20);
    cyanLight.position.set(3, 5, 3);
    scene.add(cyanLight);

    const blueLight = new THREE.DirectionalLight(0x00A2E8, 1);
    blueLight.position.set(-5, 5, -5);
    scene.add(blueLight);

    // Izgara Taban (Cyber Grid)
    const gridHelper = new THREE.GridHelper(12, 24, 0x00A2E8, 0x121824);
    gridHelper.position.y = -1.5;
    scene.add(gridHelper);

    // 3D Morphorobot Drone Şasisi Oluşturma (CAD Assembly Group)
    const droneGroup = new THREE.Group();

    // Merkezi Gövde Podu (Octagonal Body)
    const bodyGeometry = new THREE.CylinderGeometry(1.2, 1.4, 0.6, 8);
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x121824,
        metalness: 0.8,
        roughness: 0.2,
        wireframe: false
    });
    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    droneGroup.add(bodyMesh);

    // Gövde Neon Glow Çerçevesi
    const glowGeo = new THREE.CylinderGeometry(1.25, 1.45, 0.62, 8);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x00D8FF, wireframe: true });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    droneGroup.add(glowMesh);

    // 4 Adet Döner Kanat Kolu ve Motor Grubu
    const armPositions = [
        { x: 1.8, z: 1.8 },
        { x: -1.8, z: 1.8 },
        { x: 1.8, z: -1.8 },
        { x: -1.8, z: -1.8 }
    ];

    const propMeshes = [];

    armPositions.forEach(pos => {
        // Karbon Fiber Kol Tube
        const armGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.5, 16);
        const armMat = new THREE.MeshStandardMaterial({ color: 0x07090E, metalness: 0.9, roughness: 0.1 });
        const armMesh = new THREE.Mesh(armGeo, armMat);
        
        armMesh.rotation.z = Math.PI / 2;
        armMesh.rotation.y = Math.atan2(pos.z, pos.x);
        armMesh.position.set(pos.x / 2, 0, pos.z / 2);
        droneGroup.add(armMesh);

        // Motor Podu
        const motorGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.4, 16);
        const motorMat = new THREE.MeshStandardMaterial({ color: 0x00A2E8, metalness: 0.7, roughness: 0.3 });
        const motorMesh = new THREE.Mesh(motorGeo, motorMat);
        motorMesh.position.set(pos.x, 0.2, pos.z);
        droneGroup.add(motorMesh);

        // Pervane Bıçakları (Rotor Propellers)
        const propGroup = new THREE.Group();
        const bladeGeo = new THREE.BoxGeometry(1.4, 0.02, 0.12);
        const bladeMat = new THREE.MeshBasicMaterial({ color: 0x00D8FF, transparent: true, opacity: 0.85 });
        const bladeMesh = new THREE.Mesh(bladeGeo, bladeMat);
        propGroup.add(bladeMesh);
        propGroup.position.set(pos.x, 0.45, pos.z);
        droneGroup.add(propGroup);

        propMeshes.push(propGroup);

        // Kara Modu Tekerlek Hubları (Landing Wheel Hubs)
        const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.18, 16);
        const wheelMat = new THREE.MeshStandardMaterial({ color: 0x172030, metalness: 0.5, roughness: 0.5 });
        const wheelMesh = new THREE.Mesh(wheelGeo, wheelMat);
        wheelMesh.rotation.x = Math.PI / 2;
        wheelMesh.position.set(pos.x, -0.6, pos.z);
        droneGroup.add(wheelMesh);
    });

    scene.add(droneGroup);

    // Buton Etkileşimleri (Solid / Wireframe / Auto-Rotate Toggle)
    const btnSolid = document.getElementById("btn-3d-solid");
    const btnWireframe = document.getElementById("btn-3d-wireframe");
    const btnRotate = document.getElementById("btn-3d-rotate");

    if (btnSolid && btnWireframe) {
        btnSolid.addEventListener("click", () => {
            btnSolid.classList.add("active");
            btnWireframe.classList.remove("active");
            bodyMaterial.wireframe = false;
        });

        btnWireframe.addEventListener("click", () => {
            btnWireframe.classList.add("active");
            btnSolid.classList.remove("active");
            bodyMaterial.wireframe = true;
        });
    }

    if (btnRotate && controls) {
        btnRotate.addEventListener("click", () => {
            controls.autoRotate = !controls.autoRotate;
            btnRotate.classList.toggle("active", controls.autoRotate);
        });
    }

    // Render Animasyon Döngüsü (Pervaneler Döner)
    function animate() {
        requestAnimationFrame(animate);

        // Pervaneleri döndür
        propMeshes.forEach(prop => {
            prop.rotation.y += 0.25;
        });

        if (controls) controls.update();
        renderer.render(scene, camera);
    }

    animate();

    // Pencere Boyutu Değiştiğinde Resize Uyumu
    window.addEventListener("resize", () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}