/*
HOMME / FEMME / ENFANT-ADO / COUPLE

Budget :
< à 30€
< à 50€
< à 100€
100 à 200€
200€ et plus
Tout budget

Univers - iso à l'an dernier avec objets co en + :

- Cuisine - boissons
- Univers de la TV
- Univers du Son
- Sport - Santé
- Beauté - Bien-être
- Informatique - smartphone
- Maison
- Objets connectés
- Console - gaming
- Loisirs - photo
- Cartes & coffrets cadeaux
- Incontournables
- Peu importe

Pour l'affichage des produits, on restera bien sur la même page.
Afficher 8 produits + le service en 1 fois.
Au même niveau que le bouton Voir plus de produits, penser à mettre un bouton "Refaire une recherche" et/ou image.png pour revenir en haut de page
Prévoir 2 blocs services : - Livraison lendemain + retrait 1h en magasin.
*/
var link = $j('.giftengine .link');

function isLinkClickable(link){

	// Si on est dans la box "Ajouter une catégorie"
	var authorize = link.parents('.box').hasClass('box--category'),

	// Si on est dans la box "Ajouter une catégorie" et qu'il y a déjà au maximum 2 paramètres de sélectionnés
	categoryCount =  authorize && $j('.box--category .selected').length <= 2,

	// Si on est dans une autre box que "Ajouter une catégorie"
	notInCategory = !authorize;

	if( categoryCount || notInCategory){
		return true;
	}
}

$j(function(){

	// On déplace le moteur à cadeaux dans le body pour le Zindex
	$j('#engine').detach().appendTo('body');

	link.hover(
		function(){

			// Si on peut survoler le lien
			if(isLinkClickable($j(this))){
				$j(this).addClass('hover');
			}

		},
		function(){

			// Sinon on enlève le lien
			$j(this).removeClass('hover');

		}
	).toggle(function(){

		// Si le lien est cliquable
		if(isLinkClickable($j(this))){
			$j(this).removeClass('hover');
			$j(this).addClass('selected');
		}else{
			$j('.box__title small').removeAttr('class')
			setTimeout(function(){
				$j('.box__title small').addClass('alert');
			},10);
		}

	},
	function(){

		// Si on clique sur un lien déjà cliqué
		$j(this).removeClass('selected');

	}).click(function(){

		// Si les 3 box ont un seul paramètre de sélectionné
		if(($j('.box--type .selected').length >=1) && ($j('.box--category .selected').length >=1) && ($j('.box--pricerange .selected').length >=1)){

			// Alors on affiche le bouton "Voir mes produits"
			$j('.giftengine__bottom__submit').removeAttr('disabled');

		}else{

			// Sinon on cache le bouton le bouton "Voir mes produits"
			$j('.giftengine__bottom__submit').attr('disabled',true);

		}
	});

	// Si on clique sur "Revenir"
	$j('.giftengine__close').click(function(){
		location.hash = '';
	});

});