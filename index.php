<?php
function afficherXml($xml, $xsl){
	$internal_errors = libxml_use_internal_errors(true);

	$xmlDoc = new DOMDocument();
	$xmlDoc->load($xml);

	libxml_use_internal_errors($internal_errors);
	
	$xslDoc = new DOMDocument();
	$xslDoc->load($xsl);

	$proc = new XSLTProcessor();
	$proc->importStyleSheet($xslDoc);
	echo $proc->transformToXML($xmlDoc);
}	


function updateFile($xml){
	$xmlLoad = simplexml_load_file($xml);
	$postKeys = array_keys($_POST);

	foreach($xmlLoad->children() as $x)
	{ 
	  foreach($_POST as $key=>$value)
	  { 
		if($key == $x->attributes())
		{ 
		  $x->value = $value;
		}
	  }
	} 

	$xmlLoad->asXML($xml);
	afficherXml($xml,"stylesxsl.xsl");
}

function ajouterProd($xml, $xsl)
{
	$products = simplexml_load_file($xml);
	if(isset($_POST['submit'])) {
        //$products = simplexml_load_file($xml);
        $product = $products->addChild('product');
        $product->addAttribute('id', $_POST['id']);
        $product->addChild('name', $_POST['name']);
		$product->addChild('categorie', $_POST['categorie']);
        $product->addChild('prix', $_POST['prix']);
		$product->addChild('description', $_POST['description']);
		$product->addChild('image', $_POST['image']);
        file_put_contents('tool.xml', $products->asXML());
		//$products->asXML($xml);
        //header('location: index.php');
    }
	$xslDoc = new DOMDocument();
	$xslDoc->load($xsl);

	$proc = new XSLTProcessor();
	$proc->importStyleSheet($xslDoc);
	echo $proc->transformToXML($products);
}

function editProduit($xml, $xsl, $id)
{
	$products = simplexml_load_file($xml);
	if(isset($_POST['submit'])) 
	{
        foreach($products->product as $product)
		{
			if($product['id'] == $_POST['id'])
			{
				$product->name = $_POST['name'];
				$product->categorie = $_POST['categorie'];
				$product->prix = $_POST['prix'];
				$product->description = $_POST['description'];
				$product->image = $_POST['image'];
				
				break;
			}
		}
       //$products->asXML($xml); 
		file_put_contents($xml, $products->asXML());
        //header('location: index.php');
	}
    $xslDoc = new DOMDocument();
    $xslDoc->load($xsl);

    $proc = new XSLTProcessor();
    $proc->importStyleSheet($xslDoc);
    echo $proc->transformToXML($products);
	
}

function chercherProd($xml) 
{
	if(isset($_POST['research']))
	{
		$nom = $_POST['name'];
		$products = simplexml_load_file('mag.xml');
        foreach($products->product as $product)
        {
			if(($product->name == $nom) || ($product['id'] == $nom) || ($product->categorie == $nom)|| ($product->prix == $nom)) 
			{ 
				  
					echo "$product".
					"<table>".
							"<tr>"."<th>"."Name"."</th>".
									"<th>"."Categorie"."</th>".
									"<th>"."Prix"."</th>".
									"<th>"."Description"."</th>".
							"</tr>".

							  "<tr>"."<td>"."$product->name"."</td>".
									 "<td>"."$product->categorie"."</td>".
									 "<td>"."$product->prix"."</td>".
									 "<td>"."$product->description"."</td>".
							   "</tr>".
					"</table>";
					break;
			}
		}
	}
}

function supprimeProd($xml,$id)
{
	$catalog= simplexml_load_file('mag.xml');


	  $id = $_GET['id'];
	  $cdIndex = 0;
	  $cpt = 0;
	  foreach($catalog->product as $cd)
	  {
		 if($cd['id']==$id)
		 { 
		   $cdIndex = $cpt;
		   break;
		 }
		 $cpt++;
	  }
	 unset($catalog->product[$cdIndex]);
	 file_put_contents('mag.xml', $catalog->asXML());

}

if(!isset($_REQUEST["action"])){
  afficherXml("mag.xml", "stylesxsl.xsl");
}
elseif($_REQUEST["action"]== "ajout"){
  //appele fonction ajout
	ajouterProd("mag.xml", "formAjout.xsl");
	afficherXml("mag.xml", "stylesxsl.xsl");
}
elseif($_REQUEST["action"]== "modif"){
  //appele fonction modif
  $id = $_REQUEST["id"];
  //modifProduit("tool.xml","formModif.xsl",$id);
  editProduit("mag.xml", "formModif.xsl", $id);
  afficherXml("mag.xml", "stylesxsl.xsl");

}
elseif($_REQUEST["action"]== "ajout"){
  //appele fonction ajout
	chercherProd("mag.xml", "formAjout.xsl");
	afficherXml("mag.xml", "stylesxsl.xsl");
}
else {
    //appele foction supp 
    $id = $_REQUEST["id"];
    supprimeProd("mag.xml",$id);
	
    afficherXml("mag.xml", "stylesxsl.xsl");
    }
 
chercherProd('mag.xml'); 

?>