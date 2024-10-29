import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
    en: {
        translation: {
            sort_by: {
                username: "Username",
                category: "Category",
                date: "Date",
                status: "Status",
            },
            status: {
                "available": "Available",
                "reserved": "Reserved",
                "taken": "Taken",
                "needed": "Needed",
            },
            "Home": "Home",
            "Welcome ": "Welcome ",
            "to the ": "to the ",
            "Give and Take Hub": "Give and Take Hub",
            "About": "About",
            "About paragraph1": "Welcome to the 'Give and Take Hub', a platform where users can anonymously offer or request items or services for free. Our core concept is rooted in the belief that unconditional giving and sharing can bring people together, foster a sense of community, and create a more sustainable future.",
            "Unconditional giving": "The Power of Unconditional Giving:",
            "About paragraph2": "We believe that by sharing what we have, we can help create a better world where everyone's needs could be met, and hopefully, where greed and scarcity are a thing of the past.",
            "About paragraph3": "Research has shown that giving without expecting anything in return can have a profound impact on both the giver and the receiver. It can increase feelings of happiness, empathy, and social connection. By providing a platform for people to give and receive freely, we aim to create a ripple effect of kindness that can spread far and wide.",            
            "Join": "Join",
            "Reminder": "You have to join our community and login to interact with other members or post article/s.",
            "Registration Form": "Registration Form",
            "Firstname": "Enter Firstname",
            "Lastname": "Enter Lastname",
            "choose a username": "Choose a username",
            "Email": "Enter Email",
            "Phone": "Enter Phone number",
            "Register": "Register",
            "Go back": "Go back...",
            "No account yet?": "No account yet? Click here to register...",
            "Username": "Enter Username or Email",
            "request-otp": "Request for a One Time Password...",
            "email-OTP": "Check your email for One Time Password",
            "Enter One Time Password": "Enter One Time Password",
            "Login": "Login",
            "Logout": "Logout",
            "Logging out": "Click the button to confirm logging out...  ",
            "goodbye": "Thank you for using our application. Goodbye!",
            "Profile": "Profile",
            "Give & Take": "Give & Take Hub",
            "A Sharing Platform": "A Sharing Platform",
            "Core Concept": "Core Concept:",
            "Hero paragraph1": "A platform where users can anonymously offer or request items or services for free. Instead of paying for the articles or services through the current monetary system, users are encouraged to simply express their gratitude. And one way of doing that is through ",
            "GraDiDo": "GraDiDo",
            "Hero paragraph2": " Click on the link to learn more about it. The term 'Gradido' stands for Gratitude, Dignity and Donation.",
            "Hero paragraph3": " Unconditional giving or sharing is good not only for the recipient but also for the giver. It makes one feel connected. ",
            "Our Logo:": "Our Logo:",
            "Logo description": "The logo features two interlocking puzzle pieces, symbolizing collaboration and connectivity. The design highlights unity and harmony, which are essential elements for a sustainable future. Just as puzzle pieces fit together to form a complete picture, we believe that individuals coming together can create a more complete and compassionate community",
            "About quote": "'There is enough for everybody's needs but not enough for everyone's greed.' - Mahatma Gandhi",
            "Our Purpose": "Our Purpose:",
            "About paragraph4": "Our objective is to create a platform that facilitates unconditional giving and sharing, and to inspire a movement of kindness and compassion that can change the world.",
            "Call to Action": "Call to Action:",
            "About paragraph5": "Join us in our mission to create a more compassionate and sustainable world. Sign up to offer or request items or services, and be part of a community that's changing the way we think about giving and sharing.",
            "Browse": "Browse",
            "Sort by": "Sort by",
            "sort by username": "Username",
            "sort by category": "Category",
            "sort by date": "Date",
            "sort by status": "Status",
            "Date": "Date and Time:",
            "Status": "Status",
            "Show All": "Show All Articles",
            "Filter by": "Filter by:",
            "Categories": "Categories",
            "Category": "Category:",
            "Location": "Location:",
            "Posted by": "Posted by:",
            "Post New Article": "Post New Article",
            "Article Name is required": "Article Name is required",
            "Article Name": "Article Name",
            "Add Images": "Add Images",
            "Delete Image": "Delete Image",
            "No images added yet": "No images yet; choose and add now",
            "Edit Article": "Edit Article",
            "Delete Article": "Delete Article",
            "Description": "Description:",
            "Select Status": "Select Status",
            "Available": "Available",
            "Reserved": "Reserved",
            "Taken": "Taken",
            "Needed": "Needed",
            "Location": "Location:",
            "Location is required": "Location is required",
            "Status is required": "Status is required",
            "Description is required": "Description is required",
            "Submitting...": "Submitting...",
            "Updating": "Updating...",
            "Update": "Update",
            "Submit": "Submit",
            "Go back to browsing": "Go back to browsing",
            "Choose Language": "Choose Language",
            "Search": "Search for article, description or who (username) you are looking for...",
            "Search Articles": "Search for article, description or who (username) you are looking for...",
            "English": "English",
            "German": "German",
            "Reply to Post": "Reply to Post",
            "Edit Post": "Edit Post",
            "Delete Post": "Delete Post",
            "Back to Top": "Back to Top",
            "Add an Article": "Add an Article",
            "Article Name": "Article Name",
            "Upload Picture/s": "Upload Picture/s",
        },
    },    
    de: {
        translation: {
            sort_by: {
                username: "Benutzername",
                category: "Kategorie",
                date: "Datum",
                status: "Status",   
            },
            status: {
                "available": "Verfuegbar",
                "reserved": "Reserviert",
                "taken": "Vergeben",
                "needed": "Benötigt",
            },
            "Home": "Startseite",
            "Welcome": "Willkommen",
            "to the": "zum",
            "Give and Take Hub": "Geben und Nehmen Zentrum",
            "About": "Über Uns",
            "About paragraph1": "Willkommen beim 'Give and Take Hub', einer Plattform, auf der Nutzer anonym Gegenstände oder Dienstleistungen kostenlos anbieten oder anfragen können. Unser Kernkonzept basiert auf der Überzeugung, dass bedingungsloses Geben und Teilen Menschen zusammenbringen, ein Gemeinschaftsgefühl fördern und eine nachhaltigere Zukunft schaffen kann.",
            "Unconditional giving": "Die Macht von bedingungslosen Geben:", 
            "About paragraph2": "Wir glauben, dass wir durch das Teilen dessen, was wir haben, dazu beitragen können, eine bessere Welt zu schaffen, in der die Bedürfnisse aller erfüllt werden können und hoffentlich Gier und Knappheit der Vergangenheit angehören.",
            "About paragraph3": "Forschungen haben gezeigt, dass Geben, ohne etwas im Gegenzug zu erwarten, sowohl auf den Geber als auch auf den Empfänger einen tiefgreifenden Einfluss haben kann. Es kann das Gefühl von Glück, Empathie und sozialer Verbundenheit steigern. Indem wir eine Plattform bieten, auf der Menschen frei geben und empfangen können, möchten wir eine Welle der Freundlichkeit auslösen.",
            "Our Logo:": "Unsere Logo:",
            "Logo description": "Das Logo zeigt zwei ineinandergreifende Puzzleteile, die Zusammenarbeit und Verbundenheit symbolisieren. Das Design hebt Einheit und Harmonie hervor, wesentliche Elemente für eine nachhaltige Zukunft. So wie Puzzleteile zusammenpassen, um ein vollständiges Bild zu ergeben, glauben wir, dass Menschen, die zusammenkommen, eine vollständigere und mitfühlendere Gemeinschaft schaffen können",
            "About quote": "'There is enough for everybody's needs but not enough for everyone's greed.' - Mahatma Gandhi",
            "Join": "Beitreten",
            "Reminder": "Um Interaktionen mit anderen Mitgliedern zu ermöglichen oder Artikel zu posten, ist eine Registrierung und Anmeldung in unserer Community erforderlich.",
            "Registration Form": "Registrierungsformular",
            "Firstname": "Vorname eingeben",
            "Lastname": "Nachname eingeben",
            "choose a username": "Benutzername wählen",
            "Email": "E-Mail eingeben",
            "Phone": "Telefonnummer eingeben",
            "Register": "Registrieren",
            "Go back": "Zurück...",
            "No account yet?": "Noch kein Konto? Hier klicken zur Registrierung...",
            "Username": "Benutzername oder E-Mail eingeben",
            "request-otp": "Ein Einmalpasswort (OTP) anfordern...",
            "email-OTP": "Schaue in deinen E-Mails nach dem Einmalpasswort (One Time Password - OTP)",
            "Enter One Time Password": "Einen einmaligen Passwort eingeben",
            "Login": "Anmelden",
            "Logout": "Ausloggen",
            "Logging out": "Klicke den Button zur Bestätigung der Abmeldung...",
            "goodbye": "Vielen Dank für die Nutzung unserer App. Auf Wiedersehen!",
            "Profile": "Profil",
            "Give & Take": "Geben & Nehmen Hub",
            "A Sharing Platform": "Eine Plattform für das Geben, Teilen und Nehmen",
            "Core Concept": "Kernkonzept:",
            "Hero paragraph1": "Eine Plattform, auf der Nutzer anonym Artikel oder Dienstleistungen kostenlos anbieten oder anfragen können. Anstatt für die Artikel oder Dienstleistungen mit dem aktuellen Geldsystem zu bezahlen, werden die Nutzer dazu ermutigt, einfach ihre Dankbarkeit auszudrücken. Eine Möglichkeit, dies zu tun, ist durch ",
            "GraDiDo": "GraDiDo",
            "Hero paragraph2": " Klicken Sie auf den Link, um mehr darüber zu erfahren. Der Begriff 'Gradido' steht für 'Gratitude', Dankbarkeit, 'Dignity', Würde und 'Donation', Spende.",
            "Hero paragraph3": "Bedingungsloses Geben oder Teilen ist nicht nur gut für den Empfänger, sondern auch für den Geber. Es sorgt für ein Gefühl der Verbundenheit.",
            "Our Logo": "Unsere Logo:",
            "Logo description": "Das Logo zeigt zwei ineinandergreifende Puzzleteile, die Zusammenarbeit und Verbundenheit symbolisieren. Das Design hebt Einheit und Harmonie hervor, wesentliche Elemente für eine nachhaltige Zukunft. So wie Puzzleteile zusammenpassen, um ein vollständiges Bild zu ergeben, glauben wir, dass Menschen, die zusammenkommen, eine vollständigere und mitfühlendere Gemeinschaft schaffen können.",
            "About quote": "'Es gibt genug für die Bedürfnisse aller, aber nicht genug für die Gier aller.' – Mahatma Gandhi",
            "Our Purpose": "Unsere Ziele:",
            "About paragraph4": "Unser Ziel ist es, eine Plattform zu schaffen, die bedingungsloses Geben und Teilen ermöglicht, und eine Bewegung von Freundlichkeit und Mitgefühl zu inspirieren, die die Welt verändern kann.",
            "Call to Action": "Handlungsaufforderung:",
            "About paragraph5": "Schließe dich unserer Mission an, eine mitfühlendere und nachhaltigere Welt zu schaffen. Melde dich an, um Gegenstände oder Dienstleistungen anzubieten oder anzufragen, und werde Teil einer Gemeinschaft, die die Art und Weise, wie wir über Geben und Teilen denken, verändert..",
            "Browse": "Stöbern",
            "Sort by": "Sortieren nach",
            "sort by username": "Nutzername",
            "sort by category": "Kategorie",
            "sort by date": "Datum",
            "sort by status": "Status",
            "Date": "Datum und Uhrzeit:",
            "Status": "Status",
            "Show All": "Alle Artikel anzeigen",
            "Filter by": "Filtern nach:",
            "Categories": "Kategorien",
            "Category": "Kategorie:",
            "Location": "Ort:",
            "Posted by": "Gepostet von:",
            "Post New Article": "Neuen Artikel erstellen",
            "Article Name": "Artikelname:",
            "Add Images": "Bilder hinzufügen",
            "Delete Image": "Bild löschen",
            "No images added yet": "Noch keine Bilder vorhanden; jetzt auswählen und hochladen.",
            "Edit Article": "Artikel bearbeiten",
            "Delete Article": "Artikel löschen",
            "Description": "Artikel Beschreibung:",
            "Select Status": "Status auswählen",
            "Available": "Verfuegbar",
            "Reserved": "Reserviert",
            "Taken": "Vergeben",
            "Needed": "Benötigt",
            "Location": "Ort:",
            "Location is required": "Ort ist erforderlich",
            "Status is required": "Status ist erforderlich",
            "Description is required": "Beschreibung ist erforderlich",
            "Submitting...": "Senden...",
            "Updating": "Aktualisieren...",
            "Update": "Aktualisieren",
            "Submit": "Senden",
            "Go back to browsing": "Zurück zum Stöbern",
            "Choose Language": "Sprache auswählen",
            "Search": "Suche nach Artikel, Beschreibung oder wer (Nutzername) Sie suchen...",   
            "Search Articles": "Suche nach Artikel, Beschreibung oder wer (Nutzername) Sie suchen...",
            "English": "Englisch",
            "German": "Deutsch",
            "Reply to Post": "Post Antworten",
            "Edit Post": "Post bearbeiten",
            "Delete Post": "Post löschen",
            "Back to Top": "Zurück nach Oben",
            "Add an Article": "Ein Artikel hinzufügen",
            "Article Name": "Artikelname",
            "Upload Picture/s": "Bild hochladen",
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