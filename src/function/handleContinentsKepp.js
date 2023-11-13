
const HandleContinentsKeep = (countryCode) =>{
    const LetUp = countryCode.toUpperCase() 
    const Africa = ["DZA", "TCD", "EGY", "LBY", "SDN", "MRT", "MLI", "NER", "ESH", "DJI", "ERI", "SDS", "SOM", "UGA", "KEN", "COD", "RWA", "BUR", "TZA", "ZMB", "AGO", "NAM", "BWA", "ZWE", "MOZ", "MWI", "ZAF", "LBR", "GIN", "CIV", "BFA", "GHA", "TGO", "BEN", "NGA", "CMR", "CAF", "TCD", "COG", "GNQ", "GAB", "ESH", "MAR", "TUN", "LBY", "EGY", "ESH", "ESH", "ESH"]
    const Asia = ["AFG", "ARM", "AZE", "BHR", "BGD", "BTN", "BRN", "KHM", "CHN", "CYP", "GEO", "IND", "IDN", "IRN", "IRQ", "ISR", "JPN", "JOR", "KAZ", "KWT", "KGZ", "LAO", "LBN", "MYS", "MDV", "MNG", "MMR", "NPL", "PRK", "OMN", "PAK", "PSE", "PHL", "QAT", "SAU", "SGP", "KOR", "LKA", "SYR", "TWN", "TJK", "THA", "TLS", "TUR", "TKM", "ARE", "UZB", "VNM", "YEM"]
    const Europa = ["ALB", "AND", "AUT", "BLR", "BEL", "BIH", "BGR", "HRV", "CYP", "CZE", "DNK", "EST", "FIN", "FRA", "GEO", "DEU", "GRC", "HUN", "ISL", "IRL", "ITA", "KAZ", "XKX", "LVA", "LIE", "LTU", "LUX", "MKD", "MLT", "MDA", "MCO", "MNE", "NLD", "NOR", "POL", "PRT", "ROU", "RUS", "SMR", "SRB", "SVK", "SVN", "ESP", "SWE", "CHE", "TUR", "UKR", "GBR", "VAT"]
    const NorthAmerica = ["ATG", "BHS", "BRB", "BLZ", "CAN", "CRI", "CUB", "DMA", "DOM", "SLV", "GRD", "GTM", "HTI", "HND", "JAM", "MEX", "NIC", "PAN", "KNA", "LCA", "VCT", "TTO", "USA"]
    const Oceania = ["ASM", "AUS", "COK", "FJI", "PYF", "GUM", "KIR", "MHL", "FSM", "NRU", "NCL", "NZL", "NIU", "NFK", "MNP", "PLW", "PNG", "PCN", "WSM", "SLB", "TKL", "TON", "TUV", "VUT", "WLF"]
    const SouthAmerica = ["ARG", "BOL", "BRA", "CHL", "COL", "ECU", "GUY", "PRY", "PER", "SUR", "URY", "VEN"]
    if (Africa.includes(LetUp)) {
        return "Africa";
      } else if (Asia.includes(LetUp)) {
        return "Asia";
      } else if (Europa.includes(LetUp)) {
        return "Europa";
      } else if (NorthAmerica.includes(LetUp)) {
        return "NorthAmerica";
      } else if (Oceania.includes(LetUp)) {
        return "Oceania";
      } else if (SouthAmerica.includes(LetUp)) {
        return "SouthAmerica";
      } else {
        return null;
      }
}
export default HandleContinentsKeep;