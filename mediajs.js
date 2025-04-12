const URI = {
  dev: "http://localhost:8080",
  prod: "https://us-central1-test2-411610.cloudfunctions.net/trackform",
};

const mode = URI["prod"];

const hendlebutton = document.querySelectorAll(".hendlebutton");
const fomr = document.querySelector("#form");
const links = {
  telegram: "https://t.me/hot_leads_trafficg_bot",
  whatsapp: "https://wa.me/420722242996",
  skype: "",
};

const getIp = async () => {
  const res = await fetch("https://api64.ipify.org");
  const data = await res.text();
  return data;
};

const handleClick = async function (e) {
  e.preventDefault();
  const leadIp = await getIp();

  if (this.dataset.platform === "skype") {
    openSkype("live:.cid.a69ff49abe732e55");
  } else {
    window.location.href = links[this.dataset.platform];
  }

  fbq('track', 'Lead');
  await fetch(`https://us-central1-test2-411610.cloudfunctions.net/trackform`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      platform: this.dataset.platform,
      userId: "7325647133",
      created_at: Date.now(),
      utmLink: getUtmParams(),
      leadIp: leadIp,
    }),
  });
};

hendlebutton.forEach((item) => {
  item.addEventListener("click", handleClick);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const leadIp = await getIp();
  const email = form.querySelector(".email-input");
  const emailValue = email.value.trim();
  const errorMessage = form.querySelector(".error-message");
  const thxMessage = document.querySelector(".thx-message");

  if (!emailValue.trim()) {
    errorMessage.innerHTML = "This field cant be empty";
    return false;
  }

  thxMessage.innerHTML = "Thank you!";
  email.value = "";
  errorMessage.innerHTML = "";

  fbq('track', 'Lead');
  await fetch(`https://us-central1-test2-411610.cloudfunctions.net/trackform`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: emailValue,
      userId: "7325647133",
      created_at: Date.now(),
      utmLink: getUtmParams(),
      leadIp: leadIp,
    }),
  });
});

function getUtmParams() {
  var params = new URLSearchParams(window.location.search);

  // Составляем объект с UTM параметрами
  var utmParams = {
    ad: params.get("ad"),
  };

  // Убираем параметры с пустыми значениями
  Object.keys(utmParams).forEach((key) => {
    if (!utmParams[key]) {
      delete utmParams[key];
    }
  });

  return utmParams.ad;
}

function openSkype(username) {
  const skypeLink = `skype:${username}?chat`;
  const appStoreLink = "https://apps.apple.com/app/skype/id304878510";
  const playStoreLink =
    "https://play.google.com/store/apps/details?id=com.skype.raider";
  const skypeWebLink = "https://web.skype.com/";

  const link = document.createElement("a");
  link.href = skypeLink;
  document.body.appendChild(link);

  const now = Date.now();
  link.click();

  // Проверяем, открылось ли приложение
  setTimeout(() => {
    if (Date.now() - now < 1500) {
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = appStoreLink;
      } else if (/Android/i.test(navigator.userAgent)) {
        window.location.href = playStoreLink;
      } else {
        window.location.href = skypeWebLink;
      }
    }
  }, 1000);
}
