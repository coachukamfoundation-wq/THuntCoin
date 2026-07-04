/* ===================================
   THuntCoin v3.0
=================================== */

// ================= Splash Screen =================

window.addEventListener("load", function () {

    setTimeout(function () {

        const splash = document.getElementById("splash");
        const app = document.getElementById("app");

        if (splash) splash.style.display = "none";
        if (app) app.style.display = "block";

    }, 5000);

});

// ================= User Data =================

let balance = Number(localStorage.getItem("balance")) || 0;
let dailyEarnings = Number(localStorage.getItem("dailyEarnings")) || 0;
let adsCount = Number(localStorage.getItem("adsCount")) || 0;

// ================= Update UI =================

function updateBalance() {

    const balanceEl = document.getElementById("balance");
    const earningsEl = document.getElementById("dailyEarnings");
    const adsEl = document.getElementById("adsCount");

    if (balanceEl) balanceEl.textContent = balance;
    if (earningsEl) earningsEl.textContent = dailyEarnings;
    if (adsEl) adsEl.textContent = adsCount;

    localStorage.setItem("balance", balance);
    localStorage.setItem("dailyEarnings", dailyEarnings);
    localStorage.setItem("adsCount", adsCount);

}

updateBalance();

// ================= Phone Vibration =================

function vibratePhone() {

    if (navigator.vibrate) {
        navigator.vibrate(200);
    }

}

// ================= Daily Reward =================

const rewardBtn = document.getElementById("rewardBtn");

if (rewardBtn) {

    rewardBtn.onclick = function () {

        const today = new Date().toDateString();
        const claimed = localStorage.getItem("dailyReward");

        if (claimed === today) {

            alert("🎁 You have already claimed today's reward.");
            return;

        }

        balance += 10;
        dailyEarnings += 10;

        localStorage.setItem("dailyReward", today);

        updateBalance();
        vibratePhone();

        alert("🎉 Congratulations! You have claimed 10 Stars ⭐");

    };

}

// ================= Telegram =================

const channelBtn = document.getElementById("channelBtn");
const supportBtn = document.getElementById("supportBtn");
const inviteBtn = document.getElementById("inviteBtn");

if (channelBtn) {

    channelBtn.onclick = function () {
        window.open("https://t.me/TokenHCoinNews", "_blank");
    };

}

if (supportBtn) {

    supportBtn.onclick = function () {
        window.open("https://t.me/THCoinSupportbot", "_blank");
    };

}

if (inviteBtn) {

    inviteBtn.onclick = function () {
        window.open("https://t.me/THuntCoinbot", "_blank");
    };

}

// ================= Reward Function =================

function rewardUser() {

    if (adsCount >= 15) {

        alert("📺 Daily ad limit reached.");
        return;

    }

    adsCount++;

    localStorage.setItem("adsCount", adsCount);

    balance += 35;

    dailyEarnings += 35;

    localStorage.setItem("balance", balance);
    localStorage.setItem("dailyEarnings", dailyEarnings);

    updateBalance();

    if (document.getElementById("adsCount")) {

        document.getElementById("adsCount").textContent = adsCount;

    }

    vibratePhone();

    alert("🎉 Congratulations! You earned 35⭐");

}

// ================= Rewarded Ads =================

const ad1Btn = document.getElementById("ad1Btn");
const ad2Btn = document.getElementById("ad2Btn");
const ad3Btn = document.getElementById("ad3Btn");

function watchRewardedAd(mode = null){

    let adPromise;

    if(mode === "pop"){

        adPromise = show_11218283("pop");

    }else{

        adPromise = show_11218283();

    }

    adPromise
    .then(function(){

        // Reward ONLY after 1 Minutes of each ads watched
        rewardUser();

    })
    .catch(function(){

        alert("❌ Ad was not completed. No reward was given.");

    });

}

if(ad1Btn){

    ad1Btn.onclick = function(){

        watchRewardedAd();

    };

}

if(ad2Btn){

    ad2Btn.onclick = function(){

        watchRewardedAd("pop");

    };

}

if(ad3Btn){

    ad3Btn.onclick = function(){

        watchRewardedAd();

    };

}

// ================= In-App Ads =================

show_11218283({

    type:"inApp",

    inAppSettings:{

        frequency:2,
        capping:0.1,
        interval:30,
        timeout:5,
        everyPage:false

    }

});

// ================= Navigation =================

const pages = document.querySelectorAll(".page");

function showPage(pageId) {

    pages.forEach(function (page) {

        page.style.display = "none";

    });

    const page = document.getElementById(pageId);

    if (page) {

        page.style.display = "block";

    }

}

const homeNav = document.getElementById("homeNav");
const earnNav = document.getElementById("earnNav");
const huntNav = document.getElementById("huntNav");
const withdrawNav = document.getElementById("withdrawNav");
const profileNav = document.getElementById("profileNav");

if (homeNav) {

    homeNav.onclick = function () {

        showPage("homePage");

    };

}

/* ===========================
   TOKEN HUNT GAME
=========================== */

const huntTiles = document.querySelectorAll(".huntTile");
const huntReward = document.getElementById("huntReward");
const playAgainBtn = document.getElementById("playAgainBtn");

