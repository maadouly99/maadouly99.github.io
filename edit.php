<?php

	$products = simplexml_load_file('mag.xml');
	$target_dir = "uploads/";
	$target_file = $target_dir . basename($_FILES["image"]["name"]);
	$uploadOk = 1;
	$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
	// Check if image file is a actual image or fake image
	if(isset($_POST["submit"])) {
	  $check = getimagesize($_FILES["image"]["tmp_name"]);
	  if($check !== false) {
		echo "File is an image - " . $check["mime"] . ".";
		$uploadOk = 1;
	  } else {
		echo "File is not an image.";
		$uploadOk = 0;
	  }
	}
    if(isset($_POST['submit'])) 
	{
        foreach($products->product as $product)
		{
			if($product['id'] == $_POST['id'])
			{
				$product->name = $_POST['name'];
				$product->categorie = $_POST['categorie'];
				$product->prix = $_POST['prix'];
				$product->image = $_POST['image'];
				$product->description = $_POST['description'];
				
				break;
			}
		}
        file_put_contents('tool.xml', $products->asXML());
        header('location: index.php');
    }

	foreach($products->product as $product)
	{
		if($product['id'] == $_GET['id'])
		{
			$id = $product['id'];
			$name = $product->name;
			$categorie = $product->categorie;
			//$product = $product->categorie;
			//$product = $product->price;
			$prix = $product->prix;
			$description = $product->description;
			$image = $product->image;
			//$product = $product->description;
			break;
		}
	}
?>
<form  method="POST" action="">
    <table cellpadding="2" cellspacing="2">
        <tr>
            <td>Id:</td>
            <td><input type="text" name="id" value="<?php echo $id; ?>"></td>
        </tr>
        <tr>
            <td>Name:</td>
            <td><input type="text" name="name" value="<?php echo $name; ?>"></td>
        </tr>
		 <tr>
            <td>Categorie:</td>
            <td><input type="text" name="categorie" value="<?php echo $categorie; ?>"></td>
        </tr>
        <tr>
            <td>Prix:</td>
            <td><input type="text" name="prix" value="<?php echo $prix; ?>"></td>       
        </tr>
		<tr>
            <td>Description:</td>
            <td><input type="text" name="description" value="<?php echo $description; ?>"></td>
        </tr>
		<tr>
            <td>Image:</td>
            <td><input type="file" name="image" value="<?php echo $image; ?>"></td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td><input type="submit" name="submit"></td>
        </tr>
    </table>
</form>