const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("id");

async function createPage() {
  let data = await fetch(
    `https://5fc315479210060016869e72.mockapi.io/lolchamps/api/stats?id=${myParam}`,
    {
      method: "GET",
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res[0];
    });
  let abilityIcons = document.getElementsByClassName("icon-btn");
  let abilityVideos = document.getElementsByClassName("ability-videos");
  let abilityInfo = document.getElementsByClassName("abilities-info");
  document.getElementById("pageTitle").innerHTML =
    data.name + ` - League of Legends`;
  document.getElementById(
    "intro"
  ).style = `background-image: url(${data.imageFull});`;
  document.getElementById("intro").innerHTML = `
      <h2>${data.title}</h2>
      <h1>${data.name}</h1>`;
  document.getElementById("lore").innerHTML = `${data.lore}`;
  for (let i = 0; i < abilityVideos.length; i++) {
    abilityVideos[i].src = data.abilities[i].video;
  }
  for (let i = 0; i < abilityIcons.length; i++) {
    abilityIcons[i].style = `background-image: url(${data.abilities[i].icon});`;
    abilityIcons[i].addEventListener("click", () => {
      for (let video of abilityVideos) {
        if (!video.classList.contains("hidden")) {
          video.classList.toggle("hidden");
        }
      }
      abilityVideos[i].classList.toggle("hidden");
      for (let info of abilityInfo) {
        if (!info.classList.contains("hidden")) {
          info.classList.toggle("hidden");
        }
      }
      abilityInfo[i].classList.toggle("hidden");
    });
  }
  for (let i = 0; i < abilityInfo.length; i++) {
    abilityInfo[i].innerHTML = `
        <h3>${data.abilities[i].abilityName}</h3>
        <p class="key">${data.abilities[i].key}</p>
        <p class="ability-desc">
            ${data.abilities[i].description}
        </p>`;
  }
  let pos = data.position.join(", ");
  let price = data.storePrice[0] + " | " + data.storePrice[1];
  document.getElementById("general-info").innerHTML = `
    <p>Realease Date</p>
    <p>${data.releaseDate}</p>
    <p>Role</p>
    <p>${data.role}</p>
    <p>Position</p>
    <p>${pos}</p>
    <p>Resource</p>
    <p>${data.resource}</p>
    <p>Range Type</p>
    <p>${data.rangeType}</p>
    <p>Adaptive Type</p>
    <p>${data.adaptiveType}</p>
    <p>Store Price</p>
    <p>${price}</p>`;
  document.getElementById("base-stats").innerHTML = `
    <p>Health</p>
    <p>${data.health}</p>
    <p>Health Regen.</p>
    <p>${data.healthRegen}</p>
    <p>Mana</p>
    <p>${data.mana}</p>
    <p>Mana Regen.</p>
    <p>${data.manaRegen}</p>
    <p>Attack Damage</p>
    <p>${data.attackDamage}</p>
    <p>Attack Range</p>
    <p>${data.attackRange}</p>
    <p>Crit Damage</p>
    <p>${data.critDamage}</p>
    <p>Armor</p>
    <p>${data.armor}</p>
    <p>Magic Resist.</p>
    <p>${data.magicResist}</p>
    <p>Attack Speed</p>
    <p>${data.attackSpeed}</p>
    <p>Move Speed</p>
    <p>${data.moveSpeed}</p>`;
}

createPage();
