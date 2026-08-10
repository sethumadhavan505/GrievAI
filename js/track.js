function showTrack(id) {

    const complaint =
        getComplaints().find(
            c =>
                c.id.toLowerCase() ===
                id.toLowerCase()
        );


    const box =
        document.getElementById(
            "trackResult"
        );


    if (!complaint) {

        box.innerHTML = `
            <div class="card">
                <h2>
                    Complaint not found
                </h2>

                <p>
                    Please check the Complaint ID.
                </p>
            </div>
        `;

        return;

    }


    box.innerHTML = `

        <div class="grid-2 track-box">

            <section class="card">

                <h2>
                    Complaint ${complaint.id}
                </h2>


                <div class="analysis-box">

                    <p>
                        <b>Category</b>
                        <span>
                            ${complaint.category}
                        </span>
                    </p>


                    <p>
                        <b>Priority</b>
                        <span>
                            ${complaint.priority}
                        </span>
                    </p>


                    <p>
                        <b>Department</b>
                        <span>
                            ${complaint.department}
                        </span>
                    </p>


                    <p>
                        <b>Location</b>
                        <span>
                            ${complaint.location}
                        </span>
                    </p>


                    <p>
                        <b>Reported On</b>
                        <span>
                            ${complaint.created}
                        </span>
                    </p>

                </div>


                <h3>
                    Issue Description
                </h3>


                <p>
                    ${complaint.description}
                </p>

            </section>


            <aside class="card">

                <h2>
                    Complaint Status

                    <span class="status-pill">
                        ${complaint.status}
                    </span>

                </h2>


                <div class="timeline">

                    <div class="done">

                        <b>
                            Complaint Submitted
                        </b>

                        <small>
                            ${complaint.created}
                        </small>

                    </div>


                    <div class="done">

                        <b>
                            AI Analysis Completed
                        </b>

                        <small>
                            Category and priority detected
                        </small>

                    </div>


                    <div class="done">

                        <b>
                            Assigned to Department
                        </b>

                        <small>
                            ${complaint.department}
                        </small>

                    </div>


                    <div class="${
                        complaint.status === "In Progress"
                            ? "current"
                            : complaint.status === "Resolved"
                                ? "done"
                                : ""
                    }">

                        <b>
                            ${complaint.status}
                        </b>

                        <small>
                            Latest complaint status
                        </small>

                    </div>


                    <div>

                        <b>
                            Resolved
                        </b>

                        <small>
                            Pending final resolution
                        </small>

                    </div>

                </div>

            </aside>

        </div>

    `;

}



document.getElementById(
    "trackBtn"
).onclick = () => {

    const id =
        document.getElementById(
            "trackId"
        ).value.trim();


    showTrack(id);

};



function loadLatest() {

    const complaints =
        getComplaints();


    const latest =
        complaints[0];


    if (latest) {

        document.getElementById(
            "trackId"
        ).value =
            latest.id;


        showTrack(
            latest.id
        );

    }

}


const lastId =
    new URLSearchParams(
        location.search
    ).get("id");


if (lastId) {

    document.getElementById(
        "trackId"
    ).value =
        lastId;


    showTrack(
        lastId
    );

}