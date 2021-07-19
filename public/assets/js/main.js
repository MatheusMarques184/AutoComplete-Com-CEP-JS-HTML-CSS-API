const cep = document.querySelector("#cep")

function showData (result) {
    for (let label in result){
        if(document.querySelector(`#${label}`)){
            document.querySelector(`#${label}`).value = result[label].toUpperCase();
        }
        if(result[label]==true){
            document.querySelector("#logradouro").value = "CEP INEXISTENTE";
            document.querySelector("#bairro").value = "CEP INEXISTENTE";
            document.querySelector("#localidade").value = "CEP INEXISTENTE";
            document.querySelector("#uf").value = "CEP INEXISTENTE";  
        }
    }
}
cep.addEventListener("blur",( ev ) => {
    consult();
})
cep.addEventListener("keypress",( ev ) => {
    if(ev.keyCode === 13){
        consult();
    }
})
function consult(){
    let newCep = cep.value.replace("-","")
    const options = {
        method: 'GET',
        mode : 'cors',
        cache: 'default'
    }
    fetch(`https://viacep.com.br/ws/${newCep}/json/`,options)
        .then(response => {
            response.json()
                .then(data =>{
                    //console.log(data)
                    showData(data)
                })
        })
        .catch(err => {
            console.log(err)
        })
        
    const copyButton = document.getElementById('copy');  
    copyButton.addEventListener('click', (ev)=> {
        ev.preventDefault();
        cep.select();
        document.execCommand('copy');
        cep.blur();
    });
}