// Memories and Friend database representing our cinematic friendship
export const friends = [
  {
    id: "nabil",
    name: "Nabil",
    nickname: "Nabil",
    origin: "Gorontalo",
    role: "The Mastermind / Director",
    bio: "Selalu punya ide gokil untuk liburan dadakan, tapi kadang telat datang. Ahli navigasi jalan tikus dan penyelamat saat tersesat.",
    quote: "Tenang guys, gw tau jalan tikus biar cepet.",
    avatar: "/images/cast/nabil.jpg",
    stats: [
      { label: "Navigation", value: 95 },
      { label: "Punctuality", value: 40 },
      { label: "Hype Factor", value: 98 }
    ],
    credits: ["The Midnight Roadtrip", "Survival of Final Exams", "Nasi Goreng Jam 2 Pagi"]
  },
  {
    id: "arwan",
    name: "Arwan",
    nickname: "Arwan",
    origin: "Pemalang",
    role: "The Comic Relief",
    bio: "Penyedia meme berjalan dan soundboard manusia. Kapanpun suasana tegang atau capek, dia selalu punya cara konyol buat bikin semua orang ngakak.",
    quote: "Udah laper belum? Perut gw udah bunyi nih.",
    avatar: "/images/cast/arwan.jpg",
    stats: [
      { label: "Humor Level", value: 99 },
      { label: "Appetite", value: 95 },
      { label: "Drama Avoidance", value: 90 }
    ],
    credits: ["The Beach Escape", "Nasi Goreng Jam 2 Pagi", "Warkop Filosofi Kopi"]
  },
  {
    id: "rapli",
    name: "Rapli",
    nickname: "Rapli",
    origin: "Cirebon",
    role: "The Producer",
    bio: "Satu-satunya orang waras di grup. Penjaga keuangan kas, fotografer handalan, dan yang selalu mastiin ga ada barang yang ketinggalan.",
    quote: "Uang kas tolong ditransfer ya, paling lambat nanti malam!",
    avatar: "/images/cast/rapli.jpg",
    stats: [
      { label: "Organization", value: 98 },
      { label: "Patience", value: 85 },
      { label: "Photography", value: 95 }
    ],
    credits: ["The Beach Escape", "Survival of Final Exams", "Warkop Filosofi Kopi"]
  },
  {
    id: "akbar",
    name: "Akbar",
    nickname: "Akbar",
    origin: "Palangka Raya",
    role: "The Action Star",
    bio: "Spesialis menyetir jarak jauh tanpa mengantuk. Selalu siap diajak riding atau mendaki gunung jam 2 pagi tanpa persiapan matang.",
    quote: "Gas terus, ga usah rem! Nanggung!",
    avatar: "/images/cast/akbar.jpg",
    stats: [
      { label: "Stamina", value: 96 },
      { label: "Driving Skill", value: 98 },
      { label: "Spontaneity", value: 92 }
    ],
    credits: ["Villa Dieng", "The Mountain Peak Conquest", "Nasi Goreng Jam 2 Pagi"]
  },
  {
    id: "faiz",
    name: "Faiz",
    nickname: "Faiz",
    origin: "Batam",
    role: "The Thinker",
    bio: "Orang yang selalu mikir logis sebelum grup ngelakuin hal konyol (meski akhirnya ikut juga).",
    quote: "Kalian yakin ini aman? Ya udah deh gas.",
    avatar: "/images/cast/faiz.jpg",
    stats: [
      { label: "Logic", value: 95 },
      { label: "Patience", value: 85 },
      { label: "Loyalty", value: 100 }
    ],
    credits: ["Warkop Filosofi Kopi", "Survival of Final Exams"]
  },
  {
    id: "alif",
    name: "Alif",
    nickname: "Alif",
    origin: "Papua",
    role: "The Chill Guy",
    bio: "Orang paling santai di grup. Apapun yang terjadi, jawabannya selalu 'ya udahlah'.",
    quote: "Santai aja bro, nanti juga beres.",
    avatar: "/images/cast/alif.jpg",
    stats: [
      { label: "Chillness", value: 100 },
      { label: "Panic Level", value: 0 },
      { label: "Adaptability", value: 95 }
    ],
    credits: ["The Beach Escape", "Nasi Goreng Jam 2 Pagi"]
  },
  {
    id: "atwi",
    name: "Atwi",
    nickname: "Atwi",
    origin: "Lombok",
    role: "The Negotiator",
    bio: "Pintar nego harga, dari bayar warkop sampai nawar villa liburan.",
    quote: "Biar gw yang ngomong sama abangnya, dapet diskon pasti.",
    avatar: "/images/cast/atwi.jpg",
    stats: [
      { label: "Charisma", value: 95 },
      { label: "Bargaining", value: 99 },
      { label: "Problem Solving", value: 90 }
    ],
    credits: ["Villa Dieng", "The Beach Escape"]
  },
  {
    id: "adri",
    name: "Adri",
    nickname: "Adri",
    origin: "Palembang",
    role: "The Analyst",
    bio: "Sering overthinking tapi tebakannya soal sesuatu sering benar.",
    quote: "Menurut gw sih mending lewat jalan yang satunya...",
    avatar: "/images/cast/adri.jpg",
    stats: [
      { label: "Observation", value: 95 },
      { label: "Intuition", value: 90 },
      { label: "Endurance", value: 85 }
    ],
    credits: ["The Mountain Peak Conquest", "Survival of Final Exams"]
  },
  {
    id: "farhan",
    name: "Farhan",
    nickname: "Farhan",
    origin: "Riau",
    role: "The Entertainer",
    bio: "Paling rame kalau lagi nongkrong, cerita apa aja jadi lucu banget.",
    quote: "Eh gw ada cerita kocak, dengerin dulu!",
    avatar: "/images/cast/farhan.jpg",
    stats: [
      { label: "Storytelling", value: 99 },
      { label: "Energy", value: 95 },
      { label: "Sleep Deprivation", value: 90 }
    ],
    credits: ["Nasi Goreng Jam 2 Pagi", "Warkop Filosofi Kopi"]
  },
  {
    id: "rifal",
    name: "Rifal",
    nickname: "Rifal",
    origin: "Indramayu",
    role: "The Guardian",
    bio: "Sering jadi orang tua di grup, ngingetin barang bawaan biar ga ada yang ketinggalan.",
    quote: "Kunci motor udah di bawa kan? Jangan sampai lupa lagi.",
    avatar: "/images/cast/ripal.jpg",
    stats: [
      { label: "Responsibility", value: 98 },
      { label: "Care", value: 95 },
      { label: "Memory", value: 90 }
    ],
    credits: ["Villa Dieng", "The Mountain Peak Conquest"]
  },
  {
    id: "zaki",
    name: "Zaki",
    nickname: "Zaki",
    origin: "Unknown",
    role: "The Mystery",
    bio: "Kadang muncul tiba-tiba pas ngumpul, kadang ngilang tanpa jejak kayak ninja.",
    quote: "Gw otw sekarang (padahal baru mandi).",
    avatar: "/images/cast/zaki.jpg",
    stats: [
      { label: "Stealth", value: 99 },
      { label: "Punctuality", value: 10 },
      { label: "Spontaneity", value: 95 }
    ],
    credits: ["The Beach Escape", "Warkop Filosofi Kopi"]
  }
];

