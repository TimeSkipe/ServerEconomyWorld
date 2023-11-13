const Region = (countryCode) =>{
    const LetUp = countryCode.toUpperCase() 
    switch (LetUp) {
        case "SVK":
            return [{regionName:"Bratislava"},{regionName:"Trnava"},{regionName:"Nitra"},{regionName:"Trencin"},{regionName:"Zilina"},{regionName:"Banska Bystrica"},{regionName:"Presov"},{regionName:"Kosice"}]
            
        case "CZE":
            return [{regionName:"Prague"},{regionName:"Central Bohemian"},{regionName:"Liberec"},{regionName:"Usti nad Labem"},{regionName:"Karlovy Vary"},{regionName:"Plzen"},{regionName:"South Bohemian"},{regionName:"Vysocina"},{regionName:"Pardubice"},{regionName:"Hradec Kralove"},{regionName:"South Moravian"},{regionName:"Olomouc"},{regionName:"Moravian-Silesian"},]
        
        case "DEU":
            return [{regionName:'Baden-Württemberg'},{regionName:'Berlin'},{regionName:'Brandenburg'},{regionName:'Bremen'},{regionName:'Hamburg'},{regionName:'Hesse'},{regionName:'Mecklenburg-Vorpommern'},{regionName:'Lower Saxony'},{regionName:'NorthRhine-Westphalia'},{regionName:'Rhineland-Palatinate'},{regionName:'Saarland'},{regionName:'Saxony'},{regionName:'Saxony-Anhalt'},{regionName:'Schleswig-Holstein'},{regionName:'Thuringia'},]
        
        case "JPN":
            return [{regionName:'Hokkaido'},{regionName:'Aomori'},{regionName:'Iwate'},{regionName:'Miyagi'},{regionName:'Akita'},{regionName:'Yamagata'},{regionName:'Fukushima'},{regionName:'Ibaraki'},{regionName:'Tochigi'},{regionName:'Hokkaido'},{regionName:'Gunma'},{regionName:'Saitama'},{regionName:'Chiba'},{regionName:'Tokyo'},{regionName:'Kanagawa'},{regionName:'Niigata'},{regionName:'Toyama'},{regionName:'Ishikawa'},{regionName:'Fukui'},{regionName:'Yamanashi'},{regionName:'Nagano'},{regionName:'Gifu'},{regionName:'Shizuoka'},{regionName:'Aichi'},{regionName:'Mie'},{regionName:'Shiga'},{regionName:'Kyoto'},{regionName:'Osaka'},{regionName:'Hyōgo'},{regionName:'Nara'},{regionName:'Wakayama'},{regionName:'Tottori'},{regionName:'Shimane'},{regionName:'Okayama'},{regionName:'Hiroshima'},{regionName:'Yamaguchi'},{regionName:'Tokichima'},{regionName:'Kagawa'},{regionName:'Ehime'},{regionName:'Kōchi'},{regionName:'Fukuoka'},{regionName:'Saga'},{regionName:'Nagasaki'},{regionName:'Ōita'},{regionName:'Miyazaki'},{regionName:'Kagoshima'},{regionName:'Okinawa'},]
        case "UKR":
            return [{regionName:'Kyiv'},]
        default:
            return null;
            break;
    }
}
export default Region;