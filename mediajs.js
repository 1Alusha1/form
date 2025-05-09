const URI = {
  dev: 'http://localhost:8080',
  prod: 'https://us-central1-test2-411610.cloudfunctions.net/trackform',
};

const mode = URI['prod'];

const hendlebutton = document.querySelectorAll('.hendlebutton');
const fomr = document.querySelector('#form');
const links = {
  telegram: 'https://t.me/hot_leads_trafficg_bot',
  whatsapp: "https://api.whatsapp.com/send/?phone=6283115600982&text=",
  // whatsapp: 'https://wa.me/380682314382',
};

const getIp = async () => {
  const res = await fetch('https://api64.ipify.org');
  const data = await res.text();
  return data;
};

function stringToBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}
async function geoIpLookup() {
  const res = await fetch('https://get.geojs.io/v1/ip/country.json');

  const { country, ip } = await res.json();

  return { country, ip };
}

const handleClick = async function (e) {
  e.preventDefault();
  const leadIp = await geoIpLookup();
  const session = getSesionId(6);

  switch (this.dataset.platform) {
    case 'telegram':
      const data = `${decodeURIComponent(getUtmParams().ad)}-${leadIp.country}`;
      console.log(`tg://resolve?domain=hot_leads_trafficg_bot&start=${data}`);
      window.location.href = `tg://resolve?domain=hot_leads_trafficg_bot&start=${
        getUtmParams().ad
      }-${leadIp.country}`;
      break;
    case 'whatsapp':
              await fetch(
          `https://network-leads-d5f31c95b87f.herokuapp.com/save-hash?advertisment=${
            getUtmParams().ad
          }&geo=${leadIp.country}&sessionId=${session}`,
          {
            mode: "no-cors",
          }
        );
        window.location.href =
        links[this.dataset.platform] + `Hi! Send this personal code and we will contact you soon - start_${session}`;

        console.log({
          advertisment: getUtmParams().ad,
          geo: leadIp.country,
          sessionId: session,
        });
      break;
    default:
      return;
  }

  fbq('track', 'Lead');
  const chat_id = "8119682966";
  await fetch(
    `https://api.telegram.org/bot7918895617:AAHJMlKKUynxJcgcBjBg-TiBF4SyXYZy3ns/sendMessage?chat_id=${chat_id}&text=${JSON.stringify(
    {
       platform: this.dataset.platform,
       userId: "7325647133",
       created_at: Date.now(),
       utmLink: getUtmParams().ad,
       leadIp: leadIp.ip,
     }
    )}
    `,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    }
  );
};

hendlebutton.forEach((item) => {
  item.addEventListener('click', handleClick);
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const leadIp = await getIp();
  const email = form.querySelector('.email-input');
  const emailValue = email.value.trim();
  const errorMessage = form.querySelector('.error-message');
  const thxMessage = document.querySelector('.thx-message');

  if (!emailValue.trim()) {
    errorMessage.innerHTML = 'This field cant be empty';
    return false;
  }

  thxMessage.innerHTML = 'Thank you!';
  email.value = '';
  errorMessage.innerHTML = '';

  fbq('track', 'Lead');
  const chat_id = "8119682966";
  await fetch(
    `https://api.telegram.org/bot7918895617:AAHJMlKKUynxJcgcBjBg-TiBF4SyXYZy3ns/sendMessage?chat_id=${chat_id}&text=${JSON.stringify(
    {
       platform: this.dataset.platform,
       userId: "7325647133",
       created_at: Date.now(),
       utmLink: getUtmParams().ad,
       leadIp: leadIp.ip,
     }
    )}
    `,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    }
  );
});

function getUtmParams() {
  var params = new URLSearchParams(window.location.search);

  // Составляем объект с UTM параметрами
  var utmParams = {
    ad: params.get('ad'),
    pixel: params.get('pixel'),
  };

  // Убираем параметры с пустыми значениями
  Object.keys(utmParams).forEach((key) => {
    if (!utmParams[key]) {
      delete utmParams[key];
    }
  });

  return utmParams;
}
