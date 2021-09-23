const PORT = 3000;
const local = async (input) => {
    let id = 0
    if(nome.checked){
        if(input == "") {
            window.alert('Por favor, informe o nome do produto.')
        } else if (!/[A-Z0-9]/gi.test(input)) {
            window.alert('Apenas caracteres alfanuméricos são permitidos!')
        } else {
            try {
                // mudar rota de acordo com o arquivo que tiver testando
                let response = await fetch(`http://localhost:${PORT}/get_by_productName?name=` + input).then(body => body.json());
                console.log(response)
                createTableFromJSON(response);
                id = 1
            } catch (error) {
                console.log(error) /* Tratar error */
            }   
        }
    } else if(barras.checked){
        if(input == "") {
            window.alert('Por favor, informe o codigo de barras do produto.')
        } else if (!/[0-9]/gi.test(input)) {
            window.alert('Apenas caracteres numéricos são permitidos!')
        } else {
            try {
                // mudar rota de acordo com o arquivo que tiver testando
                let response = await fetch(`http://localhost:${PORT}/get_by_bar_code?code=` + input).then(body => body.json());
                createTableFromJSON(response);
                id = 1
            } catch (error) {
                console.log(error) /* Tratar error */
            }   
        }
    } else if(subs.checked){
        if(input == "") {
            window.alert('Por favor, informe a nome do príncipio Ativo')
        } else if (!/[A-Z0-9]/gi.test(input)) {
            window.alert('Apenas caracteres alfanuméricos são permitidos!')
        } else {
            try {
                // mudar rota de acordo com o arquivo que tiver testando
                let response = await fetch(`http://localhost:${PORT}/get_by_active?subs=` + input).then(body => body.json());
                createTableFromJSON(response);
                id = 1
            } catch (error) {
                console.log(error) /* Tratar error */
            }   
        }
    } else if(ggrem.checked){
        if(input == "") {
            window.alert('Por favor, informe o código ggrem.')
        } else if (!/[0-9]/gi.test(input)) {
            window.alert('Apenas caracteres numéricos são permitidos!')
        } else {
            try {
                // mudar rota de acordo com o arquivo que tiver testando
                let response = await fetch(`http://localhost:${PORT}/get_by_ggrem?ggrem=` + input).then(body => body.json());
                createTableFromJSON(response);
                id = 1
            } catch (error) {
                console.log(error) /* Tratar error */
            }   
        }
    } else {
        window.alert('Por favor, selecione um campo!');
    }
    if(id==0){
        return false
    }
    return true
}

function createTableFromJSON(response) {
    var divContainer = document.getElementById("result");

    var col = [];
    for (var i = 0; i < response.length; i++) {
        for (var key in response[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");
    let theader = table.createTHead(); /* JQUERY DATA TABLE */
    let tbody = table.createTBody(); /* JQUERY DATA TABLE */
    table.id ='table_id'; /* JQUERY DATA TABLE */
    table.className = "display"; /* JQUERY DATA TABLE */
 
    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = theader.insertRow(-1);                   // TABLE ROW.

    let header = ["Princípio Ativo","Laboratorio","Produto","Apresentação","Tipo Produto","Regime Preço","Preço Final","Restrição Hospitalar","Tarja"]
    for (var i = 0; i < header.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = header[i];
        tr.appendChild(th);
    }


    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < response.length; i++) {

        tr = tbody.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
           if(j == 0 || j == 2 || j == 8 || j == 9 || j == 11 || j == 12 || j == 13 || j == 32 || j == 39) {
                var tabCell = tr.insertCell(-1);
                response[i][col[j]] == false && typeof response[i][col[j]] == 'boolean' ? response[i][col[j]] = 'Não' : 
                    response[i][col[j]] == true && typeof response[i][col[j]] == 'boolean' ? response[i][col[j]] = 'Sim' :
                        response[i][col[j]] == null ? response[i][col[j]] = '' : null
                tabCell.innerHTML = response[i][col[j]]
           }
        }
    }

    // ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}