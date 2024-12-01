-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 05 Jun 2024 pada 16.04
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `abadi_jaya`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `biaya`
--

CREATE TABLE `biaya` (
  `id_biaya` int(11) NOT NULL,
  `jenis_pengiriman` varchar(50) NOT NULL,
  `berat_min` decimal(10,2) NOT NULL,
  `berat_max` decimal(10,2) NOT NULL,
  `biaya` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `biaya`
--

INSERT INTO `biaya` (`id_biaya`, `jenis_pengiriman`, `berat_min`, `berat_max`, `biaya`) VALUES
(1, 'Dalam Kota', '0.00', '1.00', '10000.00'),
(2, 'Dalam Kota', '1.00', '5.00', '20000.00'),
(3, 'Luar Kota', '0.00', '1.00', '15000.00'),
(4, 'Luar Kota', '1.00', '5.00', '30000.00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer`
--

CREATE TABLE `customer` (
  `id_customer` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nomor_telepon` varchar(20) NOT NULL,
  `id_provinsi` int(11) NOT NULL,
  `id_kota` int(11) NOT NULL,
  `detail_alamat` varchar(255) NOT NULL,
  `kode_pos` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `customer`
--

INSERT INTO `customer` (`id_customer`, `nama`, `email`, `nomor_telepon`, `id_provinsi`, `id_kota`, `detail_alamat`, `kode_pos`) VALUES
(5, 'Anya Geraldine', 'geraldine@example.com', '083855671212', 11, 78, 'Jl. Senopati No.41, RT.8/RW.2, Senayan', '12190'),
(6, 'Maudy Ayunda', 'maudy@example.com', '085573221909', 15, 45, 'Jl. Soekarno Hatta No. 2, Jatimulyo', '65141'),
(7, 'Chelsea Islan', 'chelsea@example.com', '085572361172', 14, 62, 'Jl. Raya Sleman No. 23', '55288');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kota`
--

CREATE TABLE `kota` (
  `id_kota` int(11) NOT NULL,
  `kode_kota` varchar(10) NOT NULL,
  `nama_kota` varchar(100) NOT NULL,
  `jenis` varchar(50) NOT NULL,
  `id_provinsi` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `kota`
--

INSERT INTO `kota` (`id_kota`, `kode_kota`, `nama_kota`, `jenis`, `id_provinsi`) VALUES
(44, 'ID-JI-SBY', 'Surabaya', 'Kota', 15),
(45, 'ID-JI-MLG', 'Malang', 'Kota', 15),
(53, 'ID-JT-SMG-', 'Semarang', 'Kabupaten', 13),
(55, 'ID-JT-MGL', 'Magelang', 'Kota', 13),
(62, 'ID-YO-SLE', 'Sleman', 'Kabupaten', 14),
(63, 'ID-YO-BTL', 'Bantul', 'Kabupaten', 14),
(66, 'ID-JB-BDG', 'Bandung', 'Kota', 12),
(69, 'ID-JB-BGR-', 'Bogor', 'Kabupaten', 12),
(75, 'ID-JK-JKT', 'Jakarta Pusat', 'Kota', 11),
(78, 'ID-JK-JKSL', 'Jakarta Selatan', 'Kota', 11),
(80, 'ID-BT-SRP', 'Serang', 'Kota', 16),
(84, 'ID-BT-TNG', 'Tangerang Selatan', 'Kota', 16);

-- --------------------------------------------------------

--
-- Struktur dari tabel `paket`
--

CREATE TABLE `paket` (
  `id_paket` int(11) NOT NULL,
  `id_vendor` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `deskripsi` text NOT NULL,
  `berat` decimal(10,2) NOT NULL,
  `dimensi` varchar(50) NOT NULL,
  `harga` decimal(10,2) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `paket`
--

INSERT INTO `paket` (`id_paket`, `id_vendor`, `nama`, `deskripsi`, `berat`, `dimensi`, `harga`, `status`) VALUES
(1, 1, 'Iphone 13', 'Handphone', '0.50', '20x15x10', '9000000.00', 'Tersedia'),
(2, 1, 'Asus Vivobook 14', 'Laptop', '2.00', '40x30x10', '9500000.00', 'Tersedia'),
(3, 3, 'Carrier 60l', 'Tas Gunung Arei', '2.00', '100x40x40', '650000.00', 'Tersedia'),
(7, 1, 'Apple Vision Pro', 'AR glasses', '3.00', '30x15x30', '54000000.00', 'Tersedia');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengiriman`
--

CREATE TABLE `pengiriman` (
  `id_pengiriman` int(11) NOT NULL,
  `id_paket` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `id_biaya` int(11) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `id_provinsi` int(11) NOT NULL,
  `id_kota` int(11) NOT NULL,
  `detail_alamat` varchar(255) NOT NULL,
  `kode_pos` int(10) NOT NULL,
  `tanggal_pengiriman` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `tanggal_diterima` datetime DEFAULT NULL,
  `status_pengiriman` varchar(50) DEFAULT 'Dalam Pengiriman'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `pengiriman`
--

INSERT INTO `pengiriman` (`id_pengiriman`, `id_paket`, `qty`, `id_biaya`, `id_customer`, `id_provinsi`, `id_kota`, `detail_alamat`, `kode_pos`, `tanggal_pengiriman`, `tanggal_diterima`, `status_pengiriman`) VALUES
(6, 1, 3, 2, 6, 15, 45, 'Jl. Soekarno Hatta No. 2, Jatimulyo', 65141, '2024-06-05 00:00:00', '2024-06-08 00:00:00', 'Dalam Pengiriman'),
(9, 1, 1, 1, 5, 11, 78, 'Jl. Senopati N0. 41, Senayan', 12190, '2024-05-28 23:45:12', '2024-05-30 23:45:12', 'Dalam Pengiriman'),
(10, 3, 2, 2, 7, 14, 62, 'Jl. Raya Sleman No. 22', 55288, '2024-06-05 00:00:00', '2024-06-08 00:00:00', 'Diterima'),
(14, 1, 2, 1, 5, 11, 78, 'Jl. Panglima Polim No. 65', 12160, '2024-06-05 00:00:00', '2024-06-08 00:00:00', 'Dalam Pengiriman');

-- --------------------------------------------------------

--
-- Struktur dari tabel `provinsi`
--

CREATE TABLE `provinsi` (
  `id_provinsi` int(11) NOT NULL,
  `kode_provinsi` varchar(10) NOT NULL,
  `nama_provinsi` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `provinsi`
--

INSERT INTO `provinsi` (`id_provinsi`, `kode_provinsi`, `nama_provinsi`) VALUES
(11, 'ID-JK', 'DK Jakarta'),
(12, 'ID-JB', 'Jawa Barat'),
(13, 'ID-JT', 'Jawa Tengah'),
(14, 'ID-YO', 'DI Yogyakarta'),
(15, 'ID-JI', 'Jawa Timur'),
(16, 'ID-BT', 'Banten');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `kontak` varchar(20) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id_user`, `nama`, `username`, `password`, `kontak`, `role`) VALUES
(1, 'Ibu Karla', 'karla', 'karla123', '085576123455', 'Administrator'),
(2, 'Bapak Toni', 'toni', 'toni123', '085565243488', 'Administrator'),
(15, 'Ibu Linda', 'linda', 'linda123', '085576761231', 'Administrator');

-- --------------------------------------------------------

--
-- Struktur dari tabel `vendor`
--

CREATE TABLE `vendor` (
  `id_vendor` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `pegawai` varchar(255) NOT NULL,
  `kontak` varchar(20) NOT NULL,
  `alamat` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `vendor`
--

INSERT INTO `vendor` (`id_vendor`, `nama`, `pegawai`, `kontak`, `alamat`) VALUES
(1, 'Vendor A', 'Bapak Toni', '085573294742', 'Jl. Jenderal Sudirman, Jakarta Selatan'),
(3, 'Vendor B', 'Ibu Rani', '085576812331', 'Jl. Soekarno Hatta, Malang');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `biaya`
--
ALTER TABLE `biaya`
  ADD PRIMARY KEY (`id_biaya`);

--
-- Indeks untuk tabel `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id_customer`),
  ADD KEY `id_provinsi` (`id_provinsi`),
  ADD KEY `id_kota` (`id_kota`);

--
-- Indeks untuk tabel `kota`
--
ALTER TABLE `kota`
  ADD PRIMARY KEY (`id_kota`),
  ADD KEY `id_provinsi` (`id_provinsi`);

--
-- Indeks untuk tabel `paket`
--
ALTER TABLE `paket`
  ADD PRIMARY KEY (`id_paket`),
  ADD KEY `id_vendor` (`id_vendor`);

--
-- Indeks untuk tabel `pengiriman`
--
ALTER TABLE `pengiriman`
  ADD PRIMARY KEY (`id_pengiriman`),
  ADD KEY `id_paket` (`id_paket`),
  ADD KEY `FK_customer` (`id_customer`),
  ADD KEY `FK_biaya` (`id_biaya`),
  ADD KEY `id_provinsi` (`id_provinsi`),
  ADD KEY `id_kota` (`id_kota`);

--
-- Indeks untuk tabel `provinsi`
--
ALTER TABLE `provinsi`
  ADD PRIMARY KEY (`id_provinsi`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- Indeks untuk tabel `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`id_vendor`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `biaya`
--
ALTER TABLE `biaya`
  MODIFY `id_biaya` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `customer`
--
ALTER TABLE `customer`
  MODIFY `id_customer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `kota`
--
ALTER TABLE `kota`
  MODIFY `id_kota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT untuk tabel `paket`
--
ALTER TABLE `paket`
  MODIFY `id_paket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `pengiriman`
--
ALTER TABLE `pengiriman`
  MODIFY `id_pengiriman` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `provinsi`
--
ALTER TABLE `provinsi`
  MODIFY `id_provinsi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT untuk tabel `vendor`
--
ALTER TABLE `vendor`
  MODIFY `id_vendor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`id_provinsi`) REFERENCES `provinsi` (`id_provinsi`),
  ADD CONSTRAINT `customer_ibfk_2` FOREIGN KEY (`id_kota`) REFERENCES `kota` (`id_kota`);

--
-- Ketidakleluasaan untuk tabel `kota`
--
ALTER TABLE `kota`
  ADD CONSTRAINT `kota_ibfk_1` FOREIGN KEY (`id_provinsi`) REFERENCES `provinsi` (`id_provinsi`);

--
-- Ketidakleluasaan untuk tabel `paket`
--
ALTER TABLE `paket`
  ADD CONSTRAINT `paket_ibfk_1` FOREIGN KEY (`id_vendor`) REFERENCES `vendor` (`id_vendor`);

--
-- Ketidakleluasaan untuk tabel `pengiriman`
--
ALTER TABLE `pengiriman`
  ADD CONSTRAINT `FK_biaya` FOREIGN KEY (`id_biaya`) REFERENCES `biaya` (`id_biaya`),
  ADD CONSTRAINT `FK_customer` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id_customer`),
  ADD CONSTRAINT `pengiriman_ibfk_1` FOREIGN KEY (`id_paket`) REFERENCES `paket` (`id_paket`),
  ADD CONSTRAINT `pengiriman_ibfk_2` FOREIGN KEY (`id_provinsi`) REFERENCES `provinsi` (`id_provinsi`),
  ADD CONSTRAINT `pengiriman_ibfk_3` FOREIGN KEY (`id_kota`) REFERENCES `kota` (`id_kota`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
