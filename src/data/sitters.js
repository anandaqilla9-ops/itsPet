import sitter1 from "../assets/sitter1.jpg";
import sitter2 from "../assets/sitter2.jpg";
import sitter3 from "../assets/sitter3.jpg";

export const sitters = [
  {
    id: 1,
    name: "Karina",
    rating: "4.9",
    price: 50000,
    priceText: "Rp 50.000 / kunjungan",
    image: sitter1,
    location: "Surabaya",
    experience: "2 tahun",
    skills: ["🐱 Kucing", "✂️ Grooming", "💊 Pemberian Obat"],
    description: "Saya berpengalaman merawat kucing sejak lama. Siap memandikan, memberi makan tepat waktu, dan memberikan obat jika diperlukan dengan penuh kasih sayang. Saya sangat menyukai kucing dan tahu cara membuat mereka merasa nyaman dan aman.",
    reviewsCount: 24,
    verificationStatus: "Terverifikasi",
    availableSlots: ["08:00 - 10:00", "13:00 - 15:00", "18:00 - 20:00"],
    distance: 5
  },
  {
    id: 2,
    name: "Nashwa Zahira",
    rating: "4.8",
    price: 45000,
    priceText: "Rp 45.000 / kunjungan",
    image: sitter2,
    location: "Sidoarjo",
    experience: "3 tahun",
    skills: ["🐱 Kucing", "🐶 Anjing"],
    description: "Senang sekali bermain dengan anabul. Sangat perhatian terhadap jadwal makan, kebersihan tempat bermain, dan suka mengajak anabul jalan-jalan pagi. Berpengalaman merawat anjing dan kucing dari berbagai ras.",
    reviewsCount: 18,
    verificationStatus: "Terverifikasi",
    availableSlots: ["09:00 - 11:00", "15:00 - 17:00"],
    distance: 12
  },
  {
    id: 3,
    name: "Aurelia Putri",
    rating: "5.0",
    price: 60000,
    priceText: "Rp 60.000 / kunjungan",
    image: sitter3,
    location: "Surabaya",
    experience: "4 tahun",
    skills: ["🐱 Kucing", "🐶 Anjing", "✂️ Grooming", "💊 Pemberian Obat"],
    description: "Pet care profesional. Memiliki sertifikat grooming hewan dan berpengalaman menangani anabul yang sedang sakit atau memerlukan perhatian khusus. Menyediakan update foto dan video rutin secara berkala agar pemilik tetap tenang.",
    reviewsCount: 35,
    verificationStatus: "Terverifikasi",
    availableSlots: ["07:00 - 09:00", "12:00 - 14:00", "16:00 - 18:00", "19:00 - 21:00"],
    distance: 8
  }
];
