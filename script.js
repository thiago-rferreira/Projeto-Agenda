class Contato {
    constructor(fullname, phone, cellphone, photo, birthdate, email, cep, city, insta, github) {
        this.fullname = fullname;
        this.phone = phone;
        this.cellphone = cellphone;
        this.photo = photo;
        this.id = randomId();
        this.birthdate = birthdate;
        this.email = email;
        this.cep = cep;
        this.city = city;
        this.signo = this.getZodiacSign();
        this.age = this.calculateAge();
        this.insta = insta;
        this.github = github;
    }

    getZodiacSign() {
        let birthdate = new Date(this.birthdate);
        let day = birthdate.getDate();
        let month = birthdate.getMonth() + 1;
        console.log("Passou pelo getSigno() da class User");

        if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
            return "Capricórnio ♑";
        } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
            return "Aquário ♒";
        } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
            return "Peixes ♓";
        } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
            return "Áries ♈";
        } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
            return "Touro ♉";
        } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
            return "Gêmeos ♊";
        } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
            return "Câncer ♋";
        } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
            return "Leão ♌";
        } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
            return "Virgem ♍";
        } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
            return "Libra ♎";
        } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
            return "Escorpião ♏";
        } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
            return "Sagitário ♐";
        }
    }

    calculateAge() {
        let today = new Date();
        let birthdate = new Date(this.birthdate);
        let age = today.getFullYear() - birthdate.getFullYear();
        let month = today.getMonth() - birthdate.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }
        console.log("Passou pelo calculateAge() da class User");
        return age;

    }
}

class ListaContatos {
    constructor() {
        this.contatos = [];
    }

    adicionarContato(contato) {
        if(isAnyInputEmpty()){
            sendMSG("Preencha todos os campos!", "error");
        }else if(!isURLValida(contato.photo)){
            sendMSG("URL da foto inválida!", "error");
        }else if(checarIdExiste(contato.id)){
            sendMSG("ID já existe!", "error");
        }else{
            this.contatos.push(contato);
            sendMSG("Contato adicionado com sucesso!", "success");
            limparFormulario();
        }
    }

    listarContatos() {
        return this.contatos;
    }

    getContactById(id) {
        return this.contatos.find(contato => contato.id == id);
    }
}

const listaDeContatos = new ListaContatos();

function adicionarContato() {
    const fullname = document.getElementById("fullname").value;
    const phone = document.getElementById("phone").value;
    const cellphone = document.getElementById("cellphone").value;
    const photo = document.getElementById("photo").value;
    const birthdate = document.getElementById("birthdate").value;
    const email = document.getElementById("email").value;
    const cep = document.getElementById("cep").value;
    const city = document.getElementById("city").value;
    const insta = document.getElementById("insta").value;
    const github = document.getElementById("github").value;


    const contato = new Contato(fullname, phone, cellphone, photo, birthdate, email, cep, city, insta, github);
    listaDeContatos.adicionarContato(contato);
    exibirContatos();
}

function limparFormulario() {
    document.getElementById("fullname").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("cellphone").value = "";
    document.getElementById("photo").value = "";

}

function exibirContatos() {

    const contactList = document.getElementById("contact-list");
    let html = "";
    let array = listaDeContatos.listarContatos();

    array.forEach(contato => {
        html += `
        <div class="contact" onclick="contatoDetalhe(${contato.id})" id=${contato.id}>
        <img src="${contato.photo}" alt="${contato.fullname}">
            <div class="div-info-contact">
                <h3>${contato.fullname}</h3>
            <p>Telefone Fixo: ${formateCelular(contato.phone)}</p>
            <p>Telefone Celular: ${formateCelular(contato.cellphone)}</p>
            </div>
        </div>
    `;
    });

    contactList.innerHTML = html;

}

function isURLValida(url) {
    if (url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        return true;
    } else {
        return false;
    }
}

function clearInputs() {
    document.getElementById("fullname").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("cellphone").value = "";
    document.getElementById("photo").value = "";
    document.getElementById("birthdate").value = "";
    document.getElementById("email").value = "";
    document.getElementById("cep").value = "";
    document.getElementById("city").value = "";
    document.getElementById("insta").value = "";
    document.getElementById("github").value = "";

}

function sendMSG(msg, type) {
    const msgDiv = document.getElementById("msg");
    msgDiv.innerHTML = "";

    const msgP = `
        <p class="${type}">${msg}</p>
    `;

    msgDiv.innerHTML += msgP;

    setTimeout(function () {
        msgDiv.innerHTML = "";
    }, 3000);
}

function isAnyInputEmpty() {
    const fullname = document.getElementById("fullname").value;
    const phone = document.getElementById("phone").value;
    const cellphone = document.getElementById("cellphone").value;
    const photo = document.getElementById("photo").value;
    const birthdate = document.getElementById("birthdate").value;
    const email = document.getElementById("email").value;
    const cep = document.getElementById("cep").value;
    const city = document.getElementById("city").value;
    const insta = document.getElementById("insta").value;
    const github = document.getElementById("github").value;


   if(fullname == "" || phone == "" || cellphone == "" || photo == "" || birthdate == "" || email == "" || cep == "" || city == "" || insta == "" || github == ""){
         return true;
    }else{
        return false;
    }
}

function randomId() {
    let id = Math.floor(Math.random() * 10000);
    if (checarIdExiste(id) == false) {
        console.log("Id não existe: " + id)
        return id;
    } else {
        console.log("Id já existe, tente novamente")
        sendMSG("Id já existe, tente novamente", "error");
    }
}

function checarIdExiste(id) {
    console.log("Entrou na checagem: " + id)
    const array = listaDeContatos.contatos;
    let existe = false;
    array.forEach(contato => {
        if (contato.id == id) {
            console.log("id existe: " + id);
            existe = true;
        }
    });

    return existe;
}

function gerarLinkWhatsapp(telefone) {
    let link = "https://api.whatsapp.com/send?phone=55" + telefone;
    return link;
}

function gerarLinkInstagram(insta) {
    let link = "https://www.instagram.com/" + insta;
    return link;
}

function gerarLinkGithub(github) {
    let link = "https://www.github.com/" + github;
    return link;
}

function contatoDetalhe(id) {
    const contato = document.getElementById("recebeContato");
    let html = "";
    const pessoa = listaDeContatos.getContactById(id);
    let linkWhatsapp = gerarLinkWhatsapp(pessoa.cellphone);
    let linkInstagram = gerarLinkInstagram(pessoa.insta);
    let linkGithub = gerarLinkGithub(pessoa.github);

    console.log(pessoa)

    html += `
        <div id="card-person"  class="hidden">
        <img src="${pessoa.photo}" alt="Avatar">
            <h4><b>${pessoa.fullname}</b></h4> 
            <p>Identificador: ${pessoa.id}</p> 
            <div id="details-card">
                <p>Celular: ${formateCelular(pessoa.cellphone)}</p>
                <p>Telefone: ${formateCelular(pessoa.cellphone)}</p>
                <p>Data nascimento: ${formateDataPTBR(pessoa.birthdate)}</p>
                <p>Idade: ${pessoa.age}</p>
                <p>Signo: ${pessoa.signo}</p>
                <p>Email: ${pessoa.email}</p>
                <p>CEP: ${formateCEP(pessoa.cep)}</p>
                <p>Cidade: ${pessoa.city}</p>
                <p>Instagram: ${pessoa.insta}</p>
                <p>Github: ${pessoa.github}</p>
            </div>
            <div>
            <!-- Ícone do WhatsApp com link -->
            <a href="${linkWhatsapp}" target="_blank" class="fa-brands fa-whatsapp" style="color: #3bb422;"></a>
            
            <!-- Ícone do Instagram com link -->
            <a href="${linkInstagram}" target="_blank" class="fa-brands fa-instagram" style="color: #c13584;"></a>
            
            <!-- Ícone do GitHub com link -->
            <a href="${linkGithub}" target="_blank" class="fa-brands fa-github" style="color: #333;"></a>
            
            </div>
        </div>
    `;

    contato.innerHTML = html;

    exibirContatoDetalhe();
    console.log(id)
}

function exibirContatoDetalhe() {
    //Tirar o display none da div card-person
    document.getElementById("card-person").classList.remove("hidden");

}

function formateCelular(celular) {
    celular = celular.replace(/\D/g, "");
    celular = celular.replace(/^(\d{2})(\d)/g, "($1) $2");
    celular = celular.replace(/(\d)(\d{4})$/, "$1-$2");
    return celular;
}

function formateCEP(cep) {
    cep = cep.replace(/\D/g, "");
    cep = cep.replace(/^(\d{5})(\d)/, "$1-$2");
    return cep;
}

function formateDataPTBR(data) {
    data = data.replace(/\D/g, "");
    data = data.replace(/^(\d{2})(\d)/, "$1/$2");
    data = data.replace(/(\d{2})(\d)/, "$1/$2");
    return data;
}