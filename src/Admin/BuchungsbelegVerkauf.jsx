import React, { Component, createRef } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

class BuchungsbelegVerkauf extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [{ artikel: '', verkaufspreis: '' }],
      pdfGenerating: false,
      buyer: {
        vorname: '',
        nachname: '',
        strasse: '',
        plz: '',
        ort: '',
        email: '',
        telefonnummer: '',
      },
    };

    this.pdfRef = createRef();
  }

  handleAddRow = () => {
    this.setState((prevState) => ({
      rows: [...prevState.rows, { artikel: '', verkaufspreis: '' }],
    }));
  };

  handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newRows = [...this.state.rows];
    newRows[index][name] = value;
    this.setState({ rows: newRows });
  };

  berechneGesamt = () => {
    const { rows } = this.state;
    let gesamt = 0;
    rows.forEach((row) => {
      if (!isNaN(row.verkaufspreis)) {
        gesamt += parseFloat(row.verkaufspreis);
      }
    });
    return gesamt;
  };
  handleCreatePdf = () => {
    if (!this.state.pdfGenerating) {
      this.setState({ pdfGenerating: true });
  
      const doc = new jsPDF('p', 'pt', 'a4');
  
      // Titel des Dokuments
      doc.setFontSize(18);
      doc.text('BUCHUNGSBELEG VERKAUF', 210, 20, 'center');
  
      // Tabelle
      const tableData = [];
      tableData.push(['ARTIKEL', 'VERKAUFSPREIS (in CHF)']);
      let gesamt = 0; // Hier wird die Gesamtsumme initialisiert
      this.state.rows.forEach((row) => {
        const preisMitCHF = `${row.verkaufspreis} CHF`; // Preis mit CHF anzeigen
        tableData.push([row.artikel, preisMitCHF]);
        if (!isNaN(row.verkaufspreis)) {
          gesamt += parseFloat(row.verkaufspreis); // Die Verkaufspreise werden summiert
        }
      });
  
      // Gesamt in der Tabelle
      const gesamtRow = ['', `Gesamt: ${gesamt} CHF`];
      tableData.push(gesamtRow);
  
      doc.autoTable({
        startY: 50, // Position der Tabelle
        head: [tableData[0]],
        body: tableData.slice(1),
      });
  
      // Käuferangaben
      doc.setFontSize(12);
      doc.text(20, doc.autoTable.previous.finalY + 20, 'Käuferinformationen');
      doc.text(20, doc.autoTable.previous.finalY + 40, `Vorname: ${this.state.buyer.vorname}`);
      doc.text(20, doc.autoTable.previous.finalY + 60, `Nachname: ${this.state.buyer.nachname}`);
      doc.text(20, doc.autoTable.previous.finalY + 80, `Straße: ${this.state.buyer.strasse}`);
      doc.text(20, doc.autoTable.previous.finalY + 100, `PLZ: ${this.state.buyer.plz}`);
      doc.text(20, doc.autoTable.previous.finalY + 120, `Ort: ${this.state.buyer.ort}`);
      doc.text(20, doc.autoTable.previous.finalY + 140, `E-Mail: ${this.state.buyer.email}`);
      doc.text(20, doc.autoTable.previous.finalY + 160, `Telefonnummer: ${this.state.buyer.telefonnummer}`);
  
      // Datum und Unterschrift
const currentDate = new Date().toLocaleDateString();
doc.setFontSize(12); // Ändern Sie die Schriftgröße
doc.text(20, doc.autoTable.previous.finalY + 200, `Datum: ${currentDate}`);
doc.setFontSize(14); // Ändern Sie die Schriftgröße
doc.text(20, doc.autoTable.previous.finalY + 220, 'Unterschrift:');

  
      // Linie für die Unterschrift
      doc.setLineWidth(1);
      doc.line(120, doc.autoTable.previous.finalY + 220, 240, doc.autoTable.previous.finalY + 220);
  
      doc.save('Buchungsbeleg.pdf');
  
      this.setState({ pdfGenerating: false });
    }
  };
  
  
  
  
  
  

  handleBuyerInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      buyer: {
        ...prevState.buyer,
        [name]: value,
      },
    }));
  };

  render() {
    return (
      <div>
        <h1>Buchungsbeleg Verkauf</h1>
        
        <table ref={this.pdfRef}>
          <thead>
            <tr>
              <th>ARTIKEL</th>
              <th>VERKAUFSPREIS (in CHF)</th>
            </tr>
          </thead>
          <tbody>
            {this.state.rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    name="artikel"
                    value={row.artikel}
                    onChange={(e) => this.handleInputChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="verkaufspreis"
                    value={row.verkaufspreis}
                    onChange={(e) => this.handleInputChange(index, e)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h2>Käuferinformationen</h2>
          <label>Vorname:
            <input
              type="text"
              name="vorname"
              value={this.state.buyer.vorname}
              onChange={this.handleBuyerInputChange}
            />
          </label>
          <label>Nachname:
            <input
              type="text"
              name="nachname"
              value={this.state.buyer.nachname}
              onChange={this.handleBuyerInputChange}
            />
          </label>
          <label>Straße:
            <input
              type="text"
              name="strasse"
              value={this.state.buyer.strasse}
              onChange={this.handleBuyerInputChange}
            />
          </label>
          <label>PLZ:
            <input
              type="text"
              name="plz"
              value={this.state.buyer.plz}
              onChange={this.handleBuyerInputChange}
            />
          </label>
          <label>Ort:
            <input
              type="text"
              name="ort"
              value={this.state.buyer.ort}
              onChange={this.handleBuyerInputChange}
            />
          </label>
          <label>E-Mail:
            <input
              type="email"
              name="email"
              value={this.state.buyer.email}
              onChange={this.handleBuyerInputChange}
            />
          </label>
          <label>Telefonnummer:
            <input
              type="tel"
              name="telefonnummer"
              value={this.state.buyer.telefonnummer}
              onChange={this.handleBuyerInputChange}
            />
          </label>
        </div>
        <div>
          <strong>Gesamt: {this.berechneGesamt()} CHF</strong>
        </div>
        <button onClick={this.handleAddRow}>Zeile hinzufügen</button>
        <button onClick={this.handleCreatePdf} disabled={this.state.pdfGenerating}>
          {this.state.pdfGenerating ? 'PDF wird generiert...' : 'PDF erstellen'}
        </button>
      </div>
    );
  }
}

export default BuchungsbelegVerkauf;
