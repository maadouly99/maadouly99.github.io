



var tabNumeros = ["777536462","776362737", "771301845", "761472273","784448668"];
var tabSoldes = [200000, 300000, 400000, 500000, 600000];
var tabCodes = ["0000","0001","0002","0003","0004"];
var num;
var numCourant;

 function menu() {

    var text = document.getElementById("num").value;
    var stringMenu = ""+
   "---------Menu SENMONEY---------\n"+
    "-------------"+text+"-------------"+ 
    " \n Taper le Numéro du Service Choisi\n"+
    "1 : Solde de mon compte\n"+
    "2 : Transfert d'arent\n"+
    "3 : Paiement facture\n"+
    "4 : Option";
    
    var rep = window.prompt(stringMenu);
    return rep;

 }

 function afficheSolde(num) {
    var indice = tabNumeros.indexOf(num);
    if(indice != -1){
        var code = window.prompt("Donnez votre code secret");
        if(code==tabCodes[indice]){
            alert("Votre solde est de : "+tabSoldes[indice]+" F CFA" );
        }
    else{
        alert("Le code est incorect!");
    }
    }
   
 }
  function main(){
      var rep = menu();
      var numCourant = document.getElementById('num').value;
      switch(rep){
        case "1":
        afficheSolde(numCourant);
        break;

        case "2":
        numTrans = document.getElementById('num').value;
        transfertArgent(numTrans);
        break;
      }
    }
    function etapeSuivant(){
      var returnMenu = window.confirm("Voulez vous retourner au menu ?")
      if(returnMenu == true){
        return main();
      }
      else{
        alert("Au revoir")
      }
    }     
    


function transfertArgent(numDest){
            var indice = tabNumeros.indexOf(numDest);
            if (indice != -1) 
            {
                var numero = window.prompt("Veuillez saisir le numéro de téléphone du destinataire:");
                if(numero !=-1){
                for (var i=0; i<tabNumeros.length; i++)
                {
                    if (numero == tabNumeros[i]) 
                    {
                        var montant = window.prompt("Veuillez saisir le montant du transfert:");
                        var y = parseInt(montant);
                        var code = window.prompt("Veuillez saisir votre code secret:");
                         if (code == tabCodes[indice])
                        {
                            if (y < tabSoldes[indice]) 
                            {
                                tabSoldes[indice] -=y; 
                                tabSoldes[i] = tabSoldes[i] + y;
              
                                alert("Votre  solde  est maintenant de "+tabSoldes[indice]+ " F CFA");
                                 
                            }
                            else 
                            {
                                alert ("Votre solde est insuffisant");
                            }
                        }
                    }
               }
            }
            }
        }
  