//Get Element By ID
function getElementTextValueById(elementId, value) {
  let elementField = document.getElementById(elementId);
  return (elementField.innerText = value.toFixed(2));
}

let total = 0;
//Event Handler
function handleEvent(target) {
  const itemName = target.childNodes[3].childNodes[5].innerText;
  const li = document.createElement("li");
  li.innerText = itemName;
  const orderItemList = document.getElementById("order-item-list");
  orderItemList.appendChild(li);

  //Price
  const price = target.childNodes[3].childNodes[7].innerText.split(" ")[0];
  const priceNumber = parseFloat(price);

  total += priceNumber;

  //Total price
  let totalValue = getElementTextValueById("total-price", total);

  //Grand Total
  let grandTotalValue = getElementTextValueById("grand-total", total);

  //Make purchase button enable
  let makePurchaseBtn = document.getElementById("btn-make-purchase");
  if (total > 0) {
    makePurchaseBtn.removeAttribute("disabled");
  }

  //Apply Button enable ,20 % discount, discount and total inner filed set with value
  let applyBtn = document.getElementById("btn-apply");
  let discountPriceField = document.getElementById("discount-price");

  if (total >= 200) {
    applyBtn.removeAttribute("disabled");

    document.getElementById("btn-apply").addEventListener("click", function () {
      let couponField = document.getElementById("coupon-field");
      let couponText = couponField.value;

      //Discount
      if (couponText === "SELL200") {
        let discountAmount = (20 / 100) * total;
        let totalDiscount = (discountPriceField.innerText =
          discountAmount.toFixed(2));

        //Grand total with discount
        let grandTotalWithDiscount = total - totalDiscount;
        let grandTotalWithDiscountAmount = getElementTextValueById(
          "grand-total",
          grandTotalWithDiscount
        );
      }
    });
  }
}

//Reset Option after click of Go Home Button

function goHome(resetId) {
  const num = 0;
  const formattedNum = num.toString().padStart(2, "0");
  let resetField = document.getElementById(resetId);
  let resetText = (resetField.innerText = formattedNum);
  return resetText;
}

function handleGoHome() {
  goHome("total-price");
  goHome("grand-total");
  goHome("discount-price");
  document.getElementById("order-item-list").innerText = "";
  document.getElementById("btn-make-purchase").setAttribute("disabled", true);
  document.getElementById("coupon-field").value = "";
  location.reload();
}
