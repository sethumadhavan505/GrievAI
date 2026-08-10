/* =====================================
   OFFICER MANAGEMENT
===================================== */

const defaultOfficers = [
    {
        name: "Arun Kumar",
        department: "Roads & Infrastructure",
        phone: "9876543210",
        status: "Active"
    },
    {
        name: "Priya Sharma",
        department: "Sanitation",
        phone: "9876543211",
        status: "Active"
    },
    {
        name: "Karthik Raj",
        department: "Water Supply",
        phone: "9876543212",
        status: "Available"
    }
];


function getOfficers() {

    const saved =
        localStorage.getItem("grievai_officers");

    if (saved) {
        return JSON.parse(saved);
    }

    localStorage.setItem(
        "grievai_officers",
        JSON.stringify(defaultOfficers)
    );

    return defaultOfficers;
}


function saveOfficers(officers) {

    localStorage.setItem(
        "grievai_officers",
        JSON.stringify(officers)
    );

}


/* =====================================
   DISPLAY OFFICERS
===================================== */

function renderOfficers() {

    const officers =
        getOfficers();

    const table =
        document.getElementById(
            "officerTable"
        );

    table.innerHTML = "";


    officers.forEach(
        (officer, index) => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    👤 ${officer.name}
                </td>

                <td>
                    ${officer.department}
                </td>

                <td>
                    ${officer.phone}
                </td>

                <td>
                    <span class="status-pill">
                        ${officer.status}
                    </span>
                </td>

                <td>

                    <button
                        class="btn outline"
                        onclick="
                            viewOfficer(${index})
                        "
                    >
                        View Details
                    </button>

                </td>

            `;


            table.appendChild(row);

        }
    );


    updateOfficerStats();

}


/* =====================================
   STATISTICS
===================================== */

function updateOfficerStats() {

    const officers =
        getOfficers();


    document.getElementById(
        "totalOfficers"
    ).textContent =
        officers.length;


    document.getElementById(
        "activeOfficers"
    ).textContent =
        officers.filter(
            officer =>
                officer.status === "Active"
        ).length;


    document.getElementById(
        "assignedOfficers"
    ).textContent =
        officers.filter(
            officer =>
                officer.status === "Assigned"
        ).length;


    document.getElementById(
        "availableOfficers"
    ).textContent =
        officers.filter(
            officer =>
                officer.status === "Available"
        ).length;

}


/* =====================================
   VIEW OFFICER
===================================== */

function viewOfficer(index) {

    const officers =
        getOfficers();

    const officer =
        officers[index];


    alert(
        "Officer: " +
        officer.name +

        "\n\nDepartment: " +
        officer.department +

        "\n\nPhone: " +
        officer.phone +

        "\n\nStatus: " +
        officer.status
    );

}


/* =====================================
   ADD OFFICER
===================================== */

document.getElementById(
    "addOfficerBtn"
).onclick = () => {

    loadDepartments();

    document.getElementById(
        "officerModal"
    ).classList.add("show");

};


document.getElementById(
    "closeOfficerModal"
).onclick = () => {

    document.getElementById(
        "officerModal"
    ).classList.remove("show");

};


/* =====================================
   LOAD DEPARTMENTS
===================================== */

function loadDepartments() {

    const saved =
        localStorage.getItem(
            "grievai_departments"
        );


    const departments =
        saved
            ? JSON.parse(saved)
            : [];


    const select =
        document.getElementById(
            "officerDepartment"
        );


    select.innerHTML = `
        <option value="">
            Select Department
        </option>
    `;


    departments.forEach(
        department => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                department.name;

            option.textContent =
                department.name;

            select.appendChild(
                option
            );

        }
    );

}


/* =====================================
   SAVE OFFICER
===================================== */

document.getElementById(
    "saveOfficerBtn"
).onclick = () => {

    const name =
        document.getElementById(
            "officerName"
        ).value.trim();


    const department =
        document.getElementById(
            "officerDepartment"
        ).value;


    const phone =
        document.getElementById(
            "officerPhone"
        ).value.trim();


    if (!name) {

        alert(
            "Please enter officer name."
        );

        return;
    }


    if (!department) {

        alert(
            "Please select a department."
        );

        return;
    }


    if (!/^[0-9]{10}$/.test(phone)) {

        alert(
            "Enter a valid 10-digit phone number."
        );

        return;
    }


    const officers =
        getOfficers();


    officers.push({

        name: name,

        department: department,

        phone: phone,

        status: "Available"

    });


    saveOfficers(
        officers
    );


    document.getElementById(
        "officerName"
    ).value = "";


    document.getElementById(
        "officerDepartment"
    ).value = "";


    document.getElementById(
        "officerPhone"
    ).value = "";


    document.getElementById(
        "officerModal"
    ).classList.remove("show");


    renderOfficers();


    alert(
        "Officer added successfully!"
    );

};


/* =====================================
   DARK MODE
===================================== */

function applySavedTheme() {

    const dark =
        localStorage.getItem(
            "grievai_dark_mode"
        ) === "true";


    document.body.classList.toggle(
        "dark-mode",
        dark
    );

}


applySavedTheme();

renderOfficers();
