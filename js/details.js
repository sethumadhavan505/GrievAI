const id =
    new URLSearchParams(
        location.search
    ).get("id");


const complaints =
    getComplaints();


const complaint =
    complaints.find(
        c => c.id === id
    );


const detail =
    document.getElementById(
        "detail"
    );


if (complaint) {

    detail.innerHTML = `

        <h1>
            Complaint Details
        </h1>


        <div class="card">

            <div class="kpis">

                <div>

                    <span>
                        Complaint ID
                    </span>

                    <b>
                        ${complaint.id}
                    </b>

                </div>


                <div>

                    <span>
                        Status
                    </span>

                    <b>
                        ${complaint.status}
                    </b>

                </div>


                <div>

                    <span>
                        Priority
                    </span>

                    <b>
                        ${complaint.priority}
                    </b>

                </div>


                <div>

                    <span>
                        Department
                    </span>

                    <b>
                        ${complaint.department}
                    </b>

                </div>

            </div>

        </div>



        <div class="detail-grid">


            <section class="card">

                <h2>
                    Issue Description
                </h2>

                <p>
                    ${complaint.description}
                </p>


                <h3>
                    Location
                </h3>

                <p>
                    📍 ${complaint.location}
                </p>

            </section>



            <section class="card">

                <h2>
                    🧠 AI Analysis Result
                </h2>


                <p>
                    <b>Category:</b>
                    ${complaint.category}
                </p>


                <p>
                    <b>AI Priority:</b>
                    ${complaint.priority}
                </p>


                <p>
                    <b>AI Routed Department:</b>
                    ${complaint.department}
                </p>


                <p>
                    <b>Duplicate Check:</b>
                    ${complaint.duplicate}
                </p>


                <p>
                    <b>Confidence:</b>
                    ${complaint.confidence}%
                </p>


                <div class="recommend">

                    <b>
                        💡 AI Recommendation
                    </b>

                    <p>
                        Immediate inspection is
                        recommended. Assign an officer
                        and update the citizen after
                        field verification.
                    </p>

                </div>

            </section>



            <aside class="card">

                <h2>
                    Action Panel
                </h2>


                <div class="action-stack">

                    <button
                        class="btn primary"
                        onclick="assignOfficer()"
                    >
                        👤 Assign / Reassign Officer
                    </button>


                    <button
                        class="btn outline"
                        onclick="updateStatus()"
                    >
                        ↻ Update Status
                    </button>


                    <button
                        class="btn outline"
                        onclick="addNote()"
                    >
                        ▣ Add Internal Note
                    </button>


                    <button
                        class="btn outline"
                        onclick="resolveComplaint()"
                    >
                        ✓ Mark as Resolved
                    </button>

                </div>


                <div class="note">

                    <h3>
                        Internal Notes
                    </h3>

                    <p id="noteText">
                        No notes added yet.
                    </p>

                </div>

            </aside>



            <section class="card detail-wide">

                <h2>
                    Activity Timeline
                </h2>


                <div class="activity">

                    <p>
                        ✓ Complaint submitted
                    </p>

                    <p>
                        ✓ AI analysis completed
                    </p>

                    <p>
                        ✓ Automatically routed to
                        ${complaint.department}
                    </p>

                    <p>
                        ● Current status:
                        ${complaint.status}
                    </p>

                </div>

            </section>

        </div>

    `;

}


else {

    detail.innerHTML = `

        <div class="card">

            <h2>
                Complaint not found
            </h2>

        </div>

    `;

}



/* UPDATE STATUS */

function updateStatus() {

    const complaints =
        getComplaints();


    const complaint =
        complaints.find(
            c => c.id === id
        );


    if (
        complaint.status ===
        "Resolved"
    ) {

        complaint.status =
            "In Progress";

    }

    else {

        complaint.status =
            "Resolved";

    }


    saveComplaints(
        complaints
    );


    location.reload();

}



/* RESOLVE */

function resolveComplaint() {

    const complaints =
        getComplaints();


    const complaint =
        complaints.find(
            c => c.id === id
        );


    complaint.status =
        "Resolved";


    saveComplaints(
        complaints
    );


    location.reload();

}



/* ASSIGN OFFICER */

function assignOfficer() {

    alert(
        "Officer assigned successfully."
    );

}



/* INTERNAL NOTE */

function addNote() {

    const note =
        prompt(
            "Enter internal note:"
        );


    if (note) {

        document.getElementById(
            "noteText"
        ).textContent =
            note;

    }

}