export const memories = [
  {
    id: "midnight-road",
    title: "Villa Dieng",
    genre: "Adventure, Thriller",
    year: "2024",
    duration: "2 Days",
    rating: "9.9",
    location: "Puncak, Bogor",
    date: "14 Mei 2024",
    cast: ["Akbar", "Nabil", "Arwan", "Atwi", "Ripal"],
    synopsis: "Perjalanan dadakan jam 12 malam menuju puncak tanpa persiapan baju hangat, hanya bermodal maps merah membara dan tekad bulat.",
    story: "Semua bermula dari chat Nabil jam 11 malam yang gabut. Akbar menyanggupi menyetir, dan Arwan diculik langsung dari kamarnya saat pakai piyama. Di jalan kita hampir kesasar di kebun teh berkabut tebal karena Nabil salah baca maps. Tapi begitu sampai di atas dingin-dingin makan indomie rebus, rasanya semua perjuangan terbayar lunas. Ini adalah episode terbaik di Season 2024 kami.",
    image: "/images/memories/dieng.jpg",
    featured: true
  },
  {
    id: "beach-escape",
    title: "The Beach Escape",
    genre: "Slice of Life, Drama",
    year: "2024",
    duration: "3 Days",
    rating: "9.8",
    location: "Sawarna, Banten",
    date: "22 Agustus 2024",
    cast: ["Rapli", "Arwan", "Nabil", "Akbar", "Alif", "Zaki"],
    synopsis: "Pelarian dari kepenatan tugas kuliah akhir ke pantai selatan. Tiga hari penuh tawa, sunset keemasan, dan tragedi hp Arwan kemasukan air laut.",
    story: "Rapli merencanakan villa mungil di pinggir pantai. Kita habiskan waktu bakar ikan hasil tangkapan nelayan lokal, bernyanyi dengan gitar butut di tepi api unggun, dan main ombak sampai sore. Tragedi kocak terjadi ketika Arwan mencoba aesthetic video di ombak tapi malah tersapu ombak besar, membuat hp-nya harus didekam di dalam beras selama sisa liburan.",
    image: "/images/memories/pantai.jpg",
    featured: true
  },
  {
    id: "final-exam",
    title: "Survival of Final Exams",
    genre: "Suspense, Drama",
    year: "2023",
    duration: "1 Week",
    rating: "9.5",
    location: "Perpustakaan Pusat",
    date: "10 Desember 2023",
    cast: ["Nabil", "Rapli", "Arwan", "Faiz", "Adri"],
    synopsis: "Perjuangan bertahan hidup menghadapi ujian akhir semester yang mematikan. Penuh kafein berlebih dan kepasrahan kolektif.",
    story: "Satu minggu penuh di mana perpustakaan menjadi rumah utama kita. Rapli bertindak sebagai tutor galak yang memaksa Nabil dan Arwan menghafal rumus kalkulus. Kita bertahan hidup berkat kopi instan dingin, mie cup, dan sharing jawaban lembar rangkuman buatan Rapli. Kelulusan kita semua adalah plot twist terbaik dalam sejarah pertemanan kita.",
    image: "/images/memories/final-exam.jpg",
    featured: false
  },
  {
    id: "mountain-conquest",
    title: "The Mountain Peak Conquest",
    genre: "Adventure, Action",
    year: "2023",
    duration: "3 Days",
    rating: "9.7",
    location: "Gunung Gede Pangrango",
    date: "05 Oktober 2023",
    cast: ["Akbar", "Nabil", "Rapli", "Adri", "Ripal"],
    synopsis: "Ekspedisi mendaki puncak gunung pertama kalinya bagi Rapli. Menguji ketahanan fisik, mental, dan persahabatan di jalur berbatu.",
    story: "Akbar memimpin pendakian ini dengan gaya militeristik tapi penyayang. Rapli sempat ingin menyerah di pos 3 karena kelelahan, tapi kita gantian membawakan tas carrier-nya dan Nabil terus bernyanyi sumbang untuk mendistraksi rasa lelah. Begitu sampai di alun-alun Surya Kencana saat matahari terbit dikelilingi bunga edelweiss, tangis haru pun pecah.",
    image: "/images/memories/mountain-conquest.jpg",
    featured: false
  },
  {
    id: "late-night-rice",
    title: "Nasi Goreng Jam 2 Pagi",
    genre: "Comedy, Slice of Life",
    year: "2024",
    duration: "3 Hours",
    rating: "9.6",
    location: "Nasgor Pak Kumis",
    date: "04 Januari 2024",
    cast: ["Nabil", "Arwan", "Akbar", "Alif", "Farhan"],
    synopsis: "Pertemuan larut malam paling filosofis yang pernah ada. Membicarakan masa depan, konspirasi alam semesta, dan porsi nasgor double.",
    story: "Berawal dari tidak bisa tidur, kita berakhir jongkok di pinggir jalan raya makan nasi goreng gila Pak Kumis. Obrolan mengalir dari curhat soal karir, cinta yang bertepuk sebelah tangan, hingga teori konspirasi apakah alien suka makan nasi goreng juga. Sederhana, murah, tapi hangatnya kebersamaan ini tidak tergantikan.",
    image: "/images/memories/late-night-rice.jpg",
    featured: false
  },
  {
    id: "warkop-filosofi",
    title: "Warkop Filosofi Kopi",
    genre: "Comedy",
    year: "2023",
    duration: "4 Hours",
    rating: "9.4",
    location: "Warkop Berkah",
    date: "12 Juli 2023",
    cast: ["Rapli", "Arwan", "Faiz", "Farhan", "Zaki"],
    synopsis: "Debat kusir berjam-jam tentang hal yang sama sekali tidak penting, ditemani es teh manis dan gorengan hangat.",
    story: "Rapli dan Arwan mendebat apakah bubur ayam diaduk atau tidak diaduk mencerminkan kepribadian seseorang. Pengunjung warkop lain sampai ikutan menyimak karena perdebatan terjadi sangat intens layaknya debat calon presiden. Berakhir dengan Arwan kalah taruhan dan harus membayar semua gorengan sore itu.",
    image: "/images/memories/warkop-filosofi.jpg",
    featured: false
  }
];

