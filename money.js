
var tabNumeros = ["781070000","763450001", "777710002", "757680003","704360004"];
var tabSoldes = [532850, 765350, 2450000, 3500000, 5000000];
var tabCodes = ["0000","0001","0002","0003","0004"];
var num;
var numCourant;

 function menu() {

    var text = document.getElementById("num").value;
    var textMenu = ""+
   "---------Menu SENMONEY---------\n"+
    "-------------"+text+"-------------"+ 
    " \n Taper le Numéro du Service Choisi\n"+
    "1 : Solde de mon compte\n"+
    "2 : Transfert d'arent\n"+
    "3 : Paiement facture\n"+
    "4 : Option";
    
    var rep = window.prompt(textMenu);
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
     var numCourant = document.getElementById("num").value;
     switch(rep){
        case "1":
            afficheSolde(numCourant);
            etapeSuivant();
            break;
            default: 
            alert("Choix non disponible");
        
     }
 }

 function etapeSuivant(){
     if(confirm("Voulez-vous retourner au menu?")){
            main();
        
     }else{
         alert("Au revoir");
     }
    
}