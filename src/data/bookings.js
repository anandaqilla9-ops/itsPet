export const dummyBookings = [
  {
    id: 1,
    pawrentName: "Nathania Rani",
    pawrentPhone: "0812-3456-7890",
    petName: "Molly",
    petType: "🐰 Kelinci",
    date: "2026-06-20",
    time: "14:00",
    notes: "Kelinci yang agak pemalu, butuh makanan basah jam 3 sore.",
    status: "pending", // pending, accepted, rejected, completed
    totalPrice: 50000,
    createdAt: "2026-06-16T10:30:00Z"
  },
  {
    id: 2,
    pawrentName: "Aisyah R.",
    pawrentPhone: "0821-5555-6666",
    petName: "Kimi",
    petType: "🐱 Kucing Persia",
    date: "2026-06-21",
    time: "10:00",
    notes: "Kucing persia yang manja, suka dimanja sebelum diberi makan.",
    status: "accepted",
    totalPrice: 50000,
    createdAt: "2026-06-15T15:20:00Z"
  },
  {
    id: 3,
    pawrentName: "Raisha Annette",
    pawrentPhone: "0831-7777-8888",
    petName: "Rocky",
    petType: "🐶 Golden Retriever",
    date: "2026-06-18",
    time: "16:00",
    notes: "Anjing yang aktif, butuh jalan-jalan 2 jam.",
    status: "accepted",
    totalPrice: 45000,
    createdAt: "2026-06-14T09:15:00Z"
  },
  {
    id: 4,
    pawrentName: "Gibran F.",
    pawrentPhone: "0845-9999-1111",
    petName: "Snowy",
    petType: "🐶 Husky",
    date: "2026-06-19",
    time: "13:00",
    notes: "Husky yang energik, perlu diawasi waktu bermain.",
    status: "completed",
    totalPrice: 45000,
    createdAt: "2026-06-13T11:45:00Z",
    completedAt: "2026-06-19T15:30:00Z"
  },
  {
    id: 5,
    pawrentName: "Aditya Rasyiid",
    pawrentPhone: "0855-2222-3333",
    petName: "Elora",
    petType: "🐱 Kucing Kampung",
    date: "2026-06-22",
    time: "11:00",
    notes: "Kucing yang baru sakit, butuh waktu recovery.",
    status: "pending",
    totalPrice: 60000,
    createdAt: "2026-06-16T08:00:00Z"
  }
];

export const dummyMonitoringUpdates = [
  {
    id: 1,
    bookingId: 2,
    timestamp: "2026-06-21T10:30:00Z",
    caption: "Kimi sedang makan dengan lahap 😸",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3EUpdate Foto: Kucing Makan%3C/text%3E%3C/svg%3E"
  },
  {
    id: 2,
    bookingId: 2,
    timestamp: "2026-06-21T11:45:00Z",
    caption: "Kimi sedang istirahat di tempat tidurnya yang favorit",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e8f5e9' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3EUpdate Foto: Kucing Istirahat%3C/text%3E%3C/svg%3E"
  },
  {
    id: 3,
    bookingId: 3,
    timestamp: "2026-06-18T16:15:00Z",
    caption: "Rocky habis jalan-jalan pagi, terlihat sangat bahagia!",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23fff3e0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3EUpdate Foto: Anjing Jalan-jalan%3C/text%3E%3C/svg%3E"
  },
  {
    id: 4,
    bookingId: 4,
    timestamp: "2026-06-19T14:00:00Z",
    caption: "Snowy bermain dengan mainan favorit, sangat energik ✨",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f3e5f5' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3EUpdate Foto: Anjing Bermain%3C/text%3E%3C/svg%3E"
  },
  {
    id: 5,
    bookingId: 4,
    timestamp: "2026-06-19T15:00:00Z",
    caption: "Snowy minum air yang cukup, kesehatan terjaga 💧",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e1f5fe' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3EUpdate Foto: Minum Air%3C/text%3E%3C/svg%3E"
  }
];

export const dummyEarnings = [
  {
    id: 1,
    bookingId: 3,
    date: "2026-06-18",
    petName: "Rocky",
    pawrentName: "Raisha Annette",
    amount: 45000,
    status: "completed",
    paymentMethod: "Dana"
  },
  {
    id: 2,
    bookingId: 4,
    date: "2026-06-19",
    petName: "Snowy",
    pawrentName: "Gibran F.",
    amount: 45000,
    status: "completed",
    paymentMethod: "GCash"
  },
  {
    id: 3,
    bookingId: 2,
    date: "2026-06-21",
    petName: "Kimi",
    pawrentName: "Aisyah R.",
    amount: 50000,
    status: "pending",
    paymentMethod: "Transfer Bank"
  }
];
