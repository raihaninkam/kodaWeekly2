const getDataFromServer = (status, callback) => {
    if(status){
        setTimeout(() => {
            const products = [
                'Product 1',
                'Product 2',
                'Product 3'
            ]
            callback(products, null)
        }, 3000)
    }else{
        const err = new Error('Failed to fetch data')
        callback(null, err)
    }
}

// Callback function untuk memproses data
function processData(data, error) {
    try {
        if (error) {
            throw error; // Melempar error ke block catch
        }
        
        // Proses data jika tidak ada error
        console.log("Data berhasil diterima:");
        data.forEach((product, index) => {
            console.log(`${index + 1}. ${product}`);
        });
        
    } catch (err) {
        console.error("Terjadi error:", err.message);
    } finally {
        console.log("Proses pengambilan data selesai");
    }
}

// Memanggil getDataFromServer dengan callback processData
// getDataFromServer(true, processData); // Kasus sukses
// getDataFromServer(false, processData); // Kasus err
module.exports = {getDataFromServer, processData};