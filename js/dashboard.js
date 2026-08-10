/* =====================================
   GRIEVAI GLOBAL DARK MODE
===================================== */

function applySavedTheme() {

    const darkMode =
        localStorage.getItem("grievai_dark_mode") === "true";

    document.body.classList.toggle(
        "dark-mode",
        darkMode
    );
}


/* Apply immediately */
applySavedTheme();

function renderDashboard() {

    const complaints =
        getComplaints();


    const search =
        document.getElementById(
            "adminSearch"
        ).value.toLowerCase();


    const filter =
        document.getElementById(
            "statusFilter"
        ).value;


    const filtered =
        complaints.filter(
            complaint =>

                (
                    !filter ||
                    complaint.status ===
                    filter
                )

                &&

                (
                    !search ||
                    JSON.stringify(
                        complaint
                    )
                    .toLowerCase()
                    .includes(
                        search
                    )
                )
        );



    document.getElementById(
        "kTotal"
    ).textContent =
        complaints.length;



    document.getElementById(
        "kHigh"
    ).textContent =
        complaints.filter(
            complaint =>
                complaint.priority ===
                    "HIGH" ||

                complaint.priority ===
                    "CRITICAL"
        ).length;



    document.getElementById(
        "kProgress"
    ).textContent =
        complaints.filter(
            complaint =>
                complaint.status ===
                "In Progress"
        ).length;



    document.getElementById(
        "kResolved"
    ).textContent =
        complaints.filter(
            complaint =>
                complaint.status ===
                "Resolved"
        ).length;



    const table =
        document.getElementById(
            "complaintTable"
        );


    table.innerHTML =
        filtered.map(
            complaint => `

                <tr>

                    <td>
                        ${complaint.id}
                    </td>

                    <td>
                        ${complaint.category}
                    </td>

                    <td>
                        ${complaint.location}
                    </td>

                    <td>
                        ${complaint.department}
                    </td>

                    <td>
                        ${complaint.priority}
                    </td>

                    <td>

                        <span class="status-pill">
                            ${complaint.status}
                        </span>

                    </td>

                    <td>

                        <button
                            class="btn outline"
                            onclick="
                                location.href=
                                'complaint-details.html?id=${complaint.id}'
                            "
                        >
                            View
                        </button>

                    </td>

                </tr>

            `
        ).join("");


    if (!filtered.length) {

        table.innerHTML = `
            <tr>
                <td colspan="7">
                    No complaints found.
                </td>
            </tr>
        `;

    }

}



document.getElementById(
    "adminSearch"
).oninput =
    renderDashboard;


document.getElementById(
    "statusFilter"
).onchange =
    renderDashboard;


renderDashboard();
