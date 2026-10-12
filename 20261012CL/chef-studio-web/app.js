"use strict";

// Edit this list to add or update the classes shown on the page.
const classes = [
  { id: "pasta-italy", country: "이탈리아", flag: "assets/flag-italy.png", emoji: "🇮🇹", title: "이탈리아 셰프에게 직접 배우는 파스타 요리", price: 35000, image: "assets/pasta-italy.png", imageAlt: "셰프가 포크로 들어 올린 이탈리아 파스타", description: "현지 셰프와 함께 생면부터 소스까지 직접 만들며 정통 파스타의 기본을 배워보세요." },
  { id: "home-singapore", country: "싱가포르", flag: null, emoji: "🇸🇬", title: "도시 농장에서 재배한 재료로 맛보는 집밥", price: 28000, image: "assets/pumpkin-soup.png", imageAlt: "제철 재료로 만든 따뜻한 수프", description: "도시 농장에서 수확한 신선한 재료로 간단하고 균형 잡힌 한 끼를 준비합니다." },
  { id: "truffle-france", country: "프랑스", flag: "assets/flag-france.png", emoji: "🇫🇷", title: "초콜릿 트러플 마스터 클래스 + 프랑스 와인", price: 30000, image: "assets/chocolate-truffle.png", imageAlt: "수제 초콜릿 트러플", description: "초콜릿을 템퍼링하고 부드러운 트러플을 빚은 뒤, 프랑스 와인 페어링을 즐겨보세요." },
  { id: "tacos-mexico", country: "멕시코", flag: "assets/flag-mexico.png", emoji: "🇲🇽", title: "처음부터 끝까지 함께하는 멕시코 요리", price: 35000, image: "assets/tacos-mexico.png", imageAlt: "라임과 함께 담아낸 멕시코 타코", description: "또띠야와 살사까지 직접 준비해 멕시코의 풍미를 한 상에 담아봅니다." },
  { id: "tangerine-korea", country: "한국", flag: "assets/flag-korea.png", emoji: "🇰🇷", title: "제주도에서 온 달달한 감귤 디저트", price: 23000, image: "assets/tangerine-korea.png", imageAlt: "제주 감귤과 잎사귀가 놓인 테이블", description: "제주 감귤의 산뜻한 향을 살린 계절 디저트와 간단한 플레이팅을 배워보세요." },
  { id: "brunch-thailand", country: "태국", flag: "assets/flag-thailand.png", emoji: "🇹🇭", title: "좀 더 가벼운 식사를 하고 싶은 분들을 위해", price: 15000, image: "assets/brunch-thailand.png", imageAlt: "커피와 함께 준비한 가벼운 브런치", description: "바쁜 아침에도 부담 없이 즐길 수 있는 균형 잡힌 브런치 메뉴를 준비합니다." },
  { id: "pancakes-denmark", country: "덴마크", flag: "assets/flag-denmark.png", emoji: "🇩🇰", title: "유럽식 아침 준비하기", price: 18000, image: "assets/pancakes-denmark.png", imageAlt: "시럽을 곁들인 팬케이크", description: "따뜻한 팬케이크와 계절 재료를 이용해 여유로운 유럽식 아침을 만들어봅니다." },
  { id: "pesto-us", country: "미국", flag: "assets/flag-us.png", emoji: "🇺🇸", title: "조용한 농가에서 만들어보는 유기농 파스타", price: 35000, image: "assets/pesto-us.png", imageAlt: "바질 페스토 파스타", description: "농가에서 난 허브와 좋은 재료로 향긋한 페스토 파스타를 완성합니다." },
];

const grid = document.querySelector("#classes");
const countryFilter = document.querySelector("#country-filter");
const sortOrder = document.querySelector("#sort-order");
const searchInput = document.querySelector("#search-input");
const searchForm = document.querySelector(".search-form");
const searchToggle = document.querySelector(".search-toggle");
const filterPanel = document.querySelector("#filter-panel");
const filterButton = document.querySelector(".filter-button");
const filterIcon = filterButton.querySelector("img");
const resultsStatus = document.querySelector("#results-status");
const emptyState = document.querySelector("#empty-state");
const detailDialog = document.querySelector("#detail-dialog");
const detailContent = document.querySelector("#detail-content");
const infoDialog = document.querySelector("#info-dialog");
const infoContent = document.querySelector("#info-content");
const won = new Intl.NumberFormat("ko-KR");
let query = "";

