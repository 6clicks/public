const input = `
## Design, communication visuelle et multimédia

| graphisme
| design graphique
| communication visuelle
| direction artistique
| identité visuelle
| charte graphique
| infographie
| motion design
| UI design
| UX design
| webdesign
| maquettage
| PAO
| Adobe Photoshop
| Adobe Illustrator
| Adobe InDesign
| création visuelle
| conception graphique
| design multimédia
| production multimédia
| animateur 2D/3D
| graphiste multimédia
| designer visuel
| studio graphique
| retouche d'images

## Développement et informatique

| développeur
| développeuse
| développeur logiciel
| software engineer
| ingénieur logiciel
| ingénieur informatique
| programmeur
| programmation
| développement web
| web developer
| full-stack
| backend
| front-end
| devops
| ingénieur système
| administrateur systèmes et réseaux
| architecte logiciel
| chef de projet informatique
| analyste développeur
| ingénieur data
| data engineer
| développeur mobile
| développement d'applications
| ingénieur cloud
| ingénieur cybersécurité

## Communication, marketing et gestion de produit

| communication institutionnelle
| communication interne
| relations presse
| relations publiques
| stratégie de communication
| plan de communication
| communication corporate
| communication digitale
| rédaction de contenus
| community management
| stratégie marketing
| marketing digital
| étude de marché
| campagnes marketing
| marketing opérationnel
| analyse de performance marketing
| acquisition client
| génération de leads
| funnel marketing
| marketing automation
| gestion de produit
| product management
| roadmap produit
| chef de produit
| stratégie produit
| spécifications fonctionnelles
| analyse utilisateur
| développement produit
| cycle de vie produit
| product owner

## Audiovisuel et production

| réalisateur
| réalisatrice
| régisseur général
| régisseur adjoint
| cadreur
| cadreuse
| chef opérateur
| directeur de la photographie
| opérateur prise de vue
| technicien audiovisuel
| technicien son
| preneur de son
| ingénieur du son
| mixage audio
| monteur vidéo
| monteuse vidéo
| étalonneur
| motion designer
| assistant de production
| chargé de production
| assistant réalisateur
| production audiovisuelle
| tournage
| post-production
| plateau TV
`;

const stopwords = ["de", "en"];

const groupesParId = {};

input.split("\n## ")
  .map(it => it.trim())
  .filter(it => it !== "")
  .forEach((group, i) => {

    const lignes = group
      .split("\n")
      .map(it => it.trim())
      .filter(it => it !== "");

    const titre = lignes[0];

    const expressionsCles = lignes
      .filter(it => it.startsWith("| "))
      .map(it => it.substring(2));

    const exclusions = lignes
      .filter(it => it.startsWith("- "))
      .map(it => it.substring(2));

    let motsCles = expressionsCles
      .flatMap(ex => ex.split(" "))
      .map(it => it.trim())
      .filter(mc => !stopwords.includes(mc))
      .join(" ");

    if (motsCles.length > 128) {
      const cutAt = motsCles.substring(0, 128).lastIndexOf(" ");
      motsCles = motsCles.substring(0, cutAt);
    }

    let motsExclus = exclusions
      .flatMap(ex => ex.split(" "))
      .map(it => it.trim())
      .filter(mc => !stopwords.includes(mc))
      .join(" ");

    if (motsExclus.length > 128) {
      const cutAt = motsExclus.substring(0, 128).lastIndexOf(" ");
      motsExclus = motsExclus.substring(0, cutAt);
    }

    groupesParId[i + 1] = {
      id: i + 1,
      titre,
      expressionsCles,
      exclusions,
      motsCles,
      motsExclus
    };
  });

return { groupesParId, groupes: Object.values(groupesParId) };
