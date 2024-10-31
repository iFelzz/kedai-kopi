document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Kopxue Arabica Raw Coffee Beans", img: "1.jpeg", price: 99000 },
      { id: 2, name: "Kopxue Plain Milk Powder", img: "2.jpeg", price: 49000 },
      { id: 3, name: "Kopxue Coffee Latte", img: "3.jpeg", price: 59000 },
      { id: 4, name: "Kopxue Matcha Latte", img: "4.jpeg", price: 59000 },
      { id: 5, name: "Kopxue Thai Milk Tea", img: "5.jpeg", price: 49000 },
      { id: 6, name: "Kopxue Pure Green Tea", img: "6.jpeg", price: 99000 },
      { id: 7, name: "Kopxue Instant Boba", img: "7.jpeg", price: 35000 },
    ],
  }));
  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // Cek barang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // Jika cart kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // Jika barang ada di cart (cek barang beda atau sama)
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item;
          } else {
            // Jika barang sudah ada, tambah quantity dan sub total
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;

            return item;
          }
        });
      }
      //   console.log(this.items);
    },
    remove(id) {
      // Ambil item yg mau di remove berdasarkan id
      const cartItem = this.items.find((item) => item.id === id);

      // Jika lebih dari 1
      if (cartItem.quantity > 1) {
        // Telusuri 1 by 1
        this.items = this.items.map((item) => {
          // Jika bukan barang yg di klik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;

            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // Jika barangnya sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Mata uang rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
