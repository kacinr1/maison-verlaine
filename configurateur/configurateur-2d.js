(() => {
  // ====== Internationalisation (EN par défaut · DE · FR) ======
  const I18N = {
    en: {
      doc_title: "Maison Verlaine — Your bespoke suit",
      tagline_city: "Geneva · since 1987", link_3d: "3D preview", brand_tagline: "Bespoke tailoring",
      step_model: "Model", step_fabric: "Fabric", step_details: "Cut", step_lining: "Lining", step_buttons: "Buttons", step_measure: "Measurements",
      exit: "Exit", exit_aria: "Exit the configurator",
      aria_prev: "Previous step", aria_next: "Next step", aria_close: "Close",
      model_h2: "Your silhouette", model_p: "Single-breasted, double-breasted 4 or 6 buttons.",
      card_front_name: "Single-breasted", card_front_sub: "Single · 2 buttons",
      card_croise_name: "Double-breasted", card_croise4_sub: "Double · 4 buttons", card_croise6_sub: "Double · 6 buttons",
      comp_2_name: "Two-piece", comp_2_sub: "Without waistcoat", comp_3_name: "Three-piece", comp_3_sub: "With waistcoat",
      compnote_3: "Jacket, waistcoat and trousers matched. The cloth stays identical on all three pieces.",
      compnote_2: "Jacket and trousers matched. The shirt and tie stay visible; the waistcoat is removed.",
      fabric_h2: "Choice of cloth", label_composition: "Composition",
      fab_marine: "Navy blue", fab_anthracite: "Charcoal", fab_bordeaux: "Burgundy", fab_foret: "Forest green",
      "fab_marine-rayures": "Navy · pinstripe", "fab_anthracite-carreaux": "Charcoal · check", "fab_marine-carreau-fenetre": "Navy · windowpane", "fab_tweed-couture": "Tweed · red thread",
      qual_110: "Virgin wool 110’s · included", qual_130: "Virgin wool 130’s · + CHF 240", qual_cashmere: "Wool & cashmere · + CHF 480",
      qualn_110: "Virgin wool 110’s", qualn_130: "Virgin wool 130’s", qualn_cashmere: "Wool & cashmere",
      details_h2: "Cut details", coupe_back: "‹ Back",
      grp_revers: "Lapel", grp_poches: "Pockets", grp_dos: "Jacket back", grp_pli: "Trouser pleats", grp_bas: "Trouser hem", grp_taille: "Waist adjustment",
      opt_revers_notch: "Notch lapel", opt_revers_peak: "Peak lapel",
      opt_poche_flap: "Flap pocket", opt_poche_double: "Double besom", opt_poche_patch: "Patch", opt_poche_patchflap: "Patch + flap",
      opt_dos_center: "Centre vent", opt_dos_side: "Side vents",
      opt_pli_none: "Flat front", opt_pli_one: "Single pleat", opt_pli_double: "Double pleat",
      opt_bas_plain: "Plain hem", opt_bas_cuff: "Turn-up",
      opt_taille_standard: "Standard", opt_taille_side: "Side adjusters",
      lining_h2: "The inner touch", label_lining_color: "Lining colour",
      lin_bordeaux: "Burgundy", lin_marine: "Midnight blue", lin_foret: "Forest green", lin_champagne: "Champagne",
      monogram_label: "Embroidered initials", label_typo: "Typography", label_thread: "Thread colour",
      "thr_#d7b776": "Pale gold", "thr_#b86b78": "Powder rose", "thr_#e9ded0": "Ivory", "thr_#8091b2": "Blue grey", "thr_#607b68": "Sage green",
      brod_serif: "Classic", brod_script: "Handwritten", brod_italic: "Italic",
      buttons_h2: "Horn finishes",
      btn_corne: "Brown horn", "btn_gris-fonce": "Smoked grey", btn_marine: "Navy blue", btn_kaki: "Khaki", btn_ivoire: "Pearl ivory", btn_anthracite: "Charcoal",
      measure_h2: "Taking your measurements",
      measure_p: "Your reference points in centimetres will be taken at the appointment. Nothing is sent from this page.",
      measure_open: "See the summary",
      flow_hint: "<b>1 click</b> selects · <b>2 clicks</b> confirm & move on",
      view_front: "Front", view_back: "Back", back_unavailable: "Back view available on three-piece.",
      garmentline_3: "Jacket, waistcoat and trousers matched", garmentline_2: "Jacket and trousers · shirt and tie visible, no waistcoat",
      word_lining: "Lining", word_initials: "Initials", word_no_initials: "No initials", word_button: "Button",
      price_note: "Indicative price", btn_next: "Next", btn_see_summary: "See the summary",
      dialog_h2: "Your outfit takes shape.", dialog_intro: "A last look at all your choices. Finishes and price will be confirmed at the atelier.",
      rec_model: "Model", rec_construction: "Construction", rec_fabric: "Cloth", rec_lining: "Lining", rec_initials: "Initials", rec_buttons: "Buttons", rec_estimate: "Estimate",
      constr_3: "Three-piece", constr_2: "Two-piece", estimate_note: "indicative price",
      field_measures: "Measurement points · optional", meas_chest: "Chest", meas_waist: "Waist", meas_inseam: "Inseam",
      meas_note: "These values stay on this page and are not sent to any service.",
      dialog_back: "Back to my choices", dialog_save: "Save on this device",
      toast_saved: "Your selection is saved on this device. Nothing was sent.",
      toast_save_fail: "The browser did not allow local saving. Your summary stays shown here."
    },
    de: {
      doc_title: "Maison Verlaine — Ihr Maßanzug",
      tagline_city: "Genf · seit 1987", link_3d: "3D-Ansicht", brand_tagline: "Maßschneiderei",
      step_model: "Modell", step_fabric: "Stoff", step_details: "Schnitt", step_lining: "Futter", step_buttons: "Knöpfe", step_measure: "Maße",
      exit: "Verlassen", exit_aria: "Konfigurator verlassen",
      aria_prev: "Vorheriger Schritt", aria_next: "Nächster Schritt", aria_close: "Schließen",
      model_h2: "Ihre Silhouette", model_p: "Einreiher, Zweireiher 4 oder 6 Knöpfe.",
      card_front_name: "Einreiher", card_front_sub: "Einreihig · 2 Knöpfe",
      card_croise_name: "Zweireiher", card_croise4_sub: "Zweireihig · 4 Knöpfe", card_croise6_sub: "Zweireihig · 6 Knöpfe",
      comp_2_name: "Zweiteiler", comp_2_sub: "Ohne Weste", comp_3_name: "Dreiteiler", comp_3_sub: "Mit Weste",
      compnote_3: "Sakko, Weste und Hose abgestimmt. Der Stoff bleibt auf allen drei Teilen identisch.",
      compnote_2: "Sakko und Hose abgestimmt. Hemd und Krawatte bleiben sichtbar; die Weste entfällt.",
      fabric_h2: "Stoffauswahl", label_composition: "Zusammensetzung",
      fab_marine: "Marineblau", fab_anthracite: "Anthrazit", fab_bordeaux: "Bordeaux", fab_foret: "Waldgrün",
      "fab_marine-rayures": "Marine · Nadelstreifen", "fab_anthracite-carreaux": "Anthrazit · Karo", "fab_marine-carreau-fenetre": "Marine · Fensterkaro", "fab_tweed-couture": "Tweed · roter Faden",
      qual_110: "Schurwolle 110’s · inklusive", qual_130: "Schurwolle 130’s · + CHF 240", qual_cashmere: "Wolle & Kaschmir · + CHF 480",
      qualn_110: "Schurwolle 110’s", qualn_130: "Schurwolle 130’s", qualn_cashmere: "Wolle & Kaschmir",
      details_h2: "Schnitt-Details", coupe_back: "‹ Zurück",
      grp_revers: "Revers", grp_poches: "Taschen", grp_dos: "Jackenrücken", grp_pli: "Bundfalten", grp_bas: "Hosensaum", grp_taille: "Weitenregulierung",
      opt_revers_notch: "Fallendes Revers", opt_revers_peak: "Spitzes Revers",
      opt_poche_flap: "Pattentasche", opt_poche_double: "Doppelpaspel", opt_poche_patch: "Aufgesetzt", opt_poche_patchflap: "Aufgesetzt + Patte",
      opt_dos_center: "Mittelschlitz", opt_dos_side: "Seitenschlitze",
      opt_pli_none: "Ohne Falte", opt_pli_one: "Eine Falte", opt_pli_double: "Doppelfalte",
      opt_bas_plain: "Ohne Umschlag", opt_bas_cuff: "Mit Umschlag",
      opt_taille_standard: "Standard", opt_taille_side: "Seitenspanner",
      lining_h2: "Die innere Note", label_lining_color: "Futterfarbe",
      lin_bordeaux: "Bordeaux", lin_marine: "Mitternachtsblau", lin_foret: "Waldgrün", lin_champagne: "Champagner",
      monogram_label: "Gestickte Initialen", label_typo: "Typografie", label_thread: "Fadenfarbe",
      "thr_#d7b776": "Blassgold", "thr_#b86b78": "Puderrosa", "thr_#e9ded0": "Elfenbein", "thr_#8091b2": "Blaugrau", "thr_#607b68": "Salbeigrün",
      brod_serif: "Klassisch", brod_script: "Handschrift", brod_italic: "Kursiv",
      buttons_h2: "Horn-Finish",
      btn_corne: "Braunes Horn", "btn_gris-fonce": "Rauchgrau", btn_marine: "Marineblau", btn_kaki: "Khaki", btn_ivoire: "Perlmutt-Elfenbein", btn_anthracite: "Anthrazit",
      measure_h2: "Ihre Maßnahme",
      measure_p: "Ihre Maße in Zentimetern werden beim Termin aufgenommen. Von dieser Seite wird nichts übermittelt.",
      measure_open: "Zusammenfassung ansehen",
      flow_hint: "<b>1 Klick</b> wählt · <b>2 Klicks</b> bestätigen & weiter",
      view_front: "Vorne", view_back: "Hinten", back_unavailable: "Rückansicht beim Dreiteiler verfügbar.",
      garmentline_3: "Sakko, Weste und Hose abgestimmt", garmentline_2: "Sakko und Hose · Hemd und Krawatte sichtbar, ohne Weste",
      word_lining: "Futter", word_initials: "Initialen", word_no_initials: "Ohne Initialen", word_button: "Knopf",
      price_note: "Richtpreis", btn_next: "Weiter", btn_see_summary: "Zusammenfassung ansehen",
      dialog_h2: "Ihr Outfit nimmt Gestalt an.", dialog_intro: "Ein letzter Blick auf alle Ihre Entscheidungen. Verarbeitung und Preis werden im Atelier bestätigt.",
      rec_model: "Modell", rec_construction: "Konstruktion", rec_fabric: "Stoff", rec_lining: "Futter", rec_initials: "Initialen", rec_buttons: "Knöpfe", rec_estimate: "Schätzung",
      constr_3: "Dreiteiler", constr_2: "Zweiteiler", estimate_note: "Richtpreis",
      field_measures: "Maßpunkte · optional", meas_chest: "Brust", meas_waist: "Taille", meas_inseam: "Schrittlänge",
      meas_note: "Diese Werte bleiben auf dieser Seite und werden an keinen Dienst gesendet.",
      dialog_back: "Zurück zu meinen Angaben", dialog_save: "Auf diesem Gerät speichern",
      toast_saved: "Ihre Auswahl wurde auf diesem Gerät gespeichert. Es wurde nichts gesendet.",
      toast_save_fail: "Der Browser hat das lokale Speichern nicht erlaubt. Ihre Zusammenfassung bleibt hier sichtbar."
    },
    fr: {
      doc_title: "Maison Verlaine — Votre costume sur mesure",
      tagline_city: "Genève · depuis 1987", link_3d: "Aperçu 3D", brand_tagline: "Tailleur sur mesure",
      step_model: "Modèle", step_fabric: "Tissu", step_details: "Coupe", step_lining: "Doublure", step_buttons: "Boutons", step_measure: "Mesures",
      exit: "Quitter", exit_aria: "Quitter le configurateur",
      aria_prev: "Étape précédente", aria_next: "Étape suivante", aria_close: "Fermer",
      model_h2: "Votre silhouette", model_p: "Classique, croisé 4 ou croisé 6 boutons.",
      card_front_name: "Veste classique", card_front_sub: "Simple · 2 boutons",
      card_croise_name: "Croisé", card_croise4_sub: "Double · 4 boutons", card_croise6_sub: "Double · 6 boutons",
      comp_2_name: "Deux-pièces", comp_2_sub: "Sans gilet", comp_3_name: "Trois-pièces", comp_3_sub: "Avec gilet",
      compnote_3: "Veste, gilet et pantalon assortis. Le tissu reste identique sur les trois pièces.",
      compnote_2: "Veste et pantalon assortis. La chemise et la cravate restent visibles ; le gilet est retiré.",
      fabric_h2: "Choix du tissu", label_composition: "Composition",
      fab_marine: "Bleu marine", fab_anthracite: "Anthracite", fab_bordeaux: "Bordeaux", fab_foret: "Vert forêt",
      "fab_marine-rayures": "Marine · rayures", "fab_anthracite-carreaux": "Anthracite · carreaux", "fab_marine-carreau-fenetre": "Marine · fenêtre", "fab_tweed-couture": "Tweed · fil rouge",
      qual_110: "Laine vierge 110’s · incluse", qual_130: "Laine vierge 130’s · + CHF 240", qual_cashmere: "Laine & cachemire · + CHF 480",
      qualn_110: "Laine vierge 110’s", qualn_130: "Laine vierge 130’s", qualn_cashmere: "Laine & cachemire",
      details_h2: "Les détails de coupe", coupe_back: "‹ Précédent",
      grp_revers: "Revers", grp_poches: "Poches", grp_dos: "Dos de veste", grp_pli: "Plis du pantalon", grp_bas: "Bas du pantalon", grp_taille: "Ajustement taille",
      opt_revers_notch: "Cran classique", opt_revers_peak: "Pointe",
      opt_poche_flap: "Passepoil rabat", opt_poche_double: "Double passepoil", opt_poche_patch: "Plaquée", opt_poche_patchflap: "Plaquée rabat",
      opt_dos_center: "Fente centrale", opt_dos_side: "Latérales",
      opt_pli_none: "Sans pli", opt_pli_one: "Un pli", opt_pli_double: "Double pli",
      opt_bas_plain: "Sans revers", opt_bas_cuff: "Avec revers",
      opt_taille_standard: "Standard", opt_taille_side: "Pattes latérales",
      lining_h2: "La touche intérieure", label_lining_color: "Couleur de doublure",
      lin_bordeaux: "Bordeaux", lin_marine: "Bleu nuit", lin_foret: "Vert forêt", lin_champagne: "Champagne",
      monogram_label: "Initiales brodées", label_typo: "Typographie", label_thread: "Couleur du fil",
      "thr_#d7b776": "Or pâle", "thr_#b86b78": "Rose poudré", "thr_#e9ded0": "Ivoire", "thr_#8091b2": "Bleu gris", "thr_#607b68": "Vert sauge",
      brod_serif: "Classique", brod_script: "Manuscrite", brod_italic: "Italique",
      buttons_h2: "Finitions de corne",
      btn_corne: "Corne brune", "btn_gris-fonce": "Gris fumé", btn_marine: "Bleu marine", btn_kaki: "Kaki", btn_ivoire: "Ivoire nacré", btn_anthracite: "Anthracite",
      measure_h2: "Votre prise de mesures",
      measure_p: "Vos repères en centimètres seront relevés au rendez-vous. Rien n’est transmis depuis cette page.",
      measure_open: "Voir le récapitulatif",
      flow_hint: "<b>1 clic</b> sélectionne · <b>2 clics</b> valident & passent à la suite",
      view_front: "Face", view_back: "Dos", back_unavailable: "Vue de dos disponible en trois-pièces.",
      garmentline_3: "Veste, gilet et pantalon assortis", garmentline_2: "Veste et pantalon · chemise et cravate visibles, sans gilet",
      word_lining: "Doublure", word_initials: "Initiales", word_no_initials: "Sans initiales", word_button: "Bouton",
      price_note: "Tarif indicatif", btn_next: "Suivant", btn_see_summary: "Voir le récapitulatif",
      dialog_h2: "Votre tenue prend forme.", dialog_intro: "Un dernier regard sur l’ensemble de vos choix. Les finitions et le prix seront confirmés à l’atelier.",
      rec_model: "Modèle", rec_construction: "Construction", rec_fabric: "Tissu", rec_lining: "Doublure", rec_initials: "Initiales", rec_buttons: "Boutons", rec_estimate: "Estimation",
      constr_3: "Trois-pièces", constr_2: "Deux-pièces", estimate_note: "tarif indicatif",
      field_measures: "Repères de mesures · facultatif", meas_chest: "Poitrine", meas_waist: "Taille", meas_inseam: "Entrejambe",
      meas_note: "Ces valeurs restent dans cette page et ne sont pas envoyées à un service.",
      dialog_back: "Reprendre mes choix", dialog_save: "Enregistrer sur cet appareil",
      toast_saved: "Votre sélection est enregistrée sur cet appareil. Aucun envoi n’a été effectué.",
      toast_save_fail: "Le navigateur n’a pas permis l’enregistrement local. Votre récapitulatif reste affiché ici."
    }
  };
  let currentLang = "en";
  const t = (key) => (I18N[currentLang] && I18N[currentLang][key]) ?? I18N.en[key] ?? key;

  const models = {
    front: { nameKey: "modeln_front", variant: "front" },
    "croise-4": { nameKey: "modeln_croise4", variant: "croise-4" },
    "croise-6": { nameKey: "modeln_croise6", variant: "croise-6" }
  };
  // Noms complets localisés (légende + récap), composés à la volée.
  I18N.en.modeln_front = "Single-breasted · 2 buttons"; I18N.en.modeln_croise4 = "Double-breasted · 4 buttons"; I18N.en.modeln_croise6 = "Double-breasted · 6 buttons";
  I18N.de.modeln_front = "Einreiher · 2 Knöpfe"; I18N.de.modeln_croise4 = "Zweireiher · 4 Knöpfe"; I18N.de.modeln_croise6 = "Zweireiher · 6 Knöpfe";
  I18N.fr.modeln_front = "Veste classique · 2 boutons"; I18N.fr.modeln_croise4 = "Veste croisée · 4 boutons"; I18N.fr.modeln_croise6 = "Veste croisée · 6 boutons";
  const fabrics = {
    marine: { nameKey: "fab_marine" }, anthracite: { nameKey: "fab_anthracite" }, bordeaux: { nameKey: "fab_bordeaux" }, foret: { nameKey: "fab_foret" },
    "marine-rayures": { nameKey: "fab_marine-rayures" }, "anthracite-carreaux": { nameKey: "fab_anthracite-carreaux" }, "marine-carreau-fenetre": { nameKey: "fab_marine-carreau-fenetre" }, "tweed-couture": { nameKey: "fab_tweed-couture" }
  };
  const linings = {
    bordeaux: { nameKey: "lin_bordeaux", filter: "none" },
    marine: { nameKey: "lin_marine", filter: "hue-rotate(214deg) saturate(.74)" },
    foret: { nameKey: "lin_foret", filter: "hue-rotate(116deg) saturate(.8)" },
    champagne: { nameKey: "lin_champagne", filter: "hue-rotate(-28deg) saturate(.42) brightness(1.22)" }
  };
  const buttons = {
    corne: { nameKey: "btn_corne", price: 0 },
    "gris-fonce": { nameKey: "btn_gris-fonce", price: 7 },
    marine: { nameKey: "btn_marine", price: 7 },
    kaki: { nameKey: "btn_kaki", price: 7 },
    ivoire: { nameKey: "btn_ivoire", price: 7 },
    anthracite: { nameKey: "btn_anthracite", price: 7 }
  };
  const buttonPositions = {
    front: {
      "3": [[447.5,328.5],[449.5,379.5],[448.5,440.5],[402.5,491.5],[449.5,496.5],[448.5,552.5],[392.5,583.5]],
      "2": [[398.5,486.5],[392.5,583.5]]
    },
    "croise-4": {
      "3": [[445,393],[445,430],[445,467],[445,504],[445,541],[379.5,478.5],[508.5,478.5]],
      "2": [[394.5,477.5],[493.5,477.5],[399.5,555.5],[493.5,556.5]]
    },
    "croise-6": {
      "3": [[445.5,319.5],[336.5,351.5],[551.5,354.5],[446.5,381.5],[445.5,446.5],[338.5,453.5],[550.5,455.5],[446.5,511.5],[551.5,548.5],[336.5,549.5],[446.5,577.5]],
      "2": [[348.5,348.5],[542.5,349.5],[354.5,450.5],[533.5,450.5],[358.5,547.5],[529.5,548.5]]
    }
  };
  const qualityPrices = { "110": 0, "130": 240, cashmere: 480 };
  const qualityNameKeys = { "110": "qualn_110", "130": "qualn_130", cashmere: "qualn_cashmere" };
  const state = {
    model: "front",
    composition: "3",
    fabric: "marine",
    quality: "110",
    lining: "bordeaux",
    monogram: "MV",
    embroideryFont: "serif",
    embroideryColor: "#d7b776",
    button: "corne",
    lastVisualDetail: "pli",
    view: "front",
    details: {
      revers: "Cran classique",
      poches: "Passepoilées avec rabat",
      dos: "Fentes latérales",
      pli: "Double pli",
      bas: "Revers au bas",
      taille: "Standard"
    }
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const garmentImage = $("#garmentImage");
  const garmentWrap = $("#garmentWrap");
  const dialog = $("#summaryDialog");
  let transitionTimer = 0;
  let toastTimer = 0;

  // Tissus disposant de variantes de dos et de détail sur la veste classique (droite).
  const VARIANT_FABRICS = ["marine", "anthracite", "bordeaux", "foret", "marine-rayures", "anthracite-carreaux", "marine-carreau-fenetre", "tweed-couture"];
  // Variantes de détail de la veste droite, par composition puis par groupe puis par valeur (clé interne FR, stable).
  const DETAIL_VARIANTS = {
    "3": {
      pli: { "Double pli": "double-pli", "Un pli": "un-pli" },
      bas: { "Revers au bas": "revers-bas" },
      taille: { "Pattes latérales": "pattes-laterales" },
      poches: { "Plaquée avec rabat": "poche-plaquee-rabat", "Poche plaquée": "poche-plaquee", "Double passepoil": "poche-double-passepoil" },
      revers: { "Revers en pointe": "revers-pointe" }
    },
    "2": {
      taille: { "Pattes latérales": "pattes-laterales" },
      poches: { "Double passepoil": "poche-double-passepoil" },
      revers: { "Revers en pointe": "revers-pointe" }
    }
  };
  // Clé interne (data-value, FR) -> clé i18n d'affichage (étiquette + récap).
  const DETAIL_VALUE_KEY = {
    "Cran classique": "opt_revers_notch", "Revers en pointe": "opt_revers_peak",
    "Passepoilées avec rabat": "opt_poche_flap", "Double passepoil": "opt_poche_double", "Poche plaquée": "opt_poche_patch", "Plaquée avec rabat": "opt_poche_patchflap",
    "Fente centrale": "opt_dos_center", "Fentes latérales": "opt_dos_side",
    "Sans pli": "opt_pli_none", "Un pli": "opt_pli_one", "Double pli": "opt_pli_double",
    "Sans revers": "opt_bas_plain", "Revers au bas": "opt_bas_cuff",
    "Standard": "opt_taille_standard", "Pattes latérales": "opt_taille_side"
  };
  const DETAIL_GROUP_KEY = { revers: "grp_revers", poches: "grp_poches", dos: "grp_dos", pli: "grp_pli", bas: "grp_bas", taille: "grp_taille" };
  const BROD_KEY = { serif: "brod_serif", script: "brod_script", italic: "brod_italic" };
  const detailLabel = (value) => t(DETAIL_VALUE_KEY[value] || value);
  const fabricName = () => t(fabrics[state.fabric].nameKey);
  const liningName = () => t(linings[state.lining].nameKey);
  const buttonName = () => t(buttons[state.button].nameKey);
  const modelName = () => t(models[state.model].nameKey);
  const qualityName = () => t(qualityNameKeys[state.quality]);
  const constrName = () => t(state.composition === "3" ? "constr_3" : "constr_2");

  function garmentPath(model = state.model, composition = state.composition, fabric = state.fabric) {
    const piecePrefix = composition === "3" ? "three-piece" : "two-piece";
    const variant = models[model].variant;
    if (state.view === "back" && composition === "3" && VARIANT_FABRICS.includes(fabric)) {
      const back = state.details.dos === "Fente centrale" ? "fente-centrale" : "fentes-laterales";
      return `assets/layers/three-piece-back-${fabric}-${back}.webp`;
    }
    if (VARIANT_FABRICS.includes(fabric)) {
      const group = DETAIL_VARIANTS[composition]?.[state.lastVisualDetail];
      const suffix = group?.[state.details[state.lastVisualDetail]];
      const skip = variant !== "front" && state.lastVisualDetail === "revers";
      if (suffix && !skip) return `assets/layers/${piecePrefix}-${variant}-${fabric}-${suffix}.webp`;
    }
    return `assets/layers/${piecePrefix}-${variant}-${fabric}.webp`;
  }

  function price() {
    let amount = state.composition === "3" ? 1790 : 1590;
    amount += qualityPrices[state.quality] || 0;
    if (state.lining !== "bordeaux") amount += 60;
    if (state.monogram) amount += 100;
    amount += buttons[state.button].price;
    if (state.details.taille === "Pattes latérales") amount += 15;
    return amount;
  }

  function groupedAmount(amount) {
    return new Intl.NumberFormat("fr-CH", { maximumFractionDigits: 0 }).format(amount).replace(/[  ]/g, "’");
  }

  function setSelected(button, selected) {
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  }

  function hasBackView() {
    return state.composition === "3" && VARIANT_FABRICS.includes(state.fabric);
  }

  function updateViewToggle() {
    const backButton = $('[data-view="back"]');
    if (!backButton) return;
    const available = hasBackView();
    backButton.disabled = !available;
    backButton.title = available ? "" : t("back_unavailable");
    if (!available && state.view === "back") {
      state.view = "front";
      $$('[data-view]').forEach((item) => setSelected(item, item.dataset.view === "front"));
    }
  }

  function updateGarment() {
    updateViewToggle();
    const path = garmentPath();
    const alt = `${constrName()} · ${fabricName()} · ${modelName()}`;
    updateButtonOverlay();
    garmentWrap.dataset.model = state.model;
    garmentWrap.dataset.composition = state.composition;
    garmentWrap.dataset.fabric = state.fabric;
    Object.entries(state.details).forEach(([key, value]) => { garmentWrap.dataset[key] = value; });
    garmentWrap.classList.add("is-changing");
    window.clearTimeout(transitionTimer);
    transitionTimer = window.setTimeout(() => {
      garmentImage.src = path;
      garmentImage.alt = alt;
      $$(".model-card").forEach((card) => {
        card.querySelector("img").src = garmentPath(card.dataset.model, state.composition, state.fabric);
      });
      $("#stageModelName").textContent = modelName();
      $("#stageGarmentLine").textContent = t(state.composition === "3" ? "garmentline_3" : "garmentline_2");
      $("#compositionNote").textContent = t(state.composition === "3" ? "compnote_3" : "compnote_2");
      window.setTimeout(() => garmentWrap.classList.remove("is-changing"), 90);
    }, 95);
  }

  function updatePriceAndSummary() {
    const amount = price();
    $("#priceValue").textContent = `CHF ${groupedAmount(amount)}.–`;
    const initialText = state.monogram ? `${t("word_initials")} ${state.monogram}` : t("word_no_initials");
    $("#summaryLine").innerHTML = `${constrName()} <i>•</i> ${qualityName()} · ${fabricName()} <i>•</i> ${t("word_lining")} ${liningName()} <i>•</i> ${initialText} <i>•</i> ${t("word_button")} ${buttonName()}`;
  }

  function updateMonogram() {
    state.monogram = $("#monogramInput").value.toUpperCase().replace(/[^A-ZÀ-ÖØ-Ý]/g, "").slice(0, 3);
    $("#monogramInput").value = state.monogram;
    updatePriceAndSummary();
  }

  function updateButtonDetail() {
    $("#selectedButtonLabel").textContent = buttonName();
    updateButtonOverlay();
    updatePriceAndSummary();
  }

  // Aperçu contextuel : un seul encart qui apparaît près du costume au toucher d'un réglage, puis s'efface.
  let previewTimer = 0;
  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function renderPreview({ src, alt = "", filter = "none", label = "", mono = null, hold = 0 }) {
    const preview = $("#stagePreview");
    if (!preview) return;
    const img = $("#previewImage");
    const monoEl = $("#previewMono");
    img.src = src;
    img.alt = alt;
    img.style.filter = filter;
    if (mono && mono.text) {
      monoEl.hidden = false;
      monoEl.textContent = mono.text;
      monoEl.dataset.font = mono.font;
      monoEl.style.color = mono.color;
    } else {
      monoEl.hidden = true;
    }
    $("#previewLabel").textContent = label;
    preview.hidden = false;
    preview.classList.remove("is-leaving");
    void preview.offsetWidth;
    preview.classList.add("is-entering");
    window.clearTimeout(previewTimer);
    previewTimer = window.setTimeout(hidePreview, hold || (reduceMotion() ? 2600 : 3400));
  }

  function hidePreview() {
    const preview = $("#stagePreview");
    if (!preview || preview.hidden) return;
    preview.classList.remove("is-entering");
    preview.classList.add("is-leaving");
    window.setTimeout(() => { preview.hidden = true; preview.classList.remove("is-leaving"); }, reduceMotion() ? 0 : 300);
  }

  const previewFor = {
    fabric: () => ({ src: `assets/materials/tissu-${state.fabric}.webp`, alt: `${t("step_fabric")} ${fabricName()}`, label: `${t("step_fabric")} · ${fabricName()}` }),
    lining: () => ({ src: "assets/materials/doublure-poche-vierge-detail.webp", filter: linings[state.lining].filter, alt: `${t("word_lining")} ${liningName()}`, label: `${t("word_lining")} · ${liningName()}`, mono: state.monogram ? { text: state.monogram, font: state.embroideryFont, color: state.embroideryColor } : null }),
    button: () => ({ src: `assets/materials/bouton-${state.button}.webp`, alt: `${t("word_button")} ${buttonName()}`, label: `${t("step_buttons")} · ${buttonName()}` })
  };

  function showPreview(type) {
    if (previewFor[type]) renderPreview(previewFor[type]());
  }

  function showDetailPreview(button) {
    if (!button) return;
    const photo = button.querySelector(".option-art");
    if (!photo) return;
    const group = button.closest(".choice-group");
    const title = group?.querySelector(".choice-heading > span")?.textContent.trim() || "";
    const choice = button.querySelector("span:last-child")?.textContent.trim() || button.dataset.value;
    // Coupe/pantalon : la miniature ne fait qu'un bref flash puis s'efface — on garde l'œil sur le costume.
    renderPreview({ src: photo.src, alt: photo.alt || `${title} : ${choice}`, label: `${title} · ${choice}`, hold: reduceMotion() ? 350 : 900 });
  }

  function updateButtonOverlay() {
    const root = $("#buttonOverlays");
    if (!root) return;
    if (state.view === "back") { root.replaceChildren(); return; }
    if (state.fabric === "tweed-couture") { root.replaceChildren(); return; }
    const positions = buttonPositions[state.model][state.composition];
    const sprite = `assets/materials/bouton-sprite-${state.button}.webp`;
    root.replaceChildren(...positions.map(([x, y]) => {
      const image = document.createElement("img");
      image.src = sprite;
      image.alt = "";
      image.draggable = false;
      image.style.left = `${x / 887 * 100}%`;
      image.style.top = `${y / 1774 * 100}%`;
      return image;
    }));
  }

  function announce(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3500);
  }

  // Parcours guidé : les choix défilent en étapes au-dessus du costume.
  const STEPS = ["model", "fabric", "details", "lining", "buttons", "measure"];
  let currentStep = 0;

  // Étape Coupe : un seul groupe affiché à la fois ; le choix fait, on sert le suivant.
  const DETAIL_ORDER = ["revers", "poches", "dos", "pli", "bas", "taille"];
  let detailStep = 0;
  function showDetailGroup(index) {
    detailStep = Math.max(0, Math.min(DETAIL_ORDER.length - 1, index));
    const current = detailStep + 1;
    $$(".detail-strip .choice-group").forEach((group) => {
      group.classList.toggle("is-current", Number(group.dataset.order) === current);
    });
    const progress = $("#coupeProgress");
    if (progress) progress.textContent = `${t(DETAIL_GROUP_KEY[DETAIL_ORDER[detailStep]])} · ${current} / ${DETAIL_ORDER.length}`;
    const back = $("#coupeBack");
    if (back) back.hidden = detailStep === 0;
  }
  function nextDetailGroup() {
    if (detailStep < DETAIL_ORDER.length - 1) showDetailGroup(detailStep + 1);
    else advanceStep(); // dernier détail validé : on passe à la doublure
  }

  function updateContinueLabel() {
    const last = currentStep === STEPS.length - 1;
    $("#continueButton").innerHTML = `${last ? t("btn_see_summary") : t("btn_next")} <span aria-hidden="true">→</span>`;
  }

  function goToStep(index) {
    currentStep = Math.max(0, Math.min(STEPS.length - 1, index));
    const key = STEPS[currentStep];
    $$(".step-chip").forEach((chip) => {
      const active = chip.dataset.step === key;
      chip.classList.toggle("is-active", active);
      if (active) chip.setAttribute("aria-current", "step");
      else chip.removeAttribute("aria-current");
    });
    $$(".step-view").forEach((view) => {
      const active = view.dataset.step === key;
      view.hidden = !active;
      if (active) {
        view.classList.remove("is-active");
        void view.offsetWidth;
        view.classList.add("is-active");
      }
    });
    $("#stepPrev").disabled = currentStep === 0;
    $("#stepNext").disabled = currentStep === STEPS.length - 1;
    updateContinueLabel();
    if (key === "details") showDetailGroup(0);
    const activeChip = $(`.step-chip[data-step="${key}"]`);
    activeChip?.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "nearest", inline: "nearest" });
  }

  // Validation explicite : 1 clic sélectionne, un double-clic valide et passe à l'étape suivante.
  function advanceStep() {
    if (currentStep < STEPS.length - 1) goToStep(currentStep + 1);
    else { renderDialog(); dialog.showModal(); }
  }

  function renderDialog() {
    const broderie = t(BROD_KEY[state.embroideryFont] || "brod_serif");
    const threadName = t("thr_" + state.embroideryColor);
    const items = [
      ["rec_model", modelName()],
      ["rec_construction", constrName()],
      ["rec_fabric", `${qualityName()} · ${fabricName()}`],
      ...DETAIL_ORDER.map((key) => [DETAIL_GROUP_KEY[key], detailLabel(state.details[key])]),
      ["rec_lining", liningName()],
      ["rec_initials", state.monogram ? `${state.monogram} · ${broderie} · ${threadName}` : t("word_no_initials")],
      ["rec_buttons", buttonName()],
      ["rec_estimate", `${groupedAmount(price())} CHF · ${t("estimate_note")}`]
    ];
    const recap = $("#dialogRecap");
    recap.replaceChildren();
    for (const [labelKey, value] of items) {
      const term = document.createElement("dt");
      const description = document.createElement("dd");
      term.textContent = t(labelKey);
      description.textContent = value;
      if (labelKey === "rec_estimate") { term.classList.add("recap-total"); description.classList.add("recap-total"); }
      recap.append(term, description);
    }
    const suit = $("#dialogSuit");
    if (suit) {
      const prevView = state.view; state.view = "front";
      suit.src = garmentPath(state.model, state.composition, state.fabric);
      state.view = prevView;
      suit.alt = `${constrName()} · ${fabricName()}`;
    }
    $("#dialogSuitName").textContent = modelName();
    $("#dialogSuitFabric").textContent = `${constrName()} · ${fabricName()}`;
    $("#dialogSuitPrice").textContent = `CHF ${groupedAmount(price())}.–`;
  }

  function restoreSavedConfiguration() {
    let saved;
    try {
      saved = JSON.parse(localStorage.getItem("maison-verlaine-configuration-2d") || "null");
    } catch {
      return;
    }
    if (!saved || typeof saved !== "object") return;
    if (saved.model in models) state.model = saved.model;
    if (["2", "3"].includes(String(saved.composition))) state.composition = String(saved.composition);
    if (saved.fabric in fabrics) state.fabric = saved.fabric;
    if (saved.quality in qualityPrices) state.quality = saved.quality;
    if (saved.lining in linings) state.lining = saved.lining;
    if (saved.button in buttons) state.button = saved.button;
    if (typeof saved.lastVisualDetail === "string" && saved.lastVisualDetail in state.details) state.lastVisualDetail = saved.lastVisualDetail;
    if (["serif", "script", "italic"].includes(saved.embroideryFont)) state.embroideryFont = saved.embroideryFont;
    if ($$(".embroidery-color").some((item) => item.dataset.threadColor === saved.embroideryColor)) state.embroideryColor = saved.embroideryColor;
    if (typeof saved.monogram === "string") state.monogram = saved.monogram.toUpperCase().replace(/[^A-ZÀ-ÖØ-Ý]/g, "").slice(0, 3);
    if (saved.details && typeof saved.details === "object") {
      for (const group of Object.keys(state.details)) {
        const optionExists = $$(`[data-group="${group}"]`).some((item) => item.dataset.value === saved.details[group]);
        if (optionExists) state.details[group] = saved.details[group];
      }
    }

    $$(".model-card").forEach((item) => setSelected(item, item.dataset.model === state.model));
    $$("[data-composition]").forEach((item) => setSelected(item, item.dataset.composition === state.composition));
    $$(".fabric-card").forEach((item) => setSelected(item, item.dataset.fabric === state.fabric));
    $$(".lining-swatch").forEach((item) => setSelected(item, item.dataset.lining === state.lining));
    $$(".button-option").forEach((item) => setSelected(item, item.dataset.button === state.button));
    $$(".font-option").forEach((item) => setSelected(item, item.dataset.font === state.embroideryFont));
    $$(".embroidery-color").forEach((item) => setSelected(item, item.dataset.threadColor === state.embroideryColor));
    for (const group of Object.keys(state.details)) {
      $$(`[data-group="${group}"]`).forEach((item) => setSelected(item, item.dataset.value === state.details[group]));
    }
    $("#fabricQuality").value = state.quality;
    $("#monogramInput").value = state.monogram;
  }

  // ====== Application de la langue ======
  function applyLanguage(lang) {
    currentLang = I18N[lang] ? lang : "en";
    document.documentElement.lang = currentLang;
    try { localStorage.setItem("mv-lang", currentLang); } catch { /* storage indisponible */ }
    document.title = t("doc_title");
    $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
    $$("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
    // Étiquettes dynamiques + re-rendu
    $("#selectedFabricLabel").textContent = fabricName();
    $("#selectedLiningLabel").textContent = liningName();
    updateButtonDetail();
    updateGarment();
    updatePriceAndSummary();
    showDetailGroup(detailStep);
    updateContinueLabel();
    // UI du sélecteur de langue
    const cur = $("#langCurrent"); if (cur) cur.textContent = currentLang.toUpperCase();
    $$("#langMenu [data-lang], #langGate [data-lang]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.lang === currentLang)));
  }

  $$(".model-card").forEach((card) => card.addEventListener("click", () => {
    state.model = card.dataset.model;
    $$(".model-card").forEach((item) => setSelected(item, item === card));
    updateGarment();
    updatePriceAndSummary();
  }));

  $$(".fabric-card").forEach((card) => card.addEventListener("click", () => {
    state.fabric = card.dataset.fabric;
    $$(".fabric-card").forEach((item) => setSelected(item, item === card));
    $("#selectedFabricLabel").textContent = fabricName();
    updateGarment();
    updatePriceAndSummary();
    showPreview("fabric");
  }));

  $$("[data-composition]").forEach((button) => button.addEventListener("click", () => {
    state.composition = button.dataset.composition;
    $$("[data-composition]").forEach((item) => setSelected(item, item === button));
    updateGarment();
    updatePriceAndSummary();
  }));

  $$(".lining-swatch").forEach((button) => button.addEventListener("click", () => {
    state.lining = button.dataset.lining;
    $$(".lining-swatch").forEach((item) => setSelected(item, item === button));
    $("#selectedLiningLabel").textContent = liningName();
    updatePriceAndSummary();
    showPreview("lining");
  }));

  $$(".font-option").forEach((button) => button.addEventListener("click", () => {
    state.embroideryFont = button.dataset.font;
    $$(".font-option").forEach((item) => setSelected(item, item === button));
    updateMonogram();
    showPreview("lining");
  }));

  $$(".embroidery-color").forEach((button) => button.addEventListener("click", () => {
    state.embroideryColor = button.dataset.threadColor;
    $$(".embroidery-color").forEach((item) => setSelected(item, item === button));
    updateMonogram();
    showPreview("lining");
  }));

  $$(".button-option").forEach((button) => button.addEventListener("click", () => {
    state.button = button.dataset.button;
    $$(".button-option").forEach((item) => setSelected(item, item === button));
    updateButtonDetail();
    showPreview("button");
  }));

  $$("[data-group]").forEach((button) => button.addEventListener("click", () => {
    const group = button.dataset.group;
    state.details[group] = button.dataset.value;
    state.lastVisualDetail = group;
    state.view = group === "dos" ? "back" : "front";
    $$('[data-view]').forEach((item) => setSelected(item, item.dataset.view === state.view));
    $$(`[data-group="${group}"]`).forEach((item) => setSelected(item, item === button));
    if (button.classList.contains("detail-option")) showDetailPreview(button);
    updateGarment();
    updatePriceAndSummary();
  }));

  $("#fabricQuality").addEventListener("change", (event) => {
    state.quality = event.currentTarget.value;
    updatePriceAndSummary();
  });
  $("#monogramInput").addEventListener("input", () => { updateMonogram(); showPreview("lining"); });

  $("#coupeBack")?.addEventListener("click", () => showDetailGroup(detailStep - 1));

  // Double-clic sur un choix = valider et passer à la suite (le détail de coupe passe au détail suivant).
  $$(".model-card, .composition-choice, .fabric-card, .lining-swatch, .button-option").forEach((el) => el.addEventListener("dblclick", advanceStep));
  $$(".detail-option").forEach((el) => el.addEventListener("dblclick", () => nextDetailGroup()));

  $$(".step-chip").forEach((chip) => chip.addEventListener("click", () => goToStep(STEPS.indexOf(chip.dataset.step))));
  $("#stepPrev").addEventListener("click", () => goToStep(currentStep - 1));
  $("#stepNext").addEventListener("click", () => goToStep(currentStep + 1));
  $$("[data-view]").forEach((button) => button.addEventListener("click", () => {
    state.view = button.dataset.view;
    $$('[data-view]').forEach((item) => setSelected(item, item === button));
    updateGarment();
  }));
  $("#continueButton").addEventListener("click", () => {
    if (currentStep < STEPS.length - 1) { goToStep(currentStep + 1); return; }
    renderDialog();
    dialog.showModal();
  });
  $("#openSummary").addEventListener("click", () => {
    renderDialog();
    dialog.showModal();
  });
  $("#backToEdit").addEventListener("click", () => dialog.close());
  $("#saveConfiguration").addEventListener("click", () => {
    const saved = {
      model: state.model,
      composition: state.composition,
      fabric: state.fabric,
      quality: state.quality,
      lining: state.lining,
      monogram: state.monogram,
      embroideryFont: state.embroideryFont,
      embroideryColor: state.embroideryColor,
      button: state.button,
      lastVisualDetail: state.lastVisualDetail,
      details: state.details,
      indicativePriceCHF: price(),
      savedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem("maison-verlaine-configuration-2d", JSON.stringify(saved));
      announce(t("toast_saved"));
    } catch {
      announce(t("toast_save_fail"));
    }
    dialog.close();
  });

  // ====== Sélecteur de langue ======
  const langSwitch = $("#langSwitch");
  const langButton = $("#langButton");
  const langMenu = $("#langMenu");
  function closeLangMenu() { if (langMenu) langMenu.hidden = true; langButton?.setAttribute("aria-expanded", "false"); }
  langButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = langMenu.hidden;
    langMenu.hidden = !willOpen;
    langButton.setAttribute("aria-expanded", String(willOpen));
  });
  $$("#langMenu [data-lang]").forEach((option) => option.addEventListener("click", () => {
    applyLanguage(option.dataset.lang);
    closeLangMenu();
  }));
  document.addEventListener("click", (event) => { if (langSwitch && !langSwitch.contains(event.target)) closeLangMenu(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeLangMenu(); });

  // Porte d'entrée : choix de la langue dès l'arrivée.
  const langGate = $("#langGate");
  function dismissGate() {
    if (!langGate || langGate.hidden) return;
    langGate.classList.add("is-hidden");
    window.setTimeout(() => { langGate.hidden = true; }, reduceMotion() ? 0 : 420);
  }
  $$("#langGate [data-lang]").forEach((option) => option.addEventListener("click", () => {
    applyLanguage(option.dataset.lang);
    dismissGate();
  }));

  restoreSavedConfiguration();
  showDetailGroup(0);
  updateGarment();
  updateButtonDetail();
  updateMonogram();
  updatePriceAndSummary();
  goToStep(0);
  // Langue de départ : choix mémorisé, sinon EN par défaut.
  let startLang = "en";
  try { const s = localStorage.getItem("mv-lang"); if (s && I18N[s]) startLang = s; } catch { /* ignore */ }
  applyLanguage(startLang);
})();
