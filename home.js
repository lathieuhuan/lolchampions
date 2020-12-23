function isHidden(ele) {
  return ele.classList.contains("hidden");
}

function hideORshow(ele) {
  ele.classList.toggle("hidden");
}

function showRightCards(iArr, cards) {
  for (let j = 0; j < cards.length; j++) {
    if (
      (iArr.indexOf(j) == -1 && !isHidden(cards[j])) ||
      (iArr.indexOf(j) != -1 && isHidden(cards[j]))
    ) {
      hideORshow(cards[j]);
    }
  }
}

async function main() {
  let data = await fetch(
    `https://5fc315479210060016869e72.mockapi.io/lolchamps/api/stats`,
    {
      method: "GET",
    }
  ).then((res) => {
    return res.json();
  });
  let searchBox = document.getElementById("search-box");
  let dropdown = document.getElementById("dropdown");
  let caution = document.getElementById("caution");
  let cards = document.getElementsByClassName("card");
  let opts = document.getElementsByClassName("opt");
  // duyệt VỊ TRÍ của tất cả tướng
  for (let i = 0; i < data.length; i++) {
    // thêm thẻ tướng
    document.getElementById("results").insertAdjacentHTML(
      "beforeend",
      `
      <a href="champ.html?id=${data[i].id}">
        <div class="container col card">
            <img
              src="${data[i].imageCard}"
              alt=""
            />
            <h3>${data[i].name}</h3>
        </div>
      </a>
      `
    );
    // thêm tên tướng vào dropdown
    dropdown.insertAdjacentHTML(
      "beforeend",
      `
      <input type="button" class="opt" value="${data[i].name}" />
    `
    );
    // tạo event click vào tên tướng hiện thẻ tướng
    let lastOpt = opts[opts.length - 1];
    lastOpt.addEventListener("click", () => {
      showRightCards([i], cards);
    });
  }
  // tạo event hiện dropdown
  searchBox.addEventListener("click", (event) => {
    // if để khi đang nhập chữ, nhấn vào ô search ko tắt dropdown
    // có thể ko dùng if
    if (event.target.value == "") {
      hideORshow(dropdown);
      for (let member of opts) {
        // hiện tất cả tên tướng
        if (isHidden(member)) {
          hideORshow(member);
        }
      }
      if (!isHidden(caution)) {
        // tắt caution
        hideORshow(caution);
      }
    }
  });
  // tạo event nhấp ra ngoài tắt dropdown
  window.addEventListener("click", (event) => {
    if (!event.target.matches(".search") && !isHidden(dropdown)) {
      hideORshow(dropdown);
      searchBox.value = "";
    }
  });
  // tạo event hiện tên tướng theo chữ nhập vào
  searchBox.addEventListener("input", (event) => {
    /* if cho trường hợp nhấn search-box nhưng giữ chuột ra bên ngoài mới thả
    dropdown bị ẩn nhưng vẫn nhập chữ được */
    if (isHidden(dropdown)) {
      hideORshow(dropdown);
    }
    let input = event.target.value.toLowerCase();
    for (let member of opts) {
      let firstChars = member.value.toLowerCase().substring(0, input.length);
      if (
        (firstChars == input && isHidden(member)) ||
        (firstChars != input && !isHidden(member))
      ) {
        hideORshow(member);
      }
    }
    // đặt flag để xem tìm thấy tướng hay ko
    let found = false;
    for (let member of opts) {
      if (!isHidden(member)) {
        found = true;
        break;
      }
    }
    // dùng flag để bật / tắt caution
    if (
      (!found && isHidden(caution)) || // isHidden cho trường hợp liên tục ko tìm thấy tướng, caution đang hiện sẽ ko ẩn
      (found && !isHidden(caution)) // !isHidden cho trường hợp chuyển từ ko tìm thấy sang tìm thấy, caution đang hiện sẽ ẩn
    ) {
      hideORshow(caution);
    }
  });
  // tạo event nhấn enter trong ô search hiện tướng đúng tên
  searchBox.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      // event.preventDefault();
      let found = false;
      for (let i = 0; i < data.length; i++) {
        if (data[i].name.toLowerCase() == event.target.value.toLowerCase()) {
          showRightCards([i], cards);
          hideORshow(dropdown);
          event.target.value = "";
          found = true;
          break;
        }
        // if (!found) show warning
      }
    }
  });
  // tạo event click role hiện các thẻ tướng đúng role
  for (let roleBtn of document.getElementsByClassName("role-btn")) {
    roleBtn.addEventListener("click", (event) => {
      if (event.target.value == "ALL") {
        for (let member of cards) {
          if (isHidden(member)) {
            hideORshow(member);
          }
        }
      } else {
        let iArr = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].role.toLowerCase() == event.target.value.toLowerCase()) {
            iArr.push(i);
          }
        }
        showRightCards(iArr, cards);
      }
    });
  }
}

main();