const rewards = [
    { icon: "⭐", value: 10 },
    { icon: "⭐", value: 2},
    { icon: "⭐", value: 5 },
    { icon: "⭐", value: 1},
    { icon: "💎", value: 5 },
    { icon: "💣", value: 0 },
    { icon: "⭐", value: 20 },
    { icon: "⭐", value: 5 },
    { icon: "💣", value: 0 }
];

let totalHuntReward = 0;

function shuffleRewards() {

    for (let i = rewards.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [rewards[i], rewards[j]] = [rewards[j], rewards[i]];

    }

}

function startHunt() {

    totalHuntReward = 0;

    if (huntReward) {

        huntReward.textContent = "0⭐";

    }

    shuffleRewards();

    huntTiles.forEach(function (tile) {

        tile.innerHTML = "🎁";
        tile.disabled = false;

    });

}

if (earnNav) {

    earnNav.onclick = function () {

        showPage("earnPage");

    };

}

if (huntNav) {

    huntNav.onclick = function () {

        showPage("huntPage");

    };

}

document.getElementById("withdrawNav").onclick = function () {
    showPage("withdrawPage");
    updateWithdrawBalance();
};



if (profileNav) {

    profileNav.onclick = function () {

        updateProfile();

        showPage("profilePage");

    };



}

huntTiles.forEach(function (tile, index) {

    tile.onclick = function () {

        if (tile.disabled) return;

        const reward = rewards[index];

        tile.innerHTML = reward.icon;
        tile.disabled = true;

        if (reward.icon === "💣") {

            vibratePhone();
            alert("💣 Bomb! No reward from this tile.");

        } else {

            totalHuntReward += reward.value;
            balance += reward.value;
            dailyEarnings += reward.value;

            updateBalance();
            vibratePhone();

        }

        if (huntReward) {

            huntReward.textContent = totalHuntReward + "⭐";

        }

        const opened = document.querySelectorAll(".huntTile:disabled").length;

if (opened === huntTiles.length) {

    let gamesPlayed = Number(localStorage.getItem("huntGames")) || 0;

    gamesPlayed++;

    localStorage.setItem("huntGames", gamesPlayed);

    updateProfile();

    alert("🎉 Game Finished!\n\nYou won " + totalHuntReward + "⭐");

}

    };

});

if (playAgainBtn) {

    playAgainBtn.onclick = function () {

        startHunt();

    };

}

// ================= Start Game =================

startHunt();


/* ===========================
   WITHDRAW PAGE
=========================== */

const withdrawBalance = document.getElementById("withdrawBalance");
const withdrawAmount = document.getElementById("withdrawAmount");
const walletAddress = document.getElementById("walletAddress");
const withdrawBtn = document.getElementById("withdrawBtn");
const withdrawHistory = document.getElementById("withdrawHistory");

function updateWithdrawBalance() {
    withdrawBalance.textContent = balance + "⭐";
}

updateWithdrawBalance();

withdrawBtn.onclick = function () {

    const amount = Number(withdrawAmount.value);
    const wallet = walletAddress.value.trim();

    if (wallet === "") {
        alert("⚠️ Please enter your TON wallet address.");
        return;
    }

    if (amount < 5000) {
        alert("⚠️ Minimum withdrawal is 5000⭐.");
        return;
    }

    if (amount > balance) {
        alert("❌ Insufficient balance.");
        return;
    }

    balance -= amount;

    updateBalance();
    updateWithdrawBalance();

    const now = new Date().toLocaleString();

    localStorage.setItem("balance", balance);

    withdrawHistory.innerHTML =
        "✅ " + amount + "⭐ requested<br><br>" +
        "📅 " + now;

    withdrawAmount.value = "";
    walletAddress.value = "";

    alert("🎉 Withdrawal request submitted successfully!");
};

/* ===========================
   WITHDRAW NAVIGATION
=========================== */

document.getElementById("withdrawNav").onclick = function () {
    showPage("withdrawPage");
};

/* ===========================
   PROFILE PAGE
=========================== */

const profileName = document.getElementById("profileName");
const profileUsername = document.getElementById("profileUsername");
const profileId = document.getElementById("profileId");
const profileBalance = document.getElementById("profileBalance");
const profileAds = document.getElementById("profileAds");
const profileGames = document.getElementById("profileGames");
const profileWithdrawn = document.getElementById("profileWithdrawn");

/* Update Profile */

function updateProfile(){

    if(profileBalance){

        profileBalance.textContent = balance + "⭐";

    }

    if(profileAds){

        profileAds.textContent = adsCount;

    }

    if(profileGames){

        profileGames.textContent =
        Number(localStorage.getItem("huntGames")) || 0;

    }

    if(profileWithdrawn){

        profileWithdrawn.textContent =
        (Number(localStorage.getItem("totalWithdrawn")) || 0) + "⭐";

    }

}

/* Telegram Mini App */

if(window.Telegram && Telegram.WebApp){

    Telegram.WebApp.ready();

    const user = Telegram.WebApp.initDataUnsafe.user;

    if(user){

        if(profileName){

            profileName.textContent =
            user.first_name || "Telegram User";

        }

        if(profileUsername){

            profileUsername.textContent =
            user.username ? "@" + user.username : "@username";

        }

        if(profileId){

            profileId.textContent =
            user.id || "Telegram ID";

        }

    }

}

/* Open Profile Page */

if(profileNav){

    profileNav.onclick = function(){

        updateProfile();

        showPage("profilePage");

    };

    }
