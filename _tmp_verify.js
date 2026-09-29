const http = require("http");

function get(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => resolve({ status: res.statusCode, body: d }));
      })
      .on("error", reject);
  });
}

(async () => {
  const shop = await get("http://localhost:3002/shop?type=preorder");
  const names = [
    "Coconut, dry",
    "Pepper, scotch bonnet",
    "Pineapple, Smooth Cayenne",
    "Orange, Valencia",
    "Pawpaw, Red Lady",
    "Banana, Cavendish",
    "Watermelon, Sugar Baby",
  ];
  console.log("shop", shop.status);
  for (const n of names) console.log(n, shop.body.includes(n));
  console.log("no products", shop.body.includes("No products found"));
  const count = shop.body.match(/(\d+)<!-- --> product/);
  console.log("count", count && count[1]);
  console.log("crop coconut option", shop.body.includes("<option>Coconut</option>"));

  const home = await get("http://localhost:3002/");
  console.log("home coconut", home.body.includes("Coconut, dry"));
  console.log("home preorder href", home.body.includes("/shop?type=preorder"));

  const checkout = await get("http://localhost:3002/checkout?id=demo17&type=preorder");
  console.log("checkout", checkout.status, "coconut", checkout.body.includes("Coconut"));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
