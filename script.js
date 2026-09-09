// ===============================
// BHANDARA DATA
// ===============================

const bhandaraData = {

    varanasi: {
        name: "Varanasi",

        bhandare: [
            {
                name: "महाशिवरात्रि भंडारा",
                date: "आज",
                time: "12:00 PM - 4:00 PM",
                location: "काशी क्षेत्र, Varanasi",
                exactLocation: "गोदौलिया चौराहा, वाराणसी",
                map: "https://maps.google.com/"
            },

            {
                name: "संत सेवा भंडारा",
                date: "कल",
                time: "11:00 AM - 3:00 PM",
                location: "Varanasi",
                exactLocation: "लंका क्षेत्र, वाराणसी",
                map: "https://maps.google.com/"
            },

            {
                name: "छात्र सेवा भंडारा",
                date: "आज",
                time: "1:00 PM - 5:00 PM",
                location: "Varanasi",
                exactLocation: "BHU Road, Varanasi",
                map: "https://maps.google.com/"
            }
        ]
    },

    ghazipur: {
        name: "Ghazipur",

        bhandare: [
            {
                name: "जन सेवा भंडारा",
                date: "आज",
                time: "12:00 PM - 3:00 PM",
                location: "Ghazipur",
                exactLocation: "मुख्य बाजार, Ghazipur",
                map: "https://maps.google.com/"
            },

            {
                name: "सामूहिक प्रसाद सेवा",
                date: "कल",
                time: "11:00 AM - 4:00 PM",
                location: "Ghazipur",
                exactLocation: "Railway Road, Ghazipur",
                map: "https://maps.google.com/"
            }
        ]
    },

    lucknow: {
        name: "Lucknow",

        bhandare: [
            {
                name: "सार्वजनिक भंडारा",
                date: "आज",
                time: "12:00 PM - 5:00 PM",
                location: "Lucknow",
                exactLocation: "Hazratganj, Lucknow",
                map: "https://maps.google.com/"
            },

            {
                name: "सेवा भंडारा",
                date: "कल",
                time: "11:00 AM - 4:00 PM",
                location: "Lucknow",
                exactLocation: "Aliganj, Lucknow",
                map: "https://maps.google.com/"
            }
        ]
    },

    prayagraj: {
        name: "Prayagraj",

        bhandare: [
            {
                name: "प्रसाद वितरण भंडारा",
                date: "आज",
                time: "12:00 PM - 4:00 PM",
                location: "Prayagraj",
                exactLocation: "Civil Lines, Prayagraj",
                map: "https://maps.google.com/"
            }
        ]
    }
};


// ===============================
// SELECTED BHANDARA
// ===============================

let selectedBhandara = null;


// ===============================
// SEARCH BHANDARA
// ===============================

function searchBhandara() {

    const city = document.getElementById("citySelect").value;

    // City select नहीं किया
    if (!city) {
        alert("कृपया पहले अपना शहर चुनें।");
        return;
    }

    const data = bhandaraData[city];

    const list = document.getElementById("bhandaraList");

    const stats = document.getElementById("cityStats");

    const title = document.getElementById("resultTitle");


    // Heading
    title.innerText =
        `${data.name} में ${data.bhandare.length} भंडारे उपलब्ध हैं`;


    // Statistics show करें
    stats.classList.remove("hidden");


    // आज के भंडारे
    const today =
        data.bhandare.filter(
            item => item.date === "आज"
        ).length;


    // इस समय demo में total को week count मान रहे हैं
    const week =
        data.bhandare.length;


    // Count update
    document.getElementById("todayCount").innerText =
        today;

    document.getElementById("weekCount").innerText =
        week;

    document.getElementById("totalCount").innerText =
        data.bhandare.length;


    // पुराने cards हटाएं
    list.innerHTML = "";


    // नए cards बनाएं
    data.bhandare.forEach((item, index) => {

        const card =
            document.createElement("div");

        card.className =
            "bhandara-card";


        card.innerHTML = `

            <div class="date">
                ${item.date}
            </div>

            <h3>
                ${item.name}
            </h3>

            <div class="time">
                🕐 ${item.time}
            </div>

            <div class="location">
                📍 ${item.location}
            </div>

            <div class="location locked">
                🔒 Exact Location Locked
            </div>

            <button
                class="unlock-button"
                onclick="openPayment(${index}, '${city}')"
            >
                🔓 ₹11 में Location Unlock करें
            </button>

        `;


        list.appendChild(card);

    });


    // Results section तक जाएं
    document
        .getElementById("bhandare")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ===============================
// PAYMENT MODAL OPEN
// ===============================

function openPayment(index, city) {

    selectedBhandara =
        bhandaraData[city].bhandare[index];


    document.getElementById(
        "paymentBhandaraName"
    ).innerText =
        selectedBhandara.name;


    document.getElementById(
        "paymentModal"
    ).style.display = "flex";
}


// ===============================
// CLOSE PAYMENT MODAL
// ===============================

function closePayment() {

    document.getElementById(
        "paymentModal"
    ).style.display = "none";
}


// ===============================
// DEMO PAYMENT
// ===============================

function demoPayment() {

    if (!selectedBhandara) {
        alert("Bhandara select नहीं हुआ।");
        return;
    }


    /*
        अभी यह DEMO PAYMENT है।

        असली website में यहाँ Razorpay
        payment integration लगाया जाएगा।
    */


    alert(
        "✅ Demo Payment Successful!\n\n" +
        "आपकी Location Unlock हो गई है।"
    );


    closePayment();


    // Exact location दिखाएं
    alert(
        "📍 Exact Location:\n\n" +
        selectedBhandara.exactLocation
    );


    // Google Maps खोलें
    window.open(
        selectedBhandara.map,
        "_blank"
    );
}