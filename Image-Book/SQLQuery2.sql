USE QuanLiNongSan;
GO

-- Tạo bảng PhanLoai
CREATE TABLE PhanLoai(
     Ma_loai INT PRIMARY KEY,
     Ten_Loai NVARCHAR(100) NOT NULL
);

-- Tạo bảng NguoiDung
CREATE TABLE NguoiDung(
      Ma_ND INT PRIMARY KEY NOT NULL,
	  Ho_ND NVARCHAR(100) NOT NULL,
      Ten_ND NVARCHAR(100) NOT NULL,
	  NgayTao DATE,
	  Ma_Loai INT,
	  CONSTRAINT nguoi_dung_fk1 FOREIGN KEY (Ma_Loai) REFERENCES PhanLoai(Ma_loai)
);

-- Tạo bảng TaiKhoan
CREATE TABLE TaiKhoan(
      Ma_TK INT PRIMARY KEY,
	  Ma_ND INT,
	  Mat_Khau INT,
	  Loai_TK NVARCHAR(10),
	  CONSTRAINT Tai_khoan_fk1 FOREIGN KEY (Ma_ND) REFERENCES NguoiDung(Ma_ND)
);

-- Tạo bảng DanhMuc
CREATE TABLE DanhMuc(
      Ma_DM INT PRIMARY KEY,
	  Ten_DM NVARCHAR(100),
	  Mo_Ta NVARCHAR(255)
);

-- Tạo bảng GiaCa
CREATE TABLE GiaCa(
      Ma_Gia INT PRIMARY KEY,
      Ma_SP INT,
      Ngay_Ap_Dung DATE,
      Ngay_Ket_Thuc DATE,
      Gia INT
);

-- Tạo bảng SanPham
CREATE TABLE SanPham(
      Ma_SP INT PRIMARY KEY,
	  Ma_DM INT,
	  Ten_SP NVARCHAR(100),
	  Ma_Gia INT,
	  Nguon_Goc NVARCHAR(255),
	  CONSTRAINT San_pham_fk1 FOREIGN KEY (Ma_DM) REFERENCES DanhMuc(Ma_DM),
	  CONSTRAINT San_pham_fk2 FOREIGN KEY (Ma_Gia) REFERENCES GiaCa(Ma_Gia)
);

-- Tạo bảng DonDatHang
CREATE TABLE DonDatHang(
      Ma_DDH INT PRIMARY KEY,
	  Ma_ND INT, 
	  Ma_TK INT,
	  Ma_SP INT,
	  Dau_Thoi_Gian DATE,
	  Trạng_Thai NVARCHAR(255),
	  Tong_Tien INT,
	  CONSTRAINT DDH_fk1 FOREIGN KEY (Ma_ND) REFERENCES NguoiDung(Ma_ND),
	  CONSTRAINT DDH_fk2 FOREIGN KEY (Ma_TK) REFERENCES TaiKhoan(Ma_TK),
	  CONSTRAINT DDH_fk3 FOREIGN KEY (Ma_SP) REFERENCES SanPham(Ma_SP)
);

-- Tạo bảng PhanHoi
CREATE TABLE PhanHoi(
      Ma_PH INT PRIMARY KEY,
      Ma_TK INT,
      Tieu_De NVARCHAR(100),
      Noi_Dung NVARCHAR(255),
      Diem_Danh_Gia INT,
      Thoi_Gian_Danh_Gia DATE,
	  CONSTRAINT Phan_hoi_fk1 FOREIGN KEY (Ma_TK) REFERENCES TaiKhoan(Ma_TK)
);

-- Tạo bảng PhieuMuaHang
CREATE TABLE PhieuMuaHang(
      Ma_Phieu INT PRIMARY KEY,
	  Ma_DDH INT,
      Ten_Phieu NVARCHAR(100),
      Phan_Tram_Giam_Gia INT,
      Dieu_Kien_Ap_Dung NVARCHAR(255),
      Thoi_Gian_Ap_Dung DATE,
	  CONSTRAINT PMH_fk1 FOREIGN KEY (Ma_DDH) REFERENCES DonDatHang(Ma_DDH)
);

-- Tạo bảng TheTinDung
CREATE TABLE TheTinDung(
      Ma_TTD INT PRIMARY KEY,
      Ma_TK INT,
      So_The INT,
	  CONSTRAINT the_tin_dung_fk1 FOREIGN KEY (Ma_TK) REFERENCES TaiKhoan(Ma_TK)
);

-- Tạo bảng ThanhToan
CREATE TABLE ThanhToan(
     So_Phieu INT PRIMARY KEY,
     Ma_DDH INT,
     Ma_TTD INT,
     Loai_Thanh_Toan NVARCHAR(50),
     Gia_Tri INT,
	 CONSTRAINT thanh_toan_fk1 FOREIGN KEY (Ma_DDH) REFERENCES DonDatHang(Ma_DDH),
	 CONSTRAINT thanh_toan_fk2 FOREIGN KEY (Ma_TTD) REFERENCES TheTinDung(Ma_TTD)
);

-- Tạo bảng VanChuyen
CREATE TABLE VanChuyen(
     Ma_VC INT PRIMARY KEY,
     Ma_DDH INT,
     Ma_TK INT,
     Ten_Phuong_Thuc NVARCHAR(100),
     Thoi_Gian_Van_Chuyen DATE,
     Theo_Doi NVARCHAR(255),
	 CONSTRAINT van_chuyen_fk1 FOREIGN KEY (Ma_DDH) REFERENCES DonDatHang(Ma_DDH),
	 CONSTRAINT van_chuyen_fk2 FOREIGN KEY (Ma_TK) REFERENCES TaiKhoan(Ma_TK)
);

-- Tạo bảng DiaChi
CREATE TABLE DiaChi(
     Ma_DC INT PRIMARY KEY,
     Ma_TK INT,
     So_Nha INT,
     Ten_Duong NVARCHAR(100),
     Thanh_Pho NVARCHAR(100),
     Ma_Buu_Dien INT,
	 CONSTRAINT dia_chi_fk1 FOREIGN KEY (Ma_TK) REFERENCES TaiKhoan(Ma_TK)
);

-- Chèn dữ liệu vào bảng PhanLoai
INSERT INTO PhanLoai VALUES (0, N'VIP');
INSERT INTO PhanLoai VALUES (1, N'Bạch kim');
INSERT INTO PhanLoai VALUES (2, N'Kim cương');

-- Chèn dữ liệu vào bảng NguoiDung
INSERT INTO NguoiDung VALUES (12, N'Nguyễn', N'An', '2003-04-28', 1);
INSERT INTO NguoiDung VALUES (13, N'Trần', N'Cẩn', '2003-05-01', 2);
INSERT INTO NguoiDung VALUES (14, N'Hoàng', N'Khánh', '2003-10-09', 0);

-- Chèn dữ liệu vào bảng TaiKhoan
INSERT INTO TaiKhoan VALUES (1234, 12, 12345, N'VIP');
INSERT INTO TaiKhoan VALUES (1235, 13, 6789, N'Bạch kim');
INSERT INTO TaiKhoan VALUES (1236, 14, 54231, N'Kim cương');

-- Chèn dữ liệu vào bảng DanhMuc
INSERT INTO DanhMuc VALUES (1535, N'Rau củ', N'Rất ngon');

-- Chèn dữ liệu vào bảng GiaCa
INSERT INTO GiaCa VALUES (1, 1, '2023-01-01', '2023-12-31', 10000);
INSERT INTO GiaCa VALUES (2, 1, '2023-01-01', '2023-12-31', 15000);
INSERT INTO GiaCa VALUES (3, 2, '2023-01-01', '2023-12-31', 20000);
INSERT INTO GiaCa VALUES (4, 2, '2023-01-01', '2023-12-31', 25000);
INSERT INTO GiaCa VALUES (5, 0, '2023-01-01', '2023-12-31', 30000);
INSERT INTO GiaCa VALUES (6, 0, '2023-01-01', '2023-12-31', 35000);

-- Chèn dữ liệu vào bảng SanPham
INSERT INTO SanPham VALUES (1, 1535, N'Rau cải', 1, N'Việt Nam');
INSERT INTO SanPham VALUES (2, 1535, N'Rau xanh', 2, N'Việt Nam');
INSERT INTO SanPham VALUES (3, 1535, N'Rau muống', 3, N'Việt Nam');

-- Chèn dữ liệu vào bảng DonDatHang
INSERT INTO DonDatHang VALUES (1, 12, 1234, 1, '2023-10-20', N'Đã giao hàng', 10000);
INSERT INTO DonDatHang VALUES (2, 13, 1235, 2, '2023-10-21', N'Chờ xác nhận', 15000);

-- Chèn dữ liệu vào bảng PhanHoi
INSERT INTO PhanHoi VALUES (1, 1234, N'Phản hồi sản phẩm', N'Rau cải rất tốt', 5, '2023-10-22');
INSERT INTO PhanHoi VALUES (2, 1235, N'Phản hồi sản phẩm', N'Rau xanh chất lượng', 4, '2023-10-22');

-- Chèn dữ liệu vào bảng PhieuMuaHang
INSERT INTO PhieuMuaHang VALUES (1, 1, N'Phiếu mua hàng 1', 10, N'Giảm giá 10%', '2023-10-20');
INSERT INTO PhieuMuaHang VALUES (2, 2, N'Phiếu mua hàng 2', 5, N'Giảm giá 5%', '2023-10-21');

-- Chèn dữ liệu vào bảng TheTinDung
INSERT INTO TheTinDung VALUES (1, 1234, 123456789);
INSERT INTO TheTinDung VALUES (2, 1235, 987654321);

-- Chèn dữ liệu vào bảng ThanhToan
INSERT INTO ThanhToan VALUES (1, 1, 1, N'Thanh toán bằng thẻ tín dụng', 9000);
INSERT INTO ThanhToan VALUES (2, 2, 2, N'Thanh toán bằng thẻ tín dụng', 14250);

-- Chèn dữ liệu vào bảng VanChuyen
INSERT INTO VanChuyen VALUES (1, 1, 1234, N'Giao hàng tận nơi', '2023-10-21', N'Đang vận chuyển');
INSERT INTO VanChuyen VALUES (2, 2, 1235, N'Giao hàng tận nơi', '2023-10-22', N'Đang đóng gói');

-- Chèn dữ liệu vào bảng DiaChi
INSERT INTO DiaChi VALUES (1, 1234, 12, N'Đường A', N'TPHCM', 700000);
INSERT INTO DiaChi VALUES (2, 1235, 34, N'Đường B', N'Hà Nội', 100000);