export const seasons = [
  {
    id: "sem-1",
    title: "Semester 1",
    period: "Sep 2022 – Jan 2023",
    description: "Awal dari segalanya. Bertemu di lorong yang salah, masuk kelas yang salah, lalu tidak sengaja membangun persahabatan yang benar.",
    episodes: [
      {
        id: "s1-e1",
        title: "Pertemuan Canggung",
        date: "September 2022",
        highlight: "Salah masuk kelas bareng saat hari pertama ospek. Bukannya malu, malah bikin grup chat dan langsung nongkrong sampai malam."
      },
      {
        id: "s1-e2",
        title: "Tugas Kelompok Pertama",
        date: "November 2022",
        highlight: "Video pendek dikerjakan semalaman suntuk. Hasilnya kacau balau, tapi dosen tetap kasih nilai A — entah karena kasihan atau apresiasi tulus."
      }
    ]
  },
  {
    id: "sem-2",
    title: "Semester 2",
    period: "Feb – Jun 2023",
    description: "Mulai menemukan ritme. Jadwal kuliah yang gila-gilaan jadi lebih ringan karena ada teman yang sama-sama bertahan.",
    episodes: [
      {
        id: "s2-e1",
        title: "Warkop Filosofi Kopi",
        date: "April 2023",
        highlight: "Debat bubur ayam diaduk vs tidak diaduk berlangsung 4 jam penuh. Pengunjung warkop lain sampai ikutan nimbrung."
      },
      {
        id: "s2-e2",
        title: "UAS Pertama Bareng",
        date: "Juni 2023",
        highlight: "Belajar kelompok di kos Nabil yang sempit. Meja kecil, dan satu kipas angin butut yang rebutan."
      }
    ]
  },
  {
    id: "sem-3",
    title: "Semester 3",
    period: "Sep – Jan 2024",
    description: "Era eksplorasi. Kita mulai berani menjelajah keluar zona nyaman — naik gunung, keluar kota, dan keluar dari comfort zone akademis.",
    episodes: [
      {
        id: "s3-e1",
        title: "The Mountain Peak Conquest",
        date: "Oktober 2023",
        highlight: "Mendaki Gunung Gede pertama kali. Rapli hampir menyerah di pos 3, tapi kita gantian bawain carriernya sampai puncak."
      },
      {
        id: "s3-e2",
        title: "Survival of Final Exams",
        date: "Desember 2023",
        highlight: "UAS kalkulus yang mematikan. Perpustakaan jadi rumah, kopi instan jadi darah, dan Rapli jadi tutor darurat yang super galak."
      }
    ]
  },
  {
    id: "sem-4",
    title: "Semester 4",
    period: "Feb – Jun 2024",
    description: "Pertengahan perjalanan. Lebih banyak tugas, lebih banyak tekanan — tapi juga lebih banyak momen ngakak yang jadi kenangan abadi.",
    episodes: [
      {
        id: "s4-e1",
        title: "Nasi Goreng Jam 2 Pagi",
        date: "Januari 2024",
        highlight: "Tidak bisa tidur, berakhir di warung Pak Kumis. Obrolan dari karir sampai alien suka makan nasi goreng atau tidak."
      },
      {
        id: "s4-e2",
        title: "Vila Dieng",
        date: "Mei 2024",
        highlight: "Akbar Bugil (canda, ini kenangan legendaris pas nyampe vila kedinginan banget)."
      }
    ]
  },
  {
    id: "sem-5",
    title: "Semester 5",
    period: "Sep 2024 – Jan 2025",
    description: "Masa kuliah mulai terasa berat, tapi pelarian ke pantai Sawarna membuktikan bahwa kesehatan jiwa itu penting — dan gratis kalau bareng orang yang tepat.",
    episodes: [
      {
        id: "s5-e1",
        title: "The Beach Escape",
        date: "Agustus 2024",
        highlight: "Tiga hari di Sawarna: bakar ikan, gitar butut, dan hp Arwan yang tragis kecemplung ombak lalu hidup di dalam beras."
      },
      {
        id: "s5-e2",
        title: "Sidang Proposal Perdana",
        date: "Desember 2024",
        highlight: "Sidang pertama dengan dosen killer. Kita bolos kelas bareng buat nemenin yang presentasi — satu nervous, sisanya ikut gemetar."
      }
    ]
  },
  {
    id: "sem-6",
    title: "Semester 6",
    period: "Feb – Jun 2025",
    description: "Era magang dan realita. Jadwal mulai tidak sinkron, tapi chat grup tetap ramai dengan meme dan rencana weekend yang sering gagal terwujud.",
    episodes: [
      {
        id: "s6-e1",
        title: "Mimpi yang Berbeda, Grup yang Sama",
        date: "Februari 2025",
        highlight: "Akbar keterima magang di luar kota. Dinner perpisahan dengan sate kambing dan sedikit air mata yang ditahan-tahan."
      },
      {
        id: "s6-e2",
        title: "Reuni Warung Kopi",
        date: "Mei 2025",
        highlight: "Pertama kali kumpul lengkap setelah tiga bulan sibuk. Satu warung kopi, empat jam, dan cerita yang tidak ada habisnya."
      }
    ]
  },
  {
    id: "sem-7",
    title: "Semester 7",
    period: "Sep 2025 – Jan 2026",
    description: "Babak akhir kuliah dimulai. Skripsi, deadline, dan kekhawatiran tentang masa depan — tapi setidaknya kita hadapi bersama.",
    episodes: [
      {
        id: "s7-e1",
        title: "Perang Skripsi",
        date: "Oktober 2025",
        highlight: "Bimbingan skripsi di hari yang sama. Kita tunggu satu sama lain di lorong sambil saling kasih semangat dan cemilan dari kantin."
      },
      {
        id: "s7-e2",
        title: "Road Trip Akhir Tahun",
        date: "Desember 2025",
        highlight: "Liburan terakhir sebelum semester final. Playlist campuran yang tidak ada yang setuju, tapi semua bahagia."
      }
    ]
  },
  {
    id: "sem-8",
    title: "Semester 8",
    period: "Feb 2026 – Sekarang",
    description: "Chapter terakhir sebelum dunia nyata. Setiap momen terasa lebih berharga karena kita tahu ini adalah akhir sekaligus awal dari sesuatu yang baru.",
    episodes: [
      {
        id: "s8-e1",
        title: "Sidang Skripsi",
        date: "Mei 2026",
        highlight: "Hari paling menegangkan. Kita duduk di luar ruang sidang, doa bareng, dan menunggu dengan jantung berdegup kencang. Semua lulus."
      },
      {
        id: "s8-e2",
        title: "Cerita Belum Berakhir",
        date: "Sedang Berlangsung",
        highlight: "Wisuda mungkin jadi akhir dari bab ini, tapi bukan akhir dari cerita kita. Persahabatan ini tidak punya semester terakhir."
      }
    ]
  }
];

