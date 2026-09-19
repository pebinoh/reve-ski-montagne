-- CreateTable
CREATE TABLE "SiteContent" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "heroLabel" TEXT NOT NULL DEFAULT 'Sainte-Foy-Tarentaise · Savoie',
    "heroTitle" TEXT NOT NULL DEFAULT 'Du rêve à la réalité, la montagne autrement.',
    "heroImageDesktop" TEXT NOT NULL DEFAULT '/images/hero_ski.jpg',
    "heroImageMobile" TEXT NOT NULL DEFAULT '/images/hero_mobile.jpg',
    "philosophyLabel" TEXT NOT NULL DEFAULT 'L''esprit de la montagne',
    "philosophyTitle" TEXT NOT NULL DEFAULT 'Vivre la montagne autrement, loin des foules.',
    "philosophyText" TEXT NOT NULL DEFAULT 'Basée à Sainte-Foy-Tarentaise, je vous guide à travers les itinéraires secrets de la vallée. Que vous cherchiez la poudreuse vierge ou une belle randonnée contemplative, mon objectif est de construire avec vous une aventure sur mesure, en toute sécurité.',
    "presentationTitle" TEXT NOT NULL DEFAULT 'Évelyne, votre guide passionnée',
    "presentationText" TEXT NOT NULL DEFAULT 'Amoureuse de la montagne et de ski, j''ai fait de ma passion mon métier. Installée au cœur de la Tarentaise, je connais chaque recoin de Sainte-Foy et navigue sur la Rosière, Tignes et Val d''Isère.

Mon approche : sécurité, plaisir et partage.

Que vous soyez débutant en hors-piste ou expert en quête de pentes raides, je m''adapte à votre niveau et vos envies pour transformer votre journée de ski en un souvenir inoubliable.',
    "presentationImage" TEXT NOT NULL DEFAULT '/images/portrait_evelyne.jpg',
    "presentationBadges" TEXT NOT NULL DEFAULT 'Diplômée d''État, Guide locale',
    "activity1Title" TEXT NOT NULL DEFAULT 'Freeride & Hors-Piste',
    "activity1Text" TEXT NOT NULL DEFAULT 'Découvrez les faces cachées de Sainte-Foy. La trace parfaite vous attend dans la poudreuse.',
    "activity1Image" TEXT NOT NULL DEFAULT '/images/ski_rando_1.jpg',
    "activity2Title" TEXT NOT NULL DEFAULT 'Ski de Randonnée',
    "activity2Text" TEXT NOT NULL DEFAULT 'Échappez aux remontées mécaniques. Le calme, l''effort et des paysages à couper le souffle.',
    "activity2Image" TEXT NOT NULL DEFAULT '/images/ski_action_1.jpg',
    "activity3Title" TEXT NOT NULL DEFAULT 'Séjour en Itinérance',
    "activity3Text" TEXT NOT NULL DEFAULT 'L''aventure sur plusieurs jours, de refuge en refuge. Une immersion totale pour déconnecter.',
    "activity3Image" TEXT NOT NULL DEFAULT '/images/itinerance.jpg',
    "separatorQuote" TEXT NOT NULL DEFAULT 'La montagne ne se consomme pas, elle se vit.',
    "separatorImageDesktop" TEXT NOT NULL DEFAULT '/images/landscape_ski.jpg',
    "separatorImageMobile" TEXT NOT NULL DEFAULT '/images/landscape_mobile.jpg',
    "instagramReel1" TEXT NOT NULL DEFAULT 'https://www.instagram.com/reel/DGQzWRoIfAc/',
    "instagramReel2" TEXT NOT NULL DEFAULT 'https://www.instagram.com/reel/DFqXGWyofLS/',
    "instagramReel3" TEXT NOT NULL DEFAULT 'https://www.instagram.com/reel/C5h_QNOooq3/',
    "instagramProfileUrl" TEXT NOT NULL DEFAULT 'https://www.instagram.com/reve_ski_montagne/',
    "instagramHandle" TEXT NOT NULL DEFAULT '@reve_ski_montagne',
    "contactText" TEXT NOT NULL DEFAULT 'Faites votre demande de réservation ou contactez-moi directement pour discuter de votre projet.',
    "contactEmail" TEXT NOT NULL DEFAULT 'contact@reve-ski.com',
    "contactPhone" TEXT NOT NULL DEFAULT '+33 6 XX XX XX XX',
    "contactAddress" TEXT NOT NULL DEFAULT 'Sainte-Foy-Tarentaise, 73640',
    "footerText" TEXT NOT NULL DEFAULT 'Avec Évelyne, vivez la montagne autrement. Sécurité, pédagogie et bonne humeur sur les sommets de Sainte-Foy.',

    CONSTRAINT "SiteContent_pkey" PRIMARY KEY ("id")
);
