<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs" version="1.0">
	<xsl:template match="/">
		<html>
			<body>
			<form method="POST" action="">
			<div align="center">
				<h2>Formulaire d’ajout d’un produit :</h2>
				
						<label>Id:	</label>
								<input type="text" id="id" name="id" />
						<br/><br/>
						<label>Name:	</label>
								<input type="text" id="name" name="name" />
						<br/><br/>
						<label>Categorie:	</label>
								<input type="text" id="categorie" name="categorie" />
						<br/><br/>
						<label>Prix:	</label>
								<input type="text" id="prix" name="price" />
						<br/><br/>
						<label>Description:	</label>
								<input type="text" id="description" name="description" />
						<br/><br/>
						<label for="image">Image :</label>
                        <input type="text" id='image' name='image'  />
                        <br /><br />
				<br />
				<input type="submit" name="submit" value="Submit"/>
				<input type="reset" name="reset" value="Reset" />
			</div>
			</form>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>