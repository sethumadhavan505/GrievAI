const departments = [

    "Roads & Infrastructure",

    "Sanitation",

    "Water Supply",

    "Electricity",

    "Building & Planning",

    "Parks & Environment"

];


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



document.getElementById(
    "deptTable"
).innerHTML =

    departments.map(
        (department, index) => {

            const departmentComplaints =
                complaints.filter(
                    complaint =>
                        complaint.department ===
                        department
                );


            const progress =
                departmentComplaints.filter(
                    complaint =>
                        complaint.status ===
                        "In Progress"
                );


            const resolved =
                departmentComplaints.filter(
                    complaint =>
                        complaint.status ===
                        "Resolved"
                );


            return `

                <tr>

                    <td>
                        🏢 ${department}
                    </td>

                    <td>
                        ${departmentComplaints.length}
                    </td>

                    <td>
                        ${progress.length}
                    </td>

                    <td>
                        ${resolved.length}
                    </td>

                    <td>
                        ${4 + index}
                    </td>

                    <td>

                        <button
                            class="btn outline"
                            onclick="
                                alert(
                                    'Viewing ${department}'
                                )
                            "
                        >
                            View Details
                        </button>

                    </td>

                </tr>

            `;

        }
    ).join("");