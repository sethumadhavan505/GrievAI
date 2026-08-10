/* =====================================
   DEPARTMENT MANAGEMENT
===================================== */


const DEFAULT_DEPARTMENTS = [

    {
        name: "Roads & Infrastructure",
        officers: 4,
        description:
            "Roads, potholes, bridges and infrastructure."
    },

    {
        name: "Sanitation",
        officers: 5,
        description:
            "Garbage collection and sanitation."
    },

    {
        name: "Water Supply",
        officers: 6,
        description:
            "Water supply, pipelines and leakage."
    },

    {
        name: "Electricity",
        officers: 7,
        description:
            "Street lights, electricity and power issues."
    },

    {
        name: "Building & Planning",
        officers: 8,
        description:
            "Building permissions and planning."
    },

    {
        name: "Parks & Environment",
        officers: 6,
        description:
            "Parks, trees and environmental issues."
    }

];



function getDepartments() {

    const saved =
        localStorage.getItem(
            "grievai_departments"
        );


    if (saved) {

        return JSON.parse(saved);

    }


    localStorage.setItem(
        "grievai_departments",
        JSON.stringify(
            DEFAULT_DEPARTMENTS
        )
    );


    return DEFAULT_DEPARTMENTS;

}



function saveDepartments(
    departments
) {

    localStorage.setItem(
        "grievai_departments",
        JSON.stringify(
            departments
        )
    );

}



/* =====================================
   RENDER DEPARTMENTS
===================================== */

function renderDepartments() {

    const departments =
        getDepartments();

    const complaints =
        getComplaints();


    const table =
        document.getElementById(
            "deptTable"
        );


    table.innerHTML = "";


    departments.forEach(
        (department, index) => {


            const departmentComplaints =
                complaints.filter(
                    complaint =>
                        complaint.department ===
                        department.name
                );


            const active =
                departmentComplaints.filter(
                    complaint =>
                        complaint.status !==
                        "Resolved"
                ).length;


            const progress =
                departmentComplaints.filter(
                    complaint =>
                        complaint.status ===
                        "In Progress"
                ).length;


            const resolved =
                departmentComplaints.filter(
                    complaint =>
                        complaint.status ===
                        "Resolved"
                ).length;


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    🏢 ${department.name}
                </td>

                <td>
                    ${active}
                </td>

                <td>
                    ${progress}
                </td>

                <td>
                    ${resolved}
                </td>

                <td>
                    ${department.officers}
                </td>

                <td>

                    <button
                        class="btn outline"
                        onclick="
                            viewDepartment(${index})
                        "
                    >
                        View Details
                    </button>

                </td>

            `;


            table.appendChild(row);

        }
    );


    updateDepartmentStats();

}



/* =====================================
   STATISTICS
===================================== */

function updateDepartmentStats() {

    const departments =
        getDepartments();

    const complaints =
        getComplaints();


    document.getElementById(
        "dComplaints"
    ).textContent =

        complaints.filter(
            complaint =>
                complaint.status !==
                "Resolved"
        ).length;


    document.getElementById(
        "dResolved"
    ).textContent =

        complaints.filter(
            complaint =>
                complaint.status ===
                "Resolved"
        ).length;


    /*
        Update active department count
    */

    const activeDepartmentCard =
        document.querySelector(
            ".kpis > div:first-child b"
        );


    if (activeDepartmentCard) {

        activeDepartmentCard.textContent =
            departments.length;

    }


    /*
        Update total officers
    */

    const totalOfficers =
        departments.reduce(
            (total, department) =>
                total +
                Number(
                    department.officers
                ),
            0
        );


    const officerCard =
        document.querySelector(
            ".kpis > div:nth-child(2) b"
        );


    if (officerCard) {

        officerCard.textContent =
            totalOfficers;

    }

}



/* =====================================
   VIEW DEPARTMENT
===================================== */

function viewDepartment(index) {

    const departments =
        getDepartments();

    const department =
        departments[index];


    alert(

        "Department: " +
        department.name +

        "\n\nOfficers: " +
        department.officers +

        "\n\nDescription: " +
        department.description

    );

}



/* =====================================
   ADD DEPARTMENT
===================================== */

const addDepartmentBtn =
    document.getElementById(
        "addDepartmentBtn"
    );


const departmentModal =
    document.getElementById(
        "departmentModal"
    );


const closeDepartmentModal =
    document.getElementById(
        "closeDepartmentModal"
    );


addDepartmentBtn.onclick = () => {

    departmentModal.classList.add(
        "show"
    );

};



closeDepartmentModal.onclick = () => {

    departmentModal.classList.remove(
        "show"
    );

};



document.getElementById(
    "saveDepartmentBtn"
).onclick = () => {


    const name =
        document.getElementById(
            "newDepartmentName"
        ).value.trim();


    const officers =
        document.getElementById(
            "newDepartmentOfficers"
        ).value;


    const description =
        document.getElementById(
            "newDepartmentDescription"
        ).value.trim();


    if (!name) {

        alert(
            "Please enter the department name."
        );

        return;

    }


    if (!officers || officers < 1) {

        alert(
            "Please enter the number of officers."
        );

        return;

    }


    const departments =
        getDepartments();


    const exists =
        departments.some(
            department =>
                department.name.toLowerCase() ===
                name.toLowerCase()
        );


    if (exists) {

        alert(
            "This department already exists."
        );

        return;

    }


    departments.push({

        name: name,

        officers:
            Number(officers),

        description:
            description ||
            "Newly added department."

    });


    saveDepartments(
        departments
    );


    /*
        Clear form
    */

    document.getElementById(
        "newDepartmentName"
    ).value = "";


    document.getElementById(
        "newDepartmentOfficers"
    ).value = "";


    document.getElementById(
        "newDepartmentDescription"
    ).value = "";


    /*
        Close modal
    */

    departmentModal.classList.remove(
        "show"
    );


    /*
        Refresh table
    */

    renderDepartments();


    alert(
        "Department added successfully!"
    );

};



/* =====================================
   SETTINGS
===================================== */

const settingsBtn =
    document.getElementById(
        "settingsBtn"
    );


const settingsModal =
    document.getElementById(
        "settingsModal"
    );


const closeSettingsModal =
    document.getElementById(
        "closeSettingsModal"
    );


settingsBtn.onclick = event => {

    event.preventDefault();

    settingsModal.classList.add(
        "show"
    );

};



closeSettingsModal.onclick = () => {

    settingsModal.classList.remove(
        "show"
    );

};



/* =====================================
   DARK MODE
===================================== */

const darkModeToggle =
    document.getElementById(
        "darkModeToggle"
    );


function applyDarkMode() {

    const dark =
        localStorage.getItem(
            "grievai_dark_mode"
        ) === "true";


    document.body.classList.toggle(
        "dark-mode",
        dark
    );


    darkModeToggle.checked =
        dark;

}



darkModeToggle.onchange = () => {

    const enabled =
        darkModeToggle.checked;


    localStorage.setItem(
        "grievai_dark_mode",
        enabled
    );


    document.body.classList.toggle(
        "dark-mode",
        enabled
    );

};



applyDarkMode();


renderDepartments();