function showFilterIconFallback() {
  filterIcon.dataset.missing = "true";
}
filterIcon.addEventListener("error", showFilterIconFallback, { once: true });
if (filterIcon.complete && filterIcon.naturalWidth === 0) showFilterIconFallback();

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function flagMarkup(item) {
  if (!item.flag) return `<span class="card-flag emoji" aria-label="${escapeHtml(item.country)} 국기">${item.emoji}</span>`;
  return `<img class="card-flag" src="${item.flag}" alt="${escapeHtml(item.country)} 국기" data-fallback="${item.emoji}" />`;
}

function cardMarkup(item) {
  return `
    <article class="class-card" data-id="${item.id}">
      <button class="card-open" type="button" data-action="detail" data-id="${item.id}" aria-label="${escapeHtml(item.country)} ${escapeHtml(item.title)} 상세 보기">
        <div class="card-photo">
          <img src="${item.image}" alt="${escapeHtml(item.imageAlt)}" loading="lazy" data-fallback-title="${escapeHtml(item.country)} 쿠킹 클래스" />
          <div class="photo-fallback" hidden aria-hidden="true"><strong>${item.emoji}</strong><span>이미지를 추가해 주세요</span></div>
        </div>
        <div class="card-body">
          <div class="card-country"><span>${escapeHtml(item.country)}</span>${flagMarkup(item)}</div>
          <p class="card-title">${escapeHtml(item.title)}</p>
          <p class="card-price">1인 ${won.format(item.price)}원</p>
        </div>
      </button>
    </article>`;
}

function getVisibleClasses() {
  const selectedCountry = countryFilter.value;
  const needle = query.trim().toLocaleLowerCase("ko-KR");
  const result = classes.filter((item) => {
    const matchesCountry = selectedCountry === "all" || item.country === selectedCountry;
    const haystack = `${item.country} ${item.title} ${item.description}`.toLocaleLowerCase("ko-KR");
    return matchesCountry && (!needle || haystack.includes(needle));
  });
  switch (sortOrder.value) {
    case "price-asc": result.sort((a, b) => a.price - b.price); break;
    case "price-desc": result.sort((a, b) => b.price - a.price); break;
    case "country": result.sort((a, b) => a.country.localeCompare(b.country, "ko")); break;
  }
  return result;
}

function render() {
  const visible = getVisibleClasses();
  grid.innerHTML = visible.map(cardMarkup).join("");
  emptyState.hidden = visible.length > 0;
  resultsStatus.textContent = query || countryFilter.value !== "all" ? `${visible.length}개의 클래스를 찾았습니다.` : "";
  grid.querySelectorAll(".card-photo img").forEach((image) => {
    image.addEventListener("error", () => {
      image.hidden = true;
      image.nextElementSibling.hidden = false;
    }, { once: true });
  });
  grid.querySelectorAll(".card-flag[src]").forEach((image) => {
    image.addEventListener("error", () => {
      const fallback = document.createElement("span");
      fallback.className = "card-flag emoji";
      fallback.textContent = image.dataset.fallback;
      fallback.setAttribute("aria-label", image.alt);
      image.replaceWith(fallback);
    }, { once: true });
  });
}

function populateCountries() {
  [...new Set(classes.map((item) => item.country))].sort((a, b) => a.localeCompare(b, "ko")).forEach((country) => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    countryFilter.append(option);
  });
}

