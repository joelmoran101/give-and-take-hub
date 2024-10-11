// LanguageSelector.tsx
import React, { useState } from 'react';
import { Nav, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', flag: '🇺🇸', name: 'English'},
  { code: 'de', flag: '🇩🇪', name: 'Deutsch'},
];

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(languages.find((l) => l.code === lng) || languages[0]);
  };

  return (
    <Nav className="ml-auto">
      <Dropdown>
        <Dropdown.Toggle variant="link" id="language-dropdown">
          {selectedLanguage.flag} {selectedLanguage.name}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {languages.map((language) => (
            <Dropdown.Item key={language.code} onClick={() => changeLanguage(language.code)}>
              {language.flag} {language.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
};

export default LanguageSelector;