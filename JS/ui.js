import API from "./products.js";

const UI = {
    async renderizarProdutos() {
        try {
            const produtos = await API.buscarProdutos()
            const produtosContainer = document.querySelector('#produtos')
            produtos.forEach(produto => {

                const containerProduto = document.createElement('section')
                containerProduto.classList.add('produto-container')
                
                const produtoCard = document.createElement('div')
                produtoCard.setAttribute('id', `${produto.id}`)
                produtoCard.classList.add('produto')

                /*const produtoImg = document.createElement('img')
                produtoImg.classList.add('produtoImg')
                produtoImg.src = produto.imagem
                produtoImg.alt = produto.nome */

                const produtoNome = document.createElement('h2')
                produtoNome.classList.add('produtoNome')
                produtoNome.textContent = produto.nome

                const produtoDescricao = document.createElement('p')
                produtoDescricao.classList.add('produtoDescricao')
                produtoDescricao.textContent = produto.descricao

                const produtoPreco = document.createElement('span')
                produtoPreco.textContent = `R$ ${produto.preco}.00`

                const buttonComprar = document.createElement('button')
                buttonComprar.textContent = 'Adicionar ao carrinho'
                buttonComprar.setAttribute('id', `${produto.id}`)


                produtosContainer.appendChild(containerProduto)
                containerProduto.appendChild(produtoCard)
                /*produtoCard.appendChild(produtoImg)*/
                produtoCard.appendChild(produtoNome)
                produtoCard.appendChild(produtoDescricao)
                produtoCard.appendChild(produtoPreco)
                produtoCard.appendChild(buttonComprar)

            });

        } catch (error) {
            
        }

    }
}

export default UI



