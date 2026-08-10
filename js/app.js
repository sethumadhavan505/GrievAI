const KEY = "grievai_complaints";


function getComplaints() {

    return JSON.parse(
        localStorage.getItem(KEY) || "[]"
    );

}


function saveComplaints(complaints) {

    localStorage.setItem(
        KEY,
        JSON.stringify(complaints)
    );

}


/* DEMO DATA */

function seedComplaints() {

    if (getComplaints().length > 0) {
        return;
    }


    const demo = [

        {
            id: "GRV-2026-000001",

            description:
                "There is a huge pothole on the main road near Anna Nagar bus stop. It is dangerous for vehicles.",

            category: "Road Damage",

            priority: "HIGH",

            department:
                "Roads & Infrastructure",

            location:
                "Anna Nagar, Chennai",

            duplicate:
                "No similar complaint found",

            confidence: 94,

            status: "In Progress",

            created:
                "10 Aug 2026, 09:30 AM"
        },


        {
            id: "GRV-2026-000002",

            description:
                "Garbage is overflowing near the bus stop.",

            category:
                "Garbage Overflow",

            priority:
                "MEDIUM",

            department:
                "Sanitation",

            location:
                "Nungambakkam, Chennai",

            duplicate:
                "No similar complaint found",

            confidence: 91,

            status:
                "Submitted",

            created:
                "10 Aug 2026, 10:15 AM"
        },


        {
            id: "GRV-2026-000003",

            description:
                "Street light is not working at the junction.",

            category:
                "Street Light",

            priority:
                "LOW",

            department:
                "Electricity",

            location:
                "T. Nagar, Chennai",

            duplicate:
                "No similar complaint found",

            confidence:
                89,

            status:
                "Resolved",

            created:
                "09 Aug 2026, 07:20 PM"
        }

    ];


    saveComplaints(demo);

}


seedComplaints();



/* RESULT PAGE */

function renderResult() {

    const complaint =
        JSON.parse(
            localStorage.getItem(
                "lastComplaint"
            ) || "null"
        );


    if (!complaint) {
        return;
    }


    const values = {

        resultId:
            complaint.id,

        resultCategory:
            complaint.category,

        resultPriority:
            complaint.priority,

        resultDepartment:
            complaint.department,

        resultLocation:
            complaint.location,

        resultDuplicate:
            complaint.duplicate,

        resultConfidence:
            complaint.confidence + "%"

    };


    Object.entries(values).forEach(
        ([id, value]) => {

            const element =
                document.getElementById(id);

            if (element) {

                element.textContent = value;

            }

        }
    );

}



/* HOME STATISTICS */

function stats() {

    const complaints =
        getComplaints();


    const setValue =
        (id, value) => {

            const element =
                document.getElementById(id);

            if (element) {

                element.textContent =
                    value;

            }

        };


    setValue(
        "totalStat",
        complaints.length
    );


    setValue(
        "progressStat",
        complaints.filter(
            c =>
                c.status ===
                "In Progress"
        ).length
    );


    setValue(
        "resolvedStat",
        complaints.filter(
            c =>
                c.status ===
                "Resolved"
        ).length
    );

}


stats();