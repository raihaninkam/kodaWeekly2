async function getData () {
    try {
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Gagal saat mengambil data: ${response.status}`)
    }

    const data = await response.json()

    let result = [];
   
    for (let i = 0; i < data.length; i++) {
        const user = data[i];
        result.push({
            nama: user.name,
            domisili: user.address.city
        });  
    }

    result.sort((a,b) => a.domisili.localeCompare(b.domisili));
    console.log("Data pengguna diurutkan berdasarkan domisili");
    console.log(result)

    return result;



    } catch (error) {
        console.log("error:", error.message);
    }
}   
// getData()
module.exports = {getData};