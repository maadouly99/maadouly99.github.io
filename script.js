var option = "";
var clientels ;
var data;

  function handleNumero()  {
      
    var ajax = new XMLHttpRequest();
    var methode = "GET";
    var url = "senmoney.php"
    var asynchronous =  true;

    ajax.open(methode,url,asynchronous);

    ajax.send();

    ajax.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 200) {
            clientels = JSON.parse(this.responseText);
            for(i=0;i<clientels.length;i++){
                option += "<option value="+clientels[i]['numero']+">"+clientels[i]['numero']+"</option>"
            }
            document.getElementById("numero").innerHTML = option;
        }
    }
}


function menu(){
        var choix=window.prompt("-----MENU SENMONEY-----\n"+
        "Taper le numéro du service choisi\n"+
        "1: Solde de mon compte\n"+
        "2: Transfert d'argent\n"+
        "3: Paiement de facture\n"+
        "4: Options\n");
        if(choix=='1'){
            afficher_Solde();	
        }
        else if(choix == '2'){
            transfert();
        }
        else if(choix == '3'){
            var response = window.confirm("Le service sera bientôt disponible \n Voulez-vous retourner au menu ?");
            if(response)    
                menu();
        }else if (choix == '4'){
            options();
        }else if(choix != '1' && choix != '2' && choix != '3' && choix != '4'){
            if(window.confirm("Choix invalide \n Voulez-vous retourner au menu ?"))
                menu();
        }
}

function options(){
    var opt=window.prompt("--------------OPTION------------\n"+
    "1: Changer mot de passe \n"+
    "2: Historique transaction \n"+
    "3: Menu \n");

    if(opt == '1'){
        changeCode();
    }else if (opt == '2'){
        historique();
    }else if(opt == '3'){
        menu();
    }else {
        if(window.confirm("Choix invalide \n Voulez-vous recommencer ?"))
                options();
    }
}

function afficher_Solde(){

    var numero = document.getElementById("numero").value;
    client = checkNumero(numero, clientels);

    if(client == null){
		alert("Numéro introuvable dans sen Money");	
	}else{
        var code = window.prompt("Veuillez saisir le code de sécurité");
        if(code == client.code){
            var ajax = new XMLHttpRequest();
            var methode = "GET";
            var url = "solde.php?numero="+numero;
            var asynchronous =  true;
            var solde ;
            ajax.open(methode,url,asynchronous); 
            ajax.send();
        
            ajax.onreadystatechange = function (){
                if(this.readyState == 4 && this.status == 200) {
                    data = JSON.parse(this.responseText);
                    solde = data[0]['solde'];
                    var choix=window.confirm("Le solde de votre compte est: "+solde+
			        "\n Voulez-vous retourner au menu ?");
                    if(choix==true){
                        menu();
                    }	
                }
            }
			
		}else{
			var choix=window.confirm("Code éroné\n Voulez-vous retourner au menu ?");
			if(choix==true){
				menu();
			}
		}
	}
}

function checkNumero(number, clients){
    for(client in clients){
        if(clients[client].numero == number)
            return clients[client];
    }
    return null;
}

function transfert(){
    var emeteur = document.getElementById('numero').value;
    var recepteur = window.prompt("Donnez le numéro bénéficier svp");

    clientRecepteur = checkNumero(recepteur, clientels);

    if(clientRecepteur == null){
        var choix=window.confirm("Numéro introuvable dans sen Money\n Voulez-vous retourner au menu ?");
                        if(choix==true){
                            menu();
                        }	
	}else{
        clientEmeteur = checkNumero(emeteur, clientels);
        if(clientEmeteur == null){
            var choix=window.confirm("Vous êtes introuvable dans sen Money\n Voulez-vous retourner au menu ?");
                        if(choix==true){
                            menu();
                        }
        }else{
            var montant = window.prompt("Veuillez saisir le montant");
            if(parseInt(montant) > clientEmeteur.solde){
                var choix=window.confirm("solde insuffisant\n Voulez-vous retourner au menu ?");
                        if(choix==true){
                            menu();
                        }
            }else{
                var code = window.prompt("Veuillez saisir le code de sécurité");
                if(code == clientEmeteur.code){
                    transfertAjax(clientEmeteur.numero,clientRecepteur.numero,montant,clientEmeteur.solde);
                }else{
                    var choix=window.confirm("Code éroné\n Voulez-vous retourner au menu ?");
                    if(choix==true){
                        menu();
                    }
                }
            }
        }
    }
}

function transfertAjax(emeteur,recepteur,montant,solde){
    var ajax = new XMLHttpRequest();
            var methode = "GET";
            var url = "transfert.php?emeteur="+emeteur+"&recepteur="+recepteur+"&montant="+montant;
            var asynchronous =  true;
            ajax.open(methode,url,asynchronous); 
            ajax.send();
            ajax.onreadystatechange = function (){
                if(this.readyState == 4 && this.status == 200) {
                    data = JSON.parse(this.responseText);
                    if(data.success){
                        var reste = parseInt(solde) - parseInt(montant);
                        var choix=window.confirm("Transfert réussi,  votre nouveau solde est : "+reste+"\n Voulez-vous retourner au menu ?");
                        if(choix==true){menu();}
                    }else{
                        var choix=window.confirm("Transfert Échoué\n Voulez-vous retourner au menu ?");
                        if(choix==true){
                            menu();
                        }
                   }	
                }
            }
        
}

function changeCode() {
    var numero = document.getElementById("numero").value;
    client = checkNumero(numero, clientels);
    if(client == null){
        alert("Numéro introuvable dans sen Money");
    }else{
        var oldCode = window.prompt(" Ancien code ?");
        if(oldCode != client.code){
            var response = window.confirm("code incorrect, Allez á la page précédente ?");
            if(response){
                options();
            }
        }else{
            var newCode = window.prompt(" Nouveau code ?");
            if(newCode.length != 4){
                var response = window.confirm("Code incorrect il doit être 4 chiffre...\n Allez á la page précédente ?");
                if(response){
                    options();
                } 
            }else{
                changeCodeAjax(client.id,newCode);
            }
        }
    }
}

function changeCodeAjax(id,code){
    
    var ajax = new XMLHttpRequest();
            var methode = "GET";
            var url = "changecode.php?id="+id+"&code="+code;
            var asynchronous =  true;
            ajax.open(methode,url,asynchronous); 
            ajax.send();
            ajax.onreadystatechange = function (){
                if(this.readyState == 4 && this.status == 200) {
                    data = JSON.parse(this.responseText);
                    if(data.success){
                       alert("Votre nouveau code est :"+code+"\n Voulez-vous retourner au menu ?");
                    }else{
                        var choix=window.confirm("Echec du changement...\n Voulez-vous retourner au menu ?");
                        if(choix==true){
                            menu();
                        }
                   }	
                }
            }

}


function historique(numero){
        var numero = document.getElementById("numero").value;
        var ajax = new XMLHttpRequest();
        var text = "L'historique de vous 5 derniers transactions... \n";
            var methode = "GET";
            var url = "historique.php?numero="+numero;
            var asynchronous =  true;
            ajax.open(methode,url,asynchronous); 
            ajax.send();
            ajax.onreadystatechange = function (){
                if(this.readyState == 4 && this.status == 200) {
                    data = JSON.parse(this.responseText);
                    if(data[0] != "results[]"){
                        for(i=0;i<data.length;i++){
                            text += data[i].mouvement+"  "+data[i].montant+"\n"; 
                        }
                    alert(text);
                    }else{
                        alert("Vous n'avez pas de transaction...\n Voulez-vous retourner au menu ?");
                   }	
                }
            }
}
