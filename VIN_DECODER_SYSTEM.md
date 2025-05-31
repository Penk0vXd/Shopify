# 🚗 Complete VIN Decoder System Documentation

## 📋 VIN Structure Overview

A Vehicle Identification Number (VIN) is a 17-character alphanumeric code that uniquely identifies a motor vehicle. Each position has a specific meaning:

### VIN Position Breakdown Table

| Position | Section | Name | Description | Example |
|----------|---------|------|-------------|---------|
| 1-3 | WMI | World Manufacturer Identifier | Brand & country of origin | WBA (BMW Germany) |
| 4-8 | VDS | Vehicle Descriptor Section | Model, body, engine, transmission | 3A5C5 |
| 9 | VDS | Check Digit | Validation digit (US/Canada only) | 6 |
| 10 | VIS | Model Year | Production year code | D (2013) |
| 11 | VIS | Plant Code | Manufacturing facility | F (Munich) |
| 12-17 | VIS | Serial Number | Unique production sequence | 586123 |

## 🌍 WMI (World Manufacturer Identifier) Database

### Complete WMI Codes by Region

#### European Manufacturers
| WMI | Brand | Country | Region |
|-----|-------|---------|--------|
| WBA/WBS/WBX | BMW | Germany | Europe |
| WAU/WA1 | Audi | Germany | Europe |
| WVW/WV1/WV2 | Volkswagen | Germany | Europe |
| WDD/WDC/WDB | Mercedes-Benz | Germany | Europe |
| WP0/WP1 | Porsche | Germany | Europe |
| VF1/VF3/VF6 | Renault | France | Europe |
| VF7/VF8/VF9 | Citroën | France | Europe |
| VF2/VF5 | Peugeot | France | Europe |
| ZFA/ZFC/ZFF | Fiat | Italy | Europe |
| ZAR/ZAP/ZAM | Alfa Romeo | Italy | Europe |
| ZFF | Ferrari | Italy | Europe |
| ZLA/ZLB/ZLC | Lamborghini | Italy | Europe |
| TRU/TRX/TRZ | Audi Hungary | Hungary | Europe |
| TMB/TMK/TMP | Škoda | Czech Republic | Europe |
| VF0 | Renault Trucks | France | Europe |
| WF0 | Ford Europe | Germany | Europe |
| VSS/VSX | SEAT | Spain | Europe |
| VNE/VNK/VNL | Toyota Europe | Turkey | Europe |

#### Asian Manufacturers
| WMI | Brand | Country | Region |
|-----|-------|---------|--------|
| JHM/JH4/JHL | Honda | Japan | Asia |
| JTD/JTE/JTF | Toyota | Japan | Asia |
| JN1/JN6/JN8 | Nissan | Japan | Asia |
| JM1/JM7 | Mazda | Japan | Asia |
| JS1/JS2/JS3 | Suzuki | Japan | Asia |
| JF1/JF2 | Subaru | Japan | Asia |
| KNA/KNB/KNC | Kia | South Korea | Asia |
| KMH/KM8 | Hyundai | South Korea | Asia |
| LDC/LDY | Daewoo | South Korea | Asia |
| MHR/MR0 | Mitsubishi | Japan | Asia |
| LGB/LH1/LHG | Honda China | China | Asia |
| LVS/LVT/LVV | Ford China | China | Asia |

#### American Manufacturers
| WMI | Brand | Country | Region |
|-----|-------|---------|--------|
| 1HG/1H4/1HC | Honda USA | USA | North America |
| 1FA/1FB/1FC | Ford | USA | North America |
| 1G1/1G4/1G6 | Chevrolet | USA | North America |
| 1GM/1GC/1GT | GMC | USA | North America |
| 1C3/1C4/1C6 | Chrysler | USA | North America |
| 2HG/2H4/2HC | Honda Canada | Canada | North America |
| 2C3/2C4/2C8 | Chrysler Canada | Canada | North America |
| 3FA/3FE/3FM | Ford Mexico | Mexico | North America |
| WBA/WBS (US) | BMW USA | USA | North America |
| JTH/JTJ/JTK | Toyota Lexus | Japan | Asia |

## 📅 Model Year Decoding Table (Position 10)

| Code | Year | Code | Year | Code | Year | Code | Year |
|------|------|------|------|------|------|------|------|
| A | 1980/2010 | H | 1987/2017 | P | 1993/2023 | W | 1998/2028 |
| B | 1981/2011 | J | 1988/2018 | R | 1994/2024 | X | 1999/2029 |
| C | 1982/2012 | K | 1989/2019 | S | 1995/2025 | Y | 2000/2030 |
| D | 1983/2013 | L | 1990/2020 | T | 1996/2026 | 1 | 2001/2031 |
| E | 1984/2014 | M | 1991/2021 | V | 1997/2027 | 2 | 2002/2032 |
| F | 1985/2015 | N | 1992/2022 | W | 1998/2028 | 3 | 2003/2033 |
| G | 1986/2016 | P | 1993/2023 | X | 1999/2029 | 4 | 2004/2034 |

**Note**: The year repeats every 30 years. Context from other VIN positions helps determine the correct decade.

## 🏭 Plant Code Examples (Position 11)

### BMW Plant Codes
| Code | Plant | Location | Country |
|------|-------|----------|---------|
| F | Munich | Munich | Germany |
| G | Graz | Graz | Austria |
| A | Spartanburg | South Carolina | USA |
| B | Berlin | Berlin | Germany |
| C | Leipzig | Leipzig | Germany |
| D | Dingolfing | Dingolfing | Germany |
| E | Eisenach | Eisenach | Germany |
| H | Hams Hall | Birmingham | UK |
| J | Oxford | Oxford | UK |
| K | Regensburg | Regensburg | Germany |

### Volkswagen Plant Codes
| Code | Plant | Location | Country |
|------|-------|----------|---------|
| W | Wolfsburg | Wolfsburg | Germany |
| E | Emden | Emden | Germany |
| K | Osnabrück | Osnabrück | Germany |
| H | Hanover | Hanover | Germany |
| S | Salzgitter | Salzgitter | Germany |
| B | Brussels | Brussels | Belgium |
| P | Palmela | Palmela | Portugal |
| M | Mladá Boleslav | Czech Republic | Czech Republic |

### Toyota Plant Codes
| Code | Plant | Location | Country |
|------|-------|----------|---------|
| 1 | Toyota City | Aichi | Japan |
| 2 | Miyata | Fukuoka | Japan |
| 3 | Kyushu | Fukuoka | Japan |
| A | Georgetown | Kentucky | USA |
| C | Princeton | Indiana | USA |
| J | Tahara | Aichi | Japan |
| K | Motomachi | Aichi | Japan |
| T | Tsutsumi | Aichi | Japan |

## 🚗 Vehicle Descriptor Section (VDS) - Positions 4-8

The VDS structure varies by manufacturer but typically includes:

### BMW VDS Structure (Positions 4-8)
| Position | Meaning | Example Values |
|----------|---------|----------------|
| 4 | Body Style/Series | 3=3 Series, 5=5 Series, X=SAV |
| 5 | Engine Type | A=Gasoline, B=Diesel, H=Hybrid |
| 6 | Transmission/Drive | 5=Manual, 6=Auto, A=AWD |
| 7 | Restraint System | C=Standard, S=Sport |
| 8 | Model Variant | 5=Sedan, 6=Coupe, G=Gran Turismo |

### Volkswagen VDS Structure
| Position | Meaning | Example Values |
|----------|---------|----------------|
| 4 | Model Line | A=Golf, B=Passat, C=Polo |
| 5 | Body Type | Z=5-door, Y=3-door, X=Estate |
| 6 | Engine | Z=TSI, Y=TDI, X=Hybrid |
| 7 | Transmission | Z=Manual, Y=DSG, X=Auto |
| 8 | Equipment Level | Z=Base, Y=Comfort, X=Highline |

### Toyota VDS Structure
| Position | Meaning | Example Values |
|----------|---------|----------------|
| 4 | Vehicle Line | D=Corolla, G=Camry, J=RAV4 |
| 5 | Engine Family | 4=4-cyl, 6=6-cyl, H=Hybrid |
| 6 | Body Type | 1=Sedan, 2=Hatchback, 3=SUV |
| 7 | Restraint System | B=Standard, A=Advanced |
| 8 | Trim Level | 1=Base, 2=LE, 3=XLE, 4=Limited |

## 🔧 Vehicle Information Section (VIS) - Positions 10-17

| Position | Name | Description |
|----------|------|-------------|
| 10 | Model Year | Production year (see year table) |
| 11 | Plant Code | Manufacturing facility |
| 12-17 | Serial Number | Sequential production number (000001-999999) |

## 📊 Complete Brand & Model Database

### BMW Models by Series
```json
{
  "BMW": {
    "1 Series": ["116i", "118i", "120i", "125i", "M135i"],
    "2 Series": ["218i", "220i", "225i", "M240i", "M2"],
    "3 Series": ["318i", "320i", "325i", "330i", "335i", "M3"],
    "4 Series": ["420i", "425i", "430i", "435i", "M4"],
    "5 Series": ["520i", "525i", "530i", "535i", "540i", "M5"],
    "6 Series": ["630i", "640i", "650i", "M6"],
    "7 Series": ["730i", "740i", "750i", "760i"],
    "8 Series": ["840i", "850i", "M8"],
    "X1": ["sDrive18i", "sDrive20i", "xDrive20i", "xDrive25i"],
    "X2": ["sDrive18i", "sDrive20i", "xDrive20i", "xDrive25i"],
    "X3": ["sDrive20i", "xDrive20i", "xDrive30i", "M40i"],
    "X4": ["xDrive20i", "xDrive30i", "M40i"],
    "X5": ["xDrive30i", "xDrive40i", "xDrive50i", "M50i"],
    "X6": ["xDrive30i", "xDrive40i", "xDrive50i", "M50i"],
    "X7": ["xDrive30i", "xDrive40i", "xDrive50i"],
    "Z4": ["sDrive20i", "sDrive30i", "M40i"],
    "i3": ["eDrive", "REx"],
    "i4": ["eDrive40", "M50"],
    "iX": ["eDrive50", "M60"],
    "iX3": ["eDrive80"]
  }
}
```

### Mercedes-Benz Models
```json
{
  "Mercedes-Benz": {
    "A-Class": ["A180", "A200", "A220", "A250", "AMG A35", "AMG A45"],
    "B-Class": ["B180", "B200", "B220", "B250"],
    "C-Class": ["C180", "C200", "C220", "C250", "C300", "AMG C43", "AMG C63"],
    "CLA": ["CLA180", "CLA200", "CLA220", "CLA250", "AMG CLA35", "AMG CLA45"],
    "CLS": ["CLS350", "CLS400", "CLS450", "AMG CLS53", "AMG CLS63"],
    "E-Class": ["E200", "E220", "E250", "E300", "E350", "E400", "E450", "AMG E53", "AMG E63"],
    "S-Class": ["S350", "S400", "S450", "S500", "S560", "S580", "AMG S63", "AMG S65"],
    "GLA": ["GLA180", "GLA200", "GLA220", "GLA250", "AMG GLA35", "AMG GLA45"],
    "GLB": ["GLB180", "GLB200", "GLB220", "GLB250", "AMG GLB35"],
    "GLC": ["GLC200", "GLC220", "GLC250", "GLC300", "AMG GLC43", "AMG GLC63"],
    "GLE": ["GLE300", "GLE350", "GLE400", "GLE450", "GLE500", "AMG GLE53", "AMG GLE63"],
    "GLS": ["GLS350", "GLS400", "GLS450", "GLS500", "GLS580", "AMG GLS63"],
    "G-Class": ["G350", "G400", "G500", "G550", "AMG G63"],
    "SL": ["SL350", "SL400", "SL500", "SL550", "AMG SL55", "AMG SL63"],
    "SLK": ["SLK200", "SLK250", "SLK300", "SLK350", "AMG SLK55"],
    "EQA": ["EQA250", "EQA300", "EQA350"],
    "EQB": ["EQB250", "EQB300", "EQB350"],
    "EQC": ["EQC400"],
    "EQE": ["EQE350", "EQE500", "AMG EQE53"],
    "EQS": ["EQS450", "EQS500", "EQS580", "AMG EQS53"]
  }
}
```

### Volkswagen Models
```json
{
  "Volkswagen": {
    "Polo": ["1.0 TSI", "1.2 TSI", "1.4 TSI", "1.6 TDI", "GTI"],
    "Golf": ["1.0 TSI", "1.4 TSI", "1.5 TSI", "2.0 TSI", "1.6 TDI", "2.0 TDI", "GTI", "GTD", "R"],
    "Jetta": ["1.4 TSI", "1.8 TSI", "2.0 TSI", "1.6 TDI", "2.0 TDI", "GLI"],
    "Passat": ["1.4 TSI", "1.8 TSI", "2.0 TSI", "1.6 TDI", "2.0 TDI", "Alltrack"],
    "Arteon": ["1.5 TSI", "2.0 TSI", "2.0 TDI", "R-Line"],
    "T-Cross": ["1.0 TSI", "1.5 TSI"],
    "T-Roc": ["1.0 TSI", "1.5 TSI", "2.0 TSI", "1.6 TDI", "2.0 TDI", "R"],
    "Tiguan": ["1.4 TSI", "1.5 TSI", "2.0 TSI", "1.6 TDI", "2.0 TDI", "R-Line"],
    "Touareg": ["3.0 TSI", "3.0 TDI", "4.0 TSI"],
    "Touran": ["1.0 TSI", "1.4 TSI", "1.5 TSI", "1.6 TDI", "2.0 TDI"],
    "Sharan": ["1.4 TSI", "2.0 TSI", "2.0 TDI"],
    "Caddy": ["1.0 TSI", "1.4 TSI", "1.6 TDI", "2.0 TDI"],
    "Crafter": ["2.0 TDI", "2.0 BiTDI"],
    "ID.3": ["Pro", "Pro S", "Pro Performance"],
    "ID.4": ["Pro", "Pro Performance", "GTX"],
    "ID.5": ["Pro", "Pro Performance", "GTX"],
    "ID.Buzz": ["Pro", "Cargo"]
  }
}
```

### Toyota Models
```json
{
  "Toyota": {
    "Yaris": ["1.0 VVT-i", "1.5 VVT-i", "1.5 Hybrid", "GR"],
    "Corolla": ["1.2 Turbo", "1.8 Hybrid", "2.0 Hybrid", "GR"],
    "Camry": ["2.0", "2.5", "2.5 Hybrid", "3.5 V6"],
    "Avalon": ["2.5", "2.5 Hybrid", "3.5 V6"],
    "Prius": ["1.8 Hybrid", "2.0 Hybrid", "Prime"],
    "C-HR": ["1.2 Turbo", "1.8 Hybrid", "2.0 Hybrid"],
    "RAV4": ["2.0", "2.5", "2.5 Hybrid", "Prime", "Adventure"],
    "Highlander": ["2.4 Turbo", "3.5 V6", "3.5 Hybrid"],
    "4Runner": ["4.0 V6"],
    "Sequoia": ["5.7 V8"],
    "Tacoma": ["2.7 4-cyl", "3.5 V6"],
    "Tundra": ["3.5 V6 Hybrid", "5.7 V8"],
    "Sienna": ["2.5 Hybrid"],
    "Venza": ["2.5 Hybrid"],
    "Supra": ["2.0 Turbo", "3.0 Turbo"],
    "86": ["2.4"],
    "Mirai": ["Fuel Cell"],
    "bZ4X": ["Electric AWD", "Electric FWD"]
  }
}
```

## 🔍 Example VIN Decoder Output

### Input VIN: `WBA3A5C56DF586123`

```json
{
  "vin": "WBA3A5C56DF586123",
  "isValid": true,
  "wmi": {
    "code": "WBA",
    "manufacturer": "BMW",
    "country": "Germany",
    "region": "Europe"
  },
  "vds": {
    "raw": "3A5C5",
    "series": "3 Series",
    "bodyStyle": "Sedan/Touring",
    "engine": "Diesel",
    "transmission": "Automatic",
    "driveType": "RWD"
  },
  "checkDigit": "6",
  "vis": {
    "modelYear": {
      "code": "D",
      "year": 2013
    },
    "plant": {
      "code": "F",
      "name": "Munich Plant",
      "location": "Munich, Germany"
    },
    "serialNumber": "586123"
  },
  "vehicle": {
    "brand": "BMW",
    "model": "3 Series",
    "year": 2013,
    "bodyStyle": "Sedan",
    "engine": "2.0L Diesel",
    "transmission": "8-Speed Automatic",
    "plant": "Munich, Germany"
  },
  "specifications": {
    "fuelType": "Diesel",
    "doors": 4,
    "displacement": "2.0L",
    "cylinders": 4,
    "driveWheels": "Rear Wheel Drive"
  }
}
```

## ⚠️ VIN Validation Rules

### Character Rules
- **Allowed**: A-H, J-N, P-R, S-Z, 0-9
- **Forbidden**: I, O, Q (to avoid confusion with 1, 0, 0)
- **Length**: Exactly 17 characters

### Position-Specific Rules
- **Position 1**: Region code (1-5=North America, W=Europe, J=Asia, etc.)
- **Position 9**: Check digit (US/Canada only), calculated using specific algorithm
- **Position 10**: Year code, cannot be 0, I, O, Q, U, Z
- **Positions 12-17**: Must be numeric (except some older vehicles)

### Check Digit Calculation (Position 9)
Used in US and Canada to validate VIN authenticity:

1. Assign values: A=1, B=2, ..., H=8, J=1, ..., N=5, P=7, R=9, S=2, ..., Z=6, 0-9=face value
2. Multiply by position weight: 8,7,6,5,4,3,2,10,0,9,8,7,6,5,4,3,2
3. Sum all products
4. Divide by 11, remainder is check digit (10=X)

---

*This documentation provides the foundation for implementing a complete VIN decoder system. The next step is to implement the JavaScript decoder with these comprehensive databases.* 