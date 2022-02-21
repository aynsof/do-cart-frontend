  const baseUrl = "https://dur-obj-shopping-cart.kingsmillio.workers.dev/";

  async function renderCart() {
    var userID = document.getElementById("userid").value;

    let cart = await getCart(userID);
    console.log(cart);
    let html = "<table>";

    for(var item in cart) {
      let htmlSegment = `<tr>
                            <td><strong>${item}</strong></td>
                            <td>${cart[item]}</td>
                        </tr>`;

      html += htmlSegment;
    }
 
    document.getElementById("cart").innerHTML = html;
  }

  async function renderItemChange(toAdd) {
    var userID = document.getElementById("userid").value;
    var item = document.getElementById("item").value;
    var number = document.getElementById("number").value;

    if (toAdd) {
      let cart = await modifyItem(userID, item, number, "add");
    } else {
      let cart = await modifyItem(userID, item, number, "remove");
    }
    
    await renderCart();

  }

  async function modifyItem(userID, item, number, action) {
    const url =
      baseUrl + action + "?objectId=" + userID + "&number=" + number + "&item=" + item;

    try {
      let res = await fetch(url);

      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function getCart(userID) {
    const url =
      baseUrl + "?objectId=" + userID;

    try {
      let res = await fetch(url);

      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }