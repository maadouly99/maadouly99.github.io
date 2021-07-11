<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs" version="1.0">
    
	<xsl:template match="/">
		<html>
			<body>
			<form method="POST" action="">
				<h2>Formulaire d’edition d’un produit :</h2>
				<xsl:for-each select="products/product[@id='2']">
					
						Id :
                        <input type="text" name="id">
                            <xsl:attribute name="value">
                                <xsl:value-of select="@id"/>
                            </xsl:attribute>
                        </input>
						<br /><br />
						
						Name :
                        <input type="text" name="name">
                            <xsl:attribute name="value">
                                <xsl:value-of select="name"/>
                            </xsl:attribute>
                        </input>
						<br /><br />
						
						Categorie :
                        <input type="text" name="categorie">
                            <xsl:attribute name="value">
                                <xsl:value-of select="categorie"/>
                            </xsl:attribute>
                        </input>
						<br /><br />
						
						Prix:
                        <input type="text" name="prix">
                            <xsl:attribute name="value">
                                <xsl:value-of select="prix"/>
                            </xsl:attribute>
                        </input>
						<br /><br />
						
						Description :
                        <input type="text" name="description">
                            <xsl:attribute name="value">
                                <xsl:value-of select="description"/>
                            </xsl:attribute>
                        </input>
						<br /><br />
						
						Image :
                            <input type="text" id='image' name='image'  >
                                <xsl:attribute name="value">
                                    <xsl:value-of select="image"/>
                                </xsl:attribute>
                            </input>
				</xsl:for-each>
				
				<br />
				<input type="submit"  name="submit" value="Submit"/>
				<input type="reset"   name="submit" value="Reset" />
				
			</form>
			</body>
		</html>
	</xsl:template>
	
</xsl:stylesheet>