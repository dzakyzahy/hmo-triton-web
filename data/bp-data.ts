export interface StaffMember {
    name: string;
    nim: string;
    role: string;
    photo?: string; // Path ke foto di folder public
}

export interface ProgramKerja {
    name: string;
    description?: string;
}

export interface Division {
    id: string;
    name: string;
    ketua: StaffMember;
    deskripsi: string;
    proker: ProgramKerja[];
}

export interface Bidang {
    id: string;
    name: string;
    ketua?: StaffMember; // Beberapa bidang mungkin dipimpin langsung oleh Ketua/Sekjen
    deskripsi?: string;
    visi?: string;
    misi?: string[];
    divisi: Division[];
}

export const bpData: Bidang[] = [
    {
        id: "inti",
        name: "Pengurus Inti",
        ketua: {
            name: "Vandikkar Silalahi",
            nim: "TRITON 23-018",
            role: "Ketua Himpunan"
        },
        visi: "HMO 'TRITON' ITB sebagai bahtera yang harmonis, dengan menciptakan ruang di mana setiap anggota diapresiasi dan bergerak bersama dalam keselarasan melalui resonansi visi yang menyatukan langkah ke depan",
        misi: [
            "Menyelaraskan visi anggota menjadi satu arah yang harmonis.",
            "Menyediakan ruang yang positif dan progresif sebagai wadah pengembangan.",
            "Menjamin kesempatan yang setara bagi setiap anggota.",
            "Mengintegrasikan nilai-nilai keilmuan Oseanografi.",
            "Mendorong kolaborasi dengan berbagai pihak."
        ],
        divisi: []
    },
    {
        id: "kesekjenan",
        name: "Kesekjenan",
        ketua: {
            name: "Salma Arrihmah A.P.",
            nim: "TRITON 23-037",
            role: "Sekretaris Jendral"
        },
        deskripsi: "Membantu Ketua HMO TRITON ITB dan melakukan fungsi manajerial terhadap Sekretaris, Bendahara, Badan Usaha, dan Badan Rumah Tangga.",
        divisi: [
            {
                id: "sekretaris",
                name: "Sekretaris",
                ketua: { name: "Feri Saputra", nim: "TRITON 23-023", role: "Sekretaris" },
                deskripsi: "Bertanggung jawab atas aspek administratif, pencatatan rapat, dokumen resmi, dan arsip.",
                proker: [
                    { name: "Oceanvault", description: "Oceanic Archive and Document Repository" },
                    { name: "Tide Code", description: "Tidal Correspondence Documentation" },
                    { name: "Deep Mail", description: "Deep Sea Mail Management" },
                    { name: "Sea Flow", description: "Seamless Administrative Flow" },
                    { name: "Wave Notes", description: "Wave Inspired Meeting Documentation" }
                ]
            },
            {
                id: "bendahara",
                name: "Bendahara",
                ketua: { name: "Dini Setyorini N.", nim: "TRITON 23-003", role: "Bendahara" },
                deskripsi: "Mengatur dan bertanggung jawab atas pengelolaan keuangan organisasi.",
                proker: [
                    { name: "RABGY", description: "Rancangan Anggaran Biaya Gyre" },
                    { name: "GYPD", description: "Gyre Peminjaman Dana" },
                    { name: "KBBG", description: "Kolaborasi Bendahara dan Bisnis Gyre" },
                    { name: "BAKIL-G", description: "Bayar Kas Iuran Lancar - Gyre" },
                    { name: "G-FIN", description: "Gyre Financial Information Notebook" }
                ]
            },
            {
                id: "badan-usaha",
                name: "Badan Usaha",
                ketua: { name: "Nufaisha", nim: "TRITON 23-047", role: "Ketua Badan Usaha" },
                deskripsi: "Mengatur kegiatan kewirausahaan untuk memperoleh pemasukan finansial.",
                proker: [
                    { name: "IKANG", description: "Ini sekre Apa waruNG" },
                    { name: "TRIse!", description: "TRITON's Merchandise" },
                    { name: "HMO Datang Semua Senang!", description: "" },
                    { name: "SOP dan Teri", description: "SOP baDAN usaha TRITON" },
                    { name: "TRITONpeneur!", description: "" }
                ]
            },
            {
                id: "brt",
                name: "Badan Rumah Tangga",
                ketua: { name: "Anna Felicya", nim: "TRITON 23-027", role: "Ketua BRT" },
                deskripsi: "Bertanggung jawab dalam pengelolaan dan inventarisasi sekretariat.",
                proker: [
                    { name: "PIKme", description: "Piket with me" },
                    { name: "Info Nobar?", description: "" },
                    { name: "ada MAIN!", description: "ada MAding INteraktif" },
                    { name: "CHEK IN", description: "Cek Inventaris" },
                    { name: "FOMO", description: "FOrm peMenuhan barang HMO" }
                ]
            }
        ]
    },
    {
        id: "internal",
        name: "Bidang Internal",
        ketua: {
            name: "Bue Gabriel",
            nim: "TRITON 23-024",
            role: "Ketua Bidang Internal"
        },
        deskripsi: "Menjamin pemenuhan kebutuhan dasar anggota dalam aspek akademik, keilmuan, keprofesian, kekeluargaan, serta minat dan bakat.",
        divisi: [
            {
                id: "akademik",
                name: "Akademik",
                ketua: { name: "Rezqian Nur A.", nim: "TRITON 23-061", role: "Ketua Divisi Akademik" },
                deskripsi: "Bertanggung jawab dalam memastikan pemenuhan kebutuhan akademik anggota.",
                proker: [
                    { name: "ARUS", description: "Arsip Akademik Rapi Untuk Semua" },
                    { name: "TIDE", description: "Triton Inisiatif Demi Edukasi" },
                    { name: "JALA", description: "Jalur Akademik Lancar Aja" }
                ]
            },
            {
                id: "ilprof",
                name: "Keilmuan & Keprofesian",
                ketua: { name: "Yosefha Sebayang", nim: "TRITON 23-049", role: "Ketua Divisi ILPROF" },
                deskripsi: "Peningkatan kemampuan keilmuan dan implementasi keprofesian anggota.",
                proker: [
                    { name: "CURRENT", description: "Career Updates & Routes in Oceanography" },
                    { name: "SWELL", description: "Seminar & Webinar Exploring Life in The Ocean" },
                    { name: "PASANG", description: "Pelatihan dan Pengembangan Skill Anggota" },
                    { name: "CREST", description: "Capaian dan Prestasi Mahasiswa Triton" },
                    { name: "STOKES", description: "Studi Kolaborasi Keilmuan Sains" }
                ]
            },
            {
                id: "kekeluargaan",
                name: "Kekeluargaan",
                ketua: { name: "Indrawan", nim: "TRITON 23-065", role: "Ketua Divisi Kekeluargaan" },
                deskripsi: "Peningkatan kedekatan dan kekeluargaan anggota.",
                proker: [
                    { name: "Makrab Triton Intim", description: "" },
                    { name: "Bonding TRITON", description: "" },
                    { name: "WELCOME TRITON", description: "" },
                    { name: "BOLANG", description: "Bocah Triton Ulang Tahun" },
                    { name: "DIES NATALIS", description: "" }
                ]
            },
            {
                id: "minat-bakat",
                name: "Minat Bakat",
                ketua: { name: "Vincentius Prasada", nim: "TRITON 23-023", role: "Ketua Divisi Minat Bakat" },
                deskripsi: "Pengembangan serta fasilitasi minat dan bakat anggota.",
                proker: [
                    { name: "WARBIR", description: "Jawara Labbir" },
                    { name: "LEMURIAN", description: "Laskar Tempur Satu Dua Sembilan" },
                    { name: "ARMBAND", description: "" }
                ]
            }
        ]
    },
    {
        id: "psda",
        name: "Bidang PSDA",
        ketua: {
            name: "Naila Huda",
            nim: "TRITON 23-064",
            role: "Ketua Bidang PSDA"
        },
        deskripsi: "Bertanggung jawab dalam memastikan pengembangan serta pengelolaan sumber daya anggota.",
        divisi: [
            {
                id: "kaderisasi",
                name: "Kaderisasi",
                ketua: { name: "Rafli Yudha Asdana", nim: "TRITON 23-055", role: "Ketua Divisi Kaderisasi" },
                deskripsi: "Pelaksanaan penjenjangan kaderisasi anggota.",
                proker: [
                    { name: "NAVDIK", description: "Navigasi Pendidikan Dasar" },
                    { name: "RAKARSA", description: "Regenerasi Pendiklat" },
                    { name: "PANDU", description: "Pendampingan dan Asistensi" },
                    { name: "KATALIS", description: "Kaderisasi Tingkat Lanjut" },
                    { name: "BASIS", description: "Bimbingan Awal Sistem" }
                ]
            },
            {
                id: "msda",
                name: "MSDA",
                ketua: { name: "Fayyaza Sayyidatunnisa", nim: "TRITON 23-017", role: "Ketua Divisi MSDA" },
                deskripsi: "Pemenuhan manajemen anggota HMO TRITON ITB.",
                proker: [
                    { name: "TRITON Metrics", description: "" },
                    { name: "PASTI!", description: "Pendaftaran Staff TRITON" },
                    { name: "Datasphere", description: "" },
                    { name: "TRITON Rewind", description: "" },
                    { name: "Rapor Merah dan Rapor Biru", description: "" }
                ]
            }
        ]
    },
    {
        id: "eksternal",
        name: "Bidang Eksternal",
        ketua: {
            name: "Amarra Azzahra",
            nim: "TRITON 23-025",
            role: "Ketua Bidang Eksternal"
        },
        deskripsi: "Bertanggung jawab dalam hubungan eksternal dengan pihak luar.",
        divisi: [
            {
                id: "intrakampus",
                name: "Intrakampus",
                ketua: { name: "Ghina Rohaza", nim: "TRITON 23-057", role: "Ketua Divisi Intrakampus" },
                deskripsi: "Penjalinan hubungan dengan Ormawa/Lembaga lingkup ITB.",
                proker: [
                    { name: "ARUS", description: "Agenda Relasi untuk Sinergi" },
                    { name: "SONAR", description: "Surat & Undangan Apresiasi Relasi" },
                    { name: "KORAL", description: "Kolaborasi dan Apresiasi Relasi" },
                    { name: "EKMAN", description: "Eksplorasi Kunjungan Mahasiswa Antar Himpunan" }
                ]
            },
            {
                id: "ekstrakampus",
                name: "Ekstrakampus",
                ketua: { name: "Anggit Al Hafizh", nim: "TRITON 23-005", role: "Ketua Divisi Ekstrakampus" },
                deskripsi: "Menjalin hubungan baik dengan pihak eksternal, HMPS luar, dan alumni.",
                proker: [
                    { name: "Kaharsa", description: "Hubungan dengan HMPS luar" },
                    { name: "Arungan", description: "Workshop dengan pihak luar" },
                    { name: "Samagata", description: "Kunjungan ke perusahaan" },
                    { name: "Pranala", description: "Database alumni" },
                    { name: "Operin", description: "Bincang alumni" }
                ]
            }
        ]
    },
    {
        id: "medkominfo",
        name: "Bidang Medkominfo",
        ketua: {
            name: "Sandria Almanda T.",
            nim: "TRITON 23-062",
            role: "Ketua Bidang Medkominfo"
        },
        deskripsi: "Pengelolaan sampai publikasi informasi dari dan ke Badan Pengurus.",
        divisi: [
            {
                id: "medkominfo-div",
                name: "Medkominfo",
                ketua: { name: "Sandria Almanda T.", nim: "TRITON 23-062", role: "Ketua Bidang" },
                deskripsi: "Publikasi dan Dokumentasi.",
                proker: [
                    { name: "ROV", description: "Regulated, Organized, and Verified" },
                    { name: "ANTONY", description: "ArsipNya TritON niY" },
                    { name: "READY", description: "REquest Atu-atu Dulu Ya" },
                    { name: "FUTON", description: "Foto Untuk TriTON" },
                    { name: "ICIBOS", description: "Izin bC-In BOS" }
                ]
            }
        ]
    }
];