export const soundtracks = [
  {
    id: "track-1",
    title: "Cha Cha with Me",
    artist: "Bruno Mars ",
    url: "https://www.image2url.com/r2/default/audio/1779389155890-4a1bc4f8-5ccb-43a5-8e7c-1fbdb8b5f21e.mp3" // Royalty-free test mp3
  },
  
  {
    id: "track-2",
    title: "Castel on the hill",
    artist: "Edd Sheran",
    url: "https://mp3tourl.com/audio/1779390596790-ca4173c9-5380-40f9-a3a7-ef21145f997f.mp3" // Royalty-free test mp3
  },
  {
    id: "track-3",
    title: "Rainy Cafe Memories",
    artist: "Late Night Jazz",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" // Royalty-free test mp3
  }
];

// Initial default reviews
export const initialReviews = [
  {
    id: "rev-1",
    name: "Nabil",
    rating: 5,
    date: "15 Mei 2024",
    text: "Sangat direkomendasikan untuk ditonton ulang seumur hidup! Season 2024 dipenuhi plot twist gila tapi petualangannya bener-bener bintang lima. Nasi goreng jam 2 pagi dapet rating 10/10 dari perut gw."
  },
  {
    id: "rev-2",
    name: "Rapli",
    rating: 4,
    date: "23 Agustus 2024",
    text: "Penuh dengan drama komedi yang ga habis-habis. Kurang 1 bintang karena hp Arwan kecemplung air bikin repot seisi villa nyari beras! Tapi jujur, sunset sawarna di episode itu ga akan pernah terlupakan."
  },
  {
    id: "rev-3",
    name: "Arwan",
    rating: 5,
    date: "12 Des 2023",
    text: "Karakter development gw di sini keren banget, dari cupu pas kalkulus jadi pro pas bakar ikan di pantai. Teman-teman terbaik, sutradara terbaik, pengalaman terbaik. Ditunggu season berikutnya!"
  },
  {
    id: "rev-4",
    name: "Faiz",
    rating: 5,
    date: "01 Jan 2024",
    text: "Sebagai orang yang ngikut aja, sumpah kocak parah ngumpul sama kalian. Apalagi pas Akbar nyasar di jalan tikusnya Nabil hahaha."
  }
];
