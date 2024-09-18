import MessageManager from "./classes/MessageManager";

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const API_NEWS_KEY = "bb625f463e9b4968b164fa20928ec7f6";

let messageManager;

//* https://www.hebcal.com/shabbat/?cfg=json&geonameid=293768&m=50*/
function updateDateTime() {
  const now = new Date();

  document.getElementById("date").textContent = now.toLocaleDateString(
    "he-IL",
    dateOptions
  );

  document.getElementById("time").textContent = now.toLocaleTimeString("he-IL");
}

async function religionSectionUpdate() {
  const now = new Date();
  const date = formatDateToStringCA(now); // yyyy-mm-dd format
  const requestDateURL = `https://www.hebcal.com/converter?cfg=json&date=${date}&g2h=1&strict=1`;
  const responseDate = await fetch(requestDateURL);
  const dataDateJSON = await responseDate.json();

  //
  const hebrewDate = extractHebrewDate(dataDateJSON);
  document.getElementById("hebrew-date").textContent = hebrewDate;

  const requestSahbatURL =
    "https://www.hebcal.com/shabbat/?cfg=json&geonameid=293768&m=50";
  const responseSahbat = await fetch(requestSahbatURL);
  const dataSahbatJSON = await responseSahbat.json();

  const sahbatDetails = extractSahbatDetailsToHTML(dataSahbatJSON);
  document.getElementById("rel-det").innerHTML = sahbatDetails;
}

function extractHebrewDate(data) {
  try {
    return data.hebrew;
  } catch (e) {
    console.log(e);
    return "";
  }
}

function extractSahbatDetailsToHTML(data) {
  try {
    const items = data.items;
    const candles = items.find((item) => item.category === "candles");
    const date = new Date(candles.date);
    const now = new Date();

    const parashat = items.find((item) => item.category === "parashat");

    htmlStr = "";
    htmlStr += `<div><img src="images/sefer.svg" alt="ספר תורה" class="icon"/> פרשת השבוע: <span>${parashat.hebrew}</span></div><div><img src="images/candels.svg" alt="נרות שבת" class="icon"/> זמני כניסת שבת: </div><div id="shabat-time">`;
    if (!isDatesAreSameDay(date, now)) {
      htmlStr += `<div>תאריך שבת הקרובה: <span>${date.toLocaleDateString(
        "he-IL"
      )}</span></div>`;
    }
    htmlStr += `<div>️כניסת שבת בשעה: <span>${formatTimeStringToHHMM(
      date
    )}</span></div></div>`;
    return htmlStr;
  } catch (e) {
    console.log(e);
    return "";
  }
}

function isDatesAreSameDay(dateA, dateB) {
  return (
    dateA.getFullYear() == dateB.getFullYear() &&
    dateA.getMonth() == dateB.getMonth() &&
    dateA.getDate() == dateB.getDate()
  );
}

async function setNews() {
  try {
    const now = new Date();
    const prevDate = new Date();
    prevDate.setTime(now.getTime() - 172800000); // set 48 hours before currnet time.

    const requestNewsApiURL = `https://newsapi.org/v2/everything?domains=ynet.co.il&pageSize=5&from=${formatDateToStringCA(
      prevDate
    )}&apiKey=${API_NEWS_KEY}`;

    const response = await fetch(requestNewsApiURL);
    const newsJSON = await response.json();
    const articels = newsJSON.articles;
    document.getElementById("articels").innerHTML =
      generateArticlesHTML(articels);
    console.log(requestNewsApiURL);
  } catch (e) {
    console.log(e);
  }
}

async function setMivzakim() {
  try {
    const requestNewsApiURL = `https://newsapi.org/v2/top-headlines?country=il&apiKey=${API_NEWS_KEY}`;

    const response = await fetch(requestNewsApiURL);
    const newsJSON = await response.json();
    const articels = newsJSON.articles;
    document.getElementById("mivzkim").innerHTML =
      generateArticlesMivzakimHTML(articels);
    console.log(requestNewsApiURL);
  } catch (e) {
    console.log(e);
  }
}

function formatDateToStringCA(date) {
  return date.toLocaleDateString("en-CA");
}

function formatTimeStringToHHMM(date) {
  // Extract hours and minutes
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Format as HH:MM
  return `${hours}:${minutes}`;
}

function generateArticlesHTML(articles) {
  let html = "<aside>";

  articles.forEach((article) => {
    html += `
    <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${article.urlToImage}" class="img-fluid rounded-start" alt="${
      article.title
    }">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h6 class="card-title">${article.title}</h5>
        <p class="card-text"><small class="text-body-secondary">${new Date(
          article.publishedAt
        ).toLocaleString("he-IL")}</small></p>
      </div>
    </div>
  </div>
</div>
      `;
  });

  html += "</aside>";
  return html;
}

function generateArticlesMivzakimHTML(articles) {
  html = `<div>`;
  articles.forEach((article) => {
    html += `<article> | <small class="text-body-primary"> ${
      article.title
    }</small> <small class="text-body-secondary">${new Date(
      article.publishedAt
    ).toLocaleString("he-IL")}</small></article> `;
  });

  html = html + "</div>";

  return html;
}

window.init = function init() {
  //initions
  updateDateTime();
  religionSectionUpdate();
  setNews();
  setMivzakim();
  //call intervals
  setInterval(updateDateTime, 1000);

  messageManager = new MessageManager();
};

window.addMessage = function addMessage() {
  const input = document.getElementById("message-input");

  if (input.value.trim() !== "") {
    messageManager.addMessage(input);
    showMessages();
  }
};

function showMessages() {
  const toastContainer = document.getElementById("toast-container");
  toastContainer.innerHTML = "";
  for (let message of messageManager.messages) {
    let toastHTML = `
<div class="toast align-items-center mb-4 text-white show" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-body fs-1">
    ${message.text}
  </div>
</div>
`;
    toastContainer.innerHTML += toastHTML;
  }
}
