// LanguageSelector.tsx
import React, { useState } from 'react';
import { Nav, Dropdown } from 'react-bootstrap';

const languages = [
  { code: 'en', flag: '🇺🇸', name: 'English' },
  { code: 'de', flag: '🇩🇪', name: 'German' },
];

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleLanguageChange = (language: { code: string; flag: string; name: string }) => {
    setSelectedLanguage(language);
    // Add logic to update the language here
  };

  return (
    <Nav className="ml-auto">
      <Dropdown>
        <Dropdown.Toggle variant="link" id="language-dropdown">
          {selectedLanguage.flag} {selectedLanguage.name}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {languages.map((language) => (
            <Dropdown.Item key={language.code} onClick={() => handleLanguageChange(language)}>
              {language.flag} {language.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  );
};

export default LanguageSelector;