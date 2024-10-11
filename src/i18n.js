import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
    en: {
        translation: {
            "Home": "Home",
            "Welcome ": "Welcome ",
            "to the ": "to the ",
            "Give and Take Hub": "Give and Take Hub",
            "About": "About",
            "Join": "Join",
            "Login": "Login",
            "Logout": "Logout",
            "Profile": "Profile",
            "Give & Take": "Give & Take Hub",
            "A Sharing Platform": "A Sharing Platform",
            "Core Concept": "Core Concept:",
            "Hero paragraph1": "A platform where users can anonymously offer or request items or services for free. Instead of paying for the articles or services through the current monetary system, users are encouraged to simply express their gratitude. And one way of doing that is through ",
            "GraDiDo": "GraDiDo",
            "Hero paragraph2": " Click on the link to learn more about it. The term 'Gradido' stands for Gratitude, Dignity and Donation.",
            "Hero paragraph3": " Unconditional giving or sharing is good not only for the recipient but also for the giver. It makes one feel connected. ",
            "Browse": "Browse",
            "Sort by:": "Sort by:",
            "Date": "Date and Time:",
            "Status": "Status",
            "Show All": "Show All Articles",
            "Filter by:": "Filter by:",
            "Categories": "Categories",
            "Category": "Category:",
            "Location": "Location:",
            "Posted by": "Posted by:",
            "Post New Article": "Post New Article",
            "Choose Language": "Choose Language",
            "Search": "Search",
            "Search Articles": "Search for article, description or who (username) you are looking for...",
            "English": "English",
            "German": "German",
            "Reply to Post": "Reply to Post",
            "Edit Post": "Edit Post",
            "Back to Top": "Back to Top",
        },
    },    
    de: {
        translation: {
            "Home": "Startseite",
            "Welcome": "Willkommen",
            "to the": "zu dem",
            "Give and Take Hub": "Geben und Nehmen Hub",
            "About": "Über",
            "Join": "Beitreten",
            "Login": "Anmelden",
            "Logout": "Ausloggen",
            "Profile": "Profil",
            "Give & Take": "Geben & Nehmen Hub",
            "A Sharing Platform": "Einen Plattform für das Geben, Teilen und Nehmen",
            "Core Concept": "Kernkonzept:",
            "Hero paragraph1": "Eine Plattform, auf der Nutzer anonym Artikel oder Dienstleistungen kostenlos anbieten oder anfragen können. Anstatt für die Artikel oder Dienstleistungen mit dem aktuellen Geldsystem zu bezahlen, werden die Nutzer dazu ermutigt, einfach ihre Dankbarkeit auszudrücken. Eine Möglichkeit, dies zu tun, ist durch ",
            "GraDiDo": "GraDiDo",
            "Hero paragraph2": " Klicken Sie auf den Link, um mehr darüber zu erfahren. Der Begriff 'Gradido' steht für 'Gratitude', Dankbarkeit, 'Dignity', Würde und 'Donation', Spende.",
            "Hero paragraph3": "Bedingungsloses Geben oder Teilen ist nicht nur gut für den Empfänger, sondern auch für den Geber. Es lässt einen sich verbunden fühlen.",
            "Browse": "Stöbern",
            "Sort by:": "Sortieren nach:",
            "Date": "Datum und Uhrzeit:",
            "Status": "Status",
            "Show All": "Alle Artikel anzeigen",
            "Filter by:": "Filtern nach:",
            "Categories": "Kategorien",
            "Category": "Kategorie:",
            "Location": "Ort:",
            "Posted by:": "Gepostet von:",
            "Post New Article": "Neuen Artikel erstellen",
            "Choose Language": "Sprache auswählen",
            "Search": "Suche",  
            "Search Articles": "Suche nach Artikel, Beschreibung oder wer (Nutzername) Sie suchen...",
            "English": "Englisch",
            "German": "Deutsch",
            "Reply to Post": "Post Antworten",
            "Edit Post": "Post bearbeiten",
            "Back to Top": "Zurück nach Oben",
        },
    },
};

  // fr: {
  //     translation: {
  //         "Welcome to React": "Bienvenue sur React et react-i18next",
  //     },
  // },


i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18next;