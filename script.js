document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("grid");
    const progressText = document.getElementById("progress-text");
    const progressFill = document.getElementById("progress-fill");
    const creditsText = document.getElementById("credits-text");

    // ===== CLAVE LOCALSTORAGE METALURGICA =====
    const STORAGE_KEY = "approvedCourses_METALURGICA";

    // ===== CARGAR RAMOS APROBADOS DESDE LOCALSTORAGE =====
    let approved = [];

    try {
        approved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

        if (!Array.isArray(approved)) {
            approved = [];
        }
    } catch (e) {
        approved = [];
    }

    // ===== LISTA COMPLETA DE RAMOS =====
    const allCourses = [];
    const courseMap = {};

    for (let sem in semesters) {
        semesters[sem].forEach(course => {
            allCourses.push(course.code);
            courseMap[course.code] = course;
        });
    }

    // ===== LIMPIEZA AUTOMATICA =====
    approved = approved.filter(code => allCourses.includes(code));

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(approved)
    );

    // ===== VALIDAR PRERREQUISITOS =====
    function isUnlocked(course) {

        if (!course.prereq || course.prereq.length === 0) {
            return true;
        }

        return course.prereq.every(req => approved.includes(req));
    }

    // ===== DESAPROBACION EN CASCADA =====
    function removeWithDependents(code) {
        const toRemove = new Set();
        toRemove.add(code);

        let changed = true;

        while (changed) {
            changed = false;

            approved.forEach(c => {
                const prereq = courseMap[c]?.prereq || [];

                if (
                    prereq.some(p => toRemove.has(p)) &&
                    !toRemove.has(c)
                ) {
                    toRemove.add(c);
                    changed = true;
                }
            });
        }

        approved = approved.filter(c => !toRemove.has(c));
    }

    // ===== CALCULO DE CREDITOS APROBADOS =====
    function calculateApprovedCredits() {
        let total = 0;

        for (let sem in semesters) {
            semesters[sem].forEach(course => {
                if (approved.includes(course.code)) {
                    total += Number(course.credits) || 0;
                }
            });
        }

        return total;
    }

    // ===== CALCULO DE CREDITOS TOTALES =====
    function calculateTotalCredits() {
        let total = 0;

        for (let sem in semesters) {
            semesters[sem].forEach(course => {
                total += Number(course.credits) || 0;
            });
        }

        return total;
    }

    // ===== ACTUALIZAR PROGRESO =====
    function updateProgress() {
        const approvedCredits = calculateApprovedCredits();
        const totalCredits = calculateTotalCredits();

        const approvedCourses = approved.length;
        const totalCourses = allCourses.length;

        const percent = totalCredits === 0
            ? 0
            : ((approvedCredits / totalCredits) * 100).toFixed(1);

        progressFill.style.width = percent + "%";

        progressText.textContent = `Progreso: ${percent}%`;

        creditsText.innerHTML = `
            Créditos aprobados: ${approvedCredits} / ${totalCredits}<br>
            Ramos aprobados: ${approvedCourses} / ${totalCourses}
        `;
    }

    // ===== RENDER PRINCIPAL =====
    function render() {
        grid.innerHTML = "";

        for (let sem = 1; sem <= 11; sem++) {

            if (!semesters[sem]) continue;

            const semDiv = document.createElement("div");
            semDiv.className = "semester";

            const title = document.createElement("h2");

            title.textContent = `S${sem}`;
            title.classList.add("semester-title");

            // ===== CLIC EN EL SEMESTRE =====
            title.addEventListener("click", () => {

                const courses = semesters[sem];

                const availableCourses = courses.filter(course => {
                    return isUnlocked(course) &&
                        !approved.includes(course.code);
                });

                // ===== APROBAR RAMOS DISPONIBLES =====
                if (availableCourses.length > 0) {

                    availableCourses.forEach(course => {
                        if (!approved.includes(course.code)) {
                            approved.push(course.code);
                        }
                    });

                } else {

                    // ===== DESAPROBAR RAMOS DEL SEMESTRE =====
                    courses.forEach(course => {
                        if (approved.includes(course.code)) {
                            removeWithDependents(course.code);
                        }
                    });
                }

                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(approved)
                );

                render();
            });

            semDiv.appendChild(title);

            // ===== CREAR RAMOS DEL SEMESTRE =====
            semesters[sem].forEach(course => {

                const div = document.createElement("div");
                div.classList.add("course");

                // =================================
                // ===== COLORES POR SIGLA =====
                // =================================

                if (course.code.startsWith("MAT")) {
                    div.classList.add("mat");
                }

                if (course.code.startsWith("EIQ")) {
                    div.classList.add("eiq");
                }

                if (course.code.startsWith("MET")) {
                    div.classList.add("met");
                }

                if (course.code.startsWith("ICA")) {
                    div.classList.add("ica");
                }

                if (course.code.startsWith("QUI")) {
                    div.classList.add("qui");
                }

                if (course.code.startsWith("FIS")) {
                    div.classList.add("fis");
                }

                if (course.code.startsWith("ING")) {
                    div.classList.add("ing");
                }

                if (course.code.startsWith("FIN")) {
                    div.classList.add("fin");
                }

                if (
                    course.code.startsWith("IER") ||
                    course.code.startsWith("FOFU")
                ) {
                    div.classList.add("rosado");
                }

                if (course.code.startsWith("OPT")) {
                    div.classList.add("opt");
                }

                // ===== INFORMACION DEL RAMO =====
                div.innerHTML = `
                    <strong>${course.code}</strong><br>
                    ${course.name}<br>
                    <small>${course.credits} créditos</small>
                `;

                // ===== ESTADO DEL RAMO =====
                const unlocked = isUnlocked(course);

                if (approved.includes(course.code)) {
                    div.classList.add("approved");
                } else if (unlocked) {
                    div.classList.add("available");
                } else {
                    div.classList.add("locked");
                }

                // =================================
                // ===== FLECHA DE PRERREQUISITOS =====
                // =================================

                if (course.prereq && course.prereq.length > 0) {

                    const prereqButton = document.createElement("button");

                    prereqButton.className = "prereq-button";
                    prereqButton.textContent = "▼";
                    prereqButton.type = "button";

                    const prereqContainer = document.createElement("div");

                    prereqContainer.className = "prereq-container";
                    prereqContainer.style.display = "none";

                    const prereqTitle = document.createElement("div");

                    prereqTitle.className = "prereq-title";
                    prereqTitle.textContent = "Prerrequisitos:";

                    prereqContainer.appendChild(prereqTitle);

                    course.prereq.forEach(req => {

                        const prereqCourse = courseMap[req];

                        const prereqItem = document.createElement("div");

                        prereqItem.className = "prereq-item";

                        const prereqName = prereqCourse
                            ? `${req} - ${prereqCourse.name}`
                            : req;

                        prereqItem.textContent = prereqName;

                        if (approved.includes(req)) {
                            prereqItem.classList.add("prereq-approved");
                        } else {
                            prereqItem.classList.add("prereq-not-approved");
                        }

                        prereqContainer.appendChild(prereqItem);
                    });

                    // ===== ABRIR / CERRAR PRERREQUISITOS =====
                    prereqButton.addEventListener("click", (event) => {

                        event.stopPropagation();

                        const abierto =
                            prereqContainer.style.display === "block";

                        if (abierto) {
                            prereqContainer.style.display = "none";
                            prereqButton.textContent = "▼";
                        } else {
                            prereqContainer.style.display = "block";
                            prereqButton.textContent = "▲";
                        }
                    });

                    div.appendChild(prereqButton);
                    div.appendChild(prereqContainer);
                }

                // =================================
                // ===== APROBAR / DESAPROBAR =====
                // =================================

                if (unlocked || approved.includes(course.code)) {

                    div.addEventListener("click", () => {

                        if (approved.includes(course.code)) {

                            removeWithDependents(course.code);

                        } else {

                            approved.push(course.code);
                        }

                        localStorage.setItem(
                            STORAGE_KEY,
                            JSON.stringify(approved)
                        );

                        render();
                    });
                }

                semDiv.appendChild(div);
            });

            grid.appendChild(semDiv);
        }

        updateProgress();
    }

    // ===== INICIAR MALLA =====
    render();
});
