const description =
    document.getElementById(
        "description"
    );


const counter =
    document.getElementById(
        "counter"
    );


description.addEventListener(
    "input",
    () => {

        counter.textContent =
            description.value.length;

        analyze(
            description.value
        );

    }
);



const category =
    document.getElementById(
        "category"
    );


const locationInput =
    document.getElementById(
        "location"
    );


const media =
    document.getElementById(
        "media"
    );



const ai = {

    category:
        document.getElementById(
            "aiCategory"
        ),

    priority:
        document.getElementById(
            "aiPriority"
        ),

    department:
        document.getElementById(
            "aiDepartment"
        ),

    duplicate:
        document.getElementById(
            "aiDuplicate"
        ),

    confidence:
        document.getElementById(
            "aiConfidence"
        )

};



const rules = [

    {
        keys: [
            "pothole",
            "road",
            "road damage",
            "footpath",
            "bridge"
        ],

        category:
            "Road Damage",

        department:
            "Roads & Infrastructure"
    },


    {
        keys: [
            "garbage",
            "waste",
            "dustbin",
            "trash"
        ],

        category:
            "Garbage Overflow",

        department:
            "Sanitation"
    },


    {
        keys: [
            "water",
            "leak",
            "pipeline",
            "drain"
        ],

        category:
            "Water Leakage",

        department:
            "Water Supply"
    },


    {
        keys: [
            "street light",
            "streetlight",
            "lamp"
        ],

        category:
            "Street Light",

        department:
            "Electricity"
    },


    {
        keys: [
            "electricity",
            "power",
            "transformer"
        ],

        category:
            "Electricity",

        department:
            "Electricity"
    }

];



function analyze(text) {

    const t =
        text.toLowerCase();


    let result =
        rules.find(
            rule =>
                rule.keys.some(
                    key =>
                        t.includes(key)
                )
        );


    if (!result) {

        result = {

            category: "Other",

            department:
                "General Administration"

        };

    }



    let priority;


    if (
        /fire|accident|danger|life threatening|flood|collapse/
            .test(t)
    ) {

        priority =
            "CRITICAL";

    }

    else if (
        /huge|major|overflow|leak|broken|dangerous|pothole/
            .test(t)
    ) {

        priority =
            "HIGH";

    }

    else if (
        /not working|garbage|minor/
            .test(t)
    ) {

        priority =
            "MEDIUM";

    }

    else {

        priority =
            "LOW";

    }



    ai.category.textContent =
        result.category;


    ai.priority.textContent =
        priority;


    ai.department.textContent =
        result.department;



    const duplicate =
        getComplaints().some(
            complaint =>

                complaint.description &&
                text.length > 20 &&
                similar(
                    complaint.description,
                    text
                )
        );


    ai.duplicate.textContent =
        duplicate
            ? "Possible duplicate"
            : "No similar complaint";


    const confidence =
        90 +
        Math.floor(
            Math.random() * 8
        );


    ai.confidence.textContent =
        confidence + "%";


    return {

        ...result,

        priority,

        duplicate:
            duplicate
                ? "Possible duplicate"
                : "No similar complaint"

    };

}



/* DUPLICATE DETECTION */

function similar(a, b) {

    const words =
        text =>
            new Set(
                text
                    .toLowerCase()
                    .split(/\W+/)
                    .filter(
                        word =>
                            word.length > 3
                    )
            );


    const A =
        words(a);


    const B =
        words(b);


    let matches = 0;


    B.forEach(
        word => {

            if (A.has(word)) {

                matches++;

            }

        }
    );


    return matches >= 3;

}



/* LOCATION */

document.getElementById(
    "locationBtn"
).onclick = () => {

    if (
        !navigator.geolocation
    ) {

        locationInput.value =
            "Location not supported";

        return;

    }


    navigator.geolocation
        .getCurrentPosition(

            position => {

                locationInput.value =
                    `GPS: ${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`;

            },

            () => {

                locationInput.value =
                    "Location permission denied";

            }

        );

};



/* VOICE */

document.getElementById(
    "voiceBtn"
).onclick = () => {

    if (
        !(
            "webkitSpeechRecognition"
            in window
        ) &&
        !(
            "SpeechRecognition"
            in window
        )
    ) {

        document.getElementById(
            "voiceStatus"
        ).textContent =
            "Voice recognition is not supported.";

        return;

    }


    const Recognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    const recognition =
        new Recognition();


    recognition.lang =
        "en-IN";


    recognition.onstart =
        () => {

            document.getElementById(
                "voiceStatus"
            ).textContent =
                "Listening...";

        };


    recognition.onresult =
        event => {

            description.value =
                event
                    .results[0][0]
                    .transcript;


            counter.textContent =
                description.value.length;


            analyze(
                description.value
            );

        };


    recognition.onend =
        () => {

            document.getElementById(
                "voiceStatus"
            ).textContent =
                "Voice captured.";

        };


    recognition.start();

};



/* FILE UPLOAD */

media.onchange = () => {

    const preview =
        document.getElementById(
            "filePreview"
        );


    preview.innerHTML = "";


    [
        ...media.files
    ].forEach(
        file => {

            const element =
                document.createElement(
                    "span"
                );


            element.className =
                "file-chip";


            element.textContent =
                "📎 " +
                file.name;


            preview.appendChild(
                element
            );

        }
    );

};



/* SUBMIT */

document.getElementById(
    "submitComplaint"
).onclick = () => {

    if (
        !description.value.trim() ||
        !locationInput.value.trim()
    ) {

        alert(
            "Please enter the complaint and location."
        );

        return;

    }


    const result =
        analyze(
            description.value
        );


    const complaints =
        getComplaints();


    const id =
        "GRV-2026-" +
        String(
            complaints.length + 1
        ).padStart(
            6,
            "0"
        );


    const complaint = {

        id,

        description:
            description.value.trim(),

        category:
            result.category,

        priority:
            result.priority,

        department:
            result.department,

        location:
            locationInput.value,

        duplicate:
            result.duplicate,

        confidence:
            parseInt(
                ai.confidence.textContent
            ),

        status:
            "In Progress",

        created:
            new Date()
                .toLocaleString(
                    "en-IN"
                )

    };


    complaints.unshift(
        complaint
    );


    saveComplaints(
        complaints
    );


    localStorage.setItem(
        "lastComplaint",
        JSON.stringify(
            complaint
        )
    );


    location.href =
        "result.html";

};