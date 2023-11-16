import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AuswahlButtons.scss';


import {
  faPaintBrush,
  faStamp,
  faBook,
  faMicrochip,
  faCompactDisc,
  faTshirt,
  faHeadphones,
  faShoePrints,
  faHammer,
  faChess,
  faClock,
  faGamepad,
  faPhone,
  faSprayCan,
  faImage,
  faShirt,
  faPrint,
  faCouch,
  faRing,
  faCoffee,
  faBed,
  faTv,
  faMusic,
  faMoneyBill
} from '@fortawesome/free-solid-svg-icons';

function Box(props) {
  return (
    <div className="category-box" onClick={props.onClick}>
      <FontAwesomeIcon icon={props.icon} />
      <h2>{props.title}</h2>
      <p>{props.text}</p>
    </div>
  );
}

function Auswahlkategorie() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { icon: faPaintBrush, title: "Bastelartikel", to: "/bastelartikel" },
    { icon: faStamp, title: "Briefmarken", to: "/briefmarken" },
    { icon: faBook, title: "Bücher & Comics", to: "/buecher" },
    { icon: faMicrochip, title: "Druckerzubehör", to: "/druckerzubehoer" },
    { icon: faCompactDisc, title: "DVD - Blue Ray Player", to: "/dvd" },
    { title: "Geschirr", to: "/geschirr" },
    { icon: faTshirt, title: "Kleidung", to: "/kleidung" },
    { icon: faHeadphones, title: "Kopfhörer", to: "/kopfhoerer" },
    { icon: faShoePrints, title: "Schuhe", to: "/schuhe" },
    { icon: faChess, title: "Spiele", to: "/spiele" },
    { icon: faPhone, title: "Schutzhüllen für Smartphone", to: "/schutzhuellensmartphone" },
    { icon: faImage, title: "Bilderrahmen / Bilder", to: "/bilder" },
    { icon: faShirt, title: "Kopfbedeckung", to: "/kopfbedeckungen" },
    { icon: faCouch, title: "Möbel", to: "/moebel"},
    {title: "Kerzenständer", to: "/kerzenstaender" }, // Using FaCandle here
    { icon: faRing, title: "Brautkleid", to: "/brautkleid"},
    { icon: faPrint, title: "Drucker", to: "/drucker"},
    { icon: faTshirt, title: "Fahrrad Shorts", to: "/fahrradshorts"}, 
    { icon: faGamepad, title: "Games - Konsolen", to: "/games"},
    { icon: faCoffee, title: "Kaffeemaschine", to: "/kaffeemaschine"},
    { icon: faBed, title: "Kopfkissen - Decken", to: "/kopfkissen"},
    { icon: faSprayCan, title: "MIGROS Sprayer 0.5L", to: "/migrossprayer"},
    { icon: faTv, title: "Monitore - TV", to: "/monitore"},
    { icon: faMusic, title: "Musikinstrumente", to: "/musikinstrumente"},
    { icon: faImage, title: "Plüschtiere", to:"/plueschtiere"},
    { icon: faMusic, title: "Schallplatten", to:"/schallplatten"},
    { icon: faMoneyBill, title: "Portemonnaie", to: "/portemonnaie"},
    { icon: faHammer, title: "Werkzeug", to: "/werkzeug"},
    { icon: faClock, title: "Wanduhren - Standuhren", to: "/wandstanduhren"}
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className='title'>
        <h2>Kategorien</h2>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Suche nach Kategorien..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="category-buttons">
        {filteredCategories.map((category, index) => (
          <Link key={index} to={category.to}>
            <Box
              icon={category.icon}
              title={category.title}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Auswahlkategorie;
