const fetchData = (status) => {
    return new Promise((resolve, reject) => { 
        if (status) { 
            setTimeout(() => { 
                resolve("Data berhasil disimpan") 
            }, 3000) 
        } else { 
            reject("Gagal mengambil data") 
        }
    });
}

// ==============================================
// 1. Handling dengan then-catch
// ==============================================
/*
Penjelasan:
- Promise adalah objek yang merepresentasikan keberhasilan/kegagalan sebuah operasi asynchronous.
- then() digunakan untuk menangani hasil resolve dari Promise.
- catch() digunakan untuk menangani hasil reject dari Promise.
- finally() (opsional) akan dijalankan baik Promise resolve maupun reject.
*/
function handleWithThenCatch(status) {
    fetchData(status)
        .then(result => console.log("Then-catch Success:", result))
        .catch(error => console.error("Then-catch Error:", error));
}
// ==============================================
// 2. Handling dengan async/await dan try-catch
// ==============================================
/*
Penjelasan:
- async/await adalah sintaks modern untuk bekerja dengan Promise.
- Fungsi yang menggunakan await harus ditandai dengan async.
- try-catch digunakan untuk menangani resolve (try) dan reject (catch).
- try-catch membuat alur kode asynchronous terlihat seperti synchronous.
*/
async function handleWithAsyncAwait(status) {
    try {
        const result = await fetchData(status);
        console.log("Async-await Success:", result);
    } catch (error) {
        console.error("Async-await Error:", error);
    }
}

// Panggil fungsi async
// handleFetchData(true);
module.exports = {fetchData, handleWithThenCatch, handleWithAsyncAwait};