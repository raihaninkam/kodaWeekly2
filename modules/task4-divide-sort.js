function divideAndSort(number) {
  // 1. Konversi number ke string
  const numStr = number.toString();
  
  // 2. Pisahkan berdasarkan angka 0
  const parts = numStr.split('0');
  
  // 3. Urutkan setiap bagian
  const sortedParts = parts.map(part => {
    // Ubah string ke array karakter, urutkan, lalu gabungkan kembali
    return part.split('').sort().join('');
  });
  
  // 4. Gabungkan semua bagian yang sudah diurutkan
  const result = sortedParts.join('');
  
  // 5. Konversi kembali ke number
  return parseInt(result, 10);
}

// Contoh penggunaan
// console.log(divideAndSort(5956560159466056)); // Output: 55566914566956
module.exports = {divideAndSort};