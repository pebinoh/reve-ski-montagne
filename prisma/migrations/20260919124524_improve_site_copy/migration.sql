-- Met à jour le texte par défaut du site (contenu plus riche, mots-clés
-- SEO locaux). Chaque UPDATE est protégé par une clause WHERE comparant à
-- l'ancien texte : si Évelyne a déjà personnalisé un champ depuis
-- /admin/content, ce champ est laissé tel quel.

UPDATE "SiteContent"
SET "philosophyText" = 'Basée à Sainte-Foy-Tarentaise, au cœur de la Haute-Tarentaise, je vous emmène à la découverte d''itinéraires secrets, loin de la foule des pistes. Que vous rêviez de poudreuse vierge en hors-piste ou d''une randonnée à ski contemplative, mon objectif reste le même : construire avec vous une aventure sur mesure, dans le respect de la montagne et en toute sécurité.'
WHERE id = 'singleton'
  AND "philosophyText" = 'Basée à Sainte-Foy-Tarentaise, je vous guide à travers les itinéraires secrets de la vallée. Que vous cherchiez la poudreuse vierge ou une belle randonnée contemplative, mon objectif est de construire avec vous une aventure sur mesure, en toute sécurité.';

UPDATE "SiteContent"
SET "presentationText" = 'Amoureuse de la montagne depuis toujours, j''ai fait de ma passion pour le ski mon métier. Diplômée d''État et installée au cœur de la Haute-Tarentaise, je connais chaque recoin de Sainte-Foy et j''évolue aussi sur les domaines voisins de La Rosière, Tignes et Val d''Isère.

Mon approche : sécurité, plaisir et partage — à chaque sortie.

Débutant curieux de hors-piste ou skieur expérimenté en quête de pentes raides et de poudreuse, je m''adapte à votre niveau et à vos envies pour transformer votre journée de ski en un souvenir inoubliable.'
WHERE id = 'singleton'
  AND "presentationText" = 'Amoureuse de la montagne et de ski, j''ai fait de ma passion mon métier. Installée au cœur de la Tarentaise, je connais chaque recoin de Sainte-Foy et navigue sur la Rosière, Tignes et Val d''Isère.

Mon approche : sécurité, plaisir et partage.

Que vous soyez débutant en hors-piste ou expert en quête de pentes raides, je m''adapte à votre niveau et vos envies pour transformer votre journée de ski en un souvenir inoubliable.';

UPDATE "SiteContent"
SET "activity1Text" = 'Découvrez les faces cachées de Sainte-Foy-Tarentaise. Entre poudreuse vierge et couloirs techniques, la trace parfaite vous attend, adaptée à votre niveau.'
WHERE id = 'singleton'
  AND "activity1Text" = 'Découvrez les faces cachées de Sainte-Foy. La trace parfaite vous attend dans la poudreuse.';

UPDATE "SiteContent"
SET "activity2Text" = 'Échappez aux remontées mécaniques et gagnez les sommets à la force du mollet. Le calme, l''effort partagé et des panoramas à couper le souffle sur la Haute-Tarentaise.'
WHERE id = 'singleton'
  AND "activity2Text" = 'Échappez aux remontées mécaniques. Le calme, l''effort et des paysages à couper le souffle.';

UPDATE "SiteContent"
SET "activity3Text" = 'L''aventure sur plusieurs jours, de refuge en refuge, à travers les grands espaces de Savoie. Une immersion totale dans la montagne, pour déconnecter vraiment.'
WHERE id = 'singleton'
  AND "activity3Text" = 'L''aventure sur plusieurs jours, de refuge en refuge. Une immersion totale pour déconnecter.';

UPDATE "SiteContent"
SET "contactText" = 'Envie d''une sortie sur mesure ? Faites votre demande de réservation en ligne, ou contactez-moi directement pour construire ensemble votre projet — cours particulier, journée freeride ou séjour en itinérance.'
WHERE id = 'singleton'
  AND "contactText" = 'Faites votre demande de réservation ou contactez-moi directement pour discuter de votre projet.';

UPDATE "SiteContent"
SET "footerText" = 'Avec Évelyne, guide de ski indépendante, vivez la montagne autrement. Sécurité, pédagogie et bonne humeur sur les sommets de Sainte-Foy-Tarentaise et de la Haute-Tarentaise.'
WHERE id = 'singleton'
  AND "footerText" = 'Avec Évelyne, vivez la montagne autrement. Sécurité, pédagogie et bonne humeur sur les sommets de Sainte-Foy.';
