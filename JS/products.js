
const URL_BASE = 'http://localhost:3000/produtos'



const API = {
    async buscarProdutos() {
        try {
            const resp = await fetch(URL_BASE)
            const data = await resp.json()
            return data
        } catch (error) {
            
        }
    }
}
    
export default API;