function openDetail(id) {
  const item = classes.find((entry) => entry.id === id);
  if (!item) return;
  detailContent.innerHTML = `
    <div class="detail-layout">
      <div class="detail-photo"><img src="${item.image}" alt="${escapeHtml(item.imageAlt)}" /></div>
      <div class="detail-copy">
        <p class="card-country">${escapeHtml(item.country)} ${item.emoji}</p>
        <h2 id="detail-title">${escapeHtml(item.title)}</h2>
        <p>${escapeHtml(item.description)}</p>
        <p class="detail-price">1인 ${won.format(item.price)}원</p>
        <button class="primary-action" type="button" data-action="reserve" data-title="${escapeHtml(item.title)}">클래스 문의하기</button>
      </div>
    </div>`;
  const image = detailContent.querySelector(".detail-photo img");
  image.addEventListener("error", () => {
    const frame = image.closest(".detail-photo");
    frame.classList.add("is-missing");
    image.hidden = true;
    frame.insertAdjacentHTML("beforeend", `<span aria-hidden="true">${item.emoji}</span>`);
  }, { once: true });
  detailDialog.showModal();
}

function showInfo(kind) {
  if (kind === "about") {
    infoContent.innerHTML = `<h2 id="info-title">Chef’s Studio 소개</h2><p>세계 각지의 셰프와 함께 요리를 배우고, 좋은 음식과 이야기를 나누는 쿠킹 클래스 플랫폼입니다.</p><p>원하는 나라의 요리를 골라 나만의 속도로 새로운 맛을 만나보세요.</p>`;
  } else {
    infoContent.innerHTML = `<h2 id="info-title">로그인</h2><p>데모 화면입니다. 실제 로그인 기능을 연결하려면 인증 API를 추가해 주세요.</p><form id="login-form"><label>이메일<input type="email" name="email" placeholder="name@example.com" required autocomplete="email" /></label><label>비밀번호<input type="password" name="password" placeholder="비밀번호" required autocomplete="current-password" /></label><button class="primary-action" type="submit">로그인</button><p class="dialog-message" aria-live="polite"></p></form>`;
  }
  infoDialog.showModal();
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "filter") {
    filterPanel.hidden = !filterPanel.hidden;
    filterButton.setAttribute("aria-expanded", String(!filterPanel.hidden));
  } else if (action === "search") {
    searchForm.hidden = !searchForm.hidden;
    searchToggle.setAttribute("aria-expanded", String(!searchForm.hidden));
    searchToggle.setAttribute("aria-label", searchForm.hidden ? "검색 열기" : "검색 닫기");
    if (!searchForm.hidden) searchInput.focus();
    else { searchInput.value = ""; query = ""; render(); }
  } else if (action === "detail") {
    openDetail(button.dataset.id);
  } else if (action === "about" || action === "login") {
    showInfo(action);
  } else if (action === "close-dialog") {
    button.closest("dialog")?.close();
  } else if (action === "reset") {
    countryFilter.value = "all";
    sortOrder.value = "featured";
    searchInput.value = "";
    query = "";
    render();
  } else if (action === "reserve") {
    showInfo("login");
    infoContent.querySelector(".dialog-message").textContent = `“${button.dataset.title}” 문의를 위해 로그인 기능을 연결해 주세요.`;
  }
});

document.addEventListener("submit", (event) => {
  if (event.target.id !== "login-form") return;
  event.preventDefault();
  event.target.querySelector(".dialog-message").textContent = "데모 화면에서는 로그인을 완료하지 않습니다. 실제 인증 서비스를 연결해 주세요.";
});

searchInput.addEventListener("input", () => { query = searchInput.value; render(); });
countryFilter.addEventListener("change", render);
sortOrder.addEventListener("change", render);
document.querySelector("[data-action='classes']").addEventListener("click", () => {
  filterPanel.hidden = true;
  filterButton.setAttribute("aria-expanded", "false");
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    filterPanel.hidden = true;
    filterButton.setAttribute("aria-expanded", "false");
  }
});
document.addEventListener("click", (event) => {
  if (!filterPanel.hidden && !event.target.closest(".filter-wrap")) {
    filterPanel.hidden = true;
    filterButton.setAttribute("aria-expanded", "false");
  }
});

populateCountries();
render